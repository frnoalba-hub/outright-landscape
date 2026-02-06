import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, CheckCircle2, ArrowRight, Sprout, Droplets, Hammer, Award, ArrowDown } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SEO from '@/components/SEO';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import FAQSchema from '@/components/FAQSchema';
import ContactForm from '@/components/ContactForm';
import HeroReviews from '@/components/home/HeroReviews';
import { getGoogleReviews } from '@/functions/getGoogleReviews';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

const iconMap = { Sprout, Droplets, Hammer, Award, CheckCircle2 };

const defaultServices = [
    { title: "Pavers & Hardscaping", description: "Expert paver patios, walkways, and retaining walls built to last.", iconName: "Hammer" },
    { title: "Turf & Sod Installation", description: "Premium Marathon tall fescue and Bermuda grass for lush lawns.", iconName: "Sprout" },
    { title: "Irrigation Systems", description: "Professional sprinkler and drip irrigation for water efficiency.", iconName: "Droplets" },
    { title: "Landscape Design", description: "Complete design and build services from concept to completion.", iconName: "Award" },
    { title: "Yard Cleanup", description: "Demolition, debris removal, and site preparation services.", iconName: "CheckCircle2" },
    { title: "Free Estimates", description: "Honest, competitive pricing with no hidden fees.", iconName: "CheckCircle2" }
];

const defaultProjects = [
    { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg", title: "Premium Turf Installation", alt: "Premium turf installation by Outright Landscape" },
    { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/6633fbff6_2025-05-286.jpg", title: "Paver Walkway", alt: "Paver walkway installation by Outright Landscape" },
    { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg", title: "Backyard Paver Patio", alt: "Paver patio installation by Outright Landscape" },
    { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg", title: "Irrigation System Installation", alt: "Irrigation system installation by Outright Landscape" },
    { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/37a148223_2025-05-288.jpg", title: "Complete Backyard Makeover", alt: "Backyard makeover by Outright Landscape" },
    { image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/954e6bafa_2024-09-04.jpg", title: "Irrigation Trenching", alt: "Irrigation trenching by Outright Landscape" }
];

export default function LocationPage({ citySlug }) {
    const { data: locations = [], isLoading } = useQuery({
        queryKey: ['locations'],
        queryFn: () => base44.entities.Location.list(null, 100),
    });

    const { data: reviewsData } = useQuery({
        queryKey: ['googleReviews'],
        queryFn: async () => {
            const response = await getGoogleReviews({});
            return response.data;
        },
        staleTime: 1000 * 60 * 60,
    });

    const cityData = locations.find(l => l.slug === citySlug);

    React.useEffect(() => {
        if (cityData && typeof window !== 'undefined') {
            if (window.dataLayer) {
                window.dataLayer.push({ event: 'service_area_page_view', event_category: 'page_view', event_label: cityData.name, city_slug: citySlug, page_type: 'service_area' });
            }
            if (window.gtag) {
                window.gtag('event', 'page_view', { page_title: `${cityData.name} Landscaping`, page_location: window.location.href, page_path: window.location.pathname + window.location.search, city_name: cityData.name });
            }
        }
    }, [cityData, citySlug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
                <div className="w-8 h-8 border-2 border-[#c45d2c] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const name = cityData?.name || 'San Gabriel Valley';
    const intro = cityData?.intro || "Transform your property with premier landscaping services from Outright Landscape Construction. We specialize in creating stunning outdoor spaces.";
    const faqs = cityData?.faqs || [];
    const services = cityData?.services?.length > 0 ? cityData.services : defaultServices;
    const projects = cityData?.projects?.length > 0 ? cityData.projects : defaultProjects;
    const slug = cityData?.slug || citySlug || '';
    const baseCitySlug = slug.replace(/-landscaping$/, '');

    const pageTitle = `${name} Landscaping & Hardscaping | Outright Landscape`;
    const metaDescription = `Licensed C-27 landscape contractor in ${name}. Expert pavers, turf installation, irrigation systems & complete landscape design. Free estimate: (626) 343-6028. CSLB #1073845.`;
    const canonicalUrl = `https://outrightlandscape.com/${slug}`;

    const breadcrumbItems = [
        { name: "Home", url: "https://outrightlandscape.com" },
        { name: "Service Areas", url: "https://outrightlandscape.com/#service-areas" },
        { name: `${name} Landscaping`, url: canonicalUrl }
    ];

    const trackPhoneClick = (location) => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'phone_click', event_category: 'engagement', event_label: `${slug}_${location}`, phone_number: '626-343-6028' });
        }
    };

    const filteredNearbyCities = isLoading ? [] : locations.filter(l => l.slug !== slug).slice(0, 8);

    const getIcon = (iconName) => {
        const Icon = iconMap[iconName] || CheckCircle2;
        return <Icon className="w-6 h-6 text-[#c45d2c]" />;
    };

    const heights = ['h-60', 'h-72', 'h-56', 'h-68', 'h-64', 'h-72'];

    return (
        <div className="cityPageWrapper bg-white">
            <SEO title={pageTitle} description={metaDescription} canonicalUrl={canonicalUrl} ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg" keywords={`landscaping ${name}, hardscaping ${name}, pavers ${name}, turf installation ${name}, irrigation ${name}, landscape contractor ${name}, CSLB 1073845`} />
            <BreadcrumbSchema items={breadcrumbItems} />
            <LocalBusinessSchema cityName={name} citySlug={slug} services={services} />
            {faqs && faqs.length > 0 && <FAQSchema faqs={faqs} cityName={name} />}

            {/* ── HERO ── */}
            <section className="cityHero relative min-h-[85vh] sm:min-h-screen flex items-end sm:items-center overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0 sm:left-[35%] lg:left-[40%]">
                    <img
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg"
                        alt={`Professional landscape project in ${name}`}
                        className="w-full h-full object-cover"
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/30 sm:from-[#1a1a1a] sm:via-[#1a1a1a]/75 sm:to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40 sm:hidden" />
                </div>

                <div className="cityHeroContent relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-12 sm:pt-32 sm:pb-16 sm:py-0">
                    <div className="cityHeroInner flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="max-w-xl space-y-4 sm:space-y-6">
                        <div className="cityHeroBadge hidden sm:inline-flex items-center gap-2 bg-[#2d5a27]/20 border border-[#2d5a27]/40 rounded-full px-4 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#4a8c3f] animate-pulse" />
                            <span className="text-[#8fbc8b] text-xs font-semibold tracking-wide uppercase">Licensed C-27 Contractor</span>
                        </div>

                        <h1 className="cityHeroHeadline text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
                            <span className="font-light">{name}'s</span><br />
                            <span className="font-bold text-[#c45d2c]">Most Trusted</span><br />
                            <span className="font-light">Landscape Contractor</span>
                        </h1>

                        <p className="cityHeroSubtitle text-[#a09a90] text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                            Licensed C-27 landscape contractor serving {name} & the San Gabriel Valley
                        </p>

                        <div className="cityHeroTrust grid grid-cols-2 gap-x-4 gap-y-1.5 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2 text-xs sm:text-sm text-[#8a8478]">
                            {['CSLB #1073845', '10+ Years', '4.8★ Google'].map((t) => (
                                <span key={t} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4a8c3f] flex-shrink-0" />
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="cityHeroCtas flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                            <a href="tel:626-343-6028" onClick={() => trackPhoneClick('hero')} className="w-full sm:w-auto">
                                <Button className="cityHeroCallBtn w-full sm:w-auto bg-[#c45d2c] hover:bg-[#a94e25] text-white font-bold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl shadow-lg shadow-[#c45d2c]/20 transition-all hover:shadow-xl hover:scale-[1.02] sm:min-w-[240px]">
                                    <Phone className="mr-2 w-4 h-4 sm:mr-2.5 sm:w-5 sm:h-5" />(626) 343-6028
                                </Button>
                            </a>
                            <a href="#contact" className="w-full sm:w-auto">
                                <Button variant="outline" className="cityHeroQuoteBtn w-full sm:w-auto border-2 border-[#b8945a]/50 bg-transparent text-[#b8945a] hover:bg-[#b8945a] hover:text-[#1a1a1a] font-semibold text-sm sm:text-base px-6 py-5 sm:px-7 sm:py-6 rounded-xl transition-all sm:min-w-[240px]">
                                    Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    {/* Reviews panel - right side on desktop, below on mobile */}
                    <div className="cityHeroReviewsWrapper lg:block">
                        <HeroReviews reviews={reviewsData?.reviews} totalReviewCount={reviewsData?.totalReviewCount} averageRating={reviewsData?.averageRating} />
                    </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a27] via-[#c45d2c] to-[#b8945a] z-20" />
            </section>

            {/* ── INTRO ── */}
            <section className="cityIntro py-16 sm:py-20 bg-[#f5f0e8]">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
                    <span className="cityIntroLabel text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">About Our Work</span>
                    <h2 className="cityIntroTitle text-3xl sm:text-4xl font-bold text-[#1a1a1a] mt-2 mb-6 tracking-tight">Landscaping Services in {name}</h2>
                    <p className="cityIntroText text-[#6b6560] text-base sm:text-lg leading-relaxed">{intro}</p>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section id="services" className="cityServices py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="cityServicesHeader mb-14 sm:mb-16">
                        <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Our Services</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mt-2">Transform Your {name} Property</h2>
                        <p className="mt-4 text-[#6b6560] text-base sm:text-lg max-w-3xl">From premium turf installation to complete landscape design, we deliver exceptional results for {name} homeowners and businesses.</p>
                    </motion.div>

                    <div className="cityServicesGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((service, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className="cityServiceCard group bg-[#f5f0e8] p-6 sm:p-7 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="cityServiceIcon w-11 h-11 bg-[#c45d2c]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c45d2c]/20 transition-colors">
                                    {getIcon(service.iconName)}
                                </div>
                                <h3 className="cityServiceTitle text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c45d2c] transition-colors">{service.title}</h3>
                                <p className="cityServiceDesc text-[#6b6560] text-sm leading-relaxed mb-4">{service.description}</p>
                                {service.keywords && (
                                    <div className="cityServiceKeywords flex flex-wrap gap-2 pt-3 border-t border-[#e0d8cc]">
                                        {service.keywords.split(', ').map((k, i) => (
                                            <span key={i} className="text-xs bg-[#2d5a27]/10 text-[#2d5a27] px-2.5 py-1 rounded-md font-medium">{k}</span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PORTFOLIO ── */}
            <section id="work" className="cityPortfolio py-20 sm:py-28 bg-[#f5f0e8]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="cityPortfolioHeader flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
                        <div>
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">Our Work</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mt-2">Projects in {name}</h2>
                        </div>
                        <p className="text-[#6b6560] text-base max-w-sm">Transforming {name} properties with expert landscaping and hardscaping</p>
                    </motion.div>

                    <div className="cityPortfolioGrid columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                        {projects.map((project, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}
                                className={`cityProjectCard group relative overflow-hidden rounded-xl break-inside-avoid ${heights[index % heights.length]}`}
                            >
                                <img src={project.image || project.src} alt={`${project.alt || project.title} - ${name}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width="600" height="600" />
                                <div className="cityProjectOverlay absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="cityProjectInfo absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{project.title}</h3>
                                    {project.description && <p className="text-[#c45d2c] text-xs mt-1 font-medium">{project.description}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="cityStats py-0 bg-[#1a1a1a] border-y border-[#333]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#333]">
                        {[
                            { number: "250+", label: "Projects Completed" },
                            { number: "10+", label: "Years Experience" },
                            { number: "4.8★", label: "Google Rating" },
                            { number: "100%", label: "Licensed & Insured" }
                        ].map((stat, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                                className="cityStatItem text-center py-10 sm:py-12"
                            >
                                <div className="cityStatValue text-3xl sm:text-4xl font-bold text-[#c45d2c] tracking-tight">{stat.number}</div>
                                <div className="cityStatLabel text-[#8a8478] text-xs sm:text-sm mt-1 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SPRINKLER & IRRIGATION SERVICES ── */}
            <section className="cityIrrigation py-20 sm:py-28 bg-white">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="cityIrrigationHeader mb-12">
                        <span className="text-[#b8945a] uppercase tracking-[0.2em] text-xs font-bold">Sprinkler Services</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Sprinkler Installation & Repair in {name}</h2>
                        <p className="mt-3 text-[#6b6560] text-base max-w-2xl">New sprinkler systems, repairs, valve service, drip irrigation, and smart controller upgrades — all in one place.</p>
                    </motion.div>

                    <div className="cityIrrigationGrid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {[
                            { title: 'Sprinkler Installation', icon: '🌱', description: 'New system design & install' },
                            { title: 'Sprinkler Repair', icon: '🔧', description: 'Fast leak & head repair' },
                            { title: 'Valve Service', icon: '⚙️', description: 'Valve replacement & repair' },
                            { title: 'Drip Irrigation', icon: '💧', description: 'Water-efficient drip systems' },
                        ].map((service, idx) => (
                            <motion.div key={idx}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="cityIrrigationCard group bg-[#f5f0e8] border border-[#e0d8cc] hover:border-[#b8945a] rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="text-2xl mb-2">{service.icon}</div>
                                <h3 className="font-bold text-[#1a1a1a] mb-1 group-hover:text-[#c45d2c] transition-colors text-sm">{service.title}</h3>
                                <p className="text-xs text-[#6b6560]">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center sm:text-left">
                        <a href={createPageUrl(`${baseCitySlug}-sprinkler-repair-installation`)} className="cityIrrigationCta inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm group">
                            View All Sprinkler Services in {name} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── FAQS ── */}
            {faqs && faqs.length > 0 && (
                <section className="cityFaqs py-20 sm:py-28 bg-[#f5f0e8]">
                    <div className="max-w-3xl mx-auto px-5 sm:px-8">
                        <div className="cityFaqsHeader mb-12">
                            <span className="text-[#c45d2c] uppercase tracking-[0.2em] text-xs font-bold">FAQ</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] tracking-tight mt-2">Common Questions in {name}</h2>
                        </div>
                        <div className="cityFaqsList space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="cityFaqItem bg-white p-6 rounded-xl border border-[#e0d8cc] hover:border-[#c45d2c]/30 transition-colors">
                                    <h3 className="cityFaqQuestion text-base font-bold text-[#1a1a1a] mb-2">{faq.q}</h3>
                                    <p className="cityFaqAnswer text-[#6b6560] text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CONTACT FORM ── */}
            <section id="contact">
                <ContactForm cityName={name} />
            </section>
        </div>
    );
}