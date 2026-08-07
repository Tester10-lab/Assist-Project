import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { CreditCard, MessageSquare, Star, DollarSign } from 'lucide-react';
import { PaymentStageId } from '../../types/erp';

export const PaymentFeedbackModule: React.FC = () => {
  const { leads, recordPayment, addFeedback } = useERP();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [feedbackStage, setFeedbackStage] = useState<PaymentStageId>(1);
  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState<string>('');

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments) return;
    addFeedback(selectedLead.id, feedbackStage, rating, comments);
    setComments('');
    setRating(5);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-600" /> 4-Stage Payment & Customer Feedback Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Financial milestone ledger (30% Booking, 30% Materials, 30% Installation, 10% Handover) synchronized with 4 customer feedback checkpoints.
          </p>
        </div>

        {/* Lead Selector */}
        <div className="w-full md:w-72">
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Select Property Lead</label>
          <select
            value={selectedLeadId}
            onChange={e => setSelectedLeadId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
          >
            {leads.map(l => (
              <option key={l.id} value={l.id}>{l.customerName} ({l.address})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 4-Stage Payment Ledger */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" /> 4-Stage Payment Ledger
            </h3>
            <span className="text-xs font-bold text-slate-500">Total: ${selectedLead.totalProjectValue.toLocaleString()}</span>
          </div>

          <div className="space-y-3">
            {selectedLead.paymentMilestones.map(m => (
              <div
                key={m.stage}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  m.status === 'paid'
                    ? 'bg-emerald-50 border-emerald-300'
                    : m.status === 'invoiced'
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm text-slate-900">{m.name}</span>
                    <span className="px-2 py-0.5 rounded bg-white text-[10px] font-extrabold text-emerald-700 border border-slate-200">
                      {m.percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">Due: {m.dueDate} {m.paidDate ? `• Paid on ${m.paidDate}` : ''}</div>
                  {m.invoiceNumber && <div className="text-[10px] font-mono text-indigo-700 font-bold">{m.invoiceNumber}</div>}
                </div>

                <div className="text-right space-y-1">
                  <div className="text-base font-black text-slate-900">${m.amount.toLocaleString()}</div>
                  <button
                    disabled={m.status === 'paid'}
                    onClick={() => recordPayment(selectedLead.id, m.stage)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      m.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                    }`}
                  >
                    {m.status === 'paid' ? 'Paid ✓' : `Record ${m.percentage}% Payment`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Stage Customer Feedback Loop */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" /> 4-Stage Customer Feedback Loop
          </h3>

          {/* Feedback Submission Form */}
          <form onSubmit={handleFeedbackSubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs text-slate-900">Record Customer Feedback</h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Feedback Stage</label>
                <select
                  value={feedbackStage}
                  onChange={e => setFeedbackStage(Number(e.target.value) as PaymentStageId)}
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value={1}>Stage 1: Booking & AI Setup</option>
                  <option value={2}>Stage 2: Proposal & Materials</option>
                  <option value={3}>Stage 3: Work-in-Progress</option>
                  <option value={4}>Stage 4: Handover & Review</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Rating (Stars)</label>
                <div className="flex items-center space-x-1 pt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Customer Comments</label>
              <textarea
                rows={2}
                required
                placeholder="e.g. Batshal and crew were fast, clean, and extremely polite..."
                value={comments}
                onChange={e => setComments(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20"
            >
              Submit Feedback Response
            </button>
          </form>

          {/* Feedback Timeline */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs text-slate-900">Recorded Feedback History</h4>

            {selectedLead.feedbacks.length === 0 ? (
              <div className="text-center py-4 text-slate-400 text-xs italic">No feedback submitted for this lead yet.</div>
            ) : (
              selectedLead.feedbacks.map((fb, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{fb.stageName}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(fb.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 italic">"{fb.comments}"</p>
                  <span className="text-[10px] text-slate-400 block">{fb.submittedAt}</span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
