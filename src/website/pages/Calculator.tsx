import React, { useState } from 'react';
import { FadeIn } from '../components/FadeIn';

export const Calculator: React.FC = () => {
  const [area, setArea] = useState(150);
  const [pitch, setPitch] = useState(25);
  const [material, setMaterial] = useState('colorbond');
  const [extras, setExtras] = useState({ skylight: false, insulation: true });

  const baseRates: Record<string, number> = {
    colorbond: 85,
    concrete: 75,
    terracotta: 110,
    slate: 180
  };

  const calculateTotal = () => {
    let total = area * baseRates[material];
    if (pitch > 30) total *= 1.2;
    if (pitch > 40) total *= 1.4;
    if (extras.skylight) total += 1200;
    if (extras.insulation) total += (area * 15);
    return Math.round(total);
  };

  return (
    <div className="flex-1 w-full bg-paper-white min-h-screen">
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-10">
          <FadeIn direction="up">
            <h1 
              className="mb-6"
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: 'clamp(36px, 4vw, 59px)',
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#000000',
              }}
            >
              ROOFING COST ESTIMATOR
            </h1>
            <p 
              className="max-w-2xl mb-12"
              style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '16px',
                lineHeight: 1.4,
                letterSpacing: '0.01em',
                color: '#666666',
              }}
            >
              Get an instant rough estimate for your roof replacement. Note that this is a guide only; contact us for a formal quote.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Controls */}
            <div 
              className="lg:col-span-2 p-8 space-y-10"
              style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #000000' }}
            >
              
              {/* Area slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label 
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#000000',
                    }}
                  >
                    Roof Area (m²)
                  </label>
                  <div 
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '48px',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      color: '#000000',
                    }}
                  >
                    {area} m²
                  </div>
                </div>
                <input 
                  type="range" 
                  min="50" max="500" step="10" 
                  value={area} 
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ backgroundColor: '#eaf9f2', accentColor: '#44d991' }}
                />
                <div className="flex justify-between mt-2" style={{ fontFamily: 'var(--font-manrope)', fontSize: '12px', color: '#666666', letterSpacing: '0.01em' }}>
                  <span>Small (50m²)</span>
                  <span>Large (500m²)</span>
                </div>
              </div>

              {/* Pitch slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label 
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#000000',
                    }}
                  >
                    Roof Pitch (Degrees)
                  </label>
                  <div 
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '48px',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      color: '#000000',
                    }}
                  >
                    {pitch}°
                  </div>
                </div>
                <input 
                  type="range" 
                  min="10" max="45" step="5" 
                  value={pitch} 
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ backgroundColor: '#eaf9f2', accentColor: '#44d991' }}
                />
                <div className="flex justify-between mt-2" style={{ fontFamily: 'var(--font-manrope)', fontSize: '12px', color: '#666666', letterSpacing: '0.01em' }}>
                  <span>Flat (10°)</span>
                  <span>Steep (45°)</span>
                </div>
              </div>

              {/* Material selection */}
              <div>
                <label 
                  className="block mb-4"
                  style={{
                    fontFamily: 'var(--font-athletics)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#000000',
                  }}
                >
                  Material Selection
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'colorbond', name: 'Colorbond' },
                    { id: 'concrete', name: 'Concrete Tiles' },
                    { id: 'terracotta', name: 'Terracotta' },
                    { id: 'slate', name: 'Natural Slate' }
                  ].map(mat => (
                    <button
                      key={mat.id}
                      onClick={() => setMaterial(mat.id)}
                      className="p-4 text-center transition-all"
                      style={{
                        borderRadius: '8px',
                        border: material === mat.id ? '2px solid #000000' : '1px solid #000000',
                        backgroundColor: material === mat.id ? '#eaf9f2' : '#ffffff',
                        fontFamily: 'var(--font-manrope)',
                        fontSize: '14px',
                        color: '#000000',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {mat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div>
                <label 
                  className="block mb-4"
                  style={{
                    fontFamily: 'var(--font-athletics)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#000000',
                  }}
                >
                  Additional Requirements
                </label>
                <div className="space-y-3">
                  <label 
                    className="flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-mint-whisper"
                    style={{ border: '1px solid #000000', borderRadius: '8px' }}
                  >
                    <input 
                      type="checkbox" 
                      checked={extras.insulation} 
                      onChange={e => setExtras({...extras, insulation: e.target.checked})}
                      className="w-5 h-5"
                      style={{ accentColor: '#44d991' }}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', fontWeight: 400, color: '#000000' }}>Roof Insulation (Sarking/Foil)</div>
                      <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '12px', color: '#666666' }}>Improves thermal efficiency</div>
                    </div>
                  </label>
                  <label 
                    className="flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-mint-whisper"
                    style={{ border: '1px solid #000000', borderRadius: '8px' }}
                  >
                    <input 
                      type="checkbox" 
                      checked={extras.skylight} 
                      onChange={e => setExtras({...extras, skylight: e.target.checked})}
                      className="w-5 h-5"
                      style={{ accentColor: '#44d991' }}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', fontWeight: 400, color: '#000000' }}>Add Skylight</div>
                      <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '12px', color: '#666666' }}>Standard 600x900mm vented</div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Results Panel — Solid Cooperative Green */}
            <div className="lg:col-span-1">
              <div 
                className="p-8 sticky top-8"
                style={{ backgroundColor: '#44d991', borderRadius: '8px' }}
              >
                <h3 
                  className="mb-6"
                  style={{
                    fontFamily: 'var(--font-athletics)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#000000',
                  }}
                >
                  Estimated Cost
                </h3>
                
                <div 
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-athletics)',
                    fontSize: 'clamp(36px, 4vw, 78px)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    color: '#000000',
                  }}
                >
                  ${calculateTotal().toLocaleString()}
                </div>
                <div 
                  className="mb-8"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '14px',
                    color: '#000000',
                    letterSpacing: '0.01em',
                    opacity: 0.6,
                  }}
                >
                  Excludes GST
                </div>

                <div className="space-y-3 mb-8" style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', color: '#000000', letterSpacing: '0.01em' }}>
                  <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
                    <span style={{ opacity: 0.7 }}>Base Rate:</span>
                    <span style={{ fontWeight: 400 }}>${baseRates[material]}/m²</span>
                  </div>
                  <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
                    <span style={{ opacity: 0.7 }}>Material:</span>
                    <span className="capitalize" style={{ fontWeight: 400 }}>{material}</span>
                  </div>
                  <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
                    <span style={{ opacity: 0.7 }}>Size:</span>
                    <span style={{ fontWeight: 400 }}>{area} m²</span>
                  </div>
                </div>

                <button className="btn-pill w-full py-4 text-base mb-4">
                  Request Formal Quote
                </button>
                
                <p 
                  className="text-center"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '12px',
                    color: '#000000',
                    opacity: 0.5,
                    letterSpacing: '0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  This is a rough estimate for replacement only. Structural repairs or asbestos removal are not included.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
