export type UserRole = 'admin' | 'editor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  mustChangePassword?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  heroHeading: string;
  heroDescription: string;
  heroImage: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
  canonical: string;
  ogImage: string;
  noIndex: boolean;
  updatedAt: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: 'repairs' | 'replacement' | 'restoration' | 'gutters';
  categoryLabel?: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  icon: string;
  badge?: string;
  features: string[];
  benefits: string[];
  faqs: ServiceFAQ[];
  seoTitle: string;
  metaDescription: string;
  status: 'published' | 'draft';
  order: number;
}

export interface LocationItem {
  id: string;
  name: string;
  slug: string;
  pageTitle: string;
  intro: string;
  localContent: string;
  services: string[];
  images: string[];
  faqs: ServiceFAQ[];
  seoTitle: string;
  metaDescription: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'published' | 'draft';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  seoTitle: string;
  metaDescription: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  altText: string;
  caption: string;
  mimeType: string;
  size: number;
  dimensions?: string;
  createdAt: string;
}

export interface SeoSettings {
  siteTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  robotsIndex: boolean;
  sitemapUrl: string;
  gscVerification: string;
  businessSchema: {
    name: string;
    phone: string;
    email: string;
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
    priceRange: string;
    ratingValue: string;
    reviewCount: string;
  };
}

export interface SiteSettings {
  business: {
    name: string;
    legalName: string;
    phone: string;
    internationalPhone: string;
    email: string;
    address: string;
    hoursWeekday: string;
    hoursWeekend: string;
  };
  branding: {
    logoUrl: string;
    footerLogoUrl: string;
    faviconUrl: string;
  };
  social: {
    facebook: string;
    instagram: string;
    googleMaps: string;
  };
  tracking: {
    ga4Id: string;
    elfsightEnabled: boolean;
  };
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  details: string;
}

export interface DashboardMetrics {
  pages: { total: number; published: number; draft: number };
  services: { total: number; published: number };
  locations: { total: number; published: number };
  blog: { total: number; published: number };
  media: { total: number };
  users: { total: number };
}
