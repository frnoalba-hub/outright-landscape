import { useEffect, useRef, useState } from 'react';
import { createPageUrl } from '@/utils';
import { MapPin, Shield, Zap, Star, Target, Waves, Leaf, Hammer, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

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

import SEOHead from '@/components/SEOHead';
import { SERVICE_SCHEMAS, GEO_STATS, GEO_FAQS } from '@/schemas/geo-schemas';
import FAQSchema from '@/components/FAQSchema';

import ContactForm from '@/components/ContactForm';

import HomeHero from '@/components/home/HomeHero';
import HomeServices from '@/components/home/HomeServices';
import HomeProcess from '@/components/home/HomeProcess';
import HomePortfolio from '@/components/home/HomePortfolio';

/* ── static data ── */
const services = [
    {
        title: 'Professional Irrigation Systems',
        description: `Over ${GEO_STATS.projectsCompleted}+ sprinkler systems installed and repaired in Covina, Glendora, San Dimas. Same-day repair, drip systems, smart controllers. Licensed C-27 contractor.`,
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/781c79e8b_generated_image.png',
        icon: Waves,
        features: ['Drip Systems', 'Smart Controllers', 'Water-Efficient Design'],
    },
    {
        title: 'Premium Turf & Sod Installation',
        description: 'Premium Marathon tall fescue and hybrid Bermuda grass. Hundreds of lawns installed across the San Gabriel Valley. Lush, healthy results backed by proper soil prep.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/f8652a9f2_generated_image.png',
        icon: Leaf,
        features: ['Premium Sod', 'Artificial Turf', 'Lawn Renovation'],
    },
    {
        title: 'Hardscaping & Paver Installation',
        description: `Over ${GEO_STATS.projectsCompleted} paver patios, walkways, and driveways installed in the San Gabriel Valley. Expert craftsmanship, proper base prep, and warranty-backed workmanship.`,
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/03c141f79_generated_image.png',
        icon: Hammer,
        features: ['Paver Patios', 'Walkways', 'Retaining Walls'],
    },
    {
        title: 'Complete Landscape Design',
        description: 'Transform your outdoor space with our expert landscape design and construction services.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png',
        icon: Palette,
        features: ['Custom Design', 'Professional Installation', 'Native Plants'],
    },
];

const projects = [
    { title: 'Premium Turf Installation', location: 'Covina, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/f8652a9f2_generated_image.png', alt: 'Premium Turf Installation - Outright Landscape Covina' },
    { title: 'Irrigation Valve Installation', location: 'La Verne, CA', image: '/images/01c14d800_unnamed2-Copy.jpg', alt: 'Irrigation Valve Installation - Outright Landscape La Verne' },
    { title: 'Professional Irrigation Setup', location: 'Glendora, CA', image: '/images/c734704d4_IMG_4815-Copy.jpg', alt: 'Professional Irrigation Setup - Outright Landscape Glendora' },
    { title: 'Irrigation Valve Repair', location: 'San Dimas, CA', image: '/images/c77326177_IMG_4971-Copy.jpg', alt: 'Irrigation Valve Repair - Outright Landscape San Dimas' },
    { title: 'Underground Irrigation System', location: 'Covina, CA', image: '/images/eb74e1b87_IMG_37521-Copy.jpg', alt: 'Underground Irrigation System - Outright Landscape Covina' },
    { title: 'Multi-Zone Irrigation Valves', location: 'West Covina, CA', image: '/images/f03bb2890_IMG_3851-Copy.jpg', alt: 'Multi-Zone Irrigation Valves - Outright Landscape West Covina' },
    { title: 'Irrigation Valve Box Setup', location: 'Glendora, CA', image: '/images/723adf744_IMG_3731-Copy.jpg', alt: 'Irrigation Valve Box Setup - Outright Landscape Glendora' },
    { title: 'Front Yard Driveway Pavers', location: 'San Dimas, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/03c141f79_generated_image.png', alt: 'Front Yard Driveway Pavers - Outright Landscape San Dimas' },
];

const reasons = [
    { icon: Shield, title: 'Licensed & Insured', desc: 'C-27 License CSLB #1073845 — full liability coverage for your peace of mind.' },
    { icon: Zap, title: 'Expert Craftsmen', desc: `Skilled professionals with ${GEO_STATS.yearsExperience}+ years of hands-on landscape and hardscape experience in the San Gabriel Valley.` },
    { icon: Star, title: 'Premium Materials', desc: 'We source only top-grade products for lasting beauty and durability.' },
    { icon: Target, title: 'Free Estimates', desc: 'Transparent pricing with no hidden fees — know exactly what you\'re paying.' },
    { icon: Star, title: '4.8★ Rated', desc: 'Highly rated on Google, Angi, and Houzz by homeowners across Covina, Glendora, San Dimas, and the San Gabriel Valley.', isRating: true },
];

/* ── component ── */
export default function Home() {
    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 100),
        initialData: [],
    });

    const { data: reviewsData } = useQuery({
        queryKey: ['googleReviews'],
        queryFn: async () => {
            const response = await base44.functions.invoke('getGoogleReviews', {});
            return response.data;
        },
        staleTime: 1000 * 60 * 60,
    });

    const trackEvent = (eventName, eventData = {}) => {
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({ event: eventName, ...eventData });
        }
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, eventData);
        }
    };

    const handlePhoneClick = (location) => {
        trackEvent('phone_click', { event_category: 'engagement', event_label: location, phone_number: '626-343-6028', value: 1 });
    };

    const handleQuoteClick = (location) => {
        trackEvent('request_quote', { event_category: 'conversion', event_label: location, value: 1 });
        trackEvent('free_quote_request', { event_category: 'lead_generation', event_label: location, submission_method: 'quote_button' });
    };

    return (
        <div className="homePageWrapper bg-white" role="document">
            {/* SEO & Schemas */}
            <SEOHead
                title="Outright Landscape | Licensed Covina Landscaping Contractor - Pavers, Sod & Irrigation"
                description="Professional landscape contractor in Covina serving San Gabriel Valley. Expert paver installation, sod, irrigation systems & hardscaping. Licensed C-27 #1073845. 10+ years experience. Free estimates. Call (626) 343-6028."
                canonicalUrl="https://outrightlandscape.com"
                keywords="landscape contractor covina, licensed landscaping covina, paver installation covina, sod installation covina, irrigation systems covina, hardscape covina, landscaping san gabriel valley, C-27 contractor"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png"
                ogType="website"
                schemaData={[SERVICE_SCHEMAS['paver-installation'], SERVICE_SCHEMAS['turf-installation'], SERVICE_SCHEMAS['irrigation-systems'], SERVICE_SCHEMAS.hardscaping]}
            />
            <FAQSchema faqs={GEO_FAQS.home} cityName="home" />

            <div className="bg-[#1a1a1a] pt-20 pb-0">
                <p className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-xs text-white/30">Last updated: April 13, 2026</p>
            </div>

            {/* ── 1. HERO ── */}
            <HomeHero 
                onPhoneClick={handlePhoneClick} 
                onQuoteClick={handleQuoteClick}
                reviews={reviewsData?.reviews}
                totalReviewCount={reviewsData?.totalReviewCount}
                averageRating={reviewsData?.averageRating}
            />

            {/* ── 2. STATS BAR ── */}
            <section className="statsSection py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]" aria-label="Company statistics">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                        {[
                            { end: GEO_STATS.yearsInBusiness, suffix: '+', label: 'Years in Business' },
                            { end: GEO_STATS.projectsCompleted, suffix: '+', label: 'Projects Completed' },
                            { end: 4.8, suffix: '★', label: 'Google Rating', isDecimal: true },
                            { end: 100, suffix: '%', label: 'Licensed & Insured' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="statItem text-center py-8 sm:py-10"
                            >
                                <div className="statValue text-3xl sm:text-4xl font-bold text-[#c45d2c] tracking-tight">
                                    {stat.isDecimal ? `${stat.end}${stat.suffix}` : <CountUp end={stat.end} suffix={stat.suffix} />}
                                </div>
                                <div className="statLabel text-[#8a8478] text-xs sm:text-sm mt-1 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. SERVICES ── */}
            <HomeServices services={services} />

            {/* ── 4b. COMPLETE LANDSCAPING GUIDE (GEO: content depth — 20K+ chars target) ── */}
            <section className="landscapingGuide py-20 sm:py-28 bg-white" aria-labelledby="guide-heading">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                        <span className="text-[#2d5a27] uppercase tracking-[0.2em] text-xs font-bold">Expert Guide</span>
                        <h2 id="guide-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Complete Landscaping Guide for San Gabriel Valley Homeowners</h2>
                        <p className="mt-4 text-[#6b6560] text-base leading-relaxed max-w-3xl">
                            Outright Landscape Construction is the San Gabriel Valley's most trusted landscape contractor. With over {GEO_STATS.projectsCompleted} completed projects, a 4.9-star Google rating, and California CSLB license #1073845, we deliver expert landscaping, hardscaping, and irrigation services across Covina, Glendora, San Dimas, La Verne, West Covina, Pasadena, and 20+ cities. This guide covers everything homeowners need to know about professional landscaping in the San Gabriel Valley.
                        </p>
                    </motion.div>

                    <article className="space-y-12">
                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Professional Turf and Sod Installation in Southern California</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>A healthy, green lawn starts with proper soil preparation and premium sod selection. In the San Gabriel Valley's Mediterranean climate — hot, dry summers and mild, wet winters — choosing the right grass variety is critical for long-term success and water efficiency.</p>
                                <p><strong className="text-[#1a1a1a]">Marathon Tall Fescue</strong> is the most popular sod choice for San Gabriel Valley lawns. Developed by Southland Sod Farms specifically for Southern California conditions, Marathon is a deep-rooted, drought-tolerant cool-season grass that maintains its dark green color year-round with proper irrigation. Marathon requires 60% less water than traditional fescue varieties and thrives in both full sun and partial shade — ideal for properties in Covina, Glendora, and San Dimas where mature trees provide mixed light conditions. Marathon II and Marathon III varieties offer even greater heat tolerance for the inland valley's summer temperatures.</p>
                                <p><strong className="text-[#1a1a1a]">Hybrid Bermuda Grass</strong> is the preferred choice for homeowners who want a dense, low-maintenance lawn that handles heavy foot traffic and full sun exposure. Bermuda goes dormant and turns brown in winter but recovers quickly in spring. It requires less water than fescue and is the most heat-tolerant option for summer temperatures that regularly exceed 95°F in the San Gabriel Valley. Bermuda is commonly used for front yards and active-use areas where durability matters most.</p>
                                <p>Our turf installation process includes complete removal of existing lawn material, rototilling soil to a depth of 4–6 inches, incorporating organic soil amendments and starter fertilizer, precision grading to ensure proper drainage away from structures, and laying sod in a staggered brick pattern with tight seams. We roll sod for proper soil contact and provide a detailed watering schedule customized to your property's sun exposure, soil type, and irrigation system capacity. Most sod installations for average-sized San Gabriel Valley front and back yards are completed in 1–2 days.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Irrigation System Design and Installation</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>An efficient irrigation system is essential for maintaining a healthy landscape in Southern California, where annual rainfall averages only 15–20 inches. Outright Landscape designs and installs complete irrigation systems using commercial-grade components from Rain Bird, Hunter, and Toro — the same brands used in municipal parks and commercial properties throughout Los Angeles County.</p>
                                <p>A properly designed irrigation system divides your property into zones based on plant water requirements, sun exposure, and soil type. We install separate zones for turf areas (rotary spray heads), garden beds (drip irrigation), and slopes (low-precipitation heads to prevent runoff). Each zone is controlled independently, allowing precise water delivery that eliminates waste and ensures every plant receives the right amount of water.</p>
                                <p><strong className="text-[#1a1a1a]">Smart irrigation controllers</strong> like the Rain Bird ESP-TM2 and Hunter Hydrawise reduce water consumption by 30–50% compared to traditional timer-based controllers. These WiFi-enabled controllers adjust watering schedules automatically based on local weather data, soil moisture levels, and seasonal evapotranspiration changes. For San Gabriel Valley homeowners subject to Metropolitan Water District conservation requirements, smart controllers provide documented proof of water-efficient irrigation management and can qualify for local water agency rebates.</p>
                                <p><strong className="text-[#1a1a1a]">Drip irrigation</strong> is the most water-efficient method for watering garden beds, shrubs, and trees. Drip systems deliver water directly to plant roots at a slow, steady rate, reducing evaporation and runoff by up to 70% compared to overhead spray. We install pressure-regulated drip systems with individual emitters rated at 1–2 gallons per hour, ensuring consistent water delivery across the slopes and varying elevations common in foothill communities like Glendora, La Verne, San Dimas, and Claremont.</p>
                                <p>Common irrigation problems in the San Gabriel Valley include broken sprinkler heads (caused by foot traffic and lawn mowers), leaking valves (wear from hard water mineral deposits), cracked PVC pipes (from soil expansion and contraction during temperature swings), and clogged drip emitters (from mineral buildup in municipal water supplies). Outright Landscape offers same-day emergency sprinkler repair for all of these issues — call (626) 343-6028 before noon and we typically schedule same-day service.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Hardscape Design and Construction</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>Hardscaping — the construction of non-living outdoor elements including patios, driveways, walkways, retaining walls, and outdoor living spaces — represents the largest investment in most landscape projects. Professional hardscape construction requires proper engineering, quality materials, and experienced installation to prevent the cracking, settling, and drainage problems that plague low-cost installations.</p>
                                <p><strong className="text-[#1a1a1a]">Why professional base preparation matters:</strong> The most common reason hardscape fails in the San Gabriel Valley is inadequate base preparation. Cheap contractors skip or shortcut the base, saving themselves time and material cost but leaving homeowners with pavers that shift, concrete that cracks, and retaining walls that lean within 2–3 years. Outright Landscape follows industry-standard base preparation on every hardscape project: excavation to a minimum depth of 6–8 inches below finished grade, installation of geotextile filter fabric to prevent soil migration, 4–6 inches of compacted Class II aggregate base material (compacted in 2-inch lifts to 95% Proctor density), 1 inch of leveling sand for paver installations, and edge restraints secured with 10-inch spikes on all paver borders.</p>
                                <p><strong className="text-[#1a1a1a]">Interlocking pavers</strong> are the most popular hardscape material in the San Gabriel Valley. Available in hundreds of colors, shapes, and patterns, pavers offer design flexibility that poured concrete cannot match. Pavers are also significantly easier to repair — if a section settles or a paver cracks, individual units can be lifted and relaid without replacing the entire surface. We install pavers from Belgard, Tremron, Pavestone, and Angelus, all of which offer lifetime structural warranties on their products.</p>
                                <p><strong className="text-[#1a1a1a]">Retaining walls</strong> are critical for managing slopes and elevation changes on San Gabriel Valley properties, particularly in foothill communities like Glendora, San Dimas, La Verne, and Claremont where hillside lots are common. Retaining walls over 4 feet in height require engineering plans and building permits in Los Angeles County. Outright Landscape constructs retaining walls with proper drainage systems (perforated pipe, filter fabric, and drainage rock behind the wall), geogrid soil reinforcement for walls over 3 feet, and compacted backfill to prevent hydrostatic pressure buildup that causes wall failure.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Landscape Design for Southern California Properties</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>Effective landscape design in the San Gabriel Valley balances aesthetics, water efficiency, and climate resilience. The region's USDA Hardiness Zone 10a–10b supports a wide range of plant species, from tropical and subtropical varieties to Mediterranean natives and drought-tolerant succulents.</p>
                                <p>California's Model Water Efficient Landscape Ordinance (MWELO) requires new and renovated landscapes over 500 square feet to meet specific water budget calculations. Outright Landscape designs landscapes that comply with MWELO requirements while maximizing visual impact through hydrozoning (grouping plants with similar water needs), efficient irrigation technology, appropriate mulching (3–4 inches of shredded bark or wood chips to reduce evaporation by up to 50%), and permeable hardscape surfaces where applicable to manage stormwater.</p>
                                <p>According to the National Association of Realtors, professionally designed landscaping increases property values by 10–15%. In the San Gabriel Valley, where median home prices range from $600,000 to $1.2 million depending on the city, a well-designed landscape represents a potential value increase of $60,000–$180,000 — far exceeding the typical investment of $10,000–$25,000 for a comprehensive landscape renovation. The return on investment for landscaping consistently ranks among the highest of all home improvement categories.</p>
                            </div>
                        </motion.div>
                    </article>
                </div>
            </section>

            {/* ── 5. PROCESS ── */}
            <HomeProcess />

            {/* ── 5b. LANDSCAPING COST GUIDE (GEO: pricing depth) ── */}
            <section className="costGuide py-20 sm:py-28 bg-[#f5f0e8]" aria-labelledby="cost-guide-heading">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Pricing Guide</span>
                        <h2 id="cost-guide-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Landscaping Costs in the San Gabriel Valley (2025–2026)</h2>
                        <p className="mt-4 text-[#6b6560] text-base leading-relaxed max-w-3xl">
                            Transparent pricing helps San Gabriel Valley homeowners budget effectively and compare contractor quotes accurately. The following cost ranges reflect current rates for professional, licensed installation. Outright Landscape provides free detailed estimates for every project — call (626) 343-6028.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl border border-[#e0d8cc]">
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Turf and Sod Installation</h3>
                            <dl className="space-y-0 text-sm text-[#4a4540]">
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Marathon tall fescue sod (installed)</dt><dd className="font-semibold text-[#1a1a1a]">$1.50–$2.50/sq ft</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Hybrid Bermuda sod (installed)</dt><dd className="font-semibold text-[#1a1a1a]">$2–$3/sq ft</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Artificial turf (installed with base prep)</dt><dd className="font-semibold text-[#1a1a1a]">$8–$15/sq ft</dd></div>
                                <div className="flex justify-between py-2.5"><dt>Average front + back yard (1,500–3,000 sq ft)</dt><dd className="font-semibold text-[#1a1a1a]">$3,000–$7,500</dd></div>
                            </dl>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl border border-[#e0d8cc]">
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Irrigation Systems</h3>
                            <dl className="space-y-0 text-sm text-[#4a4540]">
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>New system installation</dt><dd className="font-semibold text-[#1a1a1a]">$1,500–$6,000+</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Sprinkler head replacement</dt><dd className="font-semibold text-[#1a1a1a]">$75–$150/head</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Valve replacement</dt><dd className="font-semibold text-[#1a1a1a]">$150–$300/valve</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Controller replacement + programming</dt><dd className="font-semibold text-[#1a1a1a]">$200–$500</dd></div>
                                <div className="flex justify-between py-2.5"><dt>Drip irrigation installation</dt><dd className="font-semibold text-[#1a1a1a]">$1.50–$4.00/linear ft</dd></div>
                            </dl>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl border border-[#e0d8cc]">
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Hardscaping</h3>
                            <dl className="space-y-0 text-sm text-[#4a4540]">
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Interlocking paver patio (installed)</dt><dd className="font-semibold text-[#1a1a1a]">$15–$30/sq ft</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Paver driveway (installed)</dt><dd className="font-semibold text-[#1a1a1a]">$18–$35/sq ft</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Concrete patio or driveway</dt><dd className="font-semibold text-[#1a1a1a]">$8–$18/sq ft</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Stamped concrete</dt><dd className="font-semibold text-[#1a1a1a]">$12–$25/sq ft</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Retaining walls (block)</dt><dd className="font-semibold text-[#1a1a1a]">$20–$40/sq ft face</dd></div>
                                <div className="flex justify-between py-2.5"><dt>Outdoor fire pit (paver or block)</dt><dd className="font-semibold text-[#1a1a1a]">$2,000–$5,000</dd></div>
                            </dl>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl border border-[#e0d8cc]">
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Complete Landscape Renovations</h3>
                            <dl className="space-y-0 text-sm text-[#4a4540]">
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Front yard renovation</dt><dd className="font-semibold text-[#1a1a1a]">$3,000–$10,000</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Back yard renovation</dt><dd className="font-semibold text-[#1a1a1a]">$5,000–$15,000</dd></div>
                                <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Full property renovation</dt><dd className="font-semibold text-[#1a1a1a]">$10,000–$30,000+</dd></div>
                                <div className="flex justify-between py-2.5"><dt>Custom outdoor living space</dt><dd className="font-semibold text-[#1a1a1a]">$15,000–$50,000+</dd></div>
                            </dl>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 rounded-xl border border-[#e0d8cc]">
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Factors That Affect Landscaping Cost</h3>
                            <div className="space-y-3 text-[#4a4540] text-[15px] leading-relaxed">
                                <p><strong className="text-[#1a1a1a]">Property size and existing conditions</strong> — demolition and removal of old concrete, hardscape, or overgrown vegetation adds to project cost. Properties with extensive existing infrastructure require more labor before new installation begins.</p>
                                <p><strong className="text-[#1a1a1a]">Site access</strong> — steep driveways, narrow side yards, and hillside properties require additional labor for material transport. Properties in foothill communities like Glendora, La Verne, and San Dimas often have grading and access challenges that affect pricing.</p>
                                <p><strong className="text-[#1a1a1a]">Material selection</strong> — premium pavers from Belgard or natural stone cost more than standard concrete pavers, but offer greater durability and aesthetic value. Marathon II sod costs slightly more than standard Bermuda but provides year-round green color.</p>
                                <p><strong className="text-[#1a1a1a]">Drainage requirements</strong> — hillside properties and areas with clay soil often need French drains, catch basins, or re-grading to manage water runoff, adding $1,500–$5,000 to project costs.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Why the Lowest Bid Is Usually the Most Expensive Choice</h3>
                            <div className="space-y-3 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>Unlicensed contractors often underbid legitimate companies by 30–50%, but homeowners pay the real cost later. Without proper base preparation, pavers shift and concrete cracks within 2–3 years. Without proper irrigation design, plants die and water bills spike. Without a CSLB license, homeowners have no recourse through the Contractors State License Board if work is defective or incomplete.</p>
                                <p>Outright Landscape is fully licensed (CSLB #1073845), bonded, and insured. Every project is backed by our workmanship warranty and your legal protections under California contractor law. We provide detailed written estimates with material specifications, project timelines, and payment schedules — no surprises and no hidden costs.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 6. PORTFOLIO ── */}
            <HomePortfolio projects={projects} onCtaClick={() => handleQuoteClick('projects_section')} />

            {/* ── 7. SERVICE AREAS ── */}
            <section id="service-areas" className="serviceAreasSection py-20 sm:py-28 bg-[#f5f0e8]" aria-labelledby="service-areas-heading">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="areasHeader mb-12"
                    >
                        <span className="areasLabel text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">
                            Service Areas
                        </span>
                        <h2 id="service-areas-heading" className="areasTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">
                            Serving the San Gabriel Valley
                        </h2>
                        <p className="areasSubtitle mt-3 text-[#6b6560] text-base">
                            Professional landscape construction&nbsp;•&nbsp;{locations.length}+ cities
                        </p>
                    </motion.div>

                    <nav aria-label="Service areas" className="areasGrid flex flex-wrap gap-2.5">
                        {locations.map((city, index) => (
                            <motion.a
                                key={city.name}
                                href={`${createPageUrl('ServiceArea')}?city=${city.slug}`}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.02 }}
                                className="areaTag inline-flex items-center gap-1.5 bg-white border border-[#e0d8cc] hover:border-[#2d5a27] hover:bg-[#2d5a27] px-4 py-2.5 rounded-lg text-sm font-medium text-[#4a4540] hover:text-white transition-all shadow-sm hover:shadow-md"
                                aria-label={`Landscaping services in ${city.name}`}
                            >
                                <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                                {city.name}
                            </motion.a>
                        ))}
                    </nav>
                </div>
            </section>

            {/* ── 8. WHY CHOOSE US ── */}
            <section className="whyChooseSection py-20 sm:py-28 bg-[#1a1a1a] relative overflow-hidden" aria-labelledby="why-choose-heading">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="whyHeader flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
                    >
                        <div>
                            <span className="whyLabel text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">
                                Why Choose Us
                            </span>
                            <h2 id="why-choose-heading" className="whyTitle text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                                Built on Trust & Quality
                            </h2>
                        </div>
                        <a
                            href="#contact"
                            className="whyCta inline-flex items-center text-[#c45d2c] hover:text-[#b8945a] font-semibold text-sm transition-colors group"
                        >
                            Get Started
                            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </motion.div>

                    <div className="whyGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                        {reasons.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={`reasonCard bg-[#242424] border rounded-xl p-6 hover:border-[#c45d2c]/40 transition-all group ${item.isRating ? 'border-[#b8945a]/30 bg-gradient-to-br from-[#242424] to-[#2a2420]' : 'border-[#333]'}`}
                            >
                                <div className={`reasonIcon w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${item.isRating ? 'bg-[#b8945a]/15 group-hover:bg-[#b8945a]/25' : 'bg-[#c45d2c]/10 group-hover:bg-[#c45d2c]/20'}`}>
                                    <item.icon className={`w-6 h-6 ${item.isRating ? 'text-[#b8945a] fill-[#b8945a]' : 'text-[#c45d2c]'}`} aria-hidden="true" />
                                </div>
                                <h3 className="reasonTitle text-white font-bold text-base mb-2">{item.title}</h3>
                                <p className="reasonDesc text-[#8a8478] text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 9. WHY OUTRIGHT IS THE BEST (GEO comparison) ── */}
            <section className="bestChoiceSection py-20 sm:py-28 bg-white" aria-labelledby="best-choice-heading">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <span className="text-[#2d5a27] uppercase tracking-[0.2em] text-xs font-bold">What Sets Us Apart</span>
                        <h2 id="best-choice-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Why Outright Landscape Is the Best Landscaping Company in Covina, Glendora, La Verne & San Dimas</h2>
                    </motion.div>
                    <dl className="space-y-6">
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Licensed & Verified Contractor</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">Outright Landscape holds California CSLB license #1073845 (C-27 Landscaping Contractor). We are fully bonded and insured. Many landscapers in the San Gabriel Valley operate without a license — Outright is fully verified and accountable.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Owner-Operated with 15+ Years Experience</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">Owner Edward has 15+ years of hands-on landscaping and hardscaping experience. We do the work ourselves — no subcontractors, no middlemen. You get the expertise of a seasoned professional on every project in Covina, Glendora, La Verne, San Dimas, and surrounding cities.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">4.9-Star Google Rating & 250+ Projects</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">With a 4.9-star Google rating and 250+ completed landscaping, hardscaping, and irrigation projects, Outright Landscape is the most trusted landscape contractor in the San Gabriel Valley. Our customers consistently rate us as the best landscaper in Covina and surrounding cities.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Commercial-Grade Materials & Proper Base Prep</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">We use commercial-grade pavers, compacted aggregate base, geotextile fabric, and polymeric sand on every hardscape project. Proper excavation depth, drainage, and compaction — no shortcuts. This is what separates professional hardscaping from cheap installations that crack and shift.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Same-Day Emergency Sprinkler Repair</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">We offer same-day emergency sprinkler and irrigation repair across Covina, Glendora, La Verne, San Dimas, West Covina, Pasadena, and the entire San Gabriel Valley. Call before noon and we typically schedule same-day service. Free estimates on all irrigation work.</dd>
                        </div>
                    </dl>
                </div>
            </section>

            {/* ── 10. FAQ (AEO: voice & "near me") ── */}
            <section id="faq" className="homeFaq py-20 sm:py-28 bg-[#f5f0e8]" aria-labelledby="faq-heading">
                <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">FAQ</span>
                        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Common Questions</h2>
                    </motion.div>
                    <dl className="space-y-4">
                        {GEO_FAQS.home.map((faq, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                <dt className="text-base font-bold text-[#1a1a1a] mb-2">{faq.q}</dt>
                                <dd className="text-[#6b6560] text-sm leading-relaxed m-0">{faq.a}</dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ── 10. CONTACT FORM ── */}
            <ContactForm cityName="Covina & San Gabriel Valley" />
        </div>
    );
}