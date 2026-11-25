import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { toast } from '@/components/ui/use-toast';

export function useInquiryEmail() {
  const query = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function send(payload) {
    setBusy(true);
    setError('');
    try {
      const { data } = await base44.functions.invoke('manageInquiryEmail', payload);
      if (!Array.isArray(data?.outcomes)) throw new Error('No email result received.');
      const accepted = data.outcomes.filter(result => result.status === 'accepted').length;
      const failed = data.outcomes.filter(result => result.status === 'failed').length;
      const unknown = data.outcomes.length - accepted - failed;
      toast({ title: `${accepted} accepted, ${failed} failed${unknown ? `, ${unknown} unconfirmed` : ''}`, variant: failed === data.outcomes.length ? 'destructive' : 'default' });
      return data.outcomes;
    } catch (err) {
      const message = err?.response?.data?.error || err?.data?.error || 'Could not confirm the send. Check email history before trying again.';
      setError(message);
      toast({ title: 'Email action not completed', description: message, variant: 'destructive' });
      return null;
    } finally {
      setBusy(false);
      query.invalidateQueries({ queryKey: ['inquiryEmailHistory'] });
    }
  }
  return { busy, error, send };
}