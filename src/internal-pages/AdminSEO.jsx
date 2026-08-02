import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Save, CheckCircle2, AlertCircle, Search, X, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSEO() {
    const [selectedPage, setSelectedPage] = useState('');
    const [editingSEO, setEditingSEO] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingAll, setIsGeneratingAll] = useState(false);
    const [generationProgress, setGenerationProgress] = useState({ done: 0, total: 0, failed: 0 });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'missing', 'complete'
    const [isSaving, setIsSaving] = useState(false);
    const queryClient = useQueryClient();

    // List of all pages to manage SEO for
    const pages = [
        { path: '/', name: 'Home' },
        { path: '/irrigation', name: 'Irrigation' },
        // Arcadia
        { path: '/arcadia-landscaping', name: 'Arcadia Landscaping' },
        { path: '/arcadia-drip-irrigation', name: 'Arcadia Drip Irrigation' },
        { path: '/arcadia-irrigation-repair', name: 'Arcadia Irrigation Repair' },
        { path: '/arcadia-sprinkler-repair', name: 'Arcadia Sprinkler Repair' },
        { path: '/arcadia-sprinkler-valves', name: 'Arcadia Sprinkler Valves' },
        // Azusa
        { path: '/azusa-landscaping', name: 'Azusa Landscaping' },
        { path: '/azusa-drip-irrigation', name: 'Azusa Drip Irrigation' },
        { path: '/azusa-irrigation-repair', name: 'Azusa Irrigation Repair' },
        { path: '/azusa-sprinkler-repair', name: 'Azusa Sprinkler Repair' },
        { path: '/azusa-sprinkler-valves', name: 'Azusa Sprinkler Valves' },
        // Baldwin Park
        { path: '/baldwin-park-landscaping', name: 'Baldwin Park Landscaping' },
        { path: '/baldwin-park-drip-irrigation', name: 'Baldwin Park Drip Irrigation' },
        { path: '/baldwin-park-irrigation-repair', name: 'Baldwin Park Irrigation Repair' },
        { path: '/baldwin-park-sprinkler-repair', name: 'Baldwin Park Sprinkler Repair' },
        { path: '/baldwin-park-sprinkler-valves', name: 'Baldwin Park Sprinkler Valves' },
        // Charter Oak
        { path: '/charter-oak-landscaping', name: 'Charter Oak Landscaping' },
        { path: '/charter-oak-drip-irrigation', name: 'Charter Oak Drip Irrigation' },
        { path: '/charter-oak-irrigation-repair', name: 'Charter Oak Irrigation Repair' },
        { path: '/charter-oak-sprinkler-repair', name: 'Charter Oak Sprinkler Repair' },
        { path: '/charter-oak-sprinkler-valves', name: 'Charter Oak Sprinkler Valves' },
        // Claremont
        { path: '/claremont-landscaping', name: 'Claremont Landscaping' },
        { path: '/claremont-drip-irrigation', name: 'Claremont Drip Irrigation' },
        { path: '/claremont-irrigation-repair', name: 'Claremont Irrigation Repair' },
        { path: '/claremont-sprinkler-repair', name: 'Claremont Sprinkler Repair' },
        { path: '/claremont-sprinkler-valves', name: 'Claremont Sprinkler Valves' },
        // Covina
        { path: '/covina-landscaping', name: 'Covina Landscaping' },
        { path: '/covina-drip-irrigation', name: 'Covina Drip Irrigation' },
        { path: '/covina-irrigation-repair', name: 'Covina Irrigation Repair' },
        { path: '/covina-sprinkler-repair', name: 'Covina Sprinkler Repair' },
        { path: '/covina-sprinkler-valves', name: 'Covina Sprinkler Valves' },
        // Diamond Bar
        { path: '/diamond-bar-landscaping', name: 'Diamond Bar Landscaping' },
        { path: '/diamond-bar-drip-irrigation', name: 'Diamond Bar Drip Irrigation' },
        { path: '/diamond-bar-irrigation-repair', name: 'Diamond Bar Irrigation Repair' },
        { path: '/diamond-bar-sprinkler-repair', name: 'Diamond Bar Sprinkler Repair' },
        { path: '/diamond-bar-sprinkler-valves', name: 'Diamond Bar Sprinkler Valves' },
        // Duarte
        { path: '/duarte-landscaping', name: 'Duarte Landscaping' },
        { path: '/duarte-drip-irrigation', name: 'Duarte Drip Irrigation' },
        { path: '/duarte-irrigation-repair', name: 'Duarte Irrigation Repair' },
        { path: '/duarte-sprinkler-repair', name: 'Duarte Sprinkler Repair' },
        { path: '/duarte-sprinkler-valves', name: 'Duarte Sprinkler Valves' },
        // El Monte
        { path: '/el-monte-landscaping', name: 'El Monte Landscaping' },
        { path: '/el-monte-drip-irrigation', name: 'El Monte Drip Irrigation' },
        { path: '/el-monte-irrigation-repair', name: 'El Monte Irrigation Repair' },
        { path: '/el-monte-sprinkler-repair', name: 'El Monte Sprinkler Repair' },
        { path: '/el-monte-sprinkler-valves', name: 'El Monte Sprinkler Valves' },
        // Glendora
        { path: '/glendora-landscaping', name: 'Glendora Landscaping' },
        { path: '/glendora-drip-irrigation', name: 'Glendora Drip Irrigation' },
        { path: '/glendora-irrigation-repair', name: 'Glendora Irrigation Repair' },
        { path: '/glendora-sprinkler-repair', name: 'Glendora Sprinkler Repair' },
        { path: '/glendora-sprinkler-valves', name: 'Glendora Sprinkler Valves' },
        // La Verne
        { path: '/la-verne-landscaping', name: 'La Verne Landscaping' },
        { path: '/la-verne-drip-irrigation', name: 'La Verne Drip Irrigation' },
        { path: '/la-verne-irrigation-repair', name: 'La Verne Irrigation Repair' },
        { path: '/la-verne-sprinkler-repair', name: 'La Verne Sprinkler Repair' },
        { path: '/la-verne-sprinkler-valves', name: 'La Verne Sprinkler Valves' },
        // Monrovia
        { path: '/monrovia-landscaping', name: 'Monrovia Landscaping' },
        { path: '/monrovia-drip-irrigation', name: 'Monrovia Drip Irrigation' },
        { path: '/monrovia-irrigation-repair', name: 'Monrovia Irrigation Repair' },
        { path: '/monrovia-sprinkler-repair', name: 'Monrovia Sprinkler Repair' },
        { path: '/monrovia-sprinkler-valves', name: 'Monrovia Sprinkler Valves' },
        // Pasadena
        { path: '/pasadena-landscaping', name: 'Pasadena Landscaping' },
        { path: '/pasadena-drip-irrigation', name: 'Pasadena Drip Irrigation' },
        { path: '/pasadena-irrigation-repair', name: 'Pasadena Irrigation Repair' },
        { path: '/pasadena-sprinkler-repair', name: 'Pasadena Sprinkler Repair' },
        { path: '/pasadena-sprinkler-valves', name: 'Pasadena Sprinkler Valves' },
        // Pomona
        { path: '/pomona-landscaping', name: 'Pomona Landscaping' },
        { path: '/pomona-drip-irrigation', name: 'Pomona Drip Irrigation' },
        { path: '/pomona-irrigation-repair', name: 'Pomona Irrigation Repair' },
        { path: '/pomona-sprinkler-repair', name: 'Pomona Sprinkler Repair' },
        { path: '/pomona-sprinkler-valves', name: 'Pomona Sprinkler Valves' },
        // Rowland Heights
        { path: '/rowland-heights-landscaping', name: 'Rowland Heights Landscaping' },
        { path: '/rowland-heights-drip-irrigation', name: 'Rowland Heights Drip Irrigation' },
        { path: '/rowland-heights-irrigation-repair', name: 'Rowland Heights Irrigation Repair' },
        { path: '/rowland-heights-sprinkler-repair', name: 'Rowland Heights Sprinkler Repair' },
        { path: '/rowland-heights-sprinkler-valves', name: 'Rowland Heights Sprinkler Valves' },
        // San Dimas
        { path: '/san-dimas-landscaping', name: 'San Dimas Landscaping' },
        { path: '/san-dimas-drip-irrigation', name: 'San Dimas Drip Irrigation' },
        { path: '/san-dimas-irrigation-repair', name: 'San Dimas Irrigation Repair' },
        { path: '/san-dimas-sprinkler-repair', name: 'San Dimas Sprinkler Repair' },
        { path: '/san-dimas-sprinkler-valves', name: 'San Dimas Sprinkler Valves' },
        // San Gabriel
        { path: '/san-gabriel-landscaping', name: 'San Gabriel Landscaping' },
        { path: '/san-gabriel-drip-irrigation', name: 'San Gabriel Drip Irrigation' },
        { path: '/san-gabriel-irrigation-repair', name: 'San Gabriel Irrigation Repair' },
        { path: '/san-gabriel-sprinkler-repair', name: 'San Gabriel Sprinkler Repair' },
        { path: '/san-gabriel-sprinkler-valves', name: 'San Gabriel Sprinkler Valves' },
        // Temple City
        { path: '/temple-city-landscaping', name: 'Temple City Landscaping' },
        { path: '/temple-city-drip-irrigation', name: 'Temple City Drip Irrigation' },
        { path: '/temple-city-irrigation-repair', name: 'Temple City Irrigation Repair' },
        { path: '/temple-city-sprinkler-repair', name: 'Temple City Sprinkler Repair' },
        { path: '/temple-city-sprinkler-valves', name: 'Temple City Sprinkler Valves' },
        // Walnut
        { path: '/walnut-landscaping', name: 'Walnut Landscaping' },
        { path: '/walnut-drip-irrigation', name: 'Walnut Drip Irrigation' },
        { path: '/walnut-irrigation-repair', name: 'Walnut Irrigation Repair' },
        { path: '/walnut-sprinkler-repair', name: 'Walnut Sprinkler Repair' },
        { path: '/walnut-sprinkler-valves', name: 'Walnut Sprinkler Valves' },
        // West Covina
        { path: '/west-covina-landscaping', name: 'West Covina Landscaping' },
        { path: '/west-covina-drip-irrigation', name: 'West Covina Drip Irrigation' },
        { path: '/west-covina-irrigation-repair', name: 'West Covina Irrigation Repair' },
        { path: '/west-covina-sprinkler-repair', name: 'West Covina Sprinkler Repair' },
        { path: '/west-covina-sprinkler-valves', name: 'West Covina Sprinkler Valves' },
    ];

    const { data: allSEOData = [], isLoading } = useQuery({
        queryKey: ['pageSEO'],
        queryFn: () => base44.entities.PageSEO.list(null, 200),
    });

    const getSEOForPage = (pagePath) => {
        return allSEOData.find(seo => seo.page_path === pagePath);
    };

    const handleGenerateSEO = async (pagePath, pageName) => {
        setIsGenerating(true);
        try {
            const cityName = pageName.split(' ')[0];
            const serviceType = pageName.includes('Sprinkler') || pageName.includes('Irrigation') 
                ? 'irrigation repair' 
                : 'landscaping';

            const response = await base44.functions.invoke('generatePageSEO', {
                page_path: pagePath,
                city_name: cityName,
                service_type: serviceType
            });

            if (response.data.success) {
                toast.success('SEO data generated successfully!');
                queryClient.invalidateQueries({ queryKey: ['pageSEO'] });
                setEditingSEO(response.data.seo);
                setSelectedPage(pagePath);
            }
        } catch (error) {
            toast.error('Failed to generate SEO data');
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateAll = async () => {
        const pagesToGenerate = pages.filter(page => !getSEOForPage(page.path));
        
        if (pagesToGenerate.length === 0) {
            toast.info('All pages already have SEO data');
            return;
        }

        setIsGeneratingAll(true);
        setGenerationProgress({ done: 0, total: pagesToGenerate.length, failed: 0 });

        let successCount = 0;
        let failCount = 0;

        // Process sequentially with delay to avoid rate limits
        for (const page of pagesToGenerate) {
            try {
                const cityName = page.name.split(' ')[0];
                const serviceType = page.name.includes('Sprinkler') || page.name.includes('Irrigation') 
                    ? 'irrigation repair' 
                    : 'landscaping';

                await base44.functions.invoke('generatePageSEO', {
                    page_path: page.path,
                    city_name: cityName,
                    service_type: serviceType
                });

                successCount++;
                setGenerationProgress(prev => ({ ...prev, done: successCount, failed: failCount }));
                
                // Small delay between requests to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
                console.error(`Failed to generate SEO for ${page.path}:`, error);
                failCount++;
                setGenerationProgress(prev => ({ ...prev, done: successCount, failed: failCount }));
                
                // If rate limited, wait longer before retrying
                if (error?.response?.status === 429) {
                    toast.warning('Rate limited - waiting before continuing...');
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            }
        }
        
        queryClient.invalidateQueries({ queryKey: ['pageSEO'] });
        
        if (failCount > 0) {
            toast.warning(`SEO generated for ${successCount} pages, ${failCount} failed`);
        } else {
            toast.success(`SEO generated for ${successCount} pages!`);
        }
        
        setIsGeneratingAll(false);
        setGenerationProgress({ done: 0, total: 0, failed: 0 });
    };

    const handleSaveManual = async () => {
        if (!editingSEO) return;

        setIsSaving(true);
        try {
            await base44.entities.PageSEO.update(editingSEO.id, {
                meta_title: editingSEO.meta_title,
                meta_description: editingSEO.meta_description,
                keywords: editingSEO.keywords,
                ai_generated: false
            });

            toast.success('SEO data saved!');
            queryClient.invalidateQueries({ queryKey: ['pageSEO'] });
        } catch (error) {
            toast.error('Failed to save SEO data. Please try again.');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    // Filter and search pages
    const filteredPages = pages.filter(page => {
        const matchesSearch = page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              page.path.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;
        
        const hasSEO = !!getSEOForPage(page.path);
        if (filterStatus === 'missing') return !hasSEO;
        if (filterStatus === 'complete') return hasSEO;
        return true;
    });

    // Stats - count only pages that exist in our pages list
    const totalPages = pages.length;
    const pagesWithSEO = pages.filter(page => getSEOForPage(page.path)).length;
    const missingPages = totalPages - pagesWithSEO;
    const completionPercent = Math.round((pagesWithSEO / totalPages) * 100);

    useEffect(() => {
        if (selectedPage) {
            const seo = getSEOForPage(selectedPage);
            setEditingSEO(seo || null);
        }
    }, [selectedPage, allSEOData]);

    return (
        <div className="adminSeoPage min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="adminSeoContainer max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="adminSeoHeader mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">SEO Management</h1>
                            <p className="text-gray-600">AI-powered meta titles, descriptions, and keywords for all pages</p>
                        </div>
                        <Button
                            onClick={handleGenerateAll}
                            disabled={isGeneratingAll || missingPages === 0}
                            size="lg"
                            className="adminSeoGenerateAllBtn bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 whitespace-nowrap min-h-[44px]"
                        >
                            {isGeneratingAll ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating {generationProgress.done}/{generationProgress.total}
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Generate All Missing ({missingPages})
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Progress Bar for Bulk Generation */}
                    <AnimatePresence>
                        {isGeneratingAll && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="adminSeoBulkProgress mb-6"
                            >
                                <Card className="border-purple-200 bg-purple-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-purple-700">
                                                Generating SEO data...
                                            </span>
                                            <span className="text-sm text-purple-600">
                                                {generationProgress.done} / {generationProgress.total} complete
                                                {generationProgress.failed > 0 && (
                                                    <span className="text-red-500 ml-2">
                                                        ({generationProgress.failed} failed)
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <Progress 
                                            value={(generationProgress.done / generationProgress.total) * 100} 
                                            className="h-2"
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stats Cards */}
                    <div className="adminSeoStats grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card className="adminSeoStatCard">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-gray-900">{totalPages}</div>
                                <div className="text-xs text-gray-500">Total Pages</div>
                            </CardContent>
                        </Card>
                        <Card className="adminSeoStatCard">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">{pagesWithSEO}</div>
                                <div className="text-xs text-gray-500">With SEO</div>
                            </CardContent>
                        </Card>
                        <Card className="adminSeoStatCard">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-orange-500">{missingPages}</div>
                                <div className="text-xs text-gray-500">Missing SEO</div>
                            </CardContent>
                        </Card>
                        <Card className="adminSeoStatCard">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-purple-600">{completionPercent}%</div>
                                <div className="text-xs text-gray-500">Complete</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="adminSeoContent grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pages List */}
                    <Card className="adminSeoPagesList lg:col-span-1">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Pages</CardTitle>
                            {/* Search */}
                            <div className="adminSeoSearch relative mt-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search pages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-9 h-10"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            {/* Filter Tabs */}
                            <div className="adminSeoFilters flex gap-2 mt-3">
                                {[
                                    { value: 'all', label: 'All' },
                                    { value: 'missing', label: 'Missing' },
                                    { value: 'complete', label: 'Complete' }
                                ].map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setFilterStatus(filter.value)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all min-h-[32px] ${
                                            filterStatus === filter.value
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="adminSeoPageItems space-y-2 max-h-[500px] overflow-y-auto pt-0">
                            {filteredPages.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No pages found</p>
                                </div>
                            ) : (
                                filteredPages.map(page => {
                                    const seo = getSEOForPage(page.path);
                                    const hasData = !!seo;

                                    return (
                                        <motion.button
                                            key={page.path}
                                            onClick={() => setSelectedPage(page.path)}
                                            whileTap={{ scale: 0.98 }}
                                            className={`adminSeoPageItem w-full text-left p-3 rounded-lg transition-all min-h-[60px] ${
                                                selectedPage === page.path
                                                    ? 'bg-green-100 border-2 border-green-500 shadow-sm'
                                                    : 'bg-white border border-gray-200 hover:border-green-300 hover:shadow-sm'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm truncate pr-2">{page.name}</span>
                                                {hasData ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                ) : (
                                                    <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1 truncate">{page.path}</div>
                                        </motion.button>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>

                    {/* SEO Editor */}
                    <Card className="adminSeoEditor lg:col-span-2">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                    {selectedPage 
                                        ? pages.find(p => p.path === selectedPage)?.name 
                                        : 'Select a page to manage SEO'}
                                </CardTitle>
                                {selectedPage && editingSEO && (
                                    <Badge variant={editingSEO.ai_generated ? 'secondary' : 'outline'}>
                                        {editingSEO.ai_generated ? '✨ AI Generated' : 'Manual'}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <AnimatePresence mode="wait">
                                {!selectedPage ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="adminSeoEmptyState text-center py-12 text-gray-500"
                                    >
                                        <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-sm">Select a page from the list to generate or edit SEO metadata</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={selectedPage}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="adminSeoForm space-y-6"
                                    >
                                        {/* Action Buttons */}
                                        <div className="adminSeoActions flex flex-wrap gap-3">
                                            <Button
                                                onClick={() => {
                                                    const page = pages.find(p => p.path === selectedPage);
                                                    handleGenerateSEO(selectedPage, page.name);
                                                }}
                                                disabled={isGenerating}
                                                className="adminSeoGenerateBtn bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 min-h-[44px]"
                                            >
                                                {isGenerating ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-4 h-4 mr-2" />
                                                        {editingSEO ? 'Regenerate with AI' : 'Generate with AI'}
                                                    </>
                                                )}
                                            </Button>
                                            {editingSEO && (
                                                <Button
                                                    onClick={handleSaveManual}
                                                    variant="outline"
                                                    disabled={isSaving}
                                                    className="adminSeoSaveBtn min-h-[44px]"
                                                >
                                                    {isSaving ? (
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <Save className="w-4 h-4 mr-2" />
                                                    )}
                                                    Save Changes
                                                </Button>
                                            )}
                                        </div>

                                        {editingSEO ? (
                                            <div className="adminSeoFields space-y-5">
                                                {/* Meta Title */}
                                                <div className="adminSeoField">
                                                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                                                        <span>Meta Title</span>
                                                        <span className={`text-xs ${
                                                            (editingSEO.meta_title?.length || 0) > 60 
                                                                ? 'text-red-500' 
                                                                : 'text-gray-400'
                                                        }`}>
                                                            {editingSEO.meta_title?.length || 0}/60
                                                        </span>
                                                    </label>
                                                    <Input
                                                        value={editingSEO.meta_title || ''}
                                                        onChange={(e) => setEditingSEO({
                                                            ...editingSEO,
                                                            meta_title: e.target.value
                                                        })}
                                                        placeholder="Enter meta title..."
                                                        className="font-medium"
                                                    />
                                                </div>

                                                {/* Meta Description */}
                                                <div className="adminSeoField">
                                                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                                                        <span>Meta Description</span>
                                                        <span className={`text-xs ${
                                                            (editingSEO.meta_description?.length || 0) > 160 
                                                                ? 'text-red-500' 
                                                                : 'text-gray-400'
                                                        }`}>
                                                            {editingSEO.meta_description?.length || 0}/160
                                                        </span>
                                                    </label>
                                                    <Textarea
                                                        value={editingSEO.meta_description || ''}
                                                        onChange={(e) => setEditingSEO({
                                                            ...editingSEO,
                                                            meta_description: e.target.value
                                                        })}
                                                        placeholder="Enter meta description..."
                                                        rows={3}
                                                    />
                                                </div>

                                                {/* Keywords */}
                                                <div className="adminSeoField">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Keywords
                                                    </label>
                                                    <Textarea
                                                        value={editingSEO.keywords?.join(', ') || ''}
                                                        onChange={(e) => setEditingSEO({
                                                            ...editingSEO,
                                                            keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                                                        })}
                                                        placeholder="Enter keywords separated by commas..."
                                                        rows={2}
                                                    />
                                                    {editingSEO.keywords?.length > 0 && (
                                                        <div className="adminSeoKeywords flex flex-wrap gap-2 mt-3">
                                                            {editingSEO.keywords.map((keyword, idx) => (
                                                                <Badge
                                                                    key={idx}
                                                                    variant="secondary"
                                                                    className="bg-green-100 text-green-800 hover:bg-green-200"
                                                                >
                                                                    {keyword}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Metadata Footer */}
                                                <div className="adminSeoMeta pt-4 border-t border-gray-200">
                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                                        {editingSEO.last_generated && (
                                                            <span>
                                                                Last updated: {new Date(editingSEO.last_generated).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                        <span className="text-gray-400">
                                                            Path: {selectedPage}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="adminSeoNoData text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                                                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                                                <p className="text-sm">No SEO data yet. Click "Generate with AI" to create.</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}