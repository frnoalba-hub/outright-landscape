import { useEffect, useRef, useState } from 'react';
import { MapPin, Shield, Zap, Star, Target, Waves, Leaf, Hammer, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

function CountUp({ end, duration = 1500, suffix = '' }) {
    const [count, setCount] = useState(end);
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
        description: 'Sprinkler repair, drip systems, and smart controllers for properties across the San Gabriel Valley. Licensed C-27 contractor.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/781c79e8b_generated_image.png',
        icon: Waves,
        features: ['Drip Systems', 'Smart Controllers', 'Water-Efficient Design'],
    },
    {
        title: 'Premium Turf & Sod Installation',
        description: 'Marathon tall fescue and hybrid Bermuda grass installed with site-specific soil preparation, grading, and irrigation planning.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/f8652a9f2_generated_image.png',
        icon: Leaf,
        features: ['Premium Sod', 'Artificial Turf', 'Lawn Renovation'],
    },
    {
        title: 'Hardscaping & Paver Installation',
        description: 'Paver patios, walkways, and driveways built with careful site preparation and attention to drainage.',
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
    { icon: Shield, title: 'Licensed C-27', desc: 'California contractor license CSLB #1073845—easy to verify before your project starts.' },
    { icon: Zap, title: 'Skilled Craftsmanship', desc: 'Thoughtful landscape and hardscape work for homes across the San Gabriel Valley.' },
    { icon: Star, title: 'Premium Materials', desc: 'We source only top-grade products for lasting beauty and durability.' },
    { icon: Target, title: 'Free Estimates', desc: 'Clear project-specific pricing and scope before work begins.' },
    { icon: Star, title: 'Local Service', desc: 'Based in Covina and serving communities throughout the San Gabriel Valley.' },
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
                description="Professional landscape contractor based in Covina and serving the San Gabriel Valley. Paver installation, sod, irrigation systems, and hardscaping. Licensed C-27 #1073845. Founded in 2020. Free estimates. Call (626) 343-6028."
                canonicalUrl="https://outrightlandscape.com"
                keywords="landscape contractor covina, licensed landscaping covina, paver installation covina, sod installation covina, irrigation systems covina, hardscape covina, landscaping san gabriel valley, C-27 contractor"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png"
                ogType="website"
                schemaData={[SERVICE_SCHEMAS['paver-installation'], SERVICE_SCHEMAS['turf-installation'], SERVICE_SCHEMAS['irrigation-systems'], SERVICE_SCHEMAS.hardscaping]}
            />
            <FAQSchema faqs={GEO_FAQS.home} cityName="home" />



            {/* ── 1. HERO ── */}
            <HomeHero 
                onPhoneClick={handlePhoneClick} 
                onQuoteClick={handleQuoteClick}
                reviews={reviewsData?.reviews}
                totalReviewCount={reviewsData?.totalReviewCount}
                averageRating={reviewsData?.averageRating}
            />

            {/* ── 2. FACTS BAR ── */}
            <section className="statsSection py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]" aria-label="Company statistics">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                        {[
                            { raw: String(GEO_STATS.foundingYear), label: 'Founded' },
                            { raw: 'C-27', label: 'License Class' },
                            { raw: '#1073845', label: 'CSLB License' },
                            { raw: 'SGV', label: 'Service Area' },
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
                                    {stat.raw || <CountUp end={stat.end} suffix={stat.suffix} />}
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

            {/* ── 4b. COMPLETE LANDSCAPING GUIDE ── */}
            <section className="landscapingGuide py-20 sm:py-28 bg-white" aria-labelledby="guide-heading">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                        <span className="text-[#2d5a27] uppercase tracking-[0.2em] text-xs font-bold">Expert Guide</span>
                        <h2 id="guide-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Complete Landscaping Guide for San Gabriel Valley Homeowners</h2>
                        <p className="mt-4 text-[#6b6560] text-base leading-relaxed max-w-3xl">
                            Outright Landscape Construction is a Covina-based, licensed C-27 contractor serving the San Gabriel Valley. Founded in {GEO_STATS.foundingYear}, we provide landscaping, hardscaping, and irrigation services across Covina and surrounding communities. This guide explains key considerations for professional landscaping in the region.
                        </p>
                    </motion.div>

                    <article className="space-y-12">
                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Professional Turf and Sod Installation in Southern California</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>A healthy, green lawn starts with proper soil preparation and premium sod selection. In the San Gabriel Valley's Mediterranean climate—hot, dry summers and mild, wet winters—choosing the right grass variety is critical for long-term success and water efficiency.</p>
                                <p><strong className="text-[#1a1a1a]">Marathon Tall Fescue</strong> is a common sod choice for Southern California lawns. It is a cool-season grass that can maintain green color with appropriate irrigation and may suit properties with a mix of sun and partial shade. Specific performance and water needs depend on the variety, soil, exposure, maintenance, and watering schedule.</p>
                                <p><strong className="text-[#1a1a1a]">Hybrid Bermuda Grass</strong> can be a good fit for sunny, active-use lawns. It may go dormant and turn brown in winter before greening again in warmer weather. The right choice depends on sun exposure, appearance goals, foot traffic, irrigation, and maintenance preferences.</p>
                                <p>Our turf installation process is tailored to site conditions and can include removal of existing lawn material, soil preparation, appropriate amendments, grading, and sod placement. We also provide watering guidance based on the property's sun exposure, soil type, sod variety, and irrigation capacity. The project schedule is confirmed in the estimate.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Irrigation System Design and Installation</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>An efficient irrigation system is essential for maintaining a healthy landscape in Southern California's dry climate. Outright Landscape designs, installs, and repairs irrigation systems using components selected for the property's zones, plants, pressure, and coverage needs.</p>
                                <p>A properly designed irrigation system divides your property into zones based on plant water requirements, sun exposure, and soil type. We install separate zones for turf areas (rotary spray heads), garden beds (drip irrigation), and slopes (low-precipitation heads to prevent runoff). Each zone is controlled independently, allowing precise water delivery that eliminates waste and ensures every plant receives the right amount of water.</p>
                                <p><strong className="text-[#1a1a1a]">Smart irrigation controllers</strong> can adjust watering schedules using weather or sensor information, helping reduce unnecessary watering when correctly configured. Product compatibility, savings, and rebate eligibility depend on the equipment, property, water provider, and current program rules.</p>
                                <p><strong className="text-[#1a1a1a]">Drip irrigation</strong> delivers water near plant root zones and can reduce overspray and runoff when properly designed. Emitters, pressure regulation, filtration, and zoning are selected for the plants, slopes, elevations, and available water pressure.</p>
                                <p>Common irrigation problems in the San Gabriel Valley include broken sprinkler heads, leaking valves, cracked pipes, and clogged drip emitters. Outright Landscape diagnoses and repairs irrigation problems across the region—call (626) 343-6028 to discuss current scheduling.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Hardscape Design and Construction</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>Hardscaping—the construction of patios, driveways, walkways, retaining walls, and outdoor living spaces—often represents a significant part of a landscape project. Site preparation, drainage, suitable materials, and careful installation all affect long-term performance.</p>
                                <p><strong className="text-[#1a1a1a]">Why professional base preparation matters:</strong> Inadequate preparation can contribute to shifting, cracking, settling, and drainage problems. The appropriate excavation, grading, base material, compaction, bedding, and edge restraint specifications depend on soil, loads, drainage, and the chosen surface.</p>
                                <p><strong className="text-[#1a1a1a]">Interlocking pavers</strong> are available in many colors, shapes, and patterns. Individual units can often be lifted and reset if access or repair is needed. We help homeowners compare suitable products, availability, installation requirements, and manufacturer terms for their project.</p>
                                <p><strong className="text-[#1a1a1a]">Retaining walls</strong> can manage slopes and elevation changes on San Gabriel Valley properties. Design, drainage, reinforcement, engineering, setbacks, and permit requirements depend on the site, wall, load, and local jurisdiction and should be confirmed before construction.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Landscape Design for Southern California Properties</h3>
                            <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>Effective landscape design in the San Gabriel Valley balances aesthetics, water use, exposure, soil, and climate resilience. Plant suitability varies by the property's microclimate and conditions.</p>
                                <p>Water-efficient landscape rules may apply depending on the project and jurisdiction. Strategies can include grouping plants by water needs, efficient irrigation, appropriate mulch, and permeable surfaces where suitable. Applicable requirements should be confirmed for the specific property and scope.</p>
                                <p>Thoughtful landscaping can improve curb appeal, outdoor usability, and enjoyment of a property. Any effect on resale value varies by the home, neighborhood, design, condition, buyer preferences, and market, so it should not be treated as a guaranteed return.</p>
                            </div>
                        </motion.div>
                    </article>
                </div>
            </section>

            {/* ── 5. PROCESS ── */}
            <HomeProcess />

            {/* ── 5b. LANDSCAPING COST GUIDE ── */}
            <section className="costGuide py-20 sm:py-28 bg-[#f5f0e8]" aria-labelledby="cost-guide-heading">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Pricing Guide</span>
                        <h2 id="cost-guide-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Landscaping Costs in the San Gabriel Valley</h2>
                        <p className="mt-4 text-[#6b6560] text-base leading-relaxed max-w-3xl">
                            Pricing varies by site conditions, scope, access, materials, and preparation. The ranges below are planning examples, not quotes. Outright Landscape provides a detailed project-specific estimate—call (626) 343-6028.
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
                                <p><strong className="text-[#1a1a1a]">Property size and existing conditions</strong>—demolition and removal of old concrete, hardscape, or overgrown vegetation adds to project cost. Properties with extensive existing infrastructure require more labor before new installation begins.</p>
                                <p><strong className="text-[#1a1a1a]">Site access</strong>—steep driveways, narrow side yards, and hillside properties require additional labor for material transport. Properties in foothill communities like Glendora, La Verne, and San Dimas often have grading and access challenges that affect pricing.</p>
                                <p><strong className="text-[#1a1a1a]">Material selection</strong>—product choice, availability, finish, and installation requirements can substantially affect a project's price.</p>
                                <p><strong className="text-[#1a1a1a]">Drainage requirements</strong>—hillside properties and areas with clay soil may need drains, catch basins, or regrading to manage runoff.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Why the Lowest Bid Is Usually the Most Expensive Choice</h3>
                            <div className="space-y-3 text-[#4a4540] text-[15px] leading-relaxed">
                                <p>When comparing proposals, verify the contractor's license and compare the written scope, materials, preparation, drainage, exclusions, and payment terms. Incomplete preparation or irrigation design can create avoidable repair costs later.</p>
                                <p>Outright Landscape holds California CSLB license #1073845 (C-27 Landscaping Contractor). We provide detailed written estimates covering the planned scope, materials, timing, and payment schedule so homeowners can evaluate the work before it begins.</p>
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
                            Professional landscape construction&nbsp;•&nbsp;Covina and the San Gabriel Valley
                        </p>
                    </motion.div>

                    <nav aria-label="Service areas" className="areasGrid flex flex-wrap gap-2.5">
                        {locations.map((city, index) => (
                            <motion.a
                                key={city.name}
                                href={`/${city.slug === 'san-gabriel-valley' ? 'san-gabriel' : city.slug}-landscaping`}
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

            {/* ── 9. WHY CHOOSE OUTRIGHT ── */}
            <section className="bestChoiceSection py-20 sm:py-28 bg-white" aria-labelledby="best-choice-heading">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <span className="text-[#2d5a27] uppercase tracking-[0.2em] text-xs font-bold">What Sets Us Apart</span>
                        <h2 id="best-choice-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Why Homeowners Choose Outright Landscape</h2>
                    </motion.div>
                    <dl className="space-y-6">
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Licensed & Verified Contractor</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">Outright Landscape holds California CSLB license #1073845 (C-27 Landscaping Contractor), which homeowners can verify directly with the Contractors State License Board.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Local, Established Service</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">Founded in 2020 and based in Covina, Outright Landscape serves homeowners across the San Gabriel Valley with project-specific planning and direct communication.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Complete Outdoor Services</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">One team can plan landscaping, hardscaping, turf, drainage, and irrigation work around the needs of your property.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Commercial-Grade Materials & Proper Base Prep</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">Material selection, excavation, drainage, and compaction are planned for the project conditions. Those details are documented in the estimate so the proposed construction approach is clear.</dd>
                        </div>
                        <div className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                            <dt className="text-base font-bold text-[#1a1a1a] mb-2">Irrigation Repair and Upgrades</dt>
                            <dd className="text-[#6b6560] text-sm leading-relaxed m-0">We diagnose sprinkler leaks, valves, coverage issues, and controller problems across the San Gabriel Valley. Call to discuss current availability and request an estimate.</dd>
                        </div>
                    </dl>
                </div>
            </section>

            {/* ── 10. FAQ ── */}
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

            {/* ── 11. CONTACT FORM ── */}
            <ContactForm cityName="Covina & San Gabriel Valley" />
        </div>
    );
}
