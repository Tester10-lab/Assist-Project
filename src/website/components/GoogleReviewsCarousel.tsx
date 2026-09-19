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
      } catch (err) {
        // silently ignore
      }
    }
  }, []);

  return (
    <div className="w-full relative">
      {/* ── Official Google Trust Header ── */}
      {showBadgeHeader && (
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
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
                  Assist Roofing and Home Solution
                </span>
                <span className="bg-[#eaf8e6] text-[#2e7d32] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-200">
                  <i className="fa-solid fa-circle-check text-[10px]"></i>
                  Verified Google Business
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[#f19e1f] font-extrabold text-lg">4.9</span>
                <div className="flex text-[#f19e1f] text-sm tracking-widest">
                  {'★★★★★'}
                </div>
                <span className={`text-xs ${isDark ? 'text-[#b7c1d5]' : 'text-[#616a7e]'}`}>
                  • 100% Real Google Reviews • North Melbourne, VIC
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.google.com/search?q=Assist+Roofing+and+Home+Solution+North+Melbourne"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#f8f9fa] text-[#1e2e4f] border border-gray-200 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 text-decoration-none"
              title="Review Assist Roofing and Home Solution on Google"
            >
              <i className="fa-brands fa-google text-[#4285f4]"></i>
              <span>Write a Google Review</span>
            </a>

            <div className={`flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/10 border-white/20 text-[#b7c1d5]' : 'bg-gray-100 border-gray-200 text-[#616a7e]'}`}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>Live Google Sync</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Official Live Elfsight Google Reviews Widget (Connected to your Google Business Profile) ── */}
      <div 
        className={`w-full rounded-3xl p-3 sm:p-6 transition-all ${
          isDark 
            ? 'bg-white/5 backdrop-blur-md border border-white/15' 
            : 'bg-white border border-[#e6ebf6] shadow-sm'
        }`}
        style={{ minHeight: '260px' }}
      >
        <div 
          className="elfsight-app-80c5774e-dc4b-4fd4-b517-f28655306555" 
          data-elfsight-app-lazy
        />
      </div>

      {/* Bottom Google Trust Verification */}
      <div className="text-center mt-5">
        <a
          href="https://www.google.com/search?q=Assist+Roofing+and+Home+Solution+North+Melbourne"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-xs font-semibold hover:underline ${isDark ? 'text-[#b7c1d5]' : 'text-[#616a7e]'}`}
        >
          <i className="fa-brands fa-google text-[#4285f4]"></i>
          <span>Read all verified reviews on Google Business Profile (139 Boundary Rd, North Melbourne)</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
        </a>
      </div>
    </div>
  );
};
