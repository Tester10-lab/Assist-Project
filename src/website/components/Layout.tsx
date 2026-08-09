import React from 'react';
import { useWebsite } from '../WebsiteContext';
import { NAV_LINKS } from '../data';
import type { PageId } from '../types';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isMobileMenuOpen, setMobileMenuOpen } = useWebsite();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-12 h-12 bg-brand-600 rounded-lg flex items-center justify-center transform group-hover:-rotate-3 transition-transform shadow-md">
              <span className="material-symbols-outlined text-white text-2xl font-bold">roofing</span>
            </div>
            <div>
              <div className="text-2xl font-black text-brand-900 tracking-tight font-headline">ASSIST</div>
              <div className="text-xs font-bold text-accent-600 tracking-[0.2em] uppercase">Roofing</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  currentPage === link.id ? 'text-brand-600' : 'text-slate-600 hover:text-brand-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-right mr-4">
              <div className="text-xs font-bold text-slate-500 uppercase">24/7 Emergency Service</div>
              <div className="text-lg font-black text-brand-900">1800 ASSIST</div>
            </div>
            <button 
              onClick={() => setCurrentPage('login')}
              className="text-slate-600 hover:text-brand-900 font-bold text-sm uppercase tracking-wider px-2 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">login</span>
              Log In
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-accent-500 text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-accent-600 transition-all active:scale-95 shadow-md shadow-accent-500/20"
            >
              Get a Quote
            </button>
          </div>

          <button 
            className="md:hidden text-slate-900 p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="fixed inset-0 z-40 bg-white pt-24 pb-8 px-6 flex flex-col md:hidden overflow-y-auto"
        >
          <nav className="flex flex-col gap-6 mt-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-2xl font-black text-left border-b border-slate-100 pb-4 ${
                  currentPage === link.id ? 'text-brand-600' : 'text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('login');
                setMobileMenuOpen(false);
              }}
              className="text-2xl font-black text-left border-b border-slate-100 pb-4 text-slate-900 flex items-center gap-3"
            >
              <span className="material-symbols-outlined">login</span>
              Log In
            </button>
            <button 
              onClick={() => {
                setCurrentPage('contact');
                setMobileMenuOpen(false);
              }}
              className="bg-accent-500 text-white px-6 py-4 rounded-xl font-bold text-lg mt-4 text-center active:scale-95 transition-transform"
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
    <footer className="bg-brand-900 border-t border-brand-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-brand-900 text-xl font-bold">roofing</span>
              </div>
              <div>
                <div className="text-xl font-black text-white tracking-tight font-headline">ASSIST</div>
                <div className="text-[10px] font-bold text-accent-500 tracking-[0.2em] uppercase">Roofing</div>
              </div>
            </div>
            <p className="text-brand-100 text-sm leading-relaxed mb-8">
              Melbourne's most trusted roofing specialists. Providing premium quality roof replacements, restorations, and repairs with a 10-year workmanship guarantee.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                LI
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => setCurrentPage(link.id)}
                    className="text-brand-100 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Service Areas</h3>
            <ul className="space-y-4 text-sm text-brand-100">
              <li>Melbourne CBD & Inner Suburbs</li>
              <li>Eastern Suburbs</li>
              <li>South Eastern Suburbs</li>
              <li>Mornington Peninsula</li>
              <li>Northern Suburbs</li>
              <li>Western Suburbs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm text-brand-100">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-500 text-lg">location_on</span>
                <span>123 Industrial Blvd<br/>Melbourne, VIC 3000</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-accent-500 text-lg">call</span>
                <span className="font-bold text-white text-lg">1800 277 478</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-accent-500 text-lg">mail</span>
                <span>info@assistroofing.com.au</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-brand-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-100">
          <div>&copy; {new Date().getFullYear()} ASSIST Roofing Pty Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
