import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Users, CheckSquare, HardHat, Award } from 'lucide-react';

export const ProjectCrewModule: React.FC = () => {
  const { leads } = useERP();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');

  const [milestones, setMilestones] = useState([
    { id: 1, name: 'Scaffolding & Perimeter Guardrail (AS 1576)', done: true },
    { id: 2, name: 'Old Roof Removal & Asbestos Inspection', done: true },
    { id: 3, name: 'Sarking & Insulation Batt Laying', done: true },
    { id: 4, name: 'Colorbond Custom Orb Laying & Fastening', done: true },
    { id: 5, name: 'Ridge Capping & Apron Flashing Sealant', done: false },
    { id: 6, name: 'Gutter Downpipe Backflow Test & Site Cleanup', done: false },
  ]);

  const toggleMilestone = (id: number) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" /> Roofing Crew & Field Operations Module
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Melbourne Physical Execution Team led by Batshal (4-person roofing crew, site milestones, safety checks & quality control).
          </p>
        </div>

        {/* Lead Selector */}
        <div className="w-full md:w-72">
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Select Active Project</label>
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

      {/* Crew Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Batshal 4-Person Crew Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-lg">
              4M
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Batshal Roofing Crew</h3>
              <p className="text-xs text-emerald-700 font-bold">4-Person On-Site Specialists</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-amber-600" /> Batshal (Crew Leader)
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">On Site</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-slate-500" /> Crew Member 2 (Installer)
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">On Site</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-slate-500" /> Crew Member 3 (Flashing Specialist)
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">On Site</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-slate-500" /> Crew Member 4 (Apprentice)
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">On Site</span>
            </div>
          </div>
        </div>

        {/* Site Milestone Checklist */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" /> Site Execution Checklist & QC Sign-off
              </h3>
              <p className="text-xs text-slate-500">Batshal verifies each milestone before Stage 3 & Stage 4 payment triggers.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full font-extrabold text-xs">
              {milestones.filter(m => m.done).length} / {milestones.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {milestones.map(m => (
              <div
                key={m.id}
                onClick={() => toggleMilestone(m.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  m.done ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    m.done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                  }`}>
                    {m.done && '✓'}
                  </div>
                  <span className="font-bold text-xs text-slate-900">{m.name}</span>
                </div>

                <span className="text-[10px] uppercase font-mono font-bold">
                  {m.done ? 'COMPLETED' : 'PENDING'}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between pt-3">
            <div className="flex items-center space-x-2 text-xs text-slate-700">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="font-semibold">Final Quality Control Sign-off by Batshal</span>
            </div>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20">
              Approve QC & Final Handover
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
