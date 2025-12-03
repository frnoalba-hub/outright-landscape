import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Trees, Palette, Award, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import SEO from "@/components/SEO";
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SharedHero from '@/components/SharedHero';
import ContactForm from '@/components/ContactForm';

const services = [
  {
    icon: Palette,
    title: "Landscape Design West Covina",
    description: "Custom landscape design services from concept to completion, creating beautiful outdoor living spaces tailored to your vision.",
    keywords: "landscape design, outdoor design, yard planning"
  },
  {
    icon: Home,
    title: "Outdoor Living Spaces West Covina",
    description: "Transform your backyard into an entertainment paradise with custom patios, outdoor kitchens, and fire pits.",
    keywords: "outdoor living, patio design, entertainment areas"
  },
  {
    icon: Trees,
    title: "Complete Landscaping West Covina",
    description: "Full-service landscaping including planting, sod installation, hardscaping, and irrigation for residential and commercial properties.",
    keywords: "landscaping, yard transformation, landscape installation"
  },
  {
    icon: Award,
    title: "Landscape Renovation",
    description: "Breathe new life into tired landscapes with complete makeovers that enhance curb appeal and property value.",
    keywords: "landscape renovation, yard makeover, redesign"
  }
];

const projects = [
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/6633fbff6_2025-05-286.jpg",
    title: "Custom Paver Installation",
    description: "Complete outdoor transformation",
    alt: "Outright Landscape – Custom Paver Installation in West Covina"
  },
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cb31aa31a_467984156_586804077241478_5229306140253639953_n.jpg",
    title: "Front Yard Redesign",
    description: "Modern landscape design",
    alt: "Outright Landscape – Front Yard Redesign in West Covina"
  },
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/156ff015a_467849656_586803857241500_6031602168627264702_n.jpg",
    title: "Complete Landscape Design",
    description: "Full property transformation",
    alt: "Outright Landscape – Complete Landscape Design in West Covina"
  }
];

export default function WestCovinaLandscaping() {
  const trackPhoneClick = (location) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_click',
        event_category: 'engagement',
        event_label: `west_covina_${location}`,
        phone_number: '626-343-6028'
      });
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Outright Landscape - West Covina",
    "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cb31aa31a_467984156_586804077241478_5229306140253639953_n.jpg",
    "telephone": "+1-626-343-6028",
    "email": "outrightlandscape@yahoo.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "West Covina",
      "addressRegion": "CA",
      "postalCode": "91790",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0686,
      "longitude": -117.9390
    },
    "url": "https://outrightlandscape.com/west-covina-landscaping",
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "West Covina"
    }
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://outrightlandscape.com" },
    { name: "Service Areas", url: "https://outrightlandscape.com/#service-areas" },
    { name: "West Covina Landscaping", url: "https://outrightlandscape.com/west-covina-landscaping" }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="West Covina Landscape Construction & Landscaping Services | Outright Landscape"
        description="Professional landscaping, concrete, and paver work across West Covina and nearby areas. Call now for a free AI design preview and same-week quote."
        keywords="landscape design West Covina, landscaping West Covina, outdoor living West Covina, landscape contractor West Covina, hardscaping West Covina, CSLB 1073845, AI design preview"
        canonicalUrl="https://outrightlandscape.com/west-covina-landscaping"
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cb31aa31a_467984156_586804077241478_5229306140253639953_n.jpg"
      />

      <BreadcrumbSchema items={breadcrumbItems} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero Section - Same as Homepage */}
      <SharedHero 
        title={<>Transform Your<br /><span className="text-green-400">Outdoor Living Space</span></>}
        subtitle="Licensed C-27 landscape contractor serving West Covina & the San Gabriel Valley"
        onPhoneClick={trackPhoneClick}
        onViewServicesClick={() => {}}
      />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Landscape Design West Covina
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From custom landscape design to complete outdoor transformations, we create stunning spaces you'll love.
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
              Outdoor Living Spaces West Covina
            </h2>
            <p className="text-xl text-gray-600">
              See our expert landscape design and outdoor living transformations throughout West Covina
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
              Why West Covina Trusts Outright Landscape
            </h2>
            <p className="text-xl text-green-100">
              Expert design, quality construction, and personalized service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Licensed & Insured", desc: "CSLB #1073845" },
              { title: "Expert Designers", desc: "Creative landscape solutions" },
              { title: "Quality Construction", desc: "Built to last for years" },
              { title: "Free Consultations", desc: "Design & estimates included" }
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
              { name: 'Baldwin Park', page: 'BaldwinParkLandscaping' },
              { name: 'Walnut', page: 'WalnutLandscaping' },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our West Covina Location</h2>
            <p className="text-gray-600">Proudly serving West Covina and surrounding communities</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106167.77073!2d-117.939!3d34.0686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d7b0f9e3b6e5%3A0x3e5e5f8e7f8e7f8e!2sWest%20Covina%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Outright Landscape West Covina Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm cityName="West Covina" darkMode={true} />
    </div>
  );
}