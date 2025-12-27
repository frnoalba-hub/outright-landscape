import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, TrendingUp, Search, AlertCircle, FileText, CheckCircle2, XCircle, LayoutDashboard } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, ComposedChart, Line } from 'recharts';
import SeoGoals from "@/components/seo/SeoGoals";

export default function SeoDashboard() {
    // 1. Auth & Data Fetching
    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => base44.auth.me(),
    });

    const { data: analyticsData } = useQuery({
        queryKey: ['analytics-data'],
        queryFn: async () => {
            const res = await base44.functions.invoke("getAnalyticsData");
            return res.ok ? res.data : null;
        },
        enabled: !!user && user.role === 'admin'
    });

    const { data: gscData, isLoading: isGscLoading, error: gscError, refetch } = useQuery({
        queryKey: ['search-console-data-full'],
        queryFn: async () => {
            const res = await base44.functions.invoke("getSearchConsoleData");
            if (res.ok === false) throw new Error((await res.json()).error);
            return res.data || res;
        },
        enabled: !!user && user.role === 'admin'
    });

    if (isAuthLoading || isGscLoading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <Button onClick={() => base44.auth.redirectToLogin()}>Log In as Admin</Button>
            </div>
        );
    }

    // 2. Data Preparation
    const sitemaps = gscData?.sitemaps || [];
    const crawlErrors = sitemaps.reduce((acc, sm) => acc + (parseInt(sm.errors) || 0), 0);
    const crawlWarnings = sitemaps.reduce((acc, sm) => acc + (parseInt(sm.warnings) || 0), 0);
    
    // Merge GA4 and GSC Timeline Data if possible (by date)
    // Both return 'date' in YYYY-MM-DD or similar format
    // GA4: timeline array with 'date' (MM/DD) -> Need to map to YYYY-MM-DD for joining?
    // GSC: timeline array with keys[0] as date (YYYY-MM-DD)
    // For now, let's just show GSC timeline as the primary "SEO" timeline.

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <LayoutDashboard className="text-blue-600 w-8 h-8" />
                            SEO Performance Command Center
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Aggregated insights from Google Analytics 4 & Search Console.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {gscError ? (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> GSC Error
                            </span>
                        ) : (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> System Operational
                            </span>
                        )}
                        <Button variant="outline" size="sm" onClick={() => refetch()}>
                            Refresh Data
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-t-4 border-t-blue-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-500">Total SEO Clicks</span>
                                <Search className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900">
                                {gscData?.overview?.totalClicks.toLocaleString() || 0}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Last 28 Days</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-t-4 border-t-purple-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-500">Total Impressions</span>
                                <TrendingUp className="w-4 h-4 text-purple-500" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900">
                                {gscData?.overview?.totalImpressions.toLocaleString() || 0}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Visibility in Search</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-amber-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-500">Crawl Status</span>
                                <FileText className="w-4 h-4 text-amber-500" />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <div className="text-3xl font-bold text-slate-900">
                                    {sitemaps.length}
                                </div>
                                <span className="text-sm text-slate-500">Sitemaps</span>
                            </div>
                            <div className="flex gap-2 mt-2 text-xs">
                                <span className="text-red-600 font-bold">{crawlErrors} Errors</span>
                                <span className="text-amber-600">{crawlWarnings} Warnings</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-green-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-500">Avg. Position</span>
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900">
                                {gscData?.overview?.avgPosition.toFixed(1) || "-"}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Average Rank</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Traffic Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 shadow-sm">
                        <CardHeader>
                            <CardTitle>Search Traffic Trends</CardTitle>
                            <CardDescription>Clicks vs Impressions over time</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            {gscData?.timeline ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={gscData.timeline}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis 
                                            dataKey="keys[0]" 
                                            tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                            tick={{fontSize: 12, fill: '#64748b'}} 
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis 
                                            yAxisId="left"
                                            tick={{fontSize: 12, fill: '#64748b'}} 
                                            axisLine={false}
                                            tickLine={false}
                                            label={{ value: 'Clicks', angle: -90, position: 'insideLeft', style: { fill: '#3b82f6' } }}
                                        />
                                        <YAxis 
                                            yAxisId="right" 
                                            orientation="right" 
                                            tick={{fontSize: 12, fill: '#64748b'}} 
                                            axisLine={false}
                                            tickLine={false}
                                            label={{ value: 'Impressions', angle: 90, position: 'insideRight', style: { fill: '#a855f7' } }}
                                        />
                                        <Tooltip 
                                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                        />
                                        <Legend />
                                        <Area yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" fill="#bfdbfe" stroke="#3b82f6" strokeWidth={2} fillOpacity={0.5} />
                                        <Line yAxisId="right" type="monotone" dataKey="impressions" name="Impressions" stroke="#a855f7" strokeWidth={2} dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400">No timeline data available</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Keywords */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Top Keywords</CardTitle>
                            <CardDescription>By Click Volume</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            {gscData?.topQueries ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={gscData.topQueries} layout="vertical" margin={{ left: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                        <XAxis type="number" hide />
                                        <YAxis 
                                            dataKey="keys[0]" 
                                            type="category" 
                                            width={100}
                                            tick={{fontSize: 11, fill: '#475569'}}
                                            interval={0}
                                        />
                                        <Tooltip cursor={{fill: '#f1f5f9'}} />
                                        <Bar dataKey="clicks" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Clicks" barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400">No keyword data available</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sitemaps & Errors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Indexing & Sitemaps</CardTitle>
                            <CardDescription>Submission status and health</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {sitemaps.length > 0 ? sitemaps.map((sm, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            {parseInt(sm.errors) > 0 ? (
                                                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                            ) : (
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                            )}
                                            <div>
                                                <div className="font-medium text-slate-900 truncate max-w-[200px]" title={sm.path}>{sm.path.split('/').pop()}</div>
                                                <div className="text-xs text-slate-500">Last read: {new Date(sm.lastDownloaded).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-slate-700">{parseInt(sm.errors) > 0 ? `${sm.errors} Errors` : 'Healthy'}</div>
                                            <div className="text-xs text-slate-500">{sm.warnings} Warnings</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-slate-500">
                                        No sitemaps found. Ensure sitemaps are submitted in GSC.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Optimization Opportunities</CardTitle>
                            <CardDescription>Pages with high impressions but low CTR</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-slate-500 border-b border-slate-100">
                                            <th className="pb-3 font-medium">Page</th>
                                            <th className="pb-3 font-medium text-right">Impr.</th>
                                            <th className="pb-3 font-medium text-right">CTR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {gscData?.topPages?.filter(p => p.ctr < 0.02 && p.impressions > 100).slice(0, 5).map((page, i) => (
                                            <tr key={i} className="group">
                                                <td className="py-3 pr-2 truncate max-w-[200px] text-slate-700" title={page.keys[0]}>
                                                    {page.keys[0].replace('https://outrightlandscape.com', '')}
                                                </td>
                                                <td className="py-3 px-2 text-right text-slate-600">{page.impressions}</td>
                                                <td className="py-3 pl-2 text-right font-medium text-amber-600">{(page.ctr * 100).toFixed(1)}%</td>
                                            </tr>
                                        ))}
                                        {(!gscData?.topPages?.some(p => p.ctr < 0.02 && p.impressions > 100)) && (
                                            <tr>
                                                <td colSpan="3" className="py-8 text-center text-slate-500">
                                                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                                                    No major low-CTR issues found!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}