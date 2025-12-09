import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Award, Users, Clock, Sparkles } from 'lucide-react';

export default function SharedHero({ 
    cityName = null,
    title = "Transform Your Outdoor Living Space",
    subtitle = "Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas & the San Gabriel Valley",
    description = "Expert Pavers • Turf Installation • Irrigation Systems • Hardscaping",
    aiCtaText = "Call today for a free AI landscape design preview — see your new yard before we build it.",
    phoneNumber = "626-343-6028",
    backgroundImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg",
    backgroundImageAlt = "Outright Landscape - Professional Landscaping Services",
    onPhoneClick = () => {},
    trackPhoneClick, // Alias support
    trackQuoteClick, // Alias support
    onViewServicesClick = () => {},
    trackViewServicesClick // Alias support
}) {
    // Normalize handlers
    const handlePhoneClick = trackPhoneClick || onPhoneClick;
    const handleQuoteClick = trackQuoteClick || handlePhoneClick;
    const handleViewServices = trackViewServicesClick || onViewServicesClick;

    return (
        <>
            <style>{`
                /* Lower hero text on mobile only */
                @media (max-width: 768px) {
                  .hero {
                    padding-top: 8rem !important;
                    padding-bottom: 4rem !important;
                    background-position: center !important;
                    background-size: cover !important;
                    z-index: 0 !important;
                  }
                  .hero-inner {
                    max-width: 420px !important;
                    margin: 0 auto !important;
                    padding-left: 1rem !important;
                    padding-right: 1rem !important;
                  }
                  .hero h1 {
                    font-size: 1.5rem !important;
                    line-height: 1.05 !important;
                    text-align: center !important;
                    margin: 0 !important;
                  }
                  .hero p {
                    font-size: 0.85rem !important;
                    text-align: center !important;
                    margin-top: 0.5rem !important;
                    color: rgba(255,255,255,0.95) !important;
                  }
                  .cta-card {
                    max-width: 320px !important;
                    width: 100% !important;
                    margin: 0 auto !important;
                    padding: 0.75rem !important;
                  }
                }
            `}</style>

            <section id="home" className="hero relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-40 md:pb-12" style={{ zIndex: 0 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/75 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                    role="img"
                    aria-label={backgroundImageAlt}
                ></div>
                {/* Preload critical hero image */}
                <link rel="preload" as="image" href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg" fetchpriority="high" />
                
                <div className="hero-inner relative z-20 text-center px-4 w-full max-w-[420px] md:max-w-5xl mx-auto">
                    <div className="md:max-w-4xl md:mx-auto flex flex-col gap-3 md:gap-4 items-center">
                        <h1 className="text-2xl leading-tight sm:text-5xl md:text-7xl font-black text-white md:leading-tight tracking-tight drop-shadow-md m-0">
                            {title}
                        </h1>
                        <p className="text-sm sm:text-xl md:text-2xl text-white/95 sm:text-gray-100 font-light drop-shadow-md mt-2 sm:mt-0">
                            {subtitle}
                        </p>
                        <p className="text-sm sm:text-lg md:text-xl text-green-300 font-semibold drop-shadow-md">
                            {description}
                        </p>

                        {/* AI Design Preview CTA */}
                        <div className="cta-card bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md border-2 border-green-400 rounded-2xl p-3 sm:p-8 max-w-xs sm:max-w-2xl mx-auto w-full">
                            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-green-400 animate-pulse" aria-hidden="true" />
                                <h2 className="text-lg sm:text-3xl font-bold text-white">Free AI Design Preview</h2>
                            </div>
                            <p className="text-white text-sm sm:text-lg mb-3 sm:mb-4 leading-relaxed">
                                {aiCtaText}
                            </p>
                            <a href={`tel:+1${phoneNumber.replace(/\D/g, '')}`} onClick={() => handlePhoneClick('hero_ai_cta')}>
                                <Button size="lg" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold text-base sm:text-lg px-6 py-4 sm:px-10 sm:py-6 rounded-full shadow-2xl transform transition hover:scale-105">
                                    <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                                    Call ({phoneNumber})
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-center w-full sm:w-auto">
                            <a href="#contact" aria-label="Get your free estimate" onClick={() => onPhoneClick('hero_quote_button')} className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white bg-black/30 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-bold text-sm sm:text-lg px-6 py-5 sm:px-10 sm:py-7 rounded-full shadow-xl transition-all duration-300">
                                    <span className="whitespace-nowrap">Get Your Free Quote</span>
                                </Button>
                            </a>
                            <a href="#services" aria-label="View our landscaping services" onClick={onViewServicesClick} className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white bg-black/30 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-bold text-sm sm:text-lg px-6 py-5 sm:px-10 sm:py-7 rounded-full shadow-xl transition-all duration-300">
                                    <span className="whitespace-nowrap">View Our Services</span>
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 sm:gap-8 text-white/90">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                                <span className="text-xs sm:text-sm font-medium drop-shadow-md">CSLB #1073845</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                                <span className="text-xs sm:text-sm font-medium drop-shadow-md">Expert Craftsmen</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                                <span className="text-xs sm:text-sm font-medium drop-shadow-md">10+ Years Experience</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
                    <a href="#services" aria-label="Scroll to services section" className="text-white animate-bounce">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </section>
        </>
    );
}