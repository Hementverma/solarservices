export const defaultContact = {
  singleton: 'main',
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

export const defaultCalculator = {
  singleton: 'main',
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
}

export const defaultServices = [
  {
    slug: 'residential-solar',
    title: 'Residential Solar',
    shortDescription:
      'Clean, quiet rooftop power designed around your home, your usage and your roof.',
    description:
      'A thoughtfully sized rooftop system for your family’s daily consumption, planned around roof space, shading and future needs.',
    image: '/images/residential-solar.jpg',
    icon: 'Home',
    bestFor: 'Homes, duplexes and housing societies',
    features: [
      'Free roof and load assessment',
      'Sizing based on your actual bill',
      'Net-metering guidance',
      'Residential subsidy application support',
    ],
    order: 1,
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
    bestFor: 'Shops, offices, showrooms and institutions',
    features: [
      'Load and tariff analysis',
      'Roof-safe mounting design',
      'Net-metering support',
      'Minimal disruption installation',
    ],
    order: 2,
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
    bestFor: 'Factories, warehouses and manufacturing units',
    features: [
      'Detailed feasibility study',
      'Structural and electrical design',
      'Project scheduling support',
      'Performance monitoring setup',
    ],
    order: 3,
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
    bestFor: 'Homes and businesses with reliable grid supply',
    features: [
      'Grid-tied inverter',
      'Net-metering documentation',
      'Lower upfront cost',
      'No battery replacement cost',
    ],
    order: 4,
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
    bestFor: 'Farms, remote sites and backup-critical loads',
    features: [
      'Battery-backed power',
      'Works without grid supply',
      'Custom backup sizing',
      'Remote monitoring options',
    ],
    order: 5,
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
    bestFor: 'Homes and businesses needing both savings and backup',
    features: [
      'Solar + battery + grid',
      'Smart energy management',
      'Backup for essential circuits',
      'Future-ready expandability',
    ],
    order: 6,
  },
]

export const defaultLocations = [
  {
    slug: 'indore',
    name: 'Indore',
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
    order: 1,
  },
  {
    slug: 'bhopal',
    name: 'Bhopal',
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
    order: 2,
  },
  {
    slug: 'sehore',
    name: 'Sehore',
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
    order: 3,
  },
  {
    slug: 'ujjain',
    name: 'Ujjain',
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
    order: 4,
  },
  {
    slug: 'dewas',
    name: 'Dewas',
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
    order: 5,
  },
  {
    slug: 'rajgarh',
    name: 'Rajgarh',
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
    order: 6,
  },
]
