import React, { useState, useEffect, lazy, Suspense } from 'react';
import { WebsiteApp } from './website/WebsiteApp';
import { CmsContentProvider } from './website/useCmsContent';

const AdminApp = lazy(() => import('./admin/AdminApp'));


export function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    // If user arrived with legacy #erp or ?view=erp, clean the URL
    if (window.location.hash === '#erp' || window.location.search.includes('view=erp')) {
      window.history.replaceState(null, '', '/admin');
      return true;
    }
    return window.location.pathname.startsWith('/admin');
  });

  useEffect(() => {
    // Purge any legacy ERP localStorage keys that old visitors might have cached
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('erp_user');
      localStorage.removeItem('erp_leads');
      localStorage.removeItem('erp_quotes');
    } catch {}

    const handleLocationChange = () => {
      // Legacy hash / query cleanup
      if (window.location.hash === '#erp' || window.location.search.includes('view=erp')) {
        window.history.replaceState(null, '', '/admin');
        setIsAdminRoute(true);
        return;
      }
      setIsAdminRoute(window.location.pathname.startsWith('/admin'));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (isAdminRoute) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#f19e1f] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <CmsContentProvider>
      <WebsiteApp />
    </CmsContentProvider>
  );
}

export default App;
