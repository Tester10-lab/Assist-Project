import React, { useRef, useState } from 'react';

export const HeroImage3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Calculate rotation (max 10 degrees)
    setRotation({
      x: y * -10,
      y: x * 10
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="w-full h-full relative preserve-3d transition-transform duration-200 ease-out rounded-2xl overflow-hidden shadow-2xl"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Main realistic image */}
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop" 
          alt="Premium House Roof" 
          className="w-full h-full object-cover"
        />
        
        {/* Glare effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none"
          style={{
            transform: `translateX(${rotation.y * 2}%) translateY(${rotation.x * 2}%)`,
          }}
        />

        {/* Floating badge for depth */}
        <div 
          className="absolute bottom-8 right-8 bg-white/90 backdrop-blur shadow-lg rounded-xl p-4 border border-white/50"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <div className="text-slate-900 font-bold">10-Year Guarantee</div>
              <div className="text-slate-500 text-sm">On all roof replacements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
