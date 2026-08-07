import React, { useState } from 'react';
import { Calculator, Percent, Flame, Layers } from 'lucide-react';

export const BusinessCalculatorsModule: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'roofing' | 'margin' | 'chemical'>('roofing');

  // Roofing Sq Footage Calculator State
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(12);
  const [pitch, setPitch] = useState<number>(1.12); // e.g. 5/12 pitch multiplier
  const [wasteFactor, setWasteFactor] = useState<number>(10); // 10% waste

  const flatArea = length * width;
  const pitchedArea = flatArea * pitch;
  const totalAreaWithWaste = pitchedArea * (1 + wasteFactor / 100);
  const totalSquares = totalAreaWithWaste / 9.29; // 1 roofing square approx 9.29 m2

  // Margin Calculator State
  const [costPrice, setCostPrice] = useState<number>(14000);
  const [targetMargin, setTargetMargin] = useState<number>(30); // 30% margin

  const sellPrice = costPrice / (1 - targetMargin / 100);
  const profitDollar = sellPrice - costPrice;

  // Chemical Mix Calculator State
  const [tankSize, setTankSize] = useState<number>(200); // 200L tank
  const [desiredSH, setDesiredSH] = useState<number>(4); // 4% SH mix ratio
  const [sourceSH] = useState<number>(12.5); // 12.5% pool chlorine

  const shVolume = (tankSize * desiredSH) / sourceSH;
  const waterVolume = tankSize - shVolume;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-600" /> Business & Field Calculators Suite
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Built-in contractor tools: Roofing Area & Pitch, Target Profit Margins, and Chemical Soft-Wash Mix ratios.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveCalc('roofing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeCalc === 'roofing' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Roofing Area & Pitch Calculator
        </button>

        <button
          onClick={() => setActiveCalc('margin')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeCalc === 'margin' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Profit Margin & Target Pricing
        </button>

        <button
          onClick={() => setActiveCalc('chemical')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeCalc === 'chemical' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Chemical Soft-Wash Ratio Mix
        </button>
      </div>

      {/* Tab 1: Roofing Calculator */}
      {activeCalc === 'roofing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" /> Property Dimensions & Pitch
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Building Length (meters)</label>
                <input
                  type="number"
                  value={length}
                  onChange={e => setLength(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Building Width (meters)</label>
                <input
                  type="number"
                  value={width}
                  onChange={e => setWidth(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Roof Pitch Multiplier</label>
                  <select
                    value={pitch}
                    onChange={e => setPitch(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2"
                  >
                    <option value={1.05}>Flat / Low Slope (3/12)</option>
                    <option value={1.12}>Standard Gable (5/12)</option>
                    <option value={1.20}>Medium Steep (7/12)</option>
                    <option value={1.30}>High Pitch (9/12)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Waste Factor (%)</label>
                  <input
                    type="number"
                    value={wasteFactor}
                    onChange={e => setWasteFactor(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Calculated Roofing Material Breakdown</h3>
              <p className="text-xs text-slate-500 mt-1">Exact quantities needed for ordering Colorbond sheets & sarking.</p>

              <div className="mt-5 space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Flat Footprint Area</span>
                  <span className="font-mono font-bold text-slate-900">{flatArea.toFixed(2)} m²</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Pitched Surface Area</span>
                  <span className="font-mono font-bold text-slate-900">{pitchedArea.toFixed(2)} m²</span>
                </div>

                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between text-xs font-bold text-emerald-900">
                  <span>Total Order Area (With Waste)</span>
                  <span className="font-mono font-black text-emerald-700">{totalAreaWithWaste.toFixed(2)} m²</span>
                </div>

                <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-200 flex justify-between text-xs font-bold text-indigo-900">
                  <span>Total Roofing Squares</span>
                  <span className="font-mono font-black text-indigo-700">{totalSquares.toFixed(1)} Squares</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Profit Margin Calculator */}
      {activeCalc === 'margin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Percent className="w-5 h-5 text-emerald-600" /> Target Margin & Cost Inputs
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Total Job Cost ($ Materials + Labor)</label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={e => setCostPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Target Net Profit Margin (%)</label>
                <input
                  type="number"
                  value={targetMargin}
                  onChange={e => setTargetMargin(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Recommended Selling Price & Profit</h3>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-xs font-bold text-slate-600 uppercase">Required Quote Price</span>
                <div className="text-3xl font-black text-emerald-700 mt-1">${sellPrice.toFixed(2)}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-xs font-bold">
                <span className="text-slate-600">Net Profit Amount</span>
                <span className="font-mono text-slate-900 text-base">${profitDollar.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Chemical Mix Calculator */}
      {activeCalc === 'chemical' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" /> Roof Soft-Wash Batch Mix Inputs
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Total Batch Tank Size (Liters)</label>
                <input
                  type="number"
                  value={tankSize}
                  onChange={e => setTankSize(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Desired SH Strength (% for tile/tin wash)</label>
                <input
                  type="number"
                  step="0.5"
                  value={desiredSH}
                  onChange={e => setDesiredSH(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Required Batch Recipe</h3>

            <div className="space-y-3">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex justify-between text-xs font-bold text-amber-900">
                <span>Sodium Hypochlorite (12.5% SH)</span>
                <span className="font-mono font-black text-amber-700">{shVolume.toFixed(1)} Liters</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between text-xs font-bold text-slate-700">
                <span>Water</span>
                <span className="font-mono font-black text-slate-900">{waterVolume.toFixed(1)} Liters</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
