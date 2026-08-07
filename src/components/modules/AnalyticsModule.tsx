import React from 'react';
import { TrendingUp, Globe, MapPin } from 'lucide-react';

export const AnalyticsModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" /> Analytics & Financial Forecasting
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Performance metrics comparing **Nepal Team (Digital Engine)** ad conversion vs **Melbourne Team (Physical Execution)** field speed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Nepal Digital Analytics */}
        <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" /> Nepal Digital Engine KPIs
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">Google/Meta Ads Conversion</span>
              <span className="font-extrabold text-slate-900">4.8% (Target &gt;3.5%)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">AI Receptionist 24/7 Qualification</span>
              <span className="font-extrabold text-emerald-700">92% Qualified</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">Proposal View Telemetry Open Rate</span>
              <span className="font-extrabold text-indigo-700">89.4%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">Google Review Multiplier Conversion</span>
              <span className="font-extrabold text-amber-700">94% Positive Reviews</span>
            </div>
          </div>
        </div>

        {/* Melbourne Physical Field Analytics */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" /> Melbourne Field Execution KPIs
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">Quote Generation Speed (&lt;24h Target)</span>
              <span className="font-extrabold text-emerald-700">Avg 4.2 Hours</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">AS 4349.1 Inspection Pass Rate</span>
              <span className="font-extrabold text-slate-900">100% Certified</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">Batshal 4-Man Crew On-Time Delivery</span>
              <span className="font-extrabold text-emerald-700">98.2%</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-600 font-medium">Customer Satisfaction Score</span>
              <span className="font-extrabold text-amber-700">4.9 / 5.0 Stars</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
