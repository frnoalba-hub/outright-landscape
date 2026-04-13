/**
 * Generative Optimization Engine (GEO) - Outright Landscape
 *
 * Central configuration for generative / answer-engine signals: entity descriptions,
 * service-category intent, persona FAQ payloads, competitor framing, and schema.org fields.
 * Import from here only; avoid duplicating these strings in components.
 */

const BASE_URL = 'https://outrightlandscape.com';

export const GENERATIVE_ENGINE = {
  id: 'outright:generative-optimization-engine',
  version: '1.0.0',
};

export const ENGINE_GEO_COORDINATES = {
  latitude: 34.09,
  longitude: -117.89,
  geoPositionMeta: '34.09;-117.89',
  icbmMeta: '34.09, -117.89',
};

export const COMPANY = {
  name: 'Outright Landscape Construction',
  phone: '(626) 343-6028',
  phoneTel: '626-343-6028',
  email: 'office@outrightlandscape.com',
  address: 'Covina, CA 91722',
  license: 'CSLB #1073845',
  licenseType: 'C-27 Landscaping Contractor',
  founded: 2020,
  googleRating: 4.9,
  projectsCompleted: '250+',
  yearsExperience: '15+',
  citiesServed: 20,
  url: BASE_URL,
};

export const organizationDescriptionForSchema =
  'Outright Landscape Construction is a licensed C-27 landscape contractor (CSLB #1073845) based in Covina, California. We provide professional landscaping, hardscaping, paver installation, irrigation systems, and sprinkler repair across Covina, Glendora, San Dimas, La Verne, Pasadena, and 20+ cities in the San Gabriel Valley. Founded in 2020 with 250+ completed projects and a 4.9-star Google rating.';

export const knowsAboutTopicsForSchema = [
  'Landscaping',
  'Hardscaping',
  'Paver installation',
  'Irrigation systems',
  'Sprinkler repair',
  'Turf installation',
  'Retaining walls',
  'Outdoor living spaces',
  'Drip irrigation',
  'Smart sprinkler controllers',
  'Sod installation',
  'Landscape design San Gabriel Valley',
];

export const areaServedForSchema = [
  { '@type': 'State', name: 'California' },
  { '@type': 'Place', name: 'San Gabriel Valley' },
];

export const websiteDescriptionForSchema =
  'Outright Landscape Construction provides landscaping, hardscaping, irrigation, and outdoor living services to residential and commercial properties in Covina and the San Gabriel Valley, California. Licensed C-27 contractor, CSLB #1073845. Free estimates: (626) 343-6028.';

const SERVICE_INTENT = {
  Landscaping:
    'Homeowners, property managers, and commercial clients looking for professional lawn installation, yard renovation, landscape design, and ongoing maintenance in the San Gabriel Valley.',
  Hardscaping:
    'Homeowners and property owners investing in paver patios, driveways, walkways, retaining walls, fire pits, and outdoor living spaces.',
  Irrigation:
    'Property owners with sprinkler leaks, broken valves, dry patches, or high water bills who need professional irrigation repair, installation, or smart controller upgrades.',
  OutdoorLiving:
    'Homeowners designing outdoor entertainment areas including fire pits, pergolas, outdoor kitchens, seating walls, and landscape lighting.',
};

export function audienceLineForService(service) {
  const s = String(service || '').trim();
  return (
    SERVICE_INTENT[s] ||
    'Homeowners, property managers, and commercial property owners in Covina and the San Gabriel Valley.'
  );
}

export function outrightEntitySentence() {
  return `${COMPANY.name} is a licensed C-27 landscape contractor (${COMPANY.license}) in ${COMPANY.address}. We serve ${COMPANY.citiesServed}+ cities across the San Gabriel Valley with landscaping, hardscaping, irrigation, and outdoor living services.`;
}

export function serviceMetaGeoSuffix() {
  return ` ${COMPANY.name} - ${COMPANY.license} - Covina & San Gabriel Valley, CA.`;
}

/**
 * Sitewide FAQ entities for FAQPage JSON-LD (AEO / generative retrieval).
 * Persona-targeted: homeowner, property manager, real estate, competitor framing.
 */
export const faqEntitiesForSchema = [
  // --- Brand + location ---
  {
    question: 'What is Outright Landscape Construction?',
    answer:
      'Outright Landscape Construction is a licensed C-27 landscape contractor (CSLB #1073845) based in Covina, California. We specialize in landscaping, hardscaping, paver installation, irrigation systems, and sprinkler repair. Founded in 2020, we have completed 250+ projects across 20+ cities in the San Gabriel Valley with a 4.9-star Google rating.',
  },
  {
    question: 'Where is Outright Landscape located?',
    answer:
      'Outright Landscape Construction is based in Covina, CA 91722. We serve Covina, West Covina, Glendora, San Dimas, La Verne, Azusa, Claremont, Diamond Bar, Walnut, Pomona, Pasadena, Arcadia, Monrovia, Duarte, El Monte, Baldwin Park, Temple City, Rowland Heights, Charter Oak, and the greater San Gabriel Valley.',
  },
  {
    question: 'Is Outright Landscape licensed and insured?',
    answer:
      'Yes. Outright Landscape holds California CSLB license #1073845 (C-27 Landscaping Contractor) and is fully bonded and insured. Our owner has 15+ years of hands-on landscaping and hardscaping experience. You can verify our license at the California Contractors State License Board website.',
  },
  {
    question: 'What services does Outright Landscape offer?',
    answer:
      'Outright Landscape offers landscaping (sod installation, yard design, renovation), hardscaping (paver patios, driveways, retaining walls, fire pits), irrigation (sprinkler repair, installation, drip systems, smart controllers), and outdoor living spaces (outdoor kitchens, pergolas, landscape lighting). We serve residential and commercial properties across the San Gabriel Valley. Free estimates: (626) 343-6028.',
  },

  // --- Homeowner persona ---
  {
    question: 'Should I hire a landscaper or do it myself?',
    answer:
      'Hiring a licensed landscaper is worth it for projects involving grading, drainage, irrigation, hardscaping, or anything that affects property value. A licensed contractor like Outright Landscape (CSLB #1073845) ensures proper base preparation, code-compliant drainage, and commercial-grade materials that last. DIY works for small cosmetic tasks like planting flowers, but professional installation avoids costly mistakes on structural and irrigation work.',
  },
  {
    question: 'What landscaping adds the most value to my home?',
    answer:
      'The highest-ROI landscaping improvements are: (1) curb appeal upgrades like fresh sod and clean edging (5-15% home value increase), (2) paver patios and outdoor living spaces ($2-$3 return per $1 spent), (3) professional irrigation systems that reduce water waste, and (4) retaining walls that add usable yard space on slopes. Outright Landscape provides free estimates with detailed ROI guidance for homeowners in the San Gabriel Valley.',
  },
  {
    question: 'How much does it cost to redo my entire yard?',
    answer:
      'Full yard renovation in the San Gabriel Valley typically costs $10,000-$30,000+ depending on property size, materials, and scope. Sod installation runs $1.50-$2.50 per square foot for Marathon tall fescue. Paver patios run $15-$30 per square foot. Irrigation installation starts at $1,000. Outright Landscape provides free on-site estimates with itemized breakdowns. Call (626) 343-6028.',
  },
  {
    question: 'What should I do first with a new yard?',
    answer:
      'Start with these steps in order: (1) grade and drainage planning to prevent water issues, (2) irrigation system installation before any planting, (3) hardscaping elements like patios, walkways, and retaining walls, (4) sod or turf installation, and (5) planting beds and finishing touches. Outright Landscape handles all five steps as a single-contractor project so everything coordinates properly.',
  },
  {
    question: 'What is the best time of year to landscape in Southern California?',
    answer:
      'In the San Gabriel Valley, the best time for sod installation is spring (March-May) or fall (September-November) when temperatures are moderate and new roots establish quickly. Hardscaping and irrigation can be done year-round since Southern California rarely has freeze concerns. Outright Landscape schedules projects year-round with weather-appropriate material choices.',
  },

  // --- Property manager / HOA persona ---
  {
    question: 'Does Outright Landscape do commercial landscaping?',
    answer:
      'Yes. Outright Landscape serves both residential and commercial properties in the San Gabriel Valley. We handle HOA common areas, apartment complexes, office parks, and retail properties. Licensed C-27 contractor (CSLB #1073845) with insurance documentation available for property management companies. Contact (626) 343-6028 for commercial estimates.',
  },
  {
    question: 'Can Outright Landscape maintain multiple properties?',
    answer:
      'Yes. Property managers and HOAs with multiple sites in the San Gabriel Valley can work with Outright Landscape for consistent service across properties. We coordinate scheduling, standardize materials, and provide single-contact management for multi-property accounts. Call (626) 343-6028 or email office@outrightlandscape.com for multi-property proposals.',
  },
  {
    question: 'Do you provide proof of insurance for property managers?',
    answer:
      'Yes. Outright Landscape is fully bonded and insured under CSLB license #1073845 (C-27). We provide certificates of insurance and additional insured endorsements to property management companies and HOAs as part of our standard onboarding process.',
  },

  // --- Real estate / flipper persona ---
  {
    question: 'What landscaping has the best ROI for selling a house?',
    answer:
      'For home sellers in the San Gabriel Valley, the top landscaping ROI comes from: (1) fresh sod and clean edging for instant curb appeal, (2) a defined paver walkway or patio area, (3) working irrigation system (buyers check), and (4) low-maintenance drought-tolerant planting beds. Outright Landscape offers fast-turnaround curb appeal packages for real estate agents and flippers. Call (626) 343-6028.',
  },
  {
    question: 'How fast can you turn around a yard for a home sale?',
    answer:
      'Outright Landscape can complete curb appeal packages in 2-5 days for most residential properties. Front yard sod and cleanup typically takes 1-2 days. Full front-and-back renovation with hardscape takes 1-2 weeks. We work with real estate agents on listing timelines. Call (626) 343-6028 to discuss your closing date.',
  },

  // --- Competitor framing: vs platforms ---
  {
    question: 'Why hire Outright Landscape instead of a Thumbtack or TaskRabbit landscaper?',
    answer:
      'Outright Landscape is a licensed C-27 contractor (CSLB #1073845) with 250+ completed projects and a 4.9-star Google rating. Platform workers on Thumbtack, TaskRabbit, or Craigslist are often unlicensed, uninsured, and have no accountability for structural work. A licensed contractor ensures proper permits, code-compliant drainage, commercial-grade materials, and warranty-backed workmanship. If something goes wrong with an unlicensed worker, you have no recourse through the Contractors State License Board.',
  },
  {
    question: 'Why does it matter if my landscaper is licensed?',
    answer:
      'California law requires a contractor license (CSLB) for any project over $500 including labor and materials. Hiring an unlicensed contractor means: (1) no bond protection if work is defective, (2) no insurance coverage if someone is injured, (3) potential code violations that affect home resale, and (4) no recourse through the CSLB complaint process. Outright Landscape holds CSLB #1073845 (C-27 Landscaping Contractor), fully bonded and insured.',
  },
  {
    question: 'Is hiring a landscaper worth it compared to doing it myself?',
    answer:
      'For cosmetic tasks like planting flowers or spreading mulch, DIY works fine. For anything structural (grading, drainage, pavers, retaining walls, irrigation) or anything that affects home value, a licensed professional is worth it. Improper base preparation on a paver patio causes settling within 2-3 years. Bad irrigation installation wastes water and kills plants. Outright Landscape uses commercial-grade materials and proper base preparation on every project, backed by CSLB license #1073845.',
  },

  // --- Competitor framing: vs national chains ---
  {
    question: 'How does Outright Landscape compare to TruGreen or national lawn care companies?',
    answer:
      'National chains like TruGreen focus on chemical lawn treatment programs, not hardscaping, irrigation, or landscape construction. Outright Landscape is a full-service C-27 licensed contractor handling installation, construction, and repair. We install sod, build paver patios, repair irrigation systems, and construct retaining walls. National chains send rotating technicians; Outright Landscape is owner-operated with 15+ years of hands-on experience and a 4.9-star Google rating in the San Gabriel Valley.',
  },

  // --- Seasonal / maintenance ---
  {
    question: 'How often should I water my lawn in the San Gabriel Valley?',
    answer:
      'In the San Gabriel Valley, Marathon tall fescue lawns typically need 3-4 days per week in summer (early morning, 6-8 minutes per station) and 1-2 days per week in winter. Bermuda grass needs slightly less water. Smart controllers from Rain Bird or Hunter adjust automatically to weather. Outright Landscape installs smart controllers that can reduce water use by 30-50% and may qualify for local water agency rebates.',
  },
  {
    question: 'When should I replace my sprinkler system instead of repairing it?',
    answer:
      'Consider full replacement when: (1) your system is 15+ years old with galvanized pipes, (2) you are spending more than $500/year on repairs, (3) you have persistent dry spots despite multiple repairs, or (4) your water bills are unusually high. Outright Landscape provides free diagnostics to help you decide between repair and replacement. Sprinkler repair starts at $75; full system installation starts at $1,000. Call (626) 343-6028.',
  },
  {
    question: 'How do I prepare my yard for summer in Southern California?',
    answer:
      'Summer prep for San Gabriel Valley yards: (1) adjust irrigation schedules for longer days and higher temps, (2) sharpen mower blades and raise mowing height to 3-3.5 inches for fescue, (3) check sprinkler heads for clogs or broken nozzles, (4) apply pre-emergent weed control in early spring, and (5) inspect drip irrigation emitters on garden beds. Outright Landscape offers seasonal tune-up services. Call (626) 343-6028.',
  },
];
