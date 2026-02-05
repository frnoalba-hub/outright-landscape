import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function HomePortfolio({ projects, onCtaClick }) {
    const display = projects.slice(0, 8);

    return (
        <section id="work" className="portfolioSection py-20 sm:py-28 bg-white">
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
                        <span className="text-green-700 uppercase tracking-[0.2em] text-[11px] font-bold">
                            Our Portfolio
                        </span>
                        <div className="h-px w-8 bg-green-600" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Recent Projects
                    </h2>
                    <p className="mt-4 text-gray-500 text-base sm:text-lg">
                        Transforming outdoor spaces across the San Gabriel Valley
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3"
                    style={{ gridAutoRows: '160px' }}
                >
                    {display.map((project, index) => {
                        const isLarge = index === 0 || index === 5;
                        return (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.04 }}
                                className={`projectCard group relative overflow-hidden rounded-xl ${
                                    isLarge ? 'col-span-2 row-span-2' : ''
                                }`}
                            >
                                <img
                                    src={project.image}
                                    alt={project.alt}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    width="400"
                                    height="300"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="projectTitle text-white font-bold text-sm sm:text-base leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="projectLocation text-green-400 text-xs flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                                        {project.location}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="tel:626-343-6028"
                        onClick={onCtaClick}
                        className="portfolioCta inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl text-sm sm:text-base"
                    >
                        Start Your Project&ensp;→
                    </a>
                </motion.div>
            </div>
        </section>
    );
}