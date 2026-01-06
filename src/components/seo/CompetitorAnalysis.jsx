import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Swords, RefreshCw, Eye, TrendingUp, AlertTriangle, CheckCircle2, Globe, Target, Plus, Trash2, BarChart3, ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompetitorAnalysis() {
    const queryClient = useQueryClient();
    const [analyzingId, setAnalyzingId] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newCompetitor, setNewCompetitor] = useState({ name: '', domain: '', threat_level: 'Medium' });

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

    const addManualMutation = useMutation({
        mutationFn: (data) => base44.entities.Competitor.create({
            ...data,
            description: `Manually added competitor: ${data.name}`,
            last_analyzed: null
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['competitors']);
            setAddDialogOpen(false);
            setNewCompetitor({ name: '', domain: '', threat_level: 'Medium' });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Competitor.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['competitors']);
        }
    });

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
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Swords className="w-5 h-5 text-rose-500" />
                            Competitive Landscape
                        </CardTitle>
                        <CardDescription>Track, analyze & outrank your local competitors</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Plus className="w-4 h-4" /> Add Competitor
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Competitor Manually</DialogTitle>
                                    <DialogDescription>Track a specific competitor you want to monitor</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="comp-name">Company Name</Label>
                                        <Input 
                                            id="comp-name" 
                                            placeholder="e.g., ABC Landscaping"
                                            value={newCompetitor.name}
                                            onChange={(e) => setNewCompetitor({...newCompetitor, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="comp-domain">Website Domain</Label>
                                        <Input 
                                            id="comp-domain" 
                                            placeholder="abclandscaping.com"
                                            value={newCompetitor.domain}
                                            onChange={(e) => setNewCompetitor({...newCompetitor, domain: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="threat">Threat Level</Label>
                                        <Select value={newCompetitor.threat_level} onValueChange={(val) => setNewCompetitor({...newCompetitor, threat_level: val})}>
                                            <SelectTrigger id="threat">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="Low">Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                                    <Button 
                                        onClick={() => addManualMutation.mutate(newCompetitor)}
                                        disabled={!newCompetitor.name || !newCompetitor.domain || addManualMutation.isPending}
                                    >
                                        {addManualMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                        Add Competitor
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => autoTrackMutation.mutate()}
                            disabled={autoTrackMutation.isPending}
                            className="gap-2"
                        >
                            {autoTrackMutation.isPending ? (
                                <><Loader2 className="w-4 h-4 animate-spin"/> Scanning...</>
                            ) : (
                                <><RefreshCw className="w-4 h-4" /> Auto-Track</>
                            )}
                        </Button>
                    </div>
                </div>
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
                                    <AccordionItem key={comp.id} value={comp.id} className="border rounded-lg bg-white px-4 hover:border-slate-300 transition-colors">
                                        <AccordionTrigger className="hover:no-underline py-3">
                                            <div className="flex items-center gap-3 w-full text-left">
                                                <div className="bg-gradient-to-br from-rose-100 to-rose-50 p-2 rounded-full">
                                                    <Globe className="w-4 h-4 text-rose-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-semibold text-slate-900">{comp.name}</span>
                                                        <Badge variant="outline" className={`text-[10px] uppercase font-bold ${getThreatColor(comp.threat_level)}`}>
                                                            {comp.threat_level}
                                                        </Badge>
                                                        {comp.strategy_to_beat && (
                                                            <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">
                                                                <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Analyzed
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-slate-500 truncate">{comp.domain}</span>
                                                        <a 
                                                            href={`https://${comp.domain}`} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-slate-400 hover:text-blue-600 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (confirm(`Remove ${comp.name} from tracking?`)) {
                                                            deleteMutation.mutate(comp.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
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