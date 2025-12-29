import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import GaTrendCard from './GaTrendCard';

export default function DrilldownPanel({ open, onOpenChange, selection, dateRange, compare }) {
  const enabled = open && selection?.type && selection?.value;
  const { data, isLoading } = useQuery({
    queryKey: ['ga-drilldown', selection?.type, selection?.value, dateRange, compare],
    queryFn: async () => {
      const res = await base44.functions.invoke('getAnalyticsDrilldown', {
        dateRange,
        dimensionType: selection.type,
        value: selection.value,
        compare
      });
      if (res.ok === false) throw new Error((await res.json()).error || 'Drilldown error');
      return res.data || res;
    },
    enabled
  });

  const overview = data?.overview || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[520px] sm:w-[640px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{selection?.type === 'source' ? 'Source / Medium' : 'Landing Page'}</SheetTitle>
          <div className="text-slate-500 text-sm truncate" title={selection?.value}>{selection?.value}</div>
        </SheetHeader>

        <div className="py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card><CardContent className="pt-4"><div className="text-xs text-slate-500">Sessions</div><div className="text-2xl font-bold">{(overview.sessions||0).toLocaleString()}</div></CardContent></Card>
            <Card><CardContent className="pt-4"><div className="text-xs text-slate-500">Users</div><div className="text-2xl font-bold">{(overview.users||0).toLocaleString()}</div></CardContent></Card>
            <Card><CardContent className="pt-4"><div className="text-xs text-slate-500">Engaged Sessions</div><div className="text-2xl font-bold">{(overview.engagedSessions||0).toLocaleString()}</div></CardContent></Card>
            <Card><CardContent className="pt-4"><div className="text-xs text-slate-500">Engagement Rate</div><div className="text-2xl font-bold">{(overview.engagementRate||0).toFixed(1)}%</div></CardContent></Card>
            <Card><CardContent className="pt-4"><div className="text-xs text-slate-500">Leads</div><div className="text-2xl font-bold">{(overview.leads||0).toLocaleString()}</div></CardContent></Card>
            <Card><CardContent className="pt-4"><div className="text-xs text-slate-500">Lead Rate</div><div className="text-2xl font-bold">{(overview.leadRate||0).toFixed(1)}%</div></CardContent></Card>
          </div>

          <GaTrendCard
            title="Trend"
            metricKey="sessions"
            timeline={data?.timeline || []}
            previousTimeline={compare ? data?.previousTimeline : []}
          />

          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Sessions by device</CardDescription>
            </CardHeader>
            <CardContent className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.devices || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="device" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#10b981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {selection?.type === 'source' && (data?.campaigns?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Campaigns</CardTitle>
                <CardDescription>Top campaigns for this source/medium</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {data.campaigns.map((c, i) => (
                    <li key={i} className="flex justify-between"><span className="truncate pr-3">{c.campaign || '(not set)'}</span><span>{c.sessions.toLocaleString()}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null)}

          {selection?.type === 'page' && (data?.topEvents?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Top Events on Page</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <tbody className="divide-y">
                    {data.topEvents.map((e, i) => (
                      <tr key={i}>
                        <td className="py-2">{e.name}</td>
                        <td className="py-2 text-right">{e.count.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ) : null)}
        </div>
      </SheetContent>
    </Sheet>
  );
}