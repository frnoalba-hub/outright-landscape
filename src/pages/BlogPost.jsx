import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Calendar, User, Clock, ChevronLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { createPageUrl, createBlogPostUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import ReactMarkdown from "react-markdown";
import ContactForm from "@/components/ContactForm";
import { useBlogPosts } from "@/hooks/useBlogPosts";

export default function BlogPost() {
    const { slug: paramSlug } = useParams();
    const urlParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const querySlug = urlParams.get("slug");
    const slug = paramSlug || querySlug;

    const navigate = useNavigate();
    const { posts = [], isLoading } = useBlogPosts();

    // Redirect /BlogPost?slug=x to /blog/x for canonical URLs
    useEffect(() => {
        if (querySlug && !paramSlug) {
            navigate(createBlogPostUrl(querySlug), { replace: true });
        }
    }, [querySlug, paramSlug, navigate]);

    const post = posts.find(p => p.slug === slug);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>;
    
    if (!post) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
            <Button asChild><a href={createPageUrl("Blog")}>Return to Blog</a></Button>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEOHead
                title={`${post.title} | Outright Landscape`}
                description={post.excerpt}
                canonicalUrl={`https://outrightlandscape.com/blog/${post.slug}`}
                ogImage={post.cover_image || post.image_url || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png'}
                ogType="article"
            />

            {/* Progress Bar (Optional could be added here) */}

            <article>
                {/* Header */}
                <div className="relative h-[50vh] min-h-[400px] w-full">
                    <div className="absolute inset-0">
                        <img 
                            src={post.cover_image || post.image_url || "https://images.unsplash.com/photo-1558904541-efa843a96f01"} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
                            <Button variant="outline" size="sm" className="mb-6 text-white border-white hover:bg-white hover:text-black bg-transparent" asChild>
                                <a href={createPageUrl("Blog")}>
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Back to Blog
                                </a>
                            </Button>
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                                    {post.category}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-200 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                        {post.author?.[0] || "O"}
                                    </div>
                                    {post.author}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {format(new Date(post.created_date || Date.now()), 'MMMM d, yyyy')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {Math.ceil(post.content?.length / 800) || 3} min read
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
                    <div className="prose prose-lg prose-green mx-auto">
                        <p className="lead text-xl text-gray-600 mb-8 font-medium border-l-4 border-green-500 pl-4 italic">
                            {post.excerpt}
                        </p>
                        <ReactMarkdown 
                            components={{
                                img: ({node, ...props}) => <img {...props} className="rounded-xl shadow-lg my-8" />
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Share / Tags */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <div className="font-medium text-gray-900">
                            Share this article:
                        </div>
                        <div className="flex gap-2">
                            <Button size="icon" variant="outline" onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                // Toast could go here
                            }}>
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            {/* CTA Section */}
            <section className="bg-gray-50 py-16 border-t">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Ready to transform your landscape?</h2>
                    <ContactForm />
                </div>
            </section>
        </div>
    );
}