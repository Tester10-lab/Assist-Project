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

  const phone = settings?.business?.phone || '0478936120';
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
          <header className="w-100 float-left header-con position-relative main-box">
            <nav className="navbar navbar-expand-lg navbar-light d-flex align-items-center justify-content-between">

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
                className="navbar-toggler d-lg-none border-0"
                type="button"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Center Sky-Blue Pill Menu */}
              <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show d-block' : 'd-none d-lg-block'}`} id="navbarSupportedContent">
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
                    onClick={() => { openQuoteModal(); setMobileMenuOpen(false); }}
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
                      onClick={openQuoteModal}
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

  const phone = settings?.business?.phone || '0478936120';
  const displayPhone = phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  const email = settings?.business?.email || 'info@assistroofing.com.au';
  const address = settings?.business?.address || '139 Boundary Road, North Melbourne VIC 3051';
  const footerLogo = settings?.branding?.footerLogoUrl || asset('/roofora-assets/images/footer-logo.png');
  const facebook = settings?.social?.facebook || 'https://www.facebook.com/profile.php?id=61560893981491';
  const instagram = settings?.social?.instagram || 'https://www.instagram.com/roofingassist/';
  const googleMaps = settings?.social?.googleMaps || 'https://maps.google.com/?q=139+Boundary+Road,+North+Melbourne+VIC+3051';

  return (
    <footer className="w-100 float-left font-['Sora',sans-serif]">
      <div className="spacer"></div>

      {/* ── Footer Container with Roofora Styling ── */}
      <div className="padding-rl float-left w-100">
        <div className="float-left w-100 footer-con position-relative main-box br-50 bg-[#1e2e4f]">
          <div className="main-container position-relative">

            {/* Middle Portion */}
            <div className="middle_portion d-flex flex-wrap align-items-center justify-content-between gap-4">
              <div className="logo-content">
                <a
                  href="/"
                  onClick={(e) => handleNav(e, 'home')}
                  className="footer-logo cursor-pointer"
                >
                  <figure className="mb-0 bg-white p-2 rounded-2xl shadow-sm d-inline-block">
                    <img
                      src={footerLogo}
                      alt="ASSIST Roofing & Home Solution"
                      className="img-fluid"
                      style={{ maxHeight: '75px', width: 'auto', objectFit: 'contain' }}
                    />
                  </figure>
                </a>
              </div>

              <div className="links">
                <ul className="list-unstyled mb-0">
                  <li className="text">
                    <a href={`mailto:${email}`} className="text-decoration-none text-white hover:text-[#f19e1f] transition-colors">
                      {email}
                    </a>
                  </li>
                  <li className="text footer-number mb-0">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-decoration-none text-white hover:text-[#f19e1f] transition-colors font-weight-700">
                      {displayPhone}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="contact">
                <ul className="list-unstyled mb-0">
                  <li className="text">
                    <a
                      href={googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="address mb-0 text-white hover:text-[#f19e1f] transition-colors text-decoration-none"
                    >
                      <i className="fa-solid fa-location-dot text-[#f19e1f] mr-2"></i>
                      {address}, Australia
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Services Crawlable Pillar Links */}
            <div className="border-t border-b border-white/10 py-3 my-4">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 text-xs">
                <span className="text-[#f19e1f] font-weight-700 text-uppercase tracking-wider">Specialized Services:</span>
                <div className="d-flex flex-wrap gap-x-4 gap-y-2">
                  <a href="/services/roof-restoration" onClick={(e) => handleNav(e, 'services', 'roof-restoration')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none">Roof Restoration</a>
                  <a href="/services/roof-repairs" onClick={(e) => handleNav(e, 'services', 'roof-repairs')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none">Emergency Roof Repairs</a>
                  <a href="/services/roof-replacement" onClick={(e) => handleNav(e, 'services', 'roof-replacement')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none">Roof Replacement</a>
                  <a href="/services/colorbond-roofing" onClick={(e) => handleNav(e, 'services', 'colorbond-roofing')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none">Colorbond Roofing</a>
                  <a href="/services/guttering" onClick={(e) => handleNav(e, 'services', 'guttering')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none">Gutter Replacement</a>
                  <a href="/services/leak-detection" onClick={(e) => handleNav(e, 'services', 'leak-detection')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none">Drone Leak Detection</a>
                </div>
              </div>
            </div>

            {/* Copyright & Social Row */}
            <div className="copyright-con d-flex flex-wrap align-items-center justify-content-between text-center gap-3">
              <ul className="footer-links list-unstyled mb-0 d-flex flex-wrap gap-4">
                <li><a href="/" onClick={(e) => handleNav(e, 'home')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium">Home</a></li>
                <li><a href="/about" onClick={(e) => handleNav(e, 'about')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium">About</a></li>
                <li><a href="/services" onClick={(e) => handleNav(e, 'services')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium">Services</a></li>
                <li><a href="/projects" onClick={(e) => handleNav(e, 'gallery')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium">Projects</a></li>
                <li><a href="/testimonials" onClick={(e) => handleNav(e, 'testimonials')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium">Testimonials</a></li>
                <li><a href="/contact" onClick={(e) => handleNav(e, 'contact')} className="text-[#b7c1d5] hover:text-[#f19e1f] transition-colors text-decoration-none cursor-pointer text-xs font-medium">Contact</a></li>
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

              <p className="mb-0 text-[#b7c1d5] text-xs font-light">Copyright © {new Date().getFullYear()} {settings?.business?.name || 'ASSIST Roofing & Home Solution'}. All Rights Reserved.</p>
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 w-100 float-left">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <QuoteModal />
      <LightboxModal />
      <BackToTop />
    </div>
  );
};

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useCmsContent();
  const phone = (settings?.business?.internationalPhone || settings?.business?.phone || '61478936120').replace(/[^0-9]/g, '');
  const waUrl = phone.startsWith('61') ? `https://wa.me/${phone}` : `https://wa.me/61${phone.replace(/^0/, '')}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="position-fixed d-flex align-items-center justify-content-center text-white"
      style={{
        bottom: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        fontSize: '35px',
        textDecoration: 'none',
        transition: 'transform 0.3s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
};
