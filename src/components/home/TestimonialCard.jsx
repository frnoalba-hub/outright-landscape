import { Star, Quote } from 'lucide-react';

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
    }
};

export default function TestimonialCard({ review, variant = "default" }) {
    const name = review.reviewer?.displayName || review.name || 'Customer';
    const city = review.reviewer?.city || review.city || '';
    const comment = review.comment || review.text || '';
    const rating = review.starRating === 'FIVE' ? 5
        : review.starRating === 'FOUR' ? 4
        : review.rating || 5;
    const initial = name.charAt(0).toUpperCase();
    const source = SOURCE_CONFIG[review.source] || SOURCE_CONFIG.google;

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
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="testimonialSourceIcon flex-shrink-0" title={`View on ${source.alt}`}>
                    <img src={source.icon} 
                        alt={source.alt} className="w-5 h-5 opacity-50 group-hover:opacity-80 transition-opacity" />
                </a>
            </div>
        </div>
    );
}