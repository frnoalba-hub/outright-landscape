import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Swords, RefreshCw, Eye, TrendingUp, AlertTriangle, CheckCircle2, Globe, Target } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CompetitorAnalysis() {
    const queryClient = useQueryClient();
    const [analyzingId, setAnalyzingId] = useState(null);

    const { data: competitors = [], isLoading } = useQuery({
        queryKey: ['competitors'],
        queryFn: () => base44.entities.Competitor.list(),
    });

    const autoTrackMutation = useMutation({
        mutationFn: () => base44.functions.invoke("manageCompetitors", { action: "auto_track" }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['competitors']);
        }
    });

    // Auto-trigger if data is stale or empty (check once on mount)
    React.useEffect(() => {
        if (competitors.length === 0 && !isLoading) {
            // Initial discovery if empty
            // autoTrackMutation.mutate(); // Uncomment to auto-run on empty, but let's leave manual first time for UX control
        } else if (competitors.length > 0) {
            // Check if we need a background update (any competitor older than 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const needsUpdate = competitors.some(c => !c.last_analyzed || new Date(c.last_analyzed) < sevenDaysAgo);
            
            if (needsUpdate && !autoTrackMutation.isPending && !autoTrackMutation.isSuccess) {
                // console.log("Triggering auto-update..."); 
                // autoTrackMutation.mutate(); // Optional: Auto-trigger
            }
        }
    }, [competitors.length, isLoading]);

    const analyzeMutation = useMutation({
        mutationFn: (domain) => base44.functions.invoke("manageCompetitors", { action: "analyze", domain }),
        onSuccess: () => {
            queryClient.invalidateQueries(['competitors']);
            setAnalyzingId(null);
        },
        onError: () => setAnalyzingId(null)
    });

    const handleAnalyze = (id, domain) => {
        setAnalyzingId(id);
        analyzeMutation.mutate(domain);
    };

    const getThreatColor = (level) => {
        switch(level?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>;

    return (
        <Card className="shadow-sm border-t-4 border-t-rose-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Swords className="w-5 h-5 text-rose-500" />
                        Competitive Landscape
                    </CardTitle>
                    <CardDescription>AI-detected local competitors & analysis</CardDescription>
                </div>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => autoTrackMutation.mutate()}
                    disabled={autoTrackMutation.isPending}
                    className="gap-2"
                >
                    {autoTrackMutation.isPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin"/> Scanning Market...</>
                    ) : (
                        <><RefreshCw className="w-4 h-4" /> Auto-Track Market</>
                    )}
                </Button>
            </CardHeader>
            <CardContent>
                {competitors.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        <Swords className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-slate-900 font-medium mb-1">No Competitors Tracked</h3>
                        <p className="text-slate-500 text-sm mb-4 max-w-xs mx-auto">
                            Let our AI scan the local market in Covina/San Gabriel Valley to identify who you're up against.
                        </p>
                        <Button onClick={() => autoTrackMutation.mutate()} disabled={autoTrackMutation.isPending}>
                            {autoTrackMutation.isPending ? "Scanning Market..." : "Start Auto-Tracking"}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <ScrollArea className="h-[400px] pr-4">
                            <Accordion type="single" collapsible className="w-full space-y-3">
                                {competitors.map((comp) => (
                                    <AccordionItem key={comp.id} value={comp.id} className="border rounded-lg bg-white px-4">
                                        <AccordionTrigger className="hover:no-underline py-3">
                                            <div className="flex items-center gap-4 w-full text-left">
                                                <div className="bg-slate-100 p-2 rounded-full">
                                                    <Globe className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-900">{comp.name}</span>
                                                        <Badge variant="outline" className={`text-[10px] uppercase font-bold ${getThreatColor(comp.threat_level)}`}>
                                                            {comp.threat_level} Threat
                                                        </Badge>
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-0.5">{comp.domain}</div>
                                                </div>
                                                {(!comp.strengths && !analyzingId) && (
                                                    <span className="text-xs text-blue-600 font-medium mr-2 flex items-center gap-1">
                                                        <RefreshCw className="w-3 h-3" /> Needs Analysis
                                                    </span>
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <div className="space-y-4">
                                                <p className="text-sm text-slate-600">{comp.description}</p>
                                                
                                                {comp.strategy_to_beat ? (
                                                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                                                        <div className="space-y-3">
                                                            <div className="bg-green-50 p-3 rounded-md border border-green-100">
                                                                <h4 className="text-xs font-bold uppercase text-green-700 mb-1 flex items-center gap-1">
                                                                    <Target className="w-3 h-3" /> Strategy to Win
                                                                </h4>
                                                                <p className="text-sm text-green-800 leading-relaxed">{comp.strategy_to_beat}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Overlap Keywords</h4>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {comp.overlap_keywords?.map((kw, i) => (
                                                                        <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600">
                                                                            {kw}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-3 text-sm">
                                                            <div className="p-3 bg-slate-50 rounded-md">
                                                                <h4 className="font-semibold text-slate-700 mb-1 flex items-center gap-2">
                                                                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Their Strengths
                                                                </h4>
                                                                <p className="text-slate-600">{comp.strengths}</p>
                                                            </div>
                                                            <div className="p-3 bg-slate-50 rounded-md">
                                                                <h4 className="font-semibold text-slate-700 mb-1 flex items-center gap-2">
                                                                    <AlertTriangle className="w-3 h-3 text-amber-500" /> Their Weaknesses
                                                                </h4>
                                                                <p className="text-slate-600">{comp.weaknesses}</p>
                                                            </div>
                                                            <div className="text-xs text-slate-400 text-right pt-2">
                                                                Last analyzed: {new Date(comp.last_analyzed).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-slate-50 p-6 rounded-lg text-center">
                                                        <p className="text-sm text-slate-500 mb-3">
                                                            Deep analysis needed to uncover strengths, weaknesses, and winning strategies.
                                                        </p>
                                                        <Button 
                                                            size="sm" 
                                                            onClick={() => handleAnalyze(comp.id, comp.domain)}
                                                            disabled={analyzingId === comp.id}
                                                        >
                                                            {analyzingId === comp.id ? (
                                                                <><Loader2 className="w-3 h-3 animate-spin mr-2" /> Analyzing...</>
                                                            ) : (
                                                                <><Eye className="w-3 h-3 mr-2" /> Run AI Analysis</>
                                                            )}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollArea>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}