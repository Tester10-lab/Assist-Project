export type PageId = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'gallery' 
  | 'testimonials' 
  | 'contact'
  | 'login';

export interface NavLink {
  id: PageId;
  label: string;
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
