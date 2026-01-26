import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Save, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSEO() {
    const [selectedPage, setSelectedPage] = useState('');
    const [editingSEO, setEditingSEO] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const queryClient = useQueryClient();

    // List of all pages to manage SEO for
    const pages = [
        { path: '/arcadia-landscaping', name: 'Arcadia Landscaping' },
        { path: '/azusa-landscaping', name: 'Azusa Landscaping' },
        { path: '/baldwin-park-landscaping', name: 'Baldwin Park Landscaping' },
        { path: '/charter-oak-landscaping', name: 'Charter Oak Landscaping' },
        { path: '/claremont-landscaping', name: 'Claremont Landscaping' },
        { path: '/covina-landscaping', name: 'Covina Landscaping' },
        { path: '/diamond-bar-landscaping', name: 'Diamond Bar Landscaping' },
        { path: '/duarte-landscaping', name: 'Duarte Landscaping' },
        { path: '/el-monte-landscaping', name: 'El Monte Landscaping' },
        { path: '/glendora-landscaping', name: 'Glendora Landscaping' },
        { path: '/la-verne-landscaping', name: 'La Verne Landscaping' },
        { path: '/monrovia-landscaping', name: 'Monrovia Landscaping' },
        { path: '/pasadena-landscaping', name: 'Pasadena Landscaping' },
        { path: '/pomona-landscaping', name: 'Pomona Landscaping' },
        { path: '/rowland-heights-landscaping', name: 'Rowland Heights Landscaping' },
        { path: '/san-dimas-landscaping', name: 'San Dimas Landscaping' },
        { path: '/san-gabriel-landscaping', name: 'San Gabriel Landscaping' },
        { path: '/temple-city-landscaping', name: 'Temple City Landscaping' },
        { path: '/walnut-landscaping', name: 'Walnut Landscaping' },
        { path: '/west-covina-landscaping', name: 'West Covina Landscaping' },
        { path: '/glendora-sprinkler-repair', name: 'Glendora Sprinkler Repair' },
        { path: '/glendora-irrigation-repair', name: 'Glendora Irrigation Repair' },
        { path: '/la-verne-sprinkler-repair', name: 'La Verne Sprinkler Repair' },
        { path: '/la-verne-irrigation-repair', name: 'La Verne Irrigation Repair' },
        { path: '/san-dimas-sprinkler-repair', name: 'San Dimas Sprinkler Repair' },
        { path: '/san-dimas-irrigation-repair', name: 'San Dimas Irrigation Repair' }
    ];

    const { data: allSEOData = [], isLoading } = useQuery({
        queryKey: ['pageSEO'],
        queryFn: () => base44.entities.PageSEO.list(null, 100),
    });

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

    const handleSaveManual = async () => {
        if (!editingSEO) return;

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
            toast.error('Failed to save SEO data');
            console.error(error);
        }
    };

    const getSEOForPage = (pagePath) => {
        return allSEOData.find(seo => seo.page_path === pagePath);
    };

    useEffect(() => {
        if (selectedPage) {
            const seo = getSEOForPage(selectedPage);
            setEditingSEO(seo || null);
        }
    }, [selectedPage, allSEOData]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">SEO Management</h1>
                    <p className="text-gray-600">AI-powered meta titles, descriptions, and keywords for all pages</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Pages List */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Pages</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                            {pages.map(page => {
                                const seo = getSEOForPage(page.path);
                                const hasData = !!seo;

                                return (
                                    <button
                                        key={page.path}
                                        onClick={() => setSelectedPage(page.path)}
                                        className={`w-full text-left p-3 rounded-lg transition-all ${
                                            selectedPage === page.path
                                                ? 'bg-green-100 border-2 border-green-500'
                                                : 'bg-white border border-gray-200 hover:border-green-300'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm">{page.name}</span>
                                            {hasData ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{page.path}</div>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* SEO Editor */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>
                                {selectedPage 
                                    ? pages.find(p => p.path === selectedPage)?.name 
                                    : 'Select a page to manage SEO'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!selectedPage ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <p>Select a page from the list to generate or edit SEO metadata</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Generate Button */}
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => {
                                                const page = pages.find(p => p.path === selectedPage);
                                                handleGenerateSEO(selectedPage, page.name);
                                            }}
                                            disabled={isGenerating}
                                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
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
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </Button>
                                        )}
                                    </div>

                                    {editingSEO && (
                                        <>
                                            {/* Meta Title */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Meta Title
                                                    <span className="text-gray-500 ml-2">
                                                        ({editingSEO.meta_title?.length || 0}/60 chars)
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
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Meta Description
                                                    <span className="text-gray-500 ml-2">
                                                        ({editingSEO.meta_description?.length || 0}/160 chars)
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
                                            <div>
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
                                                    rows={3}
                                                />
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {editingSEO.keywords?.map((keyword, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                                        >
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Metadata */}
                                            <div className="pt-4 border-t border-gray-200">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    {editingSEO.ai_generated ? (
                                                        <span className="flex items-center gap-1">
                                                            <Sparkles className="w-4 h-4 text-purple-500" />
                                                            AI Generated
                                                        </span>
                                                    ) : (
                                                        <span>Manually Edited</span>
                                                    )}
                                                    {editingSEO.last_generated && (
                                                        <span className="ml-4">
                                                            Last updated: {new Date(editingSEO.last_generated).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}