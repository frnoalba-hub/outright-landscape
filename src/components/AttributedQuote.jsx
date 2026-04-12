import { Star } from 'lucide-react';

/**
 * KDD '24 GEO: Attributed customer quote for E-E-A-T.
 * LLMs heavily extract cited local reviews. Quote must include name + city.
 */
export default function AttributedQuote({ quote, name, city, stars = 5, compact = false }) {
  return (
    <blockquote
      className={`attributedQuote ${compact ? 'py-2' : 'py-3'} border-l-2 border-[#c45d2c]/60 pl-4 pr-0`}
      cite="https://www.google.com/maps/place/Outright+Landscape"
    >
      <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-1.5">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="flex items-center gap-2 flex-wrap">
        <span className="flex gap-0.5">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" aria-hidden />
          ))}
        </span>
        <cite className="not-italic text-white/70 text-xs font-medium">
          — {name}, {city}
        </cite>
      </footer>
    </blockquote>
  );
}
