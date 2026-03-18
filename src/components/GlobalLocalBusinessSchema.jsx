import { Helmet } from 'react-helmet-async';
import { LOCAL_BUSINESS_SCHEMA, GEO_DEFAULTS } from '@/schemas/geo-schemas';

/**
 * Injects global LocalBusiness JSON-LD + geolocation meta tags on every page.
 * Rendered by Layout; ensures AI bots and search engines see Outright Landscape
 * as a local landscaping/irrigation entity in Covina, CA.
 * GEO meta tags are parsed from <head> before page content for local/AI discovery.
 */
export default function GlobalLocalBusinessSchema() {
  return (
    <Helmet>
      {/* Local SEO geolocation meta — AI bots extract these from <head> first */}
      <meta name="geo.region" content={GEO_DEFAULTS.region} />
      <meta name="geo.placename" content={GEO_DEFAULTS.placename} />
      <meta name="geo.position" content={GEO_DEFAULTS.position} />
      <meta name="ICBM" content={GEO_DEFAULTS.icbm} />
      <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_SCHEMA)}</script>
    </Helmet>
  );
}
