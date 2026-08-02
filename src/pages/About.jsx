import SEO from '@/components/SEO';
import { CheckCircle2, Phone, Star } from 'lucide-react';

const values = [
  { title: 'C-27 Contractor', desc: 'Outright Landscape lists CSLB #1073845. Verify the current status with the CSLB.' },
  { title: 'Local Service', desc: 'Based in Covina and serving communities across the San Gabriel Valley.' },
  { title: 'Project Planning', desc: 'Recommendations account for the site, materials, drainage, access, and intended use.' },
  { title: 'Written Estimates', desc: 'Project scope, pricing, timing, and applicable terms are documented before work begins.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Outright Landscape Construction | Covina, CA"
        description="Learn about Outright Landscape Construction, a Covina-based C-27 contractor serving the San Gabriel Valley with landscaping, hardscaping, and irrigation services."
        canonicalUrl="https://outrightlandscape.com/about"
      />

      <div className="aboutPage pt-28 pb-20 bg-white min-h-screen">
        <div className="aboutInner max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Hero */}
          <header className="aboutHeader text-center mb-16">
            <span className="aboutBadge inline-flex items-center gap-2 bg-[#2d5a27]/10 border border-[#2d5a27]/30 rounded-full px-4 py-1.5 text-[#2d5a27] text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Founded in 2020
            </span>
            <h1 className="aboutHeading text-4xl sm:text-5xl font-bold text-[#1a1a1a] leading-tight mb-6">
              About <span className="text-[#c45d2c]">Outright Landscape</span>
            </h1>
            <p className="aboutSubtitle text-lg sm:text-xl text-[#6b6560] leading-relaxed max-w-2xl mx-auto">
              We are a full-service, licensed landscape construction company headquartered in Covina, California,
              proudly serving homeowners and businesses throughout the San Gabriel Valley.
            </p>
          </header>

          {/* Who We Are */}
          <section className="aboutWhoWeAre mb-16">
            <h2 className="aboutSectionTitle text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Who We Are</h2>
            <div className="aboutBodyText space-y-4 text-[#4a4540] text-base sm:text-lg leading-relaxed">
              <p>
                Outright Landscape Construction was founded in 2020 to plan and build functional outdoor spaces for
                properties in Covina and the San Gabriel Valley. The company lists CSLB license #1073845,
                classification C-27; customers should verify the current license status with the CSLB.
              </p>
              <p>
                Services include landscape renovation, turf and sod, irrigation installation and repair, pavers,
                patios, walkways, retaining walls, and coordinated outdoor-living projects. Availability and scope
                are confirmed for each property during the estimate process.
              </p>
              <p>
                Each proposal is based on the site's conditions, selected materials, access, preparation, drainage,
                and project requirements. Applicable workmanship or manufacturer terms are provided in writing for
                the specific project.
              </p>
            </div>
          </section>

          {/* Who It's For */}
          <section className="aboutWhoItsFor mb-16">
            <h2 className="aboutForTitle text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Who We Serve</h2>
            <p className="aboutForBody text-[#4a4540] text-base sm:text-lg leading-relaxed mb-4">
              Our clients range from first-time homeowners looking to boost curb appeal, to seasoned property
              investors and property managers considering landscape improvements. If you own or manage a property
              in the San Gabriel Valley, contact us to confirm whether the project fits our current service area and
              schedule. We consider work for:
            </p>
            <ul className="aboutForList list-disc list-inside space-y-2 text-[#4a4540] text-base sm:text-lg leading-relaxed pl-2">
              <li>Residential homeowners planning front- or back-yard renovations</li>
              <li>HOAs and property management companies planning landscape projects</li>
              <li>Commercial property owners who want professional curb appeal</li>
              <li>New construction projects requiring landscape grading and planting</li>
            </ul>
          </section>

          {/* Values */}
          <section className="aboutValues mb-16">
            <h2 className="aboutValuesTitle text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-8">Our Values</h2>
            <div className="aboutValuesGrid grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="aboutValueCard flex gap-4 p-5 rounded-xl border border-[#e8e2dc] bg-[#faf8f6]">
                  <CheckCircle2 className="w-6 h-6 text-[#2d5a27] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="aboutValueTitle font-bold text-[#1a1a1a] mb-1">{v.title}</h3>
                    <p className="aboutValueDesc text-sm text-[#6b6560] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="aboutCta bg-[#1a1a1a] rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="aboutCtaTitle text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Transform Your Yard?</h2>
            <p className="aboutCtaSubtitle text-[#a09a90] mb-8">Call us today for a free, no-obligation estimate.</p>
            <a
              href="tel:626-343-6028"
              className="aboutCtaBtn inline-flex items-center gap-3 bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              (626) 343-6028
            </a>
          </section>

        </div>
      </div>
    </>
  );
}
