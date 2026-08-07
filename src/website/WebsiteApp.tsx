import React from 'react';
import { WebsiteProvider, useWebsite } from './WebsiteContext';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Calculator } from './pages/Calculator';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';

const PageContent: React.FC = () => {
  const { currentPage } = useWebsite();

  switch (currentPage) {
    case 'home':
      return <Home />;
    case 'about':
      return <About />;
    case 'services':
      return <Services />;
    case 'calculator':
      return <Calculator />;
    case 'gallery':
      return <Gallery />;
    case 'testimonials':
      return <Testimonials />;
    case 'contact':
      return <Contact />;
    default:
      return <Home />;
  }
};

export const WebsiteApp: React.FC = () => {
  return (
    <WebsiteProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-body text-slate-900 selection:bg-brand-500/30 selection:text-brand-900">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageContent />
        </main>
        <Footer />
      </div>
    </WebsiteProvider>
  );
};
