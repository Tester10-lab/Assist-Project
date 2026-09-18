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

