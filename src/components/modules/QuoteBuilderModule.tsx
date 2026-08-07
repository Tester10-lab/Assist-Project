import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { FileText, Eye, Plus, Trash2, CreditCard, Sparkles, Layers } from 'lucide-react';
import { QuoteLineItem, EstimateType } from '../../types/erp';

export const QuoteBuilderModule: React.FC = () => {
  const { leads } = useERP();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [estimateType, setEstimateType] = useState<EstimateType>('options');

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];
  const quote = selectedLead?.quote;

  const [lineItems, setLineItems] = useState<QuoteLineItem[]>(quote?.lineItems || [
    { id: 'LI-1', description: 'Remove old corrugated tin and dispose', quantity: 180, unitPrice: 35, total: 6300, category: 'Waste Removal' },
    { id: 'LI-2', description: 'Supply & Install Colorbond Custom Orb 0.42 BMT Monument', quantity: 180, unitPrice: 65, total: 11700, category: 'Materials' },
    { id: 'LI-3', description: 'Heavy Duty Roof Sarking & Bradford R4.0 Insulation', quantity: 180, unitPrice: 22, total: 3960, category: 'Materials' },
    { id: 'LI-4', description: 'Perimeter Safety Guardrail Scaffolding (AS 1576)', quantity: 1, unitPrice: 2540, total: 2540, category: 'Safety & Scaffolding' }
  ]);

  const subtotal = lineItems.reduce((acc, item) => acc + item.total, 0);
  const gst = subtotal * 0.10;
  const total = subtotal + gst;

  const stage1 = total * 0.30;
  const stage2 = total * 0.30;
  const stage3 = total * 0.30;
  const stage4 = total * 0.10;

  // Monthly financing calculation (36 months Affirm/Klarna split)
  const monthlyFinancing = total / 36;

  const addLineItem = () => {
    const newItem: QuoteLineItem = {
      id: `LI-${Date.now()}`,
      description: 'Additional Custom Flashing & Sealant',
      quantity: 1,
      unitPrice: 450,
      total: 450,
      category: 'Materials'
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" /> Multi-Type Quote & Proposal Builder
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            4 Estimate Types (Standard, Options Tiered, Package, Quick), Klarna/Affirm consumer financing splits & live customer proposal view tracking.
          </p>
        </div>

        {/* Lead Selector */}
        <div className="w-full md:w-72">
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Select Property Lead</label>
          <select
            value={selectedLeadId}
            onChange={e => setSelectedLeadId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500"
          >
            {leads.map(l => (
              <option key={l.id} value={l.id}>{l.customerName} ({l.address})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Estimate Type Switcher */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-700">Estimate Type:</span>
          <div className="flex space-x-1.5">
            <button
              onClick={() => setEstimateType('standard')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                estimateType === 'standard' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Standard Line-Item
            </button>
            <button
              onClick={() => setEstimateType('options')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                estimateType === 'options' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Options (Good/Better/Best)
            </button>
            <button
              onClick={() => setEstimateType('package')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                estimateType === 'package' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Package Bundles
            </button>
            <button
              onClick={() => setEstimateType('quick')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                estimateType === 'quick' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Quick 1-Page Summary
            </button>
          </div>
        </div>

        <span className="px-3 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-full font-bold text-xs">
          Consumer Financing Enabled (Stripe/Klarna)
        </span>
      </div>

      {/* Proposal Telemetry Bar */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900">Proposal Telemetry Monitor: Digital View Tracking</span>
            <p className="text-[11px] text-slate-600">
              Customer opened digital quote <strong className="text-indigo-900 font-extrabold">{quote?.viewCount || 4} times</strong> (Last viewed: {quote?.clientViewedAt || '10:11 AM today'})
            </p>
          </div>
        </div>
      </div>

      {/* If Options Estimate (Good / Better / Best Tiers) */}
      {estimateType === 'options' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-extrabold uppercase">TIER 1 • GOOD</span>
            <h3 className="font-extrabold text-sm text-slate-900">Standard Colorbond Replacement</h3>
            <p className="text-xs text-slate-500">0.42 BMT Monument Custom Orb + R4.0 Insulation + 10-Yr Warranty.</p>
            <div className="text-2xl font-black text-slate-900">${total.toLocaleString()}</div>
            <div className="text-xs font-bold text-emerald-700">or ${monthlyFinancing.toFixed(0)}/mo for 36 mos</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-emerald-400 shadow-md space-y-3 relative">
            <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase shadow-xs">MOST POPULAR</span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">TIER 2 • BETTER</span>
            <h3 className="font-extrabold text-sm text-slate-900">Ultra Coastal Colorbond Marine</h3>
            <p className="text-xs text-slate-500">0.48 BMT High-Salinity Colorbond Ultra + R5.0 Insulation + 15-Yr Warranty.</p>
            <div className="text-2xl font-black text-emerald-700">${(total * 1.18).toLocaleString()}</div>
            <div className="text-xs font-bold text-emerald-700">or ${((total * 1.18) / 36).toFixed(0)}/mo for 36 mos</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase">TIER 3 • BEST</span>
            <h3 className="font-extrabold text-sm text-slate-900">Architectural Standing Seam</h3>
            <p className="text-xs text-slate-500">Premium European Standing Seam profile + R6.0 Insulation + 20-Yr Warranty.</p>
            <div className="text-2xl font-black text-indigo-700">${(total * 1.48).toLocaleString()}</div>
            <div className="text-xs font-bold text-indigo-700">or ${((total * 1.48) / 36).toFixed(0)}/mo for 36 mos</div>
          </div>

        </div>
      )}

      {/* Quote Document */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        
        {/* Document Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-6">
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">ASSIST ROOFING PTY LTD</div>
            <div className="text-xs text-slate-500 mt-1">ABN 88 123 456 789 • AS 4349.1 Compliant Roofing</div>
            <div className="text-xs text-slate-500">Melbourne VIC • Support: 1300 ASSIST</div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-emerald-700">ESTIMATE #{quote?.quoteNumber || 'EST-2026-891'}</span>
            <div className="text-xs text-slate-500 mt-1">Date: {quote?.createdDate || '2026-08-06'}</div>
            <div className="text-xs text-slate-500">Valid Until: {quote?.validUntil || '2026-08-20'}</div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Prepared For</span>
            <div className="font-bold text-sm text-slate-900 mt-0.5">{selectedLead?.customerName}</div>
            <div className="text-slate-600">{selectedLead?.address}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Sales Executive</span>
            <div className="font-bold text-sm text-slate-900 mt-0.5">Peter (Melbourne)</div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3 text-center">Qty</th>
                <th className="py-3 px-3 text-right">Unit Price</th>
                <th className="py-3 px-3 text-right">Total ($)</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lineItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-emerald-700">{item.category}</td>
                  <td className="py-3 px-3 text-slate-800 font-medium">{item.description}</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">{item.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-900 font-bold">${item.total.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center">
                    <button onClick={() => removeLineItem(item.id)} className="text-slate-400 hover:text-rose-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pt-3">
            <button
              onClick={addLineItem}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-200"
            >
              <Plus className="w-4 h-4 text-emerald-600" /> Add Line Item
            </button>
          </div>
        </div>

        {/* Consumer Financing & Payment Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-2">
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Consumer Financing Options (Affirm / Klarna)
            </h4>
            <p className="text-xs text-slate-600">
              Split total investment into monthly installments upfront. 0% APR options available.
            </p>
            <div className="p-3 bg-white rounded-xl border border-indigo-200 flex justify-between items-center text-xs font-bold">
              <span>36 Monthly Payments:</span>
              <span className="text-indigo-700 font-black text-sm">${monthlyFinancing.toFixed(2)} / month</span>
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 text-xs text-right self-center">
            <div className="flex justify-between py-1 text-slate-500">
              <span>Subtotal (Excl. GST)</span>
              <span className="font-mono text-slate-900 font-bold">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-500">
              <span>GST (10%)</span>
              <span className="font-mono text-slate-900 font-bold">${gst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-slate-200 font-black text-lg text-emerald-700">
              <span>Total AUD</span>
              <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
