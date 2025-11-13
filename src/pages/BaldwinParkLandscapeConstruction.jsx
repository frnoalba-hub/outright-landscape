import React, { useState, useEffect } from "react";
import { ContactInquiry } from "@/entities/ContactInquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Phone, Text, MapPin, Wrench, Droplets, Sprout, Hammer, Leaf, Zap, Truck, Check } from "lucide-react";

const EMAIL_RELAY_URL = "https://script.google.com/macros/s/AKfycbzSIl_5RSL2FvaE7uwl4lbLJtMUFfwA-O5XFIt9TaA1-egp4HChAHVMnEWm7Hf-r0Mvtw/exec";

const services = [
  { icon: Wrench, title: "Landscape Construction & Design", description: "From concept to completion, we create custom landscapes that fit your style, budget, and property needs." },
  { icon: Droplets, title: "Sprinkler Installation & Repair", description: "Keep your lawn healthy year-round with efficient irrigation systems, including drip and automatic sprinklers, designed for Baldwin Park's climate." },
  { icon: Sprout, title: "Sod Installation", description: "We install top-quality sod varieties such as Marathon tall fescue and Bermuda, ensuring lush, durable lawns for years to come." },
  { icon: Hammer, title: "Hardscape Installation", description: "Add value and beauty with pavers, patios, stone edging, retaining walls, and concrete walkways — all expertly installed." },
  { icon: Leaf, title: "Mulching Services", description: "Protect your plants and enhance curb appeal with premium bark and mulch installations." },
  { icon: Zap, title: "Decorative Rock & Lighting Installations", description: "From river rock pathways to accent lighting, we bring visual interest and safety to your landscape." },
  { icon: Truck, title: "Cleanup & Demolition", description: "We handle yard cleanups, debris removal, and even demolition of old structures to prepare your space for a fresh start." },
];

const whyUsItems = [
  "Local knowledge of Baldwin Park's soil, plants, and weather patterns",
  "Licensed & insured for your peace of mind",
  "Honest, competitive pricing with free estimates",
  "Quality materials for long-lasting results"
];

export default function BaldwinParkLandscapeConstructionPage() {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", city: "Baldwin Park", message: "", company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Baldwin Park Landscape Construction | Outright Landscape Construction";
    
    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    const metaDescriptionContent = "Outright Landscape Construction provides expert landscaping, hardscaping, and sprinkler installation in Baldwin Park, CA. Licensed, insured, and local.";
    if (metaDescriptionEl) {
        metaDescriptionEl.setAttribute('content', metaDescriptionContent);
    } else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        meta.setAttribute('content', metaDescriptionContent);
        document.head.appendChild(meta);
    }

    const pageUrl = "https://outrightlandscape.com/baldwin-park-landscape-construction";
    
    const tags = [
      { type: 'link', rel: 'canonical', href: pageUrl },
      { type: 'meta', property: 'og:title', content: document.title },
      { type: 'meta', property: 'og:description', content: metaDescriptionContent },
      { type: 'meta', property: 'og:url', content: pageUrl },
      { type: 'meta', property: 'og:image', content: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/344eb2d1c_file_000000001e1c61f98ccc44cc9502ca97.png" },
      { type: 'meta', property: 'og:type', content: "website" },
    ];

    const addedTags = [];
    tags.forEach(tagInfo => {
      const existingTag = document.querySelector(`${tagInfo.type}[${Object.keys(tagInfo)[1]}="${Object.values(tagInfo)[1]}"]`);
      if (!existingTag) {
        const el = document.createElement(tagInfo.type);
        Object.keys(tagInfo).forEach(key => {
          if (key !== 'type') el.setAttribute(key, tagInfo[key]);
        });
        document.head.appendChild(el);
        addedTags.push(el);
      }
    });

    const schema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "Outright Landscape Construction",
      "telephone": "+1-626-343-6028",
      "email": "outrightlandscape@yahoo.com",
      "areaServed": ["Baldwin Park", "Covina", "West Covina", "Glendora", "Azusa", "Pasadena", "Diamond Bar", "Charter Oak", "La Verne"],
      "url": "https://outrightlandscape.com",
      "@id": "https://outrightlandscape.com/#business",
      "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/344eb2d1c_file_000000001e1c61f98ccc44cc9502ca97.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Baldwin Park",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    addedTags.push(script);

    return () => {
        addedTags.forEach(tag => {
            try {
                document.head.removeChild(tag);
            } catch (e) {}
        });
        document.title = 'Outright Landscape';
    };
  }, []);

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (field, value) => 
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ContactInquiry.create(formData);
      
      if (!formData.company) {
        const payload = new URLSearchParams({
          _subject: `New Quote Request — Baldwin Park`,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          message: formData.message,
        });

        await fetch(EMAIL_RELAY_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: payload.toString(),
        });
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Sorry—couldn't send your request. Please call (626) 343-6028.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white text-gray-800">
      <style>{`
        .hero{position:relative}
        .hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.28));pointer-events:none}
        .hero-h1 { text-shadow: 1px 1px 3px #000, 0 0 1em #000, 0 0 0.2em #000; }
        .honeypot{display:none!important}
      `}</style>

      {/* Hero */}
      <section className="hero relative text-white text-center flex flex-col items-center justify-center min-h-[60vh] py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4a1ab0c5a_o.jpg')" }} 
        />
        <div className="relative z-10 flex flex-col items-center gap-y-4">
          <h1 className="hero-h1 text-4xl md:text-6xl font-extrabold leading-tight">
            Baldwin Park Landscape Construction & Landscaping Services
          </h1>
          <p className="hero-h1 text-lg md:text-xl font-semibold -mt-2">Outright Landscape Construction</p>
          <Button 
            size="lg" 
            onClick={() => handleScrollToSection("contact")} 
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-12 py-8 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-300"
          >
            Request a Quote
          </Button>
          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2 mt-2">
            <a href="tel:626-343-6028" className="font-semibold text-white hover:underline">📞 Call (626) 343-6028</a>
            <a href="sms:626-343-6028" className="font-semibold text-white hover:underline">Text (626) 343-6028</a>
          </div>
          <p className="mt-3 px-4 py-1 bg-black/50 rounded-md text-sm font-semibold text-gray-200 border border-gray-500">CA CSLB #1073845</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Baldwin Park's Trusted Landscape Construction Experts</h2>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            At Outright Landscape Construction, we're proud to serve Baldwin Park and its surrounding communities. 
            As a licensed and insured contractor (CA CSLB #1073845), we've been transforming outdoor spaces for 
            homeowners and businesses in Baldwin Park for years. Our team blends expert craftsmanship with a personal 
            touch to deliver landscapes that are both beautiful and built to last.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Whether you're looking to install a brand-new lawn, upgrade your hardscape, or completely redesign your yard, 
            we handle it all with precision, professionalism, and local expertise.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Landscape & Hardscape Services in Baldwin Park</h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col items-start p-6 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">Why Baldwin Park Chooses Outright Landscape Construction</h2>
              <p className="mt-4 text-lg text-green-200">We're your local experts with the experience and dedication you can trust.</p>
            </div>
            <ul className="space-y-4">
              {whyUsItems.map(item => (
                <li key={item} className="flex items-start">
                  <Check className="w-6 h-6 mr-3 mt-1 text-green-400 flex-shrink-0" />
                  <span className="text-xl font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proudly Serving Baldwin Park & Surrounding Communities</h2>
          <p className="text-lg text-gray-700">
            While we specialize in Baldwin Park, we also serve:<br />
            Covina • West Covina • Glendora • Azusa • Pasadena • Diamond Bar • Charter Oak • San Dimas • La Verne • Claremont • Baldwin Park
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold">Get Your Free Estimate Today</h2>
            <p className="mt-4 text-lg text-gray-300">Transform your outdoor space with Baldwin Park's landscape experts.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <a 
                href="tel:626-343-6028" 
                className="flex items-center space-x-4 p-5 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
              >
                <Phone className="w-8 h-8 text-green-400" />
                <div>
                  <p className="font-bold text-xl">(626) 343-6028</p>
                  <p className="text-gray-300">Call for a free estimate</p>
                </div>
              </a>
              <a 
                href="sms:626-343-6028" 
                className="flex items-center space-x-4 p-5 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
              >
                <Text className="w-8 h-8 text-green-400" />
                <div>
                  <p className="font-bold text-xl">Text Us Anytime</p>
                  <p className="text-gray-300">Send a message or photos</p>
                </div>
              </a>
            </div>

            {isSubmitted ? (
              <div className="text-center p-8 bg-green-600 rounded-2xl">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p>Your quote request has been sent. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                />
                <Input
                  id="city"
                  type="text"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white h-14 rounded-lg px-4"
                />
                <Textarea
                  id="message"
                  placeholder="Brief project description..."
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white rounded-lg p-4 h-32"
                />

                <input
                  type="text"
                  name="company"
                  className="honeypot"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full font-bold text-lg h-16 rounded-full bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Sending..." : "Request My Free Quote"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}