import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ review, variant = "default" }) {
    const name = review.reviewer?.displayName || review.name || 'Customer';
    const city = review.reviewer?.city || review.city || '';
    const comment = review.comment || review.text || '';
    const rating = review.starRating === 'FIVE' ? 5
        : review.starRating === 'FOUR' ? 4
        : review.rating || 5;
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className={`testimonialCard group relative bg-[#242424] border border-[#333] rounded-2xl p-6 sm:p-7 
            hover:border-[#c45d2c]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#c45d2c]/5 
            flex flex-col h-full ${variant === 'featured' ? 'lg:p-8' : ''}`}>
            {/* Quote icon */}
            <Quote className="testimonialQuoteIcon absolute top-5 right-5 w-8 h-8 text-[#333] group-hover:text-[#c45d2c]/20 transition-colors" />

            {/* Stars */}
            <div className="testimonialStars flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-[#444]'}`} />
                ))}
            </div>

            {/* Review text */}
            <p className={`testimonialText text-[#a09a90] leading-relaxed flex-1 mb-5 ${variant === 'featured' ? 'text-base' : 'text-sm'}`}>
                "{comment}"
            </p>

            {/* Reviewer info */}
            <div className="testimonialAuthor flex items-center gap-3 pt-4 border-t border-[#333]">
                <div className="testimonialAvatar w-10 h-10 rounded-full bg-gradient-to-br from-[#c45d2c] to-[#b8945a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {initial}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="testimonialName text-white font-semibold text-sm truncate">{name}</p>
                    {city && <p className="testimonialCity text-[#6b6560] text-xs">{city}</p>}
                </div>
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/ba08b0eaa_google.png" 
                    alt="Google" className="testimonialGoogleIcon w-5 h-5 opacity-50 group-hover:opacity-80 transition-opacity flex-shrink-0" />
            </div>
        </div>
    );
}