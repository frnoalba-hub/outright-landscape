import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, CalendarCheck, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import confetti from 'canvas-confetti';
import BookingCalendar from './BookingCalendar';
import TimeSlotPicker from './TimeSlotPicker';
import ServiceTypeSelect from './ServiceTypeSelect';

const NOTIFICATION_EMAILS = ["outrightlandscapecovina@gmail.com", "frno.alba@gmail.com"];

export default function BookingForm({ cityName = "your area" }) {
    const [step, setStep] = useState(1); // 1: service+date, 2: contact info
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', city: cityName,
        service_type: '', appointment_date: null, time_slot: '', notes: '', company: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (field, value) =>
        setFormData(prev => ({ ...prev, [field]: value }));

    const canProceed = formData.service_type && formData.appointment_date && formData.time_slot;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const appointmentData = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            service_type: formData.service_type,
            appointment_date: format(formData.appointment_date, 'yyyy-MM-dd'),
            time_slot: formData.time_slot,
            notes: formData.notes,
            status: 'pending'
        };

        await base44.entities.Appointment.create(appointmentData);

        // Send email notification
        if (!formData.company) {
            const payload = new URLSearchParams({
                _subject: `New Appointment Booking — ${cityName}`,
                name: formData.name,
                phone: formData.phone,
                email: formData.email || 'Not provided',
                city: formData.city,
                message: `Service: ${formData.service_type.replace(/_/g, ' ')}\nDate: ${format(formData.appointment_date, 'EEEE, MMMM d, yyyy')}\nTime: ${formData.time_slot}\nNotes: ${formData.notes || 'None'}`,
            });
            await fetch(EMAIL_RELAY_URL, {
                method: "POST", mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
                body: payload.toString(),
            });
        }

        // Analytics
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'appointment_booked', event_category: 'conversion', event_label: cityName, service_type: formData.service_type });
        }
        if (window.gtag) {
            window.gtag('event', 'appointment_booked', { event_category: 'conversion', event_label: cityName, value: 1 });
        }

        setIsSubmitted(true);
        setIsSubmitting(false);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    };

    if (isSubmitted) {
        return (
            <div className="bookingSuccess text-center p-8 sm:p-10 bg-[#2d5a27] rounded-2xl text-white animate-in fade-in duration-500">
                <CalendarCheck className="w-14 h-14 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Appointment Booked!</h3>
                <p className="text-white/80 text-sm mb-1">
                    {format(formData.appointment_date, 'EEEE, MMMM d, yyyy')} at {formData.time_slot}
                </p>
                <p className="text-white/60 text-xs">We'll confirm your appointment shortly via phone or email.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bookingForm bg-[#1a1a1a] rounded-2xl p-5 sm:p-7 space-y-5">
            {/* Step indicator */}
            <div className="bookingSteps flex items-center gap-2 mb-1">
                <div className={`bookingStepDot h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-[#c45d2c]' : 'bg-[#333]'}`} />
                <div className={`bookingStepDot h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-[#c45d2c]' : 'bg-[#333]'}`} />
            </div>

            {step === 1 && (
                <div className="bookingStep1 space-y-5 animate-in fade-in duration-300">
                    <ServiceTypeSelect selectedService={formData.service_type} onSelectService={(v) => handleInputChange('service_type', v)} />
                    <BookingCalendar selectedDate={formData.appointment_date} onSelectDate={(d) => handleInputChange('appointment_date', d)} />
                    <TimeSlotPicker selectedSlot={formData.time_slot} onSelectSlot={(v) => handleInputChange('time_slot', v)} />
                    <Button type="button" disabled={!canProceed} onClick={() => setStep(2)}
                        className="bookingNextBtn w-full font-bold text-sm h-12 rounded-xl bg-[#c45d2c] hover:bg-[#a94e25] text-white shadow-lg shadow-[#c45d2c]/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                        Continue →
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="bookingStep2 space-y-3 animate-in fade-in duration-300">
                    {/* Summary */}
                    <div className="bookingSummary bg-[#242424] border border-[#333] rounded-xl p-4 mb-2">
                        <p className="text-xs text-[#8a8478] mb-1 font-semibold uppercase tracking-wide">Your Appointment</p>
                        <p className="text-white text-sm font-medium">
                            {formData.service_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-[#b8945a] text-xs mt-0.5">
                            {formData.appointment_date && format(formData.appointment_date, 'EEEE, MMM d, yyyy')} • {formData.time_slot}
                        </p>
                        <button type="button" onClick={() => setStep(1)} className="bookingEditBtn text-[#c45d2c] text-xs mt-2 hover:underline font-medium">Edit ←</button>
                    </div>

                    <Input placeholder="Full Name *" required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bookingInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c]" />
                    <Input placeholder="Phone *" required type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bookingInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c]" />
                    <Input placeholder="Email (optional)" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bookingInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c]" />
                    <Input placeholder="City" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)}
                        className="bookingInput bg-[#242424] border-[#333] text-white h-12 rounded-lg px-4 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c]" />
                    <Textarea placeholder="Additional notes (optional)" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="bookingTextarea bg-[#242424] border-[#333] text-white rounded-lg p-4 h-20 placeholder:text-[#6b6560] focus:ring-2 focus:ring-[#c45d2c] focus:border-[#c45d2c]" />

                    <input type="text" name="company" className="hidden" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} tabIndex="-1" autoComplete="off" />

                    <Button type="submit" size="lg" disabled={isSubmitting}
                        className="bookingSubmitBtn w-full font-bold text-base h-14 rounded-xl bg-[#c45d2c] hover:bg-[#a94e25] text-white shadow-lg shadow-[#c45d2c]/20 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                        {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Booking...</> : 'Book Appointment'}
                    </Button>
                </div>
            )}
        </form>
    );
}