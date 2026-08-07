import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [area, setArea] = useState(150);
  const [pitch, setPitch] = useState(25);
  const [material, setMaterial] = useState('colorbond');
  const [extras, setExtras] = useState({ skylight: false, insulation: true });

  // Complex pricing logic estimation
  const baseRates: Record<string, number> = {
    colorbond: 85,
    concrete: 75,
    terracotta: 110,
    slate: 180
  };

  const calculateTotal = () => {
    let total = area * baseRates[material];
    
    // Pitch multiplier (steeper roof = higher risk/time)
    if (pitch > 30) total *= 1.2;
    if (pitch > 40) total *= 1.4;

    // Extras
    if (extras.skylight) total += 1200;
    if (extras.insulation) total += (area * 15);

    return Math.round(total);
  };

  return (
    <div className="flex-1 w-full pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-headline">Roofing Cost Estimator</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get an instant rough estimate for your roof replacement. Note that this is a guide only; contact us for a formal quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-10">
            
            {/* Area */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Roof Area (m²)</label>
                <div className="text-3xl font-black text-brand-600 font-headline">{area} m²</div>
              </div>
              <input 
                type="range" 
                min="50" max="500" step="10" 
                value={area} 
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-semibold">
                <span>Small (50m²)</span>
                <span>Large (500m²)</span>
              </div>
            </div>

            {/* Pitch */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Roof Pitch (Degrees)</label>
                <div className="text-3xl font-black text-brand-600 font-headline">{pitch}°</div>
              </div>
              <input 
                type="range" 
                min="10" max="45" step="5" 
                value={pitch} 
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-semibold">
                <span>Flat (10°)</span>
                <span>Steep (45°)</span>
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 block">Material Selection</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'colorbond', name: 'Colorbond' },
                  { id: 'concrete', name: 'Concrete Tiles' },
                  { id: 'terracotta', name: 'Terracotta' },
                  { id: 'slate', name: 'Natural Slate' }
                ].map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => setMaterial(mat.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      material === mat.id 
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold' 
                        : 'border-slate-200 bg-white text-slate-600 font-semibold hover:border-brand-300'
                    }`}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 block">Additional Requirements</label>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={extras.insulation} 
                    onChange={e => setExtras({...extras, insulation: e.target.checked})}
                    className="w-6 h-6 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Roof Insulation (Sarking/Foil)</div>
                    <div className="text-sm text-slate-500">Improves thermal efficiency</div>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={extras.skylight} 
                    onChange={e => setExtras({...extras, skylight: e.target.checked})}
                    className="w-6 h-6 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Add Skylight</div>
                    <div className="text-sm text-slate-500">Standard 600x900mm vented</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-brand-900 rounded-3xl p-8 border border-brand-800 sticky top-32 shadow-xl">
              <h3 className="text-brand-100 font-bold uppercase tracking-wider text-sm mb-6">Estimated Cost</h3>
              
              <div className="text-5xl font-black text-white mb-2 font-headline">
                ${calculateTotal().toLocaleString()}
              </div>
              <div className="text-brand-200 text-sm mb-8 font-medium">Excludes GST</div>

              <div className="space-y-4 mb-8 text-sm text-brand-100">
                <div className="flex justify-between border-b border-brand-800 pb-2">
                  <span>Base Rate:</span>
                  <span className="font-bold text-white">${baseRates[material]}/m²</span>
                </div>
                <div className="flex justify-between border-b border-brand-800 pb-2">
                  <span>Material:</span>
                  <span className="font-bold text-white capitalize">{material}</span>
                </div>
                <div className="flex justify-between border-b border-brand-800 pb-2">
                  <span>Size:</span>
                  <span className="font-bold text-white">{area} m²</span>
                </div>
              </div>

              <button className="w-full bg-accent-500 text-white font-bold py-4 rounded-xl hover:bg-accent-600 transition-all text-lg shadow-lg shadow-accent-500/25 active:scale-95 mb-4">
                Request Formal Quote
              </button>
              
              <p className="text-xs text-brand-300 text-center leading-relaxed">
                This is a rough estimate for replacement only. Structural repairs or asbestos removal are not included.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
