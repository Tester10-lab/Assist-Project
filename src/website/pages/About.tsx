import React from 'react';
import { TEAM_MEMBERS, STATS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="w-full bg-white text-[#1e2e4f] font-['Sora',sans-serif]">
      {/* ── Sub Banner Header ── */}
      <section className="relative bg-[#1e2e4f] text-white py-16 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/roofora-assets/images/sub-banner-bg-img.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2e4f] via-[#1e2e4f]/90 to-[#1e2e4f]/70 pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-4">
            About Us
          </h1>
          <p className="text-base sm:text-lg text-[#b7c1d5] max-w-2xl mx-auto mb-6 font-light">
            More than roofing contractors — we provide complete project assurance, transparent pricing, and decades of Australian roofing expertise.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
            <button onClick={() => setCurrentPage('home')} className="text-[#b7c1d5] hover:text-white transition-colors">Home</button>
            <span className="text-[#f19e1f] font-bold">/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </section>

      {/* ── Company Story & Pillars ── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visuals */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/roofora-assets/images/about-img1.jpg" 
                  alt="Roofing Crew" 
                  className="rounded-3xl shadow-lg w-full h-[320px] object-cover"
                />
                <img 
                  src="/roofora-assets/images/about-img2.jpg" 
                  alt="Precision Workmanship" 
                  className="rounded-3xl shadow-lg w-full h-[320px] object-cover mt-8"
                />
              </div>

              {/* Floating Quality Stamp */}
              <div className="absolute -bottom-6 left-8 bg-[#1e2e4f] text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#f19e1f] flex items-center justify-center text-white text-xl">
                  <i className="fa-solid fa-award"></i>
                </div>
                <div>
                  <span className="text-sm font-bold font-['Oswald',sans-serif] uppercase block">100% VBA Licensed</span>
                  <span className="text-xs text-[#b7c1d5]">Registered Master Builders</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mission Text */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2">
                Our Heritage & Mission
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-6 leading-tight">
                Built on Trust, Driven by Craftsmanship
              </h2>
              <p className="text-base text-[#616a7e] mb-4 leading-relaxed">
                Founded in 2011, ASSIST Roofing started with a singular mission: to elevate the standard of roofing in Melbourne through honest upfront pricing, superior materials, and uncompromising workmanship.
              </p>
              <p className="text-base text-[#616a7e] mb-8 leading-relaxed">
                We do not believe in high-pressure sales tactics or cutting corners. We believe in doing the job right the first time, using high-tensile BlueScope Colorbond and certified terracotta tiles, backed by our ironclad 10-year workmanship warranty.
              </p>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#f4f8ff] rounded-2xl border border-[#e6ebf6]">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#f19e1f] mb-3 text-lg">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <h4 className="text-base font-bold font-['Oswald',sans-serif] uppercase text-[#1e2e4f] mb-1">
                    Safety & Compliance
                  </h4>
                  <p className="text-xs text-[#616a7e]">
                    Working-at-heights certified with $20M comprehensive public liability.
                  </p>
                </div>

                <div className="p-4 bg-[#f4f8ff] rounded-2xl border border-[#e6ebf6]">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#f19e1f] mb-3 text-lg">
                    <i className="fa-solid fa-broom"></i>
                  </div>
                  <h4 className="text-base font-bold font-['Oswald',sans-serif] uppercase text-[#1e2e4f] mb-1">
                    Clean Site Guarantee
                  </h4>
                  <p className="text-xs text-[#616a7e]">
                    Magnetic nail sweeps and complete site cleanup after every single shift.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('contact')}
                className="self-start bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <span>Work With Us</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Key Statistics ── */}
      <section className="py-16 bg-[#1e2e4f] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-4xl sm:text-5xl font-extrabold font-['Oswald',sans-serif] text-[#f19e1f] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#b7c1d5]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Our Team ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
              The Craftsmen
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Meet Our Leadership & Crew
            </h2>
            <p className="text-base text-[#616a7e]">
              Dedicated, licensed roofing professionals passionate about protecting Melbourne homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#e6ebf6] flex flex-col group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2e4f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2 text-white text-sm">
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-[#f19e1f] cursor-pointer transition-colors">
                        <i className="fa-brands fa-linkedin-in text-xs"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-1">
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] block mb-3">
                      {member.role}
                    </span>
                    <p className="text-xs text-[#616a7e] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-1">
              Have Questions About Your Roof?
            </h3>
            <p className="text-sm text-[#616a7e]">
              Speak directly with our master roofing team today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-[#1e2e4f] hover:bg-[#293a5b] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-colors"
            >
              Contact Us
            </button>
            <a
              href="tel:1800277478"
              className="bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-phone text-xs"></i>
              <span>1800 277 478</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

