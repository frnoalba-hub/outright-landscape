import React, { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import GlobalSchema from "@/components/GlobalSchema";
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const navigationItems = [
  { title: "Home", href: createPageUrl("Home") },
  { title: "Services", href: createPageUrl("Home") + "#services" },
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

  useEffect(() => {
    // Preconnect to critical origins for performance
    const preconnectDomains = ['https://app.base44.com'];
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Initialize dataLayer immediately for event tracking
    window.dataLayer = window.dataLayer || [];
    
    // Defer GTM/GA loading by 2 seconds after window load
    const loadAnalytics = () => {
      setTimeout(() => {
        // Google Tag Manager
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `;
        document.head.appendChild(gtmScript);

        // Google Analytics 4
        const ga4Script1 = document.createElement('script');
        ga4Script1.async = true;
        ga4Script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(ga4Script1);

        const ga4Script2 = document.createElement('script');
        ga4Script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `;
        document.head.appendChild(ga4Script2);
      }, 2000);
    };

    // Wait for window load, then defer analytics
    if (document.readyState === 'complete') {
      loadAnalytics();
    } else {
      window.addEventListener('load', loadAnalytics);
    }

    // Track initial page view (before analytics loads)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  const handlePhoneClick = (location) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_click',
        event_category: 'engagement',
        event_label: location,
        phone_number: '626-343-6028'
      });
    }
    if (window.gtag) {
      window.gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: location,
        value: 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <GlobalSchema />
      
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }} />
      </noscript>

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

      <header className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1 sm:py-2' : 'bg-white/80 backdrop-blur-sm py-1.5 sm:py-2'}`
      }>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href={createPageUrl("Home")}
              className="flex items-center gap-3 group"
              aria-label="Outright Landscape Home">

              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c125bb3e8_OutrightLandscapeConstructionEmblem1.png"
                alt="Outright Landscape Construction Logo"
                className="h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                width="80"
                height="80"
                fetchpriority="high"
                decoding="async" />
                
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl leading-tight text-gray-900">Outright Landscape</span>
                <span className="text-xs sm:text-sm text-green-600 font-bold tracking-wide">CSLB #1073845</span>
              </div>
            </a>
            
            <ul className="hidden lg:flex items-center space-x-7">
              {navigationItems.map((item) => <li key={item.title}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 font-semibold transition-colors text-base tracking-wide py-2">
                    {item.title}
                  </a>
                </li>
              )}
            </ul>
            
            <div className="hidden lg:flex items-center gap-3">
                <Button asChild variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-5 py-2 rounded-full transition-all hover:scale-105 text-sm">
                  <a href="#contact" aria-label="Get a free quote">
                    Get Quote
                  </a>
                </Button>
                <Button asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition-all hover:scale-105 border-0 text-sm">
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
                  className="h-9 w-9 rounded-xl bg-gray-100 text-gray-700 border border-gray-200
                             hover:bg-gray-200 active:bg-gray-300"
                  aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80 bg-gray-900 border-gray-800 p-6">
                <SheetClose asChild>
                  <button
                    aria-label="Close menu"
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full
                       bg-white/10 text-white hover:bg-white/20">
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </SheetClose>
                
                <div className="flex flex-col h-full">
                  <div className="text-center pb-6 border-b border-gray-700 mt-6">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c125bb3e8_OutrightLandscapeConstructionEmblem1.png"
                      alt="Outright Landscape Construction Logo"
                      className="w-16 h-16 mx-auto mb-3"
                      width="64"
                      height="64"
                      loading="lazy"
                      decoding="async" />
                    <h3 className="text-lg font-bold text-white">Outright Landscape</h3>
                    <p className="text-sm text-green-400 font-medium">(626) 343-6028</p>
                  </div>

                  <ul className="flex flex-col space-y-2 mt-6">
                    {navigationItems.map((item) =>
                    <li key={item.title}>
                        <SheetClose asChild>
                          <a
                          href={item.href}
                          className="block text-lg p-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200">
                            {item.title}
                          </a>
                        </SheetClose>
                      </li>
                    )}
                  </ul>

                  <div className="mt-auto">
                    <SheetClose asChild>
                      <a
                        href="tel:626-343-6028"
                        onClick={() => handlePhoneClick('mobile_menu')}
                        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-5 py-4 font-semibold text-white shadow-md transition-all hover:from-green-600 hover:to-green-700">
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

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c125bb3e8_OutrightLandscapeConstructionEmblem1.png"
                alt="Outright Landscape Construction Logo"
                className="h-20 w-auto mb-4"
                width="80"
                height="80"
                loading="lazy"
                decoding="async" />

              <p className="text-gray-400 text-sm leading-relaxed">
                Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas and the San Gabriel Valley.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-green-400">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href={createPageUrl("Home")} className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href={createPageUrl("Home") + "#services"} className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href={createPageUrl("Home") + "#work"} className="text-gray-400 hover:text-white transition-colors">Our Work</a></li>
                <li><a href={createPageUrl("Home") + "#contact"} className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href={createPageUrl("Sitemap")} className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold text-lg mb-4 text-green-400">Service Areas - All {locations.length} Cities</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {locations.map(city => {
                  return (
                    <a 
                      key={city.name}
                      href={`${createPageUrl('ServiceArea')}?city=${city.slug}`}
                      className={`text-gray-400 hover:text-white transition-colors ${city.slug === 'san-gabriel-valley' ? 'col-span-2' : ''}`}
                    >
                      {city.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-green-400">Contact</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="tel:626-343-6028" onClick={() => handlePhoneClick('footer')} className="hover:text-white transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" aria-hidden="true" /> (626) 343-6028
                  </a></li>
                  <li className="flex items-start gap-2">
                    <span>📧</span> outrightlandscape@yahoo.com
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📍</span> Covina, CA 91722
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🏗️</span> CSLB #1073845
                  </li>
                </ul>
                <div className="flex space-x-4 mt-6">
                  <a href="https://www.yelp.com/biz/outright-landscape-covina" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our Yelp page">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" aria-hidden="true">
                      <title>Yelp</title>
                      <path d="M11.92.5a2.03 2.03 0 00-1.85 1.29L6.1 11.42l-1.62 9.87a2.06 2.06 0 002 2.44l10.2-1.68a2.06 2.06 0 001.67-2.2l-1.92-11.53a2.04 2.04 0 00-2-1.78L12.08.5h-.16zm.18 6.55l3.24 4.5-5.32 2.06zm-1.42.44l4.52-3.26-1.57 5.4-4.88-1.07z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Outright Landscape Construction. All Rights Reserved. | CSLB #1073845
            </p>
          </div>
        </div>
      </footer>
    </div>);

}