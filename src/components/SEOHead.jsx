import { Helmet } from 'react-helmet-async';

/**
 * GEO-optimized SEO component for Outright Landscape.
 * Accepts title, description, canonicalUrl, and schemaData (JSON-LD).
 * LocalBusiness schema is injected globally by Layout; this component
 * handles page-specific meta + optional Service/FAQ schemas.
 *
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} canonicalUrl - Canonical URL
 * @param {object|object[]} schemaData - Additional JSON-LD schema(s): Service, FAQPage, etc.
 * @param {string} keywords - Meta keywords (optional)
 * @param {string} ogImage - Open Graph image URL (optional)
 * @param {string} ogType - og:type (default: website)
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  schemaData,
  keywords,
  ogImage,
  ogType = 'website',
}) {
  const schemas = Array.isArray(schemaData) ? schemaData : schemaData ? [schemaData] : [];

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `https://outrightlandscape.com${ogImage}`} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Outright Landscape" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `https://outrightlandscape.com${ogImage}`} />}

      {/* JSON-LD: Optional Service/FAQ schemas (LocalBusiness from Layout) */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
