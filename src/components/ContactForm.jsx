import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ContactForm({ cityName = "your area", darkMode = true }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        city: cityName,
        message: "",
        service_type: "landscape_design"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await base44.entities.ContactInquiry.create(formData);

            // Track form submission
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'form_submission',
                    event_category: 'conversion',
                    event_label: `contact_form_${cityName.toLowerCase().replace(/\s+/g, '_')}`,
                    form_name: 'Contact Inquiry',
                    city: cityName,
                    service_type: formData.service_type
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
            alert("Sorry, couldn't send your request. Please call (626) 343-6028.");
        }
        setIsSubmitting(false);
    };

    const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
    const textClass = darkMode ? "text-white" : "text-gray-900";
    const subtitleClass = darkMode ? "text-gray-300" : "text-gray-600";
    const inputClass = darkMode 
        ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500";

    return (
        <section id="contact" className={`py-20 ${bgClass} ${textClass}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Get Your Free Estimate
                    </h2>
                    <p className={`text-lg sm:text-xl ${subtitleClass}`}>
                        Ready to transform your {cityName} outdoor space? Contact us today!
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="text-center p-8 sm:p-12 bg-green-600 rounded-2xl text-white">
                        <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" />
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2">Thank You!</h3>
                        <p className="text-lg sm:text-xl">We'll contact you shortly to discuss your project.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <Input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`${inputClass} h-12 sm:h-14 rounded-lg`}
                            />
                            <Input
                                type="tel"
                                placeholder="Phone"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`${inputClass} h-12 sm:h-14 rounded-lg`}
                            />
                        </div>
                        <Input
                            type="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`${inputClass} h-12 sm:h-14 rounded-lg`}
                        />
                        <Textarea
                            placeholder="Tell us about your project..."
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={`${inputClass} rounded-lg p-4 h-28 sm:h-32`}
                        />
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg sm:text-xl h-14 sm:h-16 rounded-full"
                        >
                            {isSubmitting ? "Sending..." : "Get Free Quote"}
                        </Button>
                    </form>
                )}
            </div>
        </section>
    );
}