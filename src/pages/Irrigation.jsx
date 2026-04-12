import { useEffect, useRef, useState } from 'react';
import { Phone, Droplets, Wrench, Settings, Waves, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

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

export default function Irrigation() {
    const handlePhoneClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'phone_click', event_category: 'engagement', event_label: 'irrigation-hub', phone_number: '626-343-6028' });
        }
    };

    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 100),
        initialData: [],
    });

    const services = [
        { icon: Wrench, title: 'Sprinkler Repair', slug: 'sprinkler-repair', description: 'Fast sprinkler repair for broken heads, leaks, and zone issues. Same-day service available.', keywords: 'Leaks, Broken Heads, Zone Problems' },
        { icon: Settings, title: 'Irrigation Repair', slug: 'irrigation-repair', description: 'Complete irrigation system repair including valve service, controller programming, and leak detection.', keywords: 'Valves, Controllers, System Diagnostics' },
        { icon: Droplets, title: 'Sprinkler Valves', slug: 'sprinkler-valves', description: 'Sprinkler valve replacement and repair. Fix stuck valves, leaks, and solenoid issues.', keywords: 'Valve Replacement, Solenoids, Stuck Valves' },
        { icon: Waves, title: 'Drip Irrigation', slug: 'drip-irrigation', description: 'Drip irrigation repair and installation. Water-efficient solutions for gardens and landscapes.', keywords: 'Emitters, Pressure Regulation, Water Efficiency' }
    ];

    return (
        <>
            <SEOHead
                title="Irrigation & Sprinkler Repair | La Verne, San Dimas, Glendora CA"
                description="Professional sprinkler repair, irrigation valve service, and drip system installation in La Verne, San Dimas, and Glendora. Licensed C-27 contractor. Same-day service available. Call (626) 343-6028."
                canonicalUrl="https://outrightlandscape.com/Irrigation"
                keywords="irrigation repair, sprinkler repair, irrigation valve repair, drip irrigation, sprinkler system repair, la verne irrigation, san dimas sprinkler repair, glendora irrigation"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/781c79e8b_generated_image.png"
                ogType="website"
                schemaData={[SERVICE_SCHEMAS['irrigation-systems']]}
            />
            <FAQSchema faqs={GEO_FAQS.irrigation} cityName="irrigation" />

            <div className="irrigationPageWrapper min-h-screen bg-white" role="document">
                {/* ── HERO ── */}
                <section className="irrigationHero relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]" aria-labelledby="irrigation-hero-heading">
                    <div className="absolute inset-0 sm:left-[40%]">
                        <img src="/images/01c14d800_unnamed2-Copy.jpg" alt="Professional irrigation installation" className="w-full h-full object-cover" fetchPriority="high" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/75 sm:to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
                    </div>

                    <div className="irrigationHeroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:py-0">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-xl space-y-6">
                            <div className="irrigationHeroBadge inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                                <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">San Gabriel Valley</span>
                            </div>
                            <h1 id="irrigation-hero-heading" className="irrigationHeroHeadline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                                <span className="font-light">Sprinkler &</span><br />
                                <span className="font-bold text-[#c45d2c]">Irrigation Repair</span><br />
                                <span className="font-light">Services</span>
                            </h1>
                            <p className="irrigationHeroSubtitle text-[#a09a90] text-base sm:text-lg leading-relaxed max-w-md">
                                {GEO_STATS.yearsInBusiness} years in business. Over {GEO_STATS.projectsCompleted}+ sprinkler systems installed and repaired in Covina, Glendora, San Dimas, and the San Gabriel Valley. Owner has {GEO_STATS.yearsExperience}+ years industry experience. Licensed C-27 contractor.
                            </p>
                            <div className="irrigationHeroQuote hidden sm:block py-2">
                                <AttributedQuote {...GEO_QUOTES.irrigation} compact />
                            </div>
                            <div className="irrigationHeroCtas flex flex-col sm:flex-row gap-3 pt-2">
                                <a href="tel:626-343-6028" onClick={handlePhoneClick} className="w-full sm:w-auto">
                                    <Button className="w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-base px-7 py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:scale-[1.02] min-w-[240px]">
                                        <Phone className="mr-2.5 w-5 h-5" />(626) 343-6028
                                    </Button>
                                </a>
                                <a href="#contact-section" className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-base px-7 py-6 rounded-xl transition-all min-w-[240px]">
                                    Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
                </section>

                {/* ── STATS ── */}
                <section className="irrigationStats py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                            {[{ end: GEO_STATS.projectsCompleted, suffix: '+', label: 'Systems Installed & Repaired' }, { raw: '24hr', label: 'Response Time' }, { end: GEO_STATS.yearsInBusiness, suffix: '+', label: 'Years Experience' }, { end: 100, suffix: '%', label: 'Licensed & Insured' }].map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="irrigationStatItem text-center py-8 sm:py-10">
                                    <div className="text-3xl sm:text-4xl font-bold text-[#c45d2c] tracking-tight">
                                        {stat.raw ? stat.raw : <CountUp end={stat.end} suffix={stat.suffix} />}
                                    </div>
                                    <div className="text-[#8a8478] text-xs sm:text-sm mt-1 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SERVICE SUMMARY (GEO) ── */}
                <ServiceSummaryBox
                    problem="Broken sprinkler heads, leaking valves, controller issues, and water waste affecting lawn health and water bills."
                    solution="Expert sprinkler repair, valve service, drip irrigation installation, and same-day emergency repair. Licensed C-27 contractor with commercial-grade parts."
                    serviceArea="San Gabriel Valley: La Verne, San Dimas, Glendora, Covina, West Covina, Pasadena, Azusa, Diamond Bar, Walnut, Pomona, and surrounding cities."
                />

                {/* ── COMPLETE IRRIGATION GUIDE (GEO: content depth) ── */}
                <section className="irrigationGuide py-20 sm:py-28 bg-white" aria-labelledby="irrigation-guide-heading">
                    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                            <span className="text-[#2d5a27] uppercase tracking-[0.2em] text-xs font-bold">Expert Guide</span>
                            <h2 id="irrigation-guide-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Complete Sprinkler and Irrigation Guide for San Gabriel Valley Homeowners</h2>
                            <p className="mt-4 text-[#6b6560] text-base leading-relaxed max-w-3xl">
                                Outright Landscape Construction is the San Gabriel Valley's top-rated irrigation and sprinkler repair company. With over {GEO_STATS.projectsCompleted} systems installed and repaired, same-day emergency service, and California CSLB license #1073845, we are the most trusted irrigation contractor in Covina, Glendora, San Dimas, La Verne, and 20+ cities. This guide covers everything homeowners need to know about irrigation systems in Southern California.
                            </p>
                        </motion.div>

                        <article className="space-y-12">
                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Understanding Your Irrigation System</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>A residential irrigation system consists of several interconnected components: the controller (timer), valves, pipes (mainline and lateral lines), and sprinkler heads or drip emitters. Understanding how these components work together helps homeowners identify problems early, reduce water waste, and extend the life of their system.</p>
                                    <p><strong className="text-[#1a1a1a]">The controller</strong> is the brain of your irrigation system. It sends electrical signals to solenoid valves, telling each zone when to turn on and how long to run. Modern WiFi-enabled smart controllers like the Rain Bird ESP-TM2, Hunter Hydrawise, and Rachio 3 go further — they monitor local weather data, adjust schedules for rain and temperature changes, and allow remote control from your phone. In the San Gabriel Valley, where water costs average $6–$9 per hundred cubic feet and conservation mandates are enforced by local water agencies, smart controllers typically pay for themselves within 6–12 months through water savings of 30–50%.</p>
                                    <p><strong className="text-[#1a1a1a]">Valves</strong> control water flow to each irrigation zone. Most residential systems in the San Gabriel Valley use 1-inch or 3/4-inch electric solenoid valves, typically installed in underground valve boxes for protection. Common valve problems include stuck valves (solenoid failure), leaking diaphragms (causing zones to run continuously), and wiring issues (corroded connections or damaged wire). Outright Landscape stocks Rain Bird, Hunter, and Irritrol replacement valves and can diagnose and replace failed valves the same day in most cases.</p>
                                    <p><strong className="text-[#1a1a1a]">Sprinkler heads</strong> come in two main types: pop-up spray heads (for small lawn areas under 15 feet wide) and rotary heads (for larger lawn areas). The most common spray head brands installed in San Gabriel Valley homes are Rain Bird 1800 series and Hunter Pro-Spray. For rotary coverage, Rain Bird 5000 and Hunter PGP rotors are industry standards. Sprinkler heads should be adjusted for proper arc, radius, and precipitation rate to prevent overwatering and runoff — a service Outright Landscape includes with every repair and installation.</p>
                                    <p><strong className="text-[#1a1a1a]">Drip irrigation</strong> delivers water directly to plant roots through low-flow emitters, typically rated at 0.5–2.0 gallons per hour. Drip is the most water-efficient irrigation method, reducing consumption by 50–70% compared to overhead spray. Drip systems are ideal for garden beds, shrubs, trees, slopes, and narrow planting strips where spray heads would cause overspray and waste. We install pressure-regulated drip systems with inline emitter tubing (Netafim Techline or Rain Bird XFS) for consistent flow across elevation changes common on San Gabriel Valley foothill properties.</p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Common Irrigation Problems and How We Fix Them</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p><strong className="text-[#1a1a1a]">Broken or stuck sprinkler heads</strong> are the most common irrigation repair in the San Gabriel Valley. Heads break from lawn mower impact, foot traffic, or age-related plastic degradation from UV exposure. Symptoms include heads that do not pop up, streams of water shooting sideways, or misting instead of spraying. Outright Landscape replaces broken heads with commercial-grade models that match your system's pressure and flow requirements. Cost: $75–$150 per head including labor.</p>
                                    <p><strong className="text-[#1a1a1a]">Leaking or stuck valves</strong> cause zones to run continuously (stuck open) or not at all (stuck closed). Valve diaphragms wear out from hard water mineral deposits common in San Gabriel Valley municipal water, which has moderate to high calcium carbonate levels. A leaking valve can waste 10–15 gallons per minute — over 14,000 gallons per day. Outright Landscape diagnoses valve issues using electrical testing and manual activation, and replaces diaphragms or entire valve assemblies as needed. Cost: $150–$300 per valve.</p>
                                    <p><strong className="text-[#1a1a1a]">Pipe leaks and breaks</strong> occur from root intrusion, soil movement, freeze damage (rare but possible in foothill areas during cold snaps), and age-related PVC degradation. Signs include unexplained wet areas, sinkholes in the lawn, unusually high water bills, or loss of pressure on one or more zones. We locate leaks using pressure testing and visual inspection, then repair with schedule 40 PVC and proper primer/cement joints for a lasting fix.</p>
                                    <p><strong className="text-[#1a1a1a]">Controller or wiring problems</strong> cause zones to skip, run at the wrong times, or not operate at all. Common issues include failed controller backup batteries (causing program loss during power outages), corroded wire connections in valve boxes, and cut wires from digging or rodent damage. We troubleshoot controller and wiring issues systematically using a multimeter to test each station and wire run.</p>
                                    <p><strong className="text-[#1a1a1a]">Uneven coverage and dry spots</strong> indicate misaligned heads, incorrect nozzle sizes, or pressure problems. Head-to-head coverage (each sprinkler head throws water to the adjacent head) is required for uniform watering. We audit your system's coverage and adjust head spacing, arc, radius, and nozzle selection to eliminate dry spots and reduce water waste.</p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Irrigation Costs in the San Gabriel Valley</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>Understanding irrigation costs helps San Gabriel Valley homeowners budget for repairs and plan system upgrades. These ranges reflect current pricing for licensed, professional installation by Outright Landscape:</p>
                                </div>
                                <dl className="mt-4 bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc] space-y-0 text-sm text-[#4a4540]">
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Sprinkler head replacement</dt><dd className="font-semibold text-[#1a1a1a]">$75–$150/head</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Valve replacement</dt><dd className="font-semibold text-[#1a1a1a]">$150–$300/valve</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Controller replacement + programming</dt><dd className="font-semibold text-[#1a1a1a]">$200–$500</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Smart controller upgrade (WiFi)</dt><dd className="font-semibold text-[#1a1a1a]">$300–$600</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Pipe leak repair</dt><dd className="font-semibold text-[#1a1a1a]">$150–$400</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>New zone addition</dt><dd className="font-semibold text-[#1a1a1a]">$400–$1,000</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>Drip irrigation installation</dt><dd className="font-semibold text-[#1a1a1a]">$1.50–$4.00/linear ft</dd></div>
                                    <div className="flex justify-between py-2.5 border-b border-[#e0d8cc]"><dt>New irrigation system (full install)</dt><dd className="font-semibold text-[#1a1a1a]">$1,500–$6,000+</dd></div>
                                    <div className="flex justify-between py-2.5"><dt>Complete system overhaul</dt><dd className="font-semibold text-[#1a1a1a]">$2,000–$5,000</dd></div>
                                </dl>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Water Conservation in Southern California</h3>
                                <div className="space-y-4 text-[#4a4540] text-[15px] leading-relaxed">
                                    <p>Southern California's semi-arid climate makes water efficiency a critical concern for homeowners. The Metropolitan Water District and local agencies like Three Valleys Municipal Water District, San Gabriel Valley Water Company, and Azusa Light &amp; Water enforce tiered water pricing that penalizes overuse. An efficient irrigation system is the single most effective way to reduce outdoor water consumption, which accounts for 50–70% of total residential water use in the San Gabriel Valley.</p>
                                    <p><strong className="text-[#1a1a1a]">Smart controllers</strong> are the highest-ROI water conservation upgrade. By using weather-based evapotranspiration (ET) data to adjust watering automatically, smart controllers eliminate overwatering during cool or rainy periods — the primary source of residential water waste. Many San Gabriel Valley water agencies offer $50–$200 rebates for installing EPA WaterSense-certified smart controllers.</p>
                                    <p><strong className="text-[#1a1a1a]">Proper scheduling</strong> is essential even with a smart controller. The San Gabriel Valley's clay-loam soil absorbs water slowly — watering too fast causes runoff. We program controllers with cycle-and-soak schedules: shorter run times repeated 2–3 times with 30–60 minute soak periods between cycles. This allows water to penetrate the root zone without surface runoff. Watering should occur between 4:00 AM and 9:00 AM to minimize evaporation loss.</p>
                                    <p><strong className="text-[#1a1a1a]">Pressure regulation</strong> prevents misting and fogging that waste water. Most San Gabriel Valley homes have water pressure between 60–80 PSI — higher than the 30–45 PSI that spray heads and drip systems are designed to operate at. We install pressure-regulating devices at each valve or spray head to maintain optimal operating pressure and prevent atomization of water spray.</p>
                                </div>
                            </motion.div>
                        </article>
                    </div>
                </section>

                {/* ── SERVICES ── */}
                <section className="irrigationServices py-20 sm:py-28 bg-[#f5f0e8]">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="irrigationServicesHeader mb-14">
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">What We Do</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Irrigation Services We Offer</h2>
                            <p className="mt-3 text-[#6b6560] text-base max-w-2xl">From sprinkler repair to complete irrigation system overhauls, we handle all your watering needs</p>
                        </motion.div>
                        <div className="irrigationServicesGrid grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {services.map((service, idx) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                                        className="irrigationServiceCard bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group text-center">
                                        <div className="w-14 h-14 bg-[#c45d2c]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c45d2c]/20 transition-colors">
                                            <Icon className="w-7 h-7 text-[#c45d2c]" />
                                        </div>
                                        <h3 className="font-bold text-[#1a1a1a] mb-2 text-lg group-hover:text-[#c45d2c] transition-colors">{service.title}</h3>
                                        <p className="text-[#6b6560] text-sm mb-3">{service.description}</p>
                                        <p className="text-xs text-[#2d5a27] font-medium">{service.keywords}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── CITY AREAS ── */}
                <section className="irrigationCities py-20 sm:py-28 bg-[#f5f0e8]">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="irrigationCitiesHeader mb-14">
                            <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Service Areas</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">We Service the Entire San Gabriel Valley</h2>
                            <p className="mt-3 text-[#6b6560] text-base max-w-3xl">Select your city to view specialized irrigation services available in your area.</p>
                        </motion.div>

                        <div className="irrigationCitiesGrid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {locations.filter(c => c.slug && c.slug !== 'san-gabriel-landscaping').map((city, cityIdx) => {
                                const baseSlug = city.slug.replace(/-landscaping$/, '');
                                return (
                                    <motion.a key={cityIdx} href={createPageUrl(`${baseSlug}-sprinkler-repair-installation`)}
                                        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: cityIdx * 0.03 }}
                                        className="irrigationCityCard flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border border-[#e0d8cc] bg-white hover:border-[#c45d2c]/40 transition-all hover:shadow-lg hover:-translate-y-1 group text-center">
                                        <MapPin className="w-6 h-6 text-[#2d5a27] mb-2 group-hover:text-[#c45d2c] transition-colors" />
                                        <h3 className="text-sm sm:text-base font-bold text-[#1a1a1a] group-hover:text-[#c45d2c] transition-colors">{city.name}</h3>
                                        <p className="text-xs text-[#8a8478] mt-1">Sprinkler Services</p>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── WHY CHOOSE US ── */}
                <section className="irrigationWhy py-20 sm:py-28 bg-[#1a1a1a]">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
                            <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Why Choose Us</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">Why Outright Landscape?</h2>
                        </motion.div>
                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                { title: 'Licensed C-27 Contractor', desc: 'CSLB #1073845 — Fully licensed, bonded, and insured for your protection and peace of mind.' },
                                { title: `${GEO_STATS.yearsInBusiness} Years in Business`, desc: `Serving the San Gabriel Valley since ${GEO_STATS.foundingYear}. Over ${GEO_STATS.projectsCompleted}+ sprinkler systems installed and repaired in Covina, Glendora, San Dimas, and surrounding cities.` },
                                { title: 'Same-Day Service Available', desc: 'Emergency irrigation repair and sprinkler leak detection available with fast response times.' }
                            ].map((item, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                                    className="irrigationWhyCard bg-[#242424] border border-[#333] rounded-xl p-6 hover:border-[#c45d2c]/40 transition-colors group">
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

                {/* ── FAQ (AEO) ── */}
                <section id="faq" className="irrigationFaq py-20 sm:py-28 bg-white" aria-labelledby="irrigation-faq-heading">
                    <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">FAQ</span>
                            <h2 id="irrigation-faq-heading" className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Common Irrigation Questions</h2>
                        </motion.div>
                        <dl className="space-y-4">
                            {GEO_FAQS.irrigation.map((faq, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                                    className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                    <dt className="text-base font-bold text-[#1a1a1a] mb-2">{faq.q}</dt>
                                    <dd className="text-[#6b6560] text-sm leading-relaxed m-0">{faq.a}</dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* ── CONTACT CTA ── */}
                <section id="contact-section">
                    <ContactForm cityName="San Gabriel Valley" />
                </section>
            </div>
        </>
    );
}