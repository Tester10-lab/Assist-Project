import React from 'react';
import { useERP } from '../../context/ERPContext';
import { Bell, AlertTriangle, Sparkles, CreditCard, MessageSquare } from 'lucide-react';

export const NotificationCenterModule: React.FC = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useERP();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-600" /> Module 14 — Live Notification Center Hub
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time event notifications across In-App, Email, and SMS delivery channels for all 11 enterprise event types.
          </p>
        </div>

        <button
          onClick={clearAllNotifications}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200"
        >
          Mark All Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start space-x-4 ${
              !n.read ? 'bg-emerald-50/30' : 'opacity-70'
            }`}
          >
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
              {n.type === 'payment_received' ? <CreditCard className="w-5 h-5 text-emerald-600" /> :
               n.type === 'feedback_received' ? <MessageSquare className="w-5 h-5 text-amber-600" /> :
               n.type === 'material_shortage' ? <AlertTriangle className="w-5 h-5 text-rose-600" /> :
               <Sparkles className="w-5 h-5 text-indigo-600" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
                <span className="text-xs text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{n.message}</p>

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Channel: {n.channel}
                </span>
                <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                  n.priority === 'high' ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {n.priority} priority
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
