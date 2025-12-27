import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, Trash2, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Badge } from "@/components/ui/badge";

export default function SeoGoals({ overviewData, timeline }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const queryClient = useQueryClient();
    const [newGoal, setNewGoal] = useState({
        title: '',
        metric: 'clicks',
        target_value: '',
        deadline: ''
    });

    const { data: goals = [] } = useQuery({
        queryKey: ['seo-goals'],
        queryFn: () => base44.entities.SeoGoal.list(),
    });

    const createGoal = useMutation({
        mutationFn: (data) => base44.entities.SeoGoal.create({
            ...data,
            current_value: getCurrentValue(data.metric), // Set baseline
            status: 'active'
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['seo-goals']);
            setIsDialogOpen(false);
            setNewGoal({ title: '', metric: 'clicks', target_value: '', deadline: '' });
        }
    });

    const deleteGoal = useMutation({
        mutationFn: (id) => base44.entities.SeoGoal.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['seo-goals'])
    });

    const getCurrentValue = (metric) => {
        if (!overviewData) return 0;
        switch (metric) {
            case 'clicks': return overviewData.totalClicks || 0;
            case 'impressions': return overviewData.totalImpressions || 0;
            case 'ctr': return (overviewData.avgCtr || 0) * 100;
            case 'position': return overviewData.avgPosition || 0;
            default: return 0;
        }
    };

    const calculateProgress = (goal) => {
        const current = getCurrentValue(goal.metric);
        const target = goal.target_value;
        const baseline = goal.current_value || 0; // The value when goal was created
        
        if (goal.metric === 'position') {
            // For position, lower is better. 
            // If current <= target, 100%.
            if (current <= target) return 100;
            // Otherwise, calculate improvement relative to baseline?
            // Simplification: if target is 5, current is 10, baseline was 15.
            // Improvement = (baseline - current) / (baseline - target)
            if (baseline <= target) return 0; // Edge case
            const progress = (baseline - current) / (baseline - target) * 100;
            return Math.max(0, Math.min(progress, 100));
        }
        
        // For standard metrics (higher is better)
        // If baseline exists and < target, map progress from baseline->target?
        // Or just absolute 0->target? Let's stick to absolute 0->target for simplicity in visuals unless user specified "increase by X"
        // But user prompt said "Increase by 15%".
        // Let's just do absolute progress for now: current / target
        if (target === 0) return 0;
        const progress = (current / target) * 100;
        return Math.min(progress, 100);
    };

    const getStatus = (goal) => {
        const current = getCurrentValue(goal.metric);
        const isPosition = goal.metric === 'position';
        const achieved = isPosition ? current <= goal.target_value : current >= goal.target_value;
        
        if (achieved) return { label: 'Achieved', color: 'bg-green-100 text-green-700', icon: CheckCircle2 };
        
        // Check time remaining
        const now = new Date();
        const deadline = new Date(goal.deadline);
        const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
        
        if (daysLeft < 0) return { label: 'Missed', color: 'bg-red-100 text-red-700', icon: AlertTriangle };
        
        // Simple projection status
        const progress = calculateProgress(goal);
        if (progress > 50 && daysLeft > 14) return { label: 'On Track', color: 'bg-blue-100 text-blue-700', icon: TrendingUp };
        
        return { label: `${daysLeft} days left`, color: 'bg-slate-100 text-slate-700', icon: Clock };
    };

    const getChartData = (metric) => {
        if (!timeline) return [];
        return timeline.map(item => ({
            value: metric === 'ctr' ? (item.ctr * 100) : item[metric]
        }));
    };

    const getMetricLabel = (metric) => {
        switch (metric) {
            case 'clicks': return 'Monthly Clicks';
            case 'impressions': return 'Monthly Impressions';
            case 'ctr': return 'CTR (%)';
            case 'position': return 'Avg Position';
            default: return metric;
        }
    };

    const formatValue = (val, metric) => {
        if (metric === 'ctr') return `${Number(val).toFixed(2)}%`;
        if (metric === 'position') return Number(val).toFixed(1);
        return Number(val).toLocaleString();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createGoal.mutate({
            ...newGoal,
            target_value: Number(newGoal.target_value)
        });
    };

    return (
        <Card className="shadow-sm border-t-4 border-t-indigo-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-500" />
                        SEO Goals
                    </CardTitle>
                    <CardDescription>Track progress towards your SMART goals</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-1">
                            <Plus className="w-4 h-4" /> Add Goal
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Set New SMART Goal</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Goal Title</Label>
                                <Input 
                                    placeholder="e.g. Increase organic traffic by 15% in 3 months" 
                                    value={newGoal.title}
                                    onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                                    required
                                />
                                <p className="text-xs text-slate-500">Be Specific, Measurable, Achievable, Relevant, and Time-bound.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Metric to Track</Label>
                                    <Select 
                                        value={newGoal.metric} 
                                        onValueChange={v => setNewGoal({...newGoal, metric: v})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="clicks">Total Clicks</SelectItem>
                                            <SelectItem value="impressions">Total Impressions</SelectItem>
                                            <SelectItem value="ctr">Avg CTR (%)</SelectItem>
                                            <SelectItem value="position">Avg Position</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Target Value</Label>
                                    <Input 
                                        type="number" 
                                        step="0.1"
                                        placeholder="Target number" 
                                        value={newGoal.target_value}
                                        onChange={e => setNewGoal({...newGoal, target_value: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Target Date</Label>
                                <Input 
                                    type="date" 
                                    value={newGoal.deadline}
                                    onChange={e => setNewGoal({...newGoal, deadline: e.target.value})}
                                    required
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={createGoal.isPending}>
                                    {createGoal.isPending ? "Creating..." : "Set Goal"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {goals.length === 0 && (
                        <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            <Target className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-slate-500 font-medium">No active goals</p>
                            <p className="text-xs text-slate-400 mb-4">Set a target to track your SEO success</p>
                            <Button size="sm" variant="outline" onClick={() => setIsDialogOpen(true)}>
                                Create First Goal
                            </Button>
                        </div>
                    )}
                    {goals.map(goal => {
                        const current = getCurrentValue(goal.metric);
                        const progress = calculateProgress(goal);
                        const status = getStatus(goal);
                        const chartData = getChartData(goal.metric);
                        const StatusIcon = status.icon;

                        return (
                            <div key={goal.id} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline" className={`${status.color} border-0 flex items-center gap-1`}>
                                                <StatusIcon className="w-3 h-3" /> {status.label}
                                            </Badge>
                                            <span className="text-xs text-slate-400">Due {new Date(goal.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">{goal.title}</h4>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6 text-slate-300 hover:text-red-500"
                                        onClick={() => deleteGoal.mutate(goal.id)}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div className="md:col-span-2 space-y-2">
                                        <div className="flex items-end justify-between text-sm">
                                            <div>
                                                <div className="text-xs text-slate-500 mb-0.5">{getMetricLabel(goal.metric)}</div>
                                                <span className="text-2xl font-bold text-slate-900 leading-none">{formatValue(current, goal.metric)}</span>
                                                <span className="text-xs text-slate-400 ml-2">/ {formatValue(goal.target_value, goal.metric)} target</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-bold text-indigo-600">{progress.toFixed(0)}%</span>
                                            </div>
                                        </div>
                                        
                                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-700 ease-out rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                                style={{ width: `${progress}%` }} 
                                            />
                                        </div>
                                    </div>

                                    {/* Mini Sparkline Chart */}
                                    <div className="h-12 w-full hidden md:block">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id={`gradient-${goal.id}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="value" 
                                                    stroke="#6366f1" 
                                                    strokeWidth={2}
                                                    fill={`url(#gradient-${goal.id})`} 
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}