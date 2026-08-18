import React from 'react';
import { SERVICES, SERVICE_AREAS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { motion } from 'framer-motion';

export const Services: React.FC = () => {
  const { setCurrentPage } = useWebsite();

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

  return (
    <div className="w-full bg-white text-[#1e2e4f] font-['Sora',sans-serif]">
      {/* ── Sub Banner ── */}
      <section className="relative bg-[#1e2e4f] text-white py-16 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/roofora-assets/images/sub-banner-bg-img.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2e4f] via-[#1e2e4f]/90 to-[#1e2e4f]/70 pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-4">
            Our Services
          </h1>
          <p className="text-base sm:text-lg text-[#b7c1d5] max-w-2xl mx-auto mb-6 font-light">
            Comprehensive residential and commercial roofing solutions backed by 15+ years of licensed Australian excellence.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
            <button onClick={() => setCurrentPage('home')} className="text-[#b7c1d5] hover:text-white transition-colors">Home</button>
            <span className="text-[#f19e1f] font-bold">/</span>
            <span className="text-white">Services</span>
          </div>
        </div>
      </section>

      {/* ── All Services Grid ── */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#e6ebf6] flex flex-col sm:flex-row group"
              >
                <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl shadow flex items-center justify-center p-2">
                    <img src={service.icon} alt="Icon" className="w-7 h-7 object-contain" />
                  </div>
                </div>

                <div className="sm:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#616a7e] mb-4 leading-relaxed font-light">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-center gap-2 text-xs text-[#1e2e4f] font-semibold">
                          <i className="fa-solid fa-circle-check text-[#f19e1f]"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="self-start bg-[#1e2e4f] hover:bg-[#f19e1f] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-colors flex items-center gap-2"
                  >
                    <span>Request Service</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </motion.div>
            ))}
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
            <h3 className="text-3xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight mb-2">
              Need Urgent Leak Repairs or Re-Roofing?
            </h3>
            <p className="text-sm font-semibold opacity-90">
              Contact our Melbourne emergency roofing team today.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-[#1e2e4f] hover:bg-[#152138] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all shrink-0"
          >
            Get a Free Quote Now
          </button>
        </div>
      </section>
    </div>
  );
};

