import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { ShieldCheck, FileText } from 'lucide-react';

export const WarrantyManagementModule: React.FC = () => {
  const { warranties } = useERP();
  const [selectedWarrantyId, setSelectedWarrantyId] = useState<string>(warranties[0]?.id || '');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const selectedWarranty = warranties.find(w => w.id === selectedWarrantyId) || warranties[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" /> Module 11 — Warranty Management System
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated Warranty Certificate generator (PDF), 10-year workmanship & 25-year material expiry trackers, and claims processing.
          </p>
        </div>

        <button
          onClick={() => setShowCertificateModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> View Digital Certificate
        </button>
      </div>

      {/* Warranties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {warranties.map(war => (
          <div key={war.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">{war.certificateNumber}</span>
                <h3 className="font-extrabold text-base text-slate-900 mt-0.5">{war.customerName}</h3>
                <p className="text-xs text-slate-500">{war.address}</p>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full font-bold text-xs">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">10-Yr Workmanship Expiry</span>
                <div className="font-bold text-slate-900 mt-0.5">{war.workmanshipExpiry}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">25-Yr Colorbond Expiry</span>
                <div className="font-bold text-slate-900 mt-0.5">{war.materialsExpiry}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">Claims Recorded: <strong className="text-slate-900">{war.claimsCount}</strong></span>
              <button
                onClick={() => {
                  setSelectedWarrantyId(war.id);
                  setShowCertificateModal(true);
                }}
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                Download PDF Certificate →
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-8 shadow-2xl space-y-6 relative">
            <div className="text-center space-y-2 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">OFFICIAL WARRANTY CERTIFICATE</h3>
              <p className="text-xs text-emerald-700 font-black uppercase tracking-widest">{selectedWarranty.certificateNumber}</p>
            </div>

            <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
              <p>This certifies that <strong>ASSIST ROOFING PTY LTD</strong> warrants the roofing installation at <strong>{selectedWarranty.address}</strong> for client <strong>{selectedWarranty.customerName}</strong>.</p>
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">10-Year Workmanship Warranty:</span>
                  <span className="font-bold text-slate-900">Valid until {selectedWarranty.workmanshipExpiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">25-Year Manufacturer Colorbond Warranty:</span>
                  <span className="font-bold text-slate-900">Valid until {selectedWarranty.materialsExpiry}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">Issued by Peter & Batshal • Melbourne VIC</div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
