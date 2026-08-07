import { NavLink, ServiceItem, TestimonialItem, GalleryProject, TeamMember } from './types';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    icon: '🏠',
    title: 'Roof Replacement',
    description: 'Complete roof replacement using premium Colorbond and tile materials for maximum durability and aesthetic appeal.',
    features: ['Full tear-off & disposal', 'Premium materials', 'Up to 25-year warranty', 'AS 4349.1 compliant'],
  },
  {
    icon: '🔧',
    title: 'Roof Restoration',
    description: 'Breathe new life into your aging roof with comprehensive cleaning, repairing, repointing and recoating services.',
    features: ['High-pressure cleaning', 'Re-pointing & bedding', 'Flexible coating system', 'Colour consultation'],
  },

  {
    icon: '🛠️',
    title: 'Roof Repairs',
    description: 'Fast, reliable emergency and scheduled roof repairs to stop leaks and restore structural integrity.',
    features: ['Storm damage repair', 'Leak detection', 'Flashing replacement', 'Same-day service'],
  },
  {
    icon: '⚡',
    title: 'Metal Roofing',
    description: 'Premium standing seam and corrugated metal roofing solutions with marine-grade corrosion protection.',
    features: ['Colorbond range', 'Standing seam profiles', 'Coastal-grade options', 'Energy efficient'],
  },
  {
    icon: '🧱',
    title: 'Tile Roofing',
    description: 'Traditional and modern concrete & terracotta tile installation, repairs and full restorations.',
    features: ['Concrete & terracotta', 'Valley replacement', 'Ridge capping', 'Sarking upgrades'],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Marcus Vance',
    location: 'South Yarra, VIC',
    rating: 5,
    comment: 'ASSIST completely transformed our roof after storm damage. The AI qualification was lightning fast, and Batshal\'s crew had us watertight within 3 days. Exceptional quality and communication throughout.',
    project: 'Full Colorbond Roof Replacement',
    avatar: 'MV',
  },
  {
    name: 'Sarah Jenkins',
    location: 'Brighton, VIC',
    rating: 5,
    comment: 'From the initial drone inspection to the final sign-off, everything was handled with incredible professionalism. The terracotta restoration looks absolutely stunning. Highly recommend!',
    project: 'Terracotta Tile Restoration',
    avatar: 'SJ',
  },
  {
    name: 'David Miller',
    location: 'Hawthorn, VIC',
    rating: 5,
    comment: 'Best roofing experience I\'ve ever had. The 3-tier quoting system made it easy to choose, and the crew was respectful and tidy. The 10-year workmanship warranty gives real peace of mind.',
    project: 'Metal Roof & Guttering',
    avatar: 'DM',
  },
  {
    name: 'Emily Chen',
    location: 'Kew, VIC',
    rating: 5,
    comment: 'We chose the premium standing seam option and it\'s absolutely breathtaking. ASSIST\'s attention to detail is second to none. Our neighbors keep asking who did our roof!',
    project: 'Architectural Standing Seam',
    avatar: 'EC',
  },
  {
    name: 'Robert Williams',
    location: 'Camberwell, VIC',
    rating: 4,
    comment: 'Very professional team. The instant quote calculator on their website was impressively accurate. Final cost came in exactly as estimated. Would definitely use again.',
    project: 'Roof Replacement + Insulation',
    avatar: 'RW',
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Modern Colorbond Replacement',
    category: 'Roof Replacement',
    location: 'South Yarra, VIC',
    description: 'Full roof replacement with Colorbond Custom Orb in Monument Grey. Included R4.0 insulation and heavy-duty sarking.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&auto=format&fit=crop',
  },
  {
    id: 'proj-2',
    title: 'Heritage Tile Restoration',
    category: 'Roof Restoration',
    location: 'Brighton, VIC',
    description: 'Complete terracotta tile restoration including repointing, ridge capping, and flexible membrane coating.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop',
  },
  {
    id: 'proj-3',
    title: 'Standing Seam Architectural',
    category: 'Metal Roofing',
    location: 'Toorak, VIC',
    description: 'Premium European standing seam profile with concealed fasteners and architectural finish.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
  },
  {
    id: 'proj-4',
    title: 'Emergency Storm Repair',
    category: 'Roof Repairs',
    location: 'Hawthorn, VIC',
    description: 'Emergency storm damage repair completed within 24 hours. Replaced damaged sheets and flashing.',
    imageUrl: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&auto=format&fit=crop',
  },
  {
    id: 'proj-5',
    title: 'Coastal Colorbond Ultra',
    category: 'Metal Roofing',
    location: 'St Kilda, VIC',
    description: 'Marine-grade Colorbond Ultra installation for coastal property with high-salinity corrosion protection.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
  },

];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Batshal',
    role: 'Founder & Lead Inspector',
    bio: 'With over 15 years in the Australian roofing industry, Batshal leads every major project with hands-on expertise and an unwavering commitment to quality.',
    imageUrl: '',
  },
  {
    name: 'Peter',
    role: 'Sales & Estimations Director',
    bio: 'Peter brings 10+ years of construction estimation experience, ensuring every quote is accurate, transparent, and competitively priced.',
    imageUrl: '',
  },
  {
    name: 'Team ASSIST',
    role: 'Licensed Roofing Crew',
    bio: 'Our 12-person crew holds all relevant VBA and OHS certifications. Every team member is trained in height safety and quality workmanship standards.',
    imageUrl: '',
  },
];

export const STATS = [
  { value: '2,500+', label: 'Projects Completed' },
  { value: '15+', label: 'Years Experience' },
  { value: '5.0', label: 'Google Rating', isStar: true },
  { value: '100%', label: 'Licensed & Insured' },
];

export const SERVICE_AREAS = [
  'South Yarra', 'Brighton', 'Toorak', 'Hawthorn', 'Kew',
  'Camberwell', 'Malvern', 'Armadale', 'St Kilda', 'Richmond',
  'Prahran', 'Windsor', 'Glen Iris', 'Canterbury', 'Balwyn',
];
