import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { sendInquiryCopy, teamInboxes, validEmail } from '../../shared/inquiryEmail.ts';

const validId = (value) => typeof value === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(value);
const badRequest = (error) => Response.json({ error }, { status: 400 });

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(e => ([401, 403].includes(e.status ?? e.response?.status) ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Sign in to send inquiry emails.' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Only admins can send inquiry emails.' }, { status: 403 });
    const { mode, inquiryIds, recipient, attemptIds } = (await req.json().catch(() => null)) ?? {};
    const client = base44.asServiceRole;
    let targets;
    if (mode === 'retry') {
      if (!Array.isArray(attemptIds) || !attemptIds.length || attemptIds.length > 10 || !attemptIds.every(validId)) return badRequest('Choose up to ten failed sends.');
      const ids = [...new Set(attemptIds)];
      const [failed, newer] = await Promise.all([
        client.entities.InquiryEmailAttempt.filter({ id: { $in: ids }, status: 'failed', source: { $in: ['batch', 'retry'] } }, { limit: 10 }),
        client.entities.InquiryEmailAttempt.filter({ retry_of: { $in: ids } }, { limit: 30 }),
      ]);
      if (failed.items.length !== ids.length || failed.items.some(row => !teamInboxes.includes(row.recipient)) || newer.items.some(row => row.status !== 'failed')) return badRequest('Only failed team sends that have not already been retried can be retried.');
      targets = failed.items.map(row => ({ id: row.inquiry_id, to: row.recipient, retryOf: row.id }));
    } else {
      if (!['batch', 'resend'].includes(mode) || !Array.isArray(inquiryIds) || !inquiryIds.length || inquiryIds.length > (mode === 'batch' ? 5 : 1) || !inquiryIds.every(validId)) return badRequest('Choose up to five inquiries for a batch or one to resend.');
      const to = typeof recipient === 'string' ? recipient.trim() : '';
      if (mode === 'resend' && !validEmail(to)) return badRequest('Enter a valid email address.');
      targets = [...new Set(inquiryIds)].flatMap(id => (mode === 'batch' ? teamInboxes : [to]).map(to => ({ id, to })));
    }
    const ids = [...new Set(targets.map(target => target.id))];
    const { items } = await client.entities.ContactInquiry.filter({ id: { $in: ids } }, { limit: ids.length });
    const leads = new Map(items.map(row => [row.id, row]));
    const outcomes = [];
    for (let i = 0; i < targets.length; i += 4) {
      outcomes.push(...await Promise.all(targets.slice(i, i + 4).map(target => {
        const lead = leads.get(target.id);
        return lead ? sendInquiryCopy(client, lead, target.to, mode, target.retryOf) : { inquiry_id: target.id, recipient: target.to, status: 'failed', detail: 'Inquiry no longer exists.' };
      })));
    }
    return Response.json({ outcomes });
  } catch (error) {
    console.error('Inquiry email action failed', error?.status);
    return Response.json({ error: 'Could not confirm this email action. Check email history before sending again.' }, { status: 500 });
  }
}