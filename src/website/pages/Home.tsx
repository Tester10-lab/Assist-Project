import React, { useState } from 'react';
import { useWebsite } from '../WebsiteContext';
import { SERVICES, PRICING_PLANS, GALLERY_PROJECTS, TESTIMONIALS, FAQS, STATS } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

export const Home: React.FC = () => {
  const { setCurrentPage } = useWebsite();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Emergency Roof Repair',
    address: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#f4f8ff] text-[#1e2e4f] font-['Sora',sans-serif]">
      {/* ── 1. HERO BANNER SECTION ── */}
      <section className="relative bg-[#1e2e4f] text-white overflow-hidden py-16 lg:py-24">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('/roofora-assets/images/banner-bg-img.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2e4f] via-[#1e2e4f]/90 to-[#1e2e4f]/60 pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 w-fit mb-6">
                <img src="/roofora-assets/images/google-icon.png" alt="Google" className="w-5 h-5 object-contain" />
                <span className="font-['Oswald',sans-serif] text-[#f19e1f] font-bold text-base tracking-wide">4.9/5.0</span>
                <span className="text-xs text-white/90 font-medium">Over 500+ Verified Roof Projects</span>
                <div className="flex text-[#f19e1f] text-xs">
                  {'★★★★★'}
                </div>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white leading-[1.08] mb-6">
                Roofing <span className="text-[#f19e1f]">Solutions</span> <br />
                For Every Home.
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-[#b7c1d5] max-w-xl mb-8 leading-relaxed font-light">
                Fast leak fixes, emergency storm repairs, and honest re-roofs. You'll deal with certified master roofers from initial drone inspection to final spotless cleanup.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
                >
                  <span>Get a Free Quote</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <a
                  href="tel:1800277478"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-base px-8 py-4 rounded-full transition-all flex items-center gap-3 backdrop-blur-sm"
                >
                  <i className="fa-solid fa-phone text-[#f19e1f]"></i>
                  <span>1800 277 478</span>
                </a>
              </div>

              {/* Floating Feature Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/15">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <img src="/roofora-assets/images/baner-white-icon1.png" alt="Clean" className="w-8 h-8 object-contain" />
                  <span className="text-xs font-semibold text-white/90">Clean Jobsite Promise</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <img src="/roofora-assets/images/baner-white-icon2.png" alt="Fast" className="w-8 h-8 object-contain" />
                  <span className="text-xs font-semibold text-white/90">Same-Week Service</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <img src="/roofora-assets/images/baner-white-icon3.png" alt="Insured" className="w-8 h-8 object-contain" />
                  <span className="text-xs font-semibold text-white/90">Fully Insured & VBA</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-[#1e2e4f]">
                <img 
                  src="/roofora-assets/images/services-bg-img.jpg" 
                  alt="Modern Roofing" 
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2e4f] via-transparent to-transparent"></div>
                
                {/* Floating highlight card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl text-[#1e2e4f]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f]">10-Year Guarantee</span>
                      <h4 className="text-lg font-bold font-['Oswald',sans-serif] uppercase">Workmanship Warranty</h4>
                    </div>
                    <div className="w-12 h-12 bg-[#1e2e4f] rounded-full flex items-center justify-center text-[#f19e1f] text-xl font-bold">
                      <i className="fa-solid fa-award"></i>
                    </div>
                  </div>
                  <p className="text-xs text-[#616a7e] mt-2 font-normal">
                    Every repair and re-roof is certified and backed by our written guarantee.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. ABOUT US PREVIEW ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Images Column */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/roofora-assets/images/about-img1.jpg" 
                  alt="Roofing Crew" 
                  className="rounded-2xl shadow-md w-full h-[280px] object-cover"
                />
                <img 
                  src="/roofora-assets/images/about-img2.jpg" 
                  alt="Quality Materials" 
                  className="rounded-2xl shadow-md w-full h-[280px] object-cover mt-8"
                />
              </div>
              
              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 left-8 bg-[#f19e1f] text-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
                <span className="text-4xl font-extrabold font-['Oswald',sans-serif]">15+</span>
                <span className="text-xs font-bold uppercase tracking-wider leading-tight">
                  Years of <br /> Excellence
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2">
                About ASSIST Roofing
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-6 leading-tight">
                Craftsmanship You Can Trust, Service You Can Count On.
              </h2>
              <p className="text-base text-[#616a7e] mb-6 leading-relaxed">
                Founded with a mission to deliver honest, transparent, and durable roofing across Melbourne, ASSIST Roofing brings over 15 years of industry-leading experience to every residential and commercial project.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f8ff] text-[#f19e1f] flex items-center justify-center font-bold">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span className="text-sm font-semibold text-[#1e2e4f]">Licensed & Insured Trades</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f8ff] text-[#f19e1f] flex items-center justify-center font-bold">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span className="text-sm font-semibold text-[#1e2e4f]">100% Upfront Pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f8ff] text-[#f19e1f] flex items-center justify-center font-bold">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span className="text-sm font-semibold text-[#1e2e4f]">Clean Jobsite Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f8ff] text-[#f19e1f] flex items-center justify-center font-bold">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span className="text-sm font-semibold text-[#1e2e4f]">10-Yr Workmanship Warranty</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="bg-[#1e2e4f] hover:bg-[#293a5b] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-colors flex items-center gap-2"
                >
                  <span>Learn More About Us</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f19e1f]/10 text-[#f19e1f] flex items-center justify-center font-bold">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#616a7e] block uppercase font-bold">Call Anytime</span>
                    <span className="text-sm font-bold text-[#1e2e4f]">1800 277 478</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. SERVICES SECTION ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Comprehensive Roofing Solutions
            </h2>
            <p className="text-base text-[#616a7e]">
              From quick leak repairs to complete structural re-roofing, our certified specialists have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((srv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e6ebf6] group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={srv.imageUrl} 
                    alt={srv.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl shadow flex items-center justify-center p-2">
                    <img src={srv.icon} alt="Icon" className="w-7 h-7 object-contain" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-3">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-[#616a7e] mb-4 leading-relaxed font-light">
                      {srv.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {srv.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-center gap-2 text-xs text-[#1e2e4f] font-medium">
                          <i className="fa-solid fa-circle-check text-[#f19e1f]"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="w-full bg-[#f4f8ff] group-hover:bg-[#f19e1f] text-[#1e2e4f] group-hover:text-white font-bold text-xs uppercase tracking-wider py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Book Service</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('services')}
              className="bg-[#1e2e4f] hover:bg-[#293a5b] text-white font-bold text-sm px-8 py-4 rounded-full transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All Roofing Services</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. CALL TO ACTION BANNER ── */}
      <section className="py-16 bg-[#1e2e4f] text-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] block mb-2">
              Ready to Upgrade?
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-2">
              Get an Honest, Itemized Quote in 24 Hours
            </h2>
            <p className="text-[#b7c1d5] text-base max-w-xl font-light">
              No hidden fees, no hard sell. Just an honest assessment from experienced roofing professionals.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all"
            >
              Request Inspection
            </button>
            <a
              href="tel:1800277478"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-4 rounded-full border border-white/30 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-phone text-[#f19e1f]"></i>
              <span>1800 277 478</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. TRANSPARENT PRICING ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Clear & Upfront Estimates
            </h2>
            <p className="text-base text-[#616a7e]">
              Every home is unique, but here is where our standard repairs start. No surprise add-ons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                  plan.popular 
                    ? 'bg-[#1e2e4f] text-white shadow-2xl scale-105 border-[#f19e1f]' 
                    : 'bg-[#f4f8ff] text-[#1e2e4f] shadow-md hover:shadow-lg border-[#e6ebf6]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#f19e1f] text-white font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-full shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 mb-6">
                    <img src={plan.icon} alt={plan.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className={`text-2xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight mb-2 ${plan.popular ? 'text-white' : 'text-[#1e2e4f]'}`}>
                    {plan.title}
                  </h3>
                  <p className={`text-xs mb-6 ${plan.popular ? 'text-[#b7c1d5]' : 'text-[#616a7e]'}`}>
                    {plan.subtitle}
                  </p>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-2xl font-bold text-[#f19e1f]">$</span>
                    <span className="text-5xl font-extrabold font-['Oswald',sans-serif]">{plan.price}</span>
                    <span className={`text-xs ml-2 ${plan.popular ? 'text-[#b7c1d5]' : 'text-[#616a7e]'}`}>/ {plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 border-t border-b py-6 border-gray-200/20">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs font-medium">
                        <i className="fa-solid fa-circle-check text-[#f19e1f]"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentPage('contact')}
                  className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-[#f19e1f] hover:bg-[#d88713] text-white shadow-lg'
                      : 'bg-[#1e2e4f] hover:bg-[#293a5b] text-white'
                  }`}
                >
                  <span>Book This Service</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. RECENT PROJECTS / PORTFOLIO ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f]">
                Recent Completed Projects
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('gallery')}
              className="bg-[#1e2e4f] hover:bg-[#293a5b] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors flex items-center gap-2"
            >
              <span>View All Projects</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_PROJECTS.slice(0, 6).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setCurrentPage('gallery')}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-[#e6ebf6]"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={proj.imageUrl} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-[#1e2e4f] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow">
                    {proj.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#f19e1f] font-semibold mb-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{proj.location}</span>
                  </div>
                  <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2 group-hover:text-[#f19e1f] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#616a7e] line-clamp-2">
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              Customer Reviews
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              What Homeowners Say
            </h2>
            <p className="text-base text-[#616a7e]">
              Over 500+ satisfied clients across Melbourne trust ASSIST Roofing for flawless execution.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#1e2e4f] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <div className="flex text-[#f19e1f] text-xl mb-6">
              {'★★★★★'}
            </div>

            <p className="text-lg sm:text-xl text-[#b7c1d5] italic leading-relaxed mb-8 font-light">
              "{TESTIMONIALS[activeTestimonial].comment}"
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
                <img 
                  src={TESTIMONIALS[activeTestimonial].imageUrl} 
                  alt={TESTIMONIALS[activeTestimonial].name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#f19e1f]"
                />
                <div>
                  <h4 className="text-lg font-bold font-['Oswald',sans-serif] uppercase text-white">
                    {TESTIMONIALS[activeTestimonial].name}
                  </h4>
                  <span className="text-xs text-[#f19e1f] font-medium block">
                    {TESTIMONIALS[activeTestimonial].location} • {TESTIMONIALS[activeTestimonial].project}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1))}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#f19e1f] flex items-center justify-center text-white transition-colors"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0))}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#f19e1f] flex items-center justify-center text-white transition-colors"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQS ACCORDION ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#616a7e]">
              Direct answers from an experienced, hands-on roofing professional.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm border border-[#e6ebf6] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left font-bold text-base text-[#1e2e4f] flex justify-between items-center gap-4 hover:text-[#f19e1f] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} text-[#f19e1f]`}></i>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 text-sm text-[#616a7e] leading-relaxed border-t border-gray-100 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. INSTANT ESTIMATE & BOOKING SECTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#1e2e4f] rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            
            <div className="lg:col-span-6">
              <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
                Free Estimate
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-6">
                Book Your 100% Free Roof Inspection
              </h2>
              <p className="text-base text-[#b7c1d5] mb-8 leading-relaxed font-light">
                Fill out the quick details and our senior estimator will contact you within 2 business hours to schedule your inspection.
              </p>

              <div className="space-y-4 text-sm text-[#b7c1d5]">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-[#f19e1f] text-lg"></i>
                  <span className="text-white font-bold">1800 277 478</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-[#f19e1f] text-lg"></i>
                  <span>info@assistroofing.com.au</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-shield-halved text-[#f19e1f] text-lg"></i>
                  <span>10-Year Guarantee on all major jobs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white text-[#1e2e4f] rounded-2xl p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#3bad20]/20 text-[#3bad20] rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-2xl font-bold font-['Oswald',sans-serif] uppercase mb-2">Thank You!</h3>
                  <p className="text-sm text-[#616a7e]">
                    Your inquiry has been received. Our team will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
                    Get an Instant Estimate
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        className="w-full bg-[#f4f8ff] border border-[#cfd8e8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#f19e1f]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        className="w-full bg-[#f4f8ff] border border-[#cfd8e8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#f19e1f]"
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1">Service Needed</label>
                    <select
                      value={quoteForm.service}
                      onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                      className="w-full bg-[#f4f8ff] border border-[#cfd8e8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#f19e1f]"
                    >
                      <option>Emergency Roof Repair</option>
                      <option>Full Re-Roofing & Replacement</option>
                      <option>Roof Inspection & Diagnosis</option>
                      <option>Gutters & Chimney Flashing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1">Property Address</label>
                    <input
                      type="text"
                      required
                      value={quoteForm.address}
                      onChange={(e) => setQuoteForm({ ...quoteForm, address: e.target.value })}
                      className="w-full bg-[#f4f8ff] border border-[#cfd8e8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#f19e1f]"
                      placeholder="e.g. 45 High St, Toorak"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Submit Free Request</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

