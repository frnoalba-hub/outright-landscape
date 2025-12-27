import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, RefreshCw, Check, AlertCircle } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function AdminSEO() {
    const queryClient = useQueryClient();
    const [analyzingPath, setAnalyzingPath] = useState(null);

    // List of important pages to manage
    const [pagesToManage, setPagesToManage] = useState([
        { name: "Home", path: "/" },
        { name: "Service Areas (General)", path: "/ServiceArea" },
        // We'll dynamically add top cities below
    ]);

    // Fetch existing configs
    const { data: seoConfigs = [], isLoading } = useQuery({
        queryKey: ['seoConfigs'],
        queryFn: () => base44.entities.SeoConfig.list(null, 100),
    });

    // Fetch Locations to populate pages list
    const { data: locations } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 50),
    });

    // Check Admin Auth
    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => base44.auth.me(),
        retry: false,
    });

    useEffect(() => {
        if (locations?.length > 0) {
            const cityPages = locations.slice(0, 5).map(loc => ({
                name: `Service Area: ${loc.name}`,
                path: `/ServiceArea?city=${loc.slug}`
            }));
            setPagesToManage(prev => {
                // Merge unique paths
                const existing = new Set(prev.map(p => p.path));
                const newPages = cityPages.filter(p => !existing.has(p.path));
                return [...prev, ...newPages];
            });
        }
    }, [locations]);

    const analyzeMutation = useMutation({
        mutationFn: async ({ path, pageName }) => {
            // 1. Fetch the actual page content approx (client-side simulation)
            // In a real app, we'd fetch the HTML, but here we'll mock the content context
            // or pass generic context if we can't scrape ourselves easily in SPA
            
            let contentContext = `Content for ${pageName}. `;
            if (path === "/") contentContext += "Main landing page for Outright Landscape. Services: Pavers, Turf, Irrigation.";
            else if (path.includes("city=")) {
                const city = path.split("city=")[1];
                contentContext += `Specific service area page for ${city}. Localized landscaping services.`;
            }

            // Call backend
            const res = await base44.functions.invoke("analyzePageSeo", {
                path,
                pageContent: contentContext,
                currentMeta: { title: "", description: "" } // Could pass current if available
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['seoConfigs']);
            setAnalyzingPath(null);
        },
        onError: () => setAnalyzingPath(null)
    });

    const handleAnalyze = (page) => {
        setAnalyzingPath(page.path);
        analyzeMutation.mutate({ path: page.path, pageName: page.name });
    };

    const handleBulkGenerate = () => {
        const confirm = window.confirm("This will generate AI metadata for ALL unoptimized pages. It may take a minute. Continue?");
        if (!confirm) return;
        
        // Loop through all pages and trigger analysis if not already optimized
        const pagesToProcess = pagesToManage.filter(p => !getConfig(p.path));
        
        if (pagesToProcess.length === 0) {
            alert("All pages are already optimized!");
            return;
        }

        alert(`Starting generation for ${pagesToProcess.length} pages...`);
        
        // Process sequentially to avoid overwhelming the backend/LLM
        const processNext = (index) => {
            if (index >= pagesToProcess.length) {
                alert("Bulk generation complete!");
                return;
            }
            
            const page = pagesToProcess[index];
            setAnalyzingPath(page.path);
            analyzeMutation.mutate({ path: page.path, pageName: page.name }, {
                onSettled: () => {
                    processNext(index + 1);
                }
            });
        };

        processNext(0);
    };

    const getConfig = (path) => seoConfigs.find(c => c.path === path);

    if (isAuthLoading || isLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
                <p className="mb-4 text-gray-600">You must be an administrator to access the SEO Manager.</p>
                <Button onClick={() => base44.auth.redirectToLogin()}>Log In as Admin</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Sparkles className="text-green-500" />
                            AI SEO Manager
                        </h1>
                        <p className="text-gray-500 mt-2">Generate and manage SEO metadata for your pages using AI.</p>
                    </div>
                    <Button onClick={handleBulkGenerate} className="bg-green-600 hover:bg-green-700">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Bulk Generate All
                    </Button>
                </div>

                <div className="grid gap-6">
                    {pagesToManage.map((page) => {
                        const config = getConfig(page.path);
                        const isAnalyzing = analyzingPath === page.path;

                        return (
                            <Card key={page.path} className="overflow-hidden">
                                <CardHeader className="bg-white border-b flex flex-row items-center justify-between py-4">
                                    <div>
                                        <CardTitle className="text-lg">{page.name}</CardTitle>
                                        <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                                            {page.path}
                                        </code>
                                    </div>
                                    <Button 
                                        onClick={() => handleAnalyze(page)}
                                        disabled={isAnalyzing}
                                        variant={config ? "outline" : "default"}
                                        className="gap-2"
                                    >
                                        {isAnalyzing ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Sparkles className="w-4 h-4" />
                                        )}
                                        {config ? "Regenerate AI Analysis" : "Generate with AI"}
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {config ? (
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Optimized Title</label>
                                                    <div className="p-3 bg-green-50 border border-green-100 rounded-md text-sm font-medium text-gray-800">
                                                        {config.title}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Meta Description</label>
                                                    <div className="p-3 bg-green-50 border border-green-100 rounded-md text-sm text-gray-700">
                                                        {config.description}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Keywords</label>
                                                    <div className="mt-1 flex flex-wrap gap-2">
                                                        {config.keywords?.split(',').map((k, i) => (
                                                            <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                {k.trim()}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                                                    <AlertCircle className="w-4 h-4" />
                                                    AI Analysis & Suggestions
                                                </h4>
                                                <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">
                                                    {config.ai_suggestions}
                                                </p>
                                                <div className="mt-4 text-xs text-blue-600 flex items-center gap-1">
                                                    <Check className="w-3 h-3" />
                                                    Last updated: {new Date(config.last_updated).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <RefreshCw className="w-6 h-6" />
                                            </div>
                                            <p>No AI optimization generated yet.</p>
                                            <p className="text-sm">Click the button above to analyze this page.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}