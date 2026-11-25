export const teamInboxes = ['outrightlandscapecovina@gmail.com', 'frno.alba@gmail.com'];
export const validEmail = (value) => typeof value === 'string' && value.length <= 254 && /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(value);
const labels = (value) => value?.replaceAll('_', ' ') || 'Not provided';
const escape = (value) => String(value || 'Not provided').replace(/[&<>"'{}]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '{': '&#123;', '}': '&#125;' }[char]));

export async function sendInquiryCopy(client, lead, recipient, source, retryOf = '') {
  const data = { inquiry_id: lead.id, recipient, source, status: 'pending', ...(retryOf ? { retry_of: retryOf } : {}) };
  let attempt;
  try {
    attempt = await client.entities.InquiryEmailAttempt.create(data);
  } catch {
    return { ...data, status: 'failed', detail: 'Could not start the send because its history could not be saved.' };
  }
  let status = 'unconfirmed';
  let detail = 'Base44 did not confirm the send. Check the inbox before resending.';
  try {
    const fields = { name: lead.name, email: lead.email, phone: lead.phone, city: lead.city, service: labels(lead.service_type), property: labels(lead.property_type), budget: labels(lead.budget_range), preferred: lead.preferred_contact, submitted: lead.created_date ? new Date(lead.created_date).toISOString() : '', message: lead.message };
    const result = await client.integrations.Core.SendEmail({
      to: recipient, category: 'transactional', template_name: 'InquiryCopy',
      variables: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, escape(value)])),
    });
    if (result?.success === false || result?.sent === false || result?.error || ['failed', 'error', 'blocked', 'rejected'].includes(result?.status)) {
      status = 'failed';
      detail = ({ bounced: 'Base44 blocked the address because it previously bounced.', unsubscribed: 'Base44 blocked the send because the recipient is unsubscribed.', spam: 'Base44 blocked the recipient after a spam report.' })[result?.reason] || 'Base44 refused the email. Check the address and sending eligibility.';
    } else if (result?.success === true || result?.sent === true || ['success', 'sent', 'accepted', 'queued'].includes(result?.status) || result?.message_id || result?.id) {
      status = 'accepted';
      detail = 'Accepted for sending. Inbox delivery is not confirmed.';
    }
  } catch (error) {
    const code = error?.status ?? error?.response?.status;
    if (code >= 400 && code < 500 && code !== 408) {
      status = 'failed';
      detail = code === 429 ? 'Base44 limited sending. Retry later.' : 'Base44 refused the email. Check the address and sending eligibility.';
    }
  }
  try {
    await client.entities.InquiryEmailAttempt.update(attempt.id, { status, detail });
    return { ...data, id: attempt.id, status, detail };
  } catch {
    return { ...data, id: attempt.id, status: 'unconfirmed', detail: 'Could not save the final result. Check the inbox before resending.' };
  }
}