import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, Users, Activity, AlertTriangle, BarChart3, RefreshCcw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Search, MousePointer2, Eye, TrendingUp as TrendingUpIcon } from "lucide-react";

export default function AdminAnalytics() {
    // Check Admin Auth
    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => base44.auth.me(),
    });

    // GA4 Data Query
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['analytics-data'],
        queryFn: async () => {
            try {
                const res = await base44.functions.invoke("getAnalyticsData");
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

    const { timeline, sources, insights } = data || {};

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="text-blue-600" />
                            Performance Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">Website traffic and engagement trends (Last 28 Days)</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
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
                    </div>
                    {(data || gscData) && <span className="text-[10px] text-gray-400">Updated: {new Date().toLocaleTimeString()}</span>}
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                            <p className="text-xs text-green-600 mt-1">Active in last 30 mins</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Total Users (28d)</span>
                                <Users className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-2xl font-bold">
                                {timeline?.reduce((acc, curr) => acc + curr.users, 0).toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Avg. Engagement</span>
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-2xl font-bold">
                                {(timeline?.reduce((acc, curr) => acc + curr.engagement, 0) / (timeline?.length || 1)).toFixed(1)}%
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Total Sessions</span>
                                <Activity className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-2xl font-bold">
                                {timeline?.reduce((acc, curr) => acc + curr.sessions, 0).toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Traffic Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Traffic Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={timeline}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis 
                                            dataKey="date" 
                                            tick={{fontSize: 12}} 
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis 
                                            tick={{fontSize: 12}} 
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip />
                                        <Line 
                                            type="monotone" 
                                            dataKey="users" 
                                            stroke="#2563eb" 
                                            strokeWidth={2} 
                                            dot={false}
                                            name="Users"
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="sessions" 
                                            stroke="#10b981" 
                                            strokeWidth={2} 
                                            dot={false}
                                            name="Sessions"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Traffic Sources */}
                    <Card>
                    <CardHeader>
                        <CardTitle>Top Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sources} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="source" 
                                        type="category" 
                                        width={100}
                                        tick={{fontSize: 11}}
                                    />
                                    <Tooltip />
                                    <Bar dataKey="users" fill="#8884d8" radius={[0, 4, 4, 0]} />
                                </BarChart>
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