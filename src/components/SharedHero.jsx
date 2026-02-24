import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Award, Users, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SharedHero({ 
    cityName = null,
    title = "Transform Your Outdoor Living Space",
    subtitle = "Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas & the San Gabriel Valley",
    description = "Expert Pavers • Turf Installation • Irrigation Systems • Hardscaping",
    aiCtaText = "Call today for a free AI landscape design preview — see your new yard before we build it.",
    phoneNumber = "626-343-6028",
    backgroundImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png",
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

    // Fix subtitle for San Gabriel Valley to avoid double-name
    const displaySubtitle = cityName === "San Gabriel Valley" 
        ? "Licensed C-27 landscape contractor serving the San Gabriel Valley & surrounding areas"
        : subtitle;

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
                <link rel="preload" as="image" href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/1f85c4c84_generated_image.png" fetchpriority="high" />
                
                <div className="hero-inner relative z-20 text-center px-4 w-full max-w-[380px] md:max-w-4xl mx-auto">
                    <div className="md:max-w-3xl md:mx-auto flex flex-col gap-3 md:gap-5 items-center">
                        <span className="inline-block bg-green-500/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-white font-semibold text-xs tracking-wide">
                            Licensed C-27 Contractor
                        </span>
                        
                        <h1 className="text-2xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white md:leading-tight tracking-tight m-0">
                            {title}
                        </h1>
                        
                        <p className="text-sm sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl">
                            {displaySubtitle}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                            {description.split('•').map((item, i) => (
                                <span key={i} className="text-green-400 text-xs sm:text-sm font-medium px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full border border-green-500/50">{item.trim()}</span>
                            ))}
                        </div>

                        {/* Reviews & Social Proof */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <div className="flex items-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 mr-1.5" />
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-white text-sm font-semibold">4.8</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://www.facebook.com/outrightlandscape" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                <a href="https://www.houzz.com/professionals/landscape-contractors/outright-landscape-pfvwus-pf~851831346" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Houzz">
                                    <img src="/images/38bcd5dbe_social_circle_green_48px.png" alt="Houzz" className="w-5 h-5" />
                                </a>
                                <a href="https://www.tiktok.com/@outright_landscape" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="TikTok">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                                </a>
                            </div>
                        </div>

                        {/* Trust Badges with Checkmarks */}
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3 text-white text-xs">
                            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                                <span>Licensed C-27 #1073845</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                                <span>10+ Years Experience</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                                <span>Free Estimates</span>
                            </div>
                        </div>

                        {/* Main CTA with prominent phone */}
                        <div className="cta-card bg-black/50 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-md mx-auto w-full mt-3">
                            <p className="text-white/60 text-xs text-center mb-2">CALL US TODAY</p>
                            <a href={`tel:+1${phoneNumber.replace(/\D/g, '')}`} onClick={() => handlePhoneClick('hero_main_cta')}>
                                <Button size="default" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-6 py-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
                                    <Phone className="mr-2 w-5 h-5" aria-hidden="true" />
                                    {phoneNumber}
                                </Button>
                            </a>
                            <p className="text-white/50 text-[10px] text-center mt-2">
                                <Sparkles className="w-3 h-3 inline mr-1" aria-hidden="true" />
                                Ask about our free design consultation
                            </p>
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