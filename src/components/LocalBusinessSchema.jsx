import { useEffect } from 'react';

export default function LocalBusinessSchema({ cityName, citySlug, services = [] }) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://outrightlandscape.com/ServiceArea?city=${citySlug}#business`,
      "name": `Outright Landscape Construction - ${cityName}`,
      "image": "/images/outright-landscape-logo-256.jpg",
      "description": `Licensed C-27 landscape contractor serving ${cityName}, CA. Expert pavers, turf installation, irrigation systems, and complete landscape design. Free estimates available.`,
      "telephone": "+1-626-343-6028",
      "email": "office@outrightlandscape.com",
      "url": `https://outrightlandscape.com/ServiceArea?city=${citySlug}`,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "addressRegion": "CA",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "34.09",
        "longitude": "-117.90"
      },
      "areaServed": {
        "@type": "City",
        "name": cityName,
        "addressRegion": "CA",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Landscaping Services in ${cityName}`,
        "itemListElement": services.length > 0 ? services.map((service) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "areaServed": {
              "@type": "City",
              "name": cityName
            }
          }
        })) : [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Paver Installation",
              "description": "Expert paver patios, walkways, and retaining walls"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Turf & Sod Installation",
              "description": "Premium turf installation for lush lawns"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Irrigation Systems",
              "description": "Professional sprinkler and drip irrigation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landscape Design",
              "description": "Complete design and build services"
            }
          }
        ]
      },
      "sameAs": [
        "https://www.yelp.com/biz/outright-landscape-covina"
      ],
      "additionalType": "https://schema.org/LandscapingBusiness",
      "knowsAbout": [
        "Landscaping",
        "Hardscaping",
        "Paver Installation",
        "Turf Installation",
        "Irrigation Systems",
        "Landscape Design"
      ],
      "slogan": "Transform Your Outdoor Living Space",
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Outright Landscape Construction"
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = `local-business-schema-${citySlug}`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(`local-business-schema-${citySlug}`);
      if (existingScript && existingScript.parentNode) {
        document.head.removeChild(existingScript);
      }
    };
  }, [cityName, citySlug, services]);

  return null;
}
