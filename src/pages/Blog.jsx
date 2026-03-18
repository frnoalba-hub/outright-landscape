import React, { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/blog/BlogCard";
import SharedHero from "@/components/SharedHero";
import SEOHead from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Blog() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const { posts = [], isLoading } = useBlogPosts();

    const categories = ["All", ...new Set(posts.map(p => p.category).filter(Boolean))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                              post.excerpt?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || post.category === category;
        return matchesSearch && matchesCategory && post.published !== false;
    });

    return (
        <div className="bg-white min-h-screen">
             <SEOHead
                title="Landscaping Tips & News | Outright Landscape Blog"
                description="Expert advice on lawn care, hardscaping trends, irrigation tips, and landscaping news for the San Gabriel Valley."
                canonicalUrl="https://outrightlandscape.com/Blog"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png"
            />

            <SharedHero 
                title="Landscape & Living"
                subtitle="Expert tips, project showcases, and seasonal advice for your outdoor space"
                backgroundImage="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=2000"
                showButtons={false}
            />

            <section className="py-16" aria-labelledby="blog-posts-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 id="blog-posts-heading" className="sr-only">Landscaping Tips & Articles</h2>
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
                        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                            {categories.map(cat => (
                                <Button 
                                    key={cat} 
                                    variant={category === cat ? "default" : "outline"}
                                    onClick={() => setCategory(cat)}
                                    className={category === cat ? "bg-green-600 hover:bg-green-700" : ""}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                                placeholder="Search articles..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Content Grid */}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl">
                            <p className="text-xl font-semibold text-gray-900 mb-2">No articles found</p>
                            <p className="text-gray-500">Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}