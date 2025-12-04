import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import SEO from "@/components/SEO";
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import SharedHero from '@/components/SharedHero';
import ContactForm from '@/components/ContactForm';
import { locations } from "./data";
import { services, projects } from "./sharedContent";

export default function LocationPage({ citySlug }) {
  const cityData = locations.find(l => l.slug === citySlug);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const { name, intro, faqs, geo, mapUrl } = cityData;

  const trackPhoneClick = (location) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_click',
        event_category: 'engagement',
        event_label: `${citySlug}_${location}`,
        phone_number: '626-343-6028'
      });
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Outright Landscape - ${name}`,
    "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/631bc75e5_2025-05-28.jpg",
    "telephone": "+1-626-343-6028",
    "email": "outrightlandscape@yahoo.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": name,
      "addressLocality": name,
      "addressRegion": "CA",
      "postalCode": "91722", // Defaulting to Covina zip for now if specific not available, or generic
      "addressCountry": "US"
    },
    ...(geo && {
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": geo.latitude,
            "longitude": geo.longitude
        }
    }),
    "url": `https://outrightlandscape.com/${citySlug}-landscaping`,
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": name
    }
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://outrightlandscape.com" },
    { name: "Service Areas", url: "https://outrightlandscape.com/#service-areas" },
    { name: `${name} Landscaping`, url: `https://outrightlandscape.com/${citySlug}-landscaping` }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title={`${name} Landscape Construction & Landscaping Services | Outright Landscape`}
        description={`Expert landscape construction, turf installation, irrigation systems, and hardscaping in ${name}. Licensed CSLB #1073845. Call for free AI design preview!`}
        keywords={`${name} landscaping, turf installation ${name}, irrigation ${name}, hardscaping ${name}, landscape construction ${name}, CSLB 1073845`}
        canonicalUrl={`https://outrightlandscape.com/${citySlug}-landscaping`}
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/631bc75e5_2025-05-28.jpg"
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <SharedHero 
        title={<>Transform Your<br /><span className="text-green-400">Outdoor Living Space</span></>}
        subtitle={`Licensed C-27 landscape contractor serving ${name} & the San Gabriel Valley`}
        onPhoneClick={trackPhoneClick}
        onViewServicesClick={() => {}}
      />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Turf Installation in {name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {intro || `From premium sod installation to complete landscape design, we deliver exceptional results for ${name} homeowners.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title.replace("Covina", name)}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description.replace("local climate", `${name}'s climate`)}</p>
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
              Hardscaping Experts Near {name}
            </h2>
            <p className="text-xl text-gray-600">
              See our expert sod installation and landscape work throughout {name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square">
                <img 
                  src={project.image} 
                  alt={project.alt.replace("Outright Landscape", `Outright Landscape ${name}`)}
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
              Why {name} Trusts Outright Landscape
            </h2>
            <p className="text-xl text-green-100">
              Local expertise, quality craftsmanship, and outstanding customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Licensed & Insured", desc: "CSLB #1073845" },
              { title: "10+ Years Experience", desc: "Expert sod & turf installation" },
              { title: "Free Estimates", desc: "Honest, competitive pricing" },
              { title: "Local Experts", desc: `We know ${name}'s climate` }
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
            {locations.filter(l => l.slug !== citySlug).slice(0, 5).map(city => (
              <a key={city.slug} href={createPageUrl(city.slug.charAt(0).toUpperCase() + city.slug.slice(1).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }) + 'Landscaping')} className="group">
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
      {mapUrl && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our {name} Location</h2>
              <p className="text-gray-600">Proudly serving {name} and surrounding communities</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src={mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Outright Landscape ${name} Location`}
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <ContactForm cityName={name} darkMode={true} />
    </div>
  );
}