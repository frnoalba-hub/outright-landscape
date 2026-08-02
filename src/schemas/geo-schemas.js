/**
 * GEO (Generative Engine Optimization) + Local SEO schemas for Outright Landscape.
 * LocalBusiness loads on every page; Service schemas can be added per-page.
 */

const BASE_URL = 'https://outrightlandscape.com';

/** Default geolocation for Local SEO meta tags (Covina HQ). Override per city page if needed. */
export const GEO_DEFAULTS = {
  region: 'US-CA',
  placename: 'Covina, California',
  position: '34.09;-117.89',
  icbm: '34.09, -117.89',
  latitude: 34.09,
  longitude: -117.89,
};
/**
 * City-specific geolocation for Local SEO. Every city page injects its own geo meta.
 * Coordinates are city centers (San Gabriel Valley, CA). Used for geo.region, geo.placename,
 * geo.position, ICBM on city-specific irrigation, hardscape, and landscaping pages.
 */
export const CITY_GEO = {
  Arcadia: { placename: 'Arcadia, California', lat: 34.1397, lng: -118.0353 },
  Azusa: { placename: 'Azusa, California', lat: 34.1336, lng: -117.9076 },
  'Baldwin Park': { placename: 'Baldwin Park, California', lat: 34.0853, lng: -117.9609 },
  'Charter Oak': { placename: 'Charter Oak, California', lat: 34.1, lng: -117.85 },
  Claremont: { placename: 'Claremont, California', lat: 34.0967, lng: -117.7198 },
  Covina: { placename: 'Covina, California', lat: 34.09, lng: -117.89 },
  'Diamond Bar': { placename: 'Diamond Bar, California', lat: 34.0286, lng: -117.8103 },
  Duarte: { placename: 'Duarte, California', lat: 34.1395, lng: -117.9773 },
  'El Monte': { placename: 'El Monte, California', lat: 34.0686, lng: -118.0276 },
  Glendora: { placename: 'Glendora, California', lat: 34.1364, lng: -117.8653 },
  'La Verne': { placename: 'La Verne, California', lat: 34.1008, lng: -117.7678 },
  Monrovia: { placename: 'Monrovia, California', lat: 34.1443, lng: -117.9999 },
  Pasadena: { placename: 'Pasadena, California', lat: 34.1478, lng: -118.1445 },
  Pomona: { placename: 'Pomona, California', lat: 34.0551, lng: -117.7522 },
  'Rowland Heights': { placename: 'Rowland Heights, California', lat: 33.9761, lng: -117.9053 },
  'San Dimas': { placename: 'San Dimas, California', lat: 34.1067, lng: -117.8067 },
  'San Gabriel': { placename: 'San Gabriel, California', lat: 34.0961, lng: -118.1058 },
  'Temple City': { placename: 'Temple City, California', lat: 34.1072, lng: -118.0578 },
  Walnut: { placename: 'Walnut, California', lat: 34.0202, lng: -117.8651 },
  'West Covina': { placename: 'West Covina, California', lat: 34.0686, lng: -117.9389 },
};
/** Public review excerpts with their source pages. */
export const GEO_QUOTES = {
  default: {
    quote: 'Very organized and very helpful.',
    name: 'Nancy V.',
    city: 'Angi review',
    stars: 5,
    sourceUrl: 'https://www.angi.com/companylist/us/ca/covina/outright-landscape-reviews-1.htm',
  },
  irrigation: {
    quote: 'Very satisfied with the work from Outright Landscape.',
    name: 'Mr. Long',
    city: 'Houzz review',
    stars: 5,
    sourceUrl: 'https://www.houzz.com/professionals/landscape-contractors/outright-landscape-pfvwus-pf~851831346',
  },
  hardscape: {
    quote: 'Amazing job well done. Had my front yard redone to a low maintenance modern look I always wanted.',
    name: 'Randy L.',
    city: 'Angi review',
    stars: 5,
    sourceUrl: 'https://www.angi.com/companylist/us/ca/covina/outright-landscape-reviews-1.htm',
  },
};
/** Verified business facts used across site copy. */
export const GEO_STATS = {
  citiesServed: 20,
  foundingYear: 2020,
};

/**
 * AEO: FAQ content for voice & "near me" searches.
 * Question -> 2 Sentence Answer format. Wrapped in FAQPage JSON-LD.
 */
export const GEO_FAQS = {
  home: [
    { q: 'Who provides licensed landscaping in Covina?', a: 'Outright Landscape Construction is a Covina-based landscape contractor serving the San Gabriel Valley. We hold CSLB license #1073845 (C-27); call (626) 343-6028 for a free estimate.' },
    { q: 'How much does a custom patio cost in Covina?', a: 'Custom patio pricing depends on the materials, site preparation, drainage needs, access, and project complexity. Outright Landscape provides free on-site estimates with detailed pricing for patios, walkways, and driveways throughout the San Gabriel Valley.' },
    { q: 'Are you licensed for landscaping work?', a: 'Yes. Outright Landscape holds CSLB license #1073845 (C-27 Landscaping Contractor). We serve Covina and communities throughout the San Gabriel Valley.' },
    { q: 'What areas do you serve?', a: 'We serve Covina, West Covina, Glendora, San Dimas, La Verne, Azusa, Claremont, Diamond Bar, Walnut, Pomona, Pasadena, Arcadia, Monrovia, Duarte, El Monte, Baldwin Park, Temple City, Rowland Heights, Charter Oak, and the greater San Gabriel Valley. Free estimates: (626) 343-6028.' },
    { q: 'How do I choose a landscaping company near me?', a: 'Confirm that the contractor holds the appropriate California license, provides a written scope, and explains materials, preparation, drainage, and scheduling. Outright Landscape is a licensed C-27 contractor (CSLB #1073845) serving Covina and the San Gabriel Valley.' },
    { q: 'What makes Outright Landscape different from other landscapers?', a: 'Outright Landscape is a Covina-based, licensed C-27 contractor founded in 2020. We focus on clear estimates, thoughtful material selection, and proper preparation for landscaping, hardscaping, and irrigation projects.' },
    { q: 'How much does landscaping cost in the San Gabriel Valley?', a: 'Landscaping cost varies with property size, site conditions, materials, access, drainage needs, and project scope. Outright Landscape provides free on-site estimates with a project-specific pricing breakdown.' },
    { q: 'What type of sod is best for Covina and the San Gabriel Valley?', a: 'The best sod depends on sun exposure, foot traffic, appearance goals, maintenance, and water needs. Outright Landscape can compare suitable varieties and include soil preparation and grading in a project-specific recommendation.' },
    { q: 'Do you offer free estimates for landscaping in Covina?', a: 'Yes. Outright Landscape provides free on-site estimates for all landscaping, hardscaping, and irrigation projects in Covina and the San Gabriel Valley. We include detailed material specs, timelines, and pricing. Call (626) 343-6028 or fill out our online form to schedule.' },
    { q: 'How long does a landscape renovation take?', a: 'Project timing depends on scope, site access, demolition, material availability, permitting, and weather. Outright Landscape provides a project-specific schedule with each estimate.' },
    { q: 'Does Outright Landscape serve the San Gabriel Valley?', a: 'Yes. Outright Landscape is based in Covina and serves communities across the San Gabriel Valley with landscaping, hardscaping, and irrigation services.' },
  ],
  irrigation: [
    { q: 'Who provides licensed sprinkler repair near me?', a: 'Outright Landscape is a licensed C-27 contractor (CSLB #1073845) offering irrigation and sprinkler service throughout Covina and the San Gabriel Valley. Call (626) 343-6028 to discuss availability and request an estimate.' },
    { q: 'How much does sprinkler installation cost in the San Gabriel Valley?', a: 'Sprinkler installation and repair pricing depends on yard size, zones, system condition, access, materials, and the source of the problem. Outright Landscape provides project-specific estimates throughout the San Gabriel Valley.' },
    { q: 'Are you licensed for irrigation repair?', a: 'Yes. Outright Landscape holds CSLB #1073845 (C-27 Landscaping Contractor) and provides irrigation and sprinkler work throughout the San Gabriel Valley.' },
    { q: 'Do you offer sprinkler repair near me?', a: 'Yes. Outright Landscape serves Covina and communities throughout the San Gabriel Valley. Call (626) 343-6028 to discuss sprinkler leaks, valve issues, controller problems, and current scheduling.' },
    { q: 'What brands of sprinkler systems do you install?', a: 'We work with Rain Bird, Hunter, Toro, Irritrol, Orbit, and other major brands. We recommend the best fit for your property, budget, and water-efficiency goals.' },
    { q: 'How much does sprinkler repair cost in Covina?', a: 'Repair cost depends on diagnosis, parts, access, and the condition of the existing system. Outright Landscape provides project-specific estimates for irrigation work in Covina and the San Gabriel Valley.' },
    { q: 'What are signs my sprinkler system needs repair?', a: 'Common signs include dry patches despite watering, pooling water, unusually high water bills, heads that do not rise or rotate, and hissing near valves or pipes. Call (626) 343-6028 to discuss an irrigation inspection.' },
    { q: 'Can you install a smart sprinkler controller?', a: 'Yes. Outright Landscape installs and configures smart irrigation controllers, including options from major manufacturers. Product compatibility, water savings, and any available rebates depend on the property, equipment, water provider, and program eligibility.' },
    { q: 'How often should I replace my sprinkler heads?', a: 'Replace sprinkler heads when they are cracked, no longer retract, mist instead of spraying, leak, or create uneven coverage. Service life varies with the product, water quality, placement, and foot traffic.' },
    { q: 'Do you install drip irrigation systems?', a: 'Yes. Outright Landscape installs drip irrigation for garden beds, shrubs, trees, and slopes. A site-specific design can improve delivery efficiency by matching components and zones to the plants and property.' },
  ],
  hardscape: [
    { q: 'Who provides licensed hardscaping near me?', a: 'Outright Landscape Construction is a licensed C-27 contractor (CSLB #1073845) serving Covina and the San Gabriel Valley. Services include paver patios, driveways, retaining walls, and outdoor living spaces.' },
    { q: 'How much does a custom patio cost in Covina?', a: 'Patio pricing depends on size, materials, demolition, access, drainage, and base preparation. Outright Landscape provides free on-site estimates with detailed breakdowns for patios, driveways, and retaining walls.' },
    { q: 'Are you licensed for hardscape work?', a: 'Yes. Outright Landscape holds CSLB license #1073845 (C-27 Landscaping Contractor). Ask about your specific scope during the estimate so applicable requirements can be confirmed.' },
    { q: 'Do you do concrete and paver work near me?', a: 'Yes. Outright Landscape serves Covina, West Covina, Glendora, San Dimas, La Verne, Azusa, Claremont, Diamond Bar, Pasadena, Walnut, Pomona, and the full San Gabriel Valley. Call (626) 343-6028 for a free estimate.' },
    { q: 'How long does paver installation take?', a: 'Timing depends on project size, demolition, access, drainage, preparation, materials, permitting, and weather. Outright Landscape provides a project-specific schedule with the written estimate.' },
    { q: 'What is the difference between pavers and stamped concrete?', a: 'Interlocking pavers offer many patterns and allow individual units to be replaced; stamped concrete creates a patterned continuous surface. Cost and maintenance depend on site preparation, design, materials, and installation details, so a project-specific comparison is recommended.' },
    { q: 'Do I need a permit for a retaining wall in the San Gabriel Valley?', a: 'Requirements depend on wall height, retained material, loads, location, and the local jurisdiction. Confirm current engineering, setback, and permit requirements for the specific property before construction.' },
    { q: 'What paver brands do you install?', a: 'Outright Landscape works with established paver manufacturers and helps homeowners compare colors, patterns, textures, availability, and manufacturer terms for their project. Call (626) 343-6028 for a design consultation.' },
    { q: 'How much does a concrete driveway cost in Covina?', a: 'Concrete driveway pricing depends on size, demolition, access, grading, reinforcement, drainage, finish, and site conditions. Outright Landscape provides free project-specific estimates in Covina and the San Gabriel Valley.' },
    { q: 'Why is base preparation important for hardscaping?', a: 'Proper excavation, grading, compaction, drainage, and the specified base materials help hardscape surfaces remain stable. The appropriate preparation depth and materials depend on the surface, soil, load, and site conditions.' },
  ],
};

/** Returns geo meta for a city, or null if not found (falls back to GEO_DEFAULTS). */
export function getCityGeo(cityName) {
  const city = CITY_GEO[cityName];
  if (!city) return null;
  return {
    region: 'US-CA',
    placename: city.placename,
    position: `${city.lat};${city.lng}`,
    icbm: `${city.lat}, ${city.lng}`,
  };
}

/** Global LocalBusiness schema — loads on every page. Industry: Landscaping & Irrigation. */
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  '@id': `${BASE_URL}/#organization`,
  name: 'Outright Landscape Construction',
  legalName: 'Outright Landscape Construction',
  url: BASE_URL,
  logo: `${BASE_URL}/images/outright-landscape-logo-256.jpg`,
  image: [
    `${BASE_URL}/images/cdeefde95_2024-09-14.jpg`,
    `${BASE_URL}/images/670c050ff_2025-05-284.jpg`,
    `${BASE_URL}/images/bbdea4e3f_2025-05-281.jpg`,
  ],
  description:
    'Licensed C-27 landscape contractor serving Covina, Glendora, San Dimas and the San Gabriel Valley. Expert turf installation, irrigation systems, hardscaping, and paver installation. Landscaping and irrigation services for residential and commercial properties.',
  telephone: '+1-626-343-6028',
  email: 'office@outrightlandscape.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Covina',
    addressRegion: 'CA',
    postalCode: '91722',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.09,
    longitude: -117.89,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  sameAs: [
    'https://share.google/7R4p12cJP2hQI8Ppy',
    'https://www.yelp.com/biz/outright-landscape-covina',
    'https://www.homeadvisor.com/rated.OUTRIGHTLANDSCAPE.112318590.html',
    'https://www.houzz.com/professionals/landscape-contractors/outright-landscape-pfvwus-pf~851831346',
    'https://www.linkedin.com/company/outright-landscape/',
    'https://www.tiktok.com/@outright_landscape',
  ],
  areaServed: [
    { '@type': 'City', name: 'Covina', sameAs: 'https://en.wikipedia.org/wiki/Covina,_California' },
    { '@type': 'City', name: 'West Covina', sameAs: 'https://en.wikipedia.org/wiki/West_Covina,_California' },
    { '@type': 'City', name: 'Glendora', sameAs: 'https://en.wikipedia.org/wiki/Glendora,_California' },
    { '@type': 'City', name: 'San Dimas', sameAs: 'https://en.wikipedia.org/wiki/San_Dimas,_California' },
    { '@type': 'City', name: 'Pasadena', sameAs: 'https://en.wikipedia.org/wiki/Pasadena,_California' },
    { '@type': 'City', name: 'Azusa', sameAs: 'https://en.wikipedia.org/wiki/Azusa,_California' },
    { '@type': 'City', name: 'Diamond Bar', sameAs: 'https://en.wikipedia.org/wiki/Diamond_Bar,_California' },
    { '@type': 'City', name: 'La Verne', sameAs: 'https://en.wikipedia.org/wiki/La_Verne,_California' },
    { '@type': 'City', name: 'Walnut', sameAs: 'https://en.wikipedia.org/wiki/Walnut,_California' },
    { '@type': 'City', name: 'Pomona', sameAs: 'https://en.wikipedia.org/wiki/Pomona,_California' },
    { '@type': 'Place', name: 'San Gabriel Valley' },
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'license',
    name: 'California Contractor License C-27',
    licenseNumber: '1073845',
  },
  knowsAbout: ['Landscaping', 'Hardscaping', 'Irrigation Systems', 'Paver Installation', 'Turf Installation', 'Sprinkler Repair'],
  slogan: 'Transform Your Outdoor Living Space',
  foundingDate: '2020',
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${BASE_URL}/#paver-installation`,
        name: 'Paver Installation',
        description: 'Professional paver installation including patios, walkways, driveways, and pool decks. Expert craftsmanship with high-quality materials.',
        areaServed: { '@type': 'Place', name: 'San Gabriel Valley' },
        serviceType: 'Hardscaping',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${BASE_URL}/#turf-installation`,
        name: 'Turf Installation',
        description: 'Premium sod and turf installation featuring Marathon tall fescue and hybrid Bermuda grass. Lush, healthy lawns.',
        areaServed: { '@type': 'Place', name: 'San Gabriel Valley' },
        serviceType: 'Lawn Care',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${BASE_URL}/#irrigation-systems`,
        name: 'Irrigation Systems',
        description: 'Expert irrigation and sprinkler system installation. Drip systems, smart controllers, water-efficient designs. Sprinkler repair available.',
        areaServed: { '@type': 'Place', name: 'San Gabriel Valley' },
        serviceType: 'Irrigation',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${BASE_URL}/#hardscaping`,
        name: 'Hardscaping',
        description: 'Complete hardscaping: retaining walls, outdoor kitchens, fire pits, custom outdoor living spaces.',
        areaServed: { '@type': 'Place', name: 'San Gabriel Valley' },
        serviceType: 'Hardscaping',
      },
    },
  ],
};

/** Service schemas for specific pages. Use schemaData={[SERVICE_SCHEMAS.hardscaping]} etc. */
export const SERVICE_SCHEMAS = {
  'paver-installation': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/#paver-installation`,
    serviceType: 'Paver Installation',
    name: 'Paver Installation Services',
    description:
      'Professional paver installation services including patios, walkways, driveways, and pool decks. Expert craftsmanship with high-quality materials for long-lasting results.',
    provider: { '@type': 'LandscapingBusiness', '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Covina' },
      { '@type': 'City', name: 'West Covina' },
      { '@type': 'City', name: 'Glendora' },
      { '@type': 'City', name: 'San Dimas' },
      { '@type': 'City', name: 'Pasadena' },
      { '@type': 'Place', name: 'San Gabriel Valley' },
    ],
  },
  'turf-installation': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/#turf-installation`,
    serviceType: 'Turf Installation',
    name: 'Turf & Sod Installation Services',
    description: 'Premium turf and sod installation featuring Marathon tall fescue and hybrid Bermuda grass. Lush, healthy lawns.',
    provider: { '@type': 'LandscapingBusiness', '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Covina' },
      { '@type': 'City', name: 'West Covina' },
      { '@type': 'City', name: 'Glendora' },
      { '@type': 'City', name: 'San Dimas' },
      { '@type': 'City', name: 'Azusa' },
      { '@type': 'Place', name: 'San Gabriel Valley' },
    ],
  },
  'irrigation-systems': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/#irrigation-systems`,
    serviceType: 'Irrigation System Installation',
    name: 'Irrigation & Sprinkler System Services',
    description:
      'Irrigation and sprinkler-system installation, drip systems, smart controllers, sprinkler repair, and valve service. Scheduling depends on availability.',
    provider: { '@type': 'LandscapingBusiness', '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Covina' },
      { '@type': 'City', name: 'West Covina' },
      { '@type': 'City', name: 'Glendora' },
      { '@type': 'City', name: 'San Dimas' },
      { '@type': 'City', name: 'Diamond Bar' },
      { '@type': 'Place', name: 'San Gabriel Valley' },
    ],
  },
  hardscaping: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/#hardscaping`,
    serviceType: 'Hardscaping',
    name: 'Hardscaping Services',
    description:
      'Complete hardscaping services including retaining walls, outdoor kitchens, fire pits, and custom outdoor living spaces. Expert craftsmanship for beautiful, functional landscapes.',
    provider: { '@type': 'LandscapingBusiness', '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Covina' },
      { '@type': 'City', name: 'Glendora' },
      { '@type': 'City', name: 'San Dimas' },
      { '@type': 'City', name: 'Pasadena' },
      { '@type': 'City', name: 'Diamond Bar' },
      { '@type': 'Place', name: 'San Gabriel Valley' },
    ],
  },
};
