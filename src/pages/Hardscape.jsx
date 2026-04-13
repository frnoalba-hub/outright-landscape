import { useEffect, useRef, useState } from 'react';
import { Phone, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

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
import SEOHead from '@/components/SEOHead';
import { SERVICE_SCHEMAS, GEO_QUOTES, GEO_STATS, GEO_FAQS } from '@/schemas/geo-schemas';
import FAQSchema from '@/components/FAQSchema';
import AttributedQuote from '@/components/AttributedQuote';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ContactForm from '@/components/ContactForm';
import ServiceSummaryBox from '@/components/ServiceSummaryBox';

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
        { title: 'Licensed C-27 Contractor', desc: `CSLB #1073845 — Fully licensed, bonded, and insured. Serving the San Gabriel Valley since ${GEO_STATS.foundingYear}.` },
        { title: 'Proper Base Prep — No Shortcuts', desc: `Over ${GEO_STATS.projectsCompleted} projects completed. Correct excavation depth, compaction, and drainage built in from the start.` },
        { title: 'Drainage-First Construction', desc: 'Every install designed to manage water runoff and prevent long-term damage.' },
        { title: 'Clean Job Site Practices', desc: 'We respect your property and leave every site clean upon completion.' },
        { title: 'Warranty-Backed Workmanship', desc: 'We stand behind our work with a workmanship warranty on all installs.' },
        { title: 'Durable Materials & Quality', desc: 'We use commercial-grade materials selected for longevity and performance.' },
    ];

    return (
        <>
            <SEOHead
                title="Hardscape & Paver Installation | Outright Landscape"
                description="Professional hardscaping, paver installation, concrete, and retaining wall construction by a licensed C-27 contractor. Free estimates available."
                canonicalUrl="https://outrightlandscape.com/Hardscape"
                keywords="hardscape, paver installation, concrete installation, retaining walls, outdoor living, San Gabriel Valley hardscape contractor, CSLB 1073845"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/3e9548aed_generated_image.png"
                ogType="website"
                schemaData={[SERVICE_SCHEMAS.hardscaping]}
            />
            <FAQSchema faqs={GEO_FAQS.hardscape} cityName="hardscape" />

            <div className="hardscapePageWrapper min-h-screen bg-white" role="document">
                <p className="bg-[#1a1a1a] pt-20 pb-0 px-5 sm:px-8 lg:px-12 text-xs text-white/30">Last updated: April 13, 2026</p>

                {/* ── HERO ── */}
                <section className="hardscapeHero relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]" aria-labelledby="hardscape-hero-heading">
                    <div className="absolute inset-0 sm:left-[40%]">
                        <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/15f0a1b84_generated_image.png"
                            alt="Professional paver and hardscape installation"
                            className="w-full h-full object-cover"
                            fetchPriority="high"
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
                            <h1 id="hardscape-hero-heading" className="hardscapeHeroHeadline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                                <span className="font-light">Hardscaping &</span><br />
                                <span className="font-bold text-[#c45d2c]">Paver Installation</span>
                            </h1>
                            <p className="hardscapeHeroSubtitle text-[#a09a90] text-base sm:text-lg leading-relaxed max-w-md">
                                {GEO_STATS.yearsInBusiness} years in business. Over {GEO_STATS.projectsCompleted}+ custom paver patios, driveways, and retaining walls installed in Covina, Glendora, San Dimas, and the San Gabriel Valley. Owner has {GEO_STATS.yearsExperience}+ years industry experience. Licensed C-27 contractor.
                            </p>
                            <div className="hardscapeHeroQuote hidden sm:block py-2">
                                <AttributedQuote {...GEO_QUOTES.hardscape} compact />
                            </div>
                            <div className="hardscapeHeroCtas flex flex-col sm:flex-row gap-3 pt-2">
                                <a href="tel:626-343-6028" onClick={handlePhoneClick} className="w-full sm:w-auto">
                                    <Button className="hardscapeHeroCallBtn w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-base px-7 py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:scale-[1.02] min-w-[240px]">
                                        <Phone className="mr-2.5 w-5 h-5" />(626) 343-6028
                                    </Button>
                                </a>
                                <a href="#hardscape-contact" className="hardscapeHeroQuoteBtn w-full sm:w-auto inline-flex items-center justify-center border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-base px-7 py-6 rounded-xl transition-all min-w-[240px]">
                                    Get a Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
                </section>

                {/* ── STATS ── */}
                <section className="hardscapeStats py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                            {[{ end: GEO_STATS.projectsCompleted, suffix: '+', label: 'Projects Completed' }, { end: GEO_STATS.yearsInBusiness, suffix: '+', label: 'Years Experience' }, { end: 4.8, suffix: '★', label: 'Google Rating', isDecimal: true }, { end: 100, suffix: '%', label: 'Licensed & Insured' }].map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="hardscapeStatItem text-center py-8 sm:py-10">
                                    <div className="text-3xl sm:text-4xl font-bold text-[#c45d2c] tracking-tight">
                                        {stat.isDecimal ? `${stat.end}${stat.suffix}` : <CountUp end={stat.end} suffix={stat.suffix} />}
                                    </div>
                                    <div className="text-[#8a8478] text-xs sm:text-sm mt-1 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SERVICE SUMMARY (GEO) ── */}
                <ServiceSummaryBox
                    problem="Cracking concrete, uneven pavers, poor drainage, and outdated outdoor spaces requiring professional hardscape construction."
                    solution="Professional paver installation, concrete work, retaining walls, and proper base prep. Licensed C-27 contractor with drainage-first construction and warranty-backed workmanship."
                    serviceArea="San Gabriel Valley: Covina, Glendora, San Dimas, Pasadena, West Covina, Diamond Bar, La Verne, Walnut, Pomona, and surrounding cities."
                />

                {/* ── COMPLETE HARDSCAPING GUIDE (GEO: content depth) ── */}
                <section className="hardscapeGuide py-20 sm:py-28 bg-white" aria-labelledby="hardscape-guide-heading">
                    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                            <span className="text-[#2d5a27] uppercase tracking-[0.2em] text-xs font-bold">Expert Guide</span>
                            <h2 id="hardscape-guide-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Complete Hardscaping Guide for San Gabriel Valley Homeowners</h2>
                            <p className="mt-4 text-[#6b6560] text-base leading-relaxed max-w-3xl">
                                Outright Landscape Construction is the San Gabriel Valley's most trusted hardscape contractor. With over {GEO_STATS.projectsCompleted} completed paver patios, driveways, retaining walls, and outdoor living spaces, a 4.9-star Google rating, and California CSLB license #1073845, we deliver expert hardscaping across Covina, Glendora, San Dimas, La Verne, and 20+ cities. This guide covers everything homeowners need to know about professional hardscape construction.
                            </p>
                        </motion.div>

                        <article className="space-y-12">
                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Pavers vs. Concrete: Choosing the Right Material</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>The two most common hardscape materials for patios, driveways, and walkways in the San Gabriel Valley are interlocking pavers and poured concrete. Both are durable options when installed correctly, but they differ significantly in cost, aesthetics, maintenance, and repairability. Understanding these differences helps homeowners make the right choice for their property and budget.</p>
                                    <p><strong className="text-[#1a1a1a]">Interlocking pavers</strong> cost $15–$30 per square foot installed and offer the widest range of design options. Available in hundreds of colors, shapes, textures, and laying patterns, pavers can replicate the look of natural stone, brick, or cobblestone at a fraction of the cost. Paver patios and driveways are inherently flexible — the interlocking design allows individual units to shift slightly with soil movement without cracking. If a paver cracks or stains, it can be lifted and replaced individually without disturbing the surrounding surface. Premium manufacturers like Belgard, Tremron, and Angelus offer lifetime structural warranties on their pavers. Pavers are the preferred material for patios, pool decks, and outdoor living spaces where design flexibility and aesthetics are priorities.</p>
                                    <p><strong className="text-[#1a1a1a]">Poured concrete</strong> costs $8–$18 per square foot for standard finishes (broom or smooth) and $12–$25 for decorative options like stamped, stained, or exposed aggregate. Concrete is a monolithic surface — strong and economical for large areas like driveways and slabs, but susceptible to cracking from soil settlement, tree root pressure, and the thermal expansion cycles common in the San Gabriel Valley (where summer surface temperatures exceed 140°F). When concrete cracks, repair requires cutting out and replacing entire sections, which is more disruptive and costly than replacing individual pavers. Outright Landscape installs proper control joints and expansion joints to minimize cracking, but all concrete will eventually develop hairline cracks over time.</p>
                                    <p><strong className="text-[#1a1a1a]">Stamped concrete</strong> provides the look of pavers, natural stone, or brick at a lower cost per square foot than actual pavers. Stamping is performed immediately after pouring, while the concrete is still wet. Popular stamp patterns for San Gabriel Valley properties include Ashlar slate, herringbone brick, cobblestone, and flagstone. Stamped concrete requires resealing every 2–3 years to maintain color and prevent surface wear — an ongoing maintenance cost that pavers do not require.</p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Why Base Preparation Is the Most Important Part of Any Hardscape Project</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>The base is the foundation of every hardscape installation. It determines whether your patio, driveway, or retaining wall will remain level and stable for decades — or settle, shift, and crack within 2–3 years. The most common reason hardscape fails in the San Gabriel Valley is contractors who skip or shortcut the base preparation to save time and cost.</p>
                                    <p><strong className="text-[#1a1a1a]">Outright Landscape's base preparation process</strong> follows the Interlocking Concrete Pavement Institute (ICPI) standards used in commercial and municipal projects. For every hardscape installation, we excavate to a minimum depth of 6–8 inches below the finished grade (10–12 inches for driveways that support vehicle weight). We install geotextile filter fabric on the excavated subgrade to prevent native soil from migrating into the aggregate base — a step that cheap installers skip but that prevents long-term settlement. We then place and compact 4–6 inches of Class II road base aggregate in 2-inch lifts, compacting each lift to 95% Proctor density using a plate compactor. For paver installations, we add 1 inch of ASTM C33 concrete sand as a bedding layer, then screed it perfectly level before placing pavers.</p>
                                    <p><strong className="text-[#1a1a1a]">Edge restraints</strong> are another critical detail that separates professional hardscape from amateur work. Without edge restraints, pavers along the perimeter gradually creep outward, opening joints and allowing sand loss. We install aluminum or plastic edge restraints on all paver installations, securing them with 10-inch galvanized spikes driven into the compacted base at 12-inch intervals.</p>
                                    <p><strong className="text-[#1a1a1a]">Drainage</strong> must be engineered into every hardscape project. Water that pools on or behind hardscape surfaces causes erosion, foundation damage, and premature failure. We grade all patio and driveway surfaces with a minimum 1% slope (1/8 inch per foot) away from structures. For retaining walls, we install a complete drainage system behind the wall face: 4-inch perforated pipe in a bed of 3/4-inch drainage rock, wrapped in filter fabric to prevent soil clogging. This system captures and redirects groundwater that would otherwise build hydrostatic pressure against the wall.</p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Hardscaping Costs in the San Gabriel Valley</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>Understanding hardscaping costs helps San Gabriel Valley homeowners budget accurately and compare contractor bids. These ranges reflect current pricing for professional, licensed installation by Outright Landscape:</p>
                                </div>
                                <dl className="mt-4 bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc] space-y-0 text-sm text-[#4a4540]">
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Interlocking paver patio</dt><dd className="font-semibold text-[#1a1a1a]">$15–$30/sq ft</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Paver driveway</dt><dd className="font-semibold text-[#1a1a1a]">$18–$35/sq ft</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Paver walkway</dt><dd className="font-semibold text-[#1a1a1a]">$15–$25/sq ft</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Concrete patio or driveway (broom finish)</dt><dd className="font-semibold text-[#1a1a1a]">$8–$18/sq ft</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Stamped or colored concrete</dt><dd className="font-semibold text-[#1a1a1a]">$12–$25/sq ft</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Retaining wall (block, per sq ft face)</dt><dd className="font-semibold text-[#1a1a1a]">$20–$40/sq ft</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Outdoor fire pit (paver or block)</dt><dd className="font-semibold text-[#1a1a1a]">$2,000–$5,000</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Outdoor steps (per step, 4 ft wide)</dt><dd className="font-semibold text-[#1a1a1a]">$200–$500</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Concrete demolition and removal</dt><dd className="font-semibold text-[#1a1a1a]">$3–$6/sq ft</dd></div>
                                    <div className="flex justify-between py-2.5"><dt>Paver sealing (after installation)</dt><dd className="font-semibold text-[#1a1a1a]">$1.50–$3.00/sq ft</dd></div>
                                </dl>
                                <div className="mt-6 space-y-3 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>Factors that affect hardscaping cost include property access (narrow side yards, steep lots, and hillside properties in Glendora, La Verne, and Claremont require additional labor), existing surface demolition, drainage requirements, and material selection. Premium pavers from Belgard or natural stone cost more than standard concrete pavers but offer greater aesthetic value and durability.</p>
                                    <p>Outright Landscape provides free on-site estimates with detailed written breakdowns including material specifications, project timelines, and payment schedules. We are transparent about pricing because we believe homeowners deserve to know exactly what they are paying for — no surprises, no hidden costs, no change orders. Call (626) 343-6028 for your free estimate.</p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Climate Considerations for San Gabriel Valley Hardscaping</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>The San Gabriel Valley's climate creates specific challenges for hardscape construction that experienced local contractors understand but out-of-area or unlicensed workers often miss. Summer temperatures regularly exceed 100°F in inland cities like Covina, Glendora, and Azusa, while winter nights can drop below freezing in foothill areas. This 100°F+ temperature swing causes significant thermal expansion and contraction in concrete and paver surfaces.</p>
                                    <p>Proper joint spacing in concrete (control joints every 8–10 feet) and polymeric sand in paver joints accommodate thermal movement without surface damage. Expansion joints are required wherever hardscape meets structures (house foundations, pool coping, walls) to prevent cracking from differential movement. These are engineering details that matter for the 20–30 year lifespan of your hardscape.</p>
                                    <p>The San Gabriel Valley's clay-heavy soil also presents unique challenges. Clay soil expands when wet and contracts when dry, creating heaving and settling forces that can crack concrete and shift pavers. Proper base preparation (excavation below the clay layer, geotextile fabric, and compacted aggregate) creates a stable foundation that isolates the hardscape surface from soil movement. This is why base preparation is the most important — and most commonly skipped — step in hardscape construction.</p>
                                    <p>Los Angeles County's increasing focus on stormwater management means permeable hardscape options are becoming more relevant. Permeable pavers allow rainwater to infiltrate through the joints and into the ground rather than running off into storm drains. Some San Gabriel Valley cities offer incentives or expedited permits for projects that incorporate permeable hardscape. Outright Landscape can advise on permeable options that combine stormwater management with the durability and aesthetics of traditional hardscape.</p>
                                </div>
                            </motion.div>
                        </article>
                    </div>
                </section>

                {/* ── SECTION A: PAVERS ── */}
                <section className="hardscapePavers py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Paver Installation</span>
                                <h2 className="hardscapePaversTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2 mb-5">Professional Paver Installation</h2>
                                <p className="text-[#6b6560] text-base mb-4 leading-relaxed">We have installed over {GEO_STATS.projectsCompleted} custom paver patios, driveways, and walkways in the San Gabriel Valley. Our paver installations are built to last — proper excavation, layered base prep, and tight craftsmanship on every project. Premium interlocking pavers that resist cracking and shifting over time.</p>
                                <p className="text-[#6b6560] text-base mb-6 leading-relaxed">Whether you're looking to upgrade your driveway for maximum curb appeal, create a stunning backyard patio for entertaining, or design elegant walkways that connect your outdoor living areas, our team ensures a flawless finish. We offer a wide range of colors, textures, and patterns to perfectly match your home's architectural style.</p>
                                <dl className="hardscapePaversList space-y-2.5 mb-8">
                                    {paverSteps.map((step, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-sm text-[#4a4540]">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" aria-hidden />
                                            <div><dt className="sr-only">Step {i + 1}</dt><dd className="m-0">{step}</dd></div>
                                        </div>
                                    ))}
                                </dl>
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
                                <dl className="hardscapeConcreteList space-y-2.5 mb-8">
                                    {concreteSteps.map((step, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-sm text-[#4a4540]">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" aria-hidden />
                                            <div><dt className="sr-only">Step {i + 1}</dt><dd className="m-0">{step}</dd></div>
                                        </div>
                                    ))}
                                </dl>
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
                                <dl className="hardscapeRetainingList space-y-2.5 mb-8">
                                    {retainingSteps.map((step, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-sm text-[#4a4540]">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" aria-hidden />
                                            <div><dt className="sr-only">Step {i + 1}</dt><dd className="m-0">{step}</dd></div>
                                        </div>
                                    ))}
                                </dl>
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

                {/* ── FAQ (AEO) ── */}
                <section id="faq" className="hardscapeFaq py-20 sm:py-28 bg-white" aria-labelledby="hardscape-faq-heading">
                    <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">FAQ</span>
                            <h2 id="hardscape-faq-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Common Hardscape Questions</h2>
                        </motion.div>
                        <dl className="space-y-4">
                            {GEO_FAQS.hardscape.map((faq, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                                    className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                    <dt className="text-base font-bold text-[#1a1a1a] mb-2">{faq.q}</dt>
                                    <dd className="text-[#6b6560] text-sm leading-relaxed m-0">{faq.a}</dd>
                                </motion.div>
                            ))}
                        </dl>
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