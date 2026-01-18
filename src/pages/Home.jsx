import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { MapPin, Phone, CheckCircle2, Award, Users, Clock, Droplets, Sprout, Home as HomeIcon, Sparkles } from 'lucide-react';
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
        icon: Droplets,
        features: ["Drip Systems", "Smart Controllers", "Water-Efficient Design"]
    },
    {
        title: "Premium Turf & Sod Installation",
        description: "Lush, healthy lawns with premium Marathon tall fescue and hybrid Bermuda grass varieties.",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
        icon: Sprout,
        features: ["Premium Sod", "Artificial Turf", "Lawn Renovation"]
    },
    {
        title: "Hardscaping & Paver Installation",
        description: "Beautiful patios, walkways, and custom hardscape features built to last with expert craftsmanship.",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
        icon: HomeIcon,
        features: ["Paver Patios", "Walkways", "Retaining Walls"]
    },
    {
        title: "Complete Landscape Design",
        description: "Transform your outdoor space with our expert landscape design and construction services.",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg",
        icon: Award,
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
        title: "Irrigation Trenching",
        location: "West Covina, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/6633fbff6_2025-05-286.jpg",
        alt: "Irrigation Trenching - Outright Landscape West Covina"
    },
    {
        title: "Front Yard Driveway Pavers",
        location: "Glendora, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
        alt: "Front Yard Driveway Pavers - Outright Landscape Glendora"
    },
    {
        title: "Irrigation System Installation",
        location: "San Dimas, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg",
        alt: "Irrigation System Installation - Outright Landscape San Dimas"
    },
    {
        title: "Turf & Sprinkler System",
        location: "Pasadena, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cb31aa31a_467984156_586804077241478_5229306140253639953_n.jpg",
        alt: "Turf & Sprinkler System - Outright Landscape Pasadena"
    },
    {
        title: "Sod & Drainage Installation",
        location: "Diamond Bar, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/022683aad_2025-05-283.jpg",
        alt: "Sod & Drainage Installation - Outright Landscape Diamond Bar"
    },
    {
        title: "Front Yard Landscaping",
        location: "Covina, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/37a148223_2025-05-288.jpg",
        alt: "Front Yard Landscaping - Outright Landscape Covina"
    },
    {
        title: "Irrigation Trenching",
        location: "Glendora, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/954e6bafa_2024-09-04.jpg",
        alt: "Irrigation Trenching - Outright Landscape Glendora"
    },
    {
        title: "Side Yard Irrigation",
        location: "San Dimas, CA",
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/d1c4f81c9_2024-08-29.jpg",
        alt: "Side Yard Irrigation - Outright Landscape San Dimas"
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
            <section id="services" className="py-16 sm:py-20 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Professional Landscaping Services in Covina, Glendora & San Dimas
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            From irrigation and turf installation to hardscaping and landscape design, we bring your outdoor vision to life with quality craftsmanship.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <article key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={`${service.title} in Covina, Glendora, San Dimas - Outright Landscape`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                        width="400"
                                        height="300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mb-2" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3 sm:mb-4">{service.description}</p>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-700">
                                                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
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
            <section id="work" className="py-16 sm:py-20 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Recent Landscaping Projects
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            See how we've transformed outdoor spaces throughout Covina, Glendora, San Dimas and the San Gabriel Valley
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {projects.map((project, index) => (
                            <article key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square">
                                <img
                                    src={project.image}
                                    alt={project.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                        width="600"
                                        height="600"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-green-300 flex items-center text-sm sm:text-base">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                                        {project.location}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="text-center mt-8 sm:mt-12">
                        <a href="tel:626-343-6028" aria-label="Start your landscaping project today" onClick={() => handleQuoteClick('projects_section')}>
                            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 rounded-full">
                                Start Your Project Today
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Service Areas */}
            <section id="service-areas" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Serving the San Gabriel Valley
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            Professional landscape construction services throughout Covina, Glendora, San Dimas and surrounding areas
                        </p>
                    </div>

                    <nav aria-label="Service areas" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {locations.map(city => {
                            return (
                                <a
                                    href={`${createPageUrl('ServiceArea')}?city=${city.slug}`}
                                    key={city.name}
                                    className="group"
                                    aria-label={`Landscaping services in ${city.name}`}
                                >
                                    <div className="bg-white hover:bg-green-500 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 rounded-xl p-3 sm:p-4 text-center group-hover:scale-105 group-hover:shadow-lg">
                                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-green-600 group-hover:text-white transition-colors" aria-hidden="true" />
                                        <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
                                            {city.name}
                                        </span>
                                    </div>
                                </a>
                            );
                        })}
                    </nav>
                </div>
            </section>

            {/* Google Reviews with AI Summary */}
            <GoogleReviews />

            {/* Why Choose Us */}
            <section className="py-16 sm:py-20 md:py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            Why Choose Outright Landscape?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                            Quality workmanship, honest pricing, and exceptional customer service
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="text-center p-4 sm:p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Licensed & Insured</h3>
                            <p className="text-sm sm:text-base text-gray-300">CSLB #1073845 for your complete peace of mind</p>
                        </div>

                        <div className="text-center p-4 sm:p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Expert Team</h3>
                            <p className="text-sm sm:text-base text-gray-300">Skilled craftsmen with years of experience</p>
                        </div>

                        <div className="text-center p-4 sm:p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Quality Materials</h3>
                            <p className="text-sm sm:text-base text-gray-300">Premium products for lasting results</p>
                        </div>

                        <div className="text-center p-4 sm:p-6 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">Free Estimates</h3>
                            <p className="text-sm sm:text-base text-gray-300">Honest, competitive pricing with no hidden fees</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <ContactForm cityName="Covina & San Gabriel Valley" />
        </div>
    );
}