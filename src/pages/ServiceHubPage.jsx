import { useParams, Navigate } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import AttributedQuote from '@/components/AttributedQuote';
import ContactForm from '@/components/ContactForm';
import { getServiceHubBySlug, BUYER_GUIDES } from '@/lib/serviceHubContent';
import { GEO_QUOTES, SERVICE_SCHEMAS } from '@/schemas/geo-schemas';
import { Phone, ArrowRight, Calendar } from 'lucide-react';

const CITIES = [
  'Covina', 'West Covina', 'Glendora', 'San Dimas', 'La Verne', 'Azusa',
  'Claremont', 'Diamond Bar', 'Walnut', 'Pomona', 'Pasadena', 'Arcadia',
  'Monrovia', 'Duarte', 'El Monte', 'Baldwin Park', 'Temple City',
  'Rowland Heights', 'Charter Oak', 'San Gabriel',
];

function citySlug(city, suffix) {
  return `/${city.toLowerCase().replace(/\s+/g, '-')}-${suffix}`;
}

const SERVICE_SUFFIX_MAP = {
  landscaping: 'landscaping',
  hardscaping: 'hardscape',
  irrigation: 'sprinkler-repair-installation',
  'outdoor-living': 'hardscape',
};

const QUOTE_MAP = {
  landscaping: GEO_QUOTES.default,
  hardscaping: GEO_QUOTES.hardscape,
  irrigation: GEO_QUOTES.irrigation,
  'outdoor-living': GEO_QUOTES.hardscape,
};

const SCHEMA_MAP = {
  landscaping: SERVICE_SCHEMAS['turf-installation'],
  hardscaping: SERVICE_SCHEMAS.hardscaping,
  irrigation: SERVICE_SCHEMAS['irrigation-systems'],
  'outdoor-living': SERVICE_SCHEMAS.hardscaping,
};

export default function ServiceHubPage() {
  const { slug } = useParams();
  const hub = getServiceHubBySlug(slug);

  if (!hub) return <Navigate to="/" replace />;

  const quote = QUOTE_MAP[hub.slug] || GEO_QUOTES.default;
  const serviceSchema = SCHEMA_MAP[hub.slug];
  const citySuffix = SERVICE_SUFFIX_MAP[hub.slug] || 'landscaping';
  const relatedGuides = (hub.guideSlugs || [])
    .map((gs) => BUYER_GUIDES.find((g) => g.slug === gs))
    .filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', url: 'https://outrightlandscape.com/' },
    { name: hub.serviceName, url: `https://outrightlandscape.com/s/${hub.slug}` },
  ];

  return (
    <article className="bg-white">
      <SEOHead
        title={hub.title}
        description={hub.description}
        canonicalUrl={`https://outrightlandscape.com/s/${hub.slug}`}
        schemaData={[serviceSchema].filter(Boolean)}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {hub.serviceName}
          </h1>
          <p className="text-lg text-[#b8945a] font-medium mb-4">
            C-27 Contractor &middot; CSLB #1073845 &middot; Founded in 2020
          </p>
          <p className="text-base text-white/70 max-w-3xl mx-auto leading-relaxed">{hub.lead}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="tel:626-343-6028"
              className="inline-flex items-center justify-center gap-2 bg-[#c45d2c] hover:bg-[#a94e25] text-white font-semibold px-8 py-3 rounded-lg transition-all"
            >
              <Phone className="w-4 h-4" /> (626) 343-6028
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border border-[#b8945a]/50 text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold px-8 py-3 rounded-lg transition-all"
            >
              Free Estimate
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-8 mb-10">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {hub.updatedAt}</span>
        </div>

        {/* How to Choose */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to choose {hub.serviceName.toLowerCase()} services
          </h2>
          <dl className="space-y-5">
            {hub.howToChoose.map((item) => (
              <div key={item.key} className="bg-gray-50 rounded-lg p-5">
                <dt className="font-semibold text-gray-900 mb-1">{item.key}</dt>
                <dd className="text-gray-700 leading-relaxed">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Customer Quote */}
        <section className="mb-12">
          <AttributedQuote quote={quote.quote} name={quote.name} city={quote.city} stars={quote.stars} sourceUrl={quote.sourceUrl} />
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {hub.faqs.map((faq) => (
              <details key={faq.question} className="group bg-gray-50 rounded-lg">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 flex justify-between items-center">
                  {faq.question}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-700 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buyer guides</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <a
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-5 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-600">{guide.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Service Area Cities */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cities we serve for {hub.serviceName.toLowerCase()}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CITIES.map((city) => (
              <a
                key={city}
                href={citySlug(city, citySuffix)}
                className="text-sm text-[#c45d2c] hover:text-[#a94e25] hover:underline transition-colors"
              >
                {city}
              </a>
            ))}
          </div>
        </section>
      </div>

      <ContactForm cityName="the San Gabriel Valley" />
      <FAQSchema faqs={hub.faqs.map((f) => ({ q: f.question, a: f.answer }))} cityName={`hub-${hub.slug}`} />
    </article>
  );
}
