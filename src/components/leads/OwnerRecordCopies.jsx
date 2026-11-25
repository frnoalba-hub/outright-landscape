import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const kinds = { inquiry: 'Contact inquiries', appointment: 'Appointments' };
const invoke = async payload => (await base44.functions.invoke('sendOwnerRecordCopies', payload)).data;

export default function OwnerRecordCopies() {
  const running = useRef(false);
  const [busy, setBusy] = useState(false);
  const [run, setRun] = useState(null);
  const queryClient = useQueryClient();
  async function send(mode) {
    if (running.current) return;
    running.current = true;
    setBusy(true);
    const results = [];
    setRun({ mode, results: [] });
    try {
      if (mode === 'sample') results.push(...(await invoke({ mode })).results);
      else {
        const cutoff = new Date().toISOString();
        for (const kind of Object.keys(kinds)) {
          let cursor;
          do {
            const page = await invoke({ mode, kind, cutoff, cursor });
            results.push(...page.results);
            setRun({ mode, results: [...results] });
            cursor = page.nextCursor;
          } while (cursor);
        }
      }
      setRun({ mode, results: [...results] });
      if (results.some(row => row.status !== 'accepted')) toast.error('Some copies were not confirmed. Review the results before resending.');
      else if (results.length) toast.success('Copies accepted for sending. Check the owner inbox for delivery.');
    } catch {
      setRun({ mode, results: [...results], interrupted: true });
    } finally {
      running.current = false;
      setBusy(false);
      if (mode === 'historical') queryClient.invalidateQueries({ queryKey: ['inquiryEmailHistory'] });
    }
  }
  return (
    <section className="ownerRecordCopies mb-6 space-y-3 rounded-xl border bg-card p-4" aria-labelledby="owner-copies-heading" aria-busy={busy}>
      <h2 id="owner-copies-heading" className="text-base font-semibold">Email copies for the owner</h2>
      <p className="text-sm text-muted-foreground [overflow-wrap:anywhere]">Samples and historical copies go only to outrightlandscapecovina@gmail.com, with Pacific timestamps and a notice that they are not new requests.</p>
      <div className="ownerCopyActions flex flex-wrap gap-2">
        <Button type="button" variant="outline" className="min-h-11" disabled={busy} onClick={() => send('sample')}>Send two samples</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild><Button type="button" className="min-h-11" disabled={busy}>Send all historical copies</Button></AlertDialogTrigger>
          <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Send copies of all saved records?</AlertDialogTitle><AlertDialogDescription>Each saved contact inquiry and appointment will be emailed to the owner as a historical copy. Customers will not be emailed. A second send will make new copies, so check the inbox before repeating it.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter><AlertDialogCancel className="min-h-11">Cancel</AlertDialogCancel><AlertDialogAction className="min-h-11" onClick={() => send('historical')}>Send historical copies</AlertDialogAction></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {busy && <p role="status" className="flex items-center gap-2 text-sm animate-in fade-in"><Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending copies… Keep this page open.</p>}
      {run && <div aria-live="polite" className="ownerCopyResults space-y-1 text-sm">
        {run.interrupted && <p role="alert" className="text-destructive">Sending stopped before it could be confirmed. Check the inbox and inquiry email history before repeating this send.</p>}
        {(!busy || run.results.length > 0) && Object.entries(kinds).map(([kind, label]) => {
          const rows = run.results.filter(row => row.kind === kind);
          if (!rows.length) return !busy && !run.interrupted && run.mode === 'historical' ? <p key={kind}>{label}: no saved records.</p> : null;
          const accepted = rows.filter(row => row.status === 'accepted').length;
          return <div key={kind}><p>{label}: {accepted} accepted for sending, {rows.filter(row => row.status === 'failed').length} failed, {rows.filter(row => row.status === 'unconfirmed').length} unconfirmed.</p>
            {[...new Set(rows.filter(row => row.status !== 'accepted').map(row => row.detail))].map(detail => <p key={detail} className="text-muted-foreground">{detail}</p>)}</div>;
        })}
      </div>}
    </section>
  );
}