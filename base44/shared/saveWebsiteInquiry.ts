import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { waitUntil } from 'base44:runtime';
import { sendInquiryCopy, teamInboxes, validEmail } from './inquiryEmail.ts';

export async function saveWebsiteInquiry(req) {
  const data = await req.json().catch(() => null);
  const fields = { name: 150, email: 254, phone: 50, city: 150, message: 8000, service_type: 80, property_type: 30, budget_range: 30, preferred_contact: 10 };
  const inquiry = {};
  for (const [key, maximum] of Object.entries(fields)) {
    const value = data?.[key];
    if (value == null || value === '') continue;
    if (typeof value !== 'string' || value.length > maximum) return Response.json({ error: `Invalid ${key}` }, { status: 400 });
    if (value.trim()) inquiry[key] = value.trim();
  }
  if (!inquiry.name || !validEmail(inquiry.email) || !inquiry.message) {
    return Response.json({ error: 'Name, valid email and project message are required.' }, { status: 400 });
  }
  const client = createClientFromRequest(req).asServiceRole;
  let record;
  try {
    record = await client.entities.ContactInquiry.create(inquiry);
  } catch (error) {
    console.error('Inquiry save failed', error?.status);
    return Response.json({ error: 'Could not save inquiry.' }, { status: 500 });
  }
  waitUntil(Promise.all(teamInboxes.map(to => sendInquiryCopy(client, record, to, 'automatic'))).then(results => {
    if (results.some(result => !result.id)) console.error('An automatic inquiry email attempt could not be recorded', record.id);
  }));
  return Response.json({ success: true, id: record.id });
}