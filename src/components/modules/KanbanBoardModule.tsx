import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { KanbanColumnId } from '../../types/erp';
import { 
  Kanban, 
  MapPin, 
  UserCheck, 
  CreditCard
} from 'lucide-react';

interface ColumnConfig {
  id: KanbanColumnId;
  title: string;
  color: string;
}

const KANBAN_COLUMNS: ColumnConfig[] = [
  { id: 'lead', title: 'Lead', color: 'border-indigo-200 bg-indigo-50 text-indigo-900' },
  { id: 'inspection', title: 'Inspection', color: 'border-cyan-200 bg-cyan-50 text-cyan-900' },
  { id: 'quote', title: 'Quote', color: 'border-blue-200 bg-blue-50 text-blue-900' },
  { id: 'negotiation', title: 'Negotiation', color: 'border-amber-200 bg-amber-50 text-amber-900' },
  { id: 'won', title: 'Won (30% Deposit)', color: 'border-emerald-200 bg-emerald-50 text-emerald-900' },
  { id: 'materials_ready', title: 'Materials Ready', color: 'border-teal-200 bg-teal-50 text-teal-900' },
  { id: 'crew_assigned', title: 'Crew Assigned', color: 'border-violet-200 bg-violet-50 text-violet-900' },
  { id: 'in_progress', title: 'In Progress (30%)', color: 'border-sky-200 bg-sky-50 text-sky-900' },
  { id: 'qc', title: 'QC Check', color: 'border-rose-200 bg-rose-50 text-rose-900' },
  { id: 'completed', title: 'Completed (10%)', color: 'border-emerald-200 bg-emerald-50 text-emerald-900' },
  { id: 'review', title: 'Review', color: 'border-yellow-200 bg-yellow-50 text-yellow-900' },
  { id: 'referral', title: 'Referral', color: 'border-pink-200 bg-pink-50 text-pink-900' },
];

export const KanbanBoardModule: React.FC = () => {
  const { leads, updateLeadStage } = useERP();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(l => 
    l.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: KanbanColumnId) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (!leadId) return;

    const stageMap: Record<KanbanColumnId, number> = {
      lead: 1,
      inspection: 2,
      quote: 4,
      negotiation: 5,
      won: 6,
      materials_ready: 7,
      crew_assigned: 7,
      in_progress: 7,
      qc: 7,
      completed: 8,
      review: 8,
      referral: 9
    };

    updateLeadStage(leadId, stageMap[targetColumnId] as any, targetColumnId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Kanban className="w-6 h-6 text-emerald-600" /> Module 12 — Kanban Project Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Drag-and-drop project cards through the complete 12-stage roofing execution workflow with priority labels & 4-stage payment tracking.
          </p>
        </div>

        {/* Filter Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Filter by customer or address..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl px-3.5 py-2 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Horizontal Scrollable Kanban Columns */}
      <div className="flex space-x-4 overflow-x-auto pb-6 pt-2 select-none min-h-[600px]">
        {KANBAN_COLUMNS.map((col) => {
          const colLeads = filteredLeads.filter(l => l.kanbanColumn === col.id);

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="w-72 shrink-0 bg-slate-100/70 rounded-2xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3"
            >
              {/* Column Header */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between shadow-2xs ${col.color}`}>
                <h3 className="font-extrabold text-xs tracking-tight">{col.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-white text-slate-900 font-black text-[10px] border border-slate-200 shadow-2xs">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[620px] pr-1">
                {colLeads.length === 0 ? (
                  <div className="h-32 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[11px] bg-white/40">
                    Drop cards here
                  </div>
                ) : (
                  colLeads.map(lead => {
                    const paidPercent = lead.paymentMilestones
                      .filter(m => m.status === 'paid')
                      .reduce((sum, m) => sum + m.percentage, 0);

                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        className="p-4 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl shadow-xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400">{lead.id}</span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-black text-[10px] border border-emerald-200">
                            ${lead.totalProjectValue.toLocaleString()}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 leading-tight">{lead.customerName}</h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{lead.address}</span>
                        </div>

                        {/* 4-Stage Payment Progress Bar */}
                        <div className="space-y-1 pt-1 border-t border-slate-100">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-500 flex items-center gap-1 font-bold">
                              <CreditCard className="w-3 h-3 text-emerald-600" /> Payments
                            </span>
                            <span className="font-extrabold text-emerald-700">{paidPercent}% Paid</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                            <div
                              className="bg-emerald-600 h-full transition-all duration-300"
                              style={{ width: `${paidPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Footer details */}
                        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 border-t border-slate-100">
                          <span className="font-bold text-indigo-700 flex items-center gap-1">
                            <UserCheck className="w-3 h-3 text-indigo-600" /> {lead.assignedInspector}
                          </span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600 border border-slate-200">
                            {lead.source}
                          </span>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
