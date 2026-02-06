import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SOURCE_ICONS = {
    google: { icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/ba08b0eaa_google.png", alt: "Google" },
    yelp: { icon: "https://cdn.worldvectorlogo.com/logos/yelp-icon.svg", alt: "Yelp" },
    angi: { icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/9356455c5_Angi_Symbol_1C_Heart_RGB.png", alt: "Angi" },
    houzz: { icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/38bcd5dbe_social_circle_green_48px.png", alt: "Houzz" },
};

function HeroReviewCard({ review, index }) {
    const name = review.reviewer?.displayName || review.name || 'Customer';
    const city = review.reviewer?.city || review.city || '';
    const comment = review.comment || review.text || '';
    const initial = name.charAt(0).toUpperCase();
    const source = SOURCE_ICONS[review.source] || SOURCE_ICONS.google;

    // Truncate long reviews
    const truncated = comment.length > 120 ? comment.substring(0, 117) + '...' : comment;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
            className="heroReviewCard bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/[0.14] transition-all"
        >
            <div className="heroReviewStars flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                ))}
            </div>
            <p className="heroReviewText text-white/80 text-xs leading-relaxed mb-3">"{truncated}"</p>
            <div className="heroReviewAuthor flex items-center gap-2">
                <div className="heroReviewAvatar w-7 h-7 rounded-full bg-gradient-to-br from-[#c45d2c] to-[#b8945a] flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
                    {initial}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white/90 font-semibold text-[11px] truncate">{name}</p>
                    {city && <p className="text-white/40 text-[10px]">{city}</p>}
                </div>
                <img src={source.icon} alt={source.alt} className="w-4 h-4 opacity-60 flex-shrink-0" />
            </div>
        </motion.div>
    );
}

export default function HeroReviews({ reviews = [], totalReviewCount, averageRating }) {
    // Show top 3 reviews (pick diverse sources)
    const displayReviews = React.useMemo(() => {
        if (reviews.length === 0) return [];
        const picked = [];
        const sources = ['google', 'yelp', 'angi', 'houzz'];
        // Pick one from each source first
        for (const src of sources) {
            if (picked.length >= 3) break;
            const found = reviews.find(r => r.source === src && !picked.includes(r));
            if (found) picked.push(found);
        }
        // Fill remaining from any
        for (const r of reviews) {
            if (picked.length >= 3) break;
            if (!picked.includes(r)) picked.push(r);
        }
        return picked;
    }, [reviews]);

    if (displayReviews.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="heroReviewsPanel w-full max-w-sm space-y-3"
        >
            {/* Header */}
            <div className="heroReviewsHeader flex items-center gap-2 mb-1">
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    ))}
                </div>
                <span className="text-white font-bold text-sm">{averageRating}</span>
                <span className="text-white/40 text-xs">• {totalReviewCount} reviews</span>
            </div>

            {/* Review Cards */}
            <div className="heroReviewsList space-y-2.5">
                {displayReviews.map((review, idx) => (
                    <HeroReviewCard key={idx} review={review} index={idx} />
                ))}
            </div>

            {/* Platform icons row */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="heroReviewsPlatforms flex items-center gap-3 pt-1"
            >
                <span className="text-white/30 text-[10px] uppercase tracking-wider font-medium">Verified on</span>
                <div className="flex items-center gap-2">
                    {Object.values(SOURCE_ICONS).map((src, i) => (
                        <img key={i} src={src.icon} alt={src.alt} className="w-4 h-4 opacity-40" />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}