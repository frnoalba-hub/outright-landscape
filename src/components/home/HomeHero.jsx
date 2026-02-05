import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeHero({ onPhoneClick, onQuoteClick }) {
    return (
        <section className="homeHero relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg')`,
                    backgroundAttachment: 'fixed',
                }}
                role="img"
                aria-label="Professional landscape project by Outright Landscape in Covina"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75" />

            <link rel="preload" as="image" href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg" fetchpriority="high" />

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="space-y-5 sm:space-y-6"
                >
                    {/* Accent line */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-10 bg-green-400/70" />
                        <span className="heroAccent text-green-400 uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold">
                            Licensed C-27 Contractor&nbsp;&nbsp;•&nbsp;&nbsp;CSLB #1073845
                        </span>
                        <div className="h-px w-10 bg-green-400/70" />
                    </div>

                    {/* Headline */}
                    <h1 className="heroHeadline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight">
                        Crafting Exceptional
                        <br />
                        <span className="text-green-400">Outdoor Spaces</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="heroSubtitle text-base sm:text-lg md:text-xl text-white/75 font-light max-w-2xl mx-auto leading-relaxed">
                        Premier landscape design &amp; construction serving Covina, Glendora,
                        San&nbsp;Dimas &amp; the San Gabriel Valley
                    </p>

                    {/* Service pills */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {['Expert Pavers', 'Turf Installation', 'Irrigation Systems', 'Hardscaping'].map((s) => (
                            <span key={s} className="text-[11px] sm:text-xs text-green-300 font-medium px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-green-400/30">
                                {s}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <a href="tel:626-343-6028" onClick={() => onPhoneClick('hero')} className="w-full sm:w-auto">
                            <Button className="heroCta w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-base sm:text-lg px-8 py-5 sm:py-6 rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-orange-500/25 min-w-0 sm:min-w-[260px]">
                                <Phone className="mr-2 w-5 h-5" aria-hidden="true" />
                                (626) 343-6028
                            </Button>
                        </a>
                        <a href="#contact" onClick={() => onQuoteClick('hero')} className="w-full sm:w-auto">
                            <Button variant="outline" className="heroCtaSecondary w-full sm:w-auto border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-gray-900 font-semibold text-base sm:text-lg px-8 py-5 sm:py-6 rounded-full transition-all min-w-0 sm:min-w-[260px]">
                                Get Free Estimate
                            </Button>
                        </a>
                    </div>

                    {/* Trust strip */}
                    <div className="heroTrust flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-white/50 text-xs sm:text-sm">
                        <span>10+ Years Experience</span>
                        <span className="hidden sm:inline text-white/20">|</span>
                        <span>500+ Projects</span>
                        <span className="hidden sm:inline text-white/20">|</span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            4.8 Google Rating
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.a
                href="#services"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/80 transition-colors"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                aria-label="Scroll to services"
            >
                <ArrowDown className="w-5 h-5" />
            </motion.a>
        </section>
    );
}