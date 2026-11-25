import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import InquiryEmailResult from '@/components/leads/InquiryEmailResult';
import { useInquiryEmail } from '@/components/leads/useInquiryEmail';

export default function InquiryEmailHistory({ inquiryId }) {
  const { data, isPending, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['inquiryEmailHistory', inquiryId], initialPageParam: undefined,
    queryFn: ({ pageParam }) => base44.entities.InquiryEmailAttempt.filter({ inquiry_id: inquiryId }, { sort: '-created_date', limit: 10, cursor: pageParam }),
    getNextPageParam: page => page.has_more ? page.next_cursor : undefined,
  });
  const { send, busy, error } = useInquiryEmail();
  const rows = data?.pages.flatMap(page => page.items) ?? [];
  const sources = { automatic: 'Automatic copy', batch: 'Batch send', resend: 'Individual resend', retry: 'Batch retry' };
  return (
    <section className="inquiryEmailHistory space-y-2" aria-label="Email history" aria-busy={isFetching || busy}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Email history</h3>
        <Button type="button" size="sm" variant="outline" className="min-h-11" disabled={isFetching} onClick={() => refetch()}>Refresh history</Button>
      </div>
      {isPending && <p role="status" className="text-sm text-muted-foreground">Loading email history…</p>}
      {isError && <p role="alert" className="text-sm text-destructive">Could not load email history. Try refreshing.</p>}
      {!isPending && !isError && !rows.length && <p className="text-sm text-muted-foreground">No email attempts recorded for this inquiry.</p>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <ul className="space-y-2">
        {rows.map(row => <InquiryEmailResult key={row.id} outcome={row}>
          <p className="text-xs text-muted-foreground">{sources[row.source]} · {new Date(row.created_date).toLocaleString()}</p>
          {row.status === 'failed' && ['batch', 'retry'].includes(row.source) && !rows.some(newer => newer.retry_of === row.id) && (
            <Button type="button" variant="outline" className="mt-2 min-h-11" disabled={busy || isFetching} onClick={() => send({ mode: 'retry', attemptIds: [row.id] })}>{busy ? 'Retrying…' : 'Retry this address'}</Button>
          )}
        </InquiryEmailResult>)}
      </ul>
      {hasNextPage && <Button type="button" variant="outline" className="min-h-11" disabled={isFetching} onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading…' : 'Load older attempts'}</Button>}
    </section>
  );
}