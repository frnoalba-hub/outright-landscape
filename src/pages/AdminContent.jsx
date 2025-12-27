import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Wand2, Trash2, Edit, FileText, MapPin, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

export default function AdminContent() {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("blog");
    const [isGenerating, setIsGenerating] = useState(false);
    
    // Blog State
    const [editingPost, setEditingPost] = useState(null); // null = list mode, object = edit/create mode
    const [postForm, setPostForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "Tips" });
    
    // Location State
    const [editingLocation, setEditingLocation] = useState(null);
    const [locationForm, setLocationForm] = useState({ name: "", slug: "", intro: "", faqs: [] });

    // AI Generation State
    const [genTopic, setGenTopic] = useState("");
    const [genKeywords, setGenKeywords] = useState("");
    const [genTone, setGenTone] = useState("Professional yet friendly");

    // --- Queries ---
    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => base44.auth.me(),
    });

    const { data: posts = [] } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: () => base44.entities.BlogPost.list({ sort: { created_date: -1 } }),
    });

    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list({ sort: { name: 1 } }),
    });

    // --- Mutations ---
    
    // Blog
    const savePostMutation = useMutation({
        mutationFn: (data) => data.id 
            ? base44.entities.BlogPost.update(data.id, data) 
            : base44.entities.BlogPost.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['blog-posts']);
            setEditingPost(null);
            resetForms();
        }
    });

    const deletePostMutation = useMutation({
        mutationFn: (id) => base44.entities.BlogPost.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['blog-posts'])
    });

    // Location
    const saveLocationMutation = useMutation({
        mutationFn: (data) => data.id 
            ? base44.entities.Location.update(data.id, data) 
            : base44.entities.Location.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['locations']);
            setEditingLocation(null);
            resetForms();
        }
    });

    // AI Generation
    const generateContent = async (type) => {
        if (!genTopic) return alert("Please enter a topic or city name");
        setIsGenerating(true);
        try {
            const res = await base44.functions.invoke("generateContent", {
                type,
                topic: genTopic,
                keywords: genKeywords,
                tone: genTone
            });
            
            const data = res.data;
            if (type === 'blog') {
                setPostForm(prev => ({
                    ...prev,
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content
                }));
            } else {
                setLocationForm(prev => ({
                    ...prev,
                    name: genTopic, // Assume topic is city name
                    slug: genTopic.toLowerCase().replace(/\s+/g, '-'),
                    intro: data.intro,
                    faqs: data.faqs || []
                }));
            }
        } catch (error) {
            console.error(error);
            alert("Failed to generate content: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetForms = () => {
        setPostForm({ title: "", slug: "", excerpt: "", content: "", category: "Tips" });
        setLocationForm({ name: "", slug: "", intro: "", faqs: [] });
        setGenTopic("");
        setGenKeywords("");
    };

    const handleEditPost = (post) => {
        setPostForm(post);
        setEditingPost(post);
    };

    const handleCreatePost = () => {
        resetForms();
        setEditingPost({});
    };

    const handleEditLocation = (loc) => {
        setLocationForm(loc);
        setEditingLocation(loc);
        setGenTopic(loc.name); // Pre-fill for generation
    };

    const handleCreateLocation = () => {
        resetForms();
        setEditingLocation({});
    };

    if (isAuthLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
    if (!user || user.role !== 'admin') return <div className="p-10 text-center">Access Denied</div>;

    // --- Render Helpers ---

    const renderAiGenerator = (type) => (
        <Card className="bg-slate-50 border-slate-200 mb-6">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-indigo-600">
                    <Wand2 className="w-4 h-4" /> AI Content Generator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>{type === 'blog' ? 'Topic / Title Idea' : 'City Name'}</Label>
                        <Input 
                            value={genTopic} 
                            onChange={e => setGenTopic(e.target.value)} 
                            placeholder={type === 'blog' ? "e.g., Summer Lawn Care Tips" : "e.g., Covina"}
                        />
                    </div>
                    <div>
                        <Label>Tone of Voice</Label>
                        <Select value={genTone} onValueChange={setGenTone}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Professional yet friendly">Professional yet friendly</SelectItem>
                                <SelectItem value="Authoritative and expert">Authoritative and expert</SelectItem>
                                <SelectItem value="Casual and helpful">Casual and helpful</SelectItem>
                                <SelectItem value="Sales-focused">Sales-focused</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-2">
                        <Label>Target Keywords (comma separated)</Label>
                        <Input 
                            value={genKeywords} 
                            onChange={e => setGenKeywords(e.target.value)} 
                            placeholder="e.g., landscaping, irrigation, drought tolerant"
                        />
                    </div>
                </div>
                <Button 
                    onClick={() => generateContent(type)} 
                    disabled={isGenerating}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
                    Generate Draft
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 pt-28">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
                        <p className="text-gray-500">Manage blog posts and service area pages with AI assistance.</p>
                    </div>
                    <Button variant="outline" onClick={() => window.history.back()}>Back to Dashboard</Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="blog" className="gap-2"><FileText className="w-4 h-4" /> Blog Posts</TabsTrigger>
                        <TabsTrigger value="locations" className="gap-2"><MapPin className="w-4 h-4" /> Service Areas</TabsTrigger>
                    </TabsList>

                    {/* BLOG TAB */}
                    <TabsContent value="blog">
                        {editingPost ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">{editingPost.id ? 'Edit Post' : 'Create New Post'}</h2>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" onClick={() => setEditingPost(null)}>Cancel</Button>
                                        <Button onClick={() => savePostMutation.mutate(postForm)} disabled={savePostMutation.isPending}>
                                            <Save className="w-4 h-4 mr-2" /> Save Post
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 space-y-6">
                                        {renderAiGenerator('blog')}
                                        
                                        <Card>
                                            <CardContent className="p-6 space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Title</Label>
                                                    <Input value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Excerpt</Label>
                                                    <Textarea value={postForm.excerpt} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} rows={3} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Content (Markdown)</Label>
                                                    <Textarea 
                                                        value={postForm.content} 
                                                        onChange={e => setPostForm({...postForm, content: e.target.value})} 
                                                        className="min-h-[400px] font-mono text-sm"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="space-y-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Settings</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Slug</Label>
                                                    <Input value={postForm.slug} onChange={e => setPostForm({...postForm, slug: e.target.value})} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Category</Label>
                                                    <Select value={postForm.category} onValueChange={v => setPostForm({...postForm, category: v})}>
                                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Tips">Tips</SelectItem>
                                                            <SelectItem value="Projects">Projects</SelectItem>
                                                            <SelectItem value="News">News</SelectItem>
                                                            <SelectItem value="Seasonal">Seasonal</SelectItem>
                                                            <SelectItem value="Design">Design</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Cover Image URL</Label>
                                                    <Input value={postForm.cover_image || ''} onChange={e => setPostForm({...postForm, cover_image: e.target.value})} placeholder="https://..." />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // List View
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>All Blog Posts</CardTitle>
                                    <Button onClick={handleCreatePost}><Plus className="w-4 h-4 mr-2" /> New Post</Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {posts.map(post => (
                                            <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                                <div>
                                                    <h3 className="font-semibold">{post.title}</h3>
                                                    <p className="text-sm text-gray-500">{post.category} • {new Date(post.created_date).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEditPost(post)}><Edit className="w-4 h-4" /></Button>
                                                    <Button variant="ghost" size="icon" onClick={() => { if(confirm('Delete post?')) deletePostMutation.mutate(post.id) }} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                                                </div>
                                            </div>
                                        ))}
                                        {posts.length === 0 && <p className="text-center text-gray-500 py-8">No posts found.</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* LOCATIONS TAB */}
                    <TabsContent value="locations">
                        {editingLocation ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">{editingLocation.id ? 'Edit Location' : 'Create New Location'}</h2>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" onClick={() => setEditingLocation(null)}>Cancel</Button>
                                        <Button onClick={() => saveLocationMutation.mutate(locationForm)} disabled={saveLocationMutation.isPending}>
                                            <Save className="w-4 h-4 mr-2" /> Save Location
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        {renderAiGenerator('service_area')}
                                        <Card>
                                            <CardContent className="p-6 space-y-4">
                                                <div className="space-y-2">
                                                    <Label>City Name</Label>
                                                    <Input value={locationForm.name} onChange={e => setLocationForm({...locationForm, name: e.target.value})} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Slug</Label>
                                                    <Input value={locationForm.slug} onChange={e => setLocationForm({...locationForm, slug: e.target.value})} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Intro Content</Label>
                                                    <Textarea 
                                                        value={locationForm.intro} 
                                                        onChange={e => setLocationForm({...locationForm, intro: e.target.value})} 
                                                        rows={8}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="space-y-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>FAQs</CardTitle>
                                                <CardDescription>Generated FAQs for this location</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                {locationForm.faqs?.map((faq, idx) => (
                                                    <div key={idx} className="p-3 bg-gray-50 rounded border">
                                                        <Input 
                                                            value={faq.q} 
                                                            onChange={e => {
                                                                const newFaqs = [...locationForm.faqs];
                                                                newFaqs[idx].q = e.target.value;
                                                                setLocationForm({...locationForm, faqs: newFaqs});
                                                            }}
                                                            className="mb-2 font-semibold"
                                                        />
                                                        <Textarea 
                                                            value={faq.a} 
                                                            onChange={e => {
                                                                const newFaqs = [...locationForm.faqs];
                                                                newFaqs[idx].a = e.target.value;
                                                                setLocationForm({...locationForm, faqs: newFaqs});
                                                            }}
                                                        />
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="mt-2 text-red-500 h-6"
                                                            onClick={() => {
                                                                const newFaqs = locationForm.faqs.filter((_, i) => i !== idx);
                                                                setLocationForm({...locationForm, faqs: newFaqs});
                                                            }}
                                                        >Delete FAQ</Button>
                                                    </div>
                                                ))}
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={() => setLocationForm({...locationForm, faqs: [...(locationForm.faqs || []), {q: "New Question", a: "Answer"}]})}
                                                >
                                                    <Plus className="w-4 h-4 mr-1" /> Add FAQ
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Service Areas</CardTitle>
                                    <Button onClick={handleCreateLocation}><Plus className="w-4 h-4 mr-2" /> New Location</Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {locations.map(loc => (
                                            <div key={loc.id} className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col justify-between h-32">
                                                <div>
                                                    <h3 className="font-semibold">{loc.name}</h3>
                                                    <code className="text-xs text-gray-500">{loc.slug}</code>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => handleEditLocation(loc)} className="mt-2">
                                                    Edit Page
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}