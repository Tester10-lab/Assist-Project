import React, { useState, useEffect } from 'react';
import { WebsiteApp } from './website/WebsiteApp';
import { ERPApp } from './ERPApp';
import { ERPProvider } from './context/ERPContext';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  return (
    <ERPProvider>
      {isAuthenticated ? <ERPApp /> : <WebsiteApp />}
    </ERPProvider>
  );
}

export default App;
