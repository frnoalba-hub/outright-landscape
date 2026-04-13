import { useParams, Navigate } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { getGuideBySlug, SERVICE_HUBS } from '@/lib/serviceHubContent';
import { Phone, ArrowRight, Calendar } from 'lucide-react';

export default function BuyerGuidePage() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);

  if (!guide) return <Navigate to="/" replace />;

  const relatedHubs = (guide.relatedServiceSlugs || [])
    .map((ss) => SERVICE_HUBS.find((h) => h.slug === ss))
    .filter(Boolean);

  const breadcrumbs = [
    { name: 'Home', url: 'https://outrightlandscape.com/' },
    { name: 'Guides', url: 'https://outrightlandscape.com/guides' },
    { name: guide.title, url: `https://outrightlandscape.com/guides/${guide.slug}` },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Outright Landscape Construction',
      url: 'https://outrightlandscape.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Outright Landscape Construction',
      url: 'https://outrightlandscape.com',
    },
  };

  const faqSchema =
    guide.faqs && guide.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guide.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  return (
    <article className="bg-white">
      <SEOHead
        title={guide.title}
        description={guide.description}
        canonicalUrl={`https://outrightlandscape.com/guides/${guide.slug}`}
        schemaData={[articleSchema, faqSchema].filter(Boolean)}
        ogType="article"
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] pt-28 pb-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-widest text-[#b8945a] font-semibold mb-4">
            Buyer Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            {guide.description}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-8 mb-8">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {guide.updatedAt}</span>
        </div>

        {/* Intro */}
        <p className="text-lg text-gray-800 leading-relaxed mb-10">{guide.intro}</p>

        {/* Sections */}
        {guide.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </section>
        ))}

        {/* FAQs */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {guide.faqs.map((faq) => (
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
        )}

        {/* Related Services */}
        {relatedHubs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related services</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedHubs.map((hub) => (
                <a
                  key={hub.slug}
                  href={`/s/${hub.slug}`}
                  className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-5 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{hub.serviceName}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{hub.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#1a1a1a] rounded-xl p-8 mb-16 text-center">
          <h2 className="text-xl font-bold text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-white/70 mb-6">
            Free on-site estimates with detailed pricing for your project.
          </p>
          <a
            href="tel:626-343-6028"
            className="inline-flex items-center gap-2 bg-[#c45d2c] hover:bg-[#a94e25] text-white font-semibold px-8 py-3 rounded-lg transition-all"
          >
            <Phone className="w-4 h-4" /> (626) 343-6028
          </a>
        </section>
      </div>

      {guide.faqs && guide.faqs.length > 0 && (
        <FAQSchema faqs={guide.faqs.map((f) => ({ q: f.question, a: f.answer }))} cityName={`guide-${guide.slug}`} />
      )}
    </article>
  );
}
