import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    Loader2, Search, AlertTriangle, AlertCircle, Info, CheckCircle2, 
    TrendingUp, FileText, Tag, MapPin, Copy, RefreshCw, ChevronRight,
    Target, Zap, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SEOAudit() {
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedIssue, setExpandedIssue] = useState(null);
    const queryClient = useQueryClient();

    const { data: audits = [], isLoading } = useQuery({
        queryKey: ['seoAudits'],
        queryFn: async () => {
            try {
                return await base44.entities.SEOAudit.list('-audit_date', 10);
            } catch (error) {
                console.error('Failed to load audits:', error);
                return [];
            }
        },
    });

    const latestAudit = audits[0];
    const results = latestAudit?.results || {};

    const runAudit = async () => {
        setIsRunning(true);
        try {
            const response = await base44.functions.invoke('runSEOAudit', {});
            if (response.data.success) {
                toast.success('SEO Audit completed successfully!');
                queryClient.invalidateQueries({ queryKey: ['seoAudits'] });
            }
        } catch (error) {
            toast.error('Failed to run audit: ' + (error.message || 'Unknown error'));
        } finally {
            setIsRunning(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        if (score >= 40) return 'text-orange-600';
        return 'text-red-600';
    };

    const getScoreBg = (score) => {
        if (score >= 80) return 'bg-green-100';
        if (score >= 60) return 'bg-yellow-100';
        if (score >= 40) return 'bg-orange-100';
        return 'bg-red-100';
    };

    const getIssueIcon = (type) => {
        switch (type) {
            case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'info': return <Info className="w-4 h-4 text-blue-500" />;
            default: return <Info className="w-4 h-4 text-gray-500" />;
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'meta': return <FileText className="w-4 h-4" />;
            case 'keywords': return <Tag className="w-4 h-4" />;
            case 'local-seo': return <MapPin className="w-4 h-4" />;
            case 'duplicate': return <Copy className="w-4 h-4" />;
            case 'content': return <FileText className="w-4 h-4" />;
            default: return <Search className="w-4 h-4" />;
        }
    };

    return (
        <div className="seoAuditPage min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="seoAuditContainer max-w-7xl mx-auto">
                {/* Header */}
                <div className="seoAuditHeader mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">SEO Audit</h1>
                            <p className="text-gray-600">Comprehensive analysis of your website's SEO health</p>
                        </div>
                        <div className="flex gap-3">
                            <Link to={createPageUrl('AdminSEO')}>
                                <Button variant="outline" className="min-h-[44px]">
                                    <FileText className="w-4 h-4 mr-2" />
                                    SEO Manager
                                </Button>
                            </Link>
                            <Button
                                onClick={runAudit}
                                disabled={isRunning}
                                size="lg"
                                className="seoAuditRunBtn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 min-h-[44px]"
                            >
                                {isRunning ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Running Audit...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Run New Audit
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Score Card */}
                    {latestAudit && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="seoAuditScoreCard"
                        >
                            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                                        {/* Overall Score */}
                                        <div className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
                                            <div className={`seoAuditScoreCircle w-32 h-32 rounded-full ${getScoreBg(latestAudit.overall_score)} flex items-center justify-center mb-3`}>
                                                <span className={`text-4xl font-bold ${getScoreColor(latestAudit.overall_score)}`}>
                                                    {latestAudit.overall_score}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium">Overall Score</span>
                                        </div>

                                        {/* Stats */}
                                        <div className="seoAuditStats col-span-2 lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="seoAuditStatCard bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <FileText className="w-4 h-4 text-gray-400" />
                                                    <span className="text-xs text-gray-500">Pages</span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900">{latestAudit.total_pages}</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {results.summary?.coveragePercent}% with SEO
                                                </div>
                                            </div>

                                            <div className="seoAuditStatCard bg-red-50 rounded-xl p-4 shadow-sm border border-red-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                                    <span className="text-xs text-red-600">Critical</span>
                                                </div>
                                                <div className="text-2xl font-bold text-red-600">{latestAudit.issues_critical}</div>
                                                <div className="text-xs text-red-500 mt-1">Fix immediately</div>
                                            </div>

                                            <div className="seoAuditStatCard bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                                                    <span className="text-xs text-yellow-700">Warnings</span>
                                                </div>
                                                <div className="text-2xl font-bold text-yellow-600">{latestAudit.issues_warning}</div>
                                                <div className="text-xs text-yellow-600 mt-1">Should address</div>
                                            </div>

                                            <div className="seoAuditStatCard bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Info className="w-4 h-4 text-blue-500" />
                                                    <span className="text-xs text-blue-600">Info</span>
                                                </div>
                                                <div className="text-2xl font-bold text-blue-600">{latestAudit.issues_info}</div>
                                                <div className="text-xs text-blue-500 mt-1">Opportunities</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Last Audit Time */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                        <span>Last audit: {new Date(latestAudit.audit_date).toLocaleString()}</span>
                                        <Badge variant="outline" className={latestAudit.status === 'completed' ? 'text-green-600 border-green-200' : ''}>
                                            {latestAudit.status === 'completed' ? (
                                                <><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</>
                                            ) : latestAudit.status}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>

                {/* No Audit Yet */}
                {!latestAudit && !isLoading && (
                    <Card className="seoAuditEmpty text-center py-16">
                        <CardContent>
                            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Audit Data Yet</h3>
                            <p className="text-gray-500 mb-6">Run your first SEO audit to analyze your website's health</p>
                            <Button onClick={runAudit} disabled={isRunning} size="lg">
                                {isRunning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                                Run SEO Audit
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Audit Results */}
                {latestAudit && results && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="seoAuditTabs">
                        <TabsList className="seoAuditTabsList grid grid-cols-4 w-full max-w-lg mb-6">
                            <TabsTrigger value="overview" className="min-h-[44px]">Overview</TabsTrigger>
                            <TabsTrigger value="issues" className="min-h-[44px]">Issues</TabsTrigger>
                            <TabsTrigger value="pages" className="min-h-[44px]">Pages</TabsTrigger>
                            <TabsTrigger value="recommendations" className="min-h-[44px]">Actions</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="seoAuditOverview">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Issues by Category */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Issues by Category</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {results.summary?.issuesByCategory && Object.entries(results.summary.issuesByCategory).map(([category, count]) => (
                                            <div key={category} className="seoAuditCategoryRow flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        {getCategoryIcon(category)}
                                                    </div>
                                                    <span className="font-medium capitalize">{category.replace('-', ' ')}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Progress value={Math.min(100, (count / 20) * 100)} className="w-24 h-2" />
                                                    <span className="text-sm font-semibold w-8 text-right">{count}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Coverage Stats */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">SEO Coverage</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="seoAuditCoverage mb-6">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-600">Pages with SEO data</span>
                                                <span className="font-semibold">{results.summary?.pagesWithSEO} / {results.summary?.totalPages}</span>
                                            </div>
                                            <Progress value={results.summary?.coveragePercent || 0} className="h-3" />
                                            <p className="text-xs text-gray-500 mt-2">
                                                {results.summary?.pagesWithoutSEO} pages need SEO data
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="seoAuditCoverageCard bg-green-50 rounded-lg p-4 text-center">
                                                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                                <div className="text-2xl font-bold text-green-700">{results.summary?.pagesWithSEO}</div>
                                                <div className="text-xs text-green-600">Optimized</div>
                                            </div>
                                            <div className="seoAuditCoverageCard bg-orange-50 rounded-lg p-4 text-center">
                                                <AlertCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                                <div className="text-2xl font-bold text-orange-700">{results.summary?.pagesWithoutSEO}</div>
                                                <div className="text-xs text-orange-600">Need Attention</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Issues Tab */}
                        <TabsContent value="issues" className="seoAuditIssues">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                        All Issues ({results.issues?.length || 0})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="seoAuditIssuesList space-y-3 max-h-[600px] overflow-y-auto">
                                    <AnimatePresence>
                                        {results.issues?.map((issue, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`seoAuditIssueItem p-4 rounded-lg border cursor-pointer transition-all ${
                                                    issue.type === 'critical' ? 'bg-red-50 border-red-200 hover:border-red-300' :
                                                    issue.type === 'warning' ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-300' :
                                                    'bg-blue-50 border-blue-200 hover:border-blue-300'
                                                }`}
                                                onClick={() => setExpandedIssue(expandedIssue === idx ? null : idx)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start gap-3">
                                                        {getIssueIcon(issue.type)}
                                                        <div>
                                                            <div className="font-medium text-gray-900">{issue.issue}</div>
                                                            <div className="text-sm text-gray-600 mt-1">{issue.description}</div>
                                                            {issue.page && (
                                                                <Badge variant="outline" className="mt-2 text-xs">
                                                                    {issue.page}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedIssue === idx ? 'rotate-90' : ''}`} />
                                                </div>
                                                
                                                <AnimatePresence>
                                                    {expandedIssue === idx && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="mt-4 pt-4 border-t border-gray-200"
                                                        >
                                                            <div className="flex items-start gap-2 text-sm">
                                                                <Zap className="w-4 h-4 text-green-600 mt-0.5" />
                                                                <div>
                                                                    <span className="font-medium text-gray-700">Recommendation: </span>
                                                                    <span className="text-gray-600">{issue.recommendation}</span>
                                                                </div>
                                                            </div>
                                                            {issue.pages && (
                                                                <div className="mt-3 flex flex-wrap gap-2">
                                                                    {issue.pages.map((p, i) => (
                                                                        <Badge key={i} variant="secondary" className="text-xs">{p}</Badge>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Pages Tab */}
                        <TabsContent value="pages" className="seoAuditPages">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Page-by-Page Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="seoAuditPagesList space-y-2 max-h-[600px] overflow-y-auto">
                                    {results.pageAudits?.map((page, idx) => (
                                        <div
                                            key={idx}
                                            className={`seoAuditPageItem flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-sm ${
                                                page.score >= 80 ? 'bg-green-50 border-green-200' :
                                                page.score >= 60 ? 'bg-yellow-50 border-yellow-200' :
                                                page.score >= 40 ? 'bg-orange-50 border-orange-200' :
                                                'bg-red-50 border-red-200'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${getScoreBg(page.score)} ${getScoreColor(page.score)}`}>
                                                    {page.score}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{page.name}</div>
                                                    <div className="text-xs text-gray-500">{page.path}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {page.issues.length > 0 ? (
                                                    <Badge variant="outline" className="text-xs">
                                                        {page.issues.length} issue{page.issues.length > 1 ? 's' : ''}
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-green-100 text-green-800 text-xs">
                                                        <CheckCircle2 className="w-3 h-3 mr-1" /> Perfect
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Recommendations Tab */}
                        <TabsContent value="recommendations" className="seoAuditRecommendations">
                            <div className="space-y-4">
                                {results.recommendations?.map((rec, idx) => (
                                    <Card key={idx} className="seoAuditRecommendationCard overflow-hidden">
                                        <div className={`h-1 ${
                                            rec.priority === 1 ? 'bg-red-500' :
                                            rec.priority === 2 ? 'bg-orange-500' :
                                            rec.priority === 3 ? 'bg-yellow-500' :
                                            'bg-blue-500'
                                        }`} />
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                                        rec.priority === 1 ? 'bg-red-500' :
                                                        rec.priority === 2 ? 'bg-orange-500' :
                                                        rec.priority === 3 ? 'bg-yellow-500' :
                                                        'bg-blue-500'
                                                    }`}>
                                                        {rec.priority}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                                                        <p className="text-gray-600 mt-1">{rec.description}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-3 mb-4">
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <Target className="w-3 h-3" />
                                                    Impact: {rec.impact}
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    Effort: {rec.effort}
                                                </Badge>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-start gap-2">
                                                    <Zap className="w-4 h-4 text-green-600 mt-0.5" />
                                                    <div>
                                                        <span className="font-medium text-gray-700">Action: </span>
                                                        <span className="text-gray-600">{rec.action}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {rec.priority <= 2 && (
                                                <div className="mt-4">
                                                    <Link to={createPageUrl('AdminSEO')}>
                                                        <Button className="w-full sm:w-auto">
                                                            Go to SEO Manager
                                                            <ChevronRight className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}

                                {(!results.recommendations || results.recommendations.length === 0) && (
                                    <Card className="text-center py-12">
                                        <CardContent>
                                            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Job!</h3>
                                            <p className="text-gray-500">No major recommendations at this time</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}

                {/* Audit History */}
                {audits.length > 1 && (
                    <Card className="seoAuditHistory mt-8">
                        <CardHeader>
                            <CardTitle className="text-lg">Audit History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="seoAuditHistoryList space-y-2">
                                {audits.slice(1, 6).map((audit, idx) => (
                                    <div key={audit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getScoreBg(audit.overall_score)} ${getScoreColor(audit.overall_score)}`}>
                                                {audit.overall_score}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {new Date(audit.audit_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-red-600">{audit.issues_critical} critical</span>
                                            <span className="text-yellow-600">{audit.issues_warning} warnings</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}