import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star, Quote, Sparkles, ThumbsUp, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function GoogleReviews() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['googleReviews'],
        queryFn: async () => {
            const response = await base44.functions.invoke('getGoogleReviews', {});
            return response.data;
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    if (isLoading) {
        return (
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Skeleton className="h-64 w-full rounded-2xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-32 w-full rounded-xl" />
                            <Skeleton className="h-32 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !data?.success) {
        return null; // Hide section on error
    }

    const { reviews, aiSummary, averageRating, totalReviewCount } = data;

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-green-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-current" />
                            ))}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Trusted by Your Neighbors
                    </h2>
                    <p className="text-lg text-gray-600">
                        Based on {totalReviewCount} Google Reviews
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* AI Summary Card */}
                    {aiSummary && (
                        <div className="lg:col-span-2">
                            <Card className="h-full border-green-100 bg-white shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2 text-green-600 mb-2">
                                        <Sparkles className="w-5 h-5 animate-pulse" />
                                        <span className="text-sm font-bold uppercase tracking-wider">AI Analysis</span>
                                    </div>
                                    <CardTitle className="text-xl text-gray-900">What People Are Saying</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <p className="text-gray-700 italic text-lg leading-relaxed">
                                            "{aiSummary.summary}"
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <ThumbsUp className="w-4 h-4 text-green-500" />
                                            Customer Highlights
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {aiSummary.positive_highlights?.map((highlight, i) => (
                                                <Badge key={i} variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                                                    {highlight}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-blue-500" />
                                            Common Themes
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {aiSummary.themes?.map((theme, i) => (
                                                <Badge key={i} variant="outline" className="border-gray-200 text-gray-600">
                                                    {theme}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Recent Reviews List */}
                    <div className={`space-y-4 ${aiSummary ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
                        {reviews.slice(0, 3).map((review, idx) => (
                            <Card key={idx} className="border-gray-100 hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                {review.reviewer?.displayName?.charAt(0) || 'G'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.reviewer?.displayName}</h4>
                                                <div className="flex text-yellow-400 text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < (review.starRating === 'FIVE' ? 5 : 4) ? 'fill-current' : 'text-gray-200'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
                                    </div>
                                    <div className="relative">
                                        <Quote className="absolute -top-1 -left-1 w-6 h-6 text-gray-100 -z-10 transform -scale-x-100" />
                                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                            {review.comment}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        
                        <div className="text-center pt-4">
                            <a 
                                href="https://www.google.com/search?q=Outright+Landscape+Covina+Reviews" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={() => {
                                    if (window.dataLayer) {
                                        window.dataLayer.push({
                                            event: 'external_link_click',
                                            event_category: 'engagement',
                                            event_label: 'google_reviews_more',
                                            link_text: 'Read more reviews',
                                            destination: 'google_business_profile',
                                            page_section: 'reviews'
                                        });
                                    }
                                }}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                            >
                                Read more reviews on Google
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}