import React, { useEffect } from 'react';
import { WebsiteProvider, useWebsite } from './WebsiteContext';
import { useCmsContent } from './useCmsContent';
import { motion } from 'framer-motion';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';

const SeoSync: React.FC = () => {
  const { currentPage } = useWebsite();
  const { pages, seo } = useCmsContent();

  useEffect(() => {
    const pageData = pages?.[currentPage];

    // 1. Dynamic Title
    if (pageData?.seoTitle) {
      document.title = pageData.seoTitle;
    } else if (seo?.siteTitle && currentPage === 'home') {
      document.title = seo.siteTitle;
    } else {
      const titles: Record<string, string> = {
        home: 'Roofing Contractor & Roof Restoration Melbourne | Assist Roofing',
        about: 'About Us | Assist Roofing Melbourne',
        services: 'All Roofing Services Melbourne | Repairs, Restoration & Re-Roofing | Assist Roofing',
        gallery: 'Roofing Project Gallery Melbourne | Before & After Photos | Assist Roofing',
        testimonials: 'Customer Reviews & Testimonials | Assist Roofing Melbourne',
        contact: 'Contact Assist Roofing Melbourne | Book Free Roof Inspection'
      };
      document.title = titles[currentPage] || 'Assist Roofing & Home Solution';
    }

    // 2. Meta Description
    const desc = pageData?.metaDescription || seo?.defaultMetaDescription;
    if (desc) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);
    }

    // 3. Canonical Link
    if (pageData?.canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', pageData.canonical);
    }

    // 4. Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', pageData?.noIndex ? 'noindex, nofollow' : 'index, follow');

    // 5. OpenGraph Tags
    const ogTitle = pageData?.seoTitle || document.title;
    const ogDesc = pageData?.metaDescription || seo?.defaultMetaDescription;
    const ogImg = pageData?.ogImage || seo?.defaultOgImage;

    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (metaOgTitle && ogTitle) metaOgTitle.setAttribute('content', ogTitle);

    let metaOgDesc = document.querySelector('meta[property="og:description"]');
    if (metaOgDesc && ogDesc) metaOgDesc.setAttribute('content', ogDesc);

    let metaOgImg = document.querySelector('meta[property="og:image"]');
    if (metaOgImg && ogImg) metaOgImg.setAttribute('content', ogImg);

  }, [currentPage, pages, seo]);

  return null;
};

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
          default: return <Home />;
        }
      })()}
    </motion.div>
  );
};

export const WebsiteApp: React.FC = () => {
  return (
    <WebsiteProvider>
      <SeoSync />
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
