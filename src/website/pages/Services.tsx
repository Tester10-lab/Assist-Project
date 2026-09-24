import React, { useState } from 'react';
import { SERVICE_AREAS, ALL_SERVICES_OFFERED, ADDITIONAL_OFFERINGS, GALLERY_PROJECTS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { useCmsContent } from '../useCmsContent';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';
import { CORE_SERVICES_DATA } from '../servicesData';
import type { CoreServiceSlug } from '../types';

export const Services: React.FC = () => {
  const { currentServiceSlug, navigateTo, openQuoteModal } = useWebsite();
  const { services: cmsServices, pages } = useCmsContent();
  const [activeCategory, setActiveCategory] = useState<'all' | 'repairs' | 'replacement' | 'restoration' | 'gutters'>('all');

  const allServices = cmsServices && cmsServices.length > 0 ? cmsServices : ALL_SERVICES_OFFERED;

  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  const workflowSteps = [
    {
      num: '01',
      title: 'Drone & Attic Inspection',
      desc: 'High resolution digital drone capture and moisture meter readings of all valleys, flashings, and structural timbers.',
    },
    {
      num: '02',
      title: 'Itemized Quote & Options',
      desc: 'Transparent fixed-price proposal detailing materials, timelines, and warranty terms with zero hidden fees.',
    },
    {
      num: '03',
      title: 'Precision Craftsmanship',
      desc: 'Licensed VBA trades install premium Colorbond steel or terracotta tiles with continuous safety compliance.',
    },
    {
      num: '04',
      title: 'Clean Sweep & 10-Yr Signoff',
      desc: 'Industrial magnetic nail sweep, thorough debris disposal, and formal handover of your 10-year warranty.',
    },
  ];

  // Helper for crawlable navigation
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'services' | 'contact' | 'gallery', slug?: CoreServiceSlug | null) => {
    e.preventDefault();
    if (page === 'services') {
      navigateTo('services', slug || null);
    } else {
      navigateTo(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a valid core service slug is active, render dedicated deep-dive service view
  if (currentServiceSlug && CORE_SERVICES_DATA[currentServiceSlug]) {
    const service = CORE_SERVICES_DATA[currentServiceSlug];
    const relatedProjects = GALLERY_PROJECTS.filter(p =>
      p.category.toLowerCase().includes(service.matchingGalleryCategory.toLowerCase()) ||
      service.matchingGalleryCategory.toLowerCase().includes(p.category.toLowerCase())
    ).slice(0, 3);

    const otherServices = (Object.keys(CORE_SERVICES_DATA) as CoreServiceSlug[])
      .filter(s => s !== currentServiceSlug)
      .map(s => CORE_SERVICES_DATA[s]);

    return (
      <div className="w-full bg-white text-[#1e2e4f] font-['Sora',sans-serif]">
        {/* ── Service Deep Dive Banner ── */}
        <section className="relative bg-[#1e2e4f] text-white py-16 lg:py-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{ backgroundImage: `url('${asset(service.heroImage)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e2e4f] via-[#1e2e4f]/95 to-[#1e2e4f]/80 pointer-events-none" />

          <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleNav(e, 'home')}
                    className="text-[#b7c1d5] hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li className="text-[#f19e1f] font-bold">/</li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleNav(e, 'services')}
                    className="text-[#b7c1d5] hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li className="text-[#f19e1f] font-bold">/</li>
                <li className="text-white" aria-current="page">
                  {service.name}
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-3 block">
                Melbourne Roofing Specialists • VBA Registered
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-4 leading-tight">
                {service.heroHeading}
              </h1>
              <p className="text-base sm:text-lg text-[#b7c1d5] mb-8 font-light leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openQuoteModal(service.name)}
                  className="bg-[#f19e1f] hover:bg-[#d88713] text-[#1e2e4f] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Free Inspection</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
                <a
                  href="tel:0478936120"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all border border-white/20 flex items-center gap-2"
                >
                  <i className="fa-solid fa-phone text-[#f19e1f]"></i>
                  <span>Call 0478 936 120</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Trust Badges ── */}
        <div className="bg-[#f4f8ff] border-b border-[#e6ebf6] py-4">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-[#1e2e4f]">
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-certificate text-[#f19e1f]"></i>
                VBA Registered Trades
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-shield text-[#f19e1f]"></i>
                $10M Public Liability Insured
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-award text-[#f19e1f]"></i>
                10-Year Workmanship Warranty
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-star text-[#f19e1f]"></i>
                4.9/5 Rating (520+ Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* ── AEO Answer Definition Block & Scope Inclusions ── */}
        <section className="py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Column: AEO Definition & Features */}
              <div className="lg:col-span-8">
                {/* AEO Concise Definition (Optimized for AI Overviews & Search Snippets) */}
                <div className="bg-[#f4f8ff] border-l-4 border-[#f19e1f] rounded-r-2xl p-6 sm:p-8 mb-10 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] block mb-2">
                    Service Overview & Compliance
                  </span>
                  <p className="text-base sm:text-lg text-[#1e2e4f] leading-relaxed font-normal">
                    {service.aeoSummary}
                  </p>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-6">
                  What Is Included In Our {service.name}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 border border-[#e6ebf6] flex items-start gap-3 shadow-sm hover:border-[#f19e1f] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#f19e1f]/15 text-[#f19e1f] flex items-center justify-center shrink-0 mt-0.5">
                        <i className="fa-solid fa-check text-xs"></i>
                      </div>
                      <span className="text-sm font-medium text-[#1e2e4f] leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* When Does Your Roof Need [Service] */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-6">
                    {service.whenNeededTitle}
                  </h2>
                  <div className="space-y-3">
                    {service.whenNeededSigns.map((sign, idx) => (
                      <div
                        key={idx}
                        className="bg-[#f8faff] rounded-xl p-4 border border-[#e6ebf6] flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#1e2e4f]/10 text-[#1e2e4f] flex items-center justify-center shrink-0 mt-0.5">
                          <i className="fa-solid fa-triangle-exclamation text-xs text-[#f19e1f]"></i>
                        </div>
                        <span className="text-sm text-[#1e2e4f] leading-snug font-normal">
                          {sign}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transparent Pricing Note */}
                <div className="bg-[#1e2e4f] text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#f19e1f] tracking-wider block mb-1">
                      Transparent Pricing Guarantee
                    </span>
                    <p className="text-sm text-[#b7c1d5] font-light">
                      {service.pricingText}. No hidden callout charges or surprise invoices.
                    </p>
                  </div>
                  <button
                    onClick={() => openQuoteModal(service.name)}
                    className="bg-[#f19e1f] hover:bg-[#d88713] text-[#1e2e4f] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shrink-0 cursor-pointer"
                  >
                    Get Free Quote
                  </button>
                </div>

                {/* Related Service Contextual Anchor */}
                <div className="bg-[#f4f8ff] border border-[#d6e2f5] rounded-2xl p-6 mb-10">
                  <span className="text-xs uppercase font-bold text-[#f19e1f] tracking-wider block mb-1">
                    Related Service Assessment
                  </span>
                  <h3 className="text-lg font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2">
                    Considering {service.relatedPillarName}?
                  </h3>
                  <p className="text-sm text-[#616a7e] leading-relaxed font-light mb-4">
                    {service.relatedPillarBlurb}
                  </p>
                  <a
                    href={service.relatedPillarSlug}
                    onClick={(e) => handleNav(e, 'services', service.relatedPillarSlug.replace('/services/', '') as CoreServiceSlug)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1e2e4f] hover:text-[#f19e1f] transition-colors"
                  >
                    <span>Explore {service.relatedPillarName}</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </a>
                </div>

                {/* Visible FAQs matching FAQPage Schema */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-6">
                    Frequently Asked Questions About {service.name}
                  </h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-[#f8faff] rounded-2xl p-6 border border-[#e6ebf6]">
                        <h3 className="text-base font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2">
                          {faq.q}
                        </h3>
                        <p className="text-sm text-[#616a7e] leading-relaxed font-light">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Contact & Other Core Services */}
              <div className="lg:col-span-4 space-y-6">
                {/* Free Quote Card */}
                <div className="bg-[#f4f8ff] rounded-3xl p-6 sm:p-8 border border-[#d6e2f5] shadow-sm">
                  <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2">
                    Request an Inspection
                  </h3>
                  <p className="text-xs text-[#616a7e] mb-6 font-light">
                    Have Peter or Boxy conduct a comprehensive condition inspection of your Melbourne roof.
                  </p>
                  <button
                    onClick={() => openQuoteModal(service.name)}
                    className="w-full bg-[#1e2e4f] hover:bg-[#f19e1f] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-md mb-3 cursor-pointer text-center block"
                  >
                    Request Free Assessment
                  </button>
                  <a
                    href="tel:0478936120"
                    className="w-full bg-white hover:bg-[#f8faff] border border-[#cbd5e1] text-[#1e2e4f] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-center"
                  >
                    <i className="fa-solid fa-phone text-[#f19e1f]"></i>
                    <span>0478 936 120</span>
                  </a>
                </div>

                {/* Other Core Services Links */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6ebf6] shadow-sm">
                  <h4 className="text-base font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
                    Other Roofing Services
                  </h4>
                  <ul className="space-y-2">
                    {otherServices.map((other) => (
                      <li key={other.slug}>
                        <a
                          href={other.canonicalPath}
                          onClick={(e) => handleNav(e, 'services', other.slug)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f4f8ff] text-sm text-[#1e2e4f] hover:text-[#f19e1f] font-medium transition-colors border border-transparent hover:border-[#e6ebf6]"
                        >
                          <span>{other.name}</span>
                          <i className="fa-solid fa-arrow-right text-xs text-[#b7c1d5]"></i>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href="/services"
                        onClick={(e) => handleNav(e, 'services')}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#f8faff] text-xs uppercase tracking-wider font-bold text-[#1e2e4f] hover:text-[#f19e1f] transition-colors mt-2"
                      >
                        <span>View All 24 Services</span>
                        <i className="fa-solid fa-chevron-right text-xs text-[#f19e1f]"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Service Areas */}
                <div className="bg-[#1e2e4f] text-white rounded-3xl p-6 sm:p-8">
                  <h4 className="text-base font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-2">
                    Melbourne Coverage
                  </h4>
                  <p className="text-xs text-[#b7c1d5] mb-4 font-light">
                    Providing {service.name} across inner and outer Melbourne:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SERVICE_AREAS.slice(0, 10).map((area, idx) => (
                      <span key={idx} className="bg-white/10 text-[11px] px-2.5 py-1 rounded-full text-white/90">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Related Recent Projects ── */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-[#f4f8ff] border-t border-[#e6ebf6]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] block mb-2">
                    Verified Craftsmanship
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f]">
                    Recent {service.name} Projects Across Melbourne
                  </h2>
                </div>
                <a
                  href="/projects"
                  onClick={(e) => handleNav(e, 'gallery')}
                  className="text-xs font-bold uppercase tracking-wider text-[#1e2e4f] hover:text-[#f19e1f] flex items-center gap-1 transition-colors"
                >
                  <span>View All Projects</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((proj) => (
                  <div key={proj.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e6ebf6] group">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={asset(proj.imageUrl)}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-[#1e2e4f]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {proj.location}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#616a7e] font-light leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom Call To Action ── */}
        <section className="py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="bg-[#f19e1f] p-8 sm:p-12 rounded-3xl text-[#1e2e4f] flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2">
                  Ready To Discuss Your {service.name}?
                </h2>
                <p className="text-sm font-semibold text-[#1e2e4f]/90 max-w-xl">
                  Get in touch with Peter & Boxy today for genuine advice, transparent fixed pricing, and certified workmanship.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => openQuoteModal(service.name)}
                  className="bg-[#1e2e4f] hover:bg-[#152138] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
                >
                  Book Free Assessment
                </button>
                <a
                  href="tel:0478936120"
                  className="bg-white hover:bg-slate-50 text-[#1e2e4f] font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all shadow-sm"
                >
                  0478 936 120
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise render the full service catalog overview (/services)
  return (
    <div className="w-full bg-white text-[#1e2e4f] font-['Sora',sans-serif]">
      {/* ── Sub Banner ── */}
      <section className="relative bg-[#1e2e4f] text-white py-16 lg:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('${asset('/roofora-assets/images/sub-banner-bg-img.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2e4f] via-[#1e2e4f]/90 to-[#1e2e4f]/70 pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-4">
            {pages?.services?.heroHeading || 'Roofing Services Melbourne'}
          </h1>
          <p className="text-base sm:text-lg text-[#b7c1d5] max-w-2xl mx-auto mb-6 font-light">
            {pages?.services?.heroDescription || 'Comprehensive residential and commercial roofing solutions across Melbourne backed by 15+ years of licensed VBA Australian excellence.'}
          </p>

          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
              <li>
                <a href="/" onClick={(e) => handleNav(e, 'home')} className="text-[#b7c1d5] hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li className="text-[#f19e1f] font-bold">/</li>
              <li className="text-white" aria-current="page">Services</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ── Core Service Architecture Hub (6 Dedicated Services) ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Specialized Roofing Solutions
            </h2>
            <p className="text-base text-[#616a7e]">
              Every job is performed with Australian-made materials meeting strict AS 4349.1 building standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Object.keys(CORE_SERVICES_DATA) as CoreServiceSlug[]).map((slug) => {
              const item = CORE_SERVICES_DATA[slug];
              return (
                <motion.div
                  key={slug}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#e6ebf6] flex flex-col justify-between group"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={asset(item.heroImage)}
                      alt={item.heroHeading}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e2e4f]/80 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#1e2e4f] font-bold text-xs uppercase px-3 py-1 rounded-full">
                      Melbourne Wide
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2 group-hover:text-[#f19e1f] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#616a7e] mb-4 leading-relaxed font-light line-clamp-3">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f0f4fa] flex items-center justify-between">
                      <a
                        href={item.canonicalPath}
                        onClick={(e) => handleNav(e, 'services', slug)}
                        className="text-xs font-bold text-[#1e2e4f] group-hover:text-[#f19e1f] flex items-center gap-1.5 transition-colors"
                      >
                        <span>Explore Service</span>
                        <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </a>
                      <button
                        onClick={() => openQuoteModal(item.name)}
                        className="text-xs font-bold text-[#f19e1f] hover:text-[#d88713] cursor-pointer"
                      >
                        Book Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services We Offer & Many More (24 Checklist Items) ── */}
      <section id="services-checklist" className="py-20 bg-white border-b border-[#e6ebf6]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              Complete Melbourne Roofing Scope
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Services We Offer — And Many More
            </h2>
            <p className="text-base text-[#616a7e] leading-relaxed">
              From emergency storm damage repairs and pinpoint leak detection to full Colorbond replacements and new guttering — our certified team covers every facet of residential and commercial roofing across Melbourne and Victoria.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'all', label: `All Services (${allServices.length})` },
              { id: 'repairs', label: `Repairs & Leaks (${allServices.filter(s => s.category === 'repairs').length})` },
              { id: 'replacement', label: `Installation & Replacement (${allServices.filter(s => s.category === 'replacement').length})` },
              { id: 'restoration', label: `Restoration & Painting (${allServices.filter(s => s.category === 'restoration').length})` },
              { id: 'gutters', label: `Gutters & Additions (${allServices.filter(s => s.category === 'gutters').length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#1e2e4f] text-white shadow-md'
                    : 'bg-[#f4f8ff] text-[#1e2e4f] hover:bg-[#e2ebfa] border border-[#d6e2f5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Checklist Grid (Exact 24 Items from User's List) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.02 }}
                className="bg-[#f8faff] hover:bg-white rounded-2xl p-6 border border-[#e6ebf6] hover:border-[#f19e1f] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0 text-[#dc2626] font-extrabold shadow-sm group-hover:bg-[#dc2626] group-hover:text-white transition-colors">
                      <i className="fa-solid fa-check text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] group-hover:text-[#f19e1f] transition-colors leading-snug">
                        {service.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8a96a8]">
                        {service.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#616a7e] leading-relaxed mb-4 pl-11">
                    {service.description || service.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#eaf0fa] flex items-center justify-between pl-11">
                  <span className="text-[11px] font-semibold text-[#1e2e4f] bg-white px-2.5 py-1 rounded-full border border-[#dde5f4]">
                    {service.badge}
                  </span>
                  <button
                    onClick={() => openQuoteModal(service.name)}
                    className="text-xs font-bold text-[#f19e1f] hover:text-[#d88713] flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Book Service</span>
                    <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Custom & Specialized Work Callout ── */}
          <div className="bg-gradient-to-br from-[#1e2e4f] to-[#15233d] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f19e1f]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] block mb-2">
                    Custom & Specialized Work
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white">
                    ... And Many More Specialized Roofing Services
                  </h3>
                  <p className="text-sm text-[#b7c1d5] max-w-2xl mt-2 font-light">
                    Have a unique architectural design, heritage requirement, or complex commercial roof? Our Melbourne crew handles custom requests with direct project director supervision.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="tel:0478936120"
                    className="bg-[#f19e1f] hover:bg-[#d88713] text-[#1e2e4f] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md flex items-center gap-2"
                  >
                    <i className="fa-solid fa-phone"></i>
                    <span>Call 0478 936 120</span>
                  </a>
                  <button
                    onClick={() => openQuoteModal('Custom Roofing Request')}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all border border-white/20 cursor-pointer"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>

              {/* Additional Services Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ADDITIONAL_OFFERINGS.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#f19e1f]/20 text-[#f19e1f] flex items-center justify-center shrink-0 text-xs">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4-Step Workflow ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Our 4-Step Roofing Process
            </h2>
            <p className="text-base text-[#616a7e]">
              A seamless, transparent workflow designed for zero disruption to your daily routine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#f4f8ff] rounded-3xl p-8 border border-[#e6ebf6] relative flex flex-col justify-between hover:border-[#f19e1f] transition-all"
              >
                <div>
                  <span className="text-4xl font-extrabold font-['Oswald',sans-serif] text-[#f19e1f] block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#616a7e] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="py-16 bg-[#1e2e4f] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] block mb-2">
              Melbourne Coverage
            </span>
            <h2 className="text-3xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white">
              Areas We Proudly Service
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {SERVICE_AREAS.map((suburb, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-xs font-medium text-white hover:bg-[#f19e1f] hover:border-[#f19e1f] transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-location-dot text-[#f19e1f] mr-2"></i>
                <span>{suburb}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call To Action ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#f19e1f] p-8 sm:p-12 rounded-3xl text-[#1e2e4f]">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2">
              Need Urgent Leak Repairs or Re-Roofing?
            </h2>
            <p className="text-sm font-bold text-[#1e2e4f]">
              Contact our Melbourne emergency roofing team today.
            </p>
          </div>
          <a
            href="/contact"
            onClick={(e) => handleNav(e, 'contact')}
            className="bg-[#1e2e4f] hover:bg-[#152138] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all shrink-0 inline-block text-center text-decoration-none"
          >
            Get a Free Quote Now
          </a>
        </div>
      </section>
    </div>
  );
};
