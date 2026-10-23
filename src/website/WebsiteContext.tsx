import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { PageId, CoreServiceSlug } from './types';
import {
  getForwardingPhoneNumber,
  subscribeForwardingPhoneNumber,
  syncDOMPhoneNumbers,
  type PhoneNumberState
} from './utils/tracking';

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
  modalMode: 'callback' | 'quote';
  initialServiceForQuote?: string;
  openQuoteModal: (serviceOrEvent?: string | React.MouseEvent<any> | any, mode?: 'callback' | 'quote') => void;
  openCallbackModal: (service?: string) => void;
  closeQuoteModal: () => void;
  lightboxData: LightboxData | null;
  openLightbox: (data: LightboxData) => void;
  closeLightbox: () => void;
  displayPhone: string;
  telHref: string;
  isForwardingNumber: boolean;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = typeof window !== 'undefined' ? parsePathname(window.location.pathname) : { page: 'home' as PageId, serviceSlug: null };
  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);
  const [currentServiceSlug, setCurrentServiceSlug] = useState<CoreServiceSlug | null>(initial.serviceSlug);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'callback' | 'quote'>('quote');
  const [initialServiceForQuote, setInitialServiceForQuote] = useState<string | undefined>(undefined);
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);
  const [phoneState, setPhoneState] = useState<PhoneNumberState>(() => getForwardingPhoneNumber());

  useEffect(() => {
    const unsubscribe = subscribeForwardingPhoneNumber((newState) => {
      setPhoneState(newState);
      syncDOMPhoneNumbers(newState.display, newState.tel);
    });
    return unsubscribe;
  }, []);

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

      // Run syncDOMPhoneNumbers across next tick and layout render to catch newly mounted elements
      requestAnimationFrame(() => {
        syncDOMPhoneNumbers();
      });
      setTimeout(() => {
        syncDOMPhoneNumbers();
      }, 50);
      setTimeout(() => {
        syncDOMPhoneNumbers();
      }, 300);
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
      requestAnimationFrame(() => {
        syncDOMPhoneNumbers();
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openQuoteModal = (serviceOrEvent?: string | React.MouseEvent<any> | any, mode: 'callback' | 'quote' = 'quote') => {
    if (typeof serviceOrEvent === 'string') {
      setInitialServiceForQuote(serviceOrEvent);
    } else {
      setInitialServiceForQuote(undefined);
    }
    setModalMode(mode);
    setIsQuoteModalOpen(true);
  };

  const openCallbackModal = (service?: string) => {
    openQuoteModal(service, 'callback');
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setInitialServiceForQuote(undefined);
  };

  const openLightbox = (data: LightboxData) => setLightboxData(data);
  const closeLightbox = () => setLightboxData(null);

  // Initialize WOW.js and sync phone DOM on page changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).WOW) {
        new (window as any).WOW().init();
      }
      syncDOMPhoneNumbers();
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
      modalMode,
      initialServiceForQuote,
      openQuoteModal,
      openCallbackModal,
      closeQuoteModal,
      lightboxData,
      openLightbox,
      closeLightbox,
      displayPhone: phoneState.display,
      telHref: `tel:${phoneState.tel}`,
      isForwardingNumber: phoneState.isForwarding
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

export interface AppLocation {
  pathname: string;
  search: string;
  hash: string;
}

export const useLocation = (): AppLocation => {
  const [location, setLocation] = useState<AppLocation>(() => ({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : ''
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLocationChange = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
      syncDOMPhoneNumbers();
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return location;
};


