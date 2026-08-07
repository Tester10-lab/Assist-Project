import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Lead, StageId } from '../../types/erp';
import { 
  GitPullRequest, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Camera, 
  FileText, 
  MessageSquare, 
  FileCheck, 
  Award, 
  Star, 
  Share2,
  ChevronRight,
  UserCheck,
  CreditCard
} from 'lucide-react';

interface StageConfig {
  stage: StageId;
  title: string;
  nepalDesc: string;
  melbourneDesc: string;
  icon: React.ElementType;
}

const STAGES: StageConfig[] = [
  { stage: 1, title: 'Stage 1: New Leads', nepalDesc: 'Manages Google/Meta Ads & SEO. AI Receptionist qualifies leads 24/7.', melbourneDesc: 'Receives instant mobile notifications for qualified leads.', icon: UserCheck },
  { stage: 2, title: 'Stage 2: Inspection Scheduled', nepalDesc: 'Automation triggers text/email confirmation. CRM syncs to Peter\'s Google Calendar.', melbourneDesc: 'Peter reviews lead details in CRM to prepare.', icon: Calendar },
  { stage: 3, title: 'Stage 3: Inspection Completed', nepalDesc: 'Tracks time-to-inspection KPIs in dashboard.', melbourneDesc: 'Batshal or Peter performs professional inspection (AS 4349.1), documenting defects with RoofCam photos.', icon: Camera },
  { stage: 4, title: 'Stage 4: Quotation Sent', nepalDesc: 'Automated tracking monitors customer\'s digital proposal view.', melbourneDesc: 'Peter generates branded multi-line-item quote via CRM within 24 hours.', icon: FileText },
  { stage: 5, title: 'Stage 5: Negotiation', nepalDesc: 'Triggers automated follow-up reminders for outstanding estimates.', melbourneDesc: 'Peter meets customer to build trust & explain technical solutions.', icon: MessageSquare },
  { stage: 6, title: 'Stage 6: Won or Lost', nepalDesc: 'Updates lead status; "Lost" leads tagged for future re-marketing.', melbourneDesc: 'Finalises contract using digital signatures & collects Stage 1 Deposit (30%).', icon: FileCheck },
  { stage: 7, title: 'Stage 7: Project Complete', nepalDesc: 'Monitors project milestones, material inventory & client database.', melbourneDesc: 'Batshal leads 4-person roofing crew for delivery, quality control & site cleanup.', icon: Award },
  { stage: 8, title: 'Stage 8: Review Request', nepalDesc: '"Review Multiplier" automation sends Google Review link after final payment (10%).', melbourneDesc: 'Ensures customer is 100% satisfied before leaving site.', icon: Star },
  { stage: 9, title: 'Stage 9: Referral', nepalDesc: 'Manages automated referral nurturing campaigns at 30, 90, & 365-day intervals.', melbourneDesc: 'Peter or Batshal personally asks happy customer for recommendations.', icon: Share2 }
];

export const CRMPipelineModule: React.FC = () => {
  const { mode, leads, updateLeadStage, recordPayment, setActiveModule } = useERP();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <GitPullRequest className="w-6 h-6 text-emerald-600" /> 9-Stage Synchronised Sales & Operations Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Seamless coordination between **Nepal Team (Digital Engine)** and **Melbourne Team (Physical Execution)** across every customer touchpoint.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveModule('kanban')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20"
          >
            Switch to Kanban View
          </button>
        </div>
      </div>

      {/* 9-Stage Interactive Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STAGES.map((s) => {
          const stageLeads = leads.filter(l => l.stage === s.stage);

          return (
            <div
              key={s.stage}
              className={`bg-white p-5 rounded-2xl border transition-all ${
                stageLeads.length > 0 ? 'border-emerald-300 shadow-md' : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xs text-emerald-700">
                    {s.stage}
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">{s.title.split(':')[1]?.trim()}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-200">
                  {stageLeads.length} Lead{stageLeads.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Responsibilities Dual Breakdown */}
              <div className="py-3 text-[11px] space-y-2 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900">
                  <div className="font-extrabold text-[10px] uppercase text-indigo-700 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-indigo-600" /> Nepal (Digital)
                  </div>
                  <p className="mt-0.5 leading-snug">{s.nepalDesc}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                  <div className="font-extrabold text-[10px] uppercase text-emerald-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" /> Melbourne (Physical)
                  </div>
                  <p className="mt-0.5 leading-snug">{s.melbourneDesc}</p>
                </div>
              </div>

              {/* Leads in this Stage */}
              <div className="pt-3 space-y-2">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-2 text-slate-400 text-xs italic">No active leads in this stage.</div>
                ) : (
                  stageLeads.map(l => (
                    <div
                      key={l.id}
                      onClick={() => setSelectedLead(l)}
                      className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-emerald-400 rounded-xl transition-all cursor-pointer flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-900">{l.customerName}</div>
                        <div className="text-[10px] text-slate-500">{l.address}</div>
                        <div className="text-[11px] text-emerald-700 font-extrabold mt-1">${l.totalProjectValue.toLocaleString()}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700">{selectedLead.id} • Stage {selectedLead.stage} ({STAGES.find(s => s.stage === selectedLead.stage)?.title})</span>
                <h3 className="text-xl font-black text-slate-900">{selectedLead.customerName}</h3>
                <p className="text-xs text-slate-500">{selectedLead.address} • {selectedLead.phone} • {selectedLead.email}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="px-3 py-1 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-bold">
                Close
              </button>
            </div>

            {/* Stage Actions */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Workflow Stage Progression
              </h4>

              <div className="flex items-center space-x-2">
                <button
                  disabled={selectedLead.stage <= 1}
                  onClick={() => {
                    updateLeadStage(selectedLead.id, (selectedLead.stage - 1) as StageId);
                    setSelectedLead({ ...selectedLead, stage: (selectedLead.stage - 1) as StageId });
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold text-slate-700 rounded-xl"
                >
                  ← Move Back
                </button>

                <button
                  disabled={selectedLead.stage >= 9}
                  onClick={() => {
                    updateLeadStage(selectedLead.id, (selectedLead.stage + 1) as StageId);
                    setSelectedLead({ ...selectedLead, stage: (selectedLead.stage + 1) as StageId });
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-xs font-bold text-white rounded-xl shadow-md shadow-emerald-600/20"
                >
                  Advance Stage →
                </button>
              </div>

              {/* 4-Stage Payment Milestone Status */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h5 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" /> 4-Stage Payment Breakdown (30% / 30% / 30% / 10%)
                </h5>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedLead.paymentMilestones.map(m => (
                    <div key={m.stage} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
                      <div className="text-[11px] font-extrabold text-slate-900">{m.name}</div>
                      <div className="text-xs font-bold text-emerald-700">${m.amount.toLocaleString()}</div>
                      <button
                        disabled={m.status === 'paid'}
                        onClick={() => {
                          recordPayment(selectedLead.id, m.stage);
                          setSelectedLead(prev => prev ? ({
                            ...prev,
                            paymentMilestones: prev.paymentMilestones.map(item => item.stage === m.stage ? { ...item, status: 'paid' } : item)
                          }) : null);
                        }}
                        className={`w-full py-1 text-[10px] font-bold rounded-lg mt-1 transition-all ${
                          m.status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {m.status === 'paid' ? 'Paid ✓' : `Record ${m.percentage}% Paid`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
