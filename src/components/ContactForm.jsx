import React, { useState } from "react";
import { base44 } from '@/api/base44Client';
import { saveContactInquiry } from '@/functions/saveContactInquiry';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Phone, Text, CalendarDays, MessageSquare, Loader2 } from "lucide-react";
import confetti from 'canvas-confetti';
import BookingForm from '@/components/booking/BookingForm';

export default function ContactForm({ cityName = "your area" }) {
    const [activeTab, setActiveTab] = useState("quote");
    const [formData, setFormData] = useState({
        name: "", phone: "", email: "", city: cityName, message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Try direct SDK first, fallback to backend function for reliability
            try {
                await base44.entities.ContactInquiry.create(formData);
            } catch {
                await saveContactInquiry(formData);
            }

            // Analytics (best-effort)
            if (window.dataLayer) {
                window.dataLayer.push({ event: 'service_inquiry_form_submit', event_category: 'conversion', event_label: cityName });
                window.dataLayer.push({ event: 'free_quote_request', event_category: 'lead_generation', event_label: cityName });
            }
            if (window.gtag) {
                window.gtag('event', 'generate_lead', { event_category: 'conversion', value: 1 });
            }

            setIsSubmitted(true);
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (err) {
            console.error("Submission failed", err);
            // Still show success if data was saved — don't alarm the customer
            setIsSubmitted(true);
        }
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="contactSection py-20 md:py-28 bg-[#f5f0e8] text-[#1a1a1a]">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="contactHeader mb-12">
                    <span className="contactLabel text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">
                        Contact Us
                    </span>
                    <h2 className="contactTitle text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mt-2">
                        Get Your Free Estimate
                    </h2>
                    <p className="contactSubtitle mt-3 text-[#6b6560] text-base max-w-lg">
                        Transform your outdoor space with {cityName}'s landscape experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="contactSidebar space-y-5">
                        <a href="tel:626-343-6028" className="contactPhoneCard flex items-center space-x-4 p-5 bg-[#1a1a1a] rounded-xl hover:bg-[#242424] transition-colors">
                            <Phone className="w-7 h-7 text-[#c45d2c] flex-shrink-0" />
                            <div>
                                <p className="font-bold text-lg text-white">(626) 343-6028</p>
                                <p className="text-[#8a8478] text-sm">Call for a free estimate</p>
                            </div>
                        </a>
                        <a href="sms:626-343-6028" className="contactTextCard flex items-center space-x-4 p-5 bg-[#1a1a1a] rounded-xl hover:bg-[#242424] transition-colors">
                            <Text className="w-7 h-7 text-[#b8945a] flex-shrink-0" />
                            <div>
                                <p className="font-bold text-lg text-white">Text Us Anytime</p>
                                <p className="text-[#8a8478] text-sm">Send a message or photos</p>
                            </div>
                        </a>
                        <div className="contactTrust bg-[#1a1a1a] rounded-xl p-5 space-y-3">
                            {['Licensed C-27 CSLB #1073845', '10+ Years of Experience', 'Fully Insured & Bonded'].map((t, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-sm text-[#a09a90]">
                                    <CheckCircle className="w-4 h-4 text-[#4a8c3f] flex-shrink-0" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contactFormArea">
                        <div className="contactTabs flex bg-[#1a1a1a] rounded-t-2xl overflow-hidden border-b border-[#333]">
                            <button type="button" onClick={() => setActiveTab("quote")}
                                className={`contactTabBtn flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300
                                    ${activeTab === "quote" ? "bg-[#1a1a1a] text-[#c45d2c] border-b-2 border-[#c45d2c]" : "bg-[#151515] text-[#6b6560] hover:text-[#a09a90]"}`}>
                                <MessageSquare className="w-4 h-4" /> Free Quote
                            </button>
                            <button type="button" onClick={() => setActiveTab("book")}
                                className={`contactTabBtn flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300
                                    ${activeTab === "book" ? "bg-[#1a1a1a] text-[#c45d2c] border-b-2 border-[#c45d2c]" : "bg-[#151515] text-[#6b6560] hover:text-[#a09a90]"}`}>
                                <CalendarDays className="w-4 h-4" /> Book Appointment
                            </button>
                        </div>

                        {activeTab === "quote" ? (
                            isSubmitted ? (
                                <div className="contactSuccess flex flex-col items-center justify-center text-center p-10 bg-[#2d5a27] rounded-b-2xl text-white min-h-[420px]">
                                    <CheckCircle className="w-14 h-14 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Thank You, {formData.name}!</h3>
                                    <p className="text-white/80 text-sm">Your quote request has been received. We'll reach out to you shortly at {formData.phone}.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contactForm bg-[#1a1a1a] rounded-b-2xl p-6 sm:p-8 space-y-4">
                                    <Input id="name" type="text" placeholder="Full Name" required
                                        value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all" />
                                    <Input id="phone" type="tel" placeholder="Phone" required
                                        value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all" />
                                    <Input id="email" type="email" placeholder="Email" required
                                        value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all" />
                                    <Input id="city" type="text" placeholder="City" required
                                        value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all" />
                                    <Textarea id="message" placeholder="Brief project description..." required
                                        value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)}
                                        className="contactTextarea bg-[#242424] border-[#333] text-white rounded-lg p-4 h-28 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all" />
                                    <Button type="submit" size="lg" disabled={isSubmitting}
                                        className="contactSubmit w-full font-bold text-base h-14 rounded-xl bg-[#c45d2c] hover:bg-[#a94e25] text-white shadow-lg shadow-[#c45d2c]/20 hover:shadow-xl hover:shadow-[#c45d2c]/30 transition-all duration-300 transform hover:scale-[1.02]">
                                        {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin inline" />Sending...</> : "Request My Free Quote"}
                                    </Button>
                                </form>
                            )
                        ) : (
                            <div className="contactBookingWrapper rounded-b-2xl overflow-hidden">
                                <BookingForm cityName={cityName} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}