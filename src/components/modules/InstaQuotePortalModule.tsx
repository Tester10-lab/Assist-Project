import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Sparkles, Calendar, CheckCircle2, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export const InstaQuotePortalModule: React.FC = () => {
  const { addLead } = useERP();
  const [service, setService] = useState<'replacement' | 'restoration' | 'gutters'>('replacement');
  const [roofArea, setRoofArea] = useState<number>(180);
  const [addons, setAddons] = useState<{ sarking: boolean; insulation: boolean; Skylights: boolean }>({
    sarking: true,
    insulation: true,
    Skylights: false
  });
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow 10:00 AM');
  const [submitted, setSubmitted] = useState(false);

  // Pricing calculations
  const baseRatePerSqM = service === 'replacement' ? 120 : service === 'restoration' ? 65 : 45;
  const basePrice = roofArea * baseRatePerSqM;
  const addonPrice = (addons.sarking ? 2200 : 0) + (addons.insulation ? 3800 : 0) + (addons.Skylights ? 1500 : 0);
  const estimatedTotal = basePrice + addonPrice;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientAddress) return;

    addLead({
      customerName: clientName,
      phone: clientPhone || '+61 400 111 222',
      address: clientAddress,
      source: 'Google Ads',
      totalProjectValue: estimatedTotal
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600" /> Module 17 — 24/7 Customer InstaQuote & InstaSchedule Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Public customer self-service widget. Customers select services, get instant real-time pricing, pick a time slot, and book 24/7.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-2xl border border-emerald-300 shadow-md text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">INSTAQUOTE BOOKED & SYNCED!</h3>
          <p className="text-xs text-slate-600">
            Thank you <strong>{clientName}</strong>! Your quote for <strong>${estimatedTotal.toLocaleString()}</strong> has been processed and synced to Peter's Google Calendar for <strong>{selectedSlot}</strong>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
          >
            Create Another InstaQuote
          </button>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Step 1 & 2: Service & Addons Selection */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-black text-slate-900">1. Select Service & Roof Size</h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setService('replacement')}
                className={`p-4 rounded-xl border text-center font-bold transition-all ${
                  service === 'replacement' ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Colorbond Roof Replacement
              </button>

              <button
                type="button"
                onClick={() => setService('restoration')}
                className={`p-4 rounded-xl border text-center font-bold transition-all ${
                  service === 'restoration' ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Tile Roof Restoration
              </button>

              <button
                type="button"
                onClick={() => setService('gutters')}
                className={`p-4 rounded-xl border text-center font-bold transition-all ${
                  service === 'gutters' ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Gutter & Downpipe System
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Roof Area ({roofArea} m²)</label>
              <input
                type="range"
                min="60"
                max="400"
                step="10"
                value={roofArea}
                onChange={e => setRoofArea(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <h3 className="text-base font-black text-slate-900 pt-2 border-t border-slate-100">2. Select Add-on Options</h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addons.sarking}
                  onChange={e => setAddons({ ...addons, sarking: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-slate-800">Heavy Duty Sarking (+ $2,200)</span>
              </label>

              <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addons.insulation}
                  onChange={e => setAddons({ ...addons, insulation: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-slate-800">Bradford R4.0 Batts (+ $3,800)</span>
              </label>

              <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addons.Skylights}
                  onChange={e => setAddons({ ...addons, Skylights: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-slate-800">Skylight Flashing (+ $1,500)</span>
              </label>
            </div>
          </div>

          {/* Pricing & Booking Side Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900">3. Instant Price & InstaSchedule</h3>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">Estimated Total AUD</span>
                <div className="text-3xl font-black text-emerald-700 mt-1">${estimatedTotal.toLocaleString()}</div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thomas Shelby"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Property Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100 Collins St, Melbourne"
                    value={clientAddress}
                    onChange={e => setClientAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">InstaSchedule Inspection Time</label>
                  <select
                    value={selectedSlot}
                    onChange={e => setSelectedSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
                  >
                    <option value="Tomorrow 10:00 AM">Tomorrow 10:00 AM</option>
                    <option value="Tomorrow 2:00 PM">Tomorrow 2:00 PM</option>
                    <option value="Friday 11:00 AM">Friday 11:00 AM</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20"
            >
              Submit InstaQuote & Lock In Booking
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
