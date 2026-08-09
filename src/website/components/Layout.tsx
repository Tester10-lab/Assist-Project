import React from 'react';
import { useWebsite } from '../WebsiteContext';
import { NAV_LINKS } from '../data';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isMobileMenuOpen, setMobileMenuOpen } = useWebsite();

  return (
    <>
      {/* CQCM Top Navigation Bar — white, non-sticky, with soft halo shadow */}
      <header 
        className="w-full z-50 bg-paper-white"
        style={{ boxShadow: 'var(--shadow-nav)' }}
      >
        <div className="max-w-[1280px] mx-auto px-10 h-20 flex items-center justify-between">
          
          {/* Logo — ASSIST wordmark with green geometric mark */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-cooperative-green flex items-center justify-center" style={{ borderRadius: '4px' }}>
              <span className="material-symbols-outlined text-ink-black text-xl font-bold">roofing</span>
            </div>
            <div className="text-athletics text-xl tracking-[0.04em]" style={{ fontFamily: 'var(--font-athletics)' }}>
              ASSIST
            </div>
          </div>

          {/* Desktop Nav — Manrope 14px, uppercase, black */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className="text-sm uppercase transition-colors"
                style={{ 
                  fontFamily: 'var(--font-manrope)',
                  letterSpacing: '0.01em',
                  color: currentPage === link.id ? '#44d991' : '#000000',
                  fontWeight: 400,
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side — Login + CTA pill */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage('login')}
              className="btn-pill-ghost text-xs"
              style={{ padding: '8px 16px' }}
            >
              Log In
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="btn-pill"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile hamburger */}
          <button 
            className="md:hidden text-ink-black p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu — flat white, no gradients */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="fixed inset-0 z-40 bg-paper-white pt-24 pb-8 px-6 flex flex-col md:hidden overflow-y-auto"
        >
          <nav className="flex flex-col gap-6 mt-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left pb-4"
                style={{
                  fontFamily: 'var(--font-athletics)',
                  fontSize: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  color: currentPage === link.id ? '#44d991' : '#000000',
                  borderBottom: '1px solid #eaf9f2',
                }}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('login');
                setMobileMenuOpen(false);
              }}
              className="text-left pb-4 flex items-center gap-3"
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1,
                color: '#000000',
                borderBottom: '1px solid #eaf9f2',
              }}
            >
              <span className="material-symbols-outlined">login</span>
              Log In
            </button>
            <button 
              onClick={() => {
                setCurrentPage('contact');
                setMobileMenuOpen(false);
              }}
              className="btn-pill text-lg mt-4 py-4 text-center"
            >
              Get a Quote
            </button>
          </nav>
        </motion.div>
      )}
    </>
  );
};

export const Footer: React.FC = () => {
  const { setCurrentPage } = useWebsite();
  
  return (
    <footer className="bg-ink-black text-paper-white">
      <div className="max-w-[1280px] mx-auto px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cooperative-green flex items-center justify-center" style={{ borderRadius: '4px' }}>
                <span className="material-symbols-outlined text-ink-black text-xl font-bold">roofing</span>
              </div>
              <div className="text-athletics text-xl text-paper-white" style={{ fontFamily: 'var(--font-athletics)', letterSpacing: '0.04em' }}>
                ASSIST
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', lineHeight: '1.6', color: '#999999', letterSpacing: '0.01em' }}>
              Melbourne's most trusted roofing specialists. Providing premium quality roof replacements, restorations, and repairs with a 10-year workmanship guarantee.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="mb-6"
              style={{ fontFamily: 'var(--font-athletics)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#44d991' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => setCurrentPage(link.id)}
                    style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', color: '#999999', letterSpacing: '0.01em' }}
                    className="hover:text-paper-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 
              className="mb-6"
              style={{ fontFamily: 'var(--font-athletics)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#44d991' }}
            >
              Service Areas
            </h3>
            <ul className="space-y-4" style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', color: '#999999', letterSpacing: '0.01em' }}>
              <li>Melbourne CBD & Inner Suburbs</li>
              <li>Eastern Suburbs</li>
              <li>South Eastern Suburbs</li>
              <li>Mornington Peninsula</li>
              <li>Northern Suburbs</li>
              <li>Western Suburbs</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 
              className="mb-6"
              style={{ fontFamily: 'var(--font-athletics)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#44d991' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-5" style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', color: '#999999', letterSpacing: '0.01em' }}>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-cooperative-green text-lg mt-0.5">location_on</span>
                <span>123 Industrial Blvd<br/>Melbourne, VIC 3000</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-cooperative-green text-lg">call</span>
                <span className="text-paper-white" style={{ fontFamily: 'var(--font-athletics)', fontSize: '18px', letterSpacing: '0.04em' }}>1800 277 478</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-cooperative-green text-lg">mail</span>
                <span>info@assistroofing.com.au</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom bar */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #222222', fontFamily: 'var(--font-manrope)', fontSize: '12px', color: '#666666', letterSpacing: '0.01em' }}>
          <div>&copy; {new Date().getFullYear()} ASSIST Roofing Pty Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-paper-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-paper-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-paper-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
