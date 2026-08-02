import { Helmet } from 'react-helmet-async';

/**
 * GEO-optimized SEO component for Outright Landscape.
 * Accepts title, description, canonicalUrl, and schemaData (JSON-LD).
 * LocalBusiness schema is injected globally by Layout; this component
 * handles page-specific meta + optional Service/FAQ schemas.
 *
 * @param {object} props
 * @param {string} [props.title] - Page title
 * @param {string} [props.description] - Meta description
 * @param {string} [props.canonicalUrl] - Canonical URL
 * @param {object|object[]} [props.schemaData] - Additional JSON-LD schema(s): Service, FAQPage, etc.
 * @param {string} [props.keywords] - Meta keywords
 * @param {string} [props.ogImage] - Open Graph image URL
 * @param {string} [props.ogType] - og:type (default: website)
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
  let normalizedCanonicalUrl = canonicalUrl;

  if (canonicalUrl) {
    try {
      const canonical = new URL(canonicalUrl, 'https://outrightlandscape.com');
      canonical.protocol = 'https:';
      canonical.hostname = 'outrightlandscape.com';
      canonical.pathname = canonical.pathname === '/'
        ? '/'
        : canonical.pathname.replace(/\/+$/, '').toLowerCase();
      canonical.search = '';
      canonical.hash = '';
      normalizedCanonicalUrl = canonical.toString().replace(/\/$/, canonical.pathname === '/' ? '' : '/');
    } catch {
      normalizedCanonicalUrl = canonicalUrl;
    }
  }

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {normalizedCanonicalUrl && <link rel="canonical" href={normalizedCanonicalUrl} />}

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {normalizedCanonicalUrl && <meta property="og:url" content={normalizedCanonicalUrl} />}
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
