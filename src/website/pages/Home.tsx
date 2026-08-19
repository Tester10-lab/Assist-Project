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
      img: asset('/roofora-assets/images/client-img1.jpg'),
      comment: 'Outstanding roofing service from start to finish. The team was punctual, highly skilled, and ensured everything was done safely and professionally. My roof looks brand new and the quality of work exceeded expectations.'
    },
    {
      name: 'Mark Reynolds',
      role: 'Homeowner, Hawthorn',
      img: asset('/roofora-assets/images/client-img2.jpg'),
      comment: 'ASSIST was honest, professional, and hands-on from the first drone inspection to the final repair. They clearly explained the issue, provided a fair transparent quote, and completed the work exactly as promised. Our Colorbond roof looks spectacular!'
    },
    {
      name: 'Lucy Smith',
      role: 'Property Manager, Brighton',
      img: asset('/roofora-assets/images/client-img3.jpg'),
      comment: 'Highly impressed with their construction expertise. They handled everything from roof repairs to structural flashing improvements with precision. The project was completed on time and within budget, with excellent communication throughout.'
    },
    {
      name: 'David Campbell',
      role: 'Verified Customer, Kew',
      img: asset('/roofora-assets/images/client-img4.jpg'),
      comment: 'Reliable and professional roofing contractors. They quickly identified the leak issue during a severe Melbourne storm, installed temporary tarping, and fixed the tile bedding permanently. Highly recommended.'
    }
  ];

  return (
    <div className="w-100 float-left">
      
      {/* â”€â”€ BANNER SECTION â”€â”€ */}
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

                    {/* Big Heading */}
                    <h1 className="text-size-90 text-white font-weight-700 wow animated fadeInLeft">
                      Roofing <br />
                      Solutions for <br />
                      Every Home.
                    </h1>

                    {/* Subtitle */}
                    <p className="text-white text-size-18 wow animated fadeInLeft delay-1s">
                      Fast leak fixes, emergency storm repairs, and honest re-roofs. You'll deal with certified master roofers from initial drone inspection to final spotless cleanup.
                    </p>

                    {/* Action Buttons */}
                    <div className="d-flex flex-wrap align-items-center gap-3 wow animated fadeInUp delay-1s">
                      <button 
                        onClick={openQuoteModal} 
                        className="font-weight-bold secondary_btn d-inline-block text-decoration-none border-0 cursor-pointer"
                      >
                        Get a Quote <span className=""><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                      </button>

                      <a 
                        href="tel:1800277478" 
                        className="font-weight-bold elementary_btn d-inline-block text-decoration-none"
                      >
                        1800 277 478 <span className=""><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
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

      {/* â”€â”€ ABOUT SECTION â”€â”€ */}
      <section className="float-left w-100 position-relative about-con padding-top padding-bottom main-box overflow-hidden" id="about-section">
        <div className="main-container">
          <div className="row align-items-center">
            
            {/* Left Image & Overlay Quote */}
            <div className="col-lg-5 col-md-12 mb-4 mb-lg-0">
              <div className="about-img-con position-relative">
                <div className="navy-box position-absolute bg-blue br-20 text-center shadow-lg">
                  <figure><img src={asset('/roofora-assets/images/quote.png')} alt="quote" className="img-fluid" /></figure>
                  <p className="text-white">"If I wouldn't put it on my own home, I won't put it on yours."</p>
                  <span className="position-relative text-white font-weight-bold">Peter & Batshal â€¢ Assist Founders</span>
                </div>
                <figure className="mb-0">
                  <img src={asset('/roofora-assets/images/about-img.jpg')} alt="About ASSIST Roofing" className="img-fluid br-40 shadow-md" />
                </figure>
                <figure className="position-absolute z-1 about-vector">
                  <img src={asset('/roofora-assets/images/about-vector.png')} alt="vector" className="img-fluid" />
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
                    With over 18+ years on ladders across Melbourne, our certified Assist team handles your initial drone inspection, structural timber check, and complete installationâ€”start to finish.
                  </p>
                  <p className="last-text text-size-16">
                    We maintain full Victorian Building Authority (VBA) plumbing registrations, carry $20M Public Liability insurance, and strictly adhere to AS 1562.1 metal and tile roofing standards.
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
                    <div className="user-detrail-box pl-0">
                      <span className="d-inline-block counter">
                        <AnimatedCounter end={500} suffix="+" />
                      </span>
                      <p className="mb-0 text-black font-weight-600">Jobs Completed</p>
                    </div>
                    <div className="user-detrail-box">
                      <span className="d-inline-block counter">
                        <AnimatedCounter end={25} suffix="+" />
                      </span>
                      <p className="mb-0 text-black font-weight-600">Expert Crew</p>
                    </div>
                    <div className="user-detrail-box border-right-0">
                      <span className="d-inline-block counter">
                        <AnimatedCounter end={100} suffix="%" />
                      </span>
                      <p className="mb-0 text-black font-weight-600">Client Satisfaction</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€ SERVICES SECTION (Interactive Expanding Cards) â”€â”€ */}
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 position-relative services-con padding-top padding-bottom main-box br-50">
          <div className="main-container">
            
            <div className="row align-items-center mb-5">
              <div className="col-lg-5 col-md-12">
                <div className="heading-title-con mb-0">
                  <span className="d-block text-white special-text text-accent">Services</span>
                  <h2 className="text-size-56 text-white font-weight-700">
                    Roofing Services <br />
                    You Can Trust
                  </h2>
                </div>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="heading-title-con mb-0">
                  <p className="mb-0 sora-font text-white text-size-18">
                    At ASSIST Roofing, we handle every Melbourne project personally from start to finish. With over 18 years of hands-on experience, we inspect, quote, and complete your roof ourselvesâ€”no middlemen, no confusion.
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion Flex Cards Wrapper */}
            <div className="cards-wrapper mb-0">
              
              {/* Card 1 */}
              <div 
                className="custom-card"
                onClick={() => setCurrentPage('services')}
              >
                <img src={asset('/roofora-assets/images/services-img1.jpg')} alt="Residential Roofing" className="img-fluid" />
                <div className="overlay">
                  <figure><img src={asset('/roofora-assets/images/service-icon1.png')} alt="Residential icon" className="img-fluid" /></figure>
                  <h3>Residential Roofing</h3>
                  <p className="mb-0">Keep your home safe and beautiful with our premium re-roofing, Colorbond metal upgrades, and leak diagnoses.</p>
                </div>
                <span className="secondary_btn d-inline-block">
                  Explore <span className=""><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                </span>
              </div>

              {/* Card 2 */}
              <div 
                className="custom-card"
                onClick={() => setCurrentPage('services')}
              >
                <img src={asset('/roofora-assets/images/services-img2.jpg')} alt="Roof Repairs" className="img-fluid" />
                <div className="overlay">
                  <figure><img src={asset('/roofora-assets/images/service-icon2.png')} alt="Repairs icon" className="img-fluid" /></figure>
                  <h3>Roof Repairs & Maintenance</h3>
                  <p className="mb-0">Fast storm leak repairs, ridge capping re-pointing, broken tile replacements, and gutter flashing restorations.</p>
                </div>
                <span className="secondary_btn d-inline-block">
                  Explore <span className=""><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                </span>
              </div>

              {/* Card 3 */}
              <div 
                className="custom-card"
                onClick={() => setCurrentPage('services')}
              >
                <img src={asset('/roofora-assets/images/services-img3.jpg')} alt="Commercial Roofing" className="img-fluid" />
                <div className="overlay">
                  <figure><img src={asset('/roofora-assets/images/service-icon3.png')} alt="Commercial icon" className="img-fluid" /></figure>
                  <h3>Commercial Roofing</h3>
                  <p className="mb-0">Large-span industrial roof installations, box gutter replacement, Klip-Lok systems, and scheduled facility maintenance.</p>
                </div>
                <span className="secondary_btn d-inline-block">
                  Explore <span className=""><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                </span>
              </div>

              {/* Card 4 */}
              <div 
                className="custom-card"
                onClick={() => setCurrentPage('services')}
              >
                <img src={asset('/roofora-assets/images/services-img4.jpg')} alt="Roof Replacement" className="img-fluid" />
                <div className="overlay">
                  <figure><img src={asset('/roofora-assets/images/service-icon4.png')} alt="Replacement icon" className="img-fluid" /></figure>
                  <h3>Full Re-Roofing</h3>
                  <p className="mb-0">Complete tile-to-Colorbond conversions, sarking insulation, batten repairs, and full 10-year workmanship warranties.</p>
                </div>
                <span className="secondary_btn d-inline-block">
                  Explore <span className=""><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
                </span>
              </div>

            </div>

          </div>
        </section>
      </div>

      <div className="spacer"></div>

      {/* â”€â”€ PRICING SECTION â”€â”€ */}
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
                    <span className="dollar">$</span>99<span className="text-size-16">/site</span>
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
                    <span className="dollar">$</span>249<span className="text-size-16">/fix</span>
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
                    <span className="dollar">$</span>550<span className="text-size-16">/job</span>
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
                    <span className="dollar">$</span>189<span className="text-size-16">/tarp</span>
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

      <div className="spacer"></div>

      {/* â”€â”€ CTA SECTION â”€â”€ */}
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 cta-con position-relative main-box br-50 text-center">
          <figure><img src={asset('/roofora-assets/images/cta-vector.png')} alt="vector" className="position-absolute cta-vector d-none d-md-block" /></figure>
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

      {/* â”€â”€ PORTFOLIO SECTION â”€â”€ */}
      <section className="float-left w-100 position-relative portfolio-con padding-top padding-bottom main-box overflow-hidden">
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
            <div className="col-lg-5 col-md-6 mb-4">
              <div className="portfolio-box left-img">
                <figure 
                  className="cursor-pointer"
                  onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img1.jpg'), title: 'Full Roof Replacement', subtitle: 'South Yarra, VIC â€¢ Architectural Standing Seam Colorbond' })}
                >
                  <img src={asset('/roofora-assets/images/portfolio-img1.jpg')} alt="Full Roof Replacement" className="img-fluid" />
                </figure>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="d-inline-block key-tags mr-2">Residential</span>
                    <span className="d-inline-block key-tags">Colorbond</span>
                    <h3 className="text-size-30 font-weight-700">Full Roof Replacement</h3>
                  </div>
                  <button 
                    onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img1.jpg'), title: 'Full Roof Replacement', subtitle: 'South Yarra, VIC â€¢ Architectural Standing Seam Colorbond' })} 
                    className="border-0 bg-transparent p-0 cursor-pointer"
                  >
                    <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                  </button>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="col-lg-7 col-md-6 mb-4">
              <div className="portfolio-box pt-0 right-img">
                <figure 
                  className="cursor-pointer"
                  onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img2.jpg'), title: 'Storm Damage Roof Repair', subtitle: 'Hawthorn, VIC â€¢ High-Pressure Emergency Valley Replacement' })}
                >
                  <img src={asset('/roofora-assets/images/portfolio-img2.jpg')} alt="Storm Damage Roof Repair" className="img-fluid" />
                </figure>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="d-inline-block key-tags mr-2">Leak Fix</span>
                    <span className="d-inline-block key-tags">Emergency</span>
                    <h3 className="text-size-30 font-weight-700">Storm Damage Roof Repair</h3>
                  </div>
                  <button 
                    onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img2.jpg'), title: 'Storm Damage Roof Repair', subtitle: 'Hawthorn, VIC â€¢ High-Pressure Emergency Valley Replacement' })} 
                    className="border-0 bg-transparent p-0 cursor-pointer"
                  >
                    <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                  </button>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="col-lg-7 col-md-6 mb-4">
              <div className="portfolio-box left-img">
                <figure 
                  className="cursor-pointer"
                  onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img3.jpg'), title: 'Brick Chimney Re-Flash', subtitle: 'Kew, VIC â€¢ Precision Lead Counter-Flashing' })}
                >
                  <img src={asset('/roofora-assets/images/portfolio-img3.jpg')} alt="Brick Chimney Re-flash" className="img-fluid" />
                </figure>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="d-inline-block key-tags mr-2">Masonry</span>
                    <span className="d-inline-block key-tags">Flashing</span>
                    <h3 className="text-size-30 font-weight-700">Brick Chimney Re-Flash</h3>
                  </div>
                  <button 
                    onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img3.jpg'), title: 'Brick Chimney Re-Flash', subtitle: 'Kew, VIC â€¢ Precision Lead Counter-Flashing' })} 
                    className="border-0 bg-transparent p-0 cursor-pointer"
                  >
                    <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                  </button>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="col-lg-5 col-md-6 mb-4">
              <div className="portfolio-box pt-0 right-img">
                <figure 
                  className="cursor-pointer"
                  onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img4.jpg'), title: 'Terracotta Tile Restoration', subtitle: 'Brighton, VIC â€¢ Re-bedding & Weatherproof Membrane' })}
                >
                  <img src={asset('/roofora-assets/images/portfolio-img4.jpg')} alt="Shingle Roof Replacement" className="img-fluid" />
                </figure>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="d-inline-block key-tags mr-2">Premium</span>
                    <span className="d-inline-block key-tags">Restoration</span>
                    <h3 className="text-size-30 font-weight-700">Terracotta Tile Restoration</h3>
                  </div>
                  <button 
                    onClick={() => openLightbox({ src: asset('/roofora-assets/images/portfolio-img4.jpg'), title: 'Terracotta Tile Restoration', subtitle: 'Brighton, VIC â€¢ Re-bedding & Weatherproof Membrane' })} 
                    className="border-0 bg-transparent p-0 cursor-pointer"
                  >
                    <img src={asset('/roofora-assets/images/up-right-lg-arrow.png')} alt="arrow" className="border-radius-0 mb-0" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* â”€â”€ TESTIMONIALS SECTION â”€â”€ */}
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
                  className={`cursor-pointer rounded-circle p-1 transition-all ${
                    activeTestimonial === idx 
                      ? 'border border-warning scale-110 shadow-lg' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ width: '64px', height: '64px' }}
                >
                  <img src={t.img} alt={t.name} className="w-100 h-100 rounded-circle object-cover" />
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>

      {/* â”€â”€ FAQ SECTION â”€â”€ */}
      <section className="float-left w-100 position-relative faq-con padding-top padding-bottom main-box">
        <div className="main-container">
          
          <div className="heading-title-con text-center mb-5">
            <span className="special-text d-block">Frequently Asked Questions</span>
            <h2 className="text-size-56 font-weight-700">
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
                  className={`accordion-card mb-4 shadow-sm border ${isOpen ? 'border-warning' : 'border-light'}`}
                >
                  <div 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="d-flex justify-content-between align-items-center p-4 cursor-pointer"
                  >
                    <h3 className="text-size-22 font-weight-700 mb-0 text-dark pr-4">
                      {faq.q}
                    </h3>
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                        isOpen ? 'bg-warning text-white' : 'bg-primary text-white'
                      }`}
                      style={{ width: '42px', height: '42px' }}
                    >
                      <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-top">
                      <p className="text-size-16 text-muted mb-0 leading-relaxed">
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

      {/* â”€â”€ NEWSLETTER / PROMO BAR â”€â”€ */}
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


