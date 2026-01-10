// Content configurations for all irrigation service pages

export const getPageData = (city, service) => {
    const cityName = city.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    const serviceConfigs = {
        'sprinkler-repair': {
            serviceDisplay: 'Sprinkler Repair',
            h1: `Expert Sprinkler Repair in ${cityName}, CA`,
            heroSubhead: `Fast, professional sprinkler repair and sprinkler system repair services in ${cityName}. We fix leaks, broken heads, valve issues, and controller problems. Call today for same-day irrigation repair service.`,
            issuesTitle: 'Common Sprinkler Problems We Fix Fast',
            commonIssues: [
                {
                    title: 'Sprinkler Leak Repair',
                    description: 'Leaking heads, broken pipes, and underground line breaks causing water waste and damage.'
                },
                {
                    title: 'Broken Sprinkler Heads',
                    description: 'Damaged, clogged, or misaligned sprinkler heads affecting coverage and efficiency.'
                },
                {
                    title: 'Sprinkler Valve Repair',
                    description: 'Stuck valves, valve leaks, and irrigation valve repair for zones that won\'t turn on or off.'
                },
                {
                    title: 'Controller & Timer Issues',
                    description: 'Sprinkler controller repair and sprinkler timer repair for programming and electrical problems.'
                },
                {
                    title: 'Low Water Pressure',
                    description: 'Pressure regulation issues affecting sprinkler performance and coverage.'
                },
                {
                    title: 'Zone Malfunctions',
                    description: 'Individual zones not activating or running continuously.'
                }
            ],
            whatWeFixCategories: [
                {
                    title: 'Sprinkler System Components',
                    items: [
                        'Sprinkler head replacement and adjustment',
                        'Sprinkler valve replacement and repair',
                        'Irrigation valve repair for all zones',
                        'Broken pipe and fitting repairs',
                        'Sprinkler leak repair and detection',
                        'Backflow preventer service'
                    ]
                },
                {
                    title: 'Controllers & Electrical',
                    items: [
                        'Sprinkler controller repair and replacement',
                        'Sprinkler timer repair and programming',
                        'Wiring and solenoid troubleshooting',
                        'Rain sensor installation and repair',
                        'Smart controller upgrades',
                        'Power supply diagnostics'
                    ]
                }
            ],
            process: [
                {
                    title: 'System Diagnosis',
                    description: 'Thorough inspection to identify all sprinkler system issues.'
                },
                {
                    title: 'Detailed Estimate',
                    description: 'Upfront pricing for sprinkler repair with no hidden fees.'
                },
                {
                    title: 'Expert Repair',
                    description: 'Professional sprinkler system repair using quality parts.'
                },
                {
                    title: 'System Testing',
                    description: 'Full system test to ensure proper operation and coverage.'
                }
            ],
            specializedSection: {
                title: 'Sprinkler Valve & Controller Expertise',
                intro: `Our sprinkler valve repair and irrigation valve repair services in ${cityName} address the most common causes of system failure. From stuck valves to complete valve replacement, we handle all sprinkler valve issues.`,
                highlights: [
                    {
                        title: 'Valve Replacement & Repair',
                        description: 'Complete sprinkler valve replacement or repair for zones that leak, won\'t shut off, or fail to activate.'
                    },
                    {
                        title: 'Controller Diagnostics',
                        description: 'Sprinkler controller repair and timer troubleshooting to restore automated watering schedules.'
                    },
                    {
                        title: 'Leak Detection',
                        description: 'Advanced sprinkler leak repair techniques to locate and fix underground leaks quickly.'
                    },
                    {
                        title: 'System Optimization',
                        description: 'Adjust timing, pressure, and coverage for efficient water use and healthy landscaping.'
                    }
                ]
            },
            faqs: [
                {
                    q: `How much does sprinkler repair cost in ${cityName}?`,
                    a: `Sprinkler repair costs vary based on the issue. Simple sprinkler head replacement starts around $75-$150, while sprinkler valve replacement or irrigation valve repair typically ranges $150-$400 per valve. Sprinkler controller repair or replacement ranges $200-$800. We provide free estimates for all sprinkler system repair in ${cityName}.`
                },
                {
                    q: 'How long does sprinkler repair take?',
                    a: 'Most sprinkler repairs in La Verne, San Dimas, and Glendora are completed in 2-4 hours. Sprinkler leak repair and valve replacement can often be done same-day. More extensive sprinkler system repairs may require a return visit.'
                },
                {
                    q: 'Do you offer same-day sprinkler repair service?',
                    a: `Yes! We prioritize emergency sprinkler leak repair and irrigation repair requests in ${cityName}. Call before noon and we'll typically schedule same-day service for urgent repairs.`
                },
                {
                    q: 'What brands of sprinkler controllers and valves do you service?',
                    a: 'We repair and service all major brands including Rain Bird, Hunter, Toro, Irritrol, Orbit, and more. We stock quality replacement parts for fast sprinkler valve repair and controller replacement.'
                },
                {
                    q: 'How do I know if I need sprinkler valve replacement or just repair?',
                    a: 'Our technicians will inspect your irrigation valves and recommend repair or replacement based on condition, age, and cost-effectiveness. Sprinkler valve replacement is typically needed for valves that are cracked, heavily corroded, or repeatedly failing.'
                },
                {
                    q: 'Is sprinkler leak repair covered by homeowners insurance?',
                    a: 'It depends on your policy and the cause of the leak. We provide detailed documentation for insurance claims. Many homeowners find that prompt sprinkler leak repair prevents costly water damage that would exceed deductibles.'
                },
                {
                    q: `Do you service drip irrigation systems in ${cityName}?`,
                    a: 'Yes, we also specialize in drip irrigation repair including clogged emitters, pressure issues, and filter cleaning. We service all types of irrigation systems throughout La Verne, San Dimas, and Glendora.'
                }
            ]
        },
        'irrigation-repair': {
            serviceDisplay: 'Irrigation Repair',
            h1: `Professional Irrigation Repair in ${cityName}, CA`,
            heroSubhead: `Complete irrigation system repair services in ${cityName}. From irrigation valve repair to controller troubleshooting, we fix all irrigation problems. Licensed C-27 contractor serving La Verne, San Dimas, and Glendora.`,
            issuesTitle: 'Irrigation Problems We Diagnose & Fix',
            commonIssues: [
                {
                    title: 'Irrigation Valve Issues',
                    description: 'Irrigation valve repair for stuck, leaking, or non-functioning zone valves affecting system operation.'
                },
                {
                    title: 'System Leaks',
                    description: 'Underground line breaks, fitting failures, and irrigation leak detection and repair.'
                },
                {
                    title: 'Drip System Failures',
                    description: 'Drip irrigation repair for clogged emitters, broken tubing, and pressure problems.'
                },
                {
                    title: 'Controller Malfunctions',
                    description: 'Irrigation controller programming, wiring issues, and electrical troubleshooting.'
                },
                {
                    title: 'Pressure Problems',
                    description: 'Low pressure, high pressure, and water flow issues affecting irrigation performance.'
                },
                {
                    title: 'Coverage Gaps',
                    description: 'Poor water distribution, dry spots, and uneven irrigation coverage.'
                }
            ],
            whatWeFixCategories: [
                {
                    title: 'Irrigation System Repairs',
                    items: [
                        'Irrigation valve repair and replacement',
                        'Sprinkler system repair and maintenance',
                        'Drip irrigation repair and upgrades',
                        'Underground line repair and replacement',
                        'Backflow testing and repair',
                        'Mainline and lateral line repairs'
                    ]
                },
                {
                    title: 'Controls & Components',
                    items: [
                        'Irrigation controller repair and upgrade',
                        'Zone valve diagnostics and replacement',
                        'Wiring and electrical repairs',
                        'Flow sensor installation and repair',
                        'Pump station service',
                        'Rain and moisture sensor integration'
                    ]
                }
            ],
            process: [
                {
                    title: 'Complete Assessment',
                    description: 'Full irrigation system inspection and pressure testing.'
                },
                {
                    title: 'Repair Plan',
                    description: 'Detailed explanation of needed irrigation repairs and costs.'
                },
                {
                    title: 'Professional Service',
                    description: 'Licensed irrigation repair using commercial-grade parts.'
                },
                {
                    title: 'System Validation',
                    description: 'Thorough testing and adjustment for optimal performance.'
                }
            ],
            specializedSection: {
                title: 'Complete Irrigation System Expertise',
                intro: `Our irrigation repair services in ${cityName} cover everything from simple irrigation valve repair to complex system overhauls. We service all irrigation types including traditional sprinklers, drip systems, and smart controllers.`,
                highlights: [
                    {
                        title: 'Valve & Zone Repair',
                        description: 'Expert irrigation valve repair for all brands. We diagnose solenoid issues, valve diaphragm failures, and replace defective irrigation valves.'
                    },
                    {
                        title: 'Drip System Service',
                        description: 'Specialized drip irrigation repair including emitter cleaning, pressure regulation, filter maintenance, and tubing replacement.'
                    },
                    {
                        title: 'Controller Solutions',
                        description: 'Irrigation controller repair, programming, and smart upgrade options for water-efficient automation.'
                    },
                    {
                        title: 'Water Management',
                        description: 'System optimization for water conservation and landscape health throughout La Verne, San Dimas, and Glendora.'
                    }
                ]
            },
            faqs: [
                {
                    q: `What is the average cost of irrigation repair in ${cityName}?`,
                    a: `Irrigation repair costs vary widely based on the specific issue. Irrigation valve repair typically costs $150-$400 per valve, while controller replacement ranges $200-$800. Drip irrigation repair averages $150-$350. Underground line repairs can range $250-$1500 depending on extent. We provide free estimates for all irrigation repair services in ${cityName}.`
                },
                {
                    q: 'How do you locate irrigation leaks?',
                    a: 'We use professional leak detection methods including pressure testing, visual inspection, and electronic leak detection equipment to pinpoint irrigation leaks without unnecessary excavation.'
                },
                {
                    q: 'Can you repair old irrigation systems?',
                    a: `Yes, we repair irrigation systems of all ages in ${cityName}. However, if your system is 15+ years old with multiple failures, we'll provide honest recommendations about repair vs. replacement options.`
                },
                {
                    q: 'Do you service commercial irrigation systems?',
                    a: 'Absolutely. We provide commercial irrigation repair for businesses, HOAs, and property managers throughout La Verne, San Dimas, and Glendora. We offer maintenance contracts for ongoing service.'
                },
                {
                    q: 'How often should irrigation systems be serviced?',
                    a: 'We recommend professional irrigation system inspection and maintenance at least twice per year - in spring before peak season and in fall before winter. Regular service prevents costly emergency irrigation repairs.'
                },
                {
                    q: 'What causes irrigation valves to fail?',
                    a: 'Common irrigation valve failures result from debris in the diaphragm, solenoid electrical problems, physical damage, or normal wear after 10-15 years. Our irrigation valve repair services address all these issues.'
                },
                {
                    q: 'Do you offer warranties on irrigation repairs?',
                    a: 'Yes, all irrigation repair work includes a warranty on both labor and parts. Specific warranty terms depend on the type of repair and parts used.'
                }
            ]
        },
        'sprinkler-valves': {
            serviceDisplay: 'Sprinkler Valve Service',
            h1: `Sprinkler Valve Replacement & Repair in ${cityName}, CA`,
            heroSubhead: `Expert sprinkler valve replacement and irrigation valve repair in ${cityName}. We fix stuck valves, valve leaks, and zone control issues. Fast, reliable sprinkler valve repair for homes and businesses in La Verne, San Dimas, and Glendora.`,
            issuesTitle: 'Sprinkler Valve Problems We Solve',
            commonIssues: [
                {
                    title: 'Stuck or Leaking Valves',
                    description: 'Valves that won\'t open, won\'t close, or continuously leak requiring sprinkler valve repair or replacement.'
                },
                {
                    title: 'Zone Won\'t Activate',
                    description: 'Irrigation valve repair for zones that fail to turn on due to solenoid or diaphragm failure.'
                },
                {
                    title: 'Valve Box Water Pooling',
                    description: 'Standing water in valve boxes indicating sprinkler valve leaks or drainage issues.'
                },
                {
                    title: 'Low Zone Pressure',
                    description: 'Reduced water pressure in specific zones due to partially stuck valves or debris.'
                },
                {
                    title: 'Multiple Zone Operation',
                    description: 'Multiple zones running simultaneously indicating valve control problems.'
                },
                {
                    title: 'Corroded or Damaged Valves',
                    description: 'Old, corroded valves requiring complete sprinkler valve replacement.'
                }
            ],
            whatWeFixCategories: [
                {
                    title: 'Valve Repair Services',
                    items: [
                        'Sprinkler valve replacement (all brands)',
                        'Irrigation valve repair and rebuilding',
                        'Solenoid replacement and testing',
                        'Diaphragm and seal replacement',
                        'Valve box repair and replacement',
                        'Valve wiring and electrical repair'
                    ]
                },
                {
                    title: 'Valve System Upgrades',
                    items: [
                        'Add new zone valves for expansion',
                        'Upgrade to pressure-regulating valves',
                        'Install master valve systems',
                        'Add manual shut-off valves',
                        'Valve manifold reorganization',
                        'Anti-siphon valve installation'
                    ]
                }
            ],
            process: [
                {
                    title: 'Valve Inspection',
                    description: 'Locate and assess all irrigation valves and valve boxes.'
                },
                {
                    title: 'Problem Diagnosis',
                    description: 'Test solenoids, check water flow, identify valve failures.'
                },
                {
                    title: 'Repair or Replace',
                    description: 'Professional sprinkler valve replacement or repair as needed.'
                },
                {
                    title: 'Zone Testing',
                    description: 'Verify all zones operate correctly with proper pressure.'
                }
            ],
            specializedSection: {
                title: 'Expert Sprinkler Valve & Irrigation Valve Repair',
                intro: `Sprinkler valve problems are among the most common irrigation issues in ${cityName}. Our specialized irrigation valve repair services diagnose and fix all valve-related problems quickly and affordably.`,
                highlights: [
                    {
                        title: 'All Valve Brands',
                        description: 'We service and replace all major brands: Rain Bird, Hunter, Irritrol, Toro, Orbit, and more. Quality sprinkler valve replacement with commercial-grade parts.'
                    },
                    {
                        title: 'Solenoid Experts',
                        description: 'Diagnose electrical problems, test solenoid function, and replace faulty solenoids for irrigation valve repair.'
                    },
                    {
                        title: 'Valve Rebuilding',
                        description: 'Often valves can be rebuilt instead of replaced. We replace diaphragms, seals, and internal components for cost-effective sprinkler valve repair.'
                    },
                    {
                        title: 'Valve Box Service',
                        description: 'Repair or replace damaged valve boxes, improve drainage, and ensure easy access for future maintenance.'
                    }
                ]
            },
            faqs: [
                {
                    q: `How much does sprinkler valve replacement cost in ${cityName}?`,
                    a: `Sprinkler valve replacement typically costs $150-$400 per valve in ${cityName}, depending on valve type, location, and access difficulty. Irrigation valve repair (rebuilding existing valves) costs $100-$250 per valve. We provide free estimates for all sprinkler valve services.`
                },
                {
                    q: 'How long do sprinkler valves last?',
                    a: 'Quality sprinkler valves typically last 10-15 years with proper maintenance. However, valves in high-use zones or exposed to debris may require sprinkler valve repair or replacement sooner.'
                },
                {
                    q: 'Can you repair valves instead of replacing them?',
                    a: 'Yes, often irrigation valve repair is possible by replacing internal components like diaphragms, seals, or solenoids. We assess each valve and recommend the most cost-effective solution - repair vs. complete sprinkler valve replacement.'
                },
                {
                    q: 'How do I know which valve controls which zone?',
                    a: 'During our service, we identify and can label all valves by zone. This makes future irrigation valve repair or adjustments much easier for you and any future service providers.'
                },
                {
                    q: 'What causes sprinkler valves to stick open?',
                    a: 'Stuck-open valves usually result from debris caught in the diaphragm, worn seals, or damaged solenoids. Our sprinkler valve repair services clean debris, replace worn parts, or install new valves as needed.'
                },
                {
                    q: 'Do you install new valves for system expansion?',
                    a: `Yes, we install new sprinkler valves for adding zones, expanding coverage, or upgrading to separate irrigation valve control in ${cityName}. This is common when adding drip irrigation to existing sprinkler systems.`
                },
                {
                    q: 'What is a master valve and do I need one?',
                    a: 'A master valve shuts off water to the entire irrigation system when no zones are active, providing extra protection against leaks. We recommend master valve installation for systems in areas prone to valve failures or for added water conservation.'
                }
            ]
        },
        'drip-irrigation': {
            serviceDisplay: 'Drip Irrigation Service',
            h1: `Drip Irrigation Repair & Installation in ${cityName}, CA`,
            heroSubhead: `Professional drip irrigation repair and maintenance in ${cityName}. We fix clogged emitters, pressure problems, and leaking lines. Expert drip system service for efficient watering in La Verne, San Dimas, and Glendora.`,
            issuesTitle: 'Common Drip Irrigation Problems',
            commonIssues: [
                {
                    title: 'Clogged Emitters',
                    description: 'Plugged drip emitters from mineral deposits or debris reducing water flow to plants.'
                },
                {
                    title: 'Pressure Issues',
                    description: 'Low or inconsistent pressure affecting drip irrigation performance and coverage.'
                },
                {
                    title: 'Line Breaks & Leaks',
                    description: 'Damaged drip tubing from landscaping work, animal damage, or UV degradation.'
                },
                {
                    title: 'Filter Problems',
                    description: 'Dirty or damaged filters reducing system efficiency and causing emitter clogging.'
                },
                {
                    title: 'Uneven Watering',
                    description: 'Some plants getting too much or too little water due to system imbalance.'
                },
                {
                    title: 'Zone Control Issues',
                    description: 'Drip zones not activating or running too long due to valve or controller problems.'
                }
            ],
            whatWeFixCategories: [
                {
                    title: 'Drip System Repairs',
                    items: [
                        'Drip irrigation repair for all system types',
                        'Emitter cleaning and replacement',
                        'Drip line repair and replacement',
                        'Filter cleaning and replacement',
                        'Pressure regulator service',
                        'Flush valve installation and repair'
                    ]
                },
                {
                    title: 'Drip System Upgrades',
                    items: [
                        'Convert sprinkler zones to drip irrigation',
                        'Add drip to garden beds and planters',
                        'Install micro-spray for groundcover',
                        'Pressure-compensating emitter upgrades',
                        'Automated drip zone control',
                        'Drip system expansion'
                    ]
                }
            ],
            process: [
                {
                    title: 'System Evaluation',
                    description: 'Inspect drip lines, emitters, filters, and pressure.'
                },
                {
                    title: 'Problem Identification',
                    description: 'Diagnose clogs, leaks, and pressure issues.'
                },
                {
                    title: 'Repair & Clean',
                    description: 'Professional drip irrigation repair and maintenance.'
                },
                {
                    title: 'Performance Check',
                    description: 'Verify proper flow rates and even water distribution.'
                }
            ],
            specializedSection: {
                title: 'Specialized Drip Irrigation Repair & Maintenance',
                intro: `Drip irrigation systems are the most water-efficient option but require regular maintenance. Our drip irrigation repair services in ${cityName} keep your system running efficiently and your plants healthy.`,
                highlights: [
                    {
                        title: 'Emitter Service',
                        description: 'Clean or replace clogged drip emitters. We stock all types: in-line, pressure-compensating, adjustable, and micro-spray emitters for complete drip irrigation repair.'
                    },
                    {
                        title: 'Pressure Management',
                        description: 'Install and service pressure regulators to maintain optimal 15-30 PSI for drip systems. Prevent emitter damage and ensure even water distribution.'
                    },
                    {
                        title: 'Filter Maintenance',
                        description: 'Regular filter cleaning prevents emitter clogging. We service disc filters, screen filters, and add filtration where missing.'
                    },
                    {
                        title: 'System Optimization',
                        description: 'Balance zone run times, adjust emitter output, and add new drip lines for complete coverage of gardens, planters, and landscape beds.'
                    }
                ]
            },
            faqs: [
                {
                    q: `How much does drip irrigation repair cost in ${cityName}?`,
                    a: `Drip irrigation repair costs typically range $150-$400 depending on the extent of work. Simple emitter replacement and filter cleaning may cost $100-$200, while extensive drip line repair or pressure regulator replacement costs $250-$500. We provide free estimates for all drip irrigation services in ${cityName}.`
                },
                {
                    q: 'How often should drip systems be serviced?',
                    a: 'Drip irrigation systems should be inspected and serviced at least twice yearly - in spring and fall. Filters should be cleaned monthly during active growing season to prevent emitter clogging and ensure efficient drip irrigation repair needs are minimal.'
                },
                {
                    q: 'Why are my drip emitters clogged?',
                    a: 'Emitter clogging typically results from mineral deposits, algae growth, or debris in the water supply. Installing proper filtration and regular drip irrigation repair maintenance prevents most clogging issues in La Verne, San Dimas, and Glendora.'
                },
                {
                    q: 'Can you convert my sprinklers to drip irrigation?',
                    a: `Yes, converting sprinkler zones to drip irrigation is one of our specialties. Drip systems use 30-50% less water than sprinklers and are ideal for gardens, shrubs, and trees throughout ${cityName}.`
                },
                {
                    q: 'What PSI should drip irrigation run at?',
                    a: 'Most drip irrigation systems operate best at 15-30 PSI. We install pressure regulators during drip irrigation repair or installation to maintain optimal pressure and prevent emitter damage.'
                },
                {
                    q: 'How long do drip lines last?',
                    a: 'Buried drip lines last 10-15 years, while above-ground drip tubing exposed to UV may need replacement every 5-7 years. Regular drip irrigation repair and maintenance extends system life.'
                },
                {
                    q: 'Do drip systems work with my existing controller?',
                    a: 'Yes, drip zones integrate with most irrigation controllers. However, drip zones typically require longer run times (45-90 minutes) than sprinkler zones due to slower water application. We can adjust programming during drip irrigation repair service.'
                }
            ]
        }
    };

    return serviceConfigs[service];
};