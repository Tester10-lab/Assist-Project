import React, { useState } from 'react';
import { useWebsite } from '../WebsiteContext';
import { FAQS } from '../data';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { asset } from '../utils/asset';

export const Home: React.FC = () => {
  const { setCurrentPage, openQuoteModal, openLightbox } = useWebsite();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  const testimonialsList = [
    {
      name: 'Jennifer Troyer',
      role: 'Satisfied Customer',
      avatar: 'JT',
      comment: 'Outstanding roofing service from start to finish. The team was punctual, highly skilled, and ensured everything was done safely and professionally. My roof looks brand new and the quality of work exceeded expectations.'
    },
    {
      name: 'Mark Reynolds',
      role: 'Homeowner, Hawthorn',
      avatar: 'MR',
      comment: 'ASSIST was honest, professional, and hands-on from the first drone inspection to the final repair. They clearly explained the issue, provided a fair transparent quote, and completed the work exactly as promised. Our Colorbond roof looks spectacular!'
    },
    {
      name: 'Lucy Smith',
      role: 'Property Manager, Brighton',
      avatar: 'LS',
      comment: 'Highly impressed with their construction expertise. They handled everything from roof repairs to structural flashing improvements with precision. The project was completed on time and within budget, with excellent communication throughout.'
    },
    {
      name: 'David Campbell',
      role: 'Verified Customer, Kew',
      avatar: 'DC',
      comment: 'Reliable and professional roofing contractors. They quickly identified the leak issue during a severe Melbourne storm, installed temporary tarping, and fixed the tile bedding permanently. Highly recommended.'
    }
  ];

  return (
    <div className="w-100 float-left">
      
      {/* ── BANNER SECTION ── */}
      <div className="padding-rl float-left w-100">
        <div className="home-outer-wrapper float-left w-100 position-relative main-box">
          <section className="float-left w-100 position-relative banner-con br-50 main-box">
            
            {/* Floating Badges */}
            <div className="banner-white-box bg-fff position-absolute var1 d-none d-md-flex wow animated fadeInLeft">
              <img src={asset('/roofora-assets/images/baner-white-icon1.png')} alt="Clean Jobsite" className="img-fluid" />
              <p className="mb-0">Clean Jobsite Promise</p>
            </div>
            <div className="banner-white-box bg-fff position-absolute var2 d-none d-md-flex wow animated fadeInUp">
              <img src={asset('/roofora-assets/images/baner-white-icon2.png')} alt="Same Week" className="img-fluid" />
              <p className="mb-0">Same-Week Service</p>
            </div>
            <div className="banner-white-box bg-fff position-absolute var3 d-none d-md-flex wow animated fadeInRight">
              <img src={asset('/roofora-assets/images/baner-white-icon3.png')} alt="Insured" className="img-fluid" />
              <p className="mb-0">Fully Insured & VBA</p>
            </div>

            <div className="wrapper1605">
              <div className="row">
                <div className="col-lg-8 col-12">
                  <div className="banner-content-con">
                    
                    {/* Rating Header */}
                    <div className="d-flex align-items-center rating-con wow animated fadeInDown">
                      <figure className="mb-0">
                        <img src={asset('/roofora-assets/images/google-icon.png')} alt="Google" className="google-icon" />
                      </figure>
                      <span className="d-inline-block rating-text text-white font-weight-600 oswald-font">4.9</span>
                      <div>
                        <span className="d-block text-size-14 text-white">4.9/5 Reviews</span>
                        <img src={asset('/roofora-assets/images/stars.png')} alt="stars" className="img-fluid" />
                      </div>
                    </div>

                    {/* Core Brand Authority Heading */}
                    <h1 className="text-size-75 text-white font-weight-700 wow animated fadeInLeft leading-tight">
                      Premium Melbourne Roofing & Home Solutions <br className="d-none d-lg-block" />
                      Built on Trust.
                    </h1>

                    {/* Subtitle with Primary Target Keywords */}
                    <p className="text-white text-size-18 wow animated fadeInLeft delay-1s max-w-2xl mt-3 mb-4">
                      Melbourne's trusted roofing contractor & roof restoration experts. We provide professional roof restorations, prompt leak repairs, and visual inspections under AS 4349.1-2007 standards with an ironclad 10-year workmanship guarantee.
                    </p>

                    {/* Action Buttons */}
                    <div className="d-flex flex-wrap align-items-center gap-3 wow animated fadeInUp delay-1s">
                      <button 
                        onClick={openQuoteModal} 
                        className="font-weight-bold secondary_btn d-inline-block text-decoration-none border-0 cursor-pointer"
                      >
                        Book Free Inspection <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                      </button>

                      <a 
                        href="tel:0478936120" 
                        className="font-weight-bold elementary_btn d-inline-block text-decoration-none"
                      >
                        Call: 0478936120 <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Down */}
            <div className="position-absolute scrol-outer d-none d-lg-block">
              <span className="d-block text-white text-size-14 font-weight-bold">Scroll Down</span>
              <a href="#about-section" className="scroll-down-arrow">
                <figure className="mb-0">
                  <img src={asset('/roofora-assets/images/arrow-down.png')} alt="arrow" className="img-fluid" />
                </figure>
              </a>
            </div>

          </section>
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <section className="float-left w-100 position-relative about-con padding-top padding-bottom main-box overflow-hidden" id="about-section">
        <div className="main-container">
          <div className="row align-items-center">
            
            {/* Left Image & Overlay Quote */}
            <div className="col-lg-5 col-md-12 mb-4 mb-lg-0">
              <div className="about-img-con position-relative">
                <div className="navy-box position-absolute bg-blue br-20 text-center shadow-lg">
                  <figure className="mx-auto overflow-hidden">
                    <img src={asset('/roofora-assets/images/quote.png')} alt="quote" style={{ width: '22px', height: 'auto', maxHeight: '22px', objectFit: 'contain', display: 'inline-block' }} />
                  </figure>
                  <p className="text-white">"If I wouldn't put it on my own home, I won't put it on yours."</p>
                  <span className="position-relative text-white font-weight-bold">Peter & Boxy • Assist Founders</span>
                </div>
                <figure className="mb-0">
                  <img src={asset('/roofora-assets/images/about-img.jpg')} alt="About ASSIST Roofing" className="img-fluid br-40 shadow-md" />
                </figure>
              </div>
            </div>

            {/* Right Story & Metrics */}
            <div className="col-lg-7 col-md-12">
              <div className="about-content-con">
                <div className="heading-title-con mb-0">
                  <span className="special-text d-block">About ASSIST</span>
                  <h2 className="text-size-56 font-weight-700">
                    Proven Roofing <br />
                    Experience You Can <br />
                    See in Every Detail
                  </h2>
                  <p className="text-size-16">
                    With over 18+ years on ladders across Melbourne, our certified Assist team handles your initial drone inspection, structural timber check, and complete installation — start to finish.
                  </p>
                  <p className="last-text text-size-16">
                    We maintain full Victorian Building Authority (VBA) plumbing registrations, carry $10M Public Liability insurance, and strictly adhere to AS 1562.1 metal and tile roofing standards.
                  </p>

                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 mt-4">
                    <button
                      onClick={() => setCurrentPage('services')}
                      className="text-decoration-none secondary_btn d-inline-block border-0"
                    >
                      Our Services & Standards <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                    </button>

                    <div className="about-bottom-img-con br-40 shadow-sm">
                      <figure><img src={asset('/roofora-assets/images/about-icon.png')} alt="experience" className="img-fluid" /></figure>
                      <div>
                        <span className="oswald-font d-inline-block text-white">
                          <AnimatedCounter end={18} suffix="+" />
                        </span>
                      </div>
                      <p className="mb-0">Years Master <br /> Experience</p>
                    </div>
                  </div>

                  {/* Counter Boxes with Animated Counting */}
                  <div className="users-details-con mt-5">
                    <div className="user-detail-box pl-0">
                      <span className="d-inline-block counter">
                        <AnimatedCounter end={3500} suffix="+" />
                      </span>
                      <p className="mb-0 text-black font-weight-600">Jobs Completed</p>
                    </div>
                    <div className="user-detail-box">
                      <span className="d-inline-block counter">
                        <AnimatedCounter end={12} suffix="+" />
                      </span>
                      <p className="mb-0 text-black font-weight-600">Expert Crew</p>
                    </div>
                    <div className="user-detail-box border-right-0">
                      <span className="d-inline-block counter">
                        <AnimatedCounter end={100} suffix="%" />
                      </span>
                      <p className="mb-0 text-black font-weight-600">Client Satisfaction</p>
                    </div>
                  </div>

                  {/* ── 4 Pillars of Excellence (Core Values) ── */}
                  <div className="mt-5 pt-3">
                    <h4 className="font-weight-700 text-size-20 mb-3 text-[#1e2e4f]">Our Core Values Built on Trust:</h4>
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <div className="d-flex align-items-start gap-2">
                          <i className="fa-solid fa-circle-check text-[#f19e1f] mt-1"></i>
                          <div>
                            <strong className="d-block text-[#1e2e4f] font-weight-700">Trust & Transparency</strong>
                            <span className="text-[#616a7e] text-size-14">Fixed-price proposals and drone photo evidence. No surprise variations.</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <div className="d-flex align-items-start gap-2">
                          <i className="fa-solid fa-compass-drafting text-[#f19e1f] mt-1"></i>
                          <div>
                            <strong className="d-block text-[#1e2e4f] font-weight-700">Precision Engineering</strong>
                            <span className="text-[#616a7e] text-size-14">Strict compliance with AS 1562.1 metal & tile roofing standards.</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <div className="d-flex align-items-start gap-2">
                          <i className="fa-solid fa-shield-heart text-[#f19e1f] mt-1"></i>
                          <div>
                            <strong className="d-block text-[#1e2e4f] font-weight-700">10-Year Durability</strong>
                            <span className="text-[#616a7e] text-size-14">Authentic Bluescope Colorbond steel & flexible polymer ridge pointing.</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <div className="d-flex align-items-start gap-2">
                          <i className="fa-solid fa-hand-holding-heart text-[#f19e1f] mt-1"></i>
                          <div>
                            <strong className="d-block text-[#1e2e4f] font-weight-700">Customer Care & Clean Sweep</strong>
                            <span className="text-[#616a7e] text-size-14">Zero-mess guarantee with magnetic nail sweeps after every job.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Meet the Leaders: Boxy & Peter ── */}
                  <div className="mt-4 p-4 rounded-3 bg-[#f4f8ff] border border-[#e6ebf6]">
                    <div className="row align-items-center">
                      <div className="col-md-7">
                        <h5 className="font-weight-700 text-size-18 mb-1 text-[#1e2e4f]">Meet Your Project Directors: Boxy & Peter</h5>
                        <p className="text-size-14 text-[#616a7e] mb-0">
                          "We don't send sales reps. Our on-site project lead <strong>Boxy</strong> and senior estimator <strong>Peter</strong> personally oversee our 4-man licensed field crew on every Melbourne roof."
                        </p>
                      </div>
                      <div className="col-md-5 text-md-right mt-3 mt-md-0">
                        <button 
                          onClick={openQuoteModal}
                          className="bg-[#f19e1f] hover:bg-[#d88713] text-white font-weight-700 rounded-pill px-4 py-2.5 text-size-14 shadow-sm border-0 transition-all cursor-pointer"
                        >
                          Book Free Roof Inspection <i className="fa-solid fa-calendar-check ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION (Interactive Expanding Cards) ── */}
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 position-relative services-con padding-top padding-bottom main-box br-50">
          <div className="main-container">
            
            <div className="row align-items-center mb-5">
              <div className="col-lg-5 col-md-12">
                <div className="heading-title-con mb-0">
                  <span className="d-block text-white special-text text-accent">Services</span>
                  <h2 className="text-size-56 text-white font-weight-700">
                    Prompt, Professional <br />
                    Roof Repairs & Solutions
                  </h2>
                </div>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="heading-title-con mb-0">
                  <p className="mb-0 sora-font text-white text-size-18">
                    From emergency storm leaks and valley replacement to full Colorbond re-roofing, our licensed team protects Melbourne homes against the 4 technical causes of roof failure: <strong>torn sarking paper, rotted rafters, cracked ridge capping, and faulty flashings.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Comprehensive Services Grid / Accordion */}
            <div className="cards-wrapper mb-0">
              {[
                {
                  id: 'residential',
                  title: 'Residential Roofing Melbourne',
                  desc: 'Premium Colorbond metal re-roofing, terracotta tile restoration, and architectural roofing engineered for Melbourne weather.',
                  img: asset('/roofora-assets/images/services-img1.jpg'),
                  iconClass: 'fa-solid fa-house-chimney',
                },
                {
                  id: 'repairs',
                  title: 'Emergency Roof Repairs & Leak Fix',
                  desc: 'Rapid storm response, ridge capping re-pointing, broken tile replacement, and precision flashing leak repair across Victoria.',
                  img: asset('/roofora-assets/images/services-img2.jpg'),
                  iconClass: 'fa-solid fa-screwdriver-wrench',
                },
                {
                  id: 'commercial',
                  title: 'Commercial & Industrial Roofing',
                  desc: 'Large-span industrial roofing, box gutter replacements, Klip-Lok metal profiles, and scheduled facility roof maintenance.',
                  img: asset('/roofora-assets/images/services-img3.jpg'),
                  iconClass: 'fa-solid fa-building',
                },
                {
                  id: 'reroofing',
                  title: 'Complete Re-Roofing & Tile-to-Metal',
                  desc: 'Full tile-to-Colorbond conversions, sarking insulation upgrades, batten repairs, and backed by a 10-year workmanship warranty.',
                  img: asset('/roofora-assets/images/services-img4.jpg'),
                  iconClass: 'fa-solid fa-shield-halved',
                },
              ].map((service, idx) => (
                <div 
                  key={service.id}
                  className={`custom-card cursor-pointer modern-service-card ${idx === 0 ? 'active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setCurrentPage('services')}
                >
                  <img src={service.img} alt={service.title} className="img-fluid service-bg-image" />
                  
                  {/* Modern Glassmorphic Overlay */}
                  <div className="modern-overlay">
                    {/* Clean Vector Icon Badge */}
                    <div className="modern-icon-badge">
                      <i className={service.iconClass}></i>
                    </div>

                    <h3 className="modern-card-title">{service.title}</h3>
                    <p className="modern-card-desc">{service.desc}</p>
                    
                    {/* Clear, High-Affordance Button */}
                    <div className="modern-card-btn-container">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage('services');
                        }}
                        className="modern-explore-btn"
                      >
                        <span>Explore Service</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>

      {/* ── PRICING SECTION ── */}
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 pricing-con position-relative padding-top padding-bottom main-box bg-sky br-50">
          <div className="main-container">
            
            <div className="heading-title-con text-center mb-5">
              <span className="special-text d-block">Transparent Pricing</span>
              <h2 className="text-size-56 font-weight-700">
                Professional Roofing & <br />
                Upfront Fixed Pricing
              </h2>
              <p className="text-size-18">
                Every Melbourne property is unique, but here is where our transparent packages start. No surprise add-ons.
              </p>
            </div>

            <div className="row">
              {/* Plan 1 */}
              <div className="col-lg-3 col-md-6 d-flex mb-4 mb-lg-0">
                <div className="pricing-box w-100 d-flex flex-column shadow-sm">
                  <figure className="price-icon"><img src={asset('/roofora-assets/images/price-icon1.png')} alt="Inspection" className="img-fluid" /></figure>
                  <h3 className="text-size-22 font-weight-700">Leak Diagnosis</h3>
                  <p>Comprehensive drone & roof inspection with high-res photo report.</p>
                  <span className="starting-at d-inline-block">Starting at:</span>
                  <div className="price-content">
                    <span className="dollar">$</span>350<span className="text-size-16">/site</span>
                  </div>
                  <ul className="list-unstyled p-0 flex-grow-1">
                    <li className="position-relative"><i className="fa-solid fa-check"></i> High-resolution drone survey</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Identifies leaks & tile rot</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> 100% credited toward repair</li>
                  </ul>
                  <button onClick={openQuoteModal} className="secondary_btn d-inline-block mt-auto border-0 text-decoration-none cursor-pointer">
                    Book Inspection <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                  </button>
                </div>
              </div>

              {/* Plan 2 */}
              <div className="col-lg-3 col-md-6 d-flex mb-4 mb-lg-0">
                <div className="pricing-box w-100 d-flex flex-column shadow-sm">
                  <figure className="price-icon"><img src={asset('/roofora-assets/images/price-icon2.png')} alt="Repair" className="img-fluid" /></figure>
                  <h3 className="text-size-22 font-weight-700">Standard Repair</h3>
                  <p>Shingle, broken tile, pipe boots, or basic flashing fixes.</p>
                  <span className="starting-at d-inline-block">Starting at:</span>
                  <div className="price-content">
                    <span className="dollar">$</span>550<span className="text-size-16">/fix</span>
                  </div>
                  <ul className="list-unstyled p-0 flex-grow-1">
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Replaces broken/cracked tiles</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Quick, same-day repairs</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Premium sealants included</li>
                  </ul>
                  <button onClick={openQuoteModal} className="secondary_btn d-inline-block mt-auto border-0 text-decoration-none cursor-pointer">
                    Book Repair <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                  </button>
                </div>
              </div>

              {/* Plan 3 */}
              <div className="col-lg-3 col-md-6 d-flex mb-4 mb-lg-0">
                <div className="pricing-box w-100 d-flex flex-column shadow-sm">
                  <figure className="price-icon"><img src={asset('/roofora-assets/images/price-icon3.png')} alt="Flashing" className="img-fluid" /></figure>
                  <h3 className="text-size-22 font-weight-700">Chimney Re-Flash</h3>
                  <p>Typical brick chimney counter-flashing and box gutter sealing.</p>
                  <span className="starting-at d-inline-block">Starting at:</span>
                  <div className="price-content">
                    <span className="dollar">$</span>850<span className="text-size-16">/job</span>
                  </div>
                  <ul className="list-unstyled p-0 flex-grow-1">
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Custom lead/Colorbond flashing</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Prevents chimney water ingress</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Built to endure heavy rain</li>
                  </ul>
                  <button onClick={openQuoteModal} className="secondary_btn d-inline-block mt-auto border-0 text-decoration-none cursor-pointer">
                    Book Re-Flash <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                  </button>
                </div>
              </div>

              {/* Plan 4 */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="pricing-box w-100 d-flex flex-column shadow-sm">
                  <figure className="price-icon"><img src={asset('/roofora-assets/images/price-icon4.png')} alt="Tarp" className="img-fluid" /></figure>
                  <h3 className="text-size-22 font-weight-700">Emergency Tarp</h3>
                  <p>Heavy duty weather-proof tarping to stop active water intrusion.</p>
                  <span className="starting-at d-inline-block">Starting at:</span>
                  <div className="price-content">
                    <span className="dollar">$</span>499<span className="text-size-16">/tarp</span>
                  </div>
                  <ul className="list-unstyled p-0 flex-grow-1">
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Immediate emergency dispatch</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> Protects ceilings & wiring</li>
                    <li className="position-relative"><i className="fa-solid fa-check"></i> 24/7 storm hotline available</li>
                  </ul>
                  <button onClick={openQuoteModal} className="secondary_btn d-inline-block mt-auto border-0 text-decoration-none cursor-pointer">
                    Request Tarp <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>
      </div>

      {/* ── CTA SECTION ── */}
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 cta-con position-relative main-box br-50 text-center">
          <div className="main-container">
            <div className="heading-title-con mb-0 position-relative">
              <span className="special-text text-white d-block">Quote Request</span>
              <h2 className="text-size-56 text-white font-weight-700">Planning a Re-Roof?</h2>
              <p className="text-white text-size-18">
                Complete tile-to-Colorbond conversions start at <span className="text-accent d-inline-block font-weight-700">$385/sqm</span> (Materials, Scaffold & Labor included).
              </p>
              <button 
                onClick={openQuoteModal} 
                className="secondary_btn d-inline-block border-0 text-decoration-none cursor-pointer"
              >
                Request Free Fixed Quote <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── PORTFOLIO SECTION ── */}
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 position-relative portfolio-con padding-top padding-bottom main-box br-50 overflow-hidden">
          <div className="main-container">
            
            <div className="row align-items-center mb-5">
              <div className="col-lg-7 col-md-12">
                <div className="heading-title-con mb-0">
                  <span className="d-block special-text">Recent Projects</span>
                  <h2 className="text-size-56 font-weight-700">
                    Expert Roofing Projects <br />
                    Completed Across Melbourne
                  </h2>
                </div>
              </div>
              <div className="col-lg-5 col-md-12">
                <div className="heading-title-con mb-0">
                  <p className="mb-0 sora-font text-size-16">
                    From minor tile restorations to full architectural standing seam metal replacements, every project is handled with Australian certified Colorbond steel and meticulous flashing work.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Project 1 */}
              <div className="col-lg-6 col-md-6 mb-4">
                <div className="portfolio-box h-100 d-flex flex-column justify-content-between p-0">
                  <div>
                    <figure 
                      className="portfolio-card-figure cursor-pointer"
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img1.jpg'), title: 'Full Roof Strip & Structural Restoration', subtitle: 'Melbourne, VIC • Timber Truss & Structural Batten Repairs' })}
                    >
                      <img 
                        src={asset('/roofora-assets/images/portfolio-img1.jpg')} 
                        alt="Full Roof Strip and Restoration" 
                        className="portfolio-card-img crop-roof-timber" 
                      />
                    </figure>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <div>
                      <span className="d-inline-block key-tags mr-2">Full Re-Roof</span>
                      <span className="d-inline-block key-tags">Restoration</span>
                      <h3 className="text-size-26 font-weight-700 mt-1 mb-0 text-[#1e2e4f]">Full Roof Strip & Restoration</h3>
                    </div>
                    <button 
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img1.jpg'), title: 'Full Roof Strip & Structural Restoration', subtitle: 'Melbourne, VIC • Timber Truss & Structural Batten Repairs' })} 
                      className="border-0 bg-transparent p-0 cursor-pointer shrink-0 ml-3"
                    >
                      <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="col-lg-6 col-md-6 mb-4">
                <div className="portfolio-box h-100 d-flex flex-column justify-content-between p-0">
                  <div>
                    <figure 
                      className="portfolio-card-figure cursor-pointer"
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img2.jpg'), title: 'AS/NZS Sarking & Batten Installation', subtitle: 'Melbourne, VIC • Heavy-Duty Vapor Barrier & Treated Timber Battens' })} 
                    >
                      <img 
                        src={asset('/roofora-assets/images/portfolio-img2.jpg')} 
                        alt="Sarking and Batten Installation" 
                        className="portfolio-card-img" 
                      />
                    </figure>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <div>
                      <span className="d-inline-block key-tags mr-2">Weatherproofing</span>
                      <span className="d-inline-block key-tags">Sarking</span>
                      <h3 className="text-size-26 font-weight-700 mt-1 mb-0 text-[#1e2e4f]">AS/NZS Sarking & Batten Install</h3>
                    </div>
                    <button 
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img2.jpg'), title: 'AS/NZS Sarking & Batten Installation', subtitle: 'Melbourne, VIC • Heavy-Duty Vapor Barrier & Treated Timber Battens' })} 
                      className="border-0 bg-transparent p-0 cursor-pointer shrink-0 ml-3"
                    >
                      <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="col-lg-6 col-md-6 mb-4">
                <div className="portfolio-box h-100 d-flex flex-column justify-content-between p-0">
                  <div>
                    <figure 
                      className="portfolio-card-figure cursor-pointer"
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img3.jpg'), title: 'Structural Rafter Carpentry & Framing', subtitle: 'Melbourne, VIC • Precision Timber Framing & Rafter Reinforcement' })} 
                    >
                      <img 
                        src={asset('/roofora-assets/images/portfolio-img3.jpg')} 
                        alt="Structural Rafter Carpentry" 
                        className="portfolio-card-img" 
                      />
                    </figure>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <div>
                      <span className="d-inline-block key-tags mr-2">Carpentry</span>
                      <span className="d-inline-block key-tags">Structural</span>
                      <h3 className="text-size-26 font-weight-700 mt-1 mb-0 text-[#1e2e4f]">Structural Rafter Framing</h3>
                    </div>
                    <button 
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img3.jpg'), title: 'Structural Rafter Carpentry & Framing', subtitle: 'Melbourne, VIC • Precision Timber Framing & Rafter Reinforcement' })} 
                      className="border-0 bg-transparent p-0 cursor-pointer shrink-0 ml-3"
                    >
                      <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project 4 */}
              <div className="col-lg-6 col-md-6 mb-4">
                <div className="portfolio-box h-100 d-flex flex-column justify-content-between p-0">
                  <div>
                    <figure 
                      className="portfolio-card-figure cursor-pointer"
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img4.jpg'), title: 'Terracotta Ridge Capping Re-Pointing', subtitle: 'Melbourne, VIC • SupaPoint Flexible Weatherproof Pointing' })} 
                    >
                      <img 
                        src={asset('/roofora-assets/images/portfolio-img4.jpg')} 
                        alt="Terracotta Ridge Capping Re-Pointing" 
                        className="portfolio-card-img" 
                      />
                    </figure>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <div>
                      <span className="d-inline-block key-tags mr-2">Terracotta</span>
                      <span className="d-inline-block key-tags">Re-Pointing</span>
                      <h3 className="text-size-26 font-weight-700 mt-1 mb-0 text-[#1e2e4f]">Terracotta Ridge Pointing</h3>
                    </div>
                    <button 
                      onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img4.jpg'), title: 'Terracotta Ridge Capping Re-Pointing', subtitle: 'Melbourne, VIC • SupaPoint Flexible Weatherproof Pointing' })} 
                      className="border-0 bg-transparent p-0 cursor-pointer shrink-0 ml-3"
                    >
                      <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </div>

      {/* ── TESTIMONIALS SECTION ── */}
      <div className="padding-rl float-left w-100">
        <section className="testimonials-con w-100 float-left padding-top padding-bottom position-relative main-box text-center br-50">
          <figure><img src={asset('/roofora-assets/images/left-quote.png')} alt="quote" className="position-absolute left-quote d-none d-md-block" /></figure>
          <figure><img src={asset('/roofora-assets/images/right-quote.png')} alt="quote" className="position-absolute right-quote d-none d-md-block" /></figure>
          
          <div className="main-container">
            
            <div className="heading-title-con text-center mb-5">
              <span className="special-text d-block">Client Reviews</span>
              <h2 className="text-size-56 font-weight-700 text-white mb-0">
                Real Feedback From <br />
                Real Homeowners
              </h2>
            </div>

            <div className="client-review-box max-w-3xl mx-auto mb-5">
              <figure className="rating-stars mb-4">
                <img src={asset('/roofora-assets/images/rating-stars.png')} alt="5 Stars" className="mx-auto" />
              </figure>
              <p className="review-text text-white text-size-18 italic leading-relaxed">
                "{testimonialsList[activeTestimonial].comment}"
              </p>
              <div className="mt-4">
                <h4 className="text-white text-size-22 font-weight-700 mb-1">{testimonialsList[activeTestimonial].name}</h4>
                <span className="text-accent text-size-14 font-weight-600">{testimonialsList[activeTestimonial].role}</span>
              </div>
            </div>

            {/* Circular Avatar Selector */}
            <div className="d-flex justify-content-center align-items-center gap-4 mt-5">
              {testimonialsList.map((t, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`cursor-pointer rounded-circle d-flex align-items-center justify-content-center font-weight-700 transition-all ${
                    activeTestimonial === idx 
                      ? 'border-2 border-[#f19e1f] scale-110 shadow-lg bg-[#f19e1f] text-white' 
                      : 'opacity-60 hover:opacity-100 bg-white/20 text-white'
                  }`}
                  style={{ width: '58px', height: '58px', fontSize: '18px', letterSpacing: '0.5px' }}
                >
                  {t.avatar}
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>

      {/* ── FAQ SECTION ── */}
      <section className="float-left w-100 position-relative faq-con padding-top padding-bottom main-box">
        <div className="main-container">
          
          <div className="heading-title-con text-center mb-5">
            <span className="special-text d-block">Frequently Asked Questions</span>
            <h2 className="text-size-56 font-weight-700 text-[#1e2e4f]">
              Clear Answers for Your <br />
              Roofing Concerns
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`accordion-card mb-4 shadow-sm border transition-all rounded-3xl overflow-hidden ${
                    isOpen ? 'border-[#f19e1f] bg-[#f4f8ff]/50' : 'border-[#e6ebf6] bg-white'
                  }`}
                >
                  <div 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="d-flex justify-content-between align-items-center p-4 cursor-pointer"
                  >
                    <h3 className="text-size-22 font-weight-700 mb-0 text-[#1e2e4f] pr-4">
                      {faq.q}
                    </h3>
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-[#f19e1f] text-white' : 'bg-[#1e2e4f] text-white'
                      }`}
                      style={{ width: '42px', height: '42px' }}
                    >
                      <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-[#e6ebf6]">
                      <p className="text-size-16 text-[#616a7e] mb-0 leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── NEWSLETTER / PROMO BAR ── */}
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 newsletter-con position-relative main-box bg-blue padding-top padding-bottom text-center br-50">
          <div className="main-container">
            <h2 className="text-size-56 font-weight-700 text-white mb-4">
              Schedule Your Free On-Site Drone Inspection
            </h2>
            <p className="text-white text-size-18 max-w-2xl mx-auto mb-5">
              Get an accurate, fixed-price quote and photographic defect report with zero high-pressure sales tactics.
            </p>
            <button
              onClick={openQuoteModal}
              className="secondary_btn d-inline-block border-0 text-decoration-none cursor-pointer"
            >
              Book Inspection Online <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
            </button>
          </div>
        </section>
      </div>

    </div>
  );
};


