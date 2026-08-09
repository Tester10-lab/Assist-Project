import React from 'react';

/**
 * Professional CQCM Hero Image Panel
 * Real roof photo with 12 to 16 static green dots overlay (not animated matrix).
 */
export const HeroImage3D: React.FC<{ className?: string; imageUrl?: string }> = ({ 
  className = '',
  imageUrl = '/images/roofs/roof1.jpg'
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-900/10 shadow-2xl ${className}`}>
      {/* Real roof photo provided by user */}
      <img 
        src={imageUrl} 
        alt="ASSIST Roofing Melbourne Project" 
        className="w-full h-full object-cover"
      />
      
      {/* 10 to 20 static green dots (4x4 static dot grid overlay on top-left corner) */}
      <div className="absolute top-6 left-6 grid grid-cols-4 gap-3 pointer-events-none z-10 bg-black/20 backdrop-blur-xs p-3 rounded-xl">
        {Array.from({ length: 16 }).map((_, i) => (
          <div 
            key={i} 
            className="w-3.5 h-3.5 rounded-full" 
            style={{ backgroundColor: '#44d991' }} 
          />
        ))}
      </div>

      {/* Floating quality badge */}
      <div className="absolute bottom-6 right-6 bg-white/95 text-ink-black p-4 rounded-xl shadow-lg border border-black/10 flex items-center gap-3 max-w-xs z-10">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#44d991' }}>
          <span className="material-symbols-outlined text-ink-black font-bold text-xl">verified</span>
        </div>
        <div>
          <div className="text-xs uppercase font-bold tracking-wider" style={{ fontFamily: 'var(--font-athletics)' }}>
            VBA Licensed Roofing
          </div>
          <div className="text-xs text-slate-600 font-medium">10-Year Workmanship Guarantee</div>
        </div>
      </div>
    </div>
  );
};
