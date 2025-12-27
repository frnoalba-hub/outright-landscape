import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, Trash2, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SeoGoals({ overviewData }) {
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
        
        if (goal.metric === 'position') {
            // Lower is better for position
            if (current <= target) return 100;
            // Provide some scale relative to baseline, but simple is better for now
            return 0; 
        }
        
        if (target === 0) return 0;
        const progress = (current / target) * 100;
        return Math.min(progress, 100);
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
                    <CardDescription>Track your progress against 28-day performance targets</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-1">
                            <Plus className="w-4 h-4" /> Add Goal
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Set New SEO Goal</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Goal Title</Label>
                                <Input 
                                    placeholder="e.g. Reach 10k Impressions" 
                                    value={newGoal.title}
                                    onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Metric</Label>
                                <Select 
                                    value={newGoal.metric} 
                                    onValueChange={v => setNewGoal({...newGoal, metric: v})}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="clicks">Total Clicks (28d)</SelectItem>
                                        <SelectItem value="impressions">Total Impressions (28d)</SelectItem>
                                        <SelectItem value="ctr">Avg CTR (%)</SelectItem>
                                        <SelectItem value="position">Avg Position (Lower is better)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Target Value</Label>
                                <Input 
                                    type="number" 
                                    step="0.1"
                                    placeholder="Enter target number" 
                                    value={newGoal.target_value}
                                    onChange={e => setNewGoal({...newGoal, target_value: e.target.value})}
                                    required
                                />
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
                                    {createGoal.isPending ? "Creating..." : "Create Goal"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {goals.length === 0 && (
                        <div className="text-center py-6 text-gray-400 text-sm">
                            No goals set. Click "Add Goal" to start tracking.
                        </div>
                    )}
                    {goals.map(goal => {
                        const current = getCurrentValue(goal.metric);
                        const progress = calculateProgress(goal);
                        const isPosition = goal.metric === 'position';
                        const isAchieved = isPosition ? current <= goal.target_value : current >= goal.target_value;

                        return (
                            <div key={goal.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-medium text-slate-800 flex items-center gap-2">
                                            {goal.title}
                                            {isAchieved && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                        </h4>
                                        <div className="text-xs text-slate-500">
                                            {getMetricLabel(goal.metric)} • Due: {new Date(goal.deadline).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6 text-slate-400 hover:text-red-500"
                                        onClick={() => deleteGoal.mutate(goal.id)}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="font-bold text-slate-700">{formatValue(current, goal.metric)}</span>
                                    <span className="text-slate-500">Target: {formatValue(goal.target_value, goal.metric)}</span>
                                </div>
                                
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-500 ${isAchieved ? 'bg-green-500' : 'bg-indigo-500'}`}
                                        style={{ width: `${isPosition ? (isAchieved ? 100 : 50) : progress}%` }} // Simplified visual for position
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}