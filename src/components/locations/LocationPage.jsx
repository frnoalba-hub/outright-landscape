import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, CheckCircle2, ArrowRight, Sprout, Droplets, Hammer, Award } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SEO from '@/components/SEO';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import FAQSchema from '@/components/FAQSchema';
import SharedHero from '@/components/SharedHero';
import ContactForm from '@/components/ContactForm';
import GoogleReviews from '@/components/GoogleReviews';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

// Map string names to Lucide components
const iconMap = {
    Sprout,
    Droplets,
    Hammer,
    Award,
    CheckCircle2
};

const defaultServices = [
    { title: "Pavers & Hardscaping", description: "Expert paver patios, walkways, and retaining walls built to last.", iconName: "Hammer" },
    { title: "Turf & Sod Installation", description: "Premium Marathon tall fescue and Bermuda grass for lush lawns.", iconName: "Sprout" },
    { title: "Irrigation Systems", description: "Professional sprinkler and drip irrigation for water efficiency.", iconName: "Droplets" },
    { title: "Landscape Design", description: "Complete design and build services from concept to completion.", iconName: "Award" },
    { title: "Yard Cleanup", description: "Demolition, debris removal, and site preparation services.", iconName: "CheckCircle2" },
    { title: "Free Estimates", description: "Honest, competitive pricing with no hidden fees.", iconName: "CheckCircle2" }
];

const defaultProjects = [
    {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
        title: "Premium Turf Installation",
        alt: "Premium turf installation by Outright Landscape"
    },
    {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/6633fbff6_2025-05-286.jpg",
        title: "Paver Walkway",
        alt: "Paver walkway installation by Outright Landscape"
    },
    {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
        title: "Backyard Paver Patio",
        alt: "Paver patio installation by Outright Landscape"
    },
    {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg",
        title: "Irrigation System Installation",
        alt: "Irrigation system installation by Outright Landscape"
    },
    {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/37a148223_2025-05-288.jpg",
        title: "Complete Backyard Makeover",
        alt: "Backyard makeover by Outright Landscape"
    },
    {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/954e6bafa_2024-09-04.jpg",
        title: "Irrigation Trenching",
        alt: "Irrigation trenching by Outright Landscape"
    }
];

export default function LocationPage({ citySlug }) {
    // Fetch all locations for navigation and nearby cities
    const { data: locations = [], isLoading } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 100),
    });

    // Find city by slug (handles both old format and new -landscaping format)
    const cityData = locations.find(l => l.slug === citySlug);

    // Track page view when component mounts
    React.useEffect(() => {
        if (cityData && typeof window !== 'undefined') {
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'service_area_page_view',
                    event_category: 'page_view',
                    event_label: cityData.name,
                    city_slug: citySlug,
                    page_type: 'service_area'
                });
            }
            if (window.gtag) {
                window.gtag('event', 'page_view', {
                    page_title: `${cityData.name} Landscaping`,
                    page_location: window.location.href,
                    page_path: window.location.pathname + window.location.search,
                    city_name: cityData.name
                });
            }
        }
    }, [cityData, citySlug]);

    // Use fallback data while loading or if city not found
    const name = cityData?.name || 'San Gabriel Valley';
    const intro = cityData?.intro || "Transform your property with premier landscaping services from Outright Landscape Construction. We specialize in creating stunning outdoor spaces.";
    const faqs = cityData?.faqs || [];
    const services = cityData?.services?.length > 0 ? cityData.services : defaultServices;
    const projects = cityData?.projects?.length > 0 ? cityData.projects : defaultProjects;
    const slug = cityData?.slug || citySlug;

    const pageTitle = `${name} Landscaping & Hardscaping | Outright Landscape`;
    const metaDescription = `Licensed C-27 landscape contractor in ${name}. Expert pavers, turf installation, irrigation systems & complete landscape design. Free estimate: (626) 343-6028. CSLB #1073845.`;
    // Canonical URL for the city-specific page
    const canonicalUrl = `https://outrightlandscape.com/${slug}`;

    const breadcrumbItems = [
        { name: "Home", url: "https://outrightlandscape.com" },
        { name: "Service Areas", url: "https://outrightlandscape.com/#service-areas" },
        { name: `${name} Landscaping`, url: canonicalUrl }
    ];

    const trackPhoneClick = (location) => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'phone_click',
                event_category: 'engagement',
                event_label: `${slug}_${location}`,
                phone_number: '626-343-6028'
            });
        }
    };

    // Filter nearby cities to exclude current city (only show if we have valid data)
    const filteredNearbyCities = isLoading ? [] : locations
        .filter(l => l.slug !== slug)
        .slice(0, 8); // Show 8 nearby cities

    // Helper to get icon component
    const getIcon = (iconName) => {
        const Icon = iconMap[iconName] || CheckCircle2;
        return <Icon className="w-8 h-8 text-green-500 mb-4" />;
    };

    return (
        <div className="bg-white">
            <SEO 
                title={pageTitle}
                description={metaDescription}
                canonicalUrl={canonicalUrl}
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                keywords={`landscaping ${name}, hardscaping ${name}, pavers ${name}, turf installation ${name}, irrigation ${name}, landscape contractor ${name}, CSLB 1073845`}
            />
            <BreadcrumbSchema items={breadcrumbItems} />
            <LocalBusinessSchema cityName={name} citySlug={slug} services={services} />
            {faqs && faqs.length > 0 && <FAQSchema faqs={faqs} cityName={name} />}

            {/* Hero Section */}
            <SharedHero 
                title={<>{name}'s<br /><span className="text-green-400">Most Trusted Landscape & Irrigation Contractor</span></>}
                subtitle={`Licensed C-27 landscape contractor serving ${name} & the San Gabriel Valley`}
                onPhoneClick={trackPhoneClick}
                onViewServicesClick={() => {}}
            />

            {/* Intro Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Landscaping Services in {name}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {intro}
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                            Our Services in {name}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Transform Your {name} Property
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            From premium turf installation to complete landscape design, we deliver exceptional results for {name} homeowners and businesses.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-green-200"
                            >
                                <div className="mb-6">
                                    {getIcon(service.iconName)}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                                {service.keywords && (
                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                                        {service.keywords.split(', ').map((k, i) => (
                                            <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Gallery */}
            <section id="work" className="py-16 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-4">
                            Recent Projects
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Work in {name}
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Transforming {name} properties with expert landscaping and hardscaping
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square"
                            >
                                <img 
                                    src={project.image || project.src}
                                    alt={`${project.alt || project.title} - ${name}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                    width="600"
                                    height="600"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                                    {project.description && <p className="text-green-300 text-sm">{project.description}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0yaC0yYy0xLjEgMC0yIC45LTIgMnYyYzAgMS4xLjkgMiAyIDJoMmMxLjEgMCAyLS45IDItMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            Trusted by {name} Since 2003
                        </h2>
                        <p className="text-lg sm:text-xl text-green-100">
                            Over 20 years of excellence in {name} & the San Gabriel Valley
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { number: "1000+", label: "Projects Completed" },
                            { number: "20+", label: "Years Experience" },
                            { number: "5.0", label: "Star Rating" },
                            { number: "100%", label: "Licensed & Insured" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="text-4xl sm:text-5xl font-bold mb-2 text-white">{stat.number}</div>
                                <p className="text-green-100 text-sm sm:text-base font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Google Reviews */}
            <GoogleReviews />
            
            {/* FAQs Section */}
            {faqs && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Common Questions in {name}</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                                    <p className="text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Nearby Service Areas */}
            <section id="service-areas" className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                            Service Areas
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Also Serving Nearby Communities
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Professional landscaping services throughout the San Gabriel Valley
                        </p>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {filteredNearbyCities.map((city, idx) => (
                            <motion.a
                                key={city.name}
                                href={`/${city.slug}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="group"
                            >
                                <div className="bg-white hover:bg-orange-600 border-2 border-gray-200 hover:border-orange-600 transition-all duration-300 rounded-xl px-5 sm:px-7 py-3 sm:py-4 group-hover:scale-105 group-hover:shadow-xl">
                                    <span className="font-semibold text-sm sm:text-base text-gray-700 group-hover:text-white transition-colors flex items-center gap-2">
                                        {city.name}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact">
                <ContactForm cityName={name} darkMode={true} />
            </section>

            {/* Contact Info & Map */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Contact Your {name} Experts</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <a href="tel:626-343-6028" onClick={() => trackPhoneClick('contact_info')} className="text-green-600 hover:underline font-semibold text-lg">(626) 343-6028</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-600">📧</span>
                                    <a href="mailto:outrightlandscape@yahoo.com" className="text-green-600 hover:underline">outrightlandscape@yahoo.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700">Serving {name} & San Gabriel Valley</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-600">🕒</span>
                                    <span className="text-gray-700">Mon – Sat, 8:00 AM – 6:00 PM</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-600">🏗️</span>
                                    <span className="text-gray-700">CSLB #1073845</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl h-80 md:h-auto">
                            <iframe
                                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106167.77073!2d-117.9!3d34.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2dae3d1d4f715%3A0x2f9d5d33a33e5b8e!2s${encodeURIComponent(name + ", CA")}!5e0!3m2!1sen!2sus!4v1234567890`}
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '320px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Outright Landscape ${name} Service Area`}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}