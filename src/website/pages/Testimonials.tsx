import React from 'react';
import { TESTIMONIALS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const { setCurrentPage, openQuoteModal } = useWebsite();

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
            Testimonials
          </h1>
          <p className="text-base sm:text-lg text-[#b7c1d5] max-w-2xl mx-auto mb-6 font-light">
            Read what Melbourne homeowners and commercial property managers say about ASSIST's honest communication and pristine workmanship.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
            <button onClick={() => setCurrentPage('home')} className="text-[#b7c1d5] hover:text-white transition-colors">Home</button>
            <span className="text-[#f19e1f] font-bold">/</span>
            <span className="text-white">Testimonials</span>
          </div>
        </div>
      </section>

      {/* ── Reviews Grid ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#e6ebf6] mb-4">
              <img src="/roofora-assets/images/google-icon.png" alt="Google" className="w-5 h-5 object-contain" />
              <span className="font-['Oswald',sans-serif] text-[#f19e1f] font-bold text-base">4.9 / 5.0</span>
              <span className="text-xs text-[#616a7e]">Based on 500+ Verified Assist Roof Projects</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              Verified Client Stories
            </h2>
            <p className="text-base text-[#616a7e]">
              Every review reflects our ironclad Clean Jobsite Promise and 10-year warranty standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((review, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all border border-[#e6ebf6] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex text-[#f19e1f] text-lg">
                      {'★★★★★'}
                    </div>
                    <span className="text-xs bg-[#f4f8ff] text-[#1e2e4f] font-bold px-3 py-1 rounded-full border border-[#cfd8e8]">
                      Verified Homeowner
                    </span>
                  </div>

                  <p className="text-base text-[#616a7e] italic leading-relaxed mb-8">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img 
                    src={review.imageUrl} 
                    alt={review.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#f19e1f]"
                  />
                  <div>
                    <h4 className="text-lg font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f]">
                      {review.name}
                    </h4>
                    <span className="text-xs text-[#616a7e] block">
                      {review.location}
                    </span>
                    <span className="text-xs font-semibold text-[#f19e1f] block mt-0.5">
                      {review.project}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call To Action ── */}
      <section className="py-16 bg-[#1e2e4f] text-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-4">
            Ready for a 5-Star Roofing Experience?
          </h2>
          <p className="text-base text-[#b7c1d5] max-w-xl mx-auto mb-8 font-light">
            Get the same pristine craftsmanship and peace of mind for your home today.
          </p>
          <button
            onClick={openQuoteModal}
            className="bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all"
          >
            Get a Free Inspection & Quote
          </button>
        </div>
      </section>
    </div>
  );
};

