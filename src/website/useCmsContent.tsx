import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_SERVICES_OFFERED as fallbackServices } from './data';

interface PublicCmsContent {
  services: any[];
  pages: Record<string, any>;
  locations: any[];
  blog: any[];
  seo: any;
  settings: any;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

const defaultContent: PublicCmsContent = {
  services: fallbackServices,
  pages: {},
  locations: [],
  blog: [],
  seo: null,
  settings: {
    business: {
      phone: '0478936120',
      email: 'info@assistroofing.com.au',
      address: '139 Boundary Road, North Melbourne VIC 3051',
      name: 'Assist Roofing & Home Solution'
    }
  },
  isLoading: true,
  refreshContent: async () => {}
};

const CmsContext = createContext<PublicCmsContent>(defaultContent);

export const CmsContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<PublicCmsContent>(defaultContent);

  const fetchContent = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || '/api';
      let data = null;

      // First try live server API
      const res = await fetch(`${API_BASE}/public/content`).catch(() => null);
      if (res && res.ok) {
        data = await res.json();
      } else {
        // Fallback to static snapshot in public/data/cms-content.json
        const fallbackRes = await fetch('/data/cms-content.json').catch(() => null);
        if (fallbackRes && fallbackRes.ok) {
          data = await fallbackRes.json();
        }
      }

      if (data) {
        setContent({
          services: data.services && data.services.length > 0 ? data.services : fallbackServices,
          pages: data.pages || {},
          locations: data.locations || [],
          blog: data.blog || [],
          seo: data.seo || null,
          settings: data.settings || defaultContent.settings,
          isLoading: false,
          refreshContent: fetchContent
        });
      } else {
        setContent(prev => ({ ...prev, isLoading: false, refreshContent: fetchContent }));
      }
    } catch (err) {
      console.warn('[CMS Sync] Could not fetch remote CMS content, using bundled defaults:', err);
      setContent(prev => ({ ...prev, isLoading: false, refreshContent: fetchContent }));
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <CmsContext.Provider value={content}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCmsContent = () => useContext(CmsContext);
