import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

export default function TestimonialCarousel({ reviews = [], averageRating, totalReviewCount }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    // Show 1 on mobile, 2 on md, 3 on lg
    const getCardsPerPage = () => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };
    const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

    useEffect(() => {
        const handleResize = () => setCardsPerPage(getCardsPerPage());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(reviews.length / cardsPerPage);

    const goNext = useCallback(() => {
        setCurrentPage(p => (p + 1) % totalPages);
    }, [totalPages]);

    const goPrev = useCallback(() => {
        setCurrentPage(p => (p - 1 + totalPages) % totalPages);
    }, [totalPages]);

    // Autoplay
    useEffect(() => {
        if (!autoplay || totalPages <= 1) return;
        const timer = setInterval(goNext, 6000);
        return () => clearInterval(timer);
    }, [autoplay, goNext, totalPages]);

    const visibleReviews = reviews.slice(
        currentPage * cardsPerPage,
        currentPage * cardsPerPage + cardsPerPage
    );

    return (
        <div className="testimonialCarouselWrapper">
            {/* Header row */}
            <div className="testimonialCarouselHeader flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                    <span className="testimonialLabel text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Reviews</span>
                    <h2 className="testimonialTitle text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">Check Out Our Reviews</h2>
                    <div className="testimonialRating flex items-center gap-3 mt-3">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            ))}
                        </div>
                        <span className="text-white font-bold text-lg">{averageRating}</span>
                        <span className="text-[#6b6560] text-sm">based on {totalReviewCount} reviews across Google, Yelp, Angi & Houzz</span>
                    </div>
                </div>

                {/* Navigation arrows */}
                {totalPages > 1 && (
                    <div className="testimonialNavBtns flex items-center gap-2">
                        <Button variant="ghost" size="icon"
                            onClick={() => { goPrev(); setAutoplay(false); }}
                            className="testimonialPrevBtn h-10 w-10 rounded-full border border-[#333] text-[#a09a90] hover:text-white hover:bg-[#333] hover:border-[#c45d2c]/40 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div className="testimonialDots flex gap-1.5 mx-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button key={i} onClick={() => { setCurrentPage(i); setAutoplay(false); }}
                                    className={`testimonialDot h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-[#c45d2c]' : 'w-2 bg-[#444] hover:bg-[#666]'}`} />
                            ))}
                        </div>
                        <Button variant="ghost" size="icon"
                            onClick={() => { goNext(); setAutoplay(false); }}
                            className="testimonialNextBtn h-10 w-10 rounded-full border border-[#333] text-[#a09a90] hover:text-white hover:bg-[#333] hover:border-[#c45d2c]/40 transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Review Cards */}
            <div className="testimonialCarouselBody">
                <div className="testimonialCards">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence mode="wait">
                            {visibleReviews.map((review, idx) => (
                                <motion.div
                                    key={`${currentPage}-${idx}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                                >
                                    <TestimonialCard review={review} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Platform CTAs */}
            <div className="testimonialCta flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10">
                <a href="https://share.google/7R4p12cJP2hQI8Ppy"
                    target="_blank" rel="noopener noreferrer"
                    className="testimonialCtaLink inline-flex items-center gap-2 text-[#a09a90] hover:text-white font-medium text-sm transition-colors group">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/ba08b0eaa_google.png" 
                        alt="Google" className="w-4 h-4" />
                    Google
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="https://www.yelp.com/biz/outright-landscape-covina"
                    target="_blank" rel="noopener noreferrer"
                    className="testimonialCtaLink inline-flex items-center gap-2 text-[#a09a90] hover:text-white font-medium text-sm transition-colors group">
                    <img src="https://cdn.worldvectorlogo.com/logos/yelp-icon.svg" 
                        alt="Yelp" className="w-4 h-4" />
                    Yelp
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="https://www.homeadvisor.com/rated.OUTRIGHTLANDSCAPE.112318590.html"
                    target="_blank" rel="noopener noreferrer"
                    className="testimonialCtaLink inline-flex items-center gap-2 text-[#a09a90] hover:text-white font-medium text-sm transition-colors group">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/9356455c5_Angi_Symbol_1C_Heart_RGB.png" 
                        alt="Angi" className="w-4 h-4" />
                    Angi
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="https://www.houzz.com/professionals/landscape-contractors/outright-landscape-pfvwus-pf~851831346"
                    target="_blank" rel="noopener noreferrer"
                    className="testimonialCtaLink inline-flex items-center gap-2 text-[#a09a90] hover:text-white font-medium text-sm transition-colors group">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/38bcd5dbe_social_circle_green_48px.png" 
                        alt="Houzz" className="w-4 h-4" />
                    Houzz
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
            </div>
        </div>
    );
}