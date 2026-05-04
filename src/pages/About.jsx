import SEO from '@/components/SEO';
import ContactForm from '@/components/ContactForm';
import { CheckCircle2, Phone, Star } from 'lucide-react';

const values = [
  { title: 'Licensed & Insured', desc: 'CSLB #1073845 — fully licensed C-27 landscape contractor.' },
  { title: 'Local Expertise', desc: 'Born and bred in the San Gabriel Valley; we know the soil, climate, and city codes.' },
  { title: 'Quality Craftsmanship', desc: 'Every project is built to last, using premium materials and proven installation methods.' },
  { title: 'Transparent Pricing', desc: 'No hidden fees. You receive a detailed written estimate before any work begins.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Outright Landscape Construction | Covina, CA"
        description="Learn about Outright Landscape Construction — a licensed C-27 contractor serving Covina, Glendora, San Dimas, and the San Gabriel Valley with expert landscaping, hardscaping, and irrigation services."
        canonical="/about"
      />

      <div className="aboutPage pt-28 pb-20 bg-white min-h-screen">
        <div className="aboutInner max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Hero */}
          <header className="aboutHeader text-center mb-16">
            <span className="aboutBadge inline-flex items-center gap-2 bg-[#2d5a27]/10 border border-[#2d5a27]/30 rounded-full px-4 py-1.5 text-[#2d5a27] text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Trusted Since 2015
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
                Outright Landscape Construction was founded with one mission: to transform ordinary outdoor spaces
                into beautiful, functional landscapes that homeowners love and that stand the test of time.
                Holding CSLB license #1073845, we operate as a C-27 specialty contractor — a designation that
                reflects our deep commitment to professional standards in every project we touch.
              </p>
              <p>
                Our team of experienced designers, horticulturists, and installation crews has completed more than
                500 projects across Covina, Glendora, La Verne, San Dimas, West Covina, Arcadia, and dozens of
                surrounding communities. Whether you need a complete backyard transformation, a new sprinkler system,
                a paver patio, or drought-tolerant turf, we have the skills and equipment to deliver exceptional results.
              </p>
              <p>
                We build for the long term. That means using premium materials, following best horticultural
                practices for Southern California's climate, and standing behind our work with industry-leading
                craftsmanship guarantees. From the first consultation through project completion, our goal is a
                stress-free experience and an outdoor space you're proud to call your own.
              </p>
            </div>
          </section>

          {/* Who It's For */}
          <section className="aboutWhoItsFor mb-16">
            <h2 className="aboutForTitle text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Who We Serve</h2>
            <p className="aboutForBody text-[#4a4540] text-base sm:text-lg leading-relaxed mb-4">
              Our clients range from first-time homeowners looking to boost curb appeal, to seasoned property
              investors seeking reliable commercial landscape maintenance partners. If you own or manage a property
              in the San Gabriel Valley and want a yard that looks great year-round while conserving water, you've
              come to the right place. We work with:
            </p>
            <ul className="aboutForList list-disc list-inside space-y-2 text-[#4a4540] text-base sm:text-lg leading-relaxed pl-2">
              <li>Residential homeowners planning front- or back-yard renovations</li>
              <li>HOAs and property management companies needing reliable upkeep</li>
              <li>Commercial property owners who want professional curb appeal</li>
              <li>New construction developers requiring final landscape grading and planting</li>
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