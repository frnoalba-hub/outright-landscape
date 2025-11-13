import { useEffect } from 'react';

export default function ServiceSchema({ serviceType }) {
  useEffect(() => {
    const services = {
      'paver-installation': {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://outrightlandscape.com/#paver-installation",
        "serviceType": "Paver Installation",
        "name": "Paver Installation Services",
        "description": "Professional paver installation services including patios, walkways, driveways, and pool decks. Expert craftsmanship with high-quality materials for long-lasting results.",
        "provider": {
          "@type": "LandscapingBusiness",
          "@id": "https://outrightlandscape.com/#organization",
          "name": "Outright Landscape Construction",
          "telephone": "+1-626-343-6028",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Covina",
            "addressRegion": "CA",
            "postalCode": "91722",
            "addressCountry": "US"
          }
        },
        "areaServed": [
          { "@type": "City", "name": "Covina" },
          { "@type": "City", "name": "West Covina" },
          { "@type": "City", "name": "Glendora" },
          { "@type": "City", "name": "San Dimas" },
          { "@type": "City", "name": "Pasadena" },
          { "@type": "City", "name": "San Gabriel Valley" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Paver Installation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Paver Patios",
                "description": "Custom paver patio design and installation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Paver Walkways",
                "description": "Decorative and functional paver walkways"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Paver Driveways",
                "description": "Durable paver driveway installation"
              }
            }
          ]
        }
      },
      'turf-installation': {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://outrightlandscape.com/#turf-installation",
        "serviceType": "Turf Installation",
        "name": "Turf & Sod Installation Services",
        "description": "Premium turf and sod installation featuring Marathon tall fescue and hybrid Bermuda grass varieties. Professional installation for lush, healthy lawns.",
        "provider": {
          "@type": "LandscapingBusiness",
          "@id": "https://outrightlandscape.com/#organization",
          "name": "Outright Landscape Construction",
          "telephone": "+1-626-343-6028",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Covina",
            "addressRegion": "CA",
            "postalCode": "91722",
            "addressCountry": "US"
          }
        },
        "areaServed": [
          { "@type": "City", "name": "Covina" },
          { "@type": "City", "name": "West Covina" },
          { "@type": "City", "name": "Glendora" },
          { "@type": "City", "name": "San Dimas" },
          { "@type": "City", "name": "Azusa" },
          { "@type": "City", "name": "San Gabriel Valley" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Turf Installation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Natural Sod Installation",
                "description": "Premium natural grass sod installation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Artificial Turf Installation",
                "description": "Low-maintenance artificial turf installation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Lawn Renovation",
                "description": "Complete lawn renovation and re-sodding"
              }
            }
          ]
        }
      },
      'irrigation-systems': {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://outrightlandscape.com/#irrigation-systems",
        "serviceType": "Irrigation System Installation",
        "name": "Irrigation & Sprinkler System Services",
        "description": "Expert irrigation and sprinkler system installation for efficient watering and water conservation. Includes drip systems, smart controllers, and water-efficient designs.",
        "provider": {
          "@type": "LandscapingBusiness",
          "@id": "https://outrightlandscape.com/#organization",
          "name": "Outright Landscape Construction",
          "telephone": "+1-626-343-6028",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Covina",
            "addressRegion": "CA",
            "postalCode": "91722",
            "addressCountry": "US"
          }
        },
        "areaServed": [
          { "@type": "City", "name": "Covina" },
          { "@type": "City", "name": "West Covina" },
          { "@type": "City", "name": "Glendora" },
          { "@type": "City", "name": "San Dimas" },
          { "@type": "City", "name": "Diamond Bar" },
          { "@type": "City", "name": "San Gabriel Valley" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Irrigation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sprinkler System Installation",
                "description": "Custom sprinkler system design and installation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Drip Irrigation Systems",
                "description": "Water-efficient drip irrigation installation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Smart Irrigation Controllers",
                "description": "Smart controller installation for automated watering"
              }
            }
          ]
        }
      },
      'hardscaping': {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://outrightlandscape.com/#hardscaping",
        "serviceType": "Hardscaping",
        "name": "Hardscaping Services",
        "description": "Complete hardscaping services including retaining walls, outdoor kitchens, fire pits, and custom outdoor living spaces. Expert craftsmanship for beautiful, functional landscapes.",
        "provider": {
          "@type": "LandscapingBusiness",
          "@id": "https://outrightlandscape.com/#organization",
          "name": "Outright Landscape Construction",
          "telephone": "+1-626-343-6028",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Covina",
            "addressRegion": "CA",
            "postalCode": "91722",
            "addressCountry": "US"
          }
        },
        "areaServed": [
          { "@type": "City", "name": "Covina" },
          { "@type": "City", "name": "Glendora" },
          { "@type": "City", "name": "San Dimas" },
          { "@type": "City", "name": "Pasadena" },
          { "@type": "City", "name": "Diamond Bar" },
          { "@type": "City", "name": "San Gabriel Valley" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Hardscaping Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Retaining Walls",
                "description": "Custom retaining wall design and construction"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Outdoor Kitchens",
                "description": "Complete outdoor kitchen installation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Fire Pits & Features",
                "description": "Custom fire pit and outdoor feature installation"
              }
            }
          ]
        }
      }
    };

    const schema = services[serviceType];
    if (!schema) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = `service-schema-${serviceType}`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(`service-schema-${serviceType}`);
      if (existingScript && existingScript.parentNode) {
        document.head.removeChild(existingScript);
      }
    };
  }, [serviceType]);

  return null;
}