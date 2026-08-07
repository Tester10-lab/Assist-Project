import React, { createContext, useContext, useState } from 'react';
import type { PageId } from './types';

interface WebsiteContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <WebsiteContext.Provider value={{ 
      currentPage, 
      setCurrentPage: navigateTo, 
      isMobileMenuOpen, 
      setMobileMenuOpen 
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
