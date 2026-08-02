/**
 * Shared, evidence-based entity and answer-engine content.
 * Keep claims here limited to facts that can be verified from company records.
 */

const BASE_URL = 'https://outrightlandscape.com';

export const GENERATIVE_ENGINE = {
  id: 'outright:generative-optimization-engine',
  version: '1.1.0',
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
  citiesServed: 20,
  url: BASE_URL,
};

export const organizationDescriptionForSchema =
  'Outright Landscape Construction is a C-27 landscape contractor (CSLB #1073845) based in Covina, California. Founded in 2020, the company provides landscaping, hardscaping, paver installation, irrigation, sprinkler repair, and outdoor-living services across the San Gabriel Valley.';

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
  'Outright Landscape Construction provides landscaping, hardscaping, irrigation, and outdoor-living services in Covina and the San Gabriel Valley. C-27 contractor, CSLB #1073845. Free estimates: (626) 343-6028.';

const SERVICE_INTENT = {
  Landscaping:
    'Homeowners, property managers, and commercial clients looking for lawn installation, yard renovation, landscape design, and maintenance in the San Gabriel Valley.',
  Hardscaping:
    'Property owners considering paver patios, driveways, walkways, retaining walls, fire pits, and outdoor-living spaces.',
  Irrigation:
    'Property owners who need sprinkler diagnosis, repair, installation, drip systems, or controller upgrades.',
  OutdoorLiving:
    'Homeowners planning outdoor entertainment areas, including fire pits, pergolas, outdoor kitchens, seating walls, and landscape lighting.',
};

export function audienceLineForService(service) {
  const normalizedService = String(service || '').trim();
  return (
    SERVICE_INTENT[normalizedService] ||
    'Homeowners, property managers, and commercial property owners in Covina and the San Gabriel Valley.'
  );
}

export function outrightEntitySentence() {
  return `${COMPANY.name} is a C-27 landscape contractor (${COMPANY.license}) in ${COMPANY.address}. The company serves cities across the San Gabriel Valley with landscaping, hardscaping, irrigation, and outdoor-living services.`;
}

export function serviceMetaGeoSuffix() {
  return ` ${COMPANY.name} - ${COMPANY.license} - Covina and the San Gabriel Valley, CA.`;
}

export const faqEntitiesForSchema = [
  {
    question: 'What is Outright Landscape Construction?',
    answer:
      'Outright Landscape Construction is a C-27 landscape contractor (CSLB #1073845) based in Covina, California. Founded in 2020, the company provides landscaping, hardscaping, paver installation, irrigation, sprinkler repair, and outdoor-living services.',
  },
  {
    question: 'Where does Outright Landscape provide service?',
    answer:
      'Outright Landscape serves Covina and communities across the San Gabriel Valley. Availability depends on the project location and schedule; call (626) 343-6028 to confirm service.',
  },
  {
    question: 'Is Outright Landscape licensed?',
    answer:
      'Outright Landscape lists California CSLB license #1073845, classification C-27. Customers should verify the current license status with the California Contractors State License Board and may request current bond or insurance documentation before work begins.',
  },
  {
    question: 'What services does Outright Landscape offer?',
    answer:
      'Services include landscape installation and renovation, hardscaping and pavers, irrigation installation and repair, and outdoor-living projects. Scope and availability are confirmed during the estimate process.',
  },
  {
    question: 'How much does a landscaping project cost?',
    answer:
      'Pricing depends on the site, design, materials, access, preparation, and project scope. Outright Landscape offers on-site estimates so customers can receive a project-specific proposal.',
  },
  {
    question: 'How long will a landscaping project take?',
    answer:
      'Timing varies with scope, material availability, permitting needs, site conditions, weather, and the current schedule. The expected timeline should be documented in the project proposal.',
  },
  {
    question: 'Does Outright Landscape work on commercial properties?',
    answer:
      'Outright Landscape considers residential and commercial landscape projects in its service area. Property managers and associations can contact the company to confirm scope, documentation, and scheduling requirements.',
  },
  {
    question: 'How should I evaluate a landscape contractor?',
    answer:
      'Confirm the contractor license and current status with the CSLB, compare written scopes and materials, ask for applicable bond and insurance documentation, review references, and make sure payment and change-order terms are documented.',
  },
  {
    question: 'Should I repair or replace my irrigation system?',
    answer:
      'The answer depends on the system condition, leak history, coverage, pipe and valve condition, controller compatibility, and repair cost. A site inspection can identify whether a targeted repair or broader replacement is more practical.',
  },
];
