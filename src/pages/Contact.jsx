import SEO from '@/components/SEO';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Star } from 'lucide-react';

const contactDetails = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(626) 343-6028',
    href: 'tel:626-343-6028',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'office@outrightlandscape.com',
    href: 'mailto:office@outrightlandscape.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Covina, CA 91722',
    href: 'https://maps.google.com/?q=Covina,CA+91722',
  },
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Outright Landscape | Project Estimate — Covina, CA"
        description="Contact Outright Landscape Construction for a free landscape estimate. Call (626) 343-6028 or fill out our online form. Serving Covina, Glendora, San Dimas, and the San Gabriel Valley."
        canonicalUrl="https://outrightlandscape.com/contact"
      />

      <div className="contactPage pt-28 pb-20 bg-white min-h-screen">
        <div className="contactInner max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Header */}
          <header className="contactHeader text-center mb-14">
            <span className="contactBadge inline-flex items-center gap-2 bg-[#2d5a27]/10 border border-[#2d5a27]/30 rounded-full px-4 py-1.5 text-[#2d5a27] text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Request a Project Estimate
            </span>
            <h1 className="contactHeading text-4xl sm:text-5xl font-bold text-[#1a1a1a] leading-tight mb-5">
              Get in <span className="text-[#c45d2c]">Touch</span>
            </h1>
            <p className="contactSubtitle text-lg sm:text-xl text-[#6b6560] leading-relaxed max-w-2xl mx-auto">
              Ready to discuss your landscape project? Call, email, or send the form below and our team will follow
              up about the property, scope, and scheduling availability.
            </p>
          </header>

          <div className="contactLayout grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Contact details */}
            <aside className="contactSidebar lg:col-span-2 space-y-5">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="contactDetailCard flex items-start gap-4 p-5 rounded-xl border border-[#e8e2dc] bg-[#faf8f6]">
                  <div className="contactDetailIcon w-10 h-10 rounded-lg bg-[#c45d2c]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#c45d2c]" />
                  </div>
                  <div>
                    <p className="contactDetailLabel text-xs font-semibold text-[#b8945a] uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="contactDetailValue text-[#1a1a1a] font-medium hover:text-[#c45d2c] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="contactDetailValue text-[#1a1a1a] font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social proof */}
              <div className="contactSocialProof bg-[#1a1a1a] rounded-xl p-5 text-center mt-4">
                <p className="text-[#b8945a] text-sm font-semibold uppercase tracking-wider mb-2">C-27 Contractor</p>
                <p className="text-white font-bold text-lg">CSLB #1073845</p>
                <p className="text-[#a09a90] text-sm mt-1">Founded in 2020 · Based in Covina</p>
              </div>
            </aside>

            {/* Form */}
            <div className="contactFormWrapper lg:col-span-3">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
