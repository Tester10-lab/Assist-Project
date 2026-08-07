import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { History, Clock } from 'lucide-react';

export const AuditLogTimelineModule: React.FC = () => {
  const { auditLogs } = useERP();
  const [activeTab, setActiveTab] = useState<'timeline' | 'table'>('timeline');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    log.user.toLowerCase().includes(searchFilter.toLowerCase()) ||
    log.action.toLowerCase().includes(searchFilter.toLowerCase()) ||
    log.details.toLowerCase().includes(searchFilter.toLowerCase()) ||
    log.module.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-600" /> Module 15 — Audit Log & Activity Timeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Immutable system audit logs tracking user logins, lead updates, quote edits, inventory adjustments, e-signatures, and automation triggers.
          </p>
        </div>

        {/* Filter Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl px-3.5 py-2 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'timeline' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Activity Timeline View
        </button>

        <button
          onClick={() => setActiveTab('table')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'table' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Audit Log Table ({auditLogs.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" /> Live Enterprise Activity Timeline
          </h3>

          <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
            {filteredLogs.map((log) => (
              <div key={log.id} className="relative group">
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-emerald-600 group-hover:scale-125 transition-transform" />

                <div className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition-all space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-emerald-700 font-mono">{log.timestamp}</span>
                    <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-mono text-[10px] border border-slate-200 font-bold">
                      {log.module}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{log.action} — <span className="text-slate-600 font-medium">{log.user}</span></h4>
                  <p className="text-xs text-slate-500">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Module</th>
                <th className="py-3.5 px-4">Details</th>
                <th className="py-3.5 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 font-mono">
                  <td className="py-3 px-4 text-emerald-700 font-bold">{log.timestamp}</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">{log.user}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{log.action}</td>
                  <td className="py-3 px-4 text-indigo-700 font-bold">{log.module}</td>
                  <td className="py-3 px-4 text-slate-600 font-sans text-xs">{log.details}</td>
                  <td className="py-3 px-4 text-slate-400 text-[10px]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
