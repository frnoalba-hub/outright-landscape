import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InquiryResend from '@/components/leads/InquiryResend';
import InquiryEmailHistory from '@/components/leads/InquiryEmailHistory';

const statusOptions = [['new', 'New'], ['contacted', 'Contacted'], ['scheduled', 'Scheduled'], ['closed', 'Closed (Won)'], ['lost', 'Lost']];

export default function InquiryCardActions({ id, open, lead, onUpdate }) {
    const [saving, setSaving] = useState(false);
    const [notes, setNotes] = useState(lead.admin_notes || '');
    const [status, setStatus] = useState(lead.status || 'new');

    async function handleSave(event) {
        event.preventDefault();
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
    }

    return (
        <div id={id} hidden={!open} className="inquiryCardActions min-w-0 space-y-4 border-t p-4 sm:p-6">
            {open && <>
                <form onSubmit={handleSave} aria-busy={saving} className="inquiryCardEditForm space-y-3">
                    <div className="sm:max-w-xs">
                        <label htmlFor={`${id}-status`} className="mb-1 block text-sm font-medium">Status</label>
                        <Select value={status} onValueChange={setStatus} disabled={saving}>
                            <SelectTrigger id={`${id}-status`} className="min-h-11"><SelectValue /></SelectTrigger>
                            <SelectContent>{statusOptions.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div><label htmlFor={`${id}-notes`} className="mb-1 block text-sm font-medium">Admin Notes</label><Textarea id={`${id}-notes`} value={notes} onChange={event => setNotes(event.target.value)} placeholder="Add internal notes..." rows={2} disabled={saving} /></div>
                    <Button type="submit" className="min-h-11" disabled={saving}>{saving && <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}{saving ? 'Saving…' : 'Save'}</Button>
                </form>
                <div className="inquiryCardEmailActions space-y-3 border-t pt-4"><InquiryResend lead={lead} /><InquiryEmailHistory inquiryId={lead.id} /></div>
            </>}
        </div>
    );
}