import React, { useState, useEffect } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminLayout, AdminSection } from './components/AdminLayout';
import { AdminLogin } from './pages/AdminLogin';
import { Dashboard } from './pages/Dashboard';
import { PagesManager } from './pages/PagesManager';
import { ServicesManager } from './pages/ServicesManager';
import { LocationsManager } from './pages/LocationsManager';
import { BlogManager } from './pages/BlogManager';
import { MediaLibrary } from './pages/MediaLibrary';
import { SeoManager } from './pages/SeoManager';
import { SiteSettings } from './pages/SiteSettings';
import { UsersManager } from './pages/UsersManager';
import { ActivityLog } from './pages/ActivityLog';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const pathToSection = (path: string): AdminSection | 'login' | '404' => {
  const clean = path.replace(/\/+$/, '');
  if (clean === '/admin' || clean === '/admin/dashboard') return 'dashboard';
  if (clean === '/admin/login') return 'login';
  if (clean === '/admin/pages') return 'pages';
  if (clean === '/admin/services') return 'services';
  if (clean === '/admin/locations') return 'locations';
  if (clean === '/admin/blog') return 'blog';
  if (clean === '/admin/media') return 'media';
  if (clean === '/admin/seo') return 'seo';
  if (clean === '/admin/settings') return 'settings';
  if (clean === '/admin/users') return 'users';
  if (clean === '/admin/activity') return 'activity';
  return '404';
};

const sectionToPath = (section: AdminSection): string => {
  return `/admin/${section}`;
};

const AdminContent: React.FC = () => {
  const { isAuthenticated, isLoading, isAdmin } = useAdminAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    document.title = 'Assist Roofing CMS | Administration';
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (section: AdminSection) => {
    const newPath = sectionToPath(section);
    window.history.pushState(null, '', newPath);
    setCurrentPath(newPath);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-[#f19e1f] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verifying session...</p>
        </div>
      </div>
    );
  }

  // If unauthenticated: redirect any admin route to login
  if (!isAuthenticated) {
    if (window.location.pathname !== '/admin/login') {
      window.history.replaceState(null, '', '/admin/login');
    }
    return <AdminLogin />;
  }

  // If authenticated and on /admin or /admin/login: redirect to /admin/dashboard
  const section = pathToSection(currentPath);
  if (section === 'login' || currentPath.replace(/\/+$/, '') === '/admin') {
    window.history.replaceState(null, '', '/admin/dashboard');
    return (
      <AdminLayout currentSection="dashboard" onNavigate={navigateTo}>
        <Dashboard onNavigate={navigateTo} />
      </AdminLayout>
    );
  }

  if (section === '404') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Page Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">
            The requested admin route "{currentPath}" does not exist in this CMS.
          </p>
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-5 py-2.5 bg-[#1e2e4f] text-white rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  // RBAC checks
  if ((section === 'users' || section === 'settings') && !isAdmin) {
    return (
      <AdminLayout currentSection={section} onNavigate={navigateTo}>
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 mb-1">Access Denied</h3>
          <p className="text-xs text-slate-500 mb-4">
            You do not have permission to view or edit this section. Administrator privileges required.
          </p>
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-4 py-2 bg-[#1e2e4f] text-white rounded-xl text-xs font-bold"
          >
            Go to Dashboard
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentSection={section} onNavigate={navigateTo}>
      {section === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
      {section === 'pages' && <PagesManager />}
      {section === 'services' && <ServicesManager />}
      {section === 'locations' && <LocationsManager />}
      {section === 'blog' && <BlogManager />}
      {section === 'media' && <MediaLibrary />}
      {section === 'seo' && <SeoManager />}
      {section === 'settings' && <SiteSettings />}
      {section === 'users' && <UsersManager />}
      {section === 'activity' && <ActivityLog />}
    </AdminLayout>
  );
};

export const AdminApp: React.FC = () => {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
};

export default AdminApp;
