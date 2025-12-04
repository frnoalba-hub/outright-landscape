import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { MapPin, Phone, CheckCircle2, ArrowRight, Star, Leaf, Droplets, Hammer, Sprout, Play } from 'lucide-react';
import SEO from '@/components/SEO';
import ServiceSchema from '@/components/ServiceSchema';
import ContactForm from '@/components/ContactForm';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

const services = [
    {
        title: "Landscape Design",
        description: "From concept to creation, we design outdoor spaces that blend aesthetics with functionality.",
        icon: Leaf,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Hardscaping",
        description: "Durable and elegant pavers, retaining walls, and patios that define your outdoor living area.",
        icon: Hammer,
        image: "https://images.unsplash.com/photo-1623625969110-447935ebc032?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Irrigation Systems",
        description: "Smart, water-efficient systems designed to keep your landscape thriving while conserving resources.",
        icon: Droplets,
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Turf Installation",
        description: "Premium sod and artificial turf installation for a lush, green lawn year-round.",
        icon: Sprout,
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800"
    }
];

const projects = [
    {
        title: "Modern Estate",
        location: "Arcadia, CA",
        image: "https://images.unsplash.com/photo-1600596542815-e32c53048040?auto=format&fit=crop&q=80&w=800",
        category: "Design & Build"
    },
    {
        title: "Drought Tolerant Oasis",
        location: "Pasadena, CA",
        image: "https://images.unsplash.com/photo-1593507642359-126873c2685f?auto=format&fit=crop&q=80&w=800",
        category: "Sustainable"
    },
    {
        title: "Luxury Paver Patio",
        location: "San Dimas, CA",
        image: "https://images.unsplash.com/photo-1621501042219-2d504142e148?auto=format&fit=crop&q=80&w=800",
        category: "Hardscape"
    }
];

export default function Home() {
    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list({ limit: 100 }),
        initialData: []
    });

    const trackEvent = (name, data) => {
        if (window.dataLayer) window.dataLayer.push({ event: name, ...data });
    };

    return (
        <div className="bg-stone-50 overflow-x-hidden font-sans">
            <SEO
                title="Outright Landscape | Premium Landscape Construction in San Gabriel Valley"
                description="Transform your property with Outright Landscape. Licensed C-27 contractor specializing in modern design, hardscaping, and sustainable solutions."
                canonicalUrl="https://outrightlandscape.com"
            />
            <ServiceSchema serviceType="hardscaping" />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                        alt="Luxury Landscape Background"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
                    >
                        <Star className="w-4 h-4 text-green-400 fill-current" />
                        <span className="text-sm font-medium tracking-wide uppercase">Premier C-27 Contractor #1073845</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
                    >
                        Elevate Your <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Outdoor Living</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
                    >
                        We craft exceptional landscapes that blend modern design with natural beauty. Serving the San Gabriel Valley.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button 
                            size="lg" 
                            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-green-900/20"
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Request Consultation
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-lg font-semibold"
                            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Our Work
                        </Button>
                    </motion.div>
                </div>
                
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </div>
            </section>

            {/* Stats / Trust Bar */}
            <section className="bg-white py-10 border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Years Experience", value: "10+" },
                            { label: "Projects Completed", value: "500+" },
                            { label: "Cities Served", value: locations.length || "19" },
                            { label: "Client Satisfaction", value: "100%" }
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-3xl sm:text-4xl font-bold text-stone-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-stone-500 uppercase tracking-wider font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid - Minimalist */}
            <section id="services" className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3">Our Expertise</h2>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
                                Comprehensive Landscape <br /> Solutions
                            </h3>
                        </div>
                        <Button variant="ghost" className="group text-stone-600 hover:text-green-600" asChild>
                            <a href="/services">
                                View All Services <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-green-100">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                                </div>
                                <div className="p-8">
                                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h4>
                                    <p className="text-stone-500 leading-relaxed text-sm">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Project - Masonry Style feel */}
            <section id="projects" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3">Featured Projects</h2>
                        <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Exceptional Workmanship</h3>
                        <p className="text-stone-500 max-w-2xl mx-auto">
                            Explore a selection of our recent transformations across the San Gabriel Valley.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, idx) => (
                            <div 
                                key={idx} 
                                className={`group relative rounded-3xl overflow-hidden cursor-pointer ${idx === 0 ? 'md:col-span-2 md:h-[500px]' : 'h-[400px]'}`}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-green-400 text-sm font-bold uppercase tracking-wider mb-2">{project.category}</div>
                                    <h4 className="text-2xl md:text-4xl font-bold mb-2">{project.title}</h4>
                                    <div className="flex items-center text-stone-300 text-sm md:text-base">
                                        <MapPin className="w-4 h-4 mr-2" /> {project.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                        <Button size="lg" variant="outline" className="rounded-full border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900">
                            View All Projects
                        </Button>
                    </div>
                </div>
            </section>

            {/* Dark Section - Why Choose Us */}
            <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-green-900/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-3">Why Outright Landscape</h2>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Built on Trust, <br /> Driven by Quality.
                            </h3>
                            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                                We don't just build landscapes; we build relationships. Our commitment to transparency, communication, and superior craftsmanship sets us apart in the industry.
                            </p>
                            
                            <ul className="space-y-6">
                                {[
                                    "Fully Licensed & Insured (CSLB #1073845)",
                                    "Detailed, Transparent Estimates",
                                    "Owner-Operated Quality Control",
                                    "Premium Materials & Warranties"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center">
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-4 text-green-400">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-10">
                                <Button className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-8 h-12 font-bold">
                                    Learn More About Us
                                </Button>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-800">
                                <img 
                                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" 
                                    alt="Worker detailing landscape" 
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-green-600 p-8 rounded-2xl shadow-xl hidden md:block">
                                <div className="text-4xl font-bold mb-1">500+</div>
                                <div className="text-sm font-medium opacity-90">Happy Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Areas - Clean List */}
            <section className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-stone-900 mb-8">Proudly Serving</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {locations.map((city) => (
                            <a 
                                key={city.slug} 
                                href={createPageUrl(`${city.name.replace(/ /g, '')}Landscaping`)}
                                className="px-4 py-2 bg-white rounded-full border border-stone-200 text-stone-600 text-sm font-medium hover:border-green-500 hover:text-green-600 transition-colors shadow-sm"
                            >
                                {city.name}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <ContactForm cityName="Your Area" />
        </div>
    );
}