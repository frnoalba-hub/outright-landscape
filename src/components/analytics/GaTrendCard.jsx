import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function GaTrendCard({ title, metricKey, timeline = [], previousTimeline = [], isPercent = false }) {
  const { chartData, pct, dir } = useMemo(() => {
    const currVals = timeline.map((d) => d[metricKey] || 0);
    const prevVals = previousTimeline?.length ? previousTimeline.map((d) => d[metricKey] || 0) : [];
    const len = Math.min(currVals.length, prevVals.length);

    const currAgg = isPercent
      ? (currVals.reduce((a, c) => a + c, 0) / (currVals.length || 1))
      : currVals.reduce((a, c) => a + c, 0);
    const prevAgg = isPercent
      ? (prevVals.reduce((a, c) => a + c, 0) / (prevVals.length || 1))
      : prevVals.reduce((a, c) => a + c, 0);

    const pct = prevVals.length ? ((currAgg - prevAgg) / (prevAgg || 1)) * 100 : 0;
    const dir = pct > 0 ? 'up' : pct < 0 ? 'down' : 'neutral';

    const chartData = timeline.map((d, i) => ({
      i,
      label: d.date,
      current: d[metricKey] || 0,
      previous: previousTimeline?.[i]?.[metricKey] ?? undefined,
    }));

    return { chartData, pct, dir };
  }, [timeline, previousTimeline, metricKey, isPercent]);

  const fmt = (v) => isPercent ? `${(v || 0).toFixed(1)}%` : (v || 0).toLocaleString();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Change: {dir !== 'neutral' ? (
              <span className={dir === 'up' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {dir === 'up' ? <ArrowUpRight className="inline w-4 h-4" /> : <ArrowDownRight className="inline w-4 h-4" />} {Math.abs(pct).toFixed(1)}%
              </span>
            ) : '0%'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={isPercent ? (v)=>`${v.toFixed(0)}%` : undefined} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value)=>fmt(value)} />
            <Legend />
            <Area type="monotone" dataKey="current" name="Current" stroke="#2563eb" fill="#bfdbfe" strokeWidth={2} fillOpacity={0.5} />
            {previousTimeline?.length > 0 && (
              <Line type="monotone" dataKey="previous" name="Previous" stroke="#94a3b8" strokeDasharray="4 4" dot={false} />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}