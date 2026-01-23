import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { MapPin, Phone, CheckCircle2, Award, Users, Clock, Waves, Leaf, Hammer, Palette, Sparkles, Zap, Target, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import ServiceSchema from '@/components/ServiceSchema';
import SharedHero from '@/components/SharedHero';
import ContactForm from '@/components/ContactForm';
import GoogleReviews from '@/components/GoogleReviews';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const services = [
    {
        title: "Professional Irrigation Systems",
        description: "Expert irrigation and sprinkler system installation for efficient watering and water conservation.",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg",
        icon: Waves,
        features: ["Drip Systems", "Smart Controllers", "Water-Efficient Design"]
    },
    {
        title: "Premium Turf & Sod Installation",
        description: "Lush, healthy lawns with premium Marathon tall fescue and hybrid Bermuda grass varieties.",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
        icon: Leaf,
        features: ["Premium Sod", "Artificial Turf", "Lawn Renovation"]
    },
    {
        title: "Hardscaping & Paver Installation",
        description: "Beautiful patios, walkways, and custom hardscape features built to last with expert craftsmanship.",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
        icon: Hammer,
        features: ["Paver Patios", "Walkways", "Retaining Walls"]
    },
    {
        title: "Complete Landscape Design",
        description: "Transform your outdoor space with our expert landscape design and construction services.",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg",
        icon: Palette,
        features: ["Custom Design", "Professional Installation", "Native Plants"]
    }
];

const projects = [
    {
        title: "Premium Turf Installation",
        location: "Covina, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
        alt: "Premium Turf Installation - Outright Landscape Covina"
    },
    {
        title: "Irrigation Valve Installation",
        location: "La Verne, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/01c14d800_unnamed2-Copy.jpg",
        alt: "Irrigation Valve Installation - Outright Landscape La Verne"
    },
    {
        title: "Professional Irrigation Setup",
        location: "Glendora, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c734704d4_IMG_4815-Copy.jpg",
        alt: "Professional Irrigation Setup - Outright Landscape Glendora"
    },
    {
        title: "Irrigation Valve Repair",
        location: "San Dimas, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c77326177_IMG_4971-Copy.jpg",
        alt: "Irrigation Valve Repair - Outright Landscape San Dimas"
    },
    {
        title: "Underground Irrigation System",
        location: "Covina, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/eb74e1b87_IMG_37521-Copy.jpg",
        alt: "Underground Irrigation System - Outright Landscape Covina"
    },
    {
        title: "Multi-Zone Irrigation Valves",
        location: "West Covina, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/f03bb2890_IMG_3851-Copy.jpg",
        alt: "Multi-Zone Irrigation Valves - Outright Landscape West Covina"
    },
    {
        title: "Irrigation Valve Box Setup",
        location: "Glendora, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/723adf744_IMG_3731-Copy.jpg",
        alt: "Irrigation Valve Box Setup - Outright Landscape Glendora"
    },
    {
        title: "Front Yard Driveway Pavers",
        location: "San Dimas, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
        alt: "Front Yard Driveway Pavers - Outright Landscape San Dimas"
    },
    {
        title: "Irrigation System Installation",
        location: "La Verne, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg",
        alt: "Irrigation System Installation - Outright Landscape La Verne"
    },
    {
        title: "Irrigation Controller Installation",
        location: "Covina, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/701510e0a_IMG_2662.jpg",
        alt: "Irrigation Controller Installation - Outright Landscape Covina"
    },
    {
        title: "Complete Irrigation Valve Manifold",
        location: "Glendora, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/957a12859_IMG_3669.jpg",
        alt: "Complete Irrigation Valve Manifold - Outright Landscape Glendora"
    },
    {
        title: "Professional Irrigation Maintenance",
        location: "San Dimas, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/27d11d89c_IMG_3076.jpg",
        alt: "Professional Irrigation Maintenance - Outright Landscape San Dimas"
    }
];

export default function Home() {
    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 100),
        initialData: []
    });

    // Track button clicks
    const trackEvent = (eventName, eventData = {}) => {
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...eventData
            });
        }
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, eventData);
        }
    };

    const handlePhoneClick = (location) => {
        trackEvent('phone_click', {
            event_category: 'engagement',
            event_label: location,
            phone_number: '626-343-6028',
            value: 1
        });
    };

    const handleQuoteClick = (location) => {
        trackEvent('request_quote', {
            event_category: 'conversion',
            event_label: location,
            value: 1
        });
        
        // Also track as free quote request
        trackEvent('free_quote_request', {
            event_category: 'lead_generation',
            event_label: location,
            submission_method: 'quote_button'
        });
    };

    return (
        <div className="bg-white">
            {/* Removed inline style tag for hero section mobile styling as it will now be handled by SharedHero */}

            <SEO
                title="Outright Landscape | Covina Sod, Pavers & Irrigation Experts"
                description="Covina's trusted landscape contractor specializing in sod installation, paver patios, concrete work, and irrigation systems. Free AI design preview. Licensed C-27. Call (626) 343-6028."
                keywords="landscape contractor covina, sod installation covina, paver installation covina, concrete contractor covina, irrigation systems covina, landscaping san gabriel valley, hardscape covina"
                canonicalUrl="https://outrightlandscape.com"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                ogType="website"
            />
            
            {/* Add all service schemas */}
            <ServiceSchema serviceType="paver-installation" />
            <ServiceSchema serviceType="turf-installation" />
            <ServiceSchema serviceType="irrigation-systems" />
            <ServiceSchema serviceType="hardscaping" />

            {/* Hero Section - Replaced with SharedHero component */}
            <SharedHero 
                title={<>Transform Your<br /><span className="text-green-400">Outdoor Living Space</span></>}
                subtitle="Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas & the San Gabriel Valley"
                description="Expert Pavers • Turf Installation • Irrigation Systems • Hardscaping"
                aiCtaText="Call today for a free AI landscape design preview — see your new yard before we build it."
                phoneNumber="626-343-6028"
                trackPhoneClick={handlePhoneClick} // Pass the handler from Home
                trackQuoteClick={handleQuoteClick} // Pass the handler for the main quote button
                trackViewServicesClick={() => trackEvent('view_services_click', { event_category: 'navigation', event_label: 'hero_section' })}
                backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                backgroundImageAlt="cdeefde95_2024-09-14.jpg - Outright Landscape Covina"
            />

            {/* Services Section */}
            <section id="services" className="py-20 sm:py-24 md:py-28 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
                            Professional Landscaping Services in Covina, Glendora & San Dimas
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
                            From irrigation and turf installation to hardscaping and landscape design, we bring your outdoor vision to life with quality craftsmanship.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <motion.article 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                            >
                                <div className="relative h-56 sm:h-64 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={`${service.title} in Covina, Glendora, San Dimas - Outright Landscape`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        width="400"
                                        height="300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-3 w-fit group-hover:bg-green-500/30 transition-all">
                                            <service.icon className="w-9 h-9 sm:w-10 sm:h-10 text-green-300 group-hover:text-white transition-colors" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">{service.title}</h3>
                                    <p className="text-gray-600 text-base mb-4 leading-relaxed">{service.description}</p>
                                    <ul className="space-y-2.5">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-700">
                                                <CheckCircle2 className="w-4 h-4 text-green-600 mr-2.5 flex-shrink-0" aria-hidden="true" />
                                                <span className="font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Internal linking to city pages */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">Explore our services by location:</p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <a href={`${createPageUrl('ServiceArea')}?city=covina`} className="text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base underline">
                                Landscaping in Covina
                            </a>
                            <span className="text-gray-400">•</span>
                            <a href={`${createPageUrl('ServiceArea')}?city=glendora`} className="text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base underline">
                                Landscaping in Glendora
                            </a>
                            <span className="text-gray-400">•</span>
                            <a href={`${createPageUrl('ServiceArea')}?city=san-dimas`} className="text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base underline">
                                Landscaping in San Dimas
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Gallery */}
            <section id="work" className="py-20 sm:py-24 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
                            Recent Landscaping Projects
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
                            See how we've transformed outdoor spaces throughout Covina, Glendora, San Dimas and the San Gabriel Valley
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {projects.map((project, index) => (
                            <motion.article 
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 aspect-square border border-gray-100"
                            >
                                <img
                                    src={project.image}
                                    alt={project.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                        width="600"
                                        height="600"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl sm:text-3xl font-bold mb-2.5 leading-tight">{project.title}</h3>
                                    <p className="text-green-300 flex items-center text-base sm:text-lg font-medium">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" aria-hidden="true" />
                                        {project.location}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mt-12 sm:mt-16"
                    >
                        <a href="tel:626-343-6028" aria-label="Start your landscaping project today" onClick={() => handleQuoteClick('projects_section')}>
                            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-lg sm:text-xl px-12 sm:px-14 py-6 sm:py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                                Start Your Project Today
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Service Areas */}
            <section id="service-areas" className="py-20 sm:py-24 md:py-28 bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
                            Serving the San Gabriel Valley
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
                            Professional landscape construction services throughout Covina, Glendora, San Dimas and surrounding areas
                        </p>
                    </motion.div>

                    <nav aria-label="Service areas" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                        {locations.map((city, index) => {
                            return (
                                <motion.a
                                    href={`${createPageUrl('ServiceArea')}?city=${city.slug}`}
                                    key={city.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.02 }}
                                    className="group"
                                    aria-label={`Landscaping services in ${city.name}`}
                                >
                                    <div className="bg-white hover:bg-gradient-to-br hover:from-green-500 hover:to-green-600 border-2 border-gray-200 hover:border-green-500 transition-all duration-400 rounded-2xl p-4 sm:p-5 text-center group-hover:scale-110 group-hover:shadow-xl shadow-md">
                                        <MapPin className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2.5 text-green-600 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                                        <span className="text-sm sm:text-base font-bold text-gray-700 group-hover:text-white transition-colors duration-300 block">
                                            {city.name}
                                        </span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </nav>
                </div>
            </section>

            {/* Google Reviews with AI Summary */}
            <GoogleReviews />

            {/* Why Choose Us */}
            <section className="py-20 sm:py-24 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 tracking-tight leading-tight">
                            Why Choose Outright Landscape?
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
                            Quality workmanship, honest pricing, and exceptional customer service
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Licensed & Insured", desc: "CSLB #1073845 for your complete peace of mind" },
                            { icon: Zap, title: "Expert Team", desc: "Skilled craftsmen with years of experience" },
                            { icon: Star, title: "Quality Materials", desc: "Premium products for lasting results" },
                            { icon: Target, title: "Free Estimates", desc: "Honest, competitive pricing with no hidden fees" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-green-400/50 group"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                    <item.icon className="w-10 h-10 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-base text-gray-300 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <ContactForm cityName="Covina & San Gabriel Valley" />
        </div>
    );
}