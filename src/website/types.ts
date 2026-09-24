export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'gallery'
  | 'testimonials'
  | 'contact';

export type CoreServiceSlug =
  | 'roof-restoration'
  | 'roof-repairs'
  | 'roof-replacement'
  | 'colorbond-roofing'
  | 'guttering'
  | 'leak-detection';

export interface NavLink {
  id: PageId;
  label: string;
  path?: string;
  serviceSlug?: CoreServiceSlug;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  comment: string;
  project: string;
  avatar: string;
  imageUrl?: string;
}

export interface GoogleReviewItem {
  id: string;
  name: string;
  suburb: string;
  avatarBg: string;
  avatarInitials: string;
  rating: number;
  timeAgo: string;
  project: string;
  comment: string;
  verified: boolean;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}
