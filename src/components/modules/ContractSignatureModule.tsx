import React, { useRef, useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { FileCheck, CheckCircle2, RotateCcw, CreditCard, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContractSignatureModule: React.FC = () => {
  const { leads, recordPayment, updateLeadStage } = useERP();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [signed, setSigned] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
  };

  const handleSignContract = () => {
    setSigned(true);
    recordPayment(selectedLead.id, 1);
    updateLeadStage(selectedLead.id, 6, 'won');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-emerald-600" /> Digital Contract & E-Signature Pad
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Execute legally binding digital contracts, record Stage 1 (30%) deposit payments, or tag lost leads for Nepal re-marketing.
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

      {/* Contract Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contract Text */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg font-black text-slate-900">Roofing Works & Material Execution Agreement</h3>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-3 max-h-80 overflow-y-auto leading-relaxed">
            <p><strong>1. Parties & Property:</strong> Agreement between ASSIST Roofing Pty Ltd ("Contractor") and <strong>{selectedLead?.customerName}</strong> ("Client") for property located at <strong>{selectedLead?.address}</strong>.</p>
            <p><strong>2. Scope of Work:</strong> Supply and installation of Colorbond roofing materials, insulation, flashings, and safety scaffolding compliant with Australian Standard AS 4349.1.</p>
            <p><strong>3. Payment Schedule (30% - 30% - 30% - 10%):</strong></p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Stage 1 (30% Deposit):</strong> ${(selectedLead.totalProjectValue * 0.30).toLocaleString()} payable upon contract signing.</li>
              <li><strong>Stage 2 (30% Materials):</strong> ${(selectedLead.totalProjectValue * 0.30).toLocaleString()} payable upon material delivery to site.</li>
              <li><strong>Stage 3 (30% Installation):</strong> ${(selectedLead.totalProjectValue * 0.30).toLocaleString()} payable upon roof structure completion.</li>
              <li><strong>Stage 4 (10% Final):</strong> ${(selectedLead.totalProjectValue * 0.10).toLocaleString()} payable upon final sign-off & site handover.</li>
            </ul>
            <p><strong>4. Warranties:</strong> Includes 10-year Workmanship Warranty & 25-year Manufacturer Material Warranty.</p>
          </div>

          {/* E-Signature Canvas */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-900">Client Digital Signature Pad</label>
              <button onClick={clearCanvas} className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-[11px] font-bold">
                <RotateCcw className="w-3 h-3" /> Clear Signature
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative shadow-2xs">
              <canvas
                ref={canvasRef}
                width={550}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-40 cursor-crosshair"
              />
              <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono">Sign using mouse or touch</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={handleSignContract}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Signature & Process Stage 1 Deposit (30%)</span>
            </button>
          </div>
        </div>

        {/* Contract Status & Re-Marketing Side Panel */}
        <div className="space-y-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" /> Stage 1 Deposit Status
            </h4>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Contract Value</span>
                <span className="font-bold text-slate-900">${selectedLead.totalProjectValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stage 1 Deposit (30%)</span>
                <span className="font-bold text-emerald-700">${(selectedLead.totalProjectValue * 0.30).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
                <span>Contract Status</span>
                <span className={signed ? 'text-emerald-700 font-extrabold' : 'text-amber-600 font-bold'}>
                  {signed ? 'SIGNED & DEPOSIT PAID ✓' : 'Awaiting Signature'}
                </span>
              </div>
            </div>
          </div>

          {/* Lost Lead Tagging for Nepal Re-marketing */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" /> Lost Lead Re-marketing Tag
            </h4>
            <p className="text-xs text-slate-500">
              If client declines quote, tag lead for automated Nepal email/SMS re-marketing sequence.
            </p>
            <button
              onClick={() => updateLeadStage(selectedLead.id, 6, 'negotiation')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200"
            >
              Tag as "Lost Lead" for Nepal Re-marketing
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
