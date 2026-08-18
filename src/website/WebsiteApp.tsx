import React from 'react';
import { WebsiteProvider, useWebsite } from './WebsiteContext';
import { motion } from 'framer-motion';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';

const PageContent: React.FC = () => {
  const { currentPage } = useWebsite();

  return (
    <motion.div
      key={currentPage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      {(() => {
        switch (currentPage) {
          case 'home': return <Home />;
          case 'about': return <About />;
          case 'services': return <Services />;
          case 'gallery': return <Gallery />;
          case 'testimonials': return <Testimonials />;
          case 'contact': return <Contact />;
          case 'login': return <Login />;
          default: return <Home />;
        }
      })()}
    </motion.div>
  );
};

export const WebsiteApp: React.FC = () => {
  return (
    <WebsiteProvider>
      <div className="min-h-screen bg-white flex flex-col text-[#1e2e4f] font-['Sora',sans-serif]">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageContent />
        </main>
        <Footer />
      </div>
    </WebsiteProvider>
  );
};
