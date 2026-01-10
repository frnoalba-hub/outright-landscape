import React from 'react';
import { Phone, Droplets, Wrench, Settings, Waves, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from '../components/SEO';
import { createPageUrl } from '@/utils';

export default function Irrigation() {
    const handlePhoneClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'phone_click',
                event_category: 'engagement',
                event_label: 'irrigation-hub',
                phone_number: '626-343-6028'
            });
        }
    };

    const scrollToForm = () => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const cities = [
        {
            name: 'Glendora',
            slug: 'glendora',
            description: 'Expert irrigation services for Glendora homeowners and businesses'
        },
        {
            name: 'San Dimas',
            slug: 'san-dimas',
            description: 'Professional irrigation repair and installation in San Dimas'
        },
        {
            name: 'La Verne',
            slug: 'la-verne',
            description: 'Licensed irrigation contractors serving La Verne since 2003'
        }
    ];

    const services = [
        {
            icon: Wrench,
            title: 'Sprinkler Repair',
            slug: 'sprinkler-repair',
            description: 'Fast sprinkler repair for broken heads, leaks, and zone issues. Same-day service available.',
            keywords: 'Leaks, Broken Heads, Zone Problems'
        },
        {
            icon: Settings,
            title: 'Irrigation Repair',
            slug: 'irrigation-repair',
            description: 'Complete irrigation system repair including valve service, controller programming, and leak detection.',
            keywords: 'Valves, Controllers, System Diagnostics'
        },
        {
            icon: Droplets,
            title: 'Sprinkler Valves',
            slug: 'sprinkler-valves',
            description: 'Sprinkler valve replacement and repair. Fix stuck valves, leaks, and solenoid issues.',
            keywords: 'Valve Replacement, Solenoids, Stuck Valves'
        },
        {
            icon: Waves,
            title: 'Drip Irrigation',
            slug: 'drip-irrigation',
            description: 'Drip irrigation repair and installation. Water-efficient solutions for gardens and landscapes.',
            keywords: 'Emitters, Pressure Regulation, Water Efficiency'
        }
    ];

    return (
        <>
            <SEO 
                title="Sprinkler & Irrigation Repair Services | La Verne, San Dimas, Glendora"
                description="Professional sprinkler repair and irrigation services in La Verne, San Dimas, and Glendora. Valve repair, leak detection, drip systems. Call (626) 343-6028 for expert service."
                canonical="https://outrightlandscape.com/Irrigation"
                keywords="irrigation repair, sprinkler repair, irrigation valve repair, drip irrigation, sprinkler system repair"
            />

            <div className="min-h-screen bg-white">
                {/* Top Contact Bar */}
                <div className="bg-green-600 text-white py-3 px-4 sticky top-0 z-50 shadow-md">
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium hidden sm:inline">Professional Irrigation Services</span>
                            <span className="text-xs opacity-90">La Verne • San Dimas • Glendora</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button 
                                size="sm" 
                                variant="secondary" 
                                onClick={scrollToForm}
                                className="bg-white text-green-600 hover:bg-gray-100"
                            >
                                Get a Quote
                            </Button>
                            <Button 
                                size="sm" 
                                asChild
                                className="bg-green-700 hover:bg-green-800"
                            >
                                <a href="tel:626-343-6028" onClick={handlePhoneClick}>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Now
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                            Serving La Verne • San Dimas • Glendora
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sprinkler & Irrigation Repair Services
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                            Expert irrigation repair, sprinkler valve service, and drip system installation throughout the San Gabriel Valley. 
                            Licensed C-27 contractor with 20+ years experience.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Button 
                                size="lg" 
                                asChild
                                className="bg-green-600 hover:bg-green-700 text-lg px-8"
                            >
                                <a href="tel:626-343-6028" onClick={handlePhoneClick}>
                                    <Phone className="w-5 h-5 mr-2" />
                                    (626) 343-6028
                                </a>
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline"
                                onClick={scrollToForm}
                                className="text-lg px-8 border-2 border-green-600 text-green-600 hover:bg-green-50"
                            >
                                Get Free Estimate
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-3xl font-bold text-green-600 mb-1">500+</div>
                                <p className="text-sm text-gray-600">Repairs Completed</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-3xl font-bold text-green-600 mb-1">24hr</div>
                                <p className="text-sm text-gray-600">Response Time</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-3xl font-bold text-green-600 mb-1">20+</div>
                                <p className="text-sm text-gray-600">Years Experience</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                                <p className="text-sm text-gray-600">Licensed & Insured</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Overview */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                            Our Irrigation Services
                        </h2>
                        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            From sprinkler repair to complete irrigation system overhauls, we handle all your watering needs
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service, idx) => {
                                const Icon = service.icon;
                                return (
                                    <Card key={idx} className="border-2 border-gray-100 hover:border-green-200 transition-all hover:shadow-lg">
                                        <CardContent className="p-6 text-center">
                                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Icon className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{service.title}</h3>
                                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                            <p className="text-xs text-green-600 font-medium">{service.keywords}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* City Service Areas */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Choose Your City
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Select your city to view specialized irrigation services available in your area
                            </p>
                        </div>

                        {cities.map((city, cityIdx) => (
                            <div key={cityIdx} className="mb-12 last:mb-0">
                                <div className="flex items-center gap-3 mb-6">
                                    <MapPin className="w-6 h-6 text-green-600" />
                                    <h3 className="text-2xl font-bold text-gray-900">{city.name}</h3>
                                </div>
                                <p className="text-gray-600 mb-6">{city.description}</p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {services.map((service, serviceIdx) => {
                                        const Icon = service.icon;
                                        const url = `/${city.slug}-${service.slug}`;
                                        return (
                                            <a 
                                                key={serviceIdx}
                                                href={url}
                                                className="block bg-white p-6 rounded-lg border-2 border-gray-100 hover:border-green-300 transition-all hover:shadow-md group"
                                            >
                                                <div className="flex items-start gap-3 mb-3">
                                                    <Icon className="w-6 h-6 text-green-600 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                                                            {service.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500">{city.name}</p>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Why Choose Outright Landscape for Irrigation?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-3">Licensed C-27 Contractor</h3>
                                <p className="text-gray-600">
                                    CSLB #1073845 - Fully licensed, bonded, and insured for your protection and peace of mind.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-3">20+ Years Local Experience</h3>
                                <p className="text-gray-600">
                                    Serving La Verne, San Dimas, and Glendora since 2003 with expert irrigation repair and installation.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-3">Same-Day Service Available</h3>
                                <p className="text-gray-600">
                                    Emergency irrigation repair and sprinkler leak detection available with fast response times.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section id="contact-section" className="py-16 px-4 bg-green-600 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Fix Your Irrigation System?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Call now for same-day service in La Verne, San Dimas, and Glendora
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                size="lg" 
                                asChild
                                className="bg-white text-green-600 hover:bg-gray-100 text-xl px-12 py-6"
                            >
                                <a href="tel:626-343-6028" onClick={handlePhoneClick}>
                                    <Phone className="w-6 h-6 mr-3" />
                                    (626) 343-6028
                                </a>
                            </Button>
                            <Button 
                                size="lg"
                                variant="outline"
                                asChild
                                className="border-2 border-white text-white hover:bg-white hover:text-green-600 text-xl px-12 py-6"
                            >
                                <a href={createPageUrl('Home') + '#contact'}>
                                    Get Free Estimate
                                </a>
                            </Button>
                        </div>
                        <p className="mt-6 text-sm opacity-75">
                            Licensed C-27 Contractor #1073845 | Serving the San Gabriel Valley since 2003
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}