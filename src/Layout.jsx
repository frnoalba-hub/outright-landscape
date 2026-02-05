import React, { useState, useEffect } from "react";
import { Phone, Menu, X, Mail, MapPin, Building, Star, Linkedin, Video } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import GlobalSchema from "@/components/GlobalSchema";
import Analytics from "@/components/Analytics";
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const navigationItems = [
  { title: "Home", href: createPageUrl("Home") },
  { title: "Services", href: createPageUrl("Home") + "#services" },
  { title: "Irrigation", href: createPageUrl("Irrigation") },
  { title: "Our Work", href: createPageUrl("Home") + "#work" },
  { title: "Service Areas", href: createPageUrl("Home") + "#service-areas" },
  { title: "Contact", href: createPageUrl("Home") + "#contact" }];


export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: locations = [] } = useQuery({
    queryKey: ['locations'],
    queryFn: () => base44.entities.Location.list(null, 100),
    initialData: []
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Preconnect to critical origins for performance
    const preconnectDomains = ['https://app.base44.com'];
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const y = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      const top = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, Math.abs(parseInt(top || "0", 10)));
    };
  }, [isMenuOpen]);



  const handlePhoneClick = (location) => {
      if (window.dataLayer) {
          window.dataLayer.push({
              event: 'phone_click',
              event_category: 'engagement',
              event_label: location,
              phone_number: '626-343-6028'
          });

          // Track call now button clicks specifically
          window.dataLayer.push({
              event: 'call_now_button_click',
              event_category: 'conversion',
              event_label: location,
              phone_number: '626-343-6028'
          });

          // Track call initiated
          window.dataLayer.push({
              event: 'call_initiated',
              event_category: 'engagement',
              event_label: location,
              click_location: location
          });
      }
      if (window.gtag) {
          window.gtag('event', 'phone_click', {
              event_category: 'engagement',
              event_label: location,
              value: 1
          });

          window.gtag('event', 'call_button_click', {
              event_category: 'conversion',
              phone_number: '626-343-6028',
              location: location
          });
      }
  };

  return (
    <div className="min-h-screen bg-white">
      <GlobalSchema />
      <Analytics />

      <style>{`
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 70px; }
        img { 
          content-visibility: auto;
        }
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <header className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg py-1 sm:py-1.5' : 'bg-[#1a1a1a]/70 backdrop-blur-sm py-2 sm:py-2.5'}`
      }>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href={createPageUrl("Home")}
              className="headerLogo flex items-center gap-3 group"
              aria-label="Outright Landscape Home">

              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c125bb3e8_OutrightLandscapeConstructionEmblem1.png"
                alt="Outright Landscape Construction Logo"
                className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                width="80"
                height="80"
                fetchpriority="high"
                decoding="async" />
                
              <div className="flex flex-col">
                <span className="headerBrandName font-bold text-base sm:text-lg leading-tight text-white">Outright Landscape</span>
                <span className="headerLicense text-[10px] sm:text-xs text-[#b8945a] font-semibold tracking-wider">CSLB #1073845</span>
              </div>
            </a>
            
            <ul className="headerNav hidden lg:flex items-center space-x-7">
              {navigationItems.map((item) => <li key={item.title}>
                  <a
                    href={item.href}
                    className="headerNavLink text-white/70 hover:text-[#c45d2c] font-medium transition-colors text-sm tracking-wide py-2">
                    {item.title}
                  </a>
                </li>
              )}
            </ul>
            
            <div className="headerCtas hidden lg:flex items-center gap-3">
                <Button asChild variant="outline" className="headerQuoteBtn border border-[#b8945a]/50 text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold px-5 py-2 rounded-lg transition-all text-sm bg-transparent">
                  <a href="#contact" aria-label="Get a free quote">
                    Get Quote
                  </a>
                </Button>
                <Button asChild className="headerCallBtn bg-[#c45d2c] hover:bg-[#a94e25] text-white font-semibold px-5 py-2 rounded-lg shadow-lg shadow-[#c45d2c]/20 transition-all border-0 text-sm">
                  <a href="tel:626-343-6028" aria-label="Call Outright Landscape at (626) 343-6028" onClick={() => handlePhoneClick('header')}>
                    <Phone className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
                    (626) 343-6028
                  </a>
                </Button>
              </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mobileMenuBtn h-9 w-9 rounded-lg bg-white/10 text-white border border-white/20
                             hover:bg-white/20 active:bg-white/30"
                  aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="mobileMenu w-80 bg-[#1a1a1a] border-[#333] p-6">
                <SheetClose asChild>
                  <button
                    aria-label="Close menu"
                    className="mobileMenuClose absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full
                       bg-white/10 text-white hover:bg-white/20">
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </SheetClose>
                
                <div className="flex flex-col h-full">
                  <div className="mobileMenuHeader text-center pb-6 border-b border-[#333] mt-6">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c125bb3e8_OutrightLandscapeConstructionEmblem1.png"
                      alt="Outright Landscape Construction Logo"
                      className="w-14 h-14 mx-auto mb-3"
                      width="56"
                      height="56"
                      loading="lazy"
                      decoding="async" />
                    <h3 className="text-lg font-bold text-white">Outright Landscape</h3>
                    <p className="text-sm text-[#b8945a] font-medium">(626) 343-6028</p>
                  </div>

                  <ul className="mobileMenuNav flex flex-col space-y-1 mt-6">
                    {navigationItems.map((item) =>
                    <li key={item.title}>
                        <SheetClose asChild>
                          <a
                          href={item.href}
                          className="mobileMenuLink block text-base p-4 rounded-lg text-[#a09a90] hover:text-white hover:bg-[#242424] transition-colors duration-200 font-medium">
                            {item.title}
                          </a>
                        </SheetClose>
                      </li>
                    )}
                  </ul>

                  <div className="mobileMenuCta mt-auto">
                    <SheetClose asChild>
                      <a
                        href="tel:626-343-6028"
                        onClick={() => handlePhoneClick('mobile_menu')}
                        className="mobileCallBtn inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#c45d2c] px-5 py-4 font-semibold text-white shadow-lg shadow-[#c45d2c]/20 transition-all hover:bg-[#a94e25]">
                        <Phone className="w-5 h-5" aria-hidden="true" />
                        Call (626) 343-6028
                      </a>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="siteFooter bg-[#111] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
          {/* Top accent line */}
          <div className="h-px w-full bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c125bb3e8_OutrightLandscapeConstructionEmblem1.png"
                alt="Outright Landscape Construction Logo"
                className="footerLogo h-14 w-auto mb-4"
                width="56"
                height="56"
                loading="lazy"
                decoding="async" />

              <p className="footerDesc text-[#6b6560] text-sm leading-relaxed">
                Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas and the San Gabriel Valley.
              </p>
              <div className="footerSocials flex gap-3 mt-6">
                <a href="https://share.google/7R4p12cJP2hQI8Ppy" target="_blank" rel="noopener noreferrer" className="text-[#6b6560] hover:text-[#c45d2c] transition-colors" aria-label="View our Google reviews">
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/ba08b0eaa_google.png" alt="Google" className="w-5 h-5" />
                </a>
                <a href="https://www.homeadvisor.com/rated.OUTRIGHTLANDSCAPE.112318590.html" target="_blank" rel="noopener noreferrer" className="text-[#6b6560] hover:text-[#c45d2c] transition-colors" aria-label="View our Angi reviews">
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/9356455c5_Angi_Symbol_1C_Heart_RGB.png" alt="Angi" className="w-5 h-5" />
                </a>
                <a href="https://www.houzz.com/professionals/landscape-contractors/outright-landscape-pfvwus-pf~851831346" target="_blank" rel="noopener noreferrer" className="text-[#6b6560] hover:text-[#c45d2c] transition-colors" aria-label="View our Houzz profile">
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/38bcd5dbe_social_circle_green_48px.png" alt="Houzz" className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/outright-landscape/" target="_blank" rel="noopener noreferrer" className="text-[#6b6560] hover:text-[#c45d2c] transition-colors" aria-label="Follow us on LinkedIn">
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/7138a6431_linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@outright_landscape" target="_blank" rel="noopener noreferrer" className="text-[#6b6560] hover:text-[#c45d2c] transition-colors" aria-label="Follow us on TikTok">
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/b061a17e7_tik-tok.png" alt="TikTok" className="w-5 h-5" />
                </a>
              </div>
              </div>

            <div>
              <h4 className="footerLinksTitle font-bold text-sm mb-5 text-[#b8945a] uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href={createPageUrl("Home")} className="footerLink text-[#6b6560] hover:text-[#c45d2c] transition-colors">Home</a></li>
                <li><a href={createPageUrl("Home") + "#services"} className="footerLink text-[#6b6560] hover:text-[#c45d2c] transition-colors">Services</a></li>
                <li><a href={createPageUrl("Irrigation")} className="footerLink text-[#6b6560] hover:text-[#c45d2c] transition-colors">Irrigation</a></li>
                <li><a href={createPageUrl("Home") + "#work"} className="footerLink text-[#6b6560] hover:text-[#c45d2c] transition-colors">Our Work</a></li>
                <li><a href={createPageUrl("Home") + "#contact"} className="footerLink text-[#6b6560] hover:text-[#c45d2c] transition-colors">Contact</a></li>
                <li><a href="https://outrightlandscape.com/api/sitemap" target="_blank" rel="noopener noreferrer" className="footerLink text-[#6b6560] hover:text-[#c45d2c] transition-colors">Sitemap</a></li>
                </ul>
            </div>

            <div>
              <h4 className="footerContactTitle font-bold text-sm mb-5 text-[#b8945a] uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 text-sm text-[#6b6560]">
                <li><a href="tel:626-343-6028" onClick={() => handlePhoneClick('footer')} className="footerContactLink hover:text-[#c45d2c] transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" /> (626) 343-6028
                </a></li>
                <li>
                  <a href="mailto:office@outrightlandscape.com" className="footerContactLink text-[#6b6560] hover:text-[#c45d2c] transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" aria-hidden="true" /> office@outrightlandscape.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" /> Covina, CA 91722
                </li>
                <li className="flex items-center gap-2">
                  <Building className="w-4 h-4" aria-hidden="true" /> CSLB #1073845
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footerAreasTitle font-bold text-sm mb-5 text-[#b8945a] uppercase tracking-wider">Service Areas</h4>
              <div className="grid grid-cols-1 gap-y-2 text-sm">
                {locations.slice(0, 8).map(city => {
                  return (
                    <a 
                      key={city.name}
                      href={`${createPageUrl('ServiceArea')}?city=${city.slug}`}
                      className="footerAreaLink text-[#6b6560] hover:text-[#c45d2c] transition-colors"
                    >
                      {city.name}
                    </a>
                  );
                })}
                <a href={createPageUrl("Home") + "#service-areas"} className="footerViewAll text-[#c45d2c] hover:text-[#b8945a] transition-colors font-medium">
                  View All {locations.length} Cities →
                </a>
              </div>
            </div>
          </div>

          <div className="footerBottom border-t border-[#222] mt-10 pt-8 text-center">
            <p className="text-[#4a4540] text-sm">
              © {new Date().getFullYear()} Outright Landscape Construction. All Rights Reserved. | CSLB #1073845
            </p>
          </div>
        </div>
      </footer>
    </div>);

}