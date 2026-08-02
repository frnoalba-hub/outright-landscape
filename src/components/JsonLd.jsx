import React from 'react';

export default function JsonLd({ city }) {
  // Use useEffect to add JSON-LD to the document head
  React.useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LandscapingService",
      "@id": "https://outrightlandscape.com/#org",
      "name": "Outright Landscape",
      "url": "https://outrightlandscape.com",
      "telephone": "(626) 343-6028",
      "email": "office@outrightlandscape.com",
      "image": "/images/39c606b34_file_000000002aac61f58b7edad5ad34cd94.png",
      "priceRange": "$$",
      "areaServed": {
        "@type": "City",
        "name": `${city}, CA`
      },
      "address": {
        "@type": "PostalAddress",
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
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      }],
      "sameAs": [
        "https://www.yelp.com/biz/outright-landscape-covina"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      try {
        document.head.removeChild(script);
      } catch {
        // Script might have been removed by other means
      }
    };
  }, [city]);

  return null; // This component doesn't render anything visible
}
