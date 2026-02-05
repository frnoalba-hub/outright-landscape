import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Pencil, Hammer } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Phone,
        title: 'Free Consultation',
        description:
            'We visit your property, discuss your vision, and provide a detailed estimate — completely free, no obligation.',
    },
    {
        number: '02',
        icon: Pencil,
        title: 'Custom Design',
        description:
            'Our team creates a tailored landscape plan using premium materials and design principles that match your style.',
    },
    {
        number: '03',
        icon: Hammer,
        title: 'Expert Build',
        description:
            'Skilled craftsmen bring your vision to life with precision installation and meticulous attention to every detail.',
    },
];

export default function HomeProcess() {
    return (
        <section className="processSection py-20 sm:py-28 bg-gray-950 relative overflow-hidden">
            {/* Subtle bg glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 sm:mb-20"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-green-500/70" />
                        <span className="text-green-400 uppercase tracking-[0.2em] text-[11px] font-bold">
                            How We Work
                        </span>
                        <div className="h-px w-8 bg-green-500/70" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Simple Process, Stunning Results
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
                    {/* Connecting line — desktop */}
                    <div className="hidden md:block absolute top-[52px] left-[20%] right-[20%] h-px bg-gradient-to-r from-green-500/0 via-green-500/40 to-green-500/0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="processStep text-center relative"
                        >
                            {/* Icon */}
                            <div className="relative inline-block mb-6">
                                <div className="processIcon w-[72px] h-[72px] mx-auto bg-green-500/10 border border-green-500/25 rounded-2xl flex items-center justify-center">
                                    <step.icon className="w-7 h-7 text-green-400" aria-hidden="true" />
                                </div>
                                <span className="processNumber absolute -top-2 -right-2 bg-green-500 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                                    {step.number}
                                </span>
                            </div>

                            <h3 className="processTitle text-lg sm:text-xl font-bold text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="processDesc text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}