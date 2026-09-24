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
import { CORE_SERVICES_DATA } from './servicesData';

const BASE_URL = 'https://assistroofing.com.au';

const SeoSync: React.FC = () => {
  const { currentPage, currentServiceSlug } = useWebsite();
  const { pages, seo } = useCmsContent();

  useEffect(() => {
    let title = 'Roofing Contractor & Roof Restoration Melbourne | Assist Roofing';
    let description = "Melbourne's licensed roofing contractor for Colorbond restorations, emergency leak repairs & inspections. VBA registered, 10-year warranty. Free quote.";
    let canonical = BASE_URL;
    let ogImage = `${BASE_URL}/roofora-assets/images/portfolio-img1.jpg`;

    // 1. Service Deep-Route Metadata
    if (currentPage === 'services' && currentServiceSlug && CORE_SERVICES_DATA[currentServiceSlug]) {
      const s = CORE_SERVICES_DATA[currentServiceSlug];
      title = s.metaTitle;
      description = s.metaDescription;
      canonical = `${BASE_URL}${s.canonicalPath}`;
      ogImage = `${BASE_URL}${s.heroImage}`;
    } else {
      // General Core Routes
      const pageData = pages?.[currentPage];

      const titles: Record<string, string> = {
        home: pageData?.seoTitle || seo?.siteTitle || 'Roofing Contractor & Roof Restoration Melbourne | Assist Roofing',
        about: pageData?.seoTitle || 'About Us | VBA Registered Roofers Melbourne | Assist Roofing',
        services: pageData?.seoTitle || 'Roofing Services Melbourne | Repairs, Restoration & Re-Roofing',
        gallery: pageData?.seoTitle || 'Roofing Projects Gallery Melbourne | Before & After Photos',
        testimonials: pageData?.seoTitle || 'Customer Reviews & Testimonials | Assist Roofing Melbourne',
        contact: pageData?.seoTitle || 'Contact Assist Roofing Melbourne | Book Free Roof Inspection'
      };

      const descriptions: Record<string, string> = {
        home: pageData?.metaDescription || seo?.defaultMetaDescription || "Melbourne's trusted roofing contractor for Colorbond restorations, emergency leak repairs & inspections. VBA registered, 10-year warranty. Free quote.",
        about: pageData?.metaDescription || "Learn about Assist Roofing's 8+ years of Melbourne roofing expertise, VBA-registered master trades, $10M insurance, and clean jobsite promise.",
        services: pageData?.metaDescription || "Explore comprehensive Melbourne roofing services: Colorbond roof replacements, emergency leak repairs, guttering, and restorations backed by a 10-year warranty.",
        gallery: pageData?.metaDescription || "Browse completed roofing projects across Melbourne. High-resolution before and after photos of tile restorations, Colorbond replacements, and re-bedding.",
        testimonials: pageData?.metaDescription || "Read verified Google customer reviews for Assist Roofing Melbourne. 4.9/5 average rating across 520+ reviews for roof restorations, leak repairs & re-roofing.",
        contact: pageData?.metaDescription || "Contact Assist Roofing in North Melbourne. Call 0478 936 120 or book a free on-site roof condition assessment and itemized fixed-price quote."
      };

      const paths: Record<string, string> = {
        home: '',
        about: '/about',
        services: '/services',
        gallery: '/projects',
        testimonials: '/testimonials',
        contact: '/contact'
      };

      title = titles[currentPage] || titles.home;
      description = descriptions[currentPage] || descriptions.home;
      canonical = `${BASE_URL}${paths[currentPage] || ''}`;
      if (pageData?.ogImage) ogImage = pageData.ogImage;
    }

    // Apply Title
    document.title = title;

    // Apply Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Apply Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    // Apply OpenGraph
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', ogImage);

    // Apply Twitter Cards
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // Inject Dynamic Route Schema
    let schemaScript = document.getElementById('route-schema') as HTMLScriptElement | null;

    if (currentPage === 'services' && currentServiceSlug && CORE_SERVICES_DATA[currentServiceSlug]) {
      const s = CORE_SERVICES_DATA[currentServiceSlug];
      const routeSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "@id": `${canonical}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${BASE_URL}/`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": `${BASE_URL}/services`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": s.name,
                "item": canonical
              }
            ]
          },
          {
            "@type": "Service",
            "@id": `${canonical}#service`,
            "name": s.name,
            "headline": s.heroHeading,
            "description": s.shortDesc,
            "provider": {
              "@type": "RoofingContractor",
              "name": "Assist Roofing and Home Solution",
              "@id": `${BASE_URL}/#business`
            },
            "areaServed": {
              "@type": "City",
              "name": "Melbourne"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `${s.name} Inclusions`,
              "itemListElement": s.features.map(f => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": f
                }
              }))
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "AUD",
              "description": s.pricingText
            }
          },
          {
            "@type": "FAQPage",
            "@id": `${canonical}#faq`,
            "mainEntity": s.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          }
        ]
      };

      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'route-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(routeSchema, null, 2);
    } else if (currentPage !== 'home') {
      // Other top-level pages get BreadcrumbList
      const pageNames: Record<string, string> = {
        about: 'About Us',
        services: 'Services',
        gallery: 'Projects',
        testimonials: 'Testimonials',
        contact: 'Contact'
      };

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${BASE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pageNames[currentPage] || currentPage,
            "item": canonical
          }
        ]
      };

      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'route-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(breadcrumbSchema, null, 2);
    } else {
      // Home page uses the static schema in index.html, so remove route-schema if present
      if (schemaScript) {
        schemaScript.remove();
      }
    }

  }, [currentPage, currentServiceSlug, pages, seo]);

  return null;
};

const PageContent: React.FC = () => {
  const { currentPage, currentServiceSlug } = useWebsite();

  return (
    <motion.div
      key={`${currentPage}-${currentServiceSlug || 'root'}`}
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
