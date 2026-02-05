import React from 'react';
import { createPageUrl } from '@/utils';
import { MapPin, Shield, Zap, Star, Target, Waves, Leaf, Hammer, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

import SEO from '@/components/SEO';
import ServiceSchema from '@/components/ServiceSchema';
import GoogleReviews from '@/components/GoogleReviews';
import ContactForm from '@/components/ContactForm';

import HomeHero from '@/components/home/HomeHero';
import HomeServices from '@/components/home/HomeServices';
import HomeProcess from '@/components/home/HomeProcess';
import HomePortfolio from '@/components/home/HomePortfolio';

/* ── static data ── */
const services = [
    {
        title: 'Professional Irrigation Systems',
        description: 'Expert irrigation and sprinkler system installation for efficient watering and water conservation.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg',
        icon: Waves,
        features: ['Drip Systems', 'Smart Controllers', 'Water-Efficient Design'],
    },
    {
        title: 'Premium Turf & Sod Installation',
        description: 'Lush, healthy lawns with premium Marathon tall fescue and hybrid Bermuda grass varieties.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg',
        icon: Leaf,
        features: ['Premium Sod', 'Artificial Turf', 'Lawn Renovation'],
    },
    {
        title: 'Hardscaping & Paver Installation',
        description: 'Beautiful patios, walkways, and custom hardscape features built to last with expert craftsmanship.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg',
        icon: Hammer,
        features: ['Paver Patios', 'Walkways', 'Retaining Walls'],
    },
    {
        title: 'Complete Landscape Design',
        description: 'Transform your outdoor space with our expert landscape design and construction services.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg',
        icon: Palette,
        features: ['Custom Design', 'Professional Installation', 'Native Plants'],
    },
];

const projects = [
    { title: 'Premium Turf Installation', location: 'Covina, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg', alt: 'Premium Turf Installation - Outright Landscape Covina' },
    { title: 'Irrigation Valve Installation', location: 'La Verne, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/01c14d800_unnamed2-Copy.jpg', alt: 'Irrigation Valve Installation - Outright Landscape La Verne' },
    { title: 'Professional Irrigation Setup', location: 'Glendora, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c734704d4_IMG_4815-Copy.jpg', alt: 'Professional Irrigation Setup - Outright Landscape Glendora' },
    { title: 'Irrigation Valve Repair', location: 'San Dimas, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c77326177_IMG_4971-Copy.jpg', alt: 'Irrigation Valve Repair - Outright Landscape San Dimas' },
    { title: 'Underground Irrigation System', location: 'Covina, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/eb74e1b87_IMG_37521-Copy.jpg', alt: 'Underground Irrigation System - Outright Landscape Covina' },
    { title: 'Multi-Zone Irrigation Valves', location: 'West Covina, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/f03bb2890_IMG_3851-Copy.jpg', alt: 'Multi-Zone Irrigation Valves - Outright Landscape West Covina' },
    { title: 'Irrigation Valve Box Setup', location: 'Glendora, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/723adf744_IMG_3731-Copy.jpg', alt: 'Irrigation Valve Box Setup - Outright Landscape Glendora' },
    { title: 'Front Yard Driveway Pavers', location: 'San Dimas, CA', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg', alt: 'Front Yard Driveway Pavers - Outright Landscape San Dimas' },
];

const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '4.8★', label: 'Google Rating' },
    { value: '100%', label: 'Licensed & Insured' },
];

const reasons = [
    { icon: Shield, title: 'Licensed & Insured', desc: 'C-27 License CSLB #1073845 — full liability coverage for your peace of mind.' },
    { icon: Zap, title: 'Expert Craftsmen', desc: 'Skilled professionals with decades of combined hands-on experience.' },
    { icon: Star, title: 'Premium Materials', desc: 'We source only top-grade products for lasting beauty and durability.' },
    { icon: Target, title: 'Free Estimates', desc: 'Transparent pricing with no hidden fees — know exactly what you\'re paying.' },
];

/* ── component ── */
export default function Home() {
    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 100),
        initialData: [],
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
        <div className="homePageWrapper bg-white">
            {/* SEO & Schemas */}
            <SEO
                title="Outright Landscape | Licensed Covina Landscaping Contractor - Pavers, Sod & Irrigation"
                description="Professional landscape contractor in Covina serving San Gabriel Valley. Expert paver installation, sod, irrigation systems & hardscaping. Licensed C-27 #1073845. 10+ years experience. Free estimates. Call (626) 343-6028."
                keywords="landscape contractor covina, licensed landscaping covina, paver installation covina, sod installation covina, irrigation systems covina, hardscape covina, landscaping san gabriel valley, C-27 contractor"
                canonicalUrl="https://outrightlandscape.com"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                ogType="website"
            />
            <ServiceSchema serviceType="paver-installation" />
            <ServiceSchema serviceType="turf-installation" />
            <ServiceSchema serviceType="irrigation-systems" />
            <ServiceSchema serviceType="hardscaping" />

            {/* ── 1. HERO ── */}
            <HomeHero onPhoneClick={handlePhoneClick} onQuoteClick={handleQuoteClick} />

            {/* ── 2. STATS ── */}
            <section className="statsSection py-16 sm:py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl" />
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="statItem text-center"
                            >
                                <div className="statValue text-4xl sm:text-5xl font-bold text-white mb-1.5 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="statLabel text-green-200/80 text-xs sm:text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. SERVICES ── */}
            <HomeServices services={services} />

            {/* ── 4. PROCESS ── */}
            <HomeProcess />

            {/* ── 5. PORTFOLIO ── */}
            <HomePortfolio projects={projects} onCtaClick={() => handleQuoteClick('projects_section')} />

            {/* ── 6. REVIEWS ── */}
            <GoogleReviews />

            {/* ── 7. SERVICE AREAS ── */}
            <section id="service-areas" className="serviceAreasSection py-20 sm:py-28 bg-[#faf9f6]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-px w-8 bg-green-600" />
                            <span className="text-green-700 uppercase tracking-[0.2em] text-[11px] font-bold">Service Areas</span>
                            <div className="h-px w-8 bg-green-600" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                            Serving the San Gabriel Valley
                        </h2>
                        <p className="mt-3 text-gray-500 text-base">
                            Professional landscape construction&nbsp;•&nbsp;{locations.length}+ cities
                        </p>
                    </motion.div>

                    <nav aria-label="Service areas" className="flex flex-wrap justify-center gap-2.5">
                        {locations.map((city, index) => (
                            <motion.a
                                key={city.name}
                                href={`${createPageUrl('ServiceArea')}?city=${city.slug}`}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.02 }}
                                className="areaTag inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-green-700 transition-all shadow-sm hover:shadow-md"
                                aria-label={`Landscaping services in ${city.name}`}
                            >
                                <MapPin className="w-3 h-3 text-green-500 flex-shrink-0" aria-hidden="true" />
                                {city.name}
                            </motion.a>
                        ))}
                    </nav>
                </div>
            </section>

            {/* ── 8. WHY CHOOSE US ── */}
            <section className="whyChooseSection py-20 sm:py-28 bg-gray-950 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-px w-8 bg-green-500/70" />
                            <span className="text-green-400 uppercase tracking-[0.2em] text-[11px] font-bold">
                                Why Choose Us
                            </span>
                            <div className="h-px w-8 bg-green-500/70" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Built on Trust &amp; Quality
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {reasons.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="reasonCard bg-gray-900/80 border border-gray-800 rounded-2xl p-6 text-center hover:border-green-500/40 transition-colors"
                            >
                                <div className="reasonIcon w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-6 h-6 text-green-400" aria-hidden="true" />
                                </div>
                                <h3 className="reasonTitle text-white font-bold text-base mb-2">{item.title}</h3>
                                <p className="reasonDesc text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 9. CONTACT FORM ── */}
            <ContactForm cityName="Covina & San Gabriel Valley" />
        </div>
    );
}