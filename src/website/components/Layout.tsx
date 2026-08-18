import React, { useState } from 'react';
import { useWebsite } from '../WebsiteContext';
import { QuoteModal } from './QuoteModal';
import { LightboxModal } from './LightboxModal';
import { BackToTop } from './BackToTop';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isMobileMenuOpen, setMobileMenuOpen, openQuoteModal } = useWebsite();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="w-100 float-left font-['Sora',sans-serif]">
      {/* ── Promotional Topbar ── */}
      <div className="promotional-topbar">
        <div className="promotional-topbar-icon">
          <i className="fa-solid fa-wand-magic-sparkles topbar-icon"></i>
          <p>Clean Jobsite Promise & 10-Yr Workmanship Guarantee • 1800 277 478</p>
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
                className="navbar-brand cursor-pointer" 
                onClick={() => setCurrentPage('home')}
              >
                <figure className="mb-0">
                  <img src="/roofora-assets/images/logo.png" alt="Roofora Logo" className="img-fluid" />
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
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'home' ? 'active' : ''}`}
                      onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                    >
                      Home
                    </a>
                  </li>

                  <li className="nav-item">
                    <a 
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'about' ? 'active' : ''}`}
                      onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
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
                      className={`nav-link dropdown-toggle p-0 cursor-pointer ${currentPage === 'services' ? 'active' : ''}`}
                      onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }}
                    >
                      Services
                    </a>
                    {activeDropdown === 'services' && (
                      <div className="dropdown-menu show position-absolute animate__animated animate__fadeIn animate__faster">
                        <a 
                          className="dropdown-item cursor-pointer" 
                          onClick={() => { setCurrentPage('services'); setActiveDropdown(null); }}
                        >
                          All Roofing Services
                        </a>
                        <a 
                          className="dropdown-item cursor-pointer" 
                          onClick={() => { setCurrentPage('services'); setActiveDropdown(null); }}
                        >
                          Residential Roofing
                        </a>
                        <a 
                          className="dropdown-item cursor-pointer" 
                          onClick={() => { setCurrentPage('services'); setActiveDropdown(null); }}
                        >
                          Roof Repairs & Leak Fix
                        </a>
                        <a 
                          className="dropdown-item cursor-pointer" 
                          onClick={() => { setCurrentPage('services'); setActiveDropdown(null); }}
                        >
                          Full Re-Roofing
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
                      className={`nav-link dropdown-toggle p-0 cursor-pointer ${currentPage === 'gallery' ? 'active' : ''}`}
                      onClick={() => { setCurrentPage('gallery'); setMobileMenuOpen(false); }}
                    >
                      Projects
                    </a>
                    {activeDropdown === 'projects' && (
                      <div className="dropdown-menu show position-absolute animate__animated animate__fadeIn animate__faster">
                        <a 
                          className="dropdown-item cursor-pointer" 
                          onClick={() => { setCurrentPage('gallery'); setActiveDropdown(null); }}
                        >
                          Completed Projects
                        </a>
                        <a 
                          className="dropdown-item cursor-pointer" 
                          onClick={() => { setCurrentPage('gallery'); setActiveDropdown(null); }}
                        >
                          Colorbond Metal Gallery
                        </a>
                        <a 
                          className="dropdown-item cursor-pointer" 
                          onClick={() => { setCurrentPage('gallery'); setActiveDropdown(null); }}
                        >
                          Tile Restoration Gallery
                        </a>
                      </div>
                    )}
                  </li>

                  <li className="nav-item">
                    <a 
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'testimonials' ? 'active' : ''}`}
                      onClick={() => { setCurrentPage('testimonials'); setMobileMenuOpen(false); }}
                    >
                      Testimonials
                    </a>
                  </li>

                  <li className="nav-item">
                    <a 
                      className={`nav-link p-0 cursor-pointer ${currentPage === 'contact' ? 'active' : ''}`}
                      onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Right Action Buttons */}
              <div className="header-contact d-none d-lg-block">
                <ul className="list-unstyled mb-0 d-flex align-items-center">
                  <li className="d-inline-block">
                    <a 
                      onClick={openQuoteModal} 
                      className="contact-btn d-inline-block cursor-pointer text-decoration-none"
                    >
                      Book Inspection <figure><img src="/roofora-assets/images/arrow.png" alt="arrow" /></figure>
                    </a>
                  </li>
                  <li className="d-flex align-items-center position-relative">
                    <div>
                      <a 
                        onClick={() => {
                          if (localStorage.getItem('authToken')) {
                            window.location.hash = '#erp';
                            window.dispatchEvent(new CustomEvent('switch-view', { detail: 'erp' }));
                          } else {
                            setCurrentPage('login');
                          }
                        }} 
                        className="text-decoration-none cell-no cursor-pointer"
                      >
                        <span className="number d-inline-block urbanist-font">ERP Portal</span>
                      </a>
                    </div>
                    <figure className="header-phone mb-0">
                      <img src="/roofora-assets/images/arrow.png" alt="arrow" />
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
  const { setCurrentPage } = useWebsite();

  return (
    <footer className="w-100 float-left font-['Sora',sans-serif]">
      <div className="spacer"></div>
      
      {/* ── Footer Container with Roofora Styling ── */}
      <div className="padding-rl float-left w-100">
        <div className="float-left w-100 footer-con position-relative main-box br-50">
          <div className="main-container position-relative">
            
            {/* Middle Portion */}
            <div className="middle_portion d-flex flex-wrap align-items-center justify-content-between gap-4">
              <div className="logo-content">
                <a onClick={() => setCurrentPage('home')} className="footer-logo cursor-pointer">
                  <figure className="mb-0">
                    <img src="/roofora-assets/images/footer-logo.png" alt="footer-logo" className="img-fluid" />
                  </figure>
                </a>
              </div>

              <div className="links">
                <ul className="list-unstyled mb-0">
                  <li className="text">
                    <a href="mailto:info@assistroofing.com.au" className="text-decoration-none text-white">
                      info@assistroofing.com.au
                    </a>
                  </li>
                  <li className="text footer-number mb-0">
                    <a href="tel:1800277478" className="text-decoration-none text-white font-weight-700">
                      1800 277 478
                    </a>
                  </li>
                </ul>
              </div>

              <div className="contact">
                <ul className="list-unstyled mb-0">
                  <li className="text">
                    <a className="address mb-0 text-white">
                      121 King Street Melbourne, 3000, <br />
                      Victoria, Australia
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright & Social Row */}
            <div className="copyright-con d-flex flex-wrap align-items-center justify-content-between text-center gap-3">
              <ul className="footer-links list-unstyled mb-0 d-flex flex-wrap gap-4">
                <li><a onClick={() => setCurrentPage('home')} className="text-decoration-none cursor-pointer">Home</a></li>
                <li><a onClick={() => setCurrentPage('about')} className="text-decoration-none cursor-pointer">About</a></li>
                <li><a onClick={() => setCurrentPage('services')} className="text-decoration-none cursor-pointer">Services</a></li>
                <li><a onClick={() => setCurrentPage('gallery')} className="text-decoration-none cursor-pointer">Projects</a></li>
                <li><a onClick={() => setCurrentPage('testimonials')} className="text-decoration-none cursor-pointer">Testimonials</a></li>
                <li><a onClick={() => setCurrentPage('contact')} className="text-decoration-none cursor-pointer">Contact</a></li>
                <li><a onClick={() => setCurrentPage('login')} className="text-decoration-none cursor-pointer">ERP Login</a></li>
              </ul>

              <ul className="list-unstyled mb-0 social-icons d-flex gap-2">
                <li>
                  <a href="#" className="text-decoration-none">
                    <i className="fa-brands fa-facebook-f social-networks"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">
                    <i className="fa-brands fa-instagram social-networks"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">
                    <i className="fa-brands fa-linkedin social-networks"></i>
                  </a>
                </li>
              </ul>

              <p className="mb-0">Copyright © {new Date().getFullYear()} ASSIST Roofing & Construction. All Rights Reserved.</p>
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
      <QuoteModal />
      <LightboxModal />
      <BackToTop />
    </div>
  );
};

