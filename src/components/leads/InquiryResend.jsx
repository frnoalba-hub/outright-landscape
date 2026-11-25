import { useId, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InquiryEmailResult from '@/components/leads/InquiryEmailResult';
import { useInquiryEmail } from '@/components/leads/useInquiryEmail';

export default function InquiryResend({ lead }) {
  const fieldId = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [review, setReview] = useState(false);
  const [result, setResult] = useState(null);
  const { busy, error, send } = useInquiryEmail();

  async function submit(event) {
    event.preventDefault();
    if (!review) return setReview(true);
    const outcomes = await send({ mode: 'resend', inquiryIds: [lead.id], recipient: email.trim() });
    if (outcomes?.[0]) setResult(outcomes[0]);
  }

  return (
    <Dialog open={open} onOpenChange={value => { if (!busy) { setOpen(value); if (!value) { setReview(false); setResult(null); } } }}>
      <DialogTrigger asChild><Button type="button" variant="outline" className="inquiryResendButton min-h-11">Resend by email</Button></DialogTrigger>
      <DialogContent className="inquiryResendDialog w-[calc(100%-2rem)] max-h-[85dvh] overflow-y-auto rounded-xl [&>button]:right-2 [&>button]:top-2 [&>button]:flex [&>button]:size-11 [&>button]:items-center [&>button]:justify-center">
        <DialogTitle className="pr-8">Resend inquiry</DialogTitle>
        <DialogDescription>Review the destination before sharing this inquiry’s contact and project details.</DialogDescription>
        <div className="inquiryResendPreview min-w-0 space-y-1 break-words rounded-lg bg-muted p-3 text-sm">
          <p className="font-semibold">{lead.name}</p><p>{[lead.email, lead.phone, lead.city].filter(Boolean).join(' · ')}</p>
          {lead.service_type && <p>{lead.service_type.replaceAll('_', ' ')}</p>}
          <p className="max-h-28 overflow-y-auto whitespace-pre-wrap">{lead.message}</p>
        </div>
        {result ? <ul aria-live="polite"><InquiryEmailResult outcome={result} /></ul> : <form className="inquiryResendForm space-y-3" onSubmit={submit} aria-busy={busy}>
          <label htmlFor={fieldId} className="block text-sm font-medium">Destination email</label>
          <Input id={fieldId} type="email" required maxLength={254} value={email} readOnly={review || busy} onChange={event => setEmail(event.target.value)} className="min-h-11" />
          {error && review && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-wrap gap-2">{review && <Button type="button" variant="outline" className="min-h-11" disabled={busy} onClick={() => setReview(false)}>Edit address</Button>}<Button className="min-h-11" type="submit" disabled={busy}>{busy && <Loader2 className="mr-2 animate-spin motion-reduce:animate-none" aria-hidden="true" />}{busy ? 'Sending…' : review ? 'Confirm and send' : 'Review destination'}</Button></div>
        </form>}
        {result && <Button type="button" variant="outline" className="min-h-11 justify-self-start" onClick={() => { setResult(null); setReview(false); }}>Send to another address</Button>}
      </DialogContent>
    </Dialog>
  );
}