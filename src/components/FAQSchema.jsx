import { useEffect } from 'react';

export default function FAQSchema({ faqs = [], cityName }) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = `faq-schema-${cityName}`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(`faq-schema-${cityName}`);
      if (existingScript && existingScript.parentNode) {
        document.head.removeChild(existingScript);
      }
    };
  }, [faqs, cityName]);

  return null;
}