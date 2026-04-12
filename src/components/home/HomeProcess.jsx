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
        <section className="processSection py-20 sm:py-28 bg-[#1a1a1a] relative overflow-hidden" aria-labelledby="process-heading">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="processHeader text-center mb-16 sm:mb-20"
                >
                    <span className="processLabel text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">
                        How It Works
                    </span>
                    <h2 id="process-heading" className="processTitle text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                        Three Simple Steps
                    </h2>
                </motion.div>

                {/* Steps — semantic dl/dt/dd for GEO (KDD '24: AI parsers extract dl directly) */}
                <dl className="processSteps grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative" aria-label="Our process">
                    {/* Horizontal connector line (desktop only) */}
                    <div className="processConnector hidden md:block absolute top-[38px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a]" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="processStep flex flex-col items-start md:items-center md:text-center gap-4"
                        >
                            {/* Number circle */}
                            <div className="processStepCircle relative flex-shrink-0 z-10">
                                <div className="w-14 h-14 rounded-full bg-[#2a2a2a] border-2 border-[#c45d2c] flex items-center justify-center shadow-lg shadow-[#c45d2c]/20">
                                    <span className="processStepNumber text-[#c45d2c] font-bold text-base">{step.number}</span>
                                </div>
                            </div>

                            {/* Content — semantic dt/dd */}
                            <div className="processStepContent flex-1">
                                <div className="processStepIcon w-10 h-10 bg-[#2d5a27]/15 rounded-lg flex items-center justify-center mb-3 md:mx-auto">
                                    <step.icon className="w-5 h-5 text-[#4a8c3f]" aria-hidden="true" />
                                </div>
                                <dt className="processStepTitle text-xl font-bold text-white mb-2">
                                    {step.title}
                                </dt>
                                <dd className="processStepDesc text-[#8a8478] text-sm leading-relaxed m-0">
                                    {step.description}
                                </dd>
                            </div>
                        </motion.div>
                    ))}
                </dl>
            </div>
        </section>
    );
}