import React from 'react';
import { createPageUrl } from '@/utils';
import { MapPin, Shield, Zap, Star, Target, Waves, Leaf, Hammer, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

import SEO from '@/components/SEO';
import ServiceSchema from '@/components/ServiceSchema';

import ContactForm from '@/components/ContactForm';

import HomeHero from '@/components/home/HomeHero';
import HomeServices from '@/components/home/HomeServices';
import HomeProcess from '@/components/home/HomeProcess';
import HomePortfolio from '@/components/home/HomePortfolio';
import GoogleReviews from '@/components/GoogleReviews';
import { getGoogleReviews } from '@/functions/getGoogleReviews';

/* ── static data ── */
const services = [
    {
        title: 'Professional Irrigation Systems',
        description: 'Expert irrigation and sprinkler system installation for efficient watering and water conservation.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/5824aca26_generated_image.png',
        icon: Waves,
        features: ['Drip Systems', 'Smart Controllers', 'Water-Efficient Design'],
    },
    {
        title: 'Premium Turf & Sod Installation',
        description: 'Lush, healthy lawns with premium Marathon tall fescue and hybrid Bermuda grass varieties.',
        image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/f8652a9f2_generated_image.png',
        icon: Leaf,
        features: ['Premium Sod', 'Artificial Turf', 'Lawn Renovation'],
    },
    {
        title: 'Hardscaping & Paver Installation',
        description: 'Beautiful patios, walkways, and custom hardscape features built to last with expert craftsmanship.',
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

    const { data: reviewsData } = useQuery({
        queryKey: ['googleReviews'],
        queryFn: async () => {
            const response = await getGoogleReviews({});
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
        <div className="homePageWrapper bg-white">
            {/* SEO & Schemas */}
            <SEO
                title="Outright Landscape | Licensed Covina Landscaping Contractor - Pavers, Sod & Irrigation"
                description="Professional landscape contractor in Covina serving San Gabriel Valley. Expert paver installation, sod, irrigation systems & hardscaping. Licensed C-27 #1073845. 10+ years experience. Free estimates. Call (626) 343-6028."
                keywords="landscape contractor covina, licensed landscaping covina, paver installation covina, sod installation covina, irrigation systems covina, hardscape covina, landscaping san gabriel valley, C-27 contractor"
                canonicalUrl="https://outrightlandscape.com"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png"
                ogType="website"
            />
            <ServiceSchema serviceType="paver-installation" />
            <ServiceSchema serviceType="turf-installation" />
            <ServiceSchema serviceType="irrigation-systems" />
            <ServiceSchema serviceType="hardscaping" />

            {/* ── 1. HERO ── */}
            <HomeHero 
                onPhoneClick={handlePhoneClick} 
                onQuoteClick={handleQuoteClick}
                reviews={reviewsData?.reviews}
                totalReviewCount={reviewsData?.totalReviewCount}
                averageRating={reviewsData?.averageRating}
            />

            {/* ── 2. STATS BAR ── */}
            <section className="statsSection py-0 bg-[#f5f0e8] border-b border-[#e0d8cc]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e0d8cc]">
                        {[
                            { value: '10+', label: 'Years Experience' },
                            { value: reviewsData?.totalReviewCount ? `${reviewsData.totalReviewCount}+` : '250+', label: 'Reviews Posted' },
                            { value: '4.8★', label: 'Google Rating' },
                            { value: '100%', label: 'Licensed & Insured' },
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
                                    {stat.value}
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

            {/* ── 5. PROCESS ── */}
            <HomeProcess />

            {/* ── 6. PORTFOLIO ── */}
            <HomePortfolio projects={projects} onCtaClick={() => handleQuoteClick('projects_section')} />

            {/* ── 7. SERVICE AREAS ── */}
            <section id="service-areas" className="serviceAreasSection py-20 sm:py-28 bg-[#f5f0e8]">
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
                        <h2 className="areasTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">
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
            <section className="whyChooseSection py-20 sm:py-28 bg-[#1a1a1a] relative overflow-hidden">
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
                            <h2 className="whyTitle text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
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

                    <div className="whyGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {reasons.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="reasonCard bg-[#242424] border border-[#333] rounded-xl p-6 hover:border-[#c45d2c]/40 transition-all group"
                            >
                                <div className="reasonIcon w-12 h-12 bg-[#c45d2c]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#c45d2c]/20 transition-colors">
                                    <item.icon className="w-6 h-6 text-[#c45d2c]" aria-hidden="true" />
                                </div>
                                <h3 className="reasonTitle text-white font-bold text-base mb-2">{item.title}</h3>
                                <p className="reasonDesc text-[#8a8478] text-sm leading-relaxed">{item.desc}</p>
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