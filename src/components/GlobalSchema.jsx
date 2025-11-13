import { useEffect } from 'react';

export default function GlobalSchema() {
  useEffect(() => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LandscapingBusiness",
      "@id": "https://outrightlandscape.com/#organization",
      "name": "Outright Landscape Construction",
      "legalName": "Outright Landscape Construction",
      "url": "https://outrightlandscape.com",
      "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c125bb3e8_OutrightLandscapeConstructionEmblem1.png",
      "image": [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg"
      ],
      "description": "Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas and the San Gabriel Valley. Expert turf installation, irrigation systems, hardscaping, and paver installation.",
      "telephone": "+1-626-343-6028",
      "email": "outrightlandscape@yahoo.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Covina",
        "addressRegion": "CA",
        "postalCode": "91722",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.090,
        "longitude": -117.890
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "priceRange": "$$",
      "sameAs": [
        "https://www.yelp.com/biz/outright-landscape-covina"
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Covina",
          "sameAs": "https://en.wikipedia.org/wiki/Covina,_California"
        },
        {
          "@type": "City",
          "name": "West Covina",
          "sameAs": "https://en.wikipedia.org/wiki/West_Covina,_California"
        },
        {
          "@type": "City",
          "name": "Glendora",
          "sameAs": "https://en.wikipedia.org/wiki/Glendora,_California"
        },
        {
          "@type": "City",
          "name": "San Dimas",
          "sameAs": "https://en.wikipedia.org/wiki/San_Dimas,_California"
        },
        {
          "@type": "City",
          "name": "Pasadena",
          "sameAs": "https://en.wikipedia.org/wiki/Pasadena,_California"
        },
        {
          "@type": "City",
          "name": "Azusa",
          "sameAs": "https://en.wikipedia.org/wiki/Azusa,_California"
        },
        {
          "@type": "City",
          "name": "Diamond Bar",
          "sameAs": "https://en.wikipedia.org/wiki/Diamond_Bar,_California"
        },
        {
          "@type": "City",
          "name": "La Verne",
          "sameAs": "https://en.wikipedia.org/wiki/La_Verne,_California"
        },
        {
          "@type": "City",
          "name": "Walnut",
          "sameAs": "https://en.wikipedia.org/wiki/Walnut,_California"
        },
        {
          "@type": "City",
          "name": "Pomona",
          "sameAs": "https://en.wikipedia.org/wiki/Pomona,_California"
        }
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "California Contractor License C-27",
        "licenseNumber": "1073845"
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "@id": "https://outrightlandscape.com/#paver-installation",
            "name": "Paver Installation",
            "description": "Professional paver installation services including patios, walkways, driveways, and pool decks. Expert craftsmanship with high-quality materials.",
            "provider": {
              "@id": "https://outrightlandscape.com/#organization"
            },
            "areaServed": {
              "@type": "City",
              "name": "San Gabriel Valley"
            },
            "serviceType": "Hardscaping"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "@id": "https://outrightlandscape.com/#turf-installation",
            "name": "Turf Installation",
            "description": "Premium sod and turf installation services featuring Marathon tall fescue and hybrid Bermuda grass varieties for lush, healthy lawns.",
            "provider": {
              "@id": "https://outrightlandscape.com/#organization"
            },
            "areaServed": {
              "@type": "City",
              "name": "San Gabriel Valley"
            },
            "serviceType": "Lawn Care"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "@id": "https://outrightlandscape.com/#irrigation-systems",
            "name": "Irrigation Systems",
            "description": "Expert irrigation and sprinkler system installation for efficient watering and water conservation. Includes drip systems and smart controllers.",
            "provider": {
              "@id": "https://outrightlandscape.com/#organization"
            },
            "areaServed": {
              "@type": "City",
              "name": "San Gabriel Valley"
            },
            "serviceType": "Irrigation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "@id": "https://outrightlandscape.com/#hardscaping",
            "name": "Hardscaping",
            "description": "Complete hardscaping services including retaining walls, outdoor kitchens, fire pits, and custom outdoor living spaces.",
            "provider": {
              "@id": "https://outrightlandscape.com/#organization"
            },
            "areaServed": {
              "@type": "City",
              "name": "San Gabriel Valley"
            },
            "serviceType": "Hardscaping"
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(localBusinessSchema);
    script.id = 'global-business-schema';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('global-business-schema');
      if (existingScript && existingScript.parentNode) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}