import React, { useState } from 'react';
import { useWebsite } from '../WebsiteContext';
import { useCmsContent } from '../useCmsContent';
import type { PageId, CoreServiceSlug } from '../types';
import { QuoteModal } from './QuoteModal';
import { LightboxModal } from './LightboxModal';
import { BackToTop } from './BackToTop';
import { asset } from '../utils/asset';

export const Navbar: React.FC = () => {
  const { currentPage, currentServiceSlug, navigateTo, isMobileMenuOpen, setMobileMenuOpen, openQuoteModal } = useWebsite();
  const { settings } = useCmsContent();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, page: PageId, serviceSlug?: CoreServiceSlug | null) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    navigateTo(page, serviceSlug);
    setActiveDropdown(null);
  };

  const phone = settings?.business?.phone || '0478250790';
  const displayPhone = phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  const logoUrl = settings?.branding?.logoUrl || asset('/roofora-assets/images/logo.png');

  return (
    <div className="w-100 float-left font-['Sora',sans-serif]">
      {/* ── Promotional Topbar ── */}
      <div className="promotional-topbar">
        <div className="promotional-topbar-icon">
          <i className="fa-solid fa-wand-magic-sparkles topbar-icon"></i>
          <p>Clean Jobsite Promise & 10-Yr Workmanship Guarantee • {displayPhone}</p>
        </div>
        <a
          className="buy_now text-decoration-none cursor-pointer"
          onClick={openQuoteModal}
        >
          <span className="label">Get a Free Quote</span>
          <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      {/* ── Main Header & Pill Navigation ── */}
      <div className="padding-rl float-left w-100">
        <div className="wrapper1605">
          <header className="w-100 float-left header-con position-relative main-box" role="banner">
            <nav className="navbar navbar-expand-lg navbar-light d-flex align-items-center justify-content-between" role="navigation" aria-label="Main Navigation">

              {/* Brand Logo */}
              <a
                href="/"
                className="navbar-brand cursor-pointer"
                onClick={(e) => handleNav(e, 'home')}
              >
                <figure className="mb-0">
                  <img
                    src={logoUrl}
                    alt="ASSIST Roofing & Home Solution Logo"
                    className="img-fluid"
                    style={{ maxHeight: '85px', width: 'auto', objectFit: 'contain' }}
                  />
                </figure>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                className={`navbar-toggler d-lg-none border-0 ${isMobileMenuOpen ? '' : 'collapsed'}`}
                type="button"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Center Sky-Blue Pill Menu */}
              <div className={`navbar-collapse ${isMobileMenuOpen ? 'show d-block' : 'd-none d-lg-block'}`} id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a
                      href="/"
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'home' && !currentServiceSlug ? 'active' : ''}`}
                      onClick={(e) => handleNav(e, 'home')}
                    >
                      Home
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/about"
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'about' ? 'active' : ''}`}
                      onClick={(e) => handleNav(e, 'about')}
                    >
                      About
                    </a>
                  </li>

                  {/* Services with Dropdown Popup */}
                  <li
                    className="nav-item dropdown position-relative"
                    onMouseEnter={() => setActiveDropdown('services')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href="/services"
                      className={`nav-link dropdown-toggle p-0 cursor-pointer ${currentPage === 'services' ? 'active' : ''}`}
                      onClick={(e) => handleNav(e, 'services')}
                    >
                      Services
                    </a>
                    {activeDropdown === 'services' && (
                      <div className="dropdown-menu show position-absolute wow animated fadeIn fast">
                        <a
                          href="/services"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'services')}
                        >
                          All Roofing Services
                        </a>
                        <a
                          href="/services/roof-restoration"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'services', 'roof-restoration')}
                        >
                          Roof Restoration
                        </a>
                        <a
                          href="/services/roof-repairs"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'services', 'roof-repairs')}
                        >
                          Roof Repairs & Leak Fix
                        </a>
                        <a
                          href="/services/roof-replacement"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'services', 'roof-replacement')}
                        >
                          Roof Replacement & Re-Roofing
                        </a>
                        <a
                          href="/services/colorbond-roofing"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'services', 'colorbond-roofing')}
                        >
                          Colorbond Metal Roofing
                        </a>
                        <a
                          href="/services/guttering"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'services', 'guttering')}
                        >
                          Guttering & Downpipes
                        </a>
                        <a
                          href="/services/leak-detection"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'services', 'leak-detection')}
                        >
                          Drone Leak Detection
                        </a>
                      </div>
                    )}
                  </li>

                  {/* Projects with Dropdown Popup */}
                  <li
                    className="nav-item dropdown position-relative"
                    onMouseEnter={() => setActiveDropdown('projects')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href="/projects"
                      className={`nav-link dropdown-toggle p-0 cursor-pointer ${currentPage === 'gallery' ? 'active' : ''}`}
                      onClick={(e) => handleNav(e, 'gallery')}
                    >
                      Projects
                    </a>
                    {activeDropdown === 'projects' && (
                      <div className="dropdown-menu show position-absolute wow animated fadeIn fast">
                        <a
                          href="/projects"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'gallery')}
                        >
                          Completed Projects
                        </a>
                        <a
                          href="/projects"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'gallery')}
                        >
                          Colorbond Metal Gallery
                        </a>
                        <a
                          href="/projects"
                          className="dropdown-item cursor-pointer"
                          onClick={(e) => handleNav(e, 'gallery')}
                        >
                          Tile Restoration Gallery
                        </a>
                      </div>
                    )}
                  </li>

                  <li className="nav-item">
                    <a
                      href="/testimonials"
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'testimonials' ? 'active' : ''}`}
                      onClick={(e) => handleNav(e, 'testimonials')}
                    >
                      Testimonials
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/contact"
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'contact' ? 'active' : ''}`}
                      onClick={(e) => handleNav(e, 'contact')}
                    >
                      Contact
                    </a>
                  </li>
                </ul>

                {/* Mobile Drawer Action Buttons (Visible only on mobile) */}
                <div className="mobile-action-buttons d-lg-none mt-3 pt-3 border-top">
                  <button
                    onClick={() => { openQuoteModal('Free Roof & Drone Inspection (Full Property Assessment)'); setMobileMenuOpen(false); }}
                    className="btn w-100 py-2.5 rounded-pill font-weight-700 text-white shadow-sm mb-2"
                    style={{ backgroundColor: '#f19e1f' }}
                  >
                    <i className="fa-solid fa-calendar-check mr-2"></i> Book Free Inspection
                  </button>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="btn w-100 py-2.5 rounded-pill font-weight-700 text-white mb-2 text-decoration-none"
                    style={{ backgroundColor: '#1e2e4f' }}
                  >
                    <i className="fa-solid fa-phone mr-2"></i> {displayPhone}
                  </a>
                </div>
              </div>

              {/* Right Action Buttons (Desktop only) */}
              <div className="header-contact d-none d-lg-block">
                <ul className="list-unstyled mb-0 d-flex align-items-center">
                  <li className="d-inline-block">
                    <a
                      onClick={() => openQuoteModal('Free Roof & Drone Inspection (Full Property Assessment)')}
                      className="contact-btn d-inline-block cursor-pointer text-decoration-none"
                    >
                      Book Inspection <figure><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" /></figure>
                    </a>
                  </li>
                  <li className="d-flex align-items-center position-relative">
                    <div>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="text-decoration-none cell-no cursor-pointer"
                      >
                        <span className="number d-inline-block urbanist-font">{displayPhone}</span>
                      </a>
                    </div>
                    <figure className="header-phone mb-0">
                      <img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" />
                    </figure>
                  </li>
                </ul>
              </div>

            </nav>
          </header>
        </div>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const { navigateTo } = useWebsite();
  const { settings } = useCmsContent();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'about' | 'services' | 'gallery' | 'testimonials' | 'contact', slug?: any) => {
    e.preventDefault();
    if (page === 'services') {
      navigateTo('services', slug || null);
    } else {
      navigateTo(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phone = settings?.business?.phone || '0478250790';
  const displayPhone = phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  const email = settings?.business?.email || 'info@assistroofing.com.au';
  const address = settings?.business?.address || '139 Boundary Road, North Melbourne VIC 3051';
  const footerLogo = settings?.branding?.footerLogoUrl || asset('/roofora-assets/images/footer-logo.png');
  const facebook = settings?.social?.facebook || 'https://www.facebook.com/profile.php?id=61560893981491';
  const instagram = settings?.social?.instagram || 'https://www.instagram.com/roofingassist/';
  const googleMaps = settings?.social?.googleMaps || 'https://maps.google.com/?q=139+Boundary+Road,+North+Melbourne+VIC+3051';

  return (
    <footer className="w-100 float-left font-['Sora',sans-serif]" role="contentinfo">
      <div className="spacer"></div>

      {/* ── Footer Container with Roofora Styling ── */}
      <div className="padding-rl float-left w-100">
        <div className="float-left w-100 footer-con position-relative main-box br-50" style={{ backgroundColor: '#1e2e4f', backgroundImage: 'none' }}>
          <div className="main-container position-relative">

            {/* Middle Portion - Organized 3-column layout with clearance for floating Google Reviews badge */}
            <div 
              className="middle_portion d-flex flex-wrap align-items-start justify-content-between gap-4 py-4"
              style={{ paddingLeft: 'clamp(0px, 9vw, 130px)' }}
            >
              {/* Brand & VBA Licencing */}
              <div className="logo-content d-flex flex-column align-items-start text-start" style={{ minWidth: '220px', maxWidth: '320px' }}>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, 'home')}
                  className="footer-logo cursor-pointer mb-2"
                  aria-label="Assist Roofing Home"
                >
                  <figure className="mb-0 bg-white p-2.5 rounded-2xl shadow-sm d-inline-block">
                    <img
                      src={footerLogo}
                      alt="ASSIST Roofing & Home Solution"
                      className="img-fluid"
                      style={{ maxHeight: '70px', width: 'auto', objectFit: 'contain' }}
                    />
                  </figure>
                </a>
                <p className="text-xs mb-0 mt-1" style={{ color: '#b7c1d5', lineHeight: 1.5 }}>
                  Melbourne's trusted roofing restoration, Colorbond replacement & 4K drone leak inspection experts. Fully insured & VBA registered.
                </p>
              </div>

              {/* Direct Phone & Dispatch */}
              <div className="contact-direct d-flex flex-column align-items-start text-start" style={{ minWidth: '220px' }}>
                <div className="text-uppercase text-xs font-weight-700 tracking-wider mb-1" style={{ color: '#f19e1f' }}>
                  24/7 Rapid Response & Quotes
                </div>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-decoration-none font-weight-700 d-inline-flex align-items-center gap-2 mb-1 transition-colors hover:text-[#f19e1f]"
                  style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', color: '#ffffff' }}
                >
                  <i className="fa-solid fa-phone text-[#f19e1f]" style={{ fontSize: '18px' }}></i>
                  <span>{displayPhone}</span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="text-decoration-none d-inline-flex align-items-center gap-2 text-xs transition-colors hover:text-[#f19e1f]"
                  style={{ color: '#b7c1d5' }}
                >
                  <i className="fa-solid fa-envelope text-[#f19e1f]"></i>
                  <span>{email}</span>
                </a>
                <div className="text-xs mt-2" style={{ color: '#94a3b8' }}>
                  Mon – Sat: 7:00 AM – 6:00 PM • Emergency 24/7
                </div>
              </div>

              {/* Melbourne Headquarters & Workshop */}
              <div className="hq-location d-flex flex-column align-items-start text-start" style={{ minWidth: '240px', maxWidth: '340px' }}>
                <div className="text-uppercase text-xs font-weight-700 tracking-wider mb-1" style={{ color: '#f19e1f' }}>
                  Melbourne Headquarters
                </div>
                <a
                  href={googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="address mb-0 text-white hover:text-[#f19e1f] transition-colors text-decoration-none d-inline-flex align-items-start gap-2"
                  style={{ color: '#ffffff', fontSize: '14px', lineHeight: 1.5 }}
                >
                  <i className="fa-solid fa-location-dot text-[#f19e1f] mt-1"></i>
                  <span>{address}, Australia</span>
                </a>
                <div className="text-xs mt-2" style={{ color: '#b7c1d5' }}>
                  Servicing Greater Melbourne, Mornington Peninsula & All Surrounding Suburbs
                </div>
              </div>
            </div>

            {/* Core Services Crawlable Pillar Links */}
            <div className="border-t border-b border-white/10 py-3 my-3" style={{ paddingLeft: 'clamp(0px, 9vw, 130px)' }}>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 text-xs">
                <span className="text-[#f19e1f] font-weight-700 text-uppercase tracking-wider">Specialized Services:</span>
                <div className="d-flex flex-wrap gap-x-4 gap-y-2">
                  <a href="/services/roof-restoration" onClick={(e) => handleNav(e, 'services', 'roof-restoration')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none" style={{ color: '#b7c1d5' }}>Roof Restoration</a>
                  <a href="/services/roof-repairs" onClick={(e) => handleNav(e, 'services', 'roof-repairs')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none" style={{ color: '#b7c1d5' }}>Emergency Roof Repairs</a>
                  <a href="/services/roof-replacement" onClick={(e) => handleNav(e, 'services', 'roof-replacement')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none" style={{ color: '#b7c1d5' }}>Roof Replacement</a>
                  <a href="/services/colorbond-roofing" onClick={(e) => handleNav(e, 'services', 'colorbond-roofing')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none" style={{ color: '#b7c1d5' }}>Colorbond Roofing</a>
                  <a href="/services/guttering" onClick={(e) => handleNav(e, 'services', 'guttering')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none" style={{ color: '#b7c1d5' }}>Gutter Replacement</a>
                  <a href="/services/leak-detection" onClick={(e) => handleNav(e, 'services', 'leak-detection')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none" style={{ color: '#b7c1d5' }}>Drone Leak Detection</a>
                </div>
              </div>
            </div>

            {/* Copyright & Social Row with bottom-left clearance for Google Reviews Badge */}
            <div className="copyright-con d-flex flex-wrap align-items-center justify-content-between text-center gap-3 pt-2" style={{ paddingLeft: 'clamp(0px, 9vw, 130px)' }}>
              <ul className="footer-links list-unstyled mb-0 d-flex flex-wrap gap-4">
                <li><a href="/" onClick={(e) => handleNav(e, 'home')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium" style={{ color: '#b7c1d5' }}>Home</a></li>
                <li><a href="/about" onClick={(e) => handleNav(e, 'about')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium" style={{ color: '#b7c1d5' }}>About</a></li>
                <li><a href="/services" onClick={(e) => handleNav(e, 'services')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium" style={{ color: '#b7c1d5' }}>Services</a></li>
                <li><a href="/projects" onClick={(e) => handleNav(e, 'gallery')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium" style={{ color: '#b7c1d5' }}>Projects</a></li>
                <li><a href="/testimonials" onClick={(e) => handleNav(e, 'testimonials')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium" style={{ color: '#b7c1d5' }}>Testimonials</a></li>
                <li><a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium" style={{ color: '#b7c1d5' }}>Contact</a></li>
              </ul>

              <ul className="list-unstyled mb-0 social-icons d-flex gap-2">
                <li>
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                    aria-label="Assist Roofing Facebook"
                  >
                    <i className="fa-brands fa-facebook-f social-networks"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                    aria-label="Assist Roofing Instagram"
                  >
                    <i className="fa-brands fa-instagram social-networks"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                    aria-label="Assist Roofing and Home Solution Google Business Profile"
                    title="Assist Roofing and Home Solution on Google"
                  >
                    <i className="fa-brands fa-google social-networks"></i>
                  </a>
                </li>
              </ul>

              <p className="mb-0 text-[#b7c1d5] text-xs font-light" style={{ color: '#b7c1d5' }}>Copyright © {new Date().getFullYear()} {settings?.business?.name || 'ASSIST Roofing & Home Solution'}. All Rights Reserved.</p>
            </div>

          </div>
        </div>
      </div>

      <div className="spacer"></div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col text-[#1e2e4f] font-['Sora',sans-serif]">
      <Navbar />
      <main id="main-content" role="main" className="flex-1 flex flex-col w-100 float-left">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <MobileCROStickyBar />
      <QuoteModal />
      <LightboxModal />
      <BackToTop />
    </div>
  );
};

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useCmsContent();
  const rawPhone = settings?.business?.internationalPhone || settings?.business?.phone || '0478250790';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.startsWith('61')
    ? cleanPhone
    : (cleanPhone.startsWith('0') ? `61${cleanPhone.slice(1)}` : `61${cleanPhone}`);
  const defaultMsg = encodeURIComponent("Hello Assist Roofing! I'd like to ask a question about your Melbourne roofing services.");
  const waUrl = `https://wa.me/${waNumber}?text=${defaultMsg}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="position-fixed d-none d-md-flex align-items-center justify-content-center text-white"
      style={{
        bottom: '25px',
        right: '25px',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        boxShadow: '0 6px 18px rgba(37, 211, 102, 0.4)',
        zIndex: 1000,
        fontSize: '32px',
        textDecoration: 'none',
        transition: 'transform 0.25s ease-in-out'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      aria-label="Chat with us on WhatsApp"
      title="Chat with Assist Roofing on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
};

export const MobileCROStickyBar: React.FC = () => {
  const { settings } = useCmsContent();
  const { openQuoteModal } = useWebsite();
  const phone = settings?.business?.phone || '0478 250 790';
  const rawPhone = settings?.business?.internationalPhone || phone;
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.startsWith('61')
    ? cleanPhone
    : (cleanPhone.startsWith('0') ? `61${cleanPhone.slice(1)}` : `61${cleanPhone}`);
  const defaultMsg = encodeURIComponent("Hello Assist Roofing! I need a fast quote / roof inspection.");
  const waUrl = `https://wa.me/${waNumber}?text=${defaultMsg}`;

  return (
    <div
      className="position-fixed d-flex d-md-none align-items-center justify-content-between w-100"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1040,
        backgroundColor: '#1e2e4f',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '8px 12px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.25)',
      }}
    >
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        className="d-flex flex-column align-items-center justify-content-center text-white text-decoration-none px-2 py-1"
        style={{ fontSize: '11px', fontWeight: 600, flex: 1 }}
      >
        <i className="fa-solid fa-phone text-[#f19e1f] mb-1" style={{ fontSize: '16px' }}></i>
        <span>Call Now</span>
      </a>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="d-flex flex-column align-items-center justify-content-center text-white text-decoration-none px-2 py-1"
        style={{ fontSize: '11px', fontWeight: 600, flex: 1 }}
      >
        <i className="fa-brands fa-whatsapp mb-1" style={{ color: '#25D366', fontSize: '18px' }}></i>
        <span>WhatsApp</span>
      </a>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>

      <button
        onClick={() => openQuoteModal()}
        className="btn d-flex align-items-center justify-content-center border-0 text-white font-weight-700 px-3 py-2 rounded-pill shadow-sm"
        style={{
          backgroundColor: '#f19e1f',
          color: '#1e2e4f',
          fontSize: '12px',
          fontWeight: 700,
          flex: 1.5,
          letterSpacing: '0.02em'
        }}
      >
        <i className="fa-solid fa-clipboard-check me-1.5" style={{ color: '#1e2e4f' }}></i>
        <span style={{ color: '#1e2e4f' }}>Free Quote</span>
      </button>
    </div>
  );
};
