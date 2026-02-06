import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Skeleton } from '@/components/ui/skeleton';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';

export default function GoogleReviews() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['googleReviews'],
        queryFn: async () => {
            const response = await base44.functions.invoke('getGoogleReviews', {});
            return response.data;
        },
        staleTime: 1000 * 60 * 60,
    });

    if (isLoading) {
        return (
            <section className="googleReviewsLoading py-20 sm:py-28 bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="mb-10">
                        <Skeleton className="h-4 w-24 mb-3 bg-[#333]" />
                        <Skeleton className="h-10 w-80 mb-3 bg-[#333]" />
                        <Skeleton className="h-5 w-48 bg-[#333]" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-64 w-full rounded-2xl bg-[#242424]" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error || !data?.success) return null;

    const { reviews, aiSummary, averageRating, totalReviewCount } = data;

    return (
        <section id="reviews" className="googleReviewsSection py-20 sm:py-28 bg-[#1a1a1a] relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, #c45d2c 0%, transparent 50%), radial-gradient(circle at 80% 50%, #b8945a 0%, transparent 50%)`
            }} />
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                <TestimonialCarousel 
                    reviews={reviews} 
                    aiSummary={aiSummary} 
                    averageRating={averageRating} 
                    totalReviewCount={totalReviewCount} 
                />
            </div>
        </section>
    );
}