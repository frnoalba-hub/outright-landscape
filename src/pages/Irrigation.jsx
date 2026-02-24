import React, { useEffect, useRef, useState } from 'react';
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
import SEO from '../components/SEO';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ContactForm from '@/components/ContactForm';

export default function Irrigation() {
    const handlePhoneClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'phone_click', event_category: 'engagement', event_label: 'irrigation-hub', phone_number: '626-343-6028' });
        }
    };

    const scrollToForm = () => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
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
            <SEO 
                title="Irrigation & Sprinkler Repair | La Verne, San Dimas, Glendora CA"
                description="Professional sprinkler repair, irrigation valve service, and drip system installation in La Verne, San Dimas, and Glendora. Licensed C-27 contractor. Same-day service available. Call (626) 343-6028."
                canonicalUrl="https://outrightlandscape.com/Irrigation"
                keywords="irrigation repair, sprinkler repair, irrigation valve repair, drip irrigation, sprinkler system repair, la verne irrigation, san dimas sprinkler repair, glendora irrigation"
                ogImage="/images/01c14d800_unnamed2-Copy.jpg"
                ogType="website"
            />

            <div className="irrigationPageWrapper min-h-screen bg-white">
                {/* ── HERO ── */}
                <section className="irrigationHero relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]">
                    <div className="absolute inset-0 sm:left-[40%]">
                        <img src="/images/01c14d800_unnamed2-Copy.jpg" alt="Professional irrigation installation" className="w-full h-full object-cover" fetchpriority="high" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/75 sm:to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
                    </div>

                    <div className="irrigationHeroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:py-0">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-xl space-y-6">
                            <div className="irrigationHeroBadge inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                                <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">San Gabriel Valley</span>
                            </div>
                            <h1 className="irrigationHeroHeadline text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                                <span className="font-light">Sprinkler &</span><br />
                                <span className="font-bold text-[#c45d2c]">Irrigation Repair</span><br />
                                <span className="font-light">Services</span>
                            </h1>
                            <p className="irrigationHeroSubtitle text-[#a09a90] text-base sm:text-lg leading-relaxed max-w-md">
                                Expert irrigation repair, sprinkler valve service, and drip system installation. Licensed C-27 contractor with 10+ years experience.
                            </p>
                            <div className="irrigationHeroCtas flex flex-col sm:flex-row gap-3 pt-2">
                                <a href="tel:626-343-6028" onClick={handlePhoneClick} className="w-full sm:w-auto">
                                    <Button className="w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-base px-7 py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:scale-[1.02] min-w-[240px]">
                                        <Phone className="mr-2.5 w-5 h-5" />(626) 343-6028
                                    </Button>
                                </a>
                                <Button variant="outline" onClick={scrollToForm} className="w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-base px-7 py-6 rounded-xl transition-all min-w-[240px]">
                                    Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
                </section>

                {/* ── STATS ── */}
                <section className="irrigationStats py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                            {[{ end: 250, suffix: '+', label: 'Repairs Completed' }, { raw: '24hr', label: 'Response Time' }, { end: 10, suffix: '+', label: 'Years Experience' }, { end: 100, suffix: '%', label: 'Licensed & Insured' }].map((stat, i) => (
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

                {/* ── SERVICES ── */}
                <section className="irrigationServices py-20 sm:py-28 bg-white">
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
                                { title: 'Licensed C-27 Contractor', desc: 'CSLB #1073845 - Fully licensed, bonded, and insured for your protection and peace of mind.' },
                                { title: '10+ Years Local Experience', desc: 'Serving the San Gabriel Valley since 2003 with expert irrigation repair and installation.' },
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

                {/* ── CONTACT CTA ── */}
                <section id="contact-section">
                    <ContactForm cityName="San Gabriel Valley" />
                </section>
            </div>
        </>
    );
}