import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { DollarSign, Receipt, Plus, PieChart, AlertCircle } from 'lucide-react';
import { ExpenseItem } from '../../types/erp';

export const JobCostingExpensesModule: React.FC = () => {
  const { leads, expenses, addExpense } = useERP();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');

  // Form for new expense
  const [expCategory, setExpCategory] = useState<ExpenseItem['category']>('Materials');
  const [expVendor, setExpVendor] = useState('');
  const [expAmount, setExpAmount] = useState<number>(350);
  const [expDesc, setExpDesc] = useState('');

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];
  const costing = selectedLead?.jobCosting;

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expVendor || !expAmount) return;

    addExpense({
      category: expCategory,
      vendor: expVendor,
      amount: expAmount,
      description: expDesc,
      leadId: selectedLead.id
    });

    setExpVendor('');
    setExpAmount(350);
    setExpDesc('');
  };

  const totalExpenseSum = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-emerald-600" /> Module 18 — Job Costing & Expense Logger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real net profit margin analyzer (Contract Revenue − Materials − Labor − Equipment − 15% Overhead) and expense tracker.
          </p>
        </div>

        {/* Lead Selector */}
        <div className="w-full md:w-72">
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Select Property Project</label>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Job Costing Breakdown Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" /> Job Costing & Net Profit Math: {selectedLead.customerName}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Contract Revenue</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">${costing?.contractValue.toLocaleString()}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Material Expense</span>
              <div className="font-bold text-rose-600 text-sm mt-0.5">-${costing?.materialCost.toLocaleString()}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Labor & Scaffolding</span>
              <div className="font-bold text-rose-600 text-sm mt-0.5">-${((costing?.laborCost || 0) + (costing?.equipmentCost || 0)).toLocaleString()}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">15% Overhead Alloc.</span>
              <div className="font-bold text-amber-600 text-sm mt-0.5">-${costing?.overheadAllocation.toLocaleString()}</div>
            </div>
          </div>

          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase">Calculated Net Profit</span>
              <div className="text-3xl font-black text-emerald-700 mt-0.5">${costing?.netProfit.toLocaleString()}</div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-600 uppercase">Net Margin %</span>
              <div className="text-3xl font-black text-emerald-700 mt-0.5">{costing?.netMarginPercent.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-600" /> Log Business Expense
          </h3>

          <form onSubmit={handleExpenseSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Expense Category</label>
              <select
                value={expCategory}
                onChange={e => setExpCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
              >
                <option value="Materials">Materials</option>
                <option value="Fuel & Travel">Fuel & Travel</option>
                <option value="Equipment Repair">Equipment Repair</option>
                <option value="Subcontractor">Subcontractor</option>
                <option value="Safety">Safety & Gear</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Vendor Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Shell South Yarra"
                value={expVendor}
                onChange={e => setExpVendor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Amount ($ AUD)</label>
              <input
                type="number"
                required
                value={expAmount}
                onChange={e => setExpAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Description / Purpose</label>
              <input
                type="text"
                placeholder="e.g. Work Truck Fuel"
                value={expDesc}
                onChange={e => setExpDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20"
            >
              Log Expense & Attach Receipt
            </button>
          </form>
        </div>

      </div>

      {/* Expense History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h4 className="font-bold text-xs text-slate-900">Recorded Business Expenses Log</h4>
          <span className="text-xs font-black text-emerald-700">Total Spent: ${totalExpenseSum.toLocaleString()}</span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Vendor</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map(exp => (
              <tr key={exp.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 text-slate-500 font-mono">{exp.date}</td>
                <td className="py-3 px-4 font-bold text-indigo-700">{exp.category}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{exp.vendor}</td>
                <td className="py-3 px-4 text-slate-600">{exp.description}</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">${exp.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
