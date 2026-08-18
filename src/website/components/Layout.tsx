import React from 'react';
import { useWebsite } from '../WebsiteContext';
import { NAV_LINKS } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isMobileMenuOpen, setMobileMenuOpen } = useWebsite();

  return (
    <header className="w-full relative z-50 bg-white font-['Sora',sans-serif]">
      {/* Top Promotional & Contact Bar */}
      <div className="bg-[#1e2e4f] text-white text-xs py-2.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-[1320px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 text-[#b7c1d5]">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-[#f19e1f]"></i>
              <span className="text-white font-medium">1800 277 478</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-[#f19e1f]"></i>
              <span>info@assistroofing.com.au</span>
            </div>
            <div className="flex items-center gap-2 hidden lg:flex">
              <i className="fa-regular fa-clock text-[#f19e1f]"></i>
              <span>Mon - Fri: 7:00 AM - 6:00 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/90 mr-3">
              <i className="fa-solid fa-shield-halved text-[#f19e1f]"></i>
              <span className="font-semibold text-xs tracking-wide">Clean Jobsite Promise & 10-Yr Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-[#b7c1d5]">
              <a href="#" className="hover:text-[#f19e1f] transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="hover:text-[#f19e1f] transition-colors"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-[#f19e1f] transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-11 h-11 bg-[#1e2e4f] rounded-xl flex items-center justify-center text-white shadow-md group-hover:bg-[#f19e1f] transition-colors duration-300">
            <i className="fa-solid fa-house-chimney text-xl"></i>
          </div>
          <div>
            <div className="text-2xl font-extrabold tracking-tight text-[#1e2e4f] leading-none font-['Oswald',sans-serif]">
              ASSIST <span className="text-[#f19e1f]">ROOFING</span>
            </div>
            <span className="text-[10px] text-[#616a7e] font-semibold tracking-wider uppercase">
              Roofing & Construction
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-[15px] font-semibold transition-all duration-200 relative py-2 ${
                  isActive ? 'text-[#f19e1f]' : 'text-[#1e2e4f] hover:text-[#f19e1f]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f19e1f] rounded-full" 
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('login')}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#1e2e4f] hover:text-[#f19e1f] px-3 py-2 transition-colors"
          >
            <i className="fa-solid fa-arrow-right-to-bracket text-sm"></i>
            ERP Portal
          </button>
          
          <button
            onClick={() => setCurrentPage('contact')}
            className="inline-flex items-center gap-2 bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <span>Get a Quote</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2 text-[#1e2e4f] hover:text-[#f19e1f] text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-bold py-2 border-b border-gray-100 ${
                    currentPage === link.id ? 'text-[#f19e1f]' : 'text-[#1e2e4f]'
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
                className="text-left text-base font-bold py-2 text-[#1e2e4f] flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-right-to-bracket text-[#f19e1f]"></i>
                Staff ERP Login
              </button>

              <button
                onClick={() => {
                  setCurrentPage('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 bg-[#f19e1f] text-white py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow"
              >
                <span>Book Free Inspection</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <footer className="bg-[#1e2e4f] text-white font-['Sora',sans-serif] relative overflow-hidden">
      {/* Top Banner Accent */}
      <div className="bg-[#f19e1f] py-4 px-4 sm:px-8 text-[#1e2e4f] font-bold text-sm">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-wand-magic-sparkles text-lg"></i>
            <span className="font-['Oswald',sans-serif] text-base tracking-wide uppercase">
              Schedule Your Free Roof Health Check Today & Save Up to 15% On Re-Roofing!
            </span>
          </div>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-[#1e2e4f] hover:bg-[#152138] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>Book Now</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#f19e1f] rounded-xl flex items-center justify-center text-white shadow">
                <i className="fa-solid fa-house-chimney text-lg"></i>
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-white font-['Oswald',sans-serif]">
                ASSIST <span className="text-[#f19e1f]">ROOFING</span>
              </div>
            </div>
            <p className="text-[#b7c1d5] text-sm leading-relaxed mb-6 font-light">
              Melbourne's leading roofing and re-roofing specialists. From emergency storm repairs to full Colorbond replacements, our certified team guarantees flawless craftsmanship.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f19e1f] flex items-center justify-center text-white transition-colors">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f19e1f] flex items-center justify-center text-white transition-colors">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f19e1f] flex items-center justify-center text-white transition-colors">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-['Oswald',sans-serif] uppercase tracking-wider mb-6 text-white border-b border-white/10 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-[#b7c1d5]">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id)}
                    className="hover:text-[#f19e1f] transition-colors flex items-center gap-2"
                  >
                    <i className="fa-solid fa-chevron-right text-[10px] text-[#f19e1f]"></i>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="hover:text-[#f19e1f] transition-colors flex items-center gap-2 font-semibold text-white/90"
                >
                  <i className="fa-solid fa-chevron-right text-[10px] text-[#f19e1f]"></i>
                  <span>Staff ERP Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div>
            <h3 className="text-lg font-bold font-['Oswald',sans-serif] uppercase tracking-wider mb-6 text-white border-b border-white/10 pb-2 inline-block">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm text-[#b7c1d5]">
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-[#f19e1f] transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-check text-xs text-[#f19e1f]"></i>
                  <span>Emergency Leak Repair</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-[#f19e1f] transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-check text-xs text-[#f19e1f]"></i>
                  <span>Full Roof Replacement</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-[#f19e1f] transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-check text-xs text-[#f19e1f]"></i>
                  <span>Tile & Colorbond Re-Roof</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-[#f19e1f] transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-check text-xs text-[#f19e1f]"></i>
                  <span>Chimney Flashing & Valleys</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-[#f19e1f] transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-check text-xs text-[#f19e1f]"></i>
                  <span>Gutter Guard Installation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold font-['Oswald',sans-serif] uppercase tracking-wider mb-6 text-white border-b border-white/10 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-[#b7c1d5]">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-[#f19e1f] text-base mt-1 shrink-0"></i>
                <span>123 Industrial Boulevard, Melbourne VIC 3000</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-[#f19e1f] text-base shrink-0"></i>
                <span className="text-white font-bold text-base">1800 277 478</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-[#f19e1f] text-base shrink-0"></i>
                <span>info@assistroofing.com.au</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-regular fa-clock text-[#f19e1f] text-base shrink-0"></i>
                <span>Mon - Fri: 7:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Subfooter */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#b7c1d5]">
          <div>
            &copy; {new Date().getFullYear()} ASSIST Roofing Pty Ltd. All rights reserved. Registered VBA & Master Builders Member.
          </div>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

