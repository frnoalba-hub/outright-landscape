import { Sprout, Droplets, Hammer, Award, CheckCircle2 } from "lucide-react";

const generateMapUrl = (lat, lng, query) => 
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(query)}!5e0!3m2!1sen!2sus!4v1600000000000`;

export const locations = [
  {
    slug: 'covina',
    name: 'Covina',
    intro: 'When it comes to landscaping in Covina, residents trust Outright Landscape Construction for professional, reliable service. Nestled in the heart of the San Gabriel Valley, we understand the local climate and soil, allowing us to create stunning and sustainable outdoor spaces. From intricate paver patios and driveways to lush new sod installations and water-wise irrigation systems, our licensed and insured team handles it all. We specialize in full-scale projects, including demolition and hauling of old concrete or turf. As a local, family-run crew, we pride ourselves on clear communication and leaving every job site immaculate. We offer fast scheduling for free, detailed estimates. Let us transform your Covina property into the oasis you’ve always dreamed of.',
    geo: { latitude: 34.090, longitude: -117.890 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52897.86491153885!2d-117.92447656776185!3d34.08869708393065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2dae3d1d4f715%3A0x2f9d5d33a33e5b8e!2sCovina%2C%20CA!5e0!3m2!1sen!2sus!4v1716934456404!5m2!1sen!2sus",
    services: [
      {
        iconName: "Sprout",
        title: "Turf Installation in Covina",
        description: "Premium Marathon tall fescue and Bermuda grass varieties for lush, healthy lawns that thrive in Covina's climate.",
        keywords: "sod installation, turf installation, lawn installation"
      },
      {
        iconName: "Droplets",
        title: "Irrigation Systems Covina",
        description: "Professional sprinkler and drip irrigation installation designed for water efficiency and optimal lawn health.",
        keywords: "irrigation, sprinkler systems, water management"
      },
      {
        iconName: "Hammer",
        title: "Hardscaping Experts Near Covina",
        description: "Expert paver patios, walkways, retaining walls, and outdoor living spaces built to last.",
        keywords: "hardscaping, pavers, patios, walkways"
      },
      {
        iconName: "Award",
        title: "Landscape Design Covina",
        description: "Complete landscape design and construction services from concept to completion.",
        keywords: "landscape design, landscape construction, yard makeover"
      }
    ],
    projects: [
      {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
        title: "Premium Sod Installation",
        description: "Lush lawn transformation in Covina",
        alt: "Outright Landscape – Premium Sod Installation in Covina"
      },
      {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/37a148223_2025-05-288.jpg",
        title: "Complete Backyard Makeover",
        description: "Full landscape renovation with fresh turf",
        alt: "Outright Landscape – Complete Backyard Makeover in Covina"
      },
      {
        image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg",
        title: "Irrigation System Installation",
        description: "Custom sprinkler system for optimal coverage",
        alt: "Outright Landscape – Irrigation System in Covina"
      }
    ],
    faqs: [
        { q: 'Do you offer free estimates in Covina?', a: 'Yes, absolutely. We provide fast, free, and detailed estimates for all landscaping projects in Covina, typically within 24-48 hours of your request.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, our services include complete demolition and hauling. We can safely remove and dispose of old turf, failing retaining walls, and cracked concrete patios.' },
        { q: 'How long does a typical project take?', a: 'Project timelines vary. A small cleanup or planting job might take 1-3 days. A larger hardscape installation with pavers and irrigation could take 1-2 weeks.' },
        { q: 'Do you warranty your work?', a: 'We do. We stand by our workmanship and use high-quality materials. Many products, like pavers, also come with manufacturer warranties that we pass on to you.' },
    ],
    projects: [
        {
            title: "Premium Turf Installation",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
            alt: "Premium Turf Installation - Outright Landscape Covina"
        },
        {
            title: "Front Yard Landscaping",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/37a148223_2025-05-288.jpg",
            alt: "Front Yard Landscaping - Outright Landscape Covina"
        },
        {
            title: "Paver Walkway & Sod",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
            alt: "Paver Walkway and Sod Installation Covina"
        }
    ]
  },
  {
    slug: 'west-covina',
    name: 'West Covina',
    intro: 'Outright Landscape Construction is the trusted choice for landscaping in West Covina. Our team is deeply familiar with the diverse neighborhoods and architectural styles, from modern homes to classic ranch houses. We deliver beautiful, functional outdoor living spaces tailored to your needs. Popular projects in West Covina include durable paver walkways, vibrant turf installations, and efficient irrigation system upgrades. As a licensed, insured, and local San Gabriel Valley company, we guarantee professional results on every job, big or small. We handle all demo and cleanup, ensuring a smooth process from start to finish. Contact us for a fast, free quote and experience our commitment to quality.',
    geo: { latitude: 34.068, longitude: -117.939 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52906.67709268944!2d-117.97870474738552!3d34.06563325317777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d7e3a8a0e96d%3A0x49666339318d666!2sWest%20Covina%2C%20CA!5e0!3m2!1sen!2sus!4v1716934502123!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in West Covina?', a: 'Yes, we provide free, no-obligation estimates for all landscaping work in West Covina. We can typically schedule a visit within a day or two.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, our services include complete demolition and hauling of old turf, concrete, and debris.' },
        { q: 'How long does a typical project take?', a: 'Timelines vary by scope. Simple cleanups take 1-3 days, while major hardscaping projects may take 1-2 weeks.' },
        { q: 'Do you warranty your work?', a: 'Yes, we provide comprehensive warranties on our workmanship and honor all manufacturer guarantees on materials.' },
    ],
    projects: [
        {
            title: "Irrigation Trenching",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/6633fbff6_2025-05-286.jpg",
            alt: "Irrigation Trenching - Outright Landscape West Covina"
        },
        {
             title: "Complete Backyard Makeover",
             image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cdeefde95_2024-09-14.jpg",
             alt: "Complete Backyard Makeover West Covina"
        },
        {
             title: "Sod Installation",
             image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/022683aad_2025-05-283.jpg",
             alt: "Sod Installation West Covina"
        }
    ]
  },
  {
    slug: 'glendora',
    name: 'Glendora',
    intro: 'For homeowners seeking exceptional landscaping in Glendora, Outright Landscape Construction offers top-tier design and installation services. Known for its beautiful foothills and proud community, Glendora properties deserve the best. We specialize in creating elegant hardscapes with pavers, installing lush, healthy sod, and designing smart irrigation solutions to keep your garden thriving. Our team is fully licensed (CSLB #1073845) and insured, providing peace of mind and professional quality. From initial demolition to the final cleanup, our local, family-run crew ensures a seamless experience and a pristine result. Schedule your free estimate today and let us enhance your Glendora home.',
    geo: { latitude: 34.136, longitude: -117.865 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52883.95843470933!2d-117.89909209904066!3d34.12478352234993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c328103d501905%3A0xb9335016665079a3!2sGlendora%2C%20CA!5e0!3m2!1sen!2sus!4v1716934536789!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Glendora?', a: 'Yes! We are happy to provide free, detailed estimates for landscaping projects in Glendora.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, we specialize in safe and efficient demolition and removal of old landscapes and concrete.' },
        { q: 'How long does a typical project take?', a: 'Most residential projects in Glendora are completed within 3-10 days, depending on complexity.' },
        { q: 'Do you warranty your work?', a: 'We stand behind our quality with solid workmanship warranties and material guarantees.' },
    ],
    projects: [
        {
            title: "Front Yard Driveway Pavers",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
            alt: "Front Yard Driveway Pavers - Outright Landscape Glendora"
        },
        {
            title: "Irrigation Trenching",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/954e6bafa_2024-09-04.jpg",
            alt: "Irrigation Trenching - Outright Landscape Glendora"
        },
        {
            title: "Turf Renovation",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
            alt: "Turf Renovation Glendora"
        }
    ]
  },
  {
    slug: 'azusa',
    name: 'Azusa',
    intro: 'Outright Landscape Construction is your go-to expert for landscaping in Azusa. We provide a full range of services to enhance your property’s curb appeal and functionality. Whether you need a complete yard cleanup, a new paver patio for entertaining, or a new lawn with an efficient sprinkler system, our team is ready to help. As a local, licensed, and insured contractor, we are committed to serving the Azusa community with integrity and skill. We manage every aspect of the project, including the initial demolition and removal of old materials. Contact us for a fast, free estimate and see why we are a top choice in the San Gabriel Valley.',
    geo: { latitude: 34.133, longitude: -117.907 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52886.03840708393!2d-117.9414479679147!3d34.11936914862424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c32642a3255555%3A0x8d2a930a3e1487e6!2sAzusa%2C%20CA!5e0!3m2!1sen!2sus!4v1716934565432!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Azusa?', a: 'Absolutely. We offer complimentary estimates for all landscaping services in Azusa.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, we provide complete demolition and site cleanup services.' },
        { q: 'Do you warranty your work?', a: 'Yes, we guarantee our workmanship and pass on all manufacturer warranties.' },
    ]
  },
  {
    slug: 'pasadena',
    name: 'Pasadena',
    intro: 'Transform your property with premier landscaping in Pasadena from Outright Landscape Construction. We bring expertise and artistry to every project, respecting the unique historical and modern architecture of the area. Our services range from elegant paver installations for patios and driveways to meticulous turf and garden planting. We also specialize in essential services like irrigation and drainage to protect your investment. As a fully licensed and insured company (CSLB #1073845), we provide a professional and worry-free experience. Our local team handles everything, from demolition to detailed cleanups. For a free, competitive quote on your Pasadena landscaping project, contact us today.',
    geo: { latitude: 34.147, longitude: -118.144 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105750.74141936754!2d-118.21916371140797!3d34.16423761237168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c2dc38330b51%3A0x52b4112cf3b81130!2sPasadena%2C%20CA!5e0!3m2!1sen!2sus!4v1716934601234!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Pasadena?', a: 'Yes, we provide free on-site consultations and detailed estimates throughout Pasadena.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, our team is equipped for full-service demolition and debris removal.' },
        { q: 'Do you warranty your work?', a: 'We provide comprehensive warranties on all our installations and services.' },
    ],
    projects: [
        {
            title: "Turf & Sprinkler System",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/cb31aa31a_467984156_586804077241478_5229306140253639953_n.jpg",
            alt: "Turf & Sprinkler System - Outright Landscape Pasadena"
        },
        {
            title: "Paver Patio Design",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
            alt: "Paver Patio Design Pasadena"
        },
        {
            title: "Drought Tolerant Garden",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg",
            alt: "Drought Tolerant Garden Pasadena"
        }
    ]
  },
  {
    slug: 'diamond-bar',
    name: 'Diamond Bar',
    intro: 'Enhance your home with expert landscaping in Diamond Bar from Outright Landscape Construction. We specialize in creating beautiful, high-quality outdoor environments that complement the scenic views and rolling hills of the area. Our popular services in Diamond Bar include custom paver patios, walkways, retaining walls, and vibrant, low-maintenance turf installations. As a licensed and insured contractor (CSLB #1073845), we are committed to excellence and customer satisfaction. Our professional crew manages all aspects of the job, including demolition and hauling, ensuring a clean and efficient project. Call us for a fast, free estimate to get started.',
    geo: { latitude: 34.028, longitude: -117.810 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52926.25872427952!2d-117.85270495459015!3d34.01661334120603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c32b4f77295555%3A0x7d436776c45670!2sDiamond%20Bar%2C%20CA!5e0!3m2!1sen!2sus!4v1716934634567!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Diamond Bar?', a: 'Yes, we provide free, comprehensive estimates for all our landscaping services.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, we handle all demolition and removal of old landscape materials.' },
        { q: 'Do you warranty your work?', a: 'Yes, we back our work with solid warranties and use premium materials.' },
    ],
    projects: [
        {
            title: "Sod & Drainage Installation",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/022683aad_2025-05-283.jpg",
            alt: "Sod & Drainage Installation - Outright Landscape Diamond Bar"
        },
        {
            title: "Retaining Wall Construction",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/670c050ff_2025-05-284.jpg",
            alt: "Retaining Wall Construction Diamond Bar"
        },
        {
            title: "Complete Lawn Renovation",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/bbdea4e3f_2025-05-281.jpg",
            alt: "Complete Lawn Renovation Diamond Bar"
        }
    ]
  },
  {
    slug: 'charter-oak',
    name: 'Charter Oak',
    intro: 'Outright Landscape Construction is proud to offer top-quality landscaping in Charter Oak. We are a local, family-run business dedicated to improving our community one yard at a time. Our team is skilled in a wide range of services, including the installation of beautiful and durable pavers, fresh sod, and efficient irrigation systems. We also handle yard cleanups and demolition projects. As a fully licensed and insured company, we provide reliable and professional service you can count on. For a free quote and friendly consultation in Charter Oak, contact us today. We’re here to bring your vision to life.',
    geo: { latitude: 34.103, longitude: -117.855 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26443.123456789!2d-117.865!3d34.103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c327f8a1b2c3d5%3A0x1234567890abcdef!2sCharter%20Oak%2C%20CA!5e0!3m2!1sen!2sus!4v1716934667890!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Charter Oak?', a: 'Yes, we offer free estimates to all residents in the Charter Oak community.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, we provide full demolition and hauling services.' },
        { q: 'Do you warranty your work?', a: 'Yes, all our projects are backed by our workmanship warranty.' },
    ]
  },
  {
    slug: 'la-verne',
    name: 'La Verne',
    intro: 'For distinguished landscaping in La Verne, look no further than Outright Landscape Construction. We specialize in creating custom outdoor spaces that reflect the charm and character of this historic city. Our expertise includes designing and building stunning paver patios, installing water-efficient turf and irrigation, and executing large-scale yard cleanups. We are fully licensed (CSLB #1073845) and insured, delivering professional-grade results on every project. Our local San Gabriel Valley crew handles all demo and hauling, making the process easy and stress-free for you. Contact us to schedule a complimentary estimate and let us elevate your La Verne home.',
    geo: { latitude: 34.100, longitude: -117.767 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52891.45678901234!2d-117.790!3d34.100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c3291234567890%3A0xabcdef1234567890!2sLa%20Verne%2C%20CA!5e0!3m2!1sen!2sus!4v1716934701234!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in La Verne?', a: 'We certainly do. Homeowners in La Verne can receive a free, detailed estimate.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, we take care of all demolition and site clearing needs.' },
        { q: 'Do you warranty your work?', a: 'Yes, we guarantee high-quality results and provide warranties on our work.' },
    ]
  },
  {
    slug: 'san-dimas',
    name: 'San Dimas',
    intro: 'Outright Landscape Construction delivers exceptional landscaping services in San Dimas with our full Install • Repair • Demolition approach. Located just minutes from Covina in the beautiful San Gabriel Valley, we understand the unique landscaping needs of San Dimas homeowners. Our comprehensive services include custom paver installations, professional turf installation, efficient irrigation systems, and complete yard transformations. As a fully licensed (CSLB #1073845) and insured contractor, we handle everything from initial site preparation and demolition to final cleanup and maintenance. Our family-run crew takes pride in delivering superior craftsmanship that enhances your property value and outdoor living experience.',
    geo: { latitude: 34.106, longitude: -117.806 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52889.123456789!2d-117.825!3d34.106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c328abcdef1234%3A0x1234567890abcdef!2sSan%20Dimas%2C%20CA!5e0!3m2!1sen!2sus!4v1716934734567!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in San Dimas?', a: 'Yes, we provide free, detailed estimates for all landscaping projects in San Dimas.' },
        { q: 'Can you handle demo and hauling?', a: 'Absolutely. We specialize in complete demolition and hauling services.' },
        { q: 'Do you warranty your work?', a: 'Yes, we stand behind our workmanship with comprehensive warranties.' },
    ],
    projects: [
        {
            title: "Irrigation System Installation",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/805f8b55a_2025-05-282.jpg",
            alt: "Irrigation System Installation - Outright Landscape San Dimas"
        },
        {
            title: "Side Yard Irrigation",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/d1c4f81c9_2024-08-29.jpg",
            alt: "Side Yard Irrigation - Outright Landscape San Dimas"
        },
        {
            title: "Landscape Demo & Prep",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/954e6bafa_2024-09-04.jpg",
            alt: "Landscape Demo and Prep San Dimas"
        }
    ]
  },
  {
    slug: 'walnut',
    name: 'Walnut',
    intro: 'Transform your Walnut property with Outright Landscape Construction’s comprehensive Install • Repair • Demolition services. Serving the Walnut community from our nearby Covina base, we bring decades of landscaping expertise to every project. Our specialties include elegant paver patios and walkways, lush turf installations, smart irrigation solutions, and complete outdoor renovations. As a licensed (CSLB #1073845) and insured San Gabriel Valley contractor, we handle projects of all sizes with meticulous attention to detail. From initial demolition and site preparation to final landscaping touches, our experienced crew ensures your Walnut home becomes the neighborhood showcase you’ve always envisioned.',
    geo: { latitude: 34.020, longitude: -117.865 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52930.123456789!2d-117.880!3d34.020!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c32a1234567890%3A0xabcdef1234567890!2sWalnut%2C%20CA!5e0!3m2!1sen!2sus!4v1716934767890!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you provide free landscaping estimates in Walnut?', a: 'Yes, we offer complimentary, detailed estimates for all landscaping services in Walnut.' },
        { q: 'Can you handle demolition and cleanup?', a: 'Absolutely. Our full-service approach includes professional demolition and hauling.' },
        { q: 'Do you guarantee your landscaping work?', a: 'Yes, we provide warranties on our workmanship and materials.' },
    ]
  },
  {
    slug: 'baldwin-park',
    name: 'Baldwin Park',
    intro: 'Outright Landscape Construction brings professional Install • Repair • Demolition services to Baldwin Park homeowners. Operating from our Covina headquarters in the heart of the San Gabriel Valley, we understand the local climate and soil conditions that make Baldwin Park landscapes thrive. Our comprehensive services include custom hardscaping with pavers, professional sod installation, efficient drainage solutions, and complete property makeovers. As a fully licensed (CSLB #1073845) and insured contractor, we manage every aspect of your project from initial demolition to final cleanup. Trust our family-owned business to enhance your Baldwin Park property with quality craftsmanship and exceptional customer service.',
    geo: { latitude: 34.085, longitude: -117.960 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52898.987654321!2d-117.975!3d34.085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d61234567890%3A0xabcdef1234567890!2sBaldwin%20Park%2C%20CA!5e0!3m2!1sen!2sus!4v1716934801234!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Baldwin Park?', a: 'Yes, we provide free, comprehensive estimates for all landscaping projects in Baldwin Park.' },
        { q: 'Can you handle demo and removal services?', a: 'Absolutely. We specialize in complete demolition and hauling services.' },
        { q: 'Do you warranty your work?', a: 'Yes, we stand behind our craftsmanship with solid warranties.' },
    ]
  },
  {
    slug: 'el-monte',
    name: 'El Monte',
    intro: 'Enhance your El Monte property with Outright Landscape Construction’s complete Install • Repair • Demolition services. Located near Covina in the San Gabriel Valley, we’ve been transforming El Monte landscapes with professional expertise and local knowledge. Our services range from intricate paver installations and retaining walls to fresh turf installation and smart irrigation systems. As a licensed (CSLB #1073845) and insured contractor, we handle every project phase including initial site demolition, preparation, and final cleanup. Our family-run team takes pride in delivering exceptional results that increase your property value and create beautiful outdoor living spaces for El Monte families.',
    geo: { latitude: 34.068, longitude: -118.027 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52906.123456789!2d-118.040!3d34.068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d01234567890%3A0xabcdef1234567890!2sEl%20Monte%2C%20CA!5e0!3m2!1sen!2sus!4v1716934834567!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you provide free landscaping consultations in El Monte?', a: 'Yes, we offer free, detailed estimates for all El Monte landscaping projects.' },
        { q: 'Can you handle demolition and site preparation?', a: 'Absolutely. Our full-service approach includes professional demolition and hauling.' },
        { q: 'Do you guarantee your landscaping work?', a: 'Yes, we provide comprehensive warranties on our workmanship.' },
    ]
  },
  {
    slug: 'monrovia',
    name: 'Monrovia',
    intro: 'Transform your Monrovia home with Outright Landscape Construction’s expert Install • Repair • Demolition services. Serving Monrovia from our nearby Covina location, we bring San Gabriel Valley expertise to every landscaping project. Our comprehensive offerings include custom paver patios, professional turf installation, efficient irrigation systems, and complete outdoor renovations. As a fully licensed (CSLB #1073845) and insured contractor, we manage all project aspects from initial demolition and site preparation to final installation and cleanup. Our experienced, family-run crew understands Monrovia’s unique character and creates landscapes that complement the area’s natural beauty while enhancing your property’s value and functionality.',
    geo: { latitude: 34.144, longitude: -118.001 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52883.123456789!2d-118.015!3d34.144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2da1234567890%3A0xabcdef1234567890!2sMonrovia%2C%20CA!5e0!3m2!1sen!2sus!4v1716934867890!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates for Monrovia landscaping projects?', a: 'Yes, we provide free, comprehensive estimates for all Monrovia landscaping services.' },
        { q: 'Can you handle demolition and cleanup?', a: 'Absolutely. We specialize in complete demolition and hauling services.' },
        { q: 'Do you warranty your work?', a: 'Yes, we provide solid warranties on our craftsmanship.' },
    ]
  },
  {
    slug: 'arcadia',
    name: 'Arcadia',
    intro: 'Outright Landscape Construction delivers premium Install • Repair • Demolition services to Arcadia’s discerning homeowners. Operating from our Covina base in the San Gabriel Valley, we understand the sophisticated landscaping standards expected in Arcadia. Our specialized services include elegant hardscaping with premium pavers, lush turf installations, advanced irrigation systems, and complete property transformations. As a fully licensed (CSLB #1073845) and insured contractor, we handle every detail from initial demolition to final landscaping touches. Our family-owned business takes pride in creating outdoor spaces that reflect Arcadia’s prestige while providing functional beauty for your family’s enjoyment.',
    geo: { latitude: 34.139, longitude: -118.035 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52885.123456789!2d-118.050!3d34.139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2db1234567890%3A0xabcdef1234567890!2sArcadia%2C%20CA!5e0!3m2!1sen!2sus!4v1716934901234!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you provide free landscaping estimates in Arcadia?', a: 'Yes, we provide free, detailed consultations and estimates for all Arcadia landscaping projects.' },
        { q: 'Can you handle site demolition and preparation?', a: 'Absolutely. We provide complete demolition and hauling services.' },
        { q: 'Do you guarantee your landscaping work?', a: 'Yes, we provide comprehensive warranties on our workmanship and premium materials.' },
    ]
  },
  {
    slug: 'temple-city',
    name: 'Temple City',
    intro: 'Enhance your Temple City property with Outright Landscape Construction’s comprehensive Install • Repair • Demolition services. Conveniently located near Temple City in Covina, we bring San Gabriel Valley expertise to every project. Our services include custom paver installations, professional turf installation, efficient irrigation solutions, and complete landscape renovations. As a licensed (CSLB #1073845) and insured contractor, we manage all aspects of your project from initial site demolition to final cleanup and maintenance. Our experienced crew understands Temple City’s community standards and creates beautiful, functional landscapes that enhance your property value while providing years of outdoor enjoyment.',
    geo: { latitude: 34.107, longitude: -118.057 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52894.123456789!2d-118.070!3d34.107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2dc1234567890%3A0xabcdef1234567890!2sTemple%20City%2C%20CA!5e0!3m2!1sen!2sus!4v1716934934567!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Temple City?', a: 'Yes, we provide free, comprehensive estimates for all Temple City landscaping projects.' },
        { q: 'Can you handle demolition and site prep?', a: 'Absolutely. We specialize in complete demolition and hauling services.' },
        { q: 'Do you warranty your work?', a: 'Yes, we provide solid warranties on our workmanship.' },
    ]
  },
  {
    slug: 'rowland-heights',
    name: 'Rowland Heights',
    intro: 'Transform your Rowland Heights property with Outright Landscape Construction’s expert Install • Repair • Demolition services. Serving Rowland Heights from our Covina headquarters, we bring decades of San Gabriel Valley landscaping expertise to your project. Our comprehensive services include custom hardscaping with pavers, professional sod installation, smart irrigation systems, and complete outdoor makeovers. As a fully licensed (CSLB #1073845) and insured contractor, we handle every project phase from initial demolition and site preparation to final installation and cleanup. Our family-run business understands the unique landscape opportunities in Rowland Heights and creates outdoor spaces that maximize your property’s potential.',
    geo: { latitude: 33.976, longitude: -117.888 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52942.123456789!2d-117.900!3d33.976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c32c1234567890%3A0xabcdef1234567890!2sRowland%20Heights%2C%20CA!5e0!3m2!1sen!2sus!4v1716934967890!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you provide free landscaping consultations in Rowland Heights?', a: 'Yes, we offer free, detailed estimates for all Rowland Heights landscaping projects.' },
        { q: 'Can you handle demolition and removal?', a: 'Absolutely. We provide complete demolition and hauling services.' },
        { q: 'Do you guarantee your landscaping work?', a: 'Yes, we provide comprehensive warranties on our craftsmanship.' },
    ]
  },
  {
    slug: 'pomona',
    name: 'Pomona',
    intro: 'Outright Landscape Construction brings professional Install • Repair • Demolition services to Pomona homeowners and businesses. Located in nearby Covina, we’ve been serving the greater San Gabriel Valley with expert landscaping solutions. Our comprehensive services include custom paver installations, professional turf installation, efficient irrigation systems, and complete property transformations. As a fully licensed (CSLB #1073845) and insured contractor, we manage every aspect of your project from initial site demolition to final landscaping touches. Our experienced, family-owned crew takes pride in creating beautiful, functional outdoor spaces that enhance Pomona properties while providing lasting value and enjoyment.',
    geo: { latitude: 34.055, longitude: -117.750 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52909.123456789!2d-117.765!3d34.055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c32e1234567890%3A0xabcdef1234567890!2sPomona%2C%20CA!5e0!3m2!1sen!2sus!4v1716935001234!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates for Pomona landscaping projects?', a: 'Yes, we provide free, comprehensive consultations and estimates for all Pomona landscaping services.' },
        { q: 'Can you handle site demolition and preparation?', a: 'Absolutely. We specialize in complete demolition and hauling services.' },
        { q: 'Do you warranty your work?', a: 'Yes, we provide solid warranties on our workmanship.' },
    ]
  },
  {
    slug: 'claremont',
    name: 'Claremont',
    intro: 'Outright Landscape Construction provides premier landscaping services to Claremont residents, known for its tree-lined streets and beautiful homes. We specialize in sustainable and aesthetic landscape solutions including drought-tolerant gardens, custom pavers, and efficient irrigation systems tailored to Claremont\'s unique charm.',
    geo: { latitude: 34.096, longitude: -117.719 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52899.123456789!2d-117.730!3d34.096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c3301234567890%3A0xabcdef1234567890!2sClaremont%2C%20CA!5e0!3m2!1sen!2sus!4v1716935034567!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you offer free estimates in Claremont?', a: 'Yes, we offer free, detailed estimates for all landscaping projects in Claremont.' },
        { q: 'Can you handle demo and hauling?', a: 'Yes, we provide full demolition and removal services.' },
        { q: 'Do you warranty your work?', a: 'Yes, we stand by our work with comprehensive warranties.' },
    ]
  },
  {
    slug: 'duarte',
    name: 'Duarte',
    intro: 'Serving the community of Duarte, Outright Landscape Construction offers expert landscaping services including paver installation, turf replacement, and irrigation upgrades. Nestled against the San Gabriel Mountains, we create outdoor spaces that blend beautifully with the natural surroundings while maximizing functionality.',
    geo: { latitude: 34.139, longitude: -117.977 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52887.123456789!2d-117.990!3d34.139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d91234567890%3A0xabcdef1234567890!2sDuarte%2C%20CA!5e0!3m2!1sen!2sus!4v1716935067890!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you provide free landscaping estimates in Duarte?', a: 'Yes, we provide free estimates for all residential landscaping projects in Duarte.' },
        { q: 'Can you handle site prep and demo?', a: 'Absolutely. We handle all aspects of demolition and site preparation.' },
        { q: 'Do you warranty your work?', a: 'Yes, we guarantee our craftsmanship and materials.' },
    ]
  },
  {
    slug: 'san-gabriel-valley',
    name: 'San Gabriel Valley',
    intro: 'As a premier landscape contractor serving the entire San Gabriel Valley, Outright Landscape Construction is dedicated to transforming properties across the region. From Pasadena to Pomona, we deliver high-quality hardscaping, turf installation, and landscape design services that enhance the beauty and value of your home.',
    geo: { latitude: 34.090, longitude: -117.890 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211567.123456789!2d-118.000!3d34.100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c71234567890%3A0xabcdef1234567890!2sSan%20Gabriel%20Valley%2C%20CA!5e0!3m2!1sen!2sus!4v1716935101234!5m2!1sen!2sus",
    faqs: [
        { q: 'Do you serve the entire San Gabriel Valley?', a: 'Yes, we provide our full range of landscaping services throughout the SGV.' },
        { q: 'Do you offer free estimates?', a: 'Yes, we offer free, detailed estimates for all projects in the region.' },
        { q: 'Do you warranty your work?', a: 'Yes, we provide comprehensive warranties on all our projects.' },
    ]
  }
];