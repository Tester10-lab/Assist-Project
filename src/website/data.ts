import { NavLink, ServiceItem, TestimonialItem, GalleryProject, TeamMember } from './types';
import { asset } from './utils/asset';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    icon: '/roofora-assets/images/service-icon1.png',
    title: 'Emergency Roof Repair & Leak Fix',
    description: 'Rapid response leak fixes, terracotta ridge capping re-pointing, and flashing repairs by certified roofing experts.',
    features: ['24/7 Emergency dispatch', 'Ridge capping re-pointing', 'Storm recovery guarantee', 'Same-day patching'],
    imageUrl: '/roofora-assets/images/services-img1.jpg',
  },
  {
    icon: '/roofora-assets/images/service-icon2.png',
    title: 'AS/NZS Sarking & Re-Roofing',
    description: 'Heavy-duty vapor barrier sarking, treated timber battens, and complete re-roofing built to AS/NZS 4200.1 standards.',
    features: ['AS/NZS 4200.1 sarking', 'Treated timber battens', '10-Year workmanship warranty', 'Zero site mess guarantee'],
    imageUrl: '/roofora-assets/images/services-img2.jpg',
  },
  {
    icon: '/roofora-assets/images/service-icon3.png',
    title: 'Structural Rafter & Framing Repairs',
    description: 'Comprehensive timber framing carpentry, sagging rafter correction, and certified structural roof repairs.',
    features: ['Precision rafter carpentry', 'Structural truss reinforcement', 'Timber batten alignment', 'Written condition report'],
    imageUrl: '/roofora-assets/images/services-img3.jpg',
  },
  {
    icon: '/roofora-assets/images/service-icon4.png',
    title: 'Full Roof Strip & Restoration',
    description: 'Complete roof strip-down to trusses, structural insulation inspection, and complete restoration across Melbourne.',
    features: ['Full roof tear-off & strip', 'Truss & insulation check', 'Lead & zinc flashing', 'Clean jobsite promise'],
    imageUrl: '/roofora-assets/images/services-img4.jpg',
  },
];

export const PRICING_PLANS = [
  {
    id: 'p1',
    icon: '/roofora-assets/images/price-icon1.png',
    title: 'Leak Diagnosis',
    subtitle: 'Credited toward your repair if you hire us.',
    price: '350',
    period: 'one-off',
    features: [
      'Professional roof inspection',
      'Identifies leaks & weak spots',
      'Detailed report sent to you',
      'Cost credited to repair job',
    ],
  },
  {
    id: 'p2',
    icon: '/roofora-assets/images/price-icon2.png',
    title: 'Standard Repair',
    subtitle: 'Shingles, pipe boots, or basic flashing fixes.',
    price: '550',
    period: 'starting at',
    popular: true,
    features: [
      'Fixes damaged sheets & boots',
      'Quick, durable seal & repair',
      'All materials & labor included',
      'Multi-point roof safety check',
    ],
  },
  {
    id: 'p3',
    icon: '/roofora-assets/images/price-icon3.png',
    title: 'Chimney Re-Flash',
    subtitle: 'Typical brick chimney counter-flashing.',
    price: '850',
    period: 'starting at',
    features: [
      'Custom fabricated step flashing',
      'Prevents masonry water intrusion',
      'High-grade mortar seal',
      '10-Year leak-free guarantee',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Mark Reynolds',
    location: 'Melbourne Homeowner',
    rating: 5,
    comment: 'The team was honest, professional, and hands-on from the first inspection to the final repair. Clearly explained the issue, provided a fair quote, and completed the work exactly as promised.',
    project: 'Full Colorbond Roof Replacement',
    avatar: 'MR',
  },
  {
    name: 'Jennifer Troyer',
    location: 'Residential Client',
    rating: 5,
    comment: 'Highly impressed with their roofing expertise. They handled everything from roof repairs to structural improvements with precision. The project was completed on time and within budget.',
    project: 'Heritage Tile Restoration',
    avatar: 'JT',
  },
  {
    name: 'Lucy Smith',
    location: 'Commercial Property Manager',
    rating: 5,
    comment: 'Reliable and professional roofing contractors. They quickly identified the problem, fixed long-standing leaks, and reinforced the structure with durable, high-quality workmanship.',
    project: 'Commercial Metal Re-Roof',
    avatar: 'LS',
  },
  {
    name: 'John Smith',
    location: 'Brighton, VIC',
    rating: 5,
    comment: 'Outstanding quality and clean jobsite promise kept 100%. No nails or debris left behind, and the new roof looks fantastic. Very happy to recommend ASSIST Roofing!',
    project: 'Architectural Standing Seam',
    avatar: 'JS',
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Full Roof Strip & Structural Restoration',
    category: 'Roof Replacement',
    location: 'Melbourne, VIC',
    description: 'Complete roof strip-down to timber trusses, structural batten repairs, and insulation.',
    imageUrl: '/roofora-assets/images/portfolio-img1.jpg',
  },
  {
    id: 'proj-2',
    title: 'AS/NZS Sarking & Batten Installation',
    category: 'Roof Restoration',
    location: 'Melbourne, VIC',
    description: 'Heavy-duty vapor barrier sarking and treated timber battens installation compliant with AS/NZS 4200.1.',
    imageUrl: '/roofora-assets/images/portfolio-img2.jpg',
  },
  {
    id: 'proj-3',
    title: 'Structural Rafter Carpentry & Framing',
    category: 'Structural Repairs',
    location: 'Melbourne, VIC',
    description: 'Precision timber rafter reinforcement and structural framing carpentry on site.',
    imageUrl: '/roofora-assets/images/portfolio-img3.jpg',
  },
  {
    id: 'proj-4',
    title: 'Terracotta Ridge Capping Re-Pointing',
    category: 'Roof Repairs',
    location: 'Melbourne, VIC',
    description: 'Full ridge cap re-bedding with SupaPoint flexible weatherproof pointing compound.',
    imageUrl: '/roofora-assets/images/portfolio-img4.jpg',
  },
  {
    id: 'proj-5',
    title: 'Heritage Terracotta Roof Restoration',
    category: 'Roof Restoration',
    location: 'Melbourne, VIC',
    description: 'Complete ridge repointing, broken tile replacement, and weatherproofing under Melbourne conditions.',
    imageUrl: '/roofora-assets/images/portfolio-img5.jpg',
  },
  {
    id: 'proj-6',
    title: 'Precision Ridge Bedding & Mortar Seal',
    category: 'Roof Repairs',
    location: 'Melbourne, VIC',
    description: 'Precision alignment, flexible pointing seal, and weatherproofing on pitched terracotta capping.',
    imageUrl: '/roofora-assets/images/portfolio-img6.jpg',
  },
  {
    id: 'proj-7',
    title: 'Melbourne Residential Tile Re-Roofing',
    category: 'Roof Replacement',
    location: 'Camberwell, VIC',
    description: 'Full residential tile renewal with heavy-duty sarking and structural alignment.',
    imageUrl: '/roofora-assets/images/portfolio-img7.jpg',
  },
  {
    id: 'proj-8',
    title: 'Structural Timber Battens & Sarking',
    category: 'Roof Restoration',
    location: 'Hawthorn, VIC',
    description: 'Treated pine batten installation with precision spacing and AS/NZS weatherproofing wrap.',
    imageUrl: '/roofora-assets/images/portfolio-img8.jpg',
  },
  {
    id: 'proj-9',
    title: 'Precision Flashing & Valley Waterproofing',
    category: 'Roof Repairs',
    location: 'Brighton, VIC',
    description: 'Custom lead and Colorbond valley iron installation preventing storm water penetration.',
    imageUrl: '/roofora-assets/images/portfolio-img9.jpg',
  },
  {
    id: 'proj-10',
    title: 'High-Pitch Capping Bedding & Pointing',
    category: 'Roof Repairs',
    location: 'Kew, VIC',
    description: 'Specialist high-pitch terracotta re-pointing with SupaPoint compound and clean finishes.',
    imageUrl: '/roofora-assets/images/portfolio-img10.jpg',
  },
  {
    id: 'proj-11',
    title: 'Complete Roof Strip & Framing Upgrade',
    category: 'Roof Replacement',
    location: 'Malvern, VIC',
    description: 'Complete tear-down to framework, timber rafter reinforcement, and new roof foundation.',
    imageUrl: '/roofora-assets/images/portfolio-img11.jpg',
  },
  {
    id: 'proj-12',
    title: 'Melbourne Heritage Ridge Re-Pointing',
    category: 'Roof Restoration',
    location: 'Toorak, VIC',
    description: 'Heritage tile cleaning, mortar bedding renewal, and flexible color-matched pointing seal.',
    imageUrl: '/roofora-assets/images/portfolio-img12.jpg',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Boxy',
    role: 'Co-Founder & On-Site Project Director',
    bio: 'Personally on-site supervising every Melbourne roof restoration, pointing, and quality assurance check.',
    imageUrl: '/roofora-assets/images/team-person1.jpg',
  },
  {
    name: 'Peter',
    role: 'Co-Founder & Senior Estimator',
    bio: 'Expert in transparent quoting, AS 4349.1 structural inspections, and BlueScope Colorbond specification.',
    imageUrl: '/roofora-assets/images/team-person2.jpg',
  },
  {
    name: 'Licensed Field Carpentry Lead',
    role: 'Structural Framing & Rafter Specialist',
    bio: 'Specialist in heavy timber framing, sagging rafter correction, and AS/NZS sarking installations.',
    imageUrl: '/roofora-assets/images/team-person3.jpg',
  },
  {
    name: 'Master Tiler & Pointing Lead',
    role: 'Terracotta Restoration Specialist',
    bio: 'Dedicated master craftsman in precision mortar re-bedding and flexible SupaPoint weatherproof pointing.',
    imageUrl: '/roofora-assets/images/team-person4.jpg',
  },
];

export const FAQS = [
  {
    q: 'How quickly can you inspect my leaking roof?',
    a: 'We offer same-day emergency inspection for active leaks in our primary service areas, and standard inspections are completed within 24-48 hours with a full digital photo report.',
  },
  {
    q: 'Are your roofers fully licensed and insured?',
    a: 'Yes, 100%. All our roofing tradespeople hold full Victorian Building Authority (VBA) registration, working-at-heights certification, and $10M public liability insurance.',
  },
  {
    q: 'What is included in your Clean Jobsite Promise?',
    a: 'We use industrial magnetic sweepers to catch all loose screws and nails, protect your landscaping with heavy tarps, and remove all discarded materials in our own disposal trucks.',
  },
  {
    q: 'What warranty do you provide on new roofs and repairs?',
    a: 'We back all full roof replacements with a 10-year workmanship warranty plus manufacturer warranties of up to 25 years on Colorbond steel and premium tiles.',
  },
];

export const STATS = [
  { value: '2,500+', label: 'Projects Completed' },
  { value: '15+', label: 'Years Experience' },
  { value: '100%', label: 'Clean Jobsite Rate' },
  { value: '10yr', label: 'Workmanship Guarantee' },
  { value: '4.9/5', label: 'Customer Rating' },
];

export const SERVICE_AREAS = [
  'South Yarra', 'Brighton', 'Toorak', 'Hawthorn', 'Kew',
  'Camberwell', 'Malvern', 'Armadale', 'St Kilda', 'Richmond',
  'Prahran', 'Windsor', 'Glen Iris', 'Canterbury', 'Balwyn',
];

export interface ServiceOfferingItem {
  id: string;
  name: string;
  category: 'repairs' | 'replacement' | 'restoration' | 'gutters';
  categoryLabel: string;
  description: string;
  badge?: string;
  icon: string;
}

export const ALL_SERVICES_OFFERED: ServiceOfferingItem[] = [
  {
    id: 'roof-leak-repairs',
    name: 'Roof Leak Repairs',
    category: 'repairs',
    categoryLabel: 'Repairs & Leaks',
    description: 'Pinpoint emergency water leak detection, broken tile replacements, and weatherproof seal fixes.',
    badge: 'Urgent 24/7',
    icon: 'fa-solid fa-droplet-slash',
  },
  {
    id: 'roof-replacement',
    name: 'Roof Replacement',
    category: 'replacement',
    categoryLabel: 'Installation & Replacement',
    description: 'Complete tile-to-Colorbond or full roof strip-down & replacement with 10-year warranty.',
    badge: '10-Yr Warranty',
    icon: 'fa-solid fa-house-chimney',
  },
  {
    id: 'roof-repairs',
    name: 'Roof Repairs',
    category: 'repairs',
    categoryLabel: 'Repairs & Leaks',
    description: 'Fast, certified repair of cracked shingles, sagging battens, warped sheets, and valleys.',
    badge: 'Same-Day Dispatch',
    icon: 'fa-solid fa-screwdriver-wrench',
  },
  {
    id: 'new-roof-installation',
    name: 'New Roof Installation',
    category: 'replacement',
    categoryLabel: 'Installation & Replacement',
    description: 'Custom roof builds for new construction, extensions, and modern architectural Melbourne homes.',
    badge: 'AS 1562.1 Certified',
    icon: 'fa-solid fa-hammer',
  },
  {
    id: 'roof-leak-detection',
    name: 'Roof Leak Detection',
    category: 'repairs',
    categoryLabel: 'Repairs & Leaks',
    description: 'High-res drone survey and electronic moisture detection to trace invisible leak paths.',
    badge: 'Drone Survey',
    icon: 'fa-solid fa-magnifying-glass',
  },
  {
    id: 'roof-installation',
    name: 'Roof Installation',
    category: 'replacement',
    categoryLabel: 'Installation & Replacement',
    description: 'Expert residential and commercial installations built to highest Victorian Building Authority standards.',
    badge: 'Master Roofers',
    icon: 'fa-solid fa-trowel-bricks',
  },
  {
    id: 'storm-wind-damage-repair',
    name: 'Roof Repair For Storm & Wind Damage',
    category: 'repairs',
    categoryLabel: 'Repairs & Leaks',
    description: 'Emergency structural tarping, wind-blown sheet replacement, and rapid insurance report assessments.',
    badge: 'Insurance Ready',
    icon: 'fa-solid fa-cloud-bolt',
  },
  {
    id: 'roof-painting',
    name: 'Roof Painting',
    category: 'restoration',
    categoryLabel: 'Restoration & Painting',
    description: 'Multi-coat premium UV-reflective coating systems that protect against Australian sun & rain.',
    badge: 'UV Reflective',
    icon: 'fa-solid fa-paint-roller',
  },
  {
    id: 'tile-metal-roof-painting',
    name: 'Tile & Metal Roof Painting',
    category: 'restoration',
    categoryLabel: 'Restoration & Painting',
    description: 'Specialist primer and color restoration for faded terracotta, concrete tiles, and Colorbond steel.',
    badge: 'High Durability',
    icon: 'fa-solid fa-brush',
  },
  {
    id: 'garage-pergola-roofing',
    name: 'Garage & Pergola Roofing',
    category: 'replacement',
    categoryLabel: 'Installation & Replacement',
    description: 'Polycarbonate twin-wall and Colorbond roofing solutions for garages, carports, and outdoor pergolas.',
    badge: 'Custom Fit',
    icon: 'fa-solid fa-warehouse',
  },
  {
    id: 'roof-flashing',
    name: 'Roof Flashing',
    category: 'restoration',
    categoryLabel: 'Restoration & Painting',
    description: 'Lead, zinc, and apron flashing fabrication to stop water penetrating chimney and wall junctions.',
    badge: 'Leak Prevention',
    icon: 'fa-solid fa-shield-halved',
  },
  {
    id: 'roof-inspection',
    name: 'Roof Inspection',
    category: 'repairs',
    categoryLabel: 'Repairs & Leaks',
    description: 'Comprehensive AS 4349.1 condition report with high-res photographs and structural assessments.',
    badge: 'AS 4349.1 Standard',
    icon: 'fa-solid fa-clipboard-check',
  },
  {
    id: 'leaky-roof-maintenance',
    name: 'Leaky Roof Maintenance',
    category: 'repairs',
    categoryLabel: 'Repairs & Leaks',
    description: 'Preventative sealing, moss and debris clearing, and routine seasonal maintenance checks.',
    badge: 'Preventative',
    icon: 'fa-solid fa-wrench',
  },
  {
    id: 'concrete-tile-roof',
    name: 'Concrete Tile Roof',
    category: 'replacement',
    categoryLabel: 'Installation & Replacement',
    description: 'Specialist restoration, replacement, and structural batten repairs for concrete tile systems.',
    badge: 'Heavy Duty',
    icon: 'fa-solid fa-cubes',
  },
  {
    id: 'corrugated-iron-roof',
    name: 'Corrugated Iron Roof',
    category: 'replacement',
    categoryLabel: 'Installation & Replacement',
    description: 'Traditional and contemporary corrugated profiles with authentic Bluescope steel durability.',
    badge: 'Bluescope Steel',
    icon: 'fa-solid fa-layer-group',
  },
  {
    id: 'guttering-repair-new-guttering',
    name: 'Guttering Repair & New Guttering',
    category: 'gutters',
    categoryLabel: 'Gutters & Drainage',
    description: 'Full gutter renewals, bracket re-securing, and high-capacity quad or half-round gutter systems.',
    badge: 'Overflow Shield',
    icon: 'fa-solid fa-water',
  },
  {
    id: 'gutter-installation',
    name: 'Gutter Installation',
    category: 'gutters',
    categoryLabel: 'Gutters & Drainage',
    description: 'Precision fall alignment and custom-fitted guttering engineered for Melbourne rainfall intensity.',
    badge: 'Engineered Fall',
    icon: 'fa-solid fa-arrows-split-up-and-left',
  },
  {
    id: 'gutter-repairs',
    name: 'Gutter Repairs',
    category: 'gutters',
    categoryLabel: 'Gutters & Drainage',
    description: 'Seam re-soldering, corner joint leak sealing, rust treatment, and sagging gutter re-alignments.',
    badge: 'Quick Fix',
    icon: 'fa-solid fa-toolbox',
  },
  {
    id: 'colorbond-gutters',
    name: 'Colorbond Gutters',
    category: 'gutters',
    categoryLabel: 'Gutters & Drainage',
    description: 'Genuine Australian Colorbond gutters in 22 designer colors backed by 20-year material warranties.',
    badge: '22 Colors',
    icon: 'fa-solid fa-palette',
  },
  {
    id: 'gutters-and-downpipes',
    name: 'Gutters And Downpipes',
    category: 'gutters',
    categoryLabel: 'Gutters & Drainage',
    description: 'Complete stormwater drainage integration with high-flow PVC and Colorbond downpipes.',
    badge: 'High Flow',
    icon: 'fa-solid fa-arrows-down-to-line',
  },
  {
    id: 'bedding-and-repointing',
    name: 'Bedding And Repointing',
    category: 'restoration',
    categoryLabel: 'Restoration & Painting',
    description: 'Fresh sand-and-cement mortar re-bedding finished with flexible SupaPoint flexible polymer seal.',
    badge: 'Flexible Seal',
    icon: 'fa-solid fa-trowel',
  },
  {
    id: 'ridge-capping',
    name: 'Ridge Capping',
    category: 'restoration',
    categoryLabel: 'Restoration & Painting',
    description: 'Storm-resilient ridge cap realignment, cracked collar repairs, and 100% watertight pointing.',
    badge: 'Storm Locked',
    icon: 'fa-solid fa-mountain',
  },
  {
    id: 'fascia-eave-repair',
    name: 'Fascia & Eave Repair',
    category: 'gutters',
    categoryLabel: 'Gutters & Drainage',
    description: 'Rotted timber fascia replacement, metal fascia capping covers, and durable cement sheet eave lining.',
    badge: 'Structural Wood',
    icon: 'fa-solid fa-border-top-left',
  },
  {
    id: 'skylight-installation',
    name: 'Skylight Installation',
    category: 'gutters',
    categoryLabel: 'Gutters & Drainage',
    description: 'Leak-free Velux and custom skylight installations with insulated surrounds and solar flashing kits.',
    badge: 'Velux Certified',
    icon: 'fa-solid fa-sun',
  },
];

export const ALL_SERVICES_NAMES = ALL_SERVICES_OFFERED.map(s => s.name);

export const ADDITIONAL_OFFERINGS = [
  'Chimney Re-Flashing & Demolition',
  'Valley Iron & Gasket Replacement',
  'Whirlybird Roof Ventilation & Solar Vents',
  'Leaf Guard & Gutter Mesh Systems',
  'AS/NZS 4200.1 Heavy Duty Sarking Paper Upgrades',
  'Timber Rafter Carpentry & Structural Batten Straightening',
  'Box Gutter & Commercial Parapet Wall Flashing',
  'Insurance Storm & Hail Damage Scope Reports',
];


