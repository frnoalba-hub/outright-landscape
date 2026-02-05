import React from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';

export default function HomeServices({ services }) {
    return (
        <section id="services" className="servicesSection py-20 sm:py-28 bg-[#faf9f6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 sm:mb-20"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-green-600" />
                        <span className="sectionBadge text-green-700 uppercase tracking-[0.2em] text-[11px] font-bold">
                            Our Expertise
                        </span>
                        <div className="h-px w-8 bg-green-600" />
                    </div>
                    <h2 className="sectionTitle text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Professional Services
                    </h2>
                    <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
                        Expert craftsmanship for every aspect of your outdoor space
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {services.map((service, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="serviceCard group relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-2xl cursor-default"
                        >
                            <img
                                src={service.image}
                                alt={`${service.title} in Covina, Glendora, San Dimas - Outright Landscape`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                                width="600"
                                height="400"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-all duration-500 group-hover:from-black/90" />

                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                                <div className="serviceIcon w-10 h-10 bg-green-500/90 backdrop-blur-sm rounded-lg flex items-center justify-center mb-3">
                                    <service.icon className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="serviceTitle text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                                    {service.title}
                                </h3>
                                <p className="serviceDesc text-white/70 text-sm sm:text-base mb-3 max-w-md leading-relaxed transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 overflow-hidden">
                                    {service.description}
                                </p>
                                <div className="serviceFeatures flex flex-wrap gap-2 transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 overflow-hidden">
                                    {service.features.map((feature, idx) => (
                                        <span key={idx} className="text-[11px] bg-white/15 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Internal SEO Links */}
                <div className="mt-10 text-center">
                    <p className="text-gray-400 mb-3 text-sm">Explore our services by location</p>
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                        {[
                            { slug: 'covina', label: 'Covina' },
                            { slug: 'glendora', label: 'Glendora' },
                            { slug: 'san-dimas', label: 'San Dimas' },
                        ].map((c) => (
                            <a
                                key={c.slug}
                                href={`${createPageUrl('ServiceArea')}?city=${c.slug}`}
                                className="text-green-700 hover:text-green-800 font-medium text-sm underline underline-offset-4 decoration-green-300 hover:decoration-green-600 transition-colors"
                            >
                                Landscaping in {c.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}