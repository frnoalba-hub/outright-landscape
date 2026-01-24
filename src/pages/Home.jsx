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
                title="Outright Landscape | Licensed Covina Landscaping Contractor - Pavers, Sod & Irrigation"
                description="Professional landscape contractor in Covina serving San Gabriel Valley. Expert paver installation, sod, irrigation systems & hardscaping. Licensed C-27 #1073845. 10+ years experience. Free estimates. Call (626) 343-6028."
                keywords="landscape contractor covina, licensed landscaping covina, paver installation covina, sod installation covina, irrigation systems covina, hardscape covina, landscaping san gabriel valley, C-27 contractor"
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
                title={<>The San Gabriel Valley's<br /><span className="text-green-400">Most Trusted Landscape & Irrigation Contractor</span></>}
                subtitle="Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas & the San Gabriel Valley"
                description="Expert Pavers • Turf Installation • Irrigation Systems • Hardscaping"
                phoneNumber="626-343-6028"
                trackPhoneClick={handlePhoneClick}
                trackQuoteClick={handleQuoteClick}
                trackViewServicesClick={() => trackEvent('view_services_click', { event_category: 'navigation', event_label: 'hero_section' })}
                backgroundImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                backgroundImageAlt="cdeefde95_2024-09-14.jpg - Outright Landscape Covina"
            />

            {/* Services Section */}
            <section id="services" className="py-20 sm:py-24 md:py-28 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <div className="inline-block mb-6">
                            <div className="bg-green-100 border-2 border-green-600 px-6 py-2 rounded-full">
                                <span className="text-green-700 font-bold uppercase tracking-wider text-sm">Premium Services</span>
                            </div>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-5 tracking-tight leading-tight uppercase">
                            Professional Landscaping Services
                        </h2>
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed font-medium">
                            Covina, Glendora & San Dimas • Expert Craftsmanship
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
                                className="group bg-white overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border-4 border-gray-900 relative"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-500"></div>
                                <div className="relative h-56 sm:h-64 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={`${service.title} in Covina, Glendora, San Dimas - Outright Landscape`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0"
                                        loading="lazy"
                                        width="400"
                                        height="300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                                    <div className="absolute top-4 right-4">
                                        <div className="bg-green-500 p-3.5 rotate-12 group-hover:rotate-0 transition-transform duration-500 border-2 border-white shadow-xl">
                                            <service.icon className="w-7 h-7 text-white" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 leading-tight uppercase tracking-wide">{service.title}</h3>
                                    <div className="w-16 h-1 bg-green-500 mb-4"></div>
                                    <p className="text-gray-700 text-base mb-5 leading-relaxed font-medium">{service.description}</p>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-800 font-semibold">
                                                <div className="w-6 h-6 bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                                                    <CheckCircle2 className="w-4 h-4 text-white" aria-hidden="true" />
                                                </div>
                                                <span>{feature}</span>
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
            <section id="work" className="py-12 sm:py-16 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <span className="inline-block bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-xs font-semibold mb-3">Our Portfolio</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Recent Projects
                        </h2>
                        <p className="text-sm text-gray-400">
                            Transforming Outdoor Spaces Across the San Gabriel Valley
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {projects.map((project, index) => (
                            <motion.article 
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-400 aspect-[4/3] rounded-lg border border-gray-700"
                            >
                                <img
                                    src={project.image}
                                    alt={project.alt}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    width="400"
                                    height="300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                                <div className="absolute top-2 left-2">
                                    <span className="bg-green-500 px-2 py-0.5 rounded text-white text-[10px] font-semibold uppercase">
                                        Project
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight mb-1">{project.title}</h3>
                                    <p className="text-green-400 flex items-center text-xs font-medium">
                                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
                                        {project.location}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-center mt-8"
                    >
                        <a href="tel:626-343-6028" aria-label="Start your landscaping project today" onClick={() => handleQuoteClick('projects_section')}>
                            <Button size="default" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all">
                                Start Your Project Today
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Service Areas */}
            <section id="service-areas" className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold mb-3">Service Areas</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            San Gabriel Valley
                        </h2>
                        <p className="text-sm text-gray-600">
                            Professional Landscape Construction • 20+ Cities
                        </p>
                    </motion.div>

                    <nav aria-label="Service areas" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                        {locations.map((city, index) => {
                            return (
                                <motion.a
                                    href={`${createPageUrl('ServiceArea')}?city=${city.slug}`}
                                    key={city.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.015 }}
                                    className="group"
                                    aria-label={`Landscaping services in ${city.name}`}
                                >
                                    <div className="bg-gray-800 hover:bg-green-500 rounded-lg transition-all duration-300 p-3 text-center group-hover:scale-102 shadow-md">
                                        <MapPin className="w-4 h-4 mx-auto mb-1 text-green-500 group-hover:text-white transition-colors" aria-hidden="true" />
                                        <span className="text-xs font-semibold text-white block">
                                            {city.name}
                                        </span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </nav>
                </div>
            </section>

            {/* Social Proof Stats */}
            <section className="py-12 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">10+</div>
                            <div className="text-sm text-gray-400">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">500+</div>
                            <div className="text-sm text-gray-400">Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">4.8★</div>
                            <div className="text-sm text-gray-400">Google Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">100%</div>
                            <div className="text-sm text-gray-400">Licensed & Insured</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Reviews with AI Summary */}
            <GoogleReviews />

            {/* Why Choose Us */}
            <section className="py-12 sm:py-16 bg-green-500 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-white text-xs font-semibold mb-3">Why Choose Us</span>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                            Outright Landscape
                        </h2>
                        <p className="text-sm text-white/90">
                            Quality • Integrity • Excellence
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { icon: Shield, title: "Licensed & Insured", desc: "CSLB #1073845" },
                            { icon: Zap, title: "Expert Team", desc: "Skilled craftsmen" },
                            { icon: Star, title: "Quality Materials", desc: "Premium products" },
                            { icon: Target, title: "Free Estimates", desc: "No hidden fees" }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="text-center p-4 bg-gray-900 rounded-lg"
                            >
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <item.icon className="w-5 h-5 text-green-400" aria-hidden="true" />
                                </div>
                                <h3 className="text-xs font-semibold mb-1">{item.title}</h3>
                                <p className="text-[10px] text-white/70">{item.desc}</p>
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