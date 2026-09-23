import React, { useEffect } from 'react';

interface GoogleReviewsCarouselProps {
  title?: string;
  subtitle?: string;
  showBadgeHeader?: boolean;
  theme?: 'dark' | 'light';
}

export const GoogleReviewsCarousel: React.FC<GoogleReviewsCarouselProps> = ({
  showBadgeHeader = true,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  // Ensure Elfsight script is loaded and re-initialized on component mount (for React SPA routing)
  useEffect(() => {
    const scriptSrc = 'https://elfsightcdn.com/platform.js';
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-trigger Elfsight scan if available
      try {
        if ((window as any).elfsightPlatform && typeof (window as any).elfsightPlatform.init === 'function') {
          (window as any).elfsightPlatform.init();
        }
      } catch {
        // silently ignore
      }
    }
  }, []);

  return (
    <div className="w-full relative max-w-6xl mx-auto">
      {/* ── Official Google Trust Header Card (High-Contrast Guaranteed) ── */}
      {showBadgeHeader && (
        <div 
          className={`w-full rounded-3xl p-6 sm:p-8 mb-6 border transition-all shadow-2xl ${
            isDark 
              ? 'bg-[#0f172a]/90 backdrop-blur-xl border-white/20 text-white' 
              : 'bg-white border-[#e2e8f0] text-[#1e2e4f] shadow-lg'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Google Identity & Verified Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center p-3.5 shrink-0 border border-slate-200">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                  <h3 className={`text-2xl sm:text-3xl font-bold font-['Oswald',sans-serif] tracking-wide mb-0 ${isDark ? 'text-white' : 'text-[#1e2e4f]'}`}>
                    Assist Roofing and Home Solution
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
                    Verified Google Business
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#fbbf24] font-black text-xl leading-none">4.9</span>
                    <div className="flex text-[#fbbf24] text-base tracking-wider">
                      {'★★★★★'}
                    </div>
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    • 100% Real Google Reviews • 139 Boundary Rd, North Melbourne VIC
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Live CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJPxM-iJBd1moRfR6BR4lqbb8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f19e1f] hover:bg-[#d98b14] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-decoration-none"
                title="Write a Real Google Review for Assist Roofing"
              >
                <i className="fa-brands fa-google"></i>
                <span>Write a Google Review</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Assist+Roofing+and+Home+Solution+North+Melbourne&query_place_id=ChIJPxM-iJBd1moRfR6BR4lqbb8"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs sm:text-sm font-semibold px-4 py-3 rounded-full border transition-all flex items-center gap-2 text-decoration-none ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white' 
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                }`}
                title="View Assist Roofing on Google Maps"
              >
                <i className="fa-solid fa-map-location-dot text-[#f19e1f]"></i>
                <span>View on Google Maps</span>
              </a>

              <div className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-2 rounded-full border ${
                isDark 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Google Sync</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Official Live Elfsight Google Reviews Widget ── */}
      {/* Container mounts immediately without lazy-loading lag */}
      <div className="w-full relative z-10">
        <div 
          className="elfsight-app-80c5774e-dc4b-4fd4-b517-f28655306555"
        />
      </div>

      {/* ── Authentic Google Business Trust Showcase ── */}
      <div 
        className={`w-full rounded-3xl p-6 sm:p-8 mt-4 border transition-all ${
          isDark 
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border-white/15 text-white' 
            : 'bg-[#f8fafc] border-[#e2e8f0] text-[#1e2e4f]'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Trust Pillar 1 */}
          <div className="flex items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#f19e1f]/20 border border-[#f19e1f]/40 flex items-center justify-center shrink-0 text-[#f19e1f] text-xl">
              <i className="fa-solid fa-star"></i>
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">4.9 / 5.0 Star Rating</h4>
              <p className={`text-xs mb-0 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                100% authentic ratings from Melbourne homeowners for roof restorations, leak repairs, and Colorbond replacements.
              </p>
            </div>
          </div>

          {/* Trust Pillar 2 */}
          <div className="flex items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-400 text-xl">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">10-Year Craftsmanship Guarantee</h4>
              <p className={`text-xs mb-0 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Backed by full manufacturer warranties, drone photo inspections, and our strict Clean Jobsite Promise.
              </p>
            </div>
          </div>

          {/* Trust Pillar 3 */}
          <div className="flex items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-emerald-400 text-xl">
              <i className="fa-solid fa-badge-check"></i>
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">North Melbourne Local Contractor</h4>
              <p className={`text-xs mb-0 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Operating at 139 Boundary Rd, North Melbourne. Serving all Greater Melbourne suburbs with honest fixed pricing.
              </p>
            </div>
          </div>
        </div>

        {/* Action Link to Google Business Profile */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <i className="fa-brands fa-google text-[#4285f4] text-sm"></i>
            <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
              Google Place ID: <code className="bg-white/10 px-2 py-0.5 rounded text-amber-300 font-mono">ChIJPxM-iJBd1moRfR6BR4lqbb8</code>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJPxM-iJBd1moRfR6BR4lqbb8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f19e1f] hover:text-[#d98b14] font-bold hover:underline flex items-center gap-1 text-decoration-none"
            >
              <span>Leave a 5-Star Review</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>

            <span className="text-slate-500">•</span>

            <a
              href="https://www.google.com/search?q=Assist+Roofing+and+Home+Solution+North+Melbourne"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline flex items-center gap-1 text-decoration-none font-semibold ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'}`}
            >
              <span>View Google Business Profile</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
