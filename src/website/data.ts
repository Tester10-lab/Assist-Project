import { NavLink, ServiceItem, TestimonialItem, GalleryProject, TeamMember } from './types';

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
    title: 'Emergency Roof Repair',
    description: 'Rapid response leak fixes, storm damage stabilization, and flashing repairs by certified roofing experts.',
    features: ['24/7 Emergency dispatch', 'Direct leak diagnosis', 'Storm recovery guarantee', 'Same-day patching'],
    imageUrl: '/roofora-assets/images/services-img1.jpg',
  },
  {
    icon: '/roofora-assets/images/service-icon2.png',
    title: 'Full Re-Roofing & Replacement',
    description: 'Complete tear-off and replacement with premium Colorbond metal and architectural tiles built to last.',
    features: ['High-tensile steel & tiles', 'Thermal insulation upgrade', '10-Year workmanship warranty', 'Zero site mess guarantee'],
    imageUrl: '/roofora-assets/images/services-img2.jpg',
  },
  {
    icon: '/roofora-assets/images/service-icon3.png',
    title: 'Roof Inspection & Diagnosis',
    description: 'Comprehensive digital attic-to-ridge inspection with detailed photo reporting and transparent cost estimates.',
    features: ['Infrared moisture scan', 'Structural truss check', 'Gutter & valley audit', 'Written condition report'],
    imageUrl: '/roofora-assets/images/services-img3.jpg',
  },
  {
    icon: '/roofora-assets/images/service-icon4.png',
    title: 'Gutters & Chimney Flashing',
    description: 'Heavy duty seamless gutter systems, downpipes, and lead/zinc custom chimney flashings.',
    features: ['Seamless box gutters', 'Lead & zinc flashing', 'Leaf guard protection', 'Downpipe replacement'],
    imageUrl: '/roofora-assets/images/services-img4.jpg',
  },
];

export const PRICING_PLANS = [
  {
    id: 'p1',
    icon: '/roofora-assets/images/price-icon1.png',
    title: 'Leak Diagnosis',
    subtitle: 'Credited toward your repair if you hire us.',
    price: '99',
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
    price: '249',
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
    price: '550',
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
    imageUrl: '/roofora-assets/images/client-img2.jpg',
  },
  {
    name: 'Jennifer Troyer',
    location: 'Residential Client',
    rating: 5,
    comment: 'Highly impressed with their roofing expertise. They handled everything from roof repairs to structural improvements with precision. The project was completed on time and within budget.',
    project: 'Heritage Tile Restoration',
    avatar: 'JT',
    imageUrl: '/roofora-assets/images/client-img1.jpg',
  },
  {
    name: 'Lucy Smith',
    location: 'Commercial Property Manager',
    rating: 5,
    comment: 'Reliable and professional roofing contractors. They quickly identified the problem, fixed long-standing leaks, and reinforced the structure with durable, high-quality workmanship.',
    project: 'Commercial Metal Re-Roof',
    avatar: 'LS',
    imageUrl: '/roofora-assets/images/client-img3.jpg',
  },
  {
    name: 'John Smith',
    location: 'Brighton, VIC',
    rating: 5,
    comment: 'Outstanding quality and clean jobsite promise kept 100%. No nails or debris left behind, and the new roof looks fantastic. Very happy to recommend ASSIST Roofing!',
    project: 'Architectural Standing Seam',
    avatar: 'JS',
    imageUrl: '/roofora-assets/images/client-img4.jpg',
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Modern Residential Re-Roof',
    category: 'Roof Replacement',
    location: 'South Yarra, VIC',
    description: 'Full standing seam Colorbond replacement with acoustic insulation.',
    imageUrl: '/roofora-assets/images/portfolio-img1.jpg',
  },
  {
    id: 'proj-2',
    title: 'Heritage Tile Restoration',
    category: 'Roof Restoration',
    location: 'Brighton, VIC',
    description: 'Complete high-pressure cleaning, repointing, and weatherproof coating.',
    imageUrl: '/roofora-assets/images/portfolio-img2.jpg',
  },
  {
    id: 'proj-3',
    title: 'Standing Seam Metal Roof',
    category: 'Metal Roofing',
    location: 'Toorak, VIC',
    description: 'Architectural conceal-fixed standing seam metal roof in Monument finish.',
    imageUrl: '/roofora-assets/images/portfolio-img3.jpg',
  },
  {
    id: 'proj-4',
    title: 'Storm Damage Emergency Repair',
    category: 'Roof Repairs',
    location: 'Hawthorn, VIC',
    description: 'Emergency patch and full valley replacement within 24 hours.',
    imageUrl: '/roofora-assets/images/portfolio-img4.jpg',
  },
  {
    id: 'proj-5',
    title: 'Commercial Complex Roof',
    category: 'Commercial Roofing',
    location: 'Richmond, VIC',
    description: 'Heavy duty insulated roofing with custom commercial box gutters.',
    imageUrl: '/roofora-assets/images/portfolio-img5.jpg',
  },
  {
    id: 'proj-6',
    title: 'Custom Chimney Flashing & Cap',
    category: 'Roof Repairs',
    location: 'Kew, VIC',
    description: 'Precision lead counter-flashing replacement and ridge sealing.',
    imageUrl: '/roofora-assets/images/portfolio-img6.jpg',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'David Reynolds',
    role: 'Master Roofer & Operations Lead',
    bio: 'Over 16 years leading residential and commercial roofing projects with flawless safety record.',
    imageUrl: '/roofora-assets/images/team-person1.jpg',
  },
  {
    name: 'Michael Carter',
    role: 'Senior Project Estimator',
    bio: 'Specialist in structural audits, accurate itemized scoping, and insurance compliance.',
    imageUrl: '/roofora-assets/images/team-person2.jpg',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Client Success Manager',
    bio: 'Ensuring clear daily communication from initial drone inspection to final handover.',
    imageUrl: '/roofora-assets/images/team-person3.jpg',
  },
  {
    name: 'James Walker',
    role: 'Lead Sheet Metal Fabricator',
    bio: 'Expert in custom flashings, standing seam folds, and heritage architectural roofing.',
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
    a: 'Yes, 100%. All our roofing tradespeople hold full Victorian Building Authority (VBA) registration, working-at-heights certification, and $20M public liability insurance.',
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

