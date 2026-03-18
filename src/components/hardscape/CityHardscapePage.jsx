import React, { useEffect, useRef, useState } from 'react';
import { Phone, CheckCircle2, ArrowRight, Hammer, Layers, MapPin, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { getCityGeo, GEO_QUOTES, GEO_STATS } from '@/schemas/geo-schemas';
import AttributedQuote from '@/components/AttributedQuote';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';
import ContactForm from '@/components/ContactForm';
import ServiceSummaryBox from '@/components/ServiceSummaryBox';
import HeroReviews from '@/components/home/HeroReviews';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

function CountUp({ end, duration = 1500, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const startTime = performance.now();
                const step = (now) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setCount(Math.floor(eased * end));
                    if (progress < 1) requestAnimationFrame(step);
                    else setCount(end);
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);
    return <span ref={ref}>{count}{suffix}</span>;
}

const galleryImages = [
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/3e9548aed_generated_image.png", alt: "Paver patio installation", h: "h-56" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/9deab6cfe_generated_image.png", alt: "Concrete driveway installation", h: "h-64" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/a8d6d8fe8_generated_image.png", alt: "Retaining wall construction", h: "h-52" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e918e168a3b8c3aaa2/15f0a1b84_generated_image.png", alt: "Hardscape project", h: "h-72" },
];

export default function CityHardscapePage({ cityName, citySlug }) {
    const { data: reviewsData } = useQuery({
        queryKey: ['googleReviews'],
        queryFn: async () => {
            const response = await base44.functions.invoke('getGoogleReviews', {});
            return response.data;
        },
        staleTime: 1000 * 60 * 60,
    });

    const trackPhoneClick = (loc) => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'phone_click', event_category: 'engagement', event_label: `hardscape-${citySlug}-${loc}`, phone_number: '626-343-6028' });
        }
    };

    const pageTitle = `Hardscape & Paver Installation in ${cityName}, CA | Outright Landscape`;
    const metaDescription = `Professional hardscaping, paver installation, concrete, and retaining wall construction in ${cityName}, CA. Licensed C-27 contractor. Free estimates. Call (626) 343-6028.`;
    const canonicalUrl = `https://outrightlandscape.com/${citySlug}-hardscape`;

    const services = [
        { icon: Hammer, title: 'Paver Installation', description: `Custom paver patios, driveways, and walkways designed and installed for ${cityName} properties.`, keywords: 'Patios, Driveways, Walkways, Pool Decks' },
        { icon: Layers, title: 'Concrete Work', description: 'Broom, smooth, stamped, or colored concrete — demolition to final finish.', keywords: 'Driveways, Patios, Sidewalks, Slabs' },
        { icon: MapPin, title: 'Retaining Walls', description: 'Engineered slope control with proper drainage, reinforcement, and backfill on every build.', keywords: 'Structural Walls, Garden Walls, Planters' },
        { icon: CheckCircle2, title: 'Outdoor Living', description: 'Fire pits, pergolas, outdoor steps, raised planters, and decorative rock installation.', keywords: 'Fire Pits, Pergolas, Steps, Planters' },
        { icon: Layers, title: 'Demolition & Grading', description: 'Concrete removal, excavation, grading, and base preparation for all hardscape projects.', keywords: 'Demo, Grading, Base Prep, Drainage' },
        { icon: Hammer, title: 'Paver Sealing', description: 'Polymeric sand, sealing, and maintenance to protect and extend the life of your hardscape.', keywords: 'Sealing, Polymeric Sand, Maintenance' },
    ];

    const paverSteps = [
        'Excavation & demolition of existing surface',
        'Geotextile filter fabric — 2 layers for stability',
        'Compacted aggregate base material (Class II)',
        'Sand bedding layer for paver seating',
        'Edge restraints to prevent shifting',
        'Paver placement — variety of colors & patterns',
        'Polymeric sand joint filling & compaction',
        'Optional sealing for long-term protection',
    ];

    const faqs = [
        { q: `How much does paver installation cost in ${cityName}?`, a: `Paver installation in ${cityName} typically ranges from $15–$30+ per square foot depending on paver type, pattern, and base preparation required. We provide free on-site estimates with detailed pricing.` },
        { q: `How much does a concrete driveway cost in ${cityName}?`, a: `Concrete driveways in ${cityName} generally run $8–$18 per square foot for standard finishes. Stamped or colored concrete costs more. We remove the existing surface, prep the base, and pour to spec.` },
        { q: `How long does paver installation take?`, a: `Most residential paver projects in ${cityName} are completed in 2–5 days depending on size and complexity. Larger projects like full driveways may take up to a week.` },
        { q: `Do pavers crack like concrete?`, a: `Pavers are actually more resistant to cracking than poured concrete. Individual pavers can flex with ground movement and can be individually replaced if ever damaged, unlike concrete slabs.` },
        { q: `Do you handle demolition of existing concrete?`, a: `Yes. We handle complete concrete removal, hauling, and disposal before any new hardscape installation. This is included in our project estimates.` },
        { q: `Are you licensed for hardscape work in ${cityName}?`, a: `Yes. Outright Landscape holds CSLB license #1073845 (C-27 Landscaping Contractor), which covers all hardscape and landscape construction work in ${cityName} and throughout California.` },
    ];

    const breadcrumbItems = [
        { name: "Home", url: "https://outrightlandscape.com" },
        { name: "Hardscape", url: "https://outrightlandscape.com/Hardscape" },
        { name: `${cityName} Hardscape`, url: canonicalUrl },
    ];

    return (
        <div className="cityHardscapeWrapper bg-white">
            <SEO title={pageTitle} description={metaDescription} canonicalUrl={canonicalUrl}
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/3e9548aed_generated_image.png"
                geoMeta={getCityGeo(cityName)}
                keywords={`paver installation ${cityName}, hardscape ${cityName}, concrete ${cityName}, retaining walls ${cityName}, hardscape contractor ${cityName}`} />
            <BreadcrumbSchema items={breadcrumbItems} />
            {faqs.length > 0 && <FAQSchema faqs={faqs} cityName={cityName} />}

            {/* ── HERO ── */}
            <section className="cityHardscapeHero relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0 sm:left-[35%] lg:left-[40%]">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/15f0a1b84_generated_image.png"
                        alt={`Hardscape and paver installation in ${cityName}`}
                        className="w-full h-full object-cover" fetchpriority="high" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/75 sm:to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
                </div>
                <div className="cityHardscapeHeroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-12 sm:pt-32 sm:pb-16 sm:py-0">
                    <div className="cityHardscapeHeroInner flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-xl space-y-4 sm:space-y-6">
                            <div className="cityHardscapeHeroBadge hidden sm:inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                                <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">Licensed C-27 Contractor</span>
                            </div>
                            <h1 className="cityHardscapeHeroHeadline text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                                <span className="font-light">{cityName}</span><br />
                                <span className="font-bold text-[#c45d2c]">Hardscape &</span><br />
                                <span className="font-light">Paver Installation</span>
                            </h1>
                            <p className="cityHardscapeHeroSubtitle text-[#a09a90] text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                                {GEO_STATS.yearsInBusiness} years in business. Over {GEO_STATS.projectsCompleted}+ paver patios, driveways, and retaining walls installed in {cityName} and the San Gabriel Valley. Licensed C-27 contractor.
                            </p>
                            <div className="cityHardscapeHeroQuote py-1">
                                <AttributedQuote {...GEO_QUOTES.hardscape} compact />
                            </div>
                            <div className="cityHardscapeHeroTrust grid grid-cols-2 gap-x-4 gap-y-1.5 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 text-xs sm:text-sm text-[#8a8478]">
                                {['CSLB #1073845', `${GEO_STATS.yearsInBusiness} Years`, '4.8★ Google'].map(t => (
                                    <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4a8c3f] flex-shrink-0" />{t}</span>
                                ))}
                            </div>
                            <div className="cityHardscapeHeroCtas flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                                <a href="tel:626-343-6028" onClick={() => trackPhoneClick('hero')} className="w-full sm:w-auto">
                                    <Button className="cityHardscapeHeroCallBtn w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:scale-[1.02] sm:min-w-[240px]">
                                        <Phone className="mr-2 w-4 h-4 sm:mr-2.5 sm:w-5 sm:h-5" />(626) 343-6028
                                    </Button>
                                </a>
                                <a href="#contact" className="w-full sm:w-auto">
                                    <Button variant="outline" className="cityHardscapeHeroQuoteBtn w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl transition-all sm:min-w-[240px]">
                                        Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                        <div className="cityHardscapeHeroReviewsWrapper lg:block">
                            <HeroReviews reviews={reviewsData?.reviews} totalReviewCount={reviewsData?.totalReviewCount} averageRating={reviewsData?.averageRating} />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
            </section>

            {/* ── STATS ── */}
            <section className="cityHardscapeStats py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                        {[{ end: GEO_STATS.projectsCompleted, suffix: '+', l: 'Projects Completed' }, { end: GEO_STATS.yearsInBusiness, suffix: '+', l: 'Years Experience' }, { end: 4.8, suffix: '★', l: 'Google Rating', isDecimal: true }, { end: 100, suffix: '%', l: 'Licensed & Insured' }].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cityHardscapeStatItem text-center py-8 sm:py-10">
                                <div className="text-3xl sm:text-4xl font-bold text-[#c45d2c] tracking-tight">
                                    {s.isDecimal ? `${s.end}${s.suffix}` : <CountUp end={s.end} suffix={s.suffix} />}
                                </div>
                                <div className="text-[#8a8478] text-xs sm:text-sm mt-1 font-medium">{s.l}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICE SUMMARY (GEO) ── */}
            <ServiceSummaryBox
                problem={`Cracking concrete, uneven pavers, poor drainage, and outdated outdoor spaces in ${cityName} requiring professional hardscape construction.`}
                solution={`Professional paver installation, concrete work, and retaining walls in ${cityName}. Licensed C-27 contractor with drainage-first construction.`}
                serviceArea={`${cityName}, CA and the San Gabriel Valley.`}
            />

            {/* ── SERVICES ── */}
            <section className="cityHardscapeServices py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="cityHardscapeServicesHeader mb-14">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Our Services</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mt-2">Hardscape Services in {cityName}</h2>
                        <p className="mt-4 text-[#6b6560] text-base sm:text-lg max-w-3xl">From paver patios to retaining walls and concrete work — we handle the full scope of hardscape construction in {cityName}.</p>
                    </motion.div>
                    <div className="cityHardscapeServicesGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((svc, idx) => {
                            const Icon = svc.icon;
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                                    className="cityHardscapeServiceCard group bg-[#f5f0e8] p-6 sm:p-7 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="w-11 h-11 bg-[#c45d2c]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c45d2c]/20 transition-colors">
                                        <Icon className="w-6 h-6 text-[#c45d2c]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c45d2c] transition-colors">{svc.title}</h3>
                                    <p className="text-[#6b6560] text-sm leading-relaxed mb-3">{svc.description}</p>
                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-[#e0d8cc]">
                                        {svc.keywords.split(', ').map((k, i) => (
                                            <span key={i} className="text-xs bg-[#2d5a27]/10 text-[#2d5a27] px-2.5 py-1 rounded-md font-medium">{k}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── PAVER PROCESS ── */}
            <section className="cityHardscapeProcess py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">How We Build It</span>
                            <h2 className="cityHardscapeProcessTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2 mb-5">Our Paver Installation Process</h2>
                            <p className="text-[#6b6560] text-base mb-6 leading-relaxed">Every paver project starts with proper excavation and base prep — no shortcuts. This is how we ensure your {cityName} hardscape lasts for decades.</p>
                            <dl className="cityHardscapeProcessList space-y-2.5">
                                {paverSteps.map((step, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                        className="flex items-start gap-2.5 text-sm text-[#4a4540]">
                                        <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" aria-hidden />
                                        <div><dt className="sr-only">Step {i + 1}</dt><dd className="m-0">{step}</dd></div>
                                    </motion.div>
                                ))}
                            </dl>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className="cityHardscapeProcessImg rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/3e9548aed_generated_image.png"
                                alt={`Paver installation in ${cityName}`} className="w-full h-full object-cover" loading="lazy" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── GALLERY ── */}
            <section className="cityHardscapeGallery py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                        <div>
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Our Work</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Hardscape Projects in {cityName}</h2>
                        </div>
                        <p className="text-[#6b6560] text-sm max-w-sm">Installations throughout {cityName} & the San Gabriel Valley</p>
                    </motion.div>
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                        {galleryImages.map((img, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                                className={`cityHardscapeGalleryItem group relative overflow-hidden rounded-xl break-inside-avoid ${img.h}`}>
                                <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 via-transparent to-transparent" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRUST STATS ── */}
            <section className="cityHardscapeTrust py-0 bg-[#1a1a1a] border-y border-[#333]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#333]">
                        <div className="text-center py-10 flex flex-col items-center gap-1">
                            <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}</div>
                            <div className="text-white font-bold text-sm">5.0 Rating</div>
                        </div>
                        {[{ end: 250, suffix: '+', l: 'Hardscape Projects' }, { end: 10, suffix: '+', l: 'Years Experience' }, { end: 100, suffix: '%', l: 'Licensed & Insured' }].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cityHardscapeTrustStat text-center py-10">
                                <div className="text-3xl font-bold text-[#c45d2c]"><CountUp end={s.end} suffix={s.suffix} /></div>
                                <div className="text-[#8a8478] text-xs mt-1">{s.l}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="cityHardscapeFaq py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">FAQ</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Common Questions</h2>
                    </motion.div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                                className="cityHardscapeFaqItem bg-white p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-2">{faq.q}</h3>
                                <p className="text-[#6b6560] text-sm leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACT FORM ── */}
            <section id="contact">
                <ContactForm cityName={cityName} />
            </section>
        </div>
    );
}