/** Evidence-based service hubs and buyer guides. */

const UPDATED_AT = '2026-08-01';
const CONTACT = 'Call (626) 343-6028 for a project-specific estimate.';

const sharedFaqs = [
  {
    question: 'Is Outright Landscape a licensed contractor?',
    answer:
      'Outright Landscape lists California CSLB license #1073845, classification C-27. Verify the current license status directly with the California Contractors State License Board before hiring.',
  },
  {
    question: 'How are project prices determined?',
    answer:
      `Pricing depends on the site, materials, access, preparation, permits, and scope. ${CONTACT}`,
  },
];

export const SERVICE_HUBS = [
  {
    slug: 'landscaping',
    serviceName: 'Landscaping & Turf',
    title: 'Landscaping & Turf Services in Covina | Outright Landscape',
    description:
      'Landscape installation, turf, sod, grading, drainage, and yard-renovation services in Covina and the San Gabriel Valley. CSLB #1073845.',
    lead:
      'Outright Landscape Construction is a Covina-based C-27 contractor founded in 2020. The team plans and installs landscape improvements throughout the San Gabriel Valley.',
    updatedAt: UPDATED_AT,
    howToChoose: [
      { key: 'Assess the site', value: 'Review soil, drainage, sun exposure, access, and existing utilities before selecting a design or material.' },
      { key: 'Plan water first', value: 'Coordinate irrigation and drainage before installing turf, plants, or finished surfaces.' },
      { key: 'Compare written scopes', value: 'Make sure demolition, preparation, materials, cleanup, timing, and exclusions are clear in each proposal.' },
    ],
    faqs: [
      ...sharedFaqs,
      { question: 'Which turf is right for my yard?', answer: 'The right option depends on sunlight, foot traffic, appearance, maintenance, and local watering requirements. A site visit helps narrow the choices.' },
      { question: 'How long does a yard renovation take?', answer: 'Timing varies with scope, site conditions, material availability, weather, permits, and the current schedule. The expected timeline should be included in the proposal.' },
    ],
    guideSlugs: ['best-sod-san-gabriel-valley', 'landscaping-cost-san-gabriel-valley'],
  },
  {
    slug: 'hardscaping',
    serviceName: 'Hardscaping & Pavers',
    title: 'Hardscape & Paver Contractor in Covina | Outright Landscape',
    description:
      'Paver patios, walkways, driveways, retaining walls, and outdoor hardscape in Covina and the San Gabriel Valley. CSLB #1073845.',
    lead:
      'Outright Landscape installs hardscape and paver features with site-specific preparation, material selection, grading, and drainage planning.',
    updatedAt: UPDATED_AT,
    howToChoose: [
      { key: 'Compare materials', value: 'Review appearance, maintenance, repairability, availability, installed cost, and applicable manufacturer terms.' },
      { key: 'Confirm preparation', value: 'Excavation, base depth, compaction, edge restraint, drainage, and finish details should be documented for the site.' },
      { key: 'Check approvals', value: 'Permit, engineering, utility, setback, and association requirements depend on the property and project.' },
    ],
    faqs: [
      ...sharedFaqs,
      { question: 'Do you build retaining walls?', answer: 'Outright Landscape considers retaining-wall projects based on site conditions, design, access, and any engineering or permit requirements.' },
      { question: 'How long does paver installation take?', answer: 'Timing depends on demolition, access, excavation, base preparation, pattern, drainage, project size, and current scheduling.' },
    ],
    guideSlugs: ['pavers-vs-stamped-concrete', 'hiring-licensed-landscape-contractor'],
  },
  {
    slug: 'irrigation',
    serviceName: 'Irrigation & Sprinklers',
    title: 'Irrigation & Sprinkler Services in the San Gabriel Valley | Outright Landscape',
    description:
      'Sprinkler diagnosis and repair, irrigation installation, valves, drip systems, and controller upgrades in the San Gabriel Valley. CSLB #1073845.',
    lead:
      'Outright Landscape diagnoses and works on residential and commercial irrigation systems throughout the San Gabriel Valley. Service availability is confirmed by phone.',
    updatedAt: UPDATED_AT,
    howToChoose: [
      { key: 'Diagnose before replacing', value: 'Check pressure, coverage, valves, wiring, pipe condition, heads, controller settings, and leak history before choosing a repair or replacement.' },
      { key: 'Match equipment to the site', value: 'Zone layout, plant type, slope, soil, pressure, and existing components affect equipment selection.' },
      { key: 'Review local requirements', value: 'Water schedules and rebate programs can change. Confirm current rules with the local water provider.' },
    ],
    faqs: [
      ...sharedFaqs,
      { question: 'What are signs an irrigation system needs service?', answer: 'Dry or oversaturated areas, visible leaks, unusual water use, heads that do not operate correctly, and zones that stay on or fail to start can justify an inspection.' },
      { question: 'Should I repair or replace my irrigation system?', answer: 'The decision depends on pipe and valve condition, coverage, compatibility, repair history, renovation plans, and the estimated cost of each option.' },
    ],
    guideSlugs: ['sprinkler-repair-vs-replacement', 'landscaping-cost-san-gabriel-valley'],
  },
  {
    slug: 'outdoor-living',
    serviceName: 'Outdoor Living',
    title: 'Outdoor Living Construction in Covina | Outright Landscape',
    description:
      'Outdoor kitchens, fire features, pergolas, seating areas, lighting, and coordinated landscape construction in Covina and the San Gabriel Valley.',
    lead:
      'Outright Landscape plans outdoor-living projects around the property, intended use, selected materials, utilities, drainage, access, and applicable approvals.',
    updatedAt: UPDATED_AT,
    howToChoose: [
      { key: 'Start with use', value: 'Define seating, cooking, shade, lighting, circulation, storage, and maintenance needs before selecting features.' },
      { key: 'Coordinate systems', value: 'Plan utilities, drainage, irrigation, footings, hardscape, planting, and lighting as one sequence.' },
      { key: 'Document the scope', value: 'Confirm materials, appliances, allowances, utility work, permits, cleanup, and exclusions in writing.' },
    ],
    faqs: [
      ...sharedFaqs,
      { question: 'Which outdoor-living features do you build?', answer: 'Projects may include patios, seating walls, pergolas, fire features, outdoor kitchens, landscape lighting, planting, and irrigation. Feasibility is confirmed during the estimate.' },
      { question: 'Will my project need a permit?', answer: 'Requirements vary by city, property, structure, utilities, and scope. Confirm applicable requirements with the local authority before construction.' },
    ],
    guideSlugs: ['pavers-vs-stamped-concrete', 'hiring-licensed-landscape-contractor'],
  },
];

export const BUYER_GUIDES = [
  {
    slug: 'pavers-vs-stamped-concrete',
    title: 'Pavers vs. stamped concrete: what to compare',
    description: 'Compare pavers and stamped concrete by appearance, repairability, maintenance, preparation, drainage, and project-specific cost.',
    updatedAt: UPDATED_AT,
    intro: 'Both materials can create durable outdoor surfaces when the design, preparation, installation, and maintenance fit the site.',
    sections: [
      { heading: 'Material and appearance', paragraphs: ['Pavers use individual units in selected colors and patterns. Stamped concrete is a continuous slab with a patterned and colored finish. Samples help compare the finished appearance.'] },
      { heading: 'Preparation and drainage', paragraphs: ['The written scope should describe demolition, excavation, base or subgrade preparation, compaction, slope, drainage, edges, joints, and finish details.'] },
      { heading: 'Repairs and maintenance', paragraphs: ['Individual pavers can often be lifted for access or replacement. Concrete repairs may remain visible. Cleaning, sealing, movement, staining, and manufacturer terms vary by product and installation.'] },
    ],
    faqs: [{ question: 'Which option costs less?', answer: `Installed cost depends on the site, preparation, material, pattern, access, and scope. ${CONTACT}` }],
    relatedServiceSlugs: ['hardscaping', 'outdoor-living'],
  },
  {
    slug: 'best-sod-san-gabriel-valley',
    title: 'How to choose sod for a San Gabriel Valley yard',
    description: 'Choose turf based on sunlight, traffic, appearance, maintenance, irrigation, and current local watering requirements.',
    updatedAt: UPDATED_AT,
    intro: 'There is no single best turf for every property. Match the variety and installation plan to the actual yard conditions.',
    sections: [
      { heading: 'Sun and traffic', paragraphs: ['Measure daily sunlight and consider pets, play, walking paths, and seasonal dormancy preferences before choosing a variety.'] },
      { heading: 'Soil and irrigation', paragraphs: ['Correct drainage, prepare the soil, verify irrigation coverage, and plan watering according to supplier guidance and current local rules.'] },
      { heading: 'Ongoing care', paragraphs: ['Compare mowing height, fertilization, repair, pest, disease, and seasonal appearance requirements before installation.'] },
    ],
    faqs: [{ question: 'Can you recommend a turf variety?', answer: 'Yes. A site visit can evaluate sunlight, soil, drainage, irrigation, use, and appearance preferences before a recommendation.' }],
    relatedServiceSlugs: ['landscaping', 'irrigation'],
  },
  {
    slug: 'sprinkler-repair-vs-replacement',
    title: 'Sprinkler repair vs. replacement: a practical checklist',
    description: 'Evaluate pipe condition, coverage, compatibility, leak history, repair frequency, and renovation plans before deciding.',
    updatedAt: UPDATED_AT,
    intro: 'A diagnosis is more useful than an age cutoff alone. Some systems need one component repaired; others have broader design or condition problems.',
    sections: [
      { heading: 'When targeted repair may fit', paragraphs: ['A repair may be practical when the fault is isolated, the remaining components are compatible and serviceable, and coverage is otherwise acceptable.'] },
      { heading: 'When broader work may fit', paragraphs: ['Replacement may be worth comparing when leaks are widespread, coverage is poor, components are incompatible, or the yard is already being renovated.'] },
      { heading: 'What an estimate should show', paragraphs: ['Ask for the diagnosis, proposed parts, affected zones, exclusions, schedule, and any applicable workmanship or manufacturer terms in writing.'] },
    ],
    faqs: [{ question: 'How much will repair or replacement cost?', answer: `Cost depends on diagnosis, access, parts, zones, pipe condition, controller, and scope. ${CONTACT}` }],
    relatedServiceSlugs: ['irrigation', 'landscaping'],
  },
  {
    slug: 'landscaping-cost-san-gabriel-valley',
    title: 'What affects landscaping cost in the San Gabriel Valley?',
    description: 'Understand how design, demolition, access, preparation, materials, drainage, utilities, permits, and scope affect a landscape estimate.',
    updatedAt: UPDATED_AT,
    intro: 'A useful estimate is based on the property and a defined scope, not a generic price range.',
    sections: [
      { heading: 'Site and preparation', paragraphs: ['Access, demolition, disposal, grading, drainage, soil, utilities, and existing conditions can materially affect labor and equipment needs.'] },
      { heading: 'Materials and quantities', paragraphs: ['Material selection, measured quantities, pattern, finish, availability, delivery, and waste allowances should be clear in the proposal.'] },
      { heading: 'Scope and approvals', paragraphs: ['Design, engineering, permits, inspections, irrigation, lighting, planting, cleanup, and change-order handling can affect the final cost and schedule.'] },
    ],
    faqs: [{ question: 'How can I compare estimates?', answer: 'Compare the same scope, quantities, materials, preparation, exclusions, schedule, payment terms, and applicable documentation—not only the total price.' }],
    relatedServiceSlugs: ['landscaping', 'hardscaping', 'irrigation'],
  },
  {
    slug: 'hiring-licensed-landscape-contractor',
    title: 'How to check a California landscape contractor',
    description: 'A practical checklist for checking license status, written scope, references, documentation, permits, payments, and changes.',
    updatedAt: UPDATED_AT,
    intro: 'Rules and license records can change. Use the CSLB and local authorities as the primary sources for current requirements.',
    sections: [
      { heading: 'Verify the license', paragraphs: ['Search the contractor license number on the official CSLB website and review the current status, classification, personnel, bond, and workers-compensation information shown there.'] },
      { heading: 'Review the written proposal', paragraphs: ['Confirm scope, materials, quantities, preparation, schedule, payment terms, permits, cleanup, exclusions, and change-order procedures before work begins.'] },
      { heading: 'Request applicable documents', paragraphs: ['Ask for current insurance or bond documentation when relevant, recent references, permits, and written workmanship or manufacturer terms for the project.'] },
    ],
    faqs: [{ question: 'How do I verify CSLB #1073845?', answer: 'Use the official license-search tool at cslb.ca.gov. The official record—not marketing copy—is the source for current status.' }],
    relatedServiceSlugs: ['landscaping', 'hardscaping', 'irrigation'],
  },
];

export const SERVICE_HUB_PATHS = SERVICE_HUBS.map((hub) => `/s/${hub.slug}`);
export const BUYER_GUIDE_PATHS = BUYER_GUIDES.map((guide) => `/guides/${guide.slug}`);

export function getServiceHubBySlug(slug) {
  return SERVICE_HUBS.find((hub) => hub.slug === slug) || null;
}

export function getGuideBySlug(slug) {
  return BUYER_GUIDES.find((guide) => guide.slug === slug) || null;
}
