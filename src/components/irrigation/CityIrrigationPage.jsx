import React, { useEffect, useRef, useState } from 'react';
import { Phone, CheckCircle2, Droplets, Wrench, Settings, Waves, Clock, MapPin, Star, ArrowRight, Hammer, Sprout } from 'lucide-react';

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

const galleryImages = [
    { src: "/images/01c14d800_unnamed2-Copy.jpg", alt: "Irrigation valve manifold installation", h: "h-52" },
    { src: "/images/c734704d4_IMG_4815-Copy.jpg", alt: "Professional irrigation valve setup", h: "h-64" },
    { src: "/images/c77326177_IMG_4971-Copy.jpg", alt: "Irrigation valve box repair", h: "h-56" },
    { src: "/images/eb74e1b87_IMG_37521-Copy.jpg", alt: "Underground irrigation system", h: "h-72" },
    { src: "/images/f03bb2890_IMG_3851-Copy.jpg", alt: "Multi-zone irrigation valve installation", h: "h-60" },
    { src: "/images/723adf744_IMG_3731-Copy.jpg", alt: "Irrigation valve box", h: "h-52" },
    { src: "/images/701510e0a_IMG_2662.jpg", alt: "Irrigation controller installation", h: "h-64" },
    { src: "/images/957a12859_IMG_3669.jpg", alt: "Complete irrigation valve manifold", h: "h-56" },
];

export default function CityIrrigationPage({ cityName, citySlug }) {
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
            window.dataLayer.push({ event: 'phone_click', event_category: 'engagement', event_label: `irrigation-${citySlug}-${loc}`, phone_number: '626-343-6028' });
        }
    };

    const pageTitle = `Sprinkler Installation & Repair in ${cityName}, CA | Outright Landscape`;
    const metaDescription = `Professional sprinkler installation, sprinkler repair, irrigation valve service & drip irrigation in ${cityName}, CA. Licensed C-27 contractor. Same-day service. Call (626) 343-6028.`;
    const canonicalUrl = `https://outrightlandscape.com/${citySlug}-sprinkler-repair-installation`;

    const services = [
        { icon: Sprout, title: 'Sprinkler Installation', description: `New sprinkler system design and installation for ${cityName} homes and businesses. Full coverage, water-efficient layouts.`, keywords: 'New Systems, Lawn Coverage, Smart Design' },
        { icon: Wrench, title: 'Sprinkler Repair', description: 'Fast repair for broken heads, leaks, zone issues, and controller problems. Same-day service available.', keywords: 'Leaks, Broken Heads, Zone Problems' },
        { icon: Settings, title: 'Valve Repair & Replacement', description: 'Fix stuck valves, leaks, solenoid issues. Complete valve rebuilds and replacements.', keywords: 'Stuck Valves, Solenoids, Zone Control' },
        { icon: Droplets, title: 'Drip Irrigation', description: 'Drip system installation, repair, and maintenance. Water-efficient solutions for gardens and landscapes.', keywords: 'Emitters, Pressure Regulation, Water Savings' },
        { icon: Waves, title: 'System Upgrades', description: 'Smart controller upgrades, pressure regulation, rain sensors, and water management optimization.', keywords: 'Smart Controllers, Efficiency, Sensors' },
        { icon: Hammer, title: 'Full System Overhauls', description: 'Complete irrigation system replacement and redesign for outdated or failing systems.', keywords: 'Redesign, Replacement, Modernization' },
    ];

    const commonIssues = [
        { title: 'Broken Sprinkler Heads', desc: 'Damaged, clogged, or misaligned heads reducing coverage and wasting water.' },
        { title: 'Leaking Pipes & Lines', desc: 'Underground leaks causing water waste, soggy areas, and high water bills.' },
        { title: 'Stuck or Leaking Valves', desc: 'Valves that won\'t open/close or continuously leak requiring repair or replacement.' },
        { title: 'Controller & Timer Issues', desc: 'Programming problems, wiring faults, and electrical issues with irrigation controllers.' },
        { title: 'Low Water Pressure', desc: 'Pressure regulation issues affecting sprinkler performance and even coverage.' },
        { title: 'Clogged Drip Emitters', desc: 'Mineral deposits or debris blocking drip emitters, starving plants of water.' },
    ];

    const whatWeDoCategories = [
        {
            title: 'Sprinkler Installation & Repair',
            items: [
                'New sprinkler system design and installation',
                'Sprinkler head replacement and adjustment',
                'Underground pipe and fitting repairs',
                'Sprinkler leak detection and repair',
                'Backflow preventer service',
                'System expansion and zone additions',
            ]
        },
        {
            title: 'Valves & Controllers',
            items: [
                'Sprinkler valve replacement (all brands)',
                'Solenoid replacement and testing',
                'Controller repair, replacement & programming',
                'Smart controller upgrades (WiFi)',
                'Rain and moisture sensor installation',
                'Wiring and electrical troubleshooting',
            ]
        },
        {
            title: 'Drip Irrigation',
            items: [
                'Drip system installation for gardens & planters',
                'Emitter cleaning and replacement',
                'Drip line repair and replacement',
                'Filter cleaning and replacement',
                'Pressure regulator service',
                'Convert sprinkler zones to drip',
            ]
        },
        {
            title: 'System Optimization',
            items: [
                'Water efficiency audits',
                'Zone timing and pressure adjustment',
                'Coverage gap analysis and correction',
                'Seasonal programming updates',
                'Master valve installation',
                'Flow sensor integration',
            ]
        },
    ];

    const process = [
        { title: 'Free Consultation', desc: `We visit your ${cityName} property, assess your landscape, and discuss your needs.` },
        { title: 'System Design / Diagnosis', desc: 'For new installs we design the layout; for repairs we identify every issue.' },
        { title: 'Transparent Estimate', desc: 'Upfront pricing with no hidden fees. You approve before we start.' },
        { title: 'Expert Installation or Repair', desc: 'Licensed professionals complete the work using commercial-grade parts.' },
        { title: 'Testing & Walk-Through', desc: 'Full system test, zone-by-zone verification, and controller programming.' },
    ];

    const faqs = [
        { q: `How much does sprinkler installation cost in ${cityName}?`, a: `Sprinkler installation in ${cityName} typically starts at $1,000 and can range up to $6,000+ for a residential property, depending on yard size, number of zones, and complexity. We provide free on-site estimates with detailed breakdowns.` },
        { q: `How much does sprinkler repair cost in ${cityName}?`, a: `Simple repairs like head replacement start at $75–$150. Valve replacement runs $150–$400 per valve. Controller replacement ranges $200–$800. We provide free estimates for all sprinkler services in ${cityName}.` },
        { q: 'Do you offer same-day sprinkler repair?', a: `Yes! We prioritize emergency sprinkler leak repair in ${cityName}. Call before noon and we'll typically schedule same-day service for urgent repairs.` },
        { q: 'What brands do you install and repair?', a: 'We work with all major brands including Rain Bird, Hunter, Toro, Irritrol, and Orbit. We recommend the best fit for your property and budget.' },
        { q: 'Should I repair or replace my old sprinkler system?', a: 'If your system is 15+ years old with multiple failures, replacement is often more cost-effective. Many older systems use galvanized steel pipes that corrode over time — upgrading to modern PVC piping is more durable, efficient, and cost-effective long-term. We\'ll give you an honest recommendation based on your system\'s condition, pipe material, and repair costs vs. the benefits of updated materials.' },
        { q: 'Can you convert my sprinklers to drip irrigation?', a: `Absolutely. Drip systems use 30–50% less water than traditional sprinklers and are ideal for garden beds, shrubs, and trees. We handle full conversions in ${cityName}.` },
        { q: 'Do you service commercial properties?', a: 'Yes. We provide commercial sprinkler installation, repair, and maintenance for businesses, HOAs, and property managers throughout the San Gabriel Valley.' },
    ];

    const breadcrumbItems = [
        { name: "Home", url: "https://outrightlandscape.com" },
        { name: "Irrigation", url: "https://outrightlandscape.com/Irrigation" },
        { name: `${cityName} Sprinkler Services`, url: canonicalUrl },
    ];

    return (
        <div className="cityIrrigationWrapper bg-white">
            <SEO title={pageTitle} description={metaDescription} canonicalUrl={canonicalUrl}
                ogImage="https://outrightlandscape.com/images/01c14d800_unnamed2-Copy.jpg"
                geoMeta={getCityGeo(cityName)}
                keywords={`sprinkler installation ${cityName}, sprinkler repair ${cityName}, irrigation repair ${cityName}, drip irrigation ${cityName}, sprinkler valve repair ${cityName}`} />
            <BreadcrumbSchema items={breadcrumbItems} />
            {faqs.length > 0 && <FAQSchema faqs={faqs} cityName={cityName} />}

            {/* ── HERO ── */}
            <section className="cityIrrigationHero relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0 sm:left-[35%] lg:left-[40%]">
                    <img src="/images/01c14d800_unnamed2-Copy.jpg" alt={`Sprinkler installation and repair in ${cityName}`} className="w-full h-full object-cover" fetchpriority="high" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/75 sm:to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
                </div>
                <div className="cityIrrigationHeroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-12 sm:pt-32 sm:pb-16 sm:py-0">
                    <div className="cityIrrigationHeroInner flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-xl space-y-4 sm:space-y-6">
                        <div className="cityIrrigationHeroBadge hidden sm:inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                            <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">Licensed C-27 Contractor</span>
                        </div>
                        <h1 className="cityIrrigationHeroHeadline text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                            <span className="font-light">{cityName}</span><br />
                            <span className="font-bold text-[#c45d2c]">Sprinkler Installation</span><br />
                            <span className="font-light">& Repair</span>
                        </h1>
                        <p className="cityIrrigationHeroSubtitle text-[#a09a90] text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                            {GEO_STATS.yearsInBusiness} years in business. Over {GEO_STATS.projectsCompleted}+ sprinkler systems installed and repaired in {cityName} and the San Gabriel Valley. Same-day repair available.
                        </p>
                        <div className="cityIrrigationHeroQuote hidden sm:block py-1">
                            <AttributedQuote {...GEO_QUOTES.irrigation} compact />
                        </div>
                        <div className="cityIrrigationHeroTrust grid grid-cols-2 gap-x-4 gap-y-1.5 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 text-xs sm:text-sm text-[#8a8478]">
                            {['CSLB #1073845', `${GEO_STATS.yearsInBusiness} Years`, '4.8★ Google'].map(t => (
                                <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4a8c3f] flex-shrink-0" />{t}</span>
                            ))}
                        </div>
                        <div className="cityIrrigationHeroCtas flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                            <a href="tel:626-343-6028" onClick={() => trackPhoneClick('hero')} className="w-full sm:w-auto">
                                <Button className="cityIrrigationHeroCallBtn w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:scale-[1.02] sm:min-w-[240px]">
                                    <Phone className="mr-2 w-4 h-4 sm:mr-2.5 sm:w-5 sm:h-5" />(626) 343-6028
                                </Button>
                            </a>
                            <a href="#contact" className="w-full sm:w-auto">
                                <Button variant="outline" className="cityIrrigationHeroQuoteBtn w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl transition-all sm:min-w-[240px]">
                                    Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    {/* Reviews panel - right side on desktop, below on mobile */}
                    <div className="cityIrrigationHeroReviewsWrapper lg:block">
                        <HeroReviews reviews={reviewsData?.reviews} totalReviewCount={reviewsData?.totalReviewCount} averageRating={reviewsData?.averageRating} />
                    </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
            </section>

            {/* ── STATS ── */}
            <section className="cityIrrigationStats py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                        {[{ end: GEO_STATS.projectsCompleted, suffix: '+', l: 'Systems Installed & Repaired' }, { raw: '24hr', l: 'Response Time' }, { end: GEO_STATS.yearsInBusiness, suffix: '+', l: 'Years Experience' }, { end: 100, suffix: '%', l: 'Licensed & Insured' }].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cityIrrigationStatItem text-center py-8 sm:py-10">
                                <div className="text-3xl sm:text-4xl font-bold text-[#c45d2c] tracking-tight">
                                    {s.raw ? s.raw : <CountUp end={s.end} suffix={s.suffix} />}
                                </div>
                                <div className="text-[#8a8478] text-xs sm:text-sm mt-1 font-medium">{s.l}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICE SUMMARY (GEO) ── */}
            <ServiceSummaryBox
                problem={`Broken sprinkler heads, leaking valves, controller issues, and water waste affecting lawn health in ${cityName}.`}
                solution={`Expert sprinkler repair, valve service, drip irrigation, and same-day emergency service in ${cityName}. Licensed C-27 contractor.`}
                serviceArea={`${cityName}, CA and the San Gabriel Valley.`}
            />

            {/* ── SERVICES ── */}
            <section className="cityIrrigationServices py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="cityIrrigationServicesHeader mb-14">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Our Services</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mt-2">Sprinkler & Irrigation Services in {cityName}</h2>
                        <p className="mt-4 text-[#6b6560] text-base sm:text-lg max-w-3xl">From new sprinkler system installation to emergency repairs, valve service, and drip irrigation — we do it all.</p>
                    </motion.div>
                    <div className="cityIrrigationServicesGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((svc, idx) => {
                            const Icon = svc.icon;
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                                    className="cityIrrigationServiceCard group bg-[#f5f0e8] p-6 sm:p-7 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

            {/* ── COMMON ISSUES ── */}
            <section className="cityIrrigationIssues py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
                        <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Common Problems</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Sprinkler Issues We Fix in {cityName}</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {commonIssues.map((issue, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                                className="cityIrrigationIssueCard bg-white p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#4a8c3f] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-[#1a1a1a] mb-1.5 text-sm">{issue.title}</h3>
                                        <p className="text-[#6b6560] text-sm leading-relaxed">{issue.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY ── */}
            <section className="cityIrrigationGallery py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                        <div>
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Our Work</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Sprinkler Projects in {cityName}</h2>
                        </div>
                        <p className="text-[#6b6560] text-sm max-w-sm">Installations and repairs throughout {cityName} & the San Gabriel Valley</p>
                    </motion.div>
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                        {galleryImages.map((img, idx) => (
                            <div key={idx} className={`cityIrrigationGalleryItem group relative overflow-hidden rounded-xl break-inside-avoid ${img.h}`}>
                                <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHAT WE DO ── */}
            <section className="cityIrrigationScope py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Full Scope</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Everything We Install & Repair</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {whatWeDoCategories.map((cat, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                                className="cityIrrigationScopeCard bg-white p-6 sm:p-7 rounded-xl border border-[#e0d8cc]">
                                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                                    <Wrench className="w-5 h-5 text-[#c45d2c]" />{cat.title}
                                </h3>
                                <ul className="space-y-2.5">
                                    {cat.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[#4a4540] text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" /><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="cityIrrigationProcess py-20 sm:py-28 bg-[#1a1a1a]">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">How It Works</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">Our Process</h2>
                    </motion.div>
                    <dl className="relative">
                        <div className="hidden sm:block absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#2d5a27] via-[#c45d2c] to-[#b8945a]" aria-hidden />
                        <div className="space-y-12">
                            {process.map((step, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12 }}
                                    className="cityIrrigationProcessStep flex gap-6 sm:gap-8 items-start">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#2a2a2a] border-2 border-[#c45d2c]/50 flex items-center justify-center z-10 relative">
                                            <span className="text-[#c45d2c] font-bold text-sm" aria-hidden>{String(idx + 1).padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 pb-2">
                                        <dt className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</dt>
                                        <dd className="text-[#8a8478] text-sm leading-relaxed max-w-lg m-0">{step.desc}</dd>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </dl>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section className="cityIrrigationPricing py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Pricing</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Transparent Pricing</h2>
                    </motion.div>
                    <div className="bg-[#1a1a1a] rounded-2xl p-8 text-center">
                        <Clock className="w-10 h-10 text-[#c45d2c] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">Free Estimates — No Hidden Fees</h3>
                        <p className="text-[#8a8478] mb-8 text-sm">Most sprinkler repairs are completed same-day. New installations typically take 1–3 days depending on property size.</p>
                        <dl className="grid md:grid-cols-3 gap-4">
                            {[{ term: 'No Trip Charge', def: 'For service calls' }, { term: 'Warranty Included', def: 'On all work' }, { term: 'Fast Response', def: 'Same or next day' }].map((p, i) => (
                                <div key={i} className="cityIrrigationPricingCard bg-[#242424] border border-[#333] p-4 rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-[#4a8c3f] mb-2" aria-hidden />
                                    <dt className="font-bold text-white text-sm mb-1">{p.term}</dt>
                                    <dd className="text-xs text-[#8a8478] m-0">{p.def}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* ── TRUST STATS ── */}
            <section className="cityIrrigationTrust py-0 bg-[#1a1a1a] border-y border-[#333]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#333]">
                        <div className="text-center py-10 flex flex-col items-center gap-1">
                            <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}</div>
                            <div className="text-white font-bold text-sm">5.0 Rating</div>
                        </div>
                        {[{ end: 250, suffix: '+', l: 'Sprinkler Jobs' }, { raw: '24hr', l: 'Avg Response' }, { end: 100, suffix: '%', l: 'Licensed & Insured' }].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cityIrrigationTrustStat text-center py-10">
                                <div className="text-3xl font-bold text-[#c45d2c]">
                                    {s.raw ? s.raw : <CountUp end={s.end} suffix={s.suffix} />}
                                </div>
                                <div className="text-[#8a8478] text-xs mt-1">{s.l}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="cityIrrigationFaq py-20 sm:py-28 bg-white">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    <div className="mb-12">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">FAQ</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Common Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="cityIrrigationFaqItem bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-2">{faq.q}</h3>
                                <p className="text-[#6b6560] text-sm leading-relaxed">{faq.a}</p>
                            </div>
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