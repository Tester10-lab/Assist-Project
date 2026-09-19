import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PageId } from './types';

interface LightboxData {
  src: string;
  title: string;
  subtitle?: string;
}

interface WebsiteContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
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
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [initialServiceForQuote, setInitialServiceForQuote] = useState<string | undefined>(undefined);
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  }, [currentPage]);

  return (
    <WebsiteContext.Provider value={{ 
      currentPage, 
      setCurrentPage: navigateTo, 
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

