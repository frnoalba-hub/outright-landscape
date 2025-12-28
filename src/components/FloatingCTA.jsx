import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePhoneClick = () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'phone_click',
                event_category: 'engagement',
                event_label: 'floating_cta',
                phone_number: '626-343-6028'
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
            {/* Expanded Quick Actions */}
            {isExpanded && (
                <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <Button
                        onClick={() => {
                            handlePhoneClick();
                            window.location.href = 'tel:626-343-6028';
                        }}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-6 py-3 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                        <Phone className="w-5 h-5 animate-pulse" />
                        <span className="hidden sm:inline">Call Now</span>
                    </Button>
                    <Button
                        onClick={() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            setIsExpanded(false);
                        }}
                        className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border-2 border-green-600"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="hidden sm:inline">Get Quote</span>
                    </Button>
                </div>
            )}

            {/* Main Toggle Button */}
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold w-16 h-16 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group overflow-hidden"
                aria-label={isExpanded ? "Close quick actions" : "Open quick actions"}
            >
                <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                {isExpanded ? (
                    <X className="w-6 h-6 relative z-10 animate-in spin-in duration-200" />
                ) : (
                    <Phone className="w-6 h-6 relative z-10 animate-pulse" />
                )}
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
        </div>
    );
}