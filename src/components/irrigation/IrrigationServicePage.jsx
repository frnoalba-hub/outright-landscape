import React, { useState } from 'react';
import { Phone, CheckCircle2, Droplets, Wrench, Clock, MapPin, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from '@/api/base44Client';
import { useHaptic } from '@/components/utils/haptics';

export default function IrrigationServicePage({ city, service, data }) {
    const { triggerHaptic } = useHaptic();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: city,
        service_type: service,
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePhoneClick = () => {
        triggerHaptic('light');
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'phone_click',
                event_category: 'engagement',
                event_label: `${service}-${city}`,
                phone_number: '626-343-6028'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await base44.functions.invoke('submitLead', formData);
            
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'form_submit',
                    event_category: 'conversion',
                    event_label: `${service}-${city}`
                });
            }
            
            triggerHaptic('success');
            setSubmitted(true);
        } catch (error) {
            console.error('Form submission error:', error);
            triggerHaptic('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToForm = () => {
        document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 mt-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                            Serving La Verne • San Dimas • Glendora
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {data.h1}
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                            {data.heroSubhead}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                size="lg" 
                                asChild
                                className="bg-orange-600 hover:bg-orange-700 text-lg px-8"
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
                    </div>
                </div>
            </section>

            {/* Fast Diagnosis / Common Issues */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        {data.issuesTitle}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.commonIssues.map((issue, idx) => (
                            <Card key={idx} className="border-2 border-gray-100 hover:border-green-200 transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{issue.title}</h3>
                                            <p className="text-gray-600 text-sm">{issue.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Gallery */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        Our Professional Work
                    </h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        See examples of our irrigation installations and repairs throughout {city} and the San Gabriel Valley
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/01c14d800_unnamed2-Copy.jpg"
                            alt="Irrigation valve manifold installation"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c734704d4_IMG_4815-Copy.jpg"
                            alt="Professional irrigation valve setup"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c77326177_IMG_4971-Copy.jpg"
                            alt="Irrigation valve box repair"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/eb74e1b87_IMG_37521-Copy.jpg"
                            alt="Underground irrigation system installation"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/f03bb2890_IMG_3851-Copy.jpg"
                            alt="Multi-zone irrigation valve installation"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/723adf744_IMG_3731-Copy.jpg"
                            alt="Irrigation valve box repair and replacement"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/701510e0a_IMG_2662.jpg"
                            alt="Irrigation controller installation"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/957a12859_IMG_3669.jpg"
                            alt="Complete irrigation valve manifold with multiple zones"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/27d11d89c_IMG_3076.jpg"
                            alt="Professional irrigation system maintenance"
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* What We Fix / What's Included */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        What We Fix & What's Included
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.whatWeFixCategories.map((category, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Wrench className="w-5 h-5 text-green-600" />
                                    {category.title}
                                </h3>
                                <ul className="space-y-2">
                                    {category.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Our {data.serviceDisplay} Process
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.process.map((step, idx) => (
                            <div key={idx} className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-green-700">{idx + 1}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialized Section (Valve/Controller/Drip) */}
            <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        {data.specializedSection.title}
                    </h2>
                    <div className="prose prose-lg max-w-4xl mx-auto">
                        <p className="text-gray-700 mb-6">{data.specializedSection.intro}</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {data.specializedSection.highlights.map((highlight, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Droplets className="w-5 h-5 text-blue-600" />
                                        {highlight.title}
                                    </h3>
                                    <p className="text-gray-600">{highlight.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing & Estimates */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Transparent Pricing & Free Estimates
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center mb-8">
                            <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Your Free Estimate Today</h3>
                            <p className="text-gray-700 mb-6">
                                We provide upfront pricing with no hidden fees. Most {data.serviceDisplay.toLowerCase()} jobs 
                                in {city} are completed same-day or next-day.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 text-left">
                                <div className="bg-white p-4 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                                    <p className="font-semibold text-gray-900">No Trip Charge</p>
                                    <p className="text-sm text-gray-600">For service calls</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                                    <p className="font-semibold text-gray-900">Warranty Included</p>
                                    <p className="text-sm text-gray-600">On all repairs</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
                                    <p className="font-semibold text-gray-900">Fast Response</p>
                                    <p className="text-sm text-gray-600">Same or next day</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Area */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Proudly Serving {city} & Nearby Communities
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <MapPin className="w-6 h-6 text-green-600" />
                        <p className="text-xl text-gray-700">
                            Primary Service Area: <strong>La Verne, San Dimas, and Glendora</strong>
                        </p>
                    </div>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                        We also serve surrounding San Gabriel Valley communities including Covina, West Covina, 
                        Claremont, Pomona, Diamond Bar, and more. Licensed C-27 landscape contractor (CSLB #1073845).
                    </p>
                    <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700">
                        <a href="tel:626-343-6028" onClick={handlePhoneClick}>
                            <Phone className="w-5 h-5 mr-2" />
                            Call for Service Confirmation
                        </a>
                    </Button>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {data.faqs.map((faq, idx) => (
                            <div key={idx} className="border-b border-gray-200 pb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proof Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Trusted by {city} Homeowners & Businesses
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <span className="ml-2 text-gray-700 font-medium">5.0 Rating</span>
                    </div>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-12">
                        With over 20 years serving the San Gabriel Valley, Outright Landscape Construction 
                        has completed thousands of irrigation repairs and installations. CSLB Licensed #1073845.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                            <p className="text-gray-700">Irrigation Repairs Completed</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-4xl font-bold text-green-600 mb-2">24hr</div>
                            <p className="text-gray-700">Average Response Time</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                            <p className="text-gray-700">Licensed & Insured</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Form */}
            <section id="quote-form" className="py-16 px-4 bg-white">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Get Your Free Estimate
                        </h2>
                        <p className="text-gray-600">
                            Fill out the form below and we'll contact you within 24 hours
                        </p>
                    </div>

                    {submitted ? (
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
                            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                            <p className="text-gray-700 mb-6">
                                We've received your request and will contact you shortly.
                            </p>
                            <p className="text-gray-600">
                                Need immediate assistance? Call us at{' '}
                                <a href="tel:626-343-6028" className="text-green-600 font-semibold hover:underline">
                                    (626) 343-6028
                                </a>
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone *
                                    </label>
                                    <Input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="(626) 555-1234"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <Input
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    placeholder="Your city"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tell us about your project
                                </label>
                                <Textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Describe your irrigation repair needs..."
                                    rows={4}
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-lg"
                            >
                                {isSubmitting ? 'Sending...' : 'Get Free Estimate'}
                            </Button>
                        </form>
                    )}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-4 bg-green-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Fix Your {data.serviceDisplay}?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Call now for same-day service in {city}, La Verne, San Dimas, and Glendora
                    </p>
                    <Button 
                        size="lg" 
                        asChild
                        className="bg-white text-orange-600 hover:bg-gray-100 text-xl px-12 py-6"
                    >
                        <a href="tel:626-343-6028" onClick={handlePhoneClick}>
                            <Phone className="w-6 h-6 mr-3" />
                            (626) 343-6028
                        </a>
                    </Button>
                    <p className="mt-6 text-sm opacity-75">
                        Licensed C-27 Contractor #1073845 | Serving the San Gabriel Valley since 2003
                    </p>
                </div>
            </section>
        </div>
    );
}