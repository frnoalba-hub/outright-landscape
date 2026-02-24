import React, { useState, useEffect } from "react";
import { ContactInquiry } from "@/entities/ContactInquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Phone, Text, CalendarDays, MessageSquare } from "lucide-react";
import confetti from 'canvas-confetti';
import BookingForm from '@/components/booking/BookingForm';
import { base44 } from '@/api/base44Client';

const NOTIFICATION_EMAILS = ["outrightlandscapecovina@gmail.com", "frno.alba@gmail.com"];

export default function ContactForm({ cityName = "your area" }) {
    const [activeTab, setActiveTab] = useState("quote"); // "quote" or "book"
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
            
            // Trigger confetti celebration
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (err) {
            console.error("Submission failed", err);
            alert("Sorry—couldn't send your request. Please call (626) 343-6028.");
        }
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="contactSection py-20 md:py-28 bg-[#f5f0e8] text-[#1a1a1a]">
            <style>{`
                .honeypot{display:none!important}
            `}</style>
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
                        <a 
                            href="tel:626-343-6028" 
                            className="contactPhoneCard flex items-center space-x-4 p-5 bg-[#1a1a1a] rounded-xl hover:bg-[#242424] transition-colors"
                        >
                            <Phone className="w-7 h-7 text-[#c45d2c] flex-shrink-0" />
                            <div>
                                <p className="font-bold text-lg text-white">(626) 343-6028</p>
                                <p className="text-[#8a8478] text-sm">Call for a free estimate</p>
                            </div>
                        </a>
                        <a 
                            href="sms:626-343-6028" 
                            className="contactTextCard flex items-center space-x-4 p-5 bg-[#1a1a1a] rounded-xl hover:bg-[#242424] transition-colors"
                        >
                            <Text className="w-7 h-7 text-[#b8945a] flex-shrink-0" />
                            <div>
                                <p className="font-bold text-lg text-white">Text Us Anytime</p>
                                <p className="text-[#8a8478] text-sm">Send a message or photos</p>
                            </div>
                        </a>

                        {/* Trust badges */}
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
                        {/* Tab switcher */}
                        <div className="contactTabs flex bg-[#1a1a1a] rounded-t-2xl overflow-hidden border-b border-[#333]">
                            <button
                                type="button"
                                onClick={() => setActiveTab("quote")}
                                className={`contactTabBtn flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300
                                    ${activeTab === "quote" ? "bg-[#1a1a1a] text-[#c45d2c] border-b-2 border-[#c45d2c]" : "bg-[#151515] text-[#6b6560] hover:text-[#a09a90]"}`}
                            >
                                <MessageSquare className="w-4 h-4" /> Free Quote
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("book")}
                                className={`contactTabBtn flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300
                                    ${activeTab === "book" ? "bg-[#1a1a1a] text-[#c45d2c] border-b-2 border-[#c45d2c]" : "bg-[#151515] text-[#6b6560] hover:text-[#a09a90]"}`}
                            >
                                <CalendarDays className="w-4 h-4" /> Book Appointment
                            </button>
                        </div>

                        {activeTab === "quote" ? (
                            isSubmitted ? (
                                <div className="contactSuccess text-center p-10 bg-[#2d5a27] rounded-b-2xl text-white">
                                    <CheckCircle className="w-14 h-14 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                                    <p className="text-white/80">Your quote request has been sent. We'll be in touch shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contactForm bg-[#1a1a1a] rounded-b-2xl p-6 sm:p-8 space-y-4">
                                    <Input
                                        id="name" type="text" placeholder="Full Name" required
                                        value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-13 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all"
                                    />
                                    <Input
                                        id="phone" type="tel" placeholder="Phone" required
                                        value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-13 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all"
                                    />
                                    <Input
                                        id="email" type="email" placeholder="Email" required
                                        value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-13 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all"
                                    />
                                    <Input
                                        id="city" type="text" placeholder="City" required
                                        value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)}
                                        className="contactInput bg-[#242424] border-[#333] text-white h-13 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all"
                                    />
                                    <Textarea
                                        id="message" placeholder="Brief project description..." required
                                        value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)}
                                        className="contactTextarea bg-[#242424] border-[#333] text-white rounded-lg p-4 h-28 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c] transition-all"
                                    />
                                    <input type="text" name="company" className="honeypot" value={formData.company}
                                        onChange={(e) => handleInputChange("company", e.target.value)} tabIndex="-1" autoComplete="off" />
                                    <Button type="submit" size="lg" disabled={isSubmitting}
                                        className="contactSubmit w-full font-bold text-base h-14 rounded-xl bg-[#c45d2c] hover:bg-[#a94e25] text-white shadow-lg shadow-[#c45d2c]/20 hover:shadow-xl hover:shadow-[#c45d2c]/30 transition-all duration-300 transform hover:scale-[1.02]">
                                        {isSubmitting ? "Sending..." : "Request My Free Quote"}
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