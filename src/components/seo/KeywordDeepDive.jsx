import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Loader2, Search, TrendingUp, Target, Plus, RefreshCw, Trophy } from "lucide-react";

export default function KeywordDeepDive() {
    const queryClient = useQueryClient();
    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const [newKeyword, setNewKeyword] = useState("");

    // 1. Fetch Tracked Keywords (Snapshots)
    // We group by keyword to get the list of unique keywords tracked
    const { data: snapshots = [], isLoading: isSnapshotsLoading } = useQuery({
        queryKey: ['keyword-snapshots'],
        queryFn: () => base44.entities.KeywordRankSnapshot.list({ sort: { snapshot_date: 1 } }, 100),
    });

    // Unique keywords list
    const trackedKeywords = [...new Set(snapshots.map(s => s.keyword))];

    // 2. Fetch GSC Data for Selected Keyword (Performance Trend)
    const { data: keywordGscData, isLoading: isGscLoading } = useQuery({
        queryKey: ['gsc-keyword', selectedKeyword],
        queryFn: async () => {
            const res = await base44.functions.invoke("getSearchConsoleData", { keyword: selectedKeyword });
            if (res.ok === false) throw new Error("Failed to fetch GSC data");
            return res.data;
        },
        enabled: !!selectedKeyword
    });

    // 3. Track New/Existing Keyword Mutation
    const trackMutation = useMutation({
        mutationFn: async (keyword) => {
            const res = await base44.functions.invoke("trackKeywordRank", { keyword });
            if (res.ok === false) throw new Error("Failed to track keyword");
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['keyword-snapshots']);
            if (!selectedKeyword) setSelectedKeyword(variables); // Auto-select if none selected
            setNewKeyword("");
        }
    });

    // --- Data Processing ---
    
    // Competitor Rank History for Chart
    const getRankHistoryData = () => {
        if (!selectedKeyword) return [];
        const keywordSnaps = snapshots.filter(s => s.keyword === selectedKeyword);
        
        return keywordSnaps.map(snap => {
            const point = {
                date: new Date(snap.snapshot_date).toLocaleDateString(),
                "Our Rank": snap.our_rank === 0 ? null : snap.our_rank, // Null for gaps
            };
            snap.competitor_ranks?.forEach(comp => {
                point[comp.name] = comp.rank;
            });
            return point;
        });
    };

    const rankHistory = getRankHistoryData();
    const competitors = [...new Set(snapshots.flatMap(s => s.competitor_ranks?.map(c => c.name) || []))];
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"];

    return (
        <Card className="border-t-4 border-t-cyan-500 shadow-sm">
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-cyan-600" />
                            Keyword Intelligence
                        </CardTitle>
                        <CardDescription>Deep dive into specific keywords and competitor rankings</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Select value={selectedKeyword || ""} onValueChange={setSelectedKeyword}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Keyword" />
                            </SelectTrigger>
                            <SelectContent>
                                {trackedKeywords.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                            <Input 
                                placeholder="New Keyword..." 
                                value={newKeyword} 
                                onChange={e => setNewKeyword(e.target.value)} 
                                className="w-40"
                            />
                            <Button 
                                size="icon" 
                                onClick={() => trackMutation.mutate(newKeyword)}
                                disabled={!newKeyword || trackMutation.isPending}
                            >
                                {trackMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {!selectedKeyword ? (
                    <div className="text-center py-12 text-slate-400">
                        <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Select or add a keyword to view insights</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* 1. Header Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-cyan-50 border-cyan-100">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-cyan-700 uppercase">Current GSC Clicks</p>
                                        <p className="text-2xl font-bold text-cyan-900">
                                            {keywordGscData?.overview?.totalClicks || 0}
                                        </p>
                                    </div>
                                    <Target className="text-cyan-400 w-8 h-8" />
                                </CardContent>
                            </Card>
                            <Card className="bg-purple-50 border-purple-100">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-purple-700 uppercase">Avg Position (GSC)</p>
                                        <p className="text-2xl font-bold text-purple-900">
                                            {keywordGscData?.overview?.avgPosition?.toFixed(1) || "-"}
                                        </p>
                                    </div>
                                    <Trophy className="text-purple-400 w-8 h-8" />
                                </CardContent>
                            </Card>
                            <Card className="bg-slate-50 border-slate-100 flex items-center justify-center">
                                <Button 
                                    variant="outline" 
                                    className="w-full h-full border-dashed"
                                    onClick={() => trackMutation.mutate(selectedKeyword)}
                                    disabled={trackMutation.isPending}
                                >
                                    {trackMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <RefreshCw className="w-4 h-4 mr-2" />}
                                    Update Rank Snapshot
                                </Button>
                            </Card>
                        </div>

                        {/* 2. Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* GSC Performance Chart */}
                            <div className="h-[300px] border rounded-lg p-4 bg-white">
                                <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" /> 28-Day Performance (Clicks vs Impressions)
                                </h4>
                                {keywordGscData?.timeline ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={keywordGscData.timeline}>
                                            <defs>
                                                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="keys[0]" tickFormatter={(t) => new Date(t).toLocaleDateString(undefined, {day:'numeric', month:'short'})} fontSize={12} />
                                            <YAxis yAxisId="left" fontSize={12} />
                                            <YAxis yAxisId="right" orientation="right" fontSize={12} />
                                            <Tooltip labelFormatter={(t) => new Date(t).toLocaleDateString()} />
                                            <Area yAxisId="left" type="monotone" dataKey="clicks" stroke="#06b6d4" fillOpacity={1} fill="url(#colorClicks)" name="Clicks" />
                                            <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="#8b5cf6" dot={false} name="Impressions" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-slate-400">No GSC Data Available</div>
                                )}
                            </div>

                            {/* Competitor Ranking Chart */}
                            <div className="h-[300px] border rounded-lg p-4 bg-white">
                                <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <Trophy className="w-4 h-4" /> Competitor Ranking History
                                </h4>
                                {rankHistory.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={rankHistory}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="date" fontSize={12} />
                                            <YAxis reversed={true} domain={[1, 20]} fontSize={12} label={{ value: 'Rank (Lower is Better)', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="Our Rank" stroke="#000000" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} connectNulls />
                                            {competitors.map((comp, idx) => (
                                                <Line 
                                                    key={comp} 
                                                    type="monotone" 
                                                    dataKey={comp} 
                                                    stroke={colors[idx % colors.length]} 
                                                    strokeWidth={1}
                                                    strokeDasharray="5 5"
                                                    connectNulls
                                                />
                                            ))}
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-slate-400">
                                        No ranking snapshots yet. Click "Update Rank Snapshot".
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}