import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroReviews from './HeroReviews';

export default function HomeHero({ onPhoneClick, onQuoteClick, reviews, totalReviewCount, averageRating }) {
    return (
        <section className="homeHero relative min-h-[85vh] sm:min-h-screen flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]">
            {/* Background image — right side on desktop, full on mobile */}
            <div className="absolute inset-0 sm:left-[35%] lg:left-[40%]">
                <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                    alt="Professional landscape project by Outright Landscape in Covina"
                    className="w-full h-full object-cover"
                    fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/80 sm:to-[#1a1a1a]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
            </div>

            <link rel="preload" as="image" href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg" fetchpriority="high" />

            <div className="heroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-12 sm:pt-32 sm:pb-16 sm:py-0">
                <div className="heroInner flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="max-w-xl space-y-4 sm:space-y-6 lg:space-y-8"
                >
                    {/* Badge - hidden on very small screens to save space */}
                    <div className="heroBadge hidden sm:inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                        <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">
                            Licensed C-27 Contractor
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="heroHeadline text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] text-white leading-[1.05] tracking-tight">
                        <span className="font-light">We Build</span>
                        <br />
                        <span className="font-bold text-[#c45d2c]">Landscapes</span>
                        <br />
                        <span className="font-light">That Last</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="heroSubtitle text-[#a09a90] text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                        Premier landscape design & construction serving Covina, Glendora,
                        San&nbsp;Dimas & the entire San Gabriel Valley.
                    </p>

                    {/* Trust badges - compact grid on mobile */}
                    <div className="heroTrustBadges grid grid-cols-2 gap-x-4 gap-y-1.5 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 text-xs sm:text-sm text-[#8a8478]">
                        {['CSLB #1073845', '10+ Years', '250+ Projects', '4.8★ Google'].map((t) => (
                            <span key={t} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4a8c3f] flex-shrink-0" />
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* CTAs - stacked on mobile, side-by-side on desktop */}
                    <div className="heroCtas flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                        <a href="tel:626-343-6028" onClick={() => onPhoneClick('hero')} className="w-full sm:w-auto">
                            <Button className="heroCta w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:shadow-[#c45d2c]/30 hover:scale-[1.02] sm:min-w-[240px]">
                                <Phone className="mr-2 w-4 h-4 sm:mr-2.5 sm:w-5 sm:h-5" aria-hidden="true" />
                                (626) 343-6028
                            </Button>
                        </a>
                        <a href="#contact" onClick={() => onQuoteClick('hero')} className="w-full sm:w-auto">
                            <Button variant="outline" className="heroCtaSecondary w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl transition-all sm:min-w-[240px]">
                                Free Estimate
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                </motion.div>

                {/* Reviews panel - right side on desktop, below on mobile */}
                <div className="heroReviewsWrapper lg:block">
                    <HeroReviews reviews={reviews} totalReviewCount={totalReviewCount} averageRating={averageRating} />
                </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
        </section>
    );
}