import React, { useState, useEffect } from 'react';
import { WebsiteApp } from './website/WebsiteApp';
import { ERPApp } from './ERPApp';
import { ERPProvider } from './context/ERPContext';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [currentView, setCurrentView] = useState<'website' | 'erp'>(() => {
    if (window.location.hash === '#erp' || window.location.search.includes('view=erp')) {
      return 'erp';
    }
    // Default to website view
    return 'website';
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const auth = !!localStorage.getItem('authToken');
      setIsAuthenticated(auth);
      if (auth) {
        setCurrentView('erp');
      } else {
        setCurrentView('website');
      }
    };

    const handleSwitchView = (e: any) => {
      if (e.detail === 'erp' || e.detail === 'website') {
        setCurrentView(e.detail);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#erp') {
        setCurrentView('erp');
      } else if (window.location.hash === '#website') {
        setCurrentView('website');
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('switch-view', handleSwitchView);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('switch-view', handleSwitchView);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <ERPProvider>
      {currentView === 'erp' && isAuthenticated ? (
        <ERPApp />
      ) : (
        <WebsiteApp />
      )}
    </ERPProvider>
  );
}

export default App;

