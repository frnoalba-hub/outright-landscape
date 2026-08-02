import { Star } from 'lucide-react';

export default function AttributedQuote({ quote, name, city, stars = 5, compact = false, sourceUrl }) {
  return (
    <blockquote
      className={`attributedQuote ${compact ? 'py-2' : 'py-3'} border-l-2 border-[#c45d2c]/60 pl-4 pr-0`}
      cite={sourceUrl}
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
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 text-xs underline underline-offset-2 hover:text-white"
          >
            View source
          </a>
        )}
      </footer>
    </blockquote>
  );
}
