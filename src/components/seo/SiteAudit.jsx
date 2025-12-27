import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ScanSearch, AlertTriangle, CheckCircle2, XCircle, Gauge, ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function SiteAudit() {
    const [url, setUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    // Fetch locations for quick select
    const { data: locations = [] } = useQuery({
        queryKey: ['locations-audit'],
        queryFn: () => base44.entities.Location.list(null, 100),
    });

    const knownPages = [
        { name: "Home Page", path: "/" },
        { name: "Blog Index", path: "/Blog" },
        ...locations.map(loc => ({ name: `Service Area: ${loc.name}`, path: `/ServiceArea?city=${loc.slug}` }))
    ];

    const handleQuickSelect = (path) => {
        setUrl(window.location.origin + path);
    };

    // Fetch latest report
    const { data: latestReport, isLoading: isReportLoading } = useQuery({
        queryKey: ['seo-audit-latest'],
        queryFn: async () => {
            const reports = await base44.entities.SeoAuditReport.list({
                sort: { scanned_at: -1 },
                limit: 1
            });
            return reports[0] || null;
        }
    });

    const auditMutation = useMutation({
        mutationFn: async (targetUrl) => {
            const res = await base44.functions.invoke("performSeoAudit", { url: targetUrl });
            if (res.ok === false) {
                const err = await res.json();
                throw new Error(err.error || "Audit failed");
            }
            return res.data || res;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['seo-audit-latest']);
            setUrl(''); // Reset input
        }
    });

    const handleAudit = (e) => {
        e.preventDefault();
        // Default to current origin if relative or empty, but user should provide full url ideally
        // But for convenience let's default to window.location.origin
        const target = url || window.location.origin;
        auditMutation.mutate(target);
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return 'text-red-600 bg-red-50 border-red-200';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
            case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-green-500';
        if (score >= 70) return 'text-amber-500';
        return 'text-red-500';
    };

    return (
        <Card className="shadow-sm border-t-4 border-t-slate-800">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <ScanSearch className="w-5 h-5 text-slate-800" />
                            Automated Site Audit
                        </CardTitle>
                        <CardDescription>Comprehensive Technical & Content Analysis</CardDescription>
                    </div>
                    <form onSubmit={handleAudit} className="flex gap-2 w-full md:w-auto items-center">
                        <div className="w-[180px] hidden md:block">
                            <Select onValueChange={handleQuickSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Quick Select Page" />
                                </SelectTrigger>
                                <SelectContent>
                                    {knownPages.map((page, idx) => (
                                        <SelectItem key={idx} value={page.path}>
                                            {page.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Input 
                            placeholder="https://..." 
                            value={url} 
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full md:w-64"
                        />
                        <Button type="submit" disabled={auditMutation.isPending}>
                            {auditMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Gauge className="w-4 h-4 mr-2" />}
                            {auditMutation.isPending ? 'Scanning...' : 'Run Audit'}
                        </Button>
                    </form>
                </div>
            </CardHeader>
            <CardContent>
                {isReportLoading ? (
                    <div className="py-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>
                ) : latestReport ? (
                    <div className="space-y-6">
                        {/* Score Overview */}
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="text-slate-200"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={351.86}
                                        strokeDashoffset={351.86 - (latestReport.overall_score / 100) * 351.86}
                                        className={`${getScoreColor(latestReport.overall_score)} transition-all duration-1000 ease-out`}
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className={`text-3xl font-bold ${getScoreColor(latestReport.overall_score)}`}>{latestReport.overall_score}</span>
                                    <span className="text-xs text-slate-500 uppercase font-bold">Health</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <div className="text-xs text-slate-500 font-medium">URL Scanned</div>
                                    <div className="text-sm font-semibold truncate max-w-[200px]" title={latestReport.url}>{latestReport.url}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs text-slate-500 font-medium">Last Scan</div>
                                    <div className="text-sm font-semibold">{new Date(latestReport.scanned_at).toLocaleDateString()}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs text-slate-500 font-medium">Critical Issues</div>
                                    <div className="text-sm font-bold text-red-600">
                                        {latestReport.issues.filter(i => i.severity === 'critical').length}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs text-slate-500 font-medium">Total Issues</div>
                                    <div className="text-sm font-bold text-slate-700">{latestReport.issues.length}</div>
                                </div>
                            </div>
                        </div>

                        {/* Issues List */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-slate-500" />
                                Detected Issues & Recommendations
                            </h3>
                            {latestReport.issues.map((issue, idx) => (
                                <div key={idx} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)} bg-opacity-30`}>
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Badge className={`${getSeverityColor(issue.severity)} border bg-white bg-opacity-100 hover:bg-white`}>
                                                    {issue.severity.toUpperCase()}
                                                </Badge>
                                                <span className="text-xs font-bold uppercase text-slate-500 tracking-wide">{issue.category.replace('_', ' ')}</span>
                                            </div>
                                            <p className="font-semibold text-slate-900">{issue.message}</p>
                                            <p className="text-sm text-slate-700 mt-1">
                                                <span className="font-semibold">Fix:</span> {issue.recommendation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {latestReport.issues.length === 0 && (
                                <div className="text-center py-8 bg-green-50 rounded-lg border border-green-100 text-green-800">
                                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-green-500" />
                                    <p className="font-medium">No issues found! Great job.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400">
                        <ScanSearch className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Enter a URL above to perform a comprehensive SEO audit.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}