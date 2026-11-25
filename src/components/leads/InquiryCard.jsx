import { useId, useState } from 'react';
import { Calendar, ChevronDown, Mail, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InquiryCardActions from '@/components/leads/InquiryCardActions';

const statusColors = { new: 'bg-blue-100 text-blue-800', contacted: 'bg-yellow-100 text-yellow-800', scheduled: 'bg-purple-100 text-purple-800', closed: 'bg-green-100 text-green-800', lost: 'bg-gray-100 text-gray-600' };
const services = { landscape_design: 'Landscape Design', lawn_care: 'Lawn Care', tree_shrub_care: 'Tree & Shrub Care' };
const budgets = { under_5k: 'Under $5,000', '5k_10k': '$5,000–$10,000', '10k_25k': '$10,000–$25,000', '25k_50k': '$25,000–$50,000', over_50k: 'Over $50,000' };
const readable = value => value?.replaceAll('_', ' ');
const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' });

export default function InquiryCard({ lead, onUpdate, selected, selectionDisabled, onSelect }) {
    const id = useId();
    const [open, setOpen] = useState(false);
    const status = lead.status || 'new';
    const details = [
        ['Email', lead.email], ['Phone', lead.phone], ['City', lead.city],
        ['Service', services[lead.service_type] || readable(lead.service_type)], ['Property type', readable(lead.property_type)],
        ['Budget', budgets[lead.budget_range] || readable(lead.budget_range)], ['Preferred contact', readable(lead.preferred_contact)],
    ].filter(([, value]) => value);

    return (
        <article aria-labelledby={`${id}-name`} className="inquiryCard min-w-0 rounded-xl border bg-card text-card-foreground shadow-sm [overflow-wrap:anywhere]">
            <div className="inquiryCardBody space-y-4 p-4 sm:p-6">
                <header className="inquiryCardHeader flex items-start justify-between gap-2">
                    <div className="min-w-0 space-y-1">
                        <h2 id={`${id}-name`} className="inquiryCardName text-xl font-bold">{lead.name}</h2>
                        <p className="inquiryCardDate flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="size-4 shrink-0" aria-hidden="true" />{lead.created_date ? <time dateTime={lead.created_date}>{dateFormat.format(new Date(lead.created_date))}</time> : 'Date not recorded'}</p>
                    </div>
                    <div className="inquiryCardSelection flex shrink-0 items-center gap-1">
                        <span className={`inquiryCardStatus rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[status] || statusColors.new}`}>{status}</span>
                        <label className="inline-flex size-11 cursor-pointer items-center justify-center"><input type="checkbox" className="size-4 accent-current" aria-label={`Select inquiry from ${lead.name} for batch email`} checked={selected} disabled={selectionDisabled} onChange={() => onSelect(lead)} /></label>
                    </div>
                </header>
                <dl className="inquiryCardDetails grid grid-cols-1 gap-x-5 gap-y-3 border-t pt-4 min-[420px]:grid-cols-2 sm:grid-cols-3">
                    {details.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs font-semibold text-muted-foreground">{label}</dt><dd className={`mt-0.5 text-sm ${['City', 'Email', 'Phone'].includes(label) ? '' : 'capitalize'}`}>{value}</dd></div>)}
                </dl>
                <section className="inquiryCardMessage rounded-lg bg-muted p-4" aria-labelledby={`${id}-message`}>
                    <h3 id={`${id}-message`} className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><MessageSquare className="size-4 shrink-0" aria-hidden="true" />Message</h3>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{lead.message || 'No message provided.'}</p>
                </section>
                <div className="inquiryCardToolbar flex flex-wrap items-center gap-2">
                    {lead.phone && <Button asChild variant="outline" className="min-h-11"><a href={`tel:${lead.phone}`}><Phone aria-hidden="true" /> Call</a></Button>}
                    {lead.email && <Button asChild variant="outline" className="min-h-11"><a href={`mailto:${lead.email}`}><Mail aria-hidden="true" /> Email</a></Button>}
                    <Button type="button" variant="outline" className="min-h-11" aria-expanded={open} aria-controls={`${id}-actions`} onClick={() => setOpen(value => !value)}>{open ? 'Hide actions' : 'Manage inquiry'} <ChevronDown className={`transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true" /></Button>
                </div>
            </div>
            <InquiryCardActions id={`${id}-actions`} open={open} lead={lead} onUpdate={onUpdate} />
        </article>
    );
}