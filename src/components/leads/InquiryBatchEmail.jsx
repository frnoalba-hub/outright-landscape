import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InquiryEmailResult from '@/components/leads/InquiryEmailResult';
import { useInquiryEmail } from '@/components/leads/useInquiryEmail';

export default function InquiryBatchEmail({ selection, onBusyChange }) {
  const [results, setResults] = useState([]);
  const [names, setNames] = useState({});
  const { busy, error, send } = useInquiryEmail();
  const failed = results.filter(row => row.status === 'failed' && row.id);

  async function run(retry) {
    onBusyChange(true);
    try {
      const outcomes = await send(retry ? { mode: 'retry', attemptIds: failed.map(row => row.id) } : { mode: 'batch', inquiryIds: Object.keys(selection) });
      if (!outcomes) return;
      if (!retry) setNames(selection);
      setResults(retry ? results.map(row => outcomes.find(outcome => outcome.retry_of === row.id || (!outcome.id && outcome.inquiry_id === row.inquiry_id && outcome.recipient === row.recipient && row.status === 'failed')) || row) : outcomes);
    } finally {
      onBusyChange(false);
    }
  }

  return (
    <section className="inquiryBatchEmail mb-6 space-y-3 rounded-xl border bg-card p-4" aria-label="Batch inquiry email" aria-busy={busy}>
      <p className="text-sm font-medium">{Object.keys(selection).length} selected · up to 5 inquiries</p>
      <p className="text-xs text-muted-foreground break-words">Team inboxes: outrightlandscapecovina@gmail.com and frno.alba@gmail.com</p>
      <div className="inquiryBatchButtons flex flex-wrap gap-2">
        <Button type="button" className="min-h-11" onClick={() => run(false)} disabled={busy || !Object.keys(selection).length}>{busy && <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}{busy ? 'Sending…' : 'Email selected inquiries'}</Button>
        {!!failed.length && <Button type="button" variant="outline" className="min-h-11" onClick={() => run(true)} disabled={busy}>Retry failed sends ({failed.length})</Button>}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {!!results.length && <ul className="inquiryBatchResults grid gap-2 sm:grid-cols-2" aria-label="Latest batch results" aria-live="polite">
        {results.map(row => <InquiryEmailResult key={`${row.inquiry_id}:${row.recipient}`} outcome={row} name={names[row.inquiry_id]} />)}
      </ul>}
    </section>
  );
}