import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Hammer, Home, Fence, Award, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import SEO from "@/components/SEO";
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SharedHero from '@/components/SharedHero';
import ContactForm from '@/components/ContactForm';

const services = [
  {
    icon: Hammer,
    title: "Hardscaping Glendora",
    description: "Expert paver patios, outdoor kitchens, fire pits, and custom hardscape features that enhance your property value.",
    keywords: "hardscaping, pavers, patios, outdoor living"
  },
  {
    icon: Home,
    title: "Paver Installation Glendora",
    description: "Beautiful paver walkways, driveways, and pool decks with professional installation and lasting quality.",
    keywords: "paver installation, walkways, driveways"
  },
  {
    icon: Fence,
    title: "Retaining Walls Glendora",
    description: "Functional and attractive retaining walls that solve drainage issues and create usable outdoor space.",
    keywords: "retaining walls, drainage, erosion control"
  },
  {
    icon: Award,
    title: "Landscape Design Glendora",
    description: "Complete landscape design services from initial concept through final installation and beyond.",
    keywords: "landscape design, outdoor design, yard planning"
  }
];

const projects = [
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
    title: "Backyard Paver Patio",
    description: "Custom hardscaping in Glendora",
    alt: "Outright Landscape – Backyard Paver Patio in Glendora"
  },
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/954e6bafa_2024-09-04.jpg",
    title: "Irrigation Installation",
    description: "Professional sprinkler system",
    alt: "Outright Landscape – Irrigation Installation in Glendora"
  },
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/6633fbff6_2025-05-286.jpg",
    title: "Paver Walkway",
    description: "Elegant hardscape design",
    alt: "Outright Landscape – Paver Walkway in Glendora"
  }
];

export default function GlendoraLandscaping() {
  const trackPhoneClick = (location) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_click',
        event_category: 'engagement',
        event_label: `glendora_${location}`,
        phone_number: '626-343-6028'
      });
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Outright Landscape - Glendora",
    "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
    "telephone": "+1-626-343-6028",
    "email": "outrightlandscape@yahoo.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Glendora",
      "addressRegion": "CA",
      "postalCode": "91740",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.1361,
      "longitude": -117.8653
    },
    "url": "https://outrightlandscape.com/glendora-landscaping",
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Glendora"
    }
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://outrightlandscape.com" },
    { name: "Service Areas", url: "https://outrightlandscape.com/#service-areas" },
    { name: "Glendora Landscaping", url: "https://outrightlandscape.com/glendora-landscaping" }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Glendora Landscape Construction & Landscaping Services | Outright Landscape"
        description="Transform your yard or driveway with trusted local landscapers. Call now for your free AI design preview and same-week quote."
        keywords="hardscaping Glendora, paver installation Glendora, landscape design Glendora, landscape contractor Glendora, patios Glendora, retaining walls Glendora, CSLB 1073845, AI design preview"
        canonicalUrl="https://outrightlandscape.com/glendora-landscaping"
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg"
      />

      <BreadcrumbSchema items={breadcrumbItems} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero Section - Same as Homepage */}
      <SharedHero 
        title={<>Transform Your<br /><span className="text-green-400">Outdoor Living Space</span></>}
        subtitle="Licensed C-27 landscape contractor serving Glendora & the San Gabriel Valley"
        onPhoneClick={trackPhoneClick}
        onViewServicesClick={() => {}}
      />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hardscaping Glendora
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your outdoor space with expert hardscaping, paver installation, and landscape design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.keywords.split(', ').map((keyword, idx) => (
                    <span key={idx} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4 text-lg">Looking for comprehensive landscaping solutions?</p>
            <a href={createPageUrl('Home') + '#services'} className="text-green-600 hover:text-green-700 font-semibold text-lg underline">
              View All Our Landscaping Services
            </a>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Paver Installation Glendora
            </h2>
            <p className="text-xl text-gray-600">
              See our expert paver installation and hardscape work throughout Glendora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square">
                <img 
                  src={project.image} 
                  alt={project.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  width="600"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-green-300">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Glendora Trusts Outright Landscape
            </h2>
            <p className="text-xl text-green-100">
              Expert hardscaping, quality materials, and exceptional craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Licensed & Insured", desc: "CSLB #1073845" },
              { title: "Expert Craftsmen", desc: "Precision hardscaping installation" },
              { title: "Premium Materials", desc: "High-quality pavers & stone" },
              { title: "Free Estimates", desc: "Honest, competitive pricing" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-green-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Also Serving Nearby Communities
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Covina', page: 'CovinaLandscaping' },
              { name: 'San Dimas', page: 'SanDimasLandscaping' },
              { name: 'Azusa', page: 'AzusaLandscaping' },
              { name: 'San Gabriel Valley', page: 'SanGabrielValleyLandscaping' }
            ].map(city => (
              <a key={city.name} href={createPageUrl(city.page)} className="group">
                <div className="bg-white hover:bg-green-500 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 rounded-xl px-6 py-3 group-hover:scale-105 group-hover:shadow-lg">
                  <span className="font-semibold text-gray-700 group-hover:text-white transition-colors flex items-center gap-2">
                    {city.name}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Glendora Location</h2>
            <p className="text-gray-600">Proudly serving Glendora and surrounding communities</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106167.77073!2d-117.8653!3d34.1361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d7c8f7e3b6e5%3A0x3e5e5f8e7f8e7f8e!2sGlendora%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Outright Landscape Glendora Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm cityName="Glendora" darkMode={true} />
    </div>
  );
}