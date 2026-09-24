import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { PageId, CoreServiceSlug } from './types';

interface LightboxData {
  src: string;
  title: string;
  subtitle?: string;
}

export function getHrefForRoute(page: PageId, serviceSlug?: CoreServiceSlug | null): string {
  if (page === 'home') return '/';
  if (page === 'about') return '/about';
  if (page === 'services') {
    return serviceSlug ? `/services/${serviceSlug}` : '/services';
  }
  if (page === 'gallery') return '/projects';
  if (page === 'testimonials') return '/testimonials';
  if (page === 'contact') return '/contact';
  return '/';
}

export function parsePathname(pathname: string): { page: PageId; serviceSlug: CoreServiceSlug | null } {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'home') return { page: 'home', serviceSlug: null };
  if (clean === 'about') return { page: 'about', serviceSlug: null };
  if (clean === 'services') return { page: 'services', serviceSlug: null };
  if (clean.startsWith('services/')) {
    const slug = clean.split('/')[1] as CoreServiceSlug;
    const validSlugs: CoreServiceSlug[] = [
      'roof-restoration',
      'roof-repairs',
      'roof-replacement',
      'colorbond-roofing',
      'guttering',
      'leak-detection'
    ];
    if (validSlugs.includes(slug)) {
      return { page: 'services', serviceSlug: slug };
    }
    return { page: 'services', serviceSlug: null };
  }
  if (clean === 'projects' || clean === 'gallery') return { page: 'gallery', serviceSlug: null };
  if (clean === 'testimonials' || clean === 'reviews') return { page: 'testimonials', serviceSlug: null };
  if (clean === 'contact') return { page: 'contact', serviceSlug: null };
  return { page: 'home', serviceSlug: null };
}

interface WebsiteContextType {
  currentPage: PageId;
  currentServiceSlug: CoreServiceSlug | null;
  setCurrentPage: (page: PageId) => void;
  navigateTo: (page: PageId, serviceSlug?: CoreServiceSlug | null) => void;
  getHref: (page: PageId, serviceSlug?: CoreServiceSlug | null) => string;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  initialServiceForQuote?: string;
  openQuoteModal: (serviceOrEvent?: string | React.MouseEvent<any> | any) => void;
  closeQuoteModal: () => void;
  lightboxData: LightboxData | null;
  openLightbox: (data: LightboxData) => void;
  closeLightbox: () => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = typeof window !== 'undefined' ? parsePathname(window.location.pathname) : { page: 'home' as PageId, serviceSlug: null };
  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);
  const [currentServiceSlug, setCurrentServiceSlug] = useState<CoreServiceSlug | null>(initial.serviceSlug);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [initialServiceForQuote, setInitialServiceForQuote] = useState<string | undefined>(undefined);
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  const navigateTo = useCallback((page: PageId, serviceSlug?: CoreServiceSlug | null) => {
    setCurrentPage(page);
    setCurrentServiceSlug(serviceSlug || null);
    setMobileMenuOpen(false);

    if (typeof window !== 'undefined') {
      const targetPath = getHrefForRoute(page, serviceSlug);
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Backward compatible setCurrentPage helper
  const handleSetCurrentPage = useCallback((page: PageId) => {
    navigateTo(page, null);
  }, [navigateTo]);

  // Sync browser popstate (back / forward buttons)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const parsed = parsePathname(window.location.pathname);
      setCurrentPage(parsed.page);
      setCurrentServiceSlug(parsed.serviceSlug);
      setMobileMenuOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openQuoteModal = (serviceOrEvent?: string | React.MouseEvent<any> | any) => {
    if (typeof serviceOrEvent === 'string') {
      setInitialServiceForQuote(serviceOrEvent);
    } else {
      setInitialServiceForQuote(undefined);
    }
    setIsQuoteModalOpen(true);
  };
  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setInitialServiceForQuote(undefined);
  };

  const openLightbox = (data: LightboxData) => setLightboxData(data);
  const closeLightbox = () => setLightboxData(null);

  // Initialize WOW.js on page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).WOW) {
      new (window as any).WOW().init();
    }
  }, [currentPage, currentServiceSlug]);

  return (
    <WebsiteContext.Provider value={{
      currentPage,
      currentServiceSlug,
      setCurrentPage: handleSetCurrentPage,
      navigateTo,
      getHref: getHrefForRoute,
      isMobileMenuOpen,
      setMobileMenuOpen,
      isQuoteModalOpen,
      initialServiceForQuote,
      openQuoteModal,
      closeQuoteModal,
      lightboxData,
      openLightbox,
      closeLightbox
    }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) throw new Error('useWebsite must be used within WebsiteProvider');
  return context;
};

