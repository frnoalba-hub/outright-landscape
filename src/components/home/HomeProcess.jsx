import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Pencil, Hammer } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Phone,
        title: 'Free Consultation',
        description: 'We visit your property, discuss your vision, and provide a detailed estimate — completely free, no obligation.',
    },
    {
        number: '02',
        icon: Pencil,
        title: 'Custom Design',
        description: 'Our team creates a tailored landscape plan using premium materials and design principles that match your style.',
    },
    {
        number: '03',
        icon: Hammer,
        title: 'Expert Build',
        description: 'Skilled craftsmen bring your vision to life with precision installation and meticulous attention to every detail.',
    },
];

export default function HomeProcess() {
    return (
        <section className="processSection py-20 sm:py-28 bg-[#1a1a1a] relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="processHeader mb-16 sm:mb-20"
                >
                    <span className="processLabel text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">
                        How It Works
                    </span>
                    <h2 className="processTitle text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                        Three Simple Steps
                    </h2>
                </motion.div>

                {/* Steps — vertical timeline */}
                <div className="processSteps relative">
                    {/* Vertical line */}
                    <div className="processLine hidden sm:block absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#2d5a27] via-[#c45d2c] to-[#b8945a]" />

                    <div className="space-y-12 sm:space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="processStep flex gap-6 sm:gap-8 items-start"
                            >
                                {/* Number circle */}
                                <div className="processStepCircle relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-[#2a2a2a] border-2 border-[#c45d2c]/50 flex items-center justify-center z-10 relative">
                                        <span className="processStepNumber text-[#c45d2c] font-bold text-sm">{step.number}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="processStepContent flex-1 pb-2">
                                    <div className="processStepIcon w-10 h-10 bg-[#2d5a27]/15 rounded-lg flex items-center justify-center mb-3">
                                        <step.icon className="w-5 h-5 text-[#4a8c3f]" aria-hidden="true" />
                                    </div>
                                    <h3 className="processStepTitle text-xl sm:text-2xl font-bold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="processStepDesc text-[#8a8478] text-sm sm:text-base leading-relaxed max-w-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}