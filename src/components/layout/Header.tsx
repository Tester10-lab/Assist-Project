import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { 
  Bell, 
  Search, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  PlusCircle,
  X,
  CreditCard,
  MessageSquare
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    mode, 
    setMode, 
    notifications, 
    markNotificationRead, 
    clearAllNotifications,
    addLead
  } = useERP();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    source: 'Google Ads' as const,
    totalProjectValue: 22000
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.customerName) return;
    addLead(newLeadForm);
    setShowNewLeadModal(false);
    setNewLeadForm({
      customerName: '',
      phone: '',
      email: '',
      address: '',
      source: 'Google Ads',
      totalProjectValue: 22000
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs">
      
      {/* Brand & Dual Perspective Mode Toggle */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20 font-black text-white text-xl tracking-tighter">
            A
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-lg tracking-tight leading-none flex items-center gap-2">
              ASSIST Roofing <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">ERP Engine</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Synchronised Sales & Operations System</p>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-xs font-black text-slate-900 tracking-wide uppercase">Admin</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, quotes, inventory..."
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>

        {/* Quick New Lead Button */}
        <button
          onClick={() => setShowNewLeadModal(true)}
          className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Lead</span>
        </button>

        {/* Notifications Hub */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Live Notification Center</h3>
                </div>
                <button
                  onClick={clearAllNotifications}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">No notifications.</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start space-x-3 ${
                        !n.read ? 'bg-emerald-50/40' : 'opacity-70'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
                        {n.type === 'payment_received' ? <CreditCard className="w-4 h-4 text-emerald-600" /> :
                         n.type === 'feedback_received' ? <MessageSquare className="w-4 h-4 text-amber-600" /> :
                         n.type === 'material_shortage' ? <AlertTriangle className="w-4 h-4 text-rose-600" /> :
                         <Sparkles className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-slate-900 truncate">{n.title}</h4>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="inline-block text-[9px] uppercase font-bold text-slate-500 mt-1 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {n.channel}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Context Card */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-black text-xs">
            ADM
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              System Admin
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 inline" /> Active
            </div>
          </div>
        </div>
      </div>

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowNewLeadModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
              <PlusCircle className="w-5 h-5 text-emerald-600" /> Capture New Lead
            </h3>
            <p className="text-xs text-slate-500 mb-5">AI Receptionist initial qualification simulator.</p>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Rigby"
                  value={newLeadForm.customerName}
                  onChange={e => setNewLeadForm({ ...newLeadForm, customerName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+61 4..."
                    value={newLeadForm.phone}
                    onChange={e => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={newLeadForm.email}
                    onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Property Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 74 Church St, Richmond VIC"
                  value={newLeadForm.address}
                  onChange={e => setNewLeadForm({ ...newLeadForm, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lead Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={e => setNewLeadForm({ ...newLeadForm, source: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="SEO">SEO</option>
                    <option value="Yard Signs">Yard Signs</option>
                    <option value="Local Networking">Local Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Est. Value ($)</label>
                  <input
                    type="number"
                    value={newLeadForm.totalProjectValue}
                    onChange={e => setNewLeadForm({ ...newLeadForm, totalProjectValue: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Receptionist will auto-qualify lead and trigger Google Calendar sync to Peter's schedule.</span>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20"
                >
                  Create & Qualify Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};
