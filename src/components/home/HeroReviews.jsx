import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOURCE_CONFIG = {
    google: { 
        icon: "/images/ba08b0eaa_google.png", 
        alt: "Google",
        url: "https://share.google/7R4p12cJP2hQI8Ppy"
    },
    yelp: { 
        icon: "https://cdn.worldvectorlogo.com/logos/yelp-icon.svg", 
        alt: "Yelp",
        url: "https://www.yelp.com/biz/outright-landscape-covina"
    },
    angi: { 
        icon: "/images/9356455c5_Angi_Symbol_1C_Heart_RGB.png", 
        alt: "Angi",
        url: "https://www.homeadvisor.com/rated.OUTRIGHTLANDSCAPE.112318590.html"
    },
    houzz: { 
        icon: "/images/38bcd5dbe_social_circle_green_48px.png", 
        alt: "Houzz",
        url: "https://www.houzz.com/professionals/landscape-contractors/outright-landscape-pfvwus-pf~851831346"
    },
};

function HeroReviewCard({ review }) {
    const name = review.reviewer?.displayName || review.name || 'Customer';
    const city = review.reviewer?.city || review.city || '';
    const comment = review.comment || review.text || '';
    const initial = name.charAt(0).toUpperCase();
    const source = SOURCE_CONFIG[review.source] || SOURCE_CONFIG.google;
    const truncated = comment.length > 110 ? comment.substring(0, 107) + '...' : comment;

    return (
        <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="heroReviewCard block bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 lg:p-5
                       hover:bg-white/[0.16] hover:border-white/20 transition-all cursor-pointer group"
        >
            <div className="heroReviewStars flex gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 fill-yellow-500" />
                ))}
            </div>
            <p className="heroReviewText text-white/80 text-xs lg:text-sm leading-relaxed mb-2.5">"{truncated}"</p>
            <div className="heroReviewAuthor flex items-center gap-2">
                <div className="heroReviewAvatar w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-[#c45d2c] to-[#b8945a] flex items-center justify-center text-white font-bold text-[10px] lg:text-xs flex-shrink-0">
                    {initial}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white/90 font-semibold text-[11px] lg:text-sm truncate">{name}</p>
                    {city && <p className="text-white/40 text-[10px] lg:text-xs">{city}</p>}
                </div>
                <img src={source.icon} alt={source.alt} className="w-4 h-4 lg:w-5 lg:h-5 opacity-50 group-hover:opacity-80 transition-opacity flex-shrink-0" />
            </div>
        </a>
    );
}

export default function HeroReviews({ reviews = [], totalReviewCount, averageRating }) {
    const [page, setPage] = useState(0);
    const [paused, setPaused] = useState(false);
    const perPage = 3;
    const totalPages = Math.ceil(reviews.length / perPage);

    const nextPage = useCallback(() => {
        setPage(p => (p + 1) % totalPages);
    }, [totalPages]);

    const prevPage = useCallback(() => {
        setPage(p => (p - 1 + totalPages) % totalPages);
    }, [totalPages]);

    // Autoplay
    useEffect(() => {
        if (paused || totalPages <= 1) return;
        const timer = setInterval(nextPage, 5000);
        return () => clearInterval(timer);
    }, [paused, totalPages, nextPage]);

    if (reviews.length === 0) return null;

    const startIdx = page * perPage;
    const visibleReviews = reviews.slice(startIdx, startIdx + perPage);

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="heroReviewsPanel w-full max-w-sm lg:max-w-[28rem] space-y-2.5 lg:space-y-3.5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Header */}
            <div className="heroReviewsHeader flex items-center justify-between">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="heroReviewsTitle text-white font-bold text-base sm:text-lg whitespace-nowrap">Check Out Our Reviews</h3>
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            ))}
                        </div>
                        <span className="text-white/50 text-xs whitespace-nowrap">{averageRating} ({totalReviewCount})</span>
                    </div>
                </div>
                {totalPages > 1 && (
                    <div className="heroReviewsNav flex items-center gap-1">
                        <button
                            onClick={prevPage}
                            className="heroReviewsPrev w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all"
                            aria-label="Previous reviews"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="heroReviewsPage text-white/30 text-[10px] font-medium min-w-[28px] text-center">
                            {page + 1}/{totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            className="heroReviewsNext w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all"
                            aria-label="Next reviews"
                        >
                            <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Review Cards Carousel */}
            <div className="heroReviewsList space-y-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ willChange: 'transform, opacity' }}
                        className="space-y-2"
                    >
                        {visibleReviews.map((review, idx) => (
                            <HeroReviewCard key={startIdx + idx} review={review} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Platform icons row */}
            <div className="heroReviewsPlatforms flex items-center gap-3 pt-0.5">
                <span className="text-white/30 text-[10px] uppercase tracking-wider font-medium">Verified on</span>
                <div className="flex items-center gap-2">
                    {Object.entries(SOURCE_CONFIG).map(([key, src]) => (
                        <a key={key} href={src.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <img src={src.icon} alt={src.alt} className="w-4 h-4 opacity-40 hover:opacity-70 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}