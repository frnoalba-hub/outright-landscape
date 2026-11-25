import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { sendCopyEmail, sendInquiryCopy, teamInboxes } from '../../shared/inquiryEmail.ts';

const inbox = teamInboxes[0];
const kinds = { inquiry: 'Contact inquiry', appointment: 'Appointment' };
const time = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'long', timeStyle: 'long' });
const stamp = (value) => value && Number.isFinite(Date.parse(value)) ? time.format(new Date(value)) : 'Not recorded';
const samples = {
  inquiry: { name: 'Sample homeowner', email: 'homeowner@example.com', city: 'Covina', service_type: 'landscape_design', message: 'Example only: I would like a quote for a front yard makeover.' },
  appointment: { name: 'Sample homeowner', email: 'homeowner@example.com', city: 'Covina', service_type: 'general_consultation', appointment_date: '2030-01-15', time_slot: '10:00 AM', notes: 'Example only: please discuss low-maintenance planting options.' },
};
const labels = { id: 'Record ID', name: 'Name', email: 'Email', phone: 'Phone', city: 'City', service_type: 'Service', status: 'Status', property_type: 'Property type', budget_range: 'Budget', preferred_contact: 'Preferred contact', appointment_date: 'Requested date', time_slot: 'Requested time (Pacific)', message: 'Message', notes: 'Appointment notes', admin_notes: 'Internal notes' };
const fields = {
  inquiry: ['id', 'name', 'email', 'phone', 'city', 'service_type', 'property_type', 'budget_range', 'preferred_contact', 'status', 'message', 'admin_notes'],
  appointment: ['id', 'name', 'email', 'phone', 'city', 'service_type', 'appointment_date', 'time_slot', 'status', 'notes'],
};

function copy(kind, record, sample) {
  const details = fields[kind].filter(field => record[field] != null && record[field] !== '')
    .map(field => `${labels[field]}: ${['service_type', 'property_type'].includes(field) ? String(record[field]).replaceAll('_', ' ') : record[field]}`);
  if (!sample) details.unshift(`Original submission: ${stamp(record.created_date)}`, `Last updated: ${stamp(record.updated_date)}`);
  return { template_name: 'OwnerRecordCopy', variables: {
    heading: `${sample ? 'SAMPLE' : 'HISTORICAL COPY'}: ${kinds[kind]}`,
    notice: sample ? 'This is a sample, not a real request. Do not reply or contact anyone listed.' : 'This is a copy of a saved record, not a new request. No reply is needed for this copy. Check the original submission date and status before following up.',
    sentAt: stamp(new Date().toISOString()), details: details.join('\n\n'),
  } };
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(e => ([401, 403].includes(e.status ?? e.response?.status) ? null : Promise.reject(e)));
    if (user?.role !== 'admin') return Response.json({ error: 'Administrator access required.' }, { status: 403 });
    const { mode, kind, cursor, cutoff } = (await req.json().catch(() => null)) ?? {};
    const client = base44.asServiceRole;
    if (mode === 'preview') {
      const [inquiry, appointment] = await Promise.all([client.entities.ContactInquiry.count(), client.entities.Appointment.count()]);
      return Response.json({ inquiry, appointment });
    }
    if (mode === 'sample') {
      const results = await Promise.all(Object.entries(samples).map(async ([type, row]) => ({ kind: type, ...await sendCopyEmail(client, inbox, copy(type, row, true)) })));
      return Response.json({ results });
    }
    if (mode !== 'historical' || !Object.hasOwn(kinds, kind) || typeof cutoff !== 'string' || !Number.isFinite(Date.parse(cutoff)) || (cursor != null && typeof cursor !== 'string')) {
      return Response.json({ error: 'Choose sample emails or confirm a historical send.' }, { status: 400 });
    }
    const entity = kind === 'inquiry' ? client.entities.ContactInquiry : client.entities.Appointment;
    const page = await entity.filter({ created_date: { $lte: new Date(cutoff).toISOString() } }, { sort: 'created_date', limit: 4, ...(cursor ? { cursor } : {}) });
    const results = await Promise.all(page.items.map(async row => {
      const email = copy(kind, row, false);
      const { status, detail } = await (kind === 'inquiry' ? sendInquiryCopy(client, row, inbox, 'historical', '', email) : sendCopyEmail(client, inbox, email));
      return { kind, id: row.id, status, detail };
    }));
    return Response.json({ results, nextCursor: page.has_more ? page.next_cursor : null });
  } catch (error) {
    console.error('Owner copy request failed', error?.status);
    return Response.json({ error: 'Could not finish sending copies. Check the owner inbox and inquiry email history before sending again.' }, { status: 500 });
  }
}