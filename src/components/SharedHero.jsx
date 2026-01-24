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
                    max-width: 300px !important;
                    width: 100% !important;
                    margin: 0 auto !important;
                    padding: 0.65rem !important;
                  }
                }

            `}</style>

            <section id="home" className="hero relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-40 md:pb-12" style={{ zIndex: 0 }}>
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10"></div>
                {/* Preload critical hero image */}
                <link rel="preload" as="image" href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg" fetchpriority="high" />
                
                <div className="hero-inner relative z-20 text-center px-4 w-full max-w-[380px] md:max-w-4xl mx-auto">
                    <div className="md:max-w-3xl md:mx-auto flex flex-col gap-3 md:gap-5 items-center">
                        <span className="inline-block bg-green-500/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-white font-semibold text-xs tracking-wide">
                            Licensed C-27 Contractor
                        </span>
                        
                        <h1 className="text-2xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white md:leading-tight tracking-tight m-0">
                            {title}
                        </h1>
                        
                        <p className="text-sm sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl">
                            {subtitle}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                            {description.split('•').map((item, i) => (
                                <span key={i} className="text-green-400 text-xs sm:text-sm font-medium px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full border border-green-500/50">{item.trim()}</span>
                            ))}
                        </div>

                        {/* AI CTA - Compact */}
                        <div className="cta-card bg-black/50 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-md mx-auto w-full mt-3">
                            <p className="text-white/90 text-xs sm:text-sm mb-3 flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4 text-green-400" aria-hidden="true" />
                                <span>{aiCtaText}</span>
                            </p>
                            <a href={`tel:+1${phoneNumber.replace(/\D/g, '')}`} onClick={() => handlePhoneClick('hero_ai_cta')}>
                                <Button size="default" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl">
                                    <Phone className="mr-2 w-4 h-4" aria-hidden="true" />
                                    Call {phoneNumber}
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto mt-2">
                            <a href="#contact" aria-label="Get your free estimate" onClick={() => handleQuoteClick('hero_quote_button')} className="w-full sm:w-auto">
                                <Button size="default" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg shadow-lg transition-all">
                                    Get Your Free Quote
                                </Button>
                            </a>
                            <a href="#services" aria-label="View our landscaping services" onClick={handleViewServices} className="w-full sm:w-auto">
                                <Button size="default" variant="outline" className="w-full sm:w-auto border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg transition-all">
                                    View Services
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-white/80 text-xs mt-3">
                            <div className="flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-green-400" aria-hidden="true" />
                                <span>CSLB #1073845</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4 text-green-400" aria-hidden="true" />
                                <span>Expert Team</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-green-400" aria-hidden="true" />
                                <span>10+ Years</span>
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