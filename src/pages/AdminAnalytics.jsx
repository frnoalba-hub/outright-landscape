import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, TrendingUp, Users, Activity, AlertTriangle, BarChart3, RefreshCcw, Download, Calendar, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';
import { Search, MousePointer2, Eye, TrendingUp as TrendingUpIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminAnalytics() {
    const [dateRange, setDateRange] = useState('28');
    const [exportFormat, setExportFormat] = useState('csv');
    
    // Check Admin Auth
    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => base44.auth.me(),
    });

    // GA4 Data Query with date range
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['analytics-data', dateRange],
        queryFn: async () => {
            try {
                const res = await base44.functions.invoke("getAnalyticsData", { dateRange });
                if (res.ok === false) {
                    const errData = await res.json();
                    throw new Error(errData.details || errData.error || "Failed to fetch analytics");
                }
                return res.data || res;
            } catch (err) {
                if (err.response && err.response.data) {
                    const errData = err.response.data;
                    throw new Error(errData.details || errData.error || err.message);
                }
                throw err;
            }
        },
        enabled: !!user && user.role === 'admin',
        retry: false
    });

    // Search Console Data Query
    const { data: gscData, isLoading: isGscLoading, error: gscError, refetch: refetchGsc } = useQuery({
        queryKey: ['search-console-data'],
        queryFn: async () => {
            try {
                const res = await base44.functions.invoke("getSearchConsoleData");
                if (res.ok === false) {
                    const errData = await res.json();
                    throw new Error(errData.details || errData.error || "Failed to fetch search console data");
                }
                return res.data || res;
            } catch (err) {
                if (err.response && err.response.data) {
                    const errData = err.response.data;
                    throw new Error(errData.details || errData.error || err.message);
                }
                throw err;
            }
        },
        enabled: !!user && user.role === 'admin',
        retry: false
    });

    const refreshAll = () => {
        refetch();
        refetchGsc();
    };

    const exportData = () => {
        if (!data) return;
        
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `analytics-report-${timestamp}.${exportFormat}`;
        
        if (exportFormat === 'csv') {
            // CSV Export
            const csvData = [
                ['Date', 'Users', 'Sessions', 'Engagement %'],
                ...(data.timeline || []).map(row => [row.date, row.users, row.sessions, row.engagement.toFixed(1)])
            ];
            const csvContent = csvData.map(row => row.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
        } else {
            // JSON Export
            const jsonContent = JSON.stringify({
                exportDate: new Date().toISOString(),
                dateRange: `Last ${dateRange} days`,
                timeline: data.timeline,
                sources: data.sources,
                liveUsers: data.liveUsers
            }, null, 2);
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
        }
    };

    const calculateTrend = (timeline, metric) => {
        if (!timeline || timeline.length < 14) return { percent: 0, direction: 'neutral' };
        
        const midpoint = Math.floor(timeline.length / 2);
        const firstHalf = timeline.slice(0, midpoint);
        const secondHalf = timeline.slice(midpoint);
        
        const firstAvg = firstHalf.reduce((acc, curr) => acc + curr[metric], 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((acc, curr) => acc + curr[metric], 0) / secondHalf.length;
        
        const percentChange = ((secondAvg - firstAvg) / firstAvg) * 100;
        const direction = percentChange > 0 ? 'up' : percentChange < 0 ? 'down' : 'neutral';
        
        return { percent: Math.abs(percentChange), direction };
    };

    if (isAuthLoading || (isLoading && !error)) {
        return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <Button onClick={() => base44.auth.redirectToLogin()}>Log In as Admin</Button>
            </div>
        );
    }

    // Handle Configuration Error state specifically
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-600">
                            <AlertTriangle /> Configuration Needed
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">
                            To view the dashboard, you need to configure the Google Analytics secrets in your app settings.
                        </p>
                        
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm mb-2">
                                <strong>Error:</strong> {error.message}
                            </div>
                        )}

                        <div className="bg-gray-100 p-4 rounded text-sm font-mono break-all">
                            1. GA4_PROPERTY_ID (Numeric ID, not G-XXXX)<br/>
                            2. GOOGLE_SERVICE_ACCOUNT_JSON
                        </div>
                        <Button 
                            className="w-full"
                            onClick={() => refetch()}
                        >
                            Retry Connection
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const { timeline, sources, insights, conversionRate, topPages } = data || {};
    const usersTrend = calculateTrend(timeline, 'users');
    const sessionsTrend = calculateTrend(timeline, 'sessions');

    // Calculate bounce rate and conversions (mock for now)
    const totalSessions = timeline?.reduce((acc, curr) => acc + curr.sessions, 0) || 0;
    const totalUsers = timeline?.reduce((acc, curr) => acc + curr.users, 0) || 0;
    const avgEngagement = timeline?.length ? (timeline.reduce((acc, curr) => acc + curr.engagement, 0) / timeline.length) : 0;

    return (
        <div className="min-h-screen bg-gray-50 p-8 pt-28">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="text-blue-600" />
                            Advanced Analytics Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">Real-time traffic, engagement metrics & SEO performance</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="14">Last 14 days</SelectItem>
                            <SelectItem value="28">Last 28 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                    {data && !error && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            GA4 Connected
                        </span>
                    )}
                    {gscData && !gscError && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            <Search className="w-3 h-3" />
                            GSC Connected
                        </span>
                    )}
                    <Button variant="outline" size="sm" onClick={refreshAll} disabled={isLoading || isGscLoading}>
                        {(isLoading || isGscLoading) ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
                        Refresh
                    </Button>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={exportData} disabled={!data}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    </div>
                    </div>
                    {(data || gscData) && <span className="text-[10px] text-gray-400 mt-2">Updated: {new Date().toLocaleTimeString()}</span>}
                    </div>
                </div>

                {/* AI Insights Banner */}
                {insights && (
                    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-blue-100">
                        <CardContent className="p-6">
                            <h3 className="flex items-center gap-2 font-bold text-indigo-900 mb-2">
                                <Activity className="w-5 h-5 text-indigo-600" />
                                AI Performance Analysis
                            </h3>
                            <p className="text-indigo-800 leading-relaxed">
                                {typeof insights === 'string' ? insights : JSON.stringify(insights)}
                            </p>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Live Users Card */}
                <Card className="border-green-200 bg-green-50/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-green-700 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Live Users
                        </span>
                        <Activity className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-800">
                        {data?.liveUsers || 0}
                    </div>
                    <p className="text-xs text-green-600 mt-1">Active right now</p>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Total Users</span>
                        <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                        {usersTrend.direction !== 'neutral' && (
                            <div className={`flex items-center text-sm ${usersTrend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {usersTrend.direction === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {usersTrend.percent.toFixed(1)}%
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Last {dateRange} days</p>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Total Sessions</span>
                        <Activity className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
                        {sessionsTrend.direction !== 'neutral' && (
                            <div className={`flex items-center text-sm ${sessionsTrend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {sessionsTrend.direction === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {sessionsTrend.percent.toFixed(1)}%
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Avg {(totalSessions/totalUsers).toFixed(1)} per user</p>
                </CardContent>
                </Card>

                <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Engaged Sessions</span>
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold">{(data?.engagedSessionsTotal || 0).toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-1">Total engaged sessions</p>
                </CardContent>
                </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Traffic Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Traffic & Engagement Trends</CardTitle>
                            <CardDescription>Daily users, sessions, and engagement rate over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={timeline}>
                                        <defs>
                                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis 
                                            dataKey="date" 
                                            tick={{fontSize: 11, fill: '#64748b'}} 
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis 
                                            tick={{fontSize: 11, fill: '#64748b'}} 
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                            }}
                                        />
                                        <Legend />
                                        <Area 
                                            type="monotone" 
                                            dataKey="users" 
                                            stroke="#3b82f6" 
                                            strokeWidth={2}
                                            fill="url(#colorUsers)"
                                            name="Users"
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="sessions" 
                                            stroke="#10b981" 
                                            strokeWidth={2}
                                            fill="url(#colorSessions)"
                                            name="Sessions"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Traffic Sources Distribution */}
                    <Card>
                    <CardHeader>
                        <CardTitle>Traffic Sources</CardTitle>
                        <CardDescription>Where visitors come from</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sources}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({source, percent}) => `${source} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="users"
                                    >
                                        {sources?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    </Card>
                    </div>

                    {/* Google Search Console Section */}
                    <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                    <Search className="text-blue-600" />
                    Google Search Performance <span className="text-sm font-normal text-gray-500">(Last 28 Days)</span>
                    </h2>

                    {gscError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                        <h3 className="font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Search Console Error</h3>
                        <p className="text-sm mt-1">{gscError.message}</p>
                        <p className="text-xs mt-2 text-gray-500">Ensure GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON is set and the email is added to your Search Console users.</p>
                    </div>
                    )}

                    {!gscData && !gscError && isGscLoading && (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                    )}

                    {gscData && (
                    <div className="space-y-6">
                        {/* GSC Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-500">Total Clicks</span>
                                        <MousePointer2 className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div className="text-2xl font-bold">{gscData.overview.totalClicks.toLocaleString()}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-500">Total Impressions</span>
                                        <Eye className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <div className="text-2xl font-bold">{gscData.overview.totalImpressions.toLocaleString()}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-500">Avg. CTR</span>
                                        <TrendingUpIcon className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="text-2xl font-bold">{(gscData.overview.avgCtr * 100).toFixed(1)}%</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-500">Avg. Position</span>
                                        <BarChart3 className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <div className="text-2xl font-bold">{gscData.overview.avgPosition.toFixed(1)}</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Top Queries */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Search Queries</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b text-left text-gray-500">
                                                    <th className="pb-2 font-medium">Query</th>
                                                    <th className="pb-2 font-medium text-right">Clicks</th>
                                                    <th className="pb-2 font-medium text-right">Impr.</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {gscData.topQueries.map((q, i) => (
                                                    <tr key={i}>
                                                        <td className="py-2">{q.keys[0]}</td>
                                                        <td className="py-2 text-right font-medium">{q.clicks}</td>
                                                        <td className="py-2 text-right text-gray-500">{q.impressions}</td>
                                                    </tr>
                                                ))}
                                                {gscData.topQueries.length === 0 && (
                                                    <tr>
                                                        <td colSpan="3" className="py-4 text-center text-gray-500">No query data available yet</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Pages */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Pages in Search</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b text-left text-gray-500">
                                                    <th className="pb-2 font-medium">Page</th>
                                                    <th className="pb-2 font-medium text-right">Clicks</th>
                                                    <th className="pb-2 font-medium text-right">CTR</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {gscData.topPages.map((p, i) => (
                                                    <tr key={i}>
                                                        <td className="py-2 truncate max-w-[200px]" title={p.keys[0]}>{p.keys[0].replace('https://outrightlandscape.com', '')}</td>
                                                        <td className="py-2 text-right font-medium">{p.clicks}</td>
                                                        <td className="py-2 text-right text-gray-500">{(p.ctr * 100).toFixed(1)}%</td>
                                                    </tr>
                                                ))}
                                                {gscData.topPages.length === 0 && (
                                                    <tr>
                                                        <td colSpan="3" className="py-4 text-center text-gray-500">No page data available yet</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    )}
                    </div>
                    </div>
                    </div>
                    );
                    }