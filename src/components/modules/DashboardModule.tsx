import React from 'react';
import { useERP } from '../../context/ERPContext';
import { 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  Globe,
  MapPin,
  Sparkles,
  ShieldCheck,
  Package
} from 'lucide-react';

export const DashboardModule: React.FC = () => {
  const { mode, leads, inventory, warranties, setActiveModule, triggerGoogleReview } = useERP();

  const totalRevenue = leads.reduce((acc, lead) => acc + lead.totalProjectValue, 0);
  const paidRevenue = leads.reduce((acc, lead) => {
    const paid = lead.paymentMilestones
      .filter(m => m.status === 'paid')
      .reduce((sum, m) => sum + m.amount, 0);
    return acc + paid;
  }, 0);

  const pendingRevenue = totalRevenue - paidRevenue;
  const activeJobs = leads.filter(l => l.stage >= 6 && l.stage <= 7).length;
  const lowStockItems = inventory.filter(i => i.inStock <= i.minStockLevel);
  const totalWarranties = warranties.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Admin Enterprise Overview
            </span>
            <span className="text-xs text-slate-500 font-semibold">• 4-Stage Payment Structure Active (30/30/30/10)</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Roofing Operations & Sales ERP Control Center
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Unified management across AI Receptionist 24/7 lead qualification, AS 4349.1 RoofCam defect inspections, 24h quote generation, 4-person roofing crew execution (Batshal), inventory ERP, and automated review multipliers.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setActiveModule('crm_pipeline')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
          >
            <span>View 9-Stage Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Contract Value</span>
            <div className="text-2xl font-black text-slate-900 mt-1">${totalRevenue.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-700 font-extrabold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
            </span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Collected Revenue (4-Stage)</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">${paidRevenue.toLocaleString()}</div>
            <span className="text-[11px] text-slate-500 font-medium mt-1">
              ${pendingRevenue.toLocaleString()} in 30/30/30/10 schedule
            </span>
          </div>
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Field Projects</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{activeJobs}</div>
            <span className="text-[11px] text-indigo-700 font-bold mt-1">Batshal 4-Man Crew Dispatched</span>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Warranties</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalWarranties}</div>
            <span className="text-[11px] text-amber-700 font-bold mt-1">10yr Labor / 25yr Materials</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 4-Stage Payment Milestone Status & Low Stock Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment Milestone Monitor */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" /> Customer Payment Schedule Tracker (30% - 30% - 30% - 10%)
              </h3>
              <p className="text-xs text-slate-500">Real-time payment milestone receipts & customer feedback compliance.</p>
            </div>
            <button
              onClick={() => setActiveModule('payments_feedback')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Open Ledger →
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 3).map(lead => (
              <div key={lead.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{lead.customerName}</h4>
                    <span className="text-xs text-slate-500">{lead.address} • Total: ${lead.totalProjectValue.toLocaleString()}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-200">
                    Stage {lead.stage}/9
                  </span>
                </div>

                {/* 4 Stage Milestone Pills */}
                <div className="grid grid-cols-4 gap-2">
                  {lead.paymentMilestones.map(m => (
                    <div
                      key={m.stage}
                      className={`p-2.5 rounded-xl border text-center text-xs ${
                        m.status === 'paid'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                          : m.status === 'invoiced'
                          ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-500'
                      }`}
                    >
                      <div className="font-black text-slate-900">{m.percentage}%</div>
                      <div className="text-[10px] opacity-75">{m.name.split(':')[1]?.trim() || m.name}</div>
                      <div className="text-[11px] font-bold mt-1 text-emerald-700">${m.amount.toLocaleString()}</div>
                      <div className="text-[9px] uppercase font-black mt-1 tracking-wider">
                        {m.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts & Google Review Multiplier Quick Action */}
        <div className="space-y-6">
          
          {/* Low Stock Banner */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-rose-600" /> Material Inventory Alerts
              </h3>
              <button onClick={() => setActiveModule('inventory')} className="text-xs text-slate-500 hover:text-slate-800 font-bold">
                View All
              </button>
            </div>

            {lowStockItems.length === 0 ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center">
                All roofing materials are fully stocked.
              </div>
            ) : (
              <div className="space-y-2">
                {lowStockItems.map(item => (
                  <div key={item.id} className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-rose-700 font-semibold">In Stock: {item.inStock} {item.unit}s (Min: {item.minStockLevel})</div>
                    </div>
                    <button
                      onClick={() => setActiveModule('inventory')}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-lg"
                    >
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Multiplier Widget */}
          <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Google Review Multiplier
              </h3>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold border border-indigo-200">
                Nepal Engine
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Automated trigger sends SMS/Email Google Review link upon 100% final payment sign-off.
            </p>
            {leads.filter(l => l.stage >= 8).map(l => (
              <div key={l.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
                <div>
                  <div className="font-bold text-xs text-slate-900">{l.customerName}</div>
                  <div className="text-[10px] text-emerald-700 font-extrabold">100% Paid • Stage {l.stage}</div>
                </div>
                <button
                  onClick={() => triggerGoogleReview(l.id)}
                  disabled={l.googleReviewSent}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    l.googleReviewSent
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {l.googleReviewSent ? 'Review Link Sent ✓' : 'Send Review Link'}
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
