import React from 'react';
import { GOOGLE_REVIEWS } from '../data';
import { GoogleReviewsCarousel } from '../components/GoogleReviewsCarousel';
import { useWebsite } from '../WebsiteContext';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

export const Testimonials: React.FC = () => {
  const { navigateTo, openQuoteModal } = useWebsite();

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
            Google Reviews & Customer Testimonials
          </h1>
          <p className="text-base sm:text-lg text-[#b7c1d5] max-w-2xl mx-auto mb-6 font-light">
            Read authentic Google feedback from Melbourne homeowners about ASSIST's honest drone inspections, prompt leak fixes, and 10-year warranty craftsmanship.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
            <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="text-[#b7c1d5] hover:text-white transition-colors">Home</a>
            <span className="text-[#f19e1f] font-bold">/</span>
            <span className="text-white">Testimonials</span>
          </div>
        </div>
      </section>

      {/* ── Auto-Rotating Google Reviews Live Slider ── */}
      <section className="py-16 bg-white border-b border-[#e6ebf6]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <GoogleReviewsCarousel 
            theme="light"
            showBadgeHeader={true}
          />
        </div>
      </section>

      {/* ── All Verified Reviews Grid ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <a 
              href="https://www.google.com/search?q=Assist+Roofing+and+Home+Solution+North+Melbourne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-[#e6ebf6] mb-4 hover:border-[#f19e1f] hover:shadow-md transition-all text-decoration-none cursor-pointer"
              title="View Assist Roofing and Home Solution Google Reviews"
            >
              <img src={asset('/roofora-assets/images/google-icon.png')} alt="Google" className="w-5 h-5 object-contain" />
              <span className="font-['Oswald',sans-serif] text-[#f19e1f] font-bold text-base">4.9 / 5.0</span>
              <span className="text-xs text-[#616a7e] font-medium">Verified Google Reviews • 500+ Projects ↗</span>
            </a>
            <h2 className="text-3xl sm:text-5xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
              All Verified Google Reviews
            </h2>
            <p className="text-base text-[#616a7e]">
              Every review reflects our ironclad Clean Jobsite Promise and 10-year warranty standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {GOOGLE_REVIEWS.map((review) => (
              <motion.div
                key={review.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all border border-[#e6ebf6] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#f19e1f] text-base tracking-wider">
                        {'★★★★★'}
                      </div>
                      <span className="text-xs font-semibold text-[#616a7e]">
                        5.0
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#f4f8ff] text-[#1e2e4f] font-bold px-3 py-1 rounded-full border border-[#cfd8e8] text-xs">
                      <svg viewBox="0 0 48 48" className="w-3.5 h-3.5">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      <span>Google Review</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#616a7e] italic leading-relaxed mb-8">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: review.avatarBg }}
                    >
                      {review.avatarInitials}
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f]">
                        {review.name}
                      </h3>
                      <span className="text-xs text-[#616a7e] block">
                        {review.suburb} • {review.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-[#1e2e4f] bg-[#f4f8ff] px-2.5 py-1 rounded-full border border-[#cfd8e8] hidden sm:inline-block">
                    {review.project}
                  </span>
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
            Ready to Discuss Your Melbourne Roof?
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

