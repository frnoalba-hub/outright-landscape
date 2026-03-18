import { AlertCircle, CheckCircle2, MapPin } from 'lucide-react';

/**
 * GEO-optimized service summary for AI crawlers.
 * Renders Problem, Solution, and Service Area in a structured, parseable format.
 * Use at top of service pages (after hero/stats).
 */
export default function ServiceSummaryBox({
  problem,
  solution,
  serviceArea,
  className = '',
}) {
  return (
    <aside
      className={`ServiceSummaryBox bg-[#f5f0e8] border-y border-[#e0d8cc] py-10 sm:py-12 ${className}`}
      aria-labelledby="summary-heading"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <h2 id="summary-heading" className="sr-only">
          Service summary
        </h2>
        <dl className="grid md:grid-cols-3 gap-6 md:gap-8">
          {problem && (
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#c45d2c]/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#c45d2c]" aria-hidden />
              </span>
              <div className="min-w-0">
                <dt className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wide mb-1">Problem</dt>
                <dd className="text-[#4a4540] text-sm leading-relaxed m-0">{problem}</dd>
              </div>
            </div>
          )}
          {solution && (
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2d5a27]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#2d5a27]" aria-hidden />
              </span>
              <div className="min-w-0">
                <dt className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wide mb-1">Solution</dt>
                <dd className="text-[#4a4540] text-sm leading-relaxed m-0">{solution}</dd>
              </div>
            </div>
          )}
          {serviceArea && (
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#b8945a]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#b8945a]" aria-hidden />
              </span>
              <div className="min-w-0">
                <dt className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wide mb-1">Service area</dt>
                <dd className="text-[#4a4540] text-sm leading-relaxed m-0">{serviceArea}</dd>
              </div>
            </div>
          )}
        </dl>
      </div>
    </aside>
  );
}
