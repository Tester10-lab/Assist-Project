import React from 'react';
import { useERP } from '../../context/ERPContext';
import { CalendarClock, Bell } from 'lucide-react';

export const RecurringMaintenanceModule: React.FC = () => {
  const { maintenancePlans } = useERP();

  const totalARR = maintenancePlans.reduce((acc, m) => acc + m.annualRevenueValue, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-emerald-600" /> Module 13 — Recurring Maintenance System
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated maintenance plans (30 Days, 6 Months, 12/24/36 Months), SMS/Email reminders, and annual recurring revenue (ARR) forecasting.
          </p>
        </div>

        <div className="text-right px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] text-slate-400 uppercase font-extrabold">Annual Recurring Revenue (ARR)</span>
          <div className="text-base font-black text-emerald-700">${totalARR.toLocaleString()} / yr</div>
        </div>
      </div>

      {/* Maintenance Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {maintenancePlans.map(plan => (
          <div key={plan.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[10px] font-black uppercase border border-indigo-200">
                  {plan.planType}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{plan.customerName}</h3>
                <p className="text-xs text-slate-500">{plan.address}</p>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full font-bold text-xs">
                UPCOMING
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Next Inspection Date</span>
                <div className="font-bold text-slate-900 mt-0.5">{plan.nextScheduledDate}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Contract Value</span>
                <div className="font-bold text-emerald-700 mt-0.5">${plan.annualRevenueValue} / yr</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-slate-500 flex items-center gap-1 font-bold">
                <Bell className="w-3.5 h-3.5 text-indigo-600" /> Auto Reminders Enabled
              </span>
              <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200">
                Send Manual Reminder
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
