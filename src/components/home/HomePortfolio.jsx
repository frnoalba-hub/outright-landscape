import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export default function HomePortfolio({ projects, onCtaClick }) {
    const display = projects.slice(0, 8);

    // Masonry heights for visual variety
    const heights = ['h-52', 'h-72', 'h-60', 'h-80', 'h-64', 'h-56', 'h-72', 'h-60'];

    return (
        <section id="work" className="portfolioSection py-20 sm:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="portfolioHeader flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16"
                >
                    <div>
                        <span className="portfolioLabel text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">
                            Our Work
                        </span>
                        <h2 className="portfolioTitle text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mt-2">
                            Recent Projects
                        </h2>
                    </div>
                    <p className="portfolioSubtitle text-[#6b6560] text-base max-w-sm">
                        Transforming outdoor spaces across the San Gabriel Valley
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="portfolioGrid columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {display.map((project, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className={`projectCard group relative overflow-hidden rounded-xl break-inside-avoid ${heights[index] || 'h-64'}`}
                        >
                            <img
                                src={project.image}
                                alt={project.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                                width="400"
                                height="300"
                                style={{ willChange: 'transform' }}
                            />
                            {/* Always-visible gradient for mobile */}
                            <div className="projectOverlayBase absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent" />
                            {/* Hover overlay for desktop */}
                            <div className="projectOverlay absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="projectInfo absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                <h3 className="projectTitle text-white font-bold text-sm sm:text-base leading-tight">
                                    {project.title}
                                </h3>
                                <p className="projectLocation text-[#c45d2c] text-xs flex items-center gap-1 mt-1.5 font-medium">
                                    <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                                    {project.location}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="portfolioCtaWrap text-center mt-14"
                >
                    <a
                        href="tel:626-343-6028"
                        onClick={onCtaClick}
                        className="portfolioCta inline-flex items-center bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl text-sm sm:text-base group"
                    >
                        Start Your Project
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}