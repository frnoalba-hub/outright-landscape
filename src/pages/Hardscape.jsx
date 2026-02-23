import React from 'react';
import { Phone, CheckCircle2, MapPin, ArrowRight, Hammer, Layers, Fence, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SEO from '../components/SEO';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ContactForm from '@/components/ContactForm';

export default function Hardscape() {
    const handlePhoneClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'phone_click', event_category: 'engagement', event_label: 'hardscape-hub', phone_number: '626-343-6028' });
        }
    };

    const scrollToForm = () => {
        document.getElementById('hardscape-contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 100),
        initialData: [],
    });

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

    const paverCallouts = ['Patios', 'Driveways', 'Walkways', 'Pool Decks', 'Outdoor Living Spaces'];

    const concreteSteps = [
        'Demolition & removal of existing slab',
        'Sub-base prep & compaction',
        'Form setting, grading & slope control',
        'Pouring & finishing to spec',
        'Broom, smooth, stamped, or colored options',
        'Curing compound & sealing for longevity',
    ];

    const concreteCallouts = ['Driveways', 'Patios', 'Sidewalks', 'Slabs'];

    const retainingSteps = [
        'Site excavation & grading',
        'Perforated drainage pipe installation',
        'Filter fabric to prevent soil migration',
        'Drainage rock layer behind wall',
        'Block installation with level courses',
        'Geogrid reinforcement layers (as needed)',
        'Proper backfill & compaction',
    ];

    const retainingTypes = ['Structural retaining walls', 'Garden walls', 'Raised planter walls'];

    const additionalServices = [
        'Concrete removal & disposal',
        'Grading & base preparation',
        'Outdoor steps & stairs',
        'Fire pits (paver or block)',
        'Raised planters',
        'Pergolas',
        'Decorative rock & gravel',
        'Drainage integration',
        'Paver sealing & maintenance',
    ];

    const whyUs = [
        { title: 'Licensed C-27 Contractor', desc: 'CSLB #1073845 — Fully licensed, bonded, and insured for every project.' },
        { title: 'Proper Base Prep — No Shortcuts', desc: 'Correct excavation depth, compaction, and drainage built in from the start.' },
        { title: 'Drainage-First Construction', desc: 'Every install designed to manage water runoff and prevent long-term damage.' },
        { title: 'Clean Job Site Practices', desc: 'We respect your property and leave every site clean upon completion.' },
        { title: 'Warranty-Backed Workmanship', desc: 'We stand behind our work with a workmanship warranty on all installs.' },
        { title: 'Durable Materials & Quality', desc: 'We use commercial-grade materials selected for longevity and performance.' },
    ];

    return (
        <>
            <SEO
                title="Hardscape & Paver Installation | Outright Landscape"
                description="Professional hardscaping, paver installation, concrete, and retaining wall construction by a licensed C-27 contractor. Free estimates available."
                canonicalUrl="https://outrightlandscape.com/hardscape"
                keywords="hardscape, paver installation, concrete installation, retaining walls, outdoor living, San Gabriel Valley hardscape contractor, CSLB 1073845"
                ogType="website"
            />

            <div className="hardscapePageWrapper min-h-screen bg-white">

                {/* ── HERO ── */}
                <section className="hardscapeHero relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]">
                    <div className="absolute inset-0 sm:left-[40%]">
                        <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/15f0a1b84_generated_image.png"
                            alt="Professional paver and hardscape installation"
                            className="w-full h-full object-cover"
                            fetchpriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/75 sm:to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
                    </div>

                    <div className="hardscapeHeroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:py-0">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-xl space-y-6">
                            <div className="hardscapeHeroBadge inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                                <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">San Gabriel Valley</span>
                            </div>
                            <h1 className="hardscapeHeroHeadline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                                <span className="font-light">Hardscaping &</span><br />
                                <span className="font-bold text-[#c45d2c]">Paver Installation</span>
                            </h1>
                            <p className="hardscapeHeroSubtitle text-[#a09a90] text-base sm:text-lg leading-relaxed max-w-md">
                                Custom patios, walkways, concrete, and retaining walls built for durability and long-term performance.
                            </p>
                            <div className="hardscapeHeroCtas flex flex-col sm:flex-row gap-3 pt-2">
                                <a href="tel:626-343-6028" onClick={handlePhoneClick} className="w-full sm:w-auto">
                                    <Button className="hardscapeHeroCallBtn w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-base px-7 py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:scale-[1.02] min-w-[240px]">
                                        <Phone className="mr-2.5 w-5 h-5" />(626) 343-6028
                                    </Button>
                                </a>
                                <Button variant="outline" onClick={scrollToForm} className="hardscapeHeroQuoteBtn w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-base px-7 py-6 rounded-xl transition-all min-w-[240px]">
                                    Get a Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
                </section>

                {/* ── STATS ── */}
                <section className="hardscapeStats py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                            {[{ value: '250+', label: 'Projects Completed' }, { value: '10+', label: 'Years Experience' }, { value: '4.8★', label: 'Google Rating' }, { value: '100%', label: 'Licensed & Insured' }].map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="hardscapeStatItem text-center py-8 sm:py-10">
                                    <div className="text-3xl sm:text-4xl font-bold text-[#c45d2c] tracking-tight">{stat.value}</div>
                                    <div className="text-[#8a8478] text-xs sm:text-sm mt-1 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SECTION A: PAVERS ── */}
                <section className="hardscapePavers py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Paver Installation</span>
                                <h2 className="hardscapePaversTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2 mb-5">Professional Paver Installation</h2>
                                <p className="text-[#6b6560] text-base mb-4 leading-relaxed">Our paver installations are built to last — proper excavation, layered base prep, and tight craftsmanship on every project. We specialize in transforming outdoor spaces with premium interlocking pavers that resist cracking and shifting over time.</p>
                                <p className="text-[#6b6560] text-base mb-6 leading-relaxed">Whether you're looking to upgrade your driveway for maximum curb appeal, create a stunning backyard patio for entertaining, or design elegant walkways that connect your outdoor living areas, our team ensures a flawless finish. We offer a wide range of colors, textures, and patterns to perfectly match your home's architectural style.</p>
                                <ul className="hardscapePaversList space-y-2.5 mb-8">
                                    {paverSteps.map((step, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#4a4540]">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" />
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="hardscapePaversCallouts flex flex-wrap gap-2">
                                    {paverCallouts.map((c, i) => (
                                        <span key={i} className="text-xs bg-[#c45d2c]/10 text-[#c45d2c] px-3 py-1.5 rounded-md font-semibold">{c}</span>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="hardscapePaversImg rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/3e9548aed_generated_image.png"
                                    alt="Finished paver patio and hardscaping"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── SECTION B: CONCRETE ── */}
                <section className="hardscapeConcrete py-20 sm:py-28 bg-[#f5f0e8]">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="hardscapeConcreteImg rounded-2xl overflow-hidden aspect-[4/3] shadow-xl order-last lg:order-first">
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/9deab6cfe_generated_image.png"
                                    alt="Finished concrete patio and walkway"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Concrete</span>
                                <h2 className="hardscapeConcreteTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2 mb-5">Concrete Installation & Finishes</h2>
                                <p className="text-[#6b6560] text-base mb-6 leading-relaxed">From demolition to final finish — broom, smooth, stamped, or colored — we deliver clean, durable concrete work.</p>
                                <ul className="hardscapeConcreteList space-y-2.5 mb-8">
                                    {concreteSteps.map((step, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#4a4540]">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" />
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="hardscapeConcreteCallouts flex flex-wrap gap-2">
                                    {concreteCallouts.map((c, i) => (
                                        <span key={i} className="text-xs bg-[#2d5a27]/10 text-[#2d5a27] px-3 py-1.5 rounded-md font-semibold">{c}</span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── SECTION C: RETAINING WALLS ── */}
                <section className="hardscapeRetaining py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Retaining Walls</span>
                                <h2 className="hardscapeRetainingTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2 mb-5">Retaining Wall Construction</h2>
                                <p className="text-[#6b6560] text-base mb-6 leading-relaxed">Engineered for slope control and long-term stability — drainage, reinforcement, and proper backfill included on every build.</p>
                                <ul className="hardscapeRetainingList space-y-2.5 mb-8">
                                    {retainingSteps.map((step, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#4a4540]">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" />
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="hardscapeRetainingTypes flex flex-wrap gap-2">
                                    {retainingTypes.map((t, i) => (
                                        <span key={i} className="text-xs bg-[#b8945a]/10 text-[#b8945a] px-3 py-1.5 rounded-md font-semibold">{t}</span>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="hardscapeRetainingImg rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/a8d6d8fe8_generated_image.png"
                                    alt="Outdoor retaining wall construction"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── SECTION D: ADDITIONAL SERVICES ── */}
                <section className="hardscapeAdditional py-20 sm:py-28 bg-[#f5f0e8]">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hardscapeAdditionalHeader mb-12">
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">More Services</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Additional Hardscape Features</h2>
                            <p className="mt-3 text-[#6b6560] text-base max-w-2xl">We handle the full scope of outdoor hardscape — from demolition to decorative finishes.</p>
                        </motion.div>
                        <div className="hardscapeAdditionalGrid grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {additionalServices.map((svc, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                                    className="hardscapeAdditionalCard flex items-center gap-3 bg-white p-4 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                    <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] flex-shrink-0" />
                                    <span className="text-sm text-[#4a4540] font-medium">{svc}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Internal links */}
                        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hardscapeInternalLinks mt-12 p-6 bg-white rounded-xl border border-[#e0d8cc]">
                            <p className="text-sm text-[#6b6560] mb-4 font-medium">Also offered by Outright Landscape:</p>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { label: 'Irrigation & Sprinkler', page: 'Irrigation' },
                                    { label: 'Turf & Sod Installation', page: 'Home' },
                                    { label: 'Landscape Design', page: 'Home' },
                                ].map((link, i) => (
                                    <a key={i} href={createPageUrl(link.page) + (link.page === 'Home' ? '#services' : '')}
                                        className="hardscapeInternalLink inline-flex items-center gap-1.5 text-sm text-[#c45d2c] hover:text-[#a94e25] font-semibold transition-colors underline underline-offset-4">
                                        {link.label} <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── SECTION E: WHY CHOOSE US ── */}
                <section className="hardscapeWhy py-20 sm:py-28 bg-[#1a1a1a]">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
                            <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Why Choose Us</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">Why Outright Landscape?</h2>
                        </motion.div>
                        <div className="hardscapeWhyGrid grid md:grid-cols-3 gap-5">
                            {whyUs.map((item, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                                    className="hardscapeWhyCard bg-[#242424] border border-[#333] rounded-xl p-6 hover:border-[#c45d2c]/40 transition-colors group">
                                    <div className="w-12 h-12 bg-[#c45d2c]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#c45d2c]/20 transition-colors">
                                        <CheckCircle2 className="w-6 h-6 text-[#c45d2c]" />
                                    </div>
                                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                                    <p className="text-[#8a8478] text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SERVICE AREAS ── */}
                <section className="hardscapeCities py-20 sm:py-28 bg-[#f5f0e8]">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hardscapeCitiesHeader mb-14">
                            <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Service Areas</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">We Service the Entire San Gabriel Valley</h2>
                            <p className="mt-3 text-[#6b6560] text-base max-w-3xl">Select your city to view specialized landscaping services available in your area.</p>
                        </motion.div>
                        <div className="hardscapeCitiesGrid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {locations.map((city, cityIdx) => {
                                const slug = city.slug || city.name.toLowerCase().replace(/ /g, '-');
                                const baseSlug = slug.replace(/-landscaping$/, '');
                                return (
                                    <motion.a key={cityIdx} href={createPageUrl(`${baseSlug}-landscaping`)}
                                        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: cityIdx * 0.03 }}
                                        className="hardscapeCityCard flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border border-[#e0d8cc] bg-white hover:border-[#c45d2c]/40 transition-all hover:shadow-lg hover:-translate-y-1 group text-center">
                                        <MapPin className="w-6 h-6 text-[#2d5a27] mb-2 group-hover:text-[#c45d2c] transition-colors" />
                                        <h3 className="text-sm sm:text-base font-bold text-[#1a1a1a] group-hover:text-[#c45d2c] transition-colors">{city.name}</h3>
                                        <p className="text-xs text-[#8a8478] mt-1">Hardscape Services</p>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── CONTACT ── */}
                <section id="hardscape-contact">
                    <ContactForm cityName="San Gabriel Valley" />
                </section>
            </div>
        </>
    );
}