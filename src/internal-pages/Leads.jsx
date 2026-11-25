import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import InquiryBatchEmail from '@/components/leads/InquiryBatchEmail';
import OwnerRecordCopies from '@/components/leads/OwnerRecordCopies';
import InquiryCard from '@/components/leads/InquiryCard';
import { Button } from '@/components/ui/button';
import { MessageSquare, RefreshCw, Loader2 } from 'lucide-react';

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
                    <div className="leadsCards grid min-w-0 gap-4">
                        {filtered.map(lead => (
                            <InquiryCard key={lead.id} lead={lead} selected={Object.hasOwn(selection, lead.id)} selectionDisabled={batchBusy || (!Object.hasOwn(selection, lead.id) && Object.keys(selection).length >= 5)} onSelect={toggleSelection} onUpdate={() => queryClient.invalidateQueries({ queryKey: ['contactInquiries'] })} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}