import React from "react";
import { Button } from "@/components/ui/button";
import { Sprout, Hammer, Droplets, Award, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import SEO from "@/components/SEO";
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SharedHero from '@/components/SharedHero';
import ContactForm from '@/components/ContactForm';

const services = [
  { icon: Sprout, title: "Sod Installation Walnut", description: "Premium turf for beautiful Walnut lawns.", keywords: "sod installation, turf" },
  { icon: Hammer, title: "Hardscaping Walnut", description: "Expert paver patios and hardscape.", keywords: "hardscaping, pavers" },
  { icon: Droplets, title: "Irrigation Walnut", description: "Professional sprinkler systems.", keywords: "irrigation, sprinklers" },
  { icon: Award, title: "Landscape Design Walnut", description: "Complete landscape design services.", keywords: "landscape design" }
];

const projects = [
  { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg", title: "Sod Installation", description: "Lush lawn transformation", alt: "Outright Landscape – Sod Installation in Walnut" },
  { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg", title: "Paver Patio", description: "Custom hardscaping", alt: "Outright Landscape – Paver Patio in Walnut" },
  { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg", title: "Irrigation System", description: "Professional installation", alt: "Outright Landscape – Irrigation System in Walnut" }
];

export default function WalnutLandscaping() {
  const trackPhoneClick = (location) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_click',
        event_category: 'engagement',
        event_label: `walnut_${location}`,
        phone_number: '626-343-6028'
      });
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Outright Landscape - Walnut",
    "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
    "telephone": "+1-626-343-6028",
    "email": "outrightlandscape@yahoo.com",
    "address": { "@type": "PostalAddress", "addressLocality": "Walnut", "addressRegion": "CA", "postalCode": "91789", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": 34.0203, "longitude": -117.8651 },
    "url": "https://outrightlandscape.com/walnut-landscaping",
    "priceRange": "$$",
    "areaServed": { "@type": "City", "name": "Walnut" }
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://outrightlandscape.com" },
    { name: "Service Areas", url: "https://outrightlandscape.com/#service-areas" },
    { name: "Walnut Landscaping", url: "https://outrightlandscape.com/walnut-landscaping" }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Walnut Landscape Construction & Landscaping Services | Outright Landscape"
        description="Professional landscaping, concrete, and paver work across Walnut and nearby areas. Call now for a free AI design preview and same-week quote."
        keywords="landscaping Walnut, sod installation Walnut, hardscaping Walnut, landscape contractor Walnut, CSLB 1073845, AI design preview"
        canonicalUrl="https://outrightlandscape.com/walnut-landscaping"
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg"
      />

      <BreadcrumbSchema items={breadcrumbItems} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero Section - Same as Homepage */}
      <SharedHero 
        title={<>Transform Your<br /><span className="text-green-400">Outdoor Living Space</span></>}
        subtitle="Licensed C-27 landscape contractor serving Walnut & the San Gabriel Valley"
        onPhoneClick={trackPhoneClick}
        onViewServicesClick={() => { /* Implement navigation or scroll if needed */ }}
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sod Installation Walnut</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">Expert landscaping services for Walnut properties.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{services.map((service, i) => (<div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"><service.icon className="w-8 h-8 text-green-600" /></div><h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3><p className="text-gray-600 leading-relaxed mb-4">{service.description}</p></div>))}</div>
          <div className="mt-12 text-center"><a href={createPageUrl('Home') + '#services'} className="text-green-600 hover:text-green-700 font-semibold text-lg underline">View All Our Landscaping Services</a></div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hardscaping Walnut</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{projects.map((p, i) => (<div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"><img src={p.image} alt={p.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width="600" height="600" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div><div className="absolute bottom-0 left-0 right-0 p-6 text-white"><h3 className="text-2xl font-bold mb-2">{p.title}</h3><p className="text-green-300">{p.description}</p></div></div>))}</div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center"><h2 className="text-3xl font-bold text-gray-900 mb-8">Also Serving Nearby Communities</h2>
          <div className="flex flex-wrap justify-center gap-4">{[{ name: 'Diamond Bar', page: 'DiamondBarLandscaping' }, { name: 'West Covina', page: 'WestCovinaLandscaping' }, { name: 'Rowland Heights', page: 'RowlandHeightsLandscaping' }, { name: 'San Gabriel Valley', page: 'SanGabrielValleyLandscaping' }].map(city => (<a key={city.name} href={createPageUrl(city.page)} className="group"><div className="bg-white hover:bg-green-500 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 rounded-xl px-6 py-3 group-hover:scale-105 group-hover:shadow-lg"><span className="font-semibold text-gray-700 group-hover:text-white transition-colors flex items-center gap-2">{city.name}<ArrowRight className="w-4 h-4" /></span></div></a>))}</div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Walnut Location</h2></div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106167.77073!2d-117.8651!3d34.0203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d7c8f7e3b6e5%3A0x3e5e5f8e7f8e7f8e!2sWalnut%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Outright Landscape Walnut Location"></iframe>
          </div>
        </div>
      </section>

      <ContactForm cityName="Walnut" darkMode={true} />
    </div>
  );
}