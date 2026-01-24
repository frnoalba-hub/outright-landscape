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
                .diagonal-stripes {
                    background-image: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 35px,
                        rgba(16, 185, 129, 0.1) 35px,
                        rgba(16, 185, 129, 0.1) 70px
                    );
                }
            `}</style>

            <section id="home" className="hero relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-40 md:pb-12" style={{ zIndex: 0 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 z-10"></div>
                <div className="absolute inset-0 diagonal-stripes z-10"></div>
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
                    <div className="md:max-w-4xl md:mx-auto flex flex-col gap-4 md:gap-6 items-center">
                        <div className="inline-block bg-green-500 border-4 border-white px-6 py-2">
                            <span className="text-white font-black uppercase tracking-widest text-xs sm:text-sm">Licensed C-27</span>
                        </div>
                        <h1 className="text-2xl leading-tight sm:text-5xl md:text-7xl font-black text-white md:leading-tight tracking-tight uppercase m-0 border-b-4 border-green-500 pb-3">
                            {title}
                        </h1>
                        <p className="text-sm sm:text-xl md:text-2xl text-white sm:text-white font-bold uppercase tracking-wider mt-2 sm:mt-0">
                            {subtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 text-green-400 font-black uppercase text-xs sm:text-sm tracking-wider">
                            {description.split('•').map((item, i) => (
                                <span key={i} className="bg-gray-900/80 border-2 border-green-500 px-4 py-2">{item.trim()}</span>
                            ))}
                        </div>

                        {/* AI Design Preview CTA - Bold Geometric Version */}
                        <div className="cta-card bg-gray-900 border-4 border-green-500 p-4 sm:p-6 max-w-xs sm:max-w-2xl mx-auto w-full shadow-2xl relative overflow-hidden mt-4">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-green-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <div className="bg-green-500 p-2 border-2 border-white">
                                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="text-white text-xs sm:text-base font-black uppercase tracking-wider">
                                        {aiCtaText}
                                    </p>
                                </div>
                                <a href={`tel:+1${phoneNumber.replace(/\D/g, '')}`} onClick={() => handlePhoneClick('hero_ai_cta')}>
                                    <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-black text-sm sm:text-lg px-6 py-4 sm:px-10 sm:py-5 border-4 border-white hover:border-green-300 shadow-2xl transform transition hover:scale-105 uppercase tracking-wide">
                                        <Phone className="mr-2 w-5 h-5" aria-hidden="true" />
                                        Call ({phoneNumber})
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 items-center w-full sm:w-auto mt-4">
                            <a href="#contact" aria-label="Get your free estimate" onClick={() => handleQuoteClick('hero_quote_button')} className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto border-4 border-white bg-white text-gray-900 hover:bg-green-500 hover:text-white hover:border-green-500 font-black text-sm sm:text-lg px-8 py-6 sm:px-12 sm:py-7 shadow-xl transition-all duration-300 uppercase tracking-wider">
                                    Get Your Free Quote
                                </Button>
                            </a>
                            <a href="#services" aria-label="View our landscaping services" onClick={handleViewServices} className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-4 border-green-500 bg-transparent text-white hover:bg-green-500 hover:border-white font-black text-sm sm:text-lg px-8 py-6 sm:px-12 sm:py-7 shadow-xl transition-all duration-300 uppercase tracking-wider">
                                    View Services
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-white mt-4">
                            <div className="bg-gray-900 border-3 border-green-500 px-4 py-3 flex items-center gap-2">
                                <Award className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                                <span className="text-xs sm:text-sm font-black uppercase tracking-wide">CSLB #1073845</span>
                            </div>
                            <div className="bg-gray-900 border-3 border-green-500 px-4 py-3 flex items-center gap-2">
                                <Users className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                                <span className="text-xs sm:text-sm font-black uppercase tracking-wide">Expert Team</span>
                            </div>
                            <div className="bg-gray-900 border-3 border-green-500 px-4 py-3 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                                <span className="text-xs sm:text-sm font-black uppercase tracking-wide">10+ Years</span>
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