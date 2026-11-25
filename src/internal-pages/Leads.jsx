import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import InquiryBatchEmail from '@/components/leads/InquiryBatchEmail';
import OwnerRecordCopies from '@/components/leads/OwnerRecordCopies';
import InquiryResend from '@/components/leads/InquiryResend';
import InquiryEmailHistory from '@/components/leads/InquiryEmailHistory';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Calendar, MessageSquare, ChevronDown, ChevronUp, RefreshCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_COLORS = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-purple-100 text-purple-800',
    closed: 'bg-green-100 text-green-800',
    lost: 'bg-gray-100 text-gray-600',
};

const SERVICE_LABELS = {
    landscape_design: 'Landscape Design',
    lawn_care: 'Lawn Care',
    tree_shrub_care: 'Tree & Shrub Care',
    hardscaping: 'Hardscaping',
    irrigation: 'Irrigation',
    other: 'Other',
};

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function LeadRow({ lead, onUpdate, selected, selectionDisabled, onSelect }) {
    const [expanded, setExpanded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [notes, setNotes] = useState(lead.admin_notes || '');
    const [status, setStatus] = useState(lead.status || 'new');

    const handleSave = async () => {
        setSaving(true);
        try {
            await base44.entities.ContactInquiry.update(lead.id, { status, admin_notes: notes });
            toast.success('Lead updated');
            onUpdate();
        } catch {
            toast.error('Failed to save');
        } finally {
            setSaving(false);
        }
    };



    return (
        <div className="leadRow bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="leadSummary flex items-start">
            <label className="leadSelection inline-flex size-11 shrink-0 items-center justify-center cursor-pointer">
                <input type="checkbox" className="size-4 accent-current" aria-label={`Select inquiry from ${lead.name} for batch email`} checked={selected} disabled={selectionDisabled} onChange={() => onSelect(lead)} />
            </label>
            <button
                type="button"
                aria-expanded={expanded}
                className="leadRowHeader flex min-h-11 flex-1 min-w-0 flex-col gap-3 pr-4 py-4 text-left [overflow-wrap:anywhere] md:flex-row md:items-center md:gap-5"
                onClick={() => setExpanded(v => !v)}
            >
                <div className="leadRowMain flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="leadName font-bold text-gray-900 text-base">{lead.name}</span>
                        <span className={`leadStatusBadge text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}>
                            {lead.status || 'new'}
                        </span>
                        {lead.service_type && (
                            <span className="leadServiceBadge text-xs bg-[#c45d2c]/10 text-[#c45d2c] font-medium px-2.5 py-0.5 rounded-full">
                                {SERVICE_LABELS[lead.service_type] || lead.service_type}
                            </span>
                        )}
                    </div>
                    <div className="leadMeta flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        {lead.phone && (
                            <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5" /> {lead.phone}
                            </span>
                        )}
                        {lead.email && (
                            <span className="flex min-w-0 items-center gap-1">
                                <Mail className="size-3.5 shrink-0" aria-hidden="true" /> <span className="min-w-0 [overflow-wrap:anywhere]">{lead.email}</span>
                            </span>
                        )}
                        {lead.city && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" /> {lead.city}
                            </span>
                        )}
                    </div>
                </div>
                <div className="leadRowRight flex items-center gap-3 flex-shrink-0">
                    <span className="leadDate flex items-center gap-1.5 text-xs text-gray-400 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(lead.created_date)}
                    </span>
                    {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
            </button>
            </div>
            {lead.message && (
                <div className="leadMessage mx-4 mb-4 min-w-0 rounded-lg bg-muted p-4 sm:mx-5">
                    <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <MessageSquare className="size-3.5" aria-hidden="true" /> Message
                    </p>
                    <p className="whitespace-pre-wrap [overflow-wrap:anywhere] text-sm leading-relaxed text-foreground">{lead.message}</p>
                </div>
            )}

            {/* Expanded details */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="leadDetails border-t border-gray-100"
                    >
                        <div className="p-4 sm:p-5 space-y-4">
                            <div className="leadActions grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger className="h-10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="scheduled">Scheduled</SelectItem>
                                            <SelectItem value="closed">Closed (Won)</SelectItem>
                                            <SelectItem value="lost">Lost</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end gap-2">
                                    <a href={`tel:${lead.phone}`} className="flex-1">
                                        <Button variant="outline" className="w-full h-10 text-sm gap-2">
                                            <Phone className="w-4 h-4" /> Call
                                        </Button>
                                    </a>
                                    {lead.email && (
                                        <a href={`mailto:${lead.email}`} className="flex-1">
                                            <Button variant="outline" className="w-full h-10 text-sm gap-2">
                                                <Mail className="w-4 h-4" /> Email
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Admin Notes</label>
                                <Textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    placeholder="Add internal notes..."
                                    rows={2}
                                    className="text-sm"
                                />
                            </div>

                                            <div className="leadEmailActions border-t border-border pt-4 space-y-3">
                                                <InquiryResend lead={lead} />
                                                <InquiryEmailHistory inquiryId={lead.id} />
                                            </div>

                            <Button onClick={handleSave} disabled={saving} className="bg-[#c45d2c] hover:bg-[#a94e25] text-white h-10 px-6">
                                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                Save
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Leads() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [selection, setSelection] = useState({});
    const [batchBusy, setBatchBusy] = useState(false);
    const queryClient = useQueryClient();

    function toggleSelection(lead) {
        setSelection(current => {
            const next = { ...current };
            if (Object.hasOwn(next, lead.id)) delete next[lead.id];
            else if (Object.keys(next).length < 5) next[lead.id] = lead.name;
            return next;
        });
    }

    const { data: leads = [], isLoading, refetch } = useQuery({
        queryKey: ['contactInquiries'],
        queryFn: () => base44.entities.ContactInquiry.list('-created_date', 200),
    });

    const filtered = statusFilter === 'all' ? leads : leads.filter(l => (l.status || 'new') === statusFilter);

    const counts = leads.reduce((acc, l) => {
        const s = l.status || 'new';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="leadsPage min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="leadsContainer max-w-4xl mx-auto">
                {/* Header */}
                <div className="leadsHeader flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Leads & Inquiries</h1>
                        <p className="text-gray-500 mt-1">{leads.length} total submissions</p>
                    </div>
                    <Button variant="outline" onClick={() => refetch()} className="gap-2 self-start sm:self-auto">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </Button>
                </div>

                <OwnerRecordCopies />

                {/* Status filters */}
                <div className="leadsFilters flex flex-wrap gap-2 mb-6">
                    {[['all', 'All'], ['new', 'New'], ['contacted', 'Contacted'], ['scheduled', 'Scheduled'], ['closed', 'Closed'], ['lost', 'Lost']].map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => setStatusFilter(val)}
                            className={`leadFilterBtn px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[36px] ${
                                statusFilter === val
                                    ? 'bg-[#c45d2c] text-white shadow-sm'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#c45d2c]/40'
                            }`}
                        >
                            {label} {val !== 'all' && counts[val] ? `(${counts[val]})` : val === 'all' ? `(${leads.length})` : ''}
                        </button>
                    ))}
                </div>

                <InquiryBatchEmail selection={selection} onBusyChange={setBatchBusy} />

                {/* List */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="leadsEmpty text-center py-20 text-gray-400">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p className="font-medium">No submissions yet</p>
                    </div>
                ) : (
                    <div className="leadsList space-y-3">
                        {filtered.map(lead => (
                            <LeadRow key={lead.id} lead={lead} selected={Object.hasOwn(selection, lead.id)} selectionDisabled={batchBusy || (!Object.hasOwn(selection, lead.id) && Object.keys(selection).length >= 5)} onSelect={toggleSelection} onUpdate={() => queryClient.invalidateQueries({ queryKey: ['contactInquiries'] })} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}