import { useEffect } from 'react';

/** Optional geo meta for city pages. When provided, overrides global Covina defaults. */
export default function SEO({ 
  title: defaultTitle, 
  description: defaultDescription, 
  keywords: defaultKeywords, 
  canonicalUrl, 
  ogImage,
  ogType = "website",
  geoMeta = null,
}) {
  const title = defaultTitle;
  const description = defaultDescription;
  const keywords = defaultKeywords;

  useEffect(() => {
    document.title = title || document.title;
    
    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || '');
    } else {
      if (description) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        metaDesc.setAttribute('content', description);
        document.head.appendChild(metaDesc);
      }
    }

    // Robots meta tag - ALWAYS set to index, follow
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow, max-image-preview:large');
    } else {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', 'index, follow, max-image-preview:large');
      document.head.appendChild(metaRobots);
    }

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Canonical URL - CRITICAL for preventing duplicates
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonical);
      }
    }

    // Preconnect for performance
    const preconnectDomains = [
      'https://qtrypzzcjebvfcihiynt.supabase.co',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ];

    preconnectDomains.forEach(domain => {
      let preconnect = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
      if (!preconnect) {
        preconnect = document.createElement('link');
        preconnect.setAttribute('rel', 'preconnect');
        preconnect.setAttribute('href', domain);
        preconnect.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(preconnect);
      }
      
      // Add dns-prefetch for even better performance
      let dnsPrefetch = document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
      if (!dnsPrefetch) {
        dnsPrefetch = document.createElement('link');
        dnsPrefetch.setAttribute('rel', 'dns-prefetch');
        dnsPrefetch.setAttribute('href', domain);
        document.head.appendChild(dnsPrefetch);
      }
    });

    // Open Graph Tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:url", content: canonicalUrl },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: "Outright Landscape" }
    ];

    ogTags.forEach(tag => {
      if (!tag.content) return;
      
      let existing = document.querySelector(`meta[property="${tag.property}"]`);
      if (existing) {
        existing.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Local SEO geolocation meta — city pages override with city-specific geo
    if (geoMeta) {
      const geoTags = [
        { name: 'geo.region', content: geoMeta.region },
        { name: 'geo.placename', content: geoMeta.placename },
        { name: 'geo.position', content: geoMeta.position },
        { name: 'ICBM', content: geoMeta.icbm },
      ];
      geoTags.forEach((tag) => {
        let el = document.querySelector(`meta[name="${tag.name}"]`);
        if (el) el.setAttribute('content', tag.content);
        else {
          el = document.createElement('meta');
          el.setAttribute('name', tag.name);
          el.setAttribute('content', tag.content);
          document.head.appendChild(el);
        }
      });
    }

    // Twitter Card Tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage }
    ];

    twitterTags.forEach(tag => {
      if (!tag.content) return;

      let existing = document.querySelector(`meta[name="${tag.name}"]`);
      if (existing) {
        existing.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Cleanup function
    return () => {
      try {
        // Only remove elements if they were dynamically added and strictly managed by this component
        // Since other pages might need them, it's often safer to just update them
        // But for canonical/keywords which are page-specific:
        
        // Don't aggressively remove canonical as next page will update it
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, geoMeta]);

  return null;
}