import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

const SERVICE_LINKS = {
    'Professional Irrigation Systems': createPageUrl('Irrigation'),
    'Hardscaping & Paver Installation': createPageUrl('Hardscape'),
};

export default function HomeServices({ services }) {
    return (
        <section id="services" className="servicesSection py-20 sm:py-28 bg-[#f5f0e8]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="sectionHeader flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16"
                >
                    <div>
                        <span className="sectionLabel text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">
                            What We Do
                        </span>
                        <h2 className="sectionTitle text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mt-2">
                            Our Services
                        </h2>
                    </div>
                    <p className="sectionSubtitle text-[#6b6560] text-base max-w-md">
                        Expert craftsmanship for every aspect of your outdoor space — from design to build.
                    </p>
                </motion.div>

                {/* Alternating Cards */}
                <div className="servicesGrid space-y-6">
                    {services.map((service, index) => {
                        const isReversed = index % 2 !== 0;
                        return (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className={`serviceCard group flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500`}
                            >
                                {/* Image */}
                                <div className="serviceImageWrap relative w-full md:w-1/2 h-64 sm:h-72 md:h-80 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={`${service.title} in Covina, Glendora, San Dimas - Outright Landscape`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                        width="600"
                                        height="400"
                                    />
                                    {/* Number overlay */}
                                    <div className="absolute top-4 left-4 bg-[#1a1a1a]/80 backdrop-blur-sm text-white w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold">
                                        0{index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="serviceContent w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                                    <div className="serviceIconSmall w-11 h-11 bg-[#2d5a27]/10 rounded-xl flex items-center justify-center mb-4">
                                        <service.icon className="w-5 h-5 text-[#2d5a27]" aria-hidden="true" />
                                    </div>
                                    <h3 className="serviceTitle text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-3 leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="serviceDesc text-[#6b6560] text-sm sm:text-base leading-relaxed mb-5">
                                        {service.description}
                                    </p>
                                    <div className="serviceFeatures flex flex-wrap gap-2">
                                        {service.features.map((feature, idx) => (
                                            <span key={idx} className="serviceFeaturePill text-xs font-medium bg-[#f5f0e8] text-[#6b6560] px-3 py-1.5 rounded-full border border-[#e0d8cc]">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* SEO Links */}
                <div className="servicesSeoLinks mt-12 text-center">
                    <p className="text-[#8a8478] mb-3 text-sm">Explore our services by location</p>
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                        {[
                            { slug: 'covina', label: 'Covina' },
                            { slug: 'glendora', label: 'Glendora' },
                            { slug: 'san-dimas', label: 'San Dimas' },
                        ].map((c) => (
                            <a
                                key={c.slug}
                                href={`${createPageUrl('ServiceArea')}?city=${c.slug}`}
                                className="seoLink text-[#2d5a27] hover:text-[#1a1a1a] font-medium text-sm underline underline-offset-4 decoration-[#2d5a27]/30 hover:decoration-[#2d5a27] transition-colors inline-flex items-center gap-1"
                            >
                                Landscaping in {c.label}
                                <ArrowUpRight className="w-3 h-3" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}