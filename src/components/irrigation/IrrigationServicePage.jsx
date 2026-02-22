import React, { useState } from 'react';
import { Phone, CheckCircle2, Droplets, Wrench, Clock, MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

export default function IrrigationServicePage({ city, service, data }) {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: city, service_type: service, message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePhoneClick = () => {
        if (window.dataLayer) { window.dataLayer.push({ event: 'phone_click', event_category: 'engagement', event_label: `${service}-${city}`, phone_number: '626-343-6028' }); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await base44.functions.invoke('submitLead', formData);
            if (window.dataLayer) { window.dataLayer.push({ event: 'form_submit', event_category: 'conversion', event_label: `${service}-${city}` }); }
            setSubmitted(true);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToForm = () => { document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' }); };

    return (
        <div className="irrigationDetailWrapper min-h-screen bg-white">
            {/* ── HERO ── */}
            <section className="irrigationDetailHero relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0 sm:left-[40%]">
                    <img src="/images/01c14d800_unnamed2-Copy.jpg" alt={data.h1} className="w-full h-full object-cover" fetchpriority="high" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/75 sm:to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
                </div>
                <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:py-0">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-xl space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                            <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">La Verne • San Dimas • Glendora</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white leading-[1.08] tracking-tight font-bold">{data.h1}</h1>
                        <p className="text-[#a09a90] text-base sm:text-lg leading-relaxed max-w-md">{data.heroSubhead}</p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <a href="tel:626-343-6028" onClick={handlePhoneClick} className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-base px-7 py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:scale-[1.02] min-w-[240px]">
                                    <Phone className="mr-2.5 w-5 h-5" />(626) 343-6028
                                </Button>
                            </a>
                            <Button variant="outline" onClick={scrollToForm} className="w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-base px-7 py-6 rounded-xl transition-all min-w-[240px]">
                                Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
            </section>

            {/* ── COMMON ISSUES ── */}
            <section className="irrigationDetailIssues py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Common Issues</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">{data.issuesTitle}</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {data.commonIssues.map((issue, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                                className="bg-white p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#4a8c3f] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-[#1a1a1a] mb-1.5 text-sm">{issue.title}</h3>
                                        <p className="text-[#6b6560] text-sm leading-relaxed">{issue.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY ── */}
            <section className="irrigationDetailGallery py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                        <div>
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Our Work</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Professional Results</h2>
                        </div>
                        <p className="text-[#6b6560] text-sm max-w-sm">See examples of our irrigation work throughout {city} and the San Gabriel Valley</p>
                    </motion.div>
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                        {[
                            { src: "/images/01c14d800_unnamed2-Copy.jpg", alt: "Irrigation valve manifold installation", h: "h-52" },
                            { src: "/images/c734704d4_IMG_4815-Copy.jpg", alt: "Professional irrigation valve setup", h: "h-64" },
                            { src: "/images/c77326177_IMG_4971-Copy.jpg", alt: "Irrigation valve box repair", h: "h-56" },
                            { src: "/images/eb74e1b87_IMG_37521-Copy.jpg", alt: "Underground irrigation system", h: "h-72" },
                            { src: "/images/f03bb2890_IMG_3851-Copy.jpg", alt: "Multi-zone irrigation valve installation", h: "h-60" },
                            { src: "/images/723adf744_IMG_3731-Copy.jpg", alt: "Irrigation valve box repair", h: "h-52" },
                            { src: "/images/701510e0a_IMG_2662.jpg", alt: "Irrigation controller installation", h: "h-64" },
                            { src: "/images/957a12859_IMG_3669.jpg", alt: "Complete irrigation valve manifold", h: "h-56" },
                            { src: "/images/27d11d89c_IMG_3076.jpg", alt: "Professional irrigation maintenance", h: "h-60" },
                        ].map((img, idx) => (
                            <div key={idx} className={`galleryItem group relative overflow-hidden rounded-xl break-inside-avoid ${img.h}`}>
                                <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHAT WE FIX ── */}
            <section className="irrigationDetailFix py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Scope of Work</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">What We Fix & What's Included</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {data.whatWeFixCategories.map((category, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 sm:p-7 rounded-xl border border-[#e0d8cc]">
                                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                                    <Wrench className="w-5 h-5 text-[#c45d2c]" />{category.title}
                                </h3>
                                <ul className="space-y-2.5">
                                    {category.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[#4a4540] text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-[#4a8c3f] mt-0.5 flex-shrink-0" /><span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="irrigationDetailProcess py-20 sm:py-28 bg-[#1a1a1a]">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">How It Works</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">Our {data.serviceDisplay} Process</h2>
                    </motion.div>
                    <div className="relative">
                        <div className="hidden sm:block absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#2d5a27] via-[#c45d2c] to-[#b8945a]" />
                        <div className="space-y-12">
                            {data.process.map((step, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
                                    className="flex gap-6 sm:gap-8 items-start">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#2a2a2a] border-2 border-[#c45d2c]/50 flex items-center justify-center z-10 relative">
                                            <span className="text-[#c45d2c] font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 pb-2">
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-[#8a8478] text-sm leading-relaxed max-w-lg">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SPECIALIZED ── */}
            <section className="irrigationDetailSpecialized py-20 sm:py-28 bg-white">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Expertise</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">{data.specializedSection.title}</h2>
                    </motion.div>
                    <p className="text-[#6b6560] text-base leading-relaxed mb-8 max-w-3xl">{data.specializedSection.intro}</p>
                    <div className="grid md:grid-cols-2 gap-5">
                        {data.specializedSection.highlights.map((highlight, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                                className="bg-[#f5f0e8] p-6 rounded-xl border border-[#e0d8cc]">
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
                                    <Droplets className="w-5 h-5 text-[#c45d2c]" />{highlight.title}
                                </h3>
                                <p className="text-[#6b6560] text-sm leading-relaxed">{highlight.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section className="irrigationDetailPricing py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Pricing</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Transparent Pricing & Free Estimates</h2>
                    </motion.div>
                    <div className="bg-[#1a1a1a] rounded-2xl p-8 text-center">
                        <Clock className="w-10 h-10 text-[#c45d2c] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">Get Your Free Estimate Today</h3>
                        <p className="text-[#8a8478] mb-8">We provide upfront pricing with no hidden fees. Most {data.serviceDisplay.toLowerCase()} jobs in {city} are completed same-day or next-day.</p>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[{ title: 'No Trip Charge', desc: 'For service calls' }, { title: 'Warranty Included', desc: 'On all repairs' }, { title: 'Fast Response', desc: 'Same or next day' }].map((p, i) => (
                                <div key={i} className="bg-[#242424] border border-[#333] p-4 rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-[#4a8c3f] mb-2" />
                                    <p className="font-bold text-white text-sm">{p.title}</p>
                                    <p className="text-xs text-[#8a8478]">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERVICE AREA ── */}
            <section className="irrigationDetailArea py-16 sm:py-20 bg-white">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-4">Serving {city} & Nearby Communities</h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-[#2d5a27]" />
                        <p className="text-[#6b6560]">Primary Service Area: <strong className="text-[#1a1a1a]">La Verne, San Dimas, and Glendora</strong></p>
                    </div>
                    <p className="text-[#8a8478] text-sm max-w-2xl mx-auto mb-6">We also serve Covina, West Covina, Claremont, Pomona, Diamond Bar, and more. CSLB Licensed #1073845.</p>
                    <a href="tel:626-343-6028" onClick={handlePhoneClick}>
                        <Button className="bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold px-8 py-5 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all">
                            <Phone className="w-5 h-5 mr-2" />Call for Service Confirmation
                        </Button>
                    </a>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="irrigationDetailFaq py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    <div className="mb-12">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">FAQ</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {data.faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                <h3 className="text-base font-bold text-[#1a1a1a] mb-2">{faq.q}</h3>
                                <p className="text-[#6b6560] text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRUST ── */}
            <section className="irrigationDetailTrust py-0 bg-[#1a1a1a] border-y border-[#333]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#333]">
                        <div className="text-center py-10 flex flex-col items-center gap-1">
                            <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}</div>
                            <div className="text-white font-bold text-sm">5.0 Rating</div>
                        </div>
                        {[{ value: '500+', label: 'Irrigation Repairs' }, { value: '24hr', label: 'Avg Response Time' }, { value: '100%', label: 'Licensed & Insured' }].map((s, i) => (
                            <div key={i} className="text-center py-10">
                                <div className="text-3xl font-bold text-[#c45d2c]">{s.value}</div>
                                <div className="text-[#8a8478] text-xs mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QUOTE FORM ── */}
            <section id="quote-form" className="irrigationDetailForm py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-2xl mx-auto px-5 sm:px-8">
                    <div className="mb-8">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Get Started</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Get Your Free Estimate</h2>
                        <p className="mt-2 text-[#6b6560] text-sm">Fill out the form and we'll contact you within 24 hours</p>
                    </div>

                    {submitted ? (
                        <div className="bg-[#2d5a27] rounded-2xl p-10 text-center text-white">
                            <CheckCircle2 className="w-14 h-14 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                            <p className="text-white/80 mb-4">We've received your request and will contact you shortly.</p>
                            <p className="text-white/60 text-sm">Need immediate assistance? <a href="tel:626-343-6028" className="text-[#c45d2c] font-semibold hover:underline">(626) 343-6028</a></p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#8a8478] mb-1.5">Name *</label>
                                    <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="bg-[#242424] border-[#333] text-white placeholder:text-[#6b6560] focus:ring-[#c45d2c] focus:border-[#c45d2c] h-12 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#8a8478] mb-1.5">Phone *</label>
                                    <Input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(626) 555-1234" className="bg-[#242424] border-[#333] text-white placeholder:text-[#6b6560] focus:ring-[#c45d2c] focus:border-[#c45d2c] h-12 rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#8a8478] mb-1.5">Email</label>
                                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="bg-[#242424] border-[#333] text-white placeholder:text-[#6b6560] focus:ring-[#c45d2c] focus:border-[#c45d2c] h-12 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#8a8478] mb-1.5">City</label>
                                <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="Your city" className="bg-[#242424] border-[#333] text-white placeholder:text-[#6b6560] focus:ring-[#c45d2c] focus:border-[#c45d2c] h-12 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#8a8478] mb-1.5">Tell us about your project</label>
                                <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your irrigation repair needs..." rows={4} className="bg-[#242424] border-[#333] text-white placeholder:text-[#6b6560] focus:ring-[#c45d2c] focus:border-[#c45d2c] rounded-lg" />
                            </div>
                            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-base h-14 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:scale-[1.02]">
                                {isSubmitting ? 'Sending...' : 'Get Free Estimate'}
                            </Button>
                        </form>
                    )}
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="irrigationDetailFinalCta py-20 sm:py-28 bg-gradient-to-br from-[#2d5a27] via-[#1e4a1a] to-[#1a3a15]">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Ready to Fix Your {data.serviceDisplay}?</h2>
                    <p className="text-lg text-white/70 mb-8">Call now for same-day service in {city}, La Verne, San Dimas, and Glendora</p>
                    <a href="tel:626-343-6028" onClick={handlePhoneClick}>
                        <Button className="bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-lg px-10 py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:scale-[1.02]">
                            <Phone className="w-5 h-5 mr-3" />(626) 343-6028
                        </Button>
                    </a>
                    <p className="mt-6 text-sm text-white/50">Licensed C-27 Contractor #1073845 | Serving the San Gabriel Valley since 2003</p>
                </div>
            </section>
        </div>
    );
}