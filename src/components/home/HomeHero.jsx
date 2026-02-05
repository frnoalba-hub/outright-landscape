import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeHero({ onPhoneClick, onQuoteClick }) {
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/70 sm:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
            </div>

            <link rel="preload" as="image" href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg" fetchpriority="high" />

            <div className="heroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:py-0">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="max-w-xl space-y-6 sm:space-y-8"
                >
                    {/* Badge */}
                    <div className="heroBadge inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                        <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">
                            Licensed C-27 Contractor
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="heroHeadline text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-white leading-[1.05] tracking-tight">
                        <span className="font-light">We Build</span>
                        <br />
                        <span className="font-bold text-[#c45d2c]">Landscapes</span>
                        <br />
                        <span className="font-light">That Last</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="heroSubtitle text-[#a09a90] text-base sm:text-lg leading-relaxed max-w-md">
                        Premier landscape design & construction serving Covina, Glendora,
                        San&nbsp;Dimas & the entire San Gabriel Valley.
                    </p>

                    {/* Trust badges */}
                    <div className="heroTrustBadges flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#8a8478]">
                        {['CSLB #1073845', '20+ Years', '250+ Projects', '4.8★ Google'].map((t) => (
                            <span key={t} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#4a8c3f]" />
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="heroCtas flex flex-col sm:flex-row gap-3 pt-2">
                        <a href="tel:626-343-6028" onClick={() => onPhoneClick('hero')} className="w-full sm:w-auto">
                            <Button className="heroCta w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-base px-7 py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:shadow-[#c45d2c]/30 hover:scale-[1.02] min-w-[240px]">
                                <Phone className="mr-2.5 w-5 h-5" aria-hidden="true" />
                                (626) 343-6028
                            </Button>
                        </a>
                        <a href="#contact" onClick={() => onQuoteClick('hero')} className="w-full sm:w-auto">
                            <Button variant="outline" className="heroCtaSecondary w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-base px-7 py-6 rounded-xl transition-all min-w-[240px]">
                                Free Estimate
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
        </section>
    );
}