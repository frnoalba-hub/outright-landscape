import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Sparkles, ThumbsUp, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

export default function TestimonialCarousel({ reviews = [], aiSummary, averageRating, totalReviewCount }) {
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
                    <span className="testimonialLabel text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Testimonials</span>
                    <h2 className="testimonialTitle text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">What Our Clients Say</h2>
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

            {/* AI Summary + Cards row */}
            <div className="testimonialCarouselBody grid lg:grid-cols-4 gap-5">
                {/* AI Summary Card */}
                {aiSummary && (
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="testimonialAISummary lg:col-span-1 bg-gradient-to-br from-[#2d5a27]/20 to-[#242424] border border-[#2d5a27]/30 rounded-2xl p-6 sm:p-7 flex flex-col">
                        <div className="testimonialAIBadge flex items-center gap-2 text-[#4a8c3f] mb-4">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI Analysis</span>
                        </div>
                        <p className="testimonialAIQuote text-[#a09a90] text-sm italic leading-relaxed mb-5 flex-1">
                            "{aiSummary.summary}"
                        </p>
                        {aiSummary.positive_highlights?.length > 0 && (
                            <div className="testimonialAIHighlights mb-4">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <ThumbsUp className="w-3.5 h-3.5 text-[#4a8c3f]" />
                                    <span className="text-[10px] font-semibold text-[#6b6560] uppercase tracking-wide">Highlights</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {aiSummary.positive_highlights.slice(0, 4).map((h, i) => (
                                        <Badge key={i} className="testimonialAITag bg-[#2d5a27]/20 text-[#8fbc8b] border-[#2d5a27]/30 text-[10px] hover:bg-[#2d5a27]/30">
                                            {h}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {aiSummary.themes?.length > 0 && (
                            <div className="testimonialAIThemes">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <MessageSquare className="w-3.5 h-3.5 text-[#b8945a]" />
                                    <span className="text-[10px] font-semibold text-[#6b6560] uppercase tracking-wide">Themes</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {aiSummary.themes.slice(0, 4).map((t, i) => (
                                        <Badge key={i} variant="outline" className="testimonialAIThemeTag border-[#444] text-[#8a8478] text-[10px]">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Review Cards Carousel */}
                <div className={`testimonialCards ${aiSummary ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
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