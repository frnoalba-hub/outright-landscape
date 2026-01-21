import React, { useState } from "react";
import { ContactInquiry } from "@/entities/ContactInquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Phone, Text } from "lucide-react";

const EMAIL_RELAY_URL = "https://script.google.com/macros/s/AKfycbzSIl_5RSL2FvaE7uwl4lbLJtMUFfwA-O5XFIt9TaA1-egp4HChAHVMnEWm7Hf-r0Mvtw/exec";

export default function ContactForm({ cityName = "your area" }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        city: cityName,
        message: "",
        company: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (field, value) => 
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await ContactInquiry.create(formData);
            
            if (!formData.company) {
                const payload = new URLSearchParams({
                    _subject: `New Quote Request — ${cityName}`,
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    city: formData.city,
                    message: formData.message,
                });

                await fetch(EMAIL_RELAY_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
                    body: payload.toString(),
                });
            }

            // Track form submission with multiple events
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'service_inquiry_form_submit',
                    event_category: 'conversion',
                    event_label: cityName,
                    form_type: 'contact_form',
                    city: formData.city || cityName
                });
                
                window.dataLayer.push({
                    event: 'free_quote_request',
                    event_category: 'lead_generation',
                    event_label: cityName,
                    submission_method: 'contact_form'
                });
                
                window.dataLayer.push({
                    event: 'form_submission',
                    event_category: 'conversion',
                    event_label: `contact_form_${cityName.toLowerCase().replace(/\s+/g, '_')}`,
                    form_name: 'Contact Inquiry',
                    city: cityName
                });
            }
            if (window.gtag) {
                window.gtag('event', 'generate_lead', {
                    event_category: 'conversion',
                    event_label: `contact_form_${cityName.toLowerCase().replace(/\s+/g, '_')}`,
                    value: 1
                });
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error("Submission failed", err);
            alert("Sorry—couldn't send your request. Please call (626) 343-6028.");
        }
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="py-20 md:py-28 bg-black text-white">
            <style>{`
                .honeypot{display:none!important}
            `}</style>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold">Get Your Free Estimate Today</h2>
                    <p className="mt-4 text-lg text-gray-300">Transform your outdoor space with {cityName}'s landscape experts.</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <a 
                            href="tel:626-343-6028" 
                            className="flex items-center space-x-4 p-5 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                        >
                            <Phone className="w-8 h-8 text-green-400" />
                            <div>
                                <p className="font-bold text-xl">(626) 343-6028</p>
                                <p className="text-gray-300">Call for a free estimate</p>
                            </div>
                        </a>
                        <a 
                            href="sms:626-343-6028" 
                            className="flex items-center space-x-4 p-5 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                        >
                            <Text className="w-8 h-8 text-green-400" />
                            <div>
                                <p className="font-bold text-xl">Text Us Anytime</p>
                                <p className="text-gray-300">Send a message or photos</p>
                            </div>
                        </a>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center p-8 bg-green-600 rounded-2xl">
                            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                            <p>Your quote request has been sent. We'll be in touch shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                id="name"
                                type="text"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                            />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Phone"
                                required
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                            />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                            />
                            <Input
                                id="city"
                                type="text"
                                placeholder="City"
                                required
                                value={formData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                            />
                            <Textarea
                                id="message"
                                placeholder="Brief project description..."
                                required
                                value={formData.message}
                                onChange={(e) => handleInputChange("message", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white rounded-lg p-4 h-32"
                            />

                            <input
                                type="text"
                                name="company"
                                className="honeypot"
                                value={formData.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                tabIndex="-1"
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full font-bold text-lg h-16 rounded-full bg-green-600 hover:bg-green-700"
                            >
                                {isSubmitting ? "Sending..." : "Request My Free Quote"}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}