import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Camera, ShieldCheck, AlertOctagon, FileText } from 'lucide-react';

export const InspectionsModule: React.FC = () => {
  const { leads } = useERP();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'report' | 'photos'>('report');

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];
  const report = selectedLead?.inspectionReport;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Camera className="w-6 h-6 text-emerald-600" /> RoofCam & AS 4349.1 Inspection Module
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standardized Australian Roof Building Code (AS 4349.1) inspection reports with RoofCam defect photo annotations.
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

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('report')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'report' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          AS 4349.1 Official Report
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'photos' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          RoofCam Defect Photo Gallery ({report?.defects.length || 0})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'report' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-700">Report ID: {report?.id || 'INSP-NEW'}</span>
              <h3 className="text-xl font-black text-slate-900">{selectedLead?.address}</h3>
              <p className="text-xs text-slate-500">Customer: {selectedLead?.customerName} • Roof: {report?.roofType}</p>
            </div>
            <div className="flex items-center space-x-3 mt-3 md:mt-0">
              <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-black border border-rose-200">
                Condition: {report?.overallCondition || 'Poor'}
              </span>
              <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-200">
                <FileText className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>
          </div>

          {/* Inspector Sign-off Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Inspector</span>
              <div className="font-bold text-sm text-slate-900 mt-0.5">{report?.inspectorName || 'Batshal (Melbourne)'}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">Inspection Date</span>
              <div className="font-bold text-sm text-slate-900 mt-0.5">{report?.inspectionDate || 'Today'}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500">AS 4349.1 Compliance</span>
              <div className="font-bold text-sm text-emerald-700 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Fully Certified
              </div>
            </div>
          </div>

          {/* Defect Items Breakdown */}
          <div className="space-y-4 pt-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600" /> Documented Roof Defects & Remedial Requirements
            </h4>

            {report?.defects.map(def => (
              <div key={def.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
                    {def.severity} severity
                  </span>
                  <h5 className="font-bold text-sm text-slate-900 mt-1">{def.location}</h5>
                  <span className="text-[10px] font-mono text-indigo-700 font-bold">{def.asCode}</span>
                </div>

                <div className="md:col-span-2 text-xs text-slate-700">
                  <p className="font-medium text-slate-800">{def.description}</p>
                  <p className="text-emerald-700 font-bold mt-1">Remediation: {def.remedialAction}</p>
                </div>

                <div className="rounded-lg overflow-hidden border border-slate-200 h-24 relative shadow-2xs">
                  <img src={def.photoUrl} alt={def.location} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-slate-900/80 px-1.5 py-0.5 rounded text-[9px] text-white font-mono">
                    RoofCam #0{def.id.replace('DEF-', '')}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {activeTab === 'photos' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" /> RoofCam High-Resolution Defect Photos
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {report?.defects.map(def => (
              <div key={def.id} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden space-y-2 p-2">
                <div className="h-44 rounded-lg overflow-hidden relative">
                  <img src={def.photoUrl} alt={def.location} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                    {def.severity.toUpperCase()}
                  </span>
                </div>
                <div className="p-2">
                  <h4 className="font-bold text-xs text-slate-900">{def.location}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{def.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
