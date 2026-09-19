import React, { useState, useEffect, useRef } from 'react';
import { GOOGLE_REVIEWS } from '../data';
import { asset } from '../utils/asset';

interface GoogleReviewsCarouselProps {
  title?: string;
  subtitle?: string;
  showBadgeHeader?: boolean;
  theme?: 'dark' | 'light';
}

export const GoogleReviewsCarousel: React.FC<GoogleReviewsCarouselProps> = ({
  title = 'Verified Google Reviews',
  subtitle = 'See what Melbourne homeowners say about our honest inspections, prompt leak fixes, and 10-year warranty standards.',
  showBadgeHeader = true,
  theme = 'dark',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalReviews = GOOGLE_REVIEWS.length;
  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalReviews);
    }, 4500);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isPaused, totalReviews]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const isDark = theme === 'dark';

  return (
    <div 
      className="w-full relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Google Trust Header ── */}
      {showBadgeHeader && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            {/* Google G Logo Badge */}
            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center p-3 shrink-0 border border-gray-100">
              <svg viewBox="0 0 48 48" className="w-8 h-8">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className={`text-xl sm:text-2xl font-bold font-['Oswald',sans-serif] ${isDark ? 'text-white' : 'text-[#1e2e4f]'}`}>
                  Google Customer Rating
                </span>
                <span className="bg-[#eaf8e6] text-[#2e7d32] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-200">
                  <i className="fa-solid fa-circle-check text-[10px]"></i>
                  Verified Profile
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[#f19e1f] font-extrabold text-lg">4.9</span>
                <div className="flex text-[#f19e1f] text-sm tracking-widest">
                  {'★★★★★'}
                </div>
                <span className={`text-xs ${isDark ? 'text-[#b7c1d5]' : 'text-[#616a7e]'}`}>
                  • Based on 500+ reviews across Melbourne
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.google.com/search?q=Assist+Roofing+and+Home+Solution+North+Melbourne"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#f8f9fa] text-[#1e2e4f] border border-gray-200 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 text-decoration-none"
              title="Review Assist Roofing on Google"
            >
              <i className="fa-brands fa-google text-[#4285f4]"></i>
              <span>Write a Review</span>
            </a>

            {/* Rotation indicator badge */}
            <div className={`hidden sm:flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10 text-[#b7c1d5]' : 'bg-gray-100 border-gray-200 text-[#616a7e]'}`}>
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-green-400 animate-pulse'}`}></span>
              <span>{isPaused ? 'Paused' : 'Auto-Rotating'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Carousel Slider Window ── */}
      <div className="relative overflow-hidden py-2">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Review"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-[#1e2e4f] shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#f19e1f] hover:text-white transition-all cursor-pointer -ml-2 sm:-ml-4 focus:outline-none"
        >
          <i className="fa-solid fa-chevron-left text-sm"></i>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Review"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-[#1e2e4f] shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#f19e1f] hover:text-white transition-all cursor-pointer -mr-2 sm:-mr-4 focus:outline-none"
        >
          <i className="fa-solid fa-chevron-right text-sm"></i>
        </button>

        {/* Sliding Track (Cards) */}
        <div 
          className="flex transition-transform duration-700 ease-in-out px-2 sm:px-4"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {GOOGLE_REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              className="w-full shrink-0 px-2 sm:px-4"
            >
              <div 
                className={`rounded-3xl p-6 sm:p-10 border transition-all shadow-md hover:shadow-xl relative flex flex-col justify-between max-w-4xl mx-auto ${
                  isDark
                    ? 'bg-white/10 backdrop-blur-md border-white/20 text-white'
                    : 'bg-white border-[#e6ebf6] text-[#1e2e4f]'
                }`}
              >
                {/* Upper row: Reviewer info + Google icon */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {/* User Avatar with Google-style colored background */}
                    <div
                      className="w-12 h-12 rounded-full text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md"
                      style={{ backgroundColor: review.avatarBg }}
                    >
                      {review.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-lg font-bold font-['Oswald',sans-serif] uppercase tracking-tight mb-0 ${isDark ? 'text-white' : 'text-[#1e2e4f]'}`}>
                          {review.name}
                        </h4>
                        <span className="text-[#34a853] text-sm" title="Verified Google Review">
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs opacity-75">
                        <span>{review.suburb}</span>
                        <span>•</span>
                        <span>{review.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Google G corner watermark */}
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 shrink-0">
                    <svg viewBox="0 0 48 48" className="w-4 h-4">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    <span className="text-[11px] font-bold text-[#616a7e]">Google</span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#f19e1f] text-base mb-4">
                  {'★★★★★'}
                  <span className={`text-xs font-semibold ml-2 ${isDark ? 'text-white/80' : 'text-[#616a7e]'}`}>
                    5.0 Star Rating
                  </span>
                </div>

                {/* Review Body */}
                <p className={`text-base sm:text-lg leading-relaxed italic mb-6 ${isDark ? 'text-white/95' : 'text-[#334155]'}`}>
                  "{review.comment}"
                </p>

                {/* Bottom Service Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#f19e1f] font-bold uppercase tracking-wider">
                      Service Performed:
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-[#f4f8ff] text-[#1e2e4f] border border-[#cfd8e8]'}`}>
                      {review.project}
                    </span>
                  </div>

                  <a
                    href="https://www.google.com/search?q=Assist+Roofing+and+Home+Solution+North+Melbourne"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#f19e1f] hover:underline flex items-center gap-1 text-decoration-none"
                  >
                    <span>View on Google</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Indicator Dots & Mini Thumbnail Controls ── */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
        {GOOGLE_REVIEWS.map((r, idx) => (
          <button
            key={r.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to review by ${r.name}`}
            className={`transition-all rounded-full cursor-pointer border-0 ${
              currentIndex === idx
                ? 'w-8 h-3 bg-[#f19e1f] shadow-md'
                : `w-3 h-3 ${isDark ? 'bg-white/30 hover:bg-white/60' : 'bg-gray-300 hover:bg-gray-400'}`
            }`}
          />
        ))}
      </div>

      {/* Quick stats counter */}
      <div className="text-center mt-4">
        <span className={`text-xs ${isDark ? 'text-white/60' : 'text-[#616a7e]'}`}>
          Showing review {currentIndex + 1} of {totalReviews} • Autoplays every 4.5s
        </span>
      </div>

    </div>
  );
};
