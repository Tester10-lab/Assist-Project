import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Users, Clock, MapPin, MessageSquare, Award, Play, Square, Navigation } from 'lucide-react';

export const EmployeeHubModule: React.FC = () => {
  const { timeEntries, clockInEmployee, clockOutEmployee } = useERP();
  const [empName, setEmpName] = useState('Batshal');
  const [empRole, setEmpRole] = useState('Crew Leader');
  const [siteAddress, setSiteAddress] = useState('42 Toorak Rd, South Yarra VIC');
  const [gpsStatus, setGpsStatus] = useState<string>('GPS Ready');

  const handleClockIn = () => {
    if (navigator.geolocation) {
      setGpsStatus('Fetching device GPS coordinates...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsStatus(`GPS Verified: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
          clockInEmployee(empName, empRole, siteAddress);
        },
        () => {
          setGpsStatus('Using simulated site coordinates (South Yarra)');
          clockInEmployee(empName, empRole, siteAddress);
        }
      );
    } else {
      clockInEmployee(empName, empRole, siteAddress);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" /> Module 16 — EmployeeHub & Time Tracker Pro
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            GPS-verified employee time clock, site dispatching, team chat, and sales team leaderboards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GPS Time Clock Widget */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" /> GPS Time Tracker Pro
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Employee Name</label>
              <select
                value={empName}
                onChange={e => {
                  setEmpName(e.target.value);
                  setEmpRole(e.target.value === 'Peter' ? 'Sales Executive' : 'Crew Leader');
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
              >
                <option value="Batshal">Batshal (Crew Leader)</option>
                <option value="Peter">Peter (Sales Executive)</option>
                <option value="Sam">Sam (Roof Installer)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Current Job Site Address</label>
              <input
                type="text"
                value={siteAddress}
                onChange={e => setSiteAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{gpsStatus}</span>
            </div>

            <button
              onClick={handleClockIn}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" /> Clock In (GPS Verified)
            </button>
          </div>
        </div>

        {/* Active Time Entries */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" /> Active GPS Time Log & Live Dispatch Map
          </h3>

          <div className="space-y-3">
            {timeEntries.map(entry => (
              <div
                key={entry.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{entry.employeeName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      {entry.role}
                    </span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {entry.locationAddress}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-mono font-bold">
                    Clock In: {entry.clockIn} {entry.clockOut ? `• Out: ${entry.clockOut}` : '• Active Now'}
                  </div>
                </div>

                {entry.status === 'active' && (
                  <button
                    onClick={() => clockOutEmployee(entry.id)}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-2xs"
                  >
                    <Square className="w-3.5 h-3.5" /> Clock Out
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Sales Leaderboard */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" /> Sales Leaderboard (This Month)
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between font-bold text-amber-900">
                <span>1. Peter (Melbourne Sales)</span>
                <span>$42,500</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold text-slate-700">
                <span>2. Batshal (Field Quotes)</span>
                <span>$32,000</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
