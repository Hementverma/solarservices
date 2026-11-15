export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://rameshsolar.in').replace(/\/$/, '')

export const company = {
  name: 'Ramesh Solar Services',
  tagline: 'Power Your Future With Solar.',
  description:
    'Solar consultation, sales, installation, maintenance and after-sales service for homes, businesses, industries and farms across Madhya Pradesh.',
  serviceArea: 'Madhya Pradesh, India',
}

export const defaultContact = {
  phone: '+91 98933 69932',
  phoneRaw: '+919893369932',
  phone2: '+91 62678 52076',
  phone2Raw: '+916267852076',
  whatsapp: '+919893369932',
  email: 'hello@rameshsolar.in',
  address: 'Indore, Madhya Pradesh, India',
  hours: 'Mon – Sat · 9:00 AM – 7:00 PM',
  mapsUrl: '',
}

export const serviceCities = [
  'Indore',
  'Bhopal',
  'Sehore',
  'Ujjain',
  'Dewas',
  'Rajgarh',
]

export const propertyTypes = [
  'Home',
  'Shop',
  'Commercial Building',
  'Factory / Industry',
  'Agricultural',
]

export const requirements = [
  'Residential Solar',
  'Commercial Solar',
  'Industrial Solar',
  'On-Grid Solar',
  'Off-Grid Solar',
  'Hybrid Solar',
  'Solar Maintenance',
  'Not sure — need guidance',
]

export const services = [
  {
    slug: 'residential-solar',
    title: 'Residential Solar',
    shortDescription:
      'Clean, quiet rooftop power designed around your home, your usage and your roof.',
    description:
      'A thoughtfully sized rooftop system for your family’s daily consumption, planned around roof space, shading and future needs.',
    image: '/images/residential-solar.jpg',
    icon: 'Home',
    features: [
      'Free roof and load assessment',
      'Sizing based on your actual bill',
      'Net-metering guidance',
      'Residential subsidy application support',
    ],
    bestFor: 'Homes, duplexes and housing societies',
  },
  {
    slug: 'commercial-solar',
    title: 'Commercial Solar',
    shortDescription:
      'Reduce operating overheads with a dependable solar system for your business premises.',
    description:
      'Solar for shops, showrooms, offices, schools and commercial buildings — engineered to offset daytime consumption and improve long-term cost predictability.',
    image: '/images/commercial-solar.jpg',
    icon: 'Building2',
    features: [
      'Load and tariff analysis',
      'Roof-safe mounting design',
      'Net-metering support',
      'Minimal disruption installation',
    ],
    bestFor: 'Shops, offices, showrooms and institutions',
  },
  {
    slug: 'industrial-solar',
    title: 'Industrial Solar',
    shortDescription:
      'High-capacity solar systems engineered for factories, warehouses and industrial loads.',
    description:
      'From feasibility and structural checks to commissioning and monitoring, we plan industrial solar around shift patterns, load profiles and production priorities.',
    image: '/images/industrial-solar.jpg',
    icon: 'Factory',
    features: [
      'Detailed feasibility study',
      'Structural and electrical design',
      'Project scheduling support',
      'Performance monitoring setup',
    ],
    bestFor: 'Factories, warehouses and manufacturing units',
  },
  {
    slug: 'on-grid-solar',
    title: 'On-Grid Solar',
    shortDescription:
      'The most common choice for grid-connected homes and businesses, with net metering.',
    description:
      'An on-grid system works alongside the DISCOM supply. Surplus daytime generation is exported through net metering, reducing your bill while the grid remains your backup.',
    image: '/images/ongrid-solar.jpg',
    icon: 'PlugZap',
    features: [
      'Grid-tied inverter',
      'Net-metering documentation',
      'Lower upfront cost',
      'No battery replacement cost',
    ],
    bestFor: 'Homes and businesses with reliable grid supply',
  },
  {
    slug: 'off-grid-solar',
    title: 'Off-Grid Solar',
    shortDescription:
      'Independent solar power with battery storage for locations without dependable grid supply.',
    description:
      'Off-grid systems generate and store their own electricity. We size the panels, inverter and battery bank around your essential loads and backup expectations.',
    image: '/images/offgrid-solar.jpg',
    icon: 'BatteryCharging',
    features: [
      'Battery-backed power',
      'Works without grid supply',
      'Custom backup sizing',
      'Remote monitoring options',
    ],
    bestFor: 'Farms, remote sites and backup-critical loads',
  },
  {
    slug: 'hybrid-solar',
    title: 'Hybrid Solar',
    shortDescription:
      'Grid connection plus battery backup — solar that keeps working when the power does not.',
    description:
      'A hybrid system balances solar generation, grid supply and battery storage. It is a practical option when you want lower bills and protection from outages.',
    image: '/images/hybrid-solar.jpg',
    icon: 'SunMedium',
    features: [
      'Solar + battery + grid',
      'Smart energy management',
      'Backup for essential circuits',
      'Future-ready expandability',
    ],
    bestFor: 'Homes and businesses needing both savings and backup',
  },
]

export const brands = [
  {
    name: 'Tata Power Solar',
    note: 'Modules, inverters and integrated solar solutions',
  },
  { name: 'Waaree', note: 'Solar modules and energy solutions' },
  { name: 'Havells', note: 'Solar modules and electrical products' },
  { name: 'Luminous', note: 'Solar inverters, batteries and storage' },
  { name: 'Polycab', note: 'Solar cables and electrical infrastructure' },
]

export const whyChooseUs = [
  {
    title: 'Quality-led components',
    description:
      'We specify products by performance, warranty terms and project suitability — not by what is easiest to sell.',
    icon: 'BadgeCheck',
  },
  {
    title: 'Professional installation',
    description:
      'Structured mounting, careful cable management and commissioning checks carried out by our installation team.',
    icon: 'HardHat',
  },
  {
    title: 'Transparent, itemised pricing',
    description:
      'Your quotation breaks down major components and services so you can compare scope clearly.',
    icon: 'ReceiptText',
  },
  {
    title: 'Site inspection before quoting',
    description:
      'Roof condition, shading, cable route and electrical load are checked before we recommend a system.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Maintenance and support',
    description:
      'Cleaning schedules, performance checks and service support are available after your system is commissioned.',
    icon: 'Wrench',
  },
  {
    title: 'Customer-first communication',
    description:
      'Clear timelines, a named point of contact and honest answers at every stage of your project.',
    icon: 'MessagesSquare',
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Submit your enquiry',
    description: 'Tell us your city, property type and electricity bill. It takes less than two minutes.',
    icon: 'Send',
  },
  {
    number: '02',
    title: 'Initial consultation',
    description: 'A solar advisor understands your usage, roof and goals, and answers your questions.',
    icon: 'PhoneCall',
  },
  {
    number: '03',
    title: 'Site inspection',
    description: 'Our team checks roof condition, shading, electrical setup and cable routing.',
    icon: 'ClipboardCheck',
  },
  {
    number: '04',
    title: 'Customised quotation',
    description: 'Receive a clear, itemised proposal with system size, components and estimated output.',
    icon: 'FileText',
  },
  {
    number: '05',
    title: 'Installation & commissioning',
    description: 'We install, test and commission your system with proper safety and documentation.',
    icon: 'SunMedium',
  },
  {
    number: '06',
    title: 'After-sales support',
    description: 'Maintenance guidance, performance reviews and support when you need us.',
    icon: 'LifeBuoy',
  },
]

export const locations = [
  {
    slug: 'indore',
    name: 'Indore',
    shortName: 'Indore',
    title: 'Solar Panel Installation in Indore',
    metaTitle: 'Solar Panel Installation in Indore | Ramesh Solar Services',
    metaDescription:
      'Premium solar panel installation, consultation and maintenance in Indore for homes, shops, commercial buildings and industries. Get a free site assessment.',
    intro:
      'Solar solutions for Indore’s homes, businesses and growing industrial corridors.',
    description:
      'Indore receives strong sunshine through most of the year, making rooftop solar a practical way to reduce daytime electricity costs. We serve homes, shops, offices, housing societies and industrial units across Indore district with end-to-end consultation, installation and support.',
    highlights: [
      'Residential rooftop solar with subsidy guidance',
      'Commercial and industrial project assessments',
      'Site inspection across Indore district',
      'Local after-sales and maintenance support',
    ],
    areas: ['Indore city', 'Rau', 'Mhow', 'Sanwer', 'Depalpur'],
    image: '/images/residential-solar.jpg',
  },
  {
    slug: 'bhopal',
    name: 'Bhopal',
    shortName: 'Bhopal',
    title: 'Solar Company in Bhopal',
    metaTitle: 'Solar Company in Bhopal | Ramesh Solar Services',
    metaDescription:
      'Looking for a solar company in Bhopal? Get rooftop solar consultation, installation and maintenance for homes and commercial properties. Free site inspection.',
    intro:
      'Thoughtful solar systems for Bhopal’s residential neighbourhoods and commercial buildings.',
    description:
      'From family homes to institutions and commercial premises, we help Bhopal customers plan solar around their actual consumption, available roof area and future requirements. Our process starts with a site inspection and a clear, itemised proposal.',
    highlights: [
      'Home and society rooftop systems',
      'Commercial building solar assessments',
      'Net-metering and documentation guidance',
      'Scheduled maintenance and performance checks',
    ],
    areas: ['Bhopal city', 'Kolar', 'Misrod', 'Ayodhya Bypass', 'Berasia'],
    image: '/images/commercial-solar.jpg',
  },
  {
    slug: 'sehore',
    name: 'Sehore',
    shortName: 'Sehore',
    title: 'Solar Panel Installation in Sehore',
    metaTitle: 'Solar Panel Installation in Sehore | Ramesh Solar Services',
    metaDescription:
      'Solar panel installation in Sehore for homes, shops and agricultural properties. Expert site inspection, transparent pricing and local support.',
    intro:
      'Reliable solar guidance for Sehore homes, shops and agricultural customers.',
    description:
      'Sehore’s mix of homes, small businesses and agricultural users calls for practical solar planning. We size systems around real usage and provide clear guidance on on-grid, off-grid and hybrid options, including maintenance support after commissioning.',
    highlights: [
      'Home and shop rooftop systems',
      'Agricultural pump and backup solutions',
      'On-grid and off-grid options',
      'Local inspection and service visits',
    ],
    areas: ['Sehore city', 'Ashta', 'Ichhawar', 'Nasrullaganj', 'Shyampur'],
    image: '/images/offgrid-solar.jpg',
  },
  {
    slug: 'ujjain',
    name: 'Ujjain',
    shortName: 'Ujjain',
    title: 'Solar Services in Ujjain',
    metaTitle: 'Solar Services in Ujjain | Ramesh Solar Services',
    metaDescription:
      'Solar services in Ujjain including rooftop consultation, installation, maintenance and system upgrades for homes and commercial properties.',
    intro:
      'End-to-end solar services for Ujjain — from first assessment to long-term support.',
    description:
      'Whether you are planning a new rooftop system or want to understand the right option for your property, our Ujjain service covers site assessment, system design, installation and maintenance. We keep recommendations practical, transparent and based on your site conditions.',
    highlights: [
      'Residential and commercial solar',
      'Battery-backed hybrid options',
      'Installation and commissioning',
      'Maintenance and cleaning support',
    ],
    areas: ['Ujjain city', 'Nagda', 'Mahidpur', 'Tarana', 'Ghattia'],
    image: '/images/hybrid-solar.jpg',
  },
  {
    slug: 'dewas',
    name: 'Dewas',
    shortName: 'Dewas',
    title: 'Solar Company in Dewas',
    metaTitle: 'Solar Company in Dewas | Ramesh Solar Services',
    metaDescription:
      'Solar company in Dewas for residential, commercial and industrial rooftop projects. Get expert consultation, installation and after-sales support.',
    intro:
      'Solar systems for Dewas homes, businesses and industrial operations.',
    description:
      'Dewas has a strong industrial base alongside growing residential demand. We support both with site-specific solar planning — from roof and load assessments to system design, safe installation and ongoing service.',
    highlights: [
      'Industrial and warehouse solar',
      'Home and commercial rooftop systems',
      'Load and tariff assessment',
      'Preventive maintenance plans',
    ],
    areas: ['Dewas city', 'Hatpipliya', 'Tonk Khurd', 'Kannod', 'Bagli'],
    image: '/images/industrial-solar.jpg',
  },
  {
    slug: 'rajgarh',
    name: 'Rajgarh',
    shortName: 'Rajgarh',
    title: 'Solar Installation in Rajgarh',
    metaTitle: 'Solar Installation in Rajgarh | Ramesh Solar Services',
    metaDescription:
      'Solar installation in Rajgarh for homes, farms and businesses. Reliable systems, honest guidance and support from assessment to maintenance.',
    intro:
      'Practical solar solutions for Rajgarh’s homes, farms and local businesses.',
    description:
      'For Rajgarh customers, dependable power matters. We plan grid-connected and battery-backed systems around your location, consumption and backup needs, with straightforward guidance on costs, generation and maintenance.',
    highlights: [
      'Home and farm solar systems',
      'Off-grid and hybrid backup options',
      'Site assessment and system sizing',
      'Local service coordination',
    ],
    areas: ['Rajgarh city', 'Biaora', 'Narsinghgarh', 'Khilchipur', 'Sarangpur'],
    image: '/images/ongrid-solar.jpg',
  },
]

export const trustPoints = [
  { label: 'Site visit before quotation', icon: 'ClipboardCheck' },
  { label: 'Transparent, itemised pricing', icon: 'ReceiptText' },
  { label: 'Quality products & workmanship', icon: 'BadgeCheck' },
  { label: 'Support after installation', icon: 'LifeBuoy' },
]

export const faqs = [
  {
    question: 'How much does rooftop solar cost?',
    answer:
      'The cost depends on system size, module and inverter selection, mounting structure, cable length, battery requirements and site conditions. A 3 kW residential system is a common starting point for many homes, but the right size for you can only be confirmed after an assessment. We share an itemised quotation after a site inspection so you can see exactly what is included.',
  },
  {
    question: 'Which solar system is best for my home?',
    answer:
      'For most grid-connected homes, an on-grid system offers the simplest path to lower bills. If you need backup during outages, a hybrid system with battery storage may suit you better. Off-grid systems are usually for locations without reliable grid supply. The right choice depends on your usage, roof, grid reliability and budget.',
  },
  {
    question: 'How much electricity can a solar panel generate?',
    answer:
      'Generation depends on system capacity, panel orientation, shading, temperature, module quality and local weather. As a planning estimate, 1 kW of rooftop solar in Madhya Pradesh can generate roughly 3.5–4.5 units per day on an annual average, with seasonal variation. Your actual output will differ. Our calculator provides an indicative estimate only.',
  },
  {
    question: 'What is the difference between on-grid and off-grid?',
    answer:
      'An on-grid system is connected to the DISCOM network and uses net metering to offset your bill. It does not provide backup during a grid outage. An off-grid system operates independently using batteries and is not dependent on the grid. It typically costs more because of the battery bank. Hybrid systems combine grid connection with battery backup.',
  },
  {
    question: 'Is maintenance required?',
    answer:
      'Yes. Solar systems need periodic cleaning, visual checks, inverter monitoring and occasional professional servicing. Dust accumulation can reduce generation, especially in dry months. We offer maintenance guidance and scheduled service support. Cleaning frequency depends on your location, dust and nearby activity.',
  },
  {
    question: 'What is the installation process?',
    answer:
      'Our process is: submit an enquiry, initial consultation, site inspection, customised quotation, installation and commissioning, followed by after-sales support. For grid-connected systems, DISCOM approval and net-metering steps are also completed as part of the process. Timelines vary by system size and approvals.',
  },
  {
    question: 'Are government subsidies available?',
    answer:
      'As of November 2026, the central PM Surya Ghar: Muft Bijli Yojana provides residential rooftop solar subsidy of ₹30,000 for 1 kW, ₹60,000 for 2 kW and a maximum of ₹78,000 for 3 kW or higher capacity. No general state cash top-up for Madhya Pradesh homes was confirmed in official sources at that time. Eligibility requires a residential DISCOM connection, an eligible system and an application through the national portal with an empanelled vendor. Scheme rules, benchmark costs and availability can change. Always verify current details at pmsuryaghar.gov.in and with your DISCOM. Commercial and industrial systems are generally not eligible for this residential subsidy.',
  },
  {
    question: 'Do you help with net metering and paperwork?',
    answer:
      'Yes. For eligible grid-connected projects we guide customers through the application and documentation steps with the relevant DISCOM. Approval timelines are controlled by the utility and can vary by location and system size.',
  },
]

export const testimonials = []

export const defaultCalculatorConfig = {
  tariffDefaults: {
    Home: 7.2,
    Shop: 8.2,
    'Commercial Building': 8.8,
    'Factory / Industry': 7.8,
    Agricultural: 6.5,
  },
  peakSunHoursByCity: {
    Indore: 4.8,
    Bhopal: 4.9,
    Sehore: 4.8,
    Ujjain: 4.9,
    Dewas: 4.7,
    Rajgarh: 5.0,
  },
  performanceRatio: 0.8,
  systemCostPerKw: 52000,
  co2PerKwh: 0.82,
  minCapacity: 1,
  maxCapacity: 1000,
  updatedAt: null,
}

export const storageKeys = {
  adminToken: 'rss_admin_session_hint',
}
