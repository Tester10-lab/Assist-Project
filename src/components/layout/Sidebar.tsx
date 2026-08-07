import React from 'react';
import { useERP } from '../../context/ERPContext';
import { 
  LayoutDashboard, 
  GitPullRequest, 
  Kanban, 
  Camera, 
  FileText, 
  FileCheck, 
  CreditCard, 
  Users, 
  Package, 
  ShieldCheck, 
  CalendarClock, 
  Bell, 
  History, 
  TrendingUp, 
  Settings,
  Calculator,
  Clock,
  Sparkles,
  PieChart
} from 'lucide-react';

interface NavGroup {
  category: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, notifications, inventory, leads } = useERP();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const lowStockCount = inventory.filter(i => i.inStock <= i.minStockLevel).length;
  const activeLeadsCount = leads.filter(l => l.stage < 8).length;

  const navGroups: NavGroup[] = [
    {
      category: 'Overview',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics & KPIs', icon: TrendingUp },
      ]
    },
    {
      category: 'Sales & CRM Engine',
      items: [
        { id: 'crm_pipeline', label: '9-Stage Pipeline', icon: GitPullRequest, badge: `${activeLeadsCount}` },
        { id: 'kanban', label: 'Kanban Project Board', icon: Kanban },
        { id: 'inspections', label: 'RoofCam & AS 4349.1', icon: Camera },
        { id: 'quote_builder', label: 'Branded Quote Builder', icon: FileText },
        { id: 'instaquote_portal', label: '24/7 InstaQuote Portal', icon: Sparkles },
        { id: 'contracts', label: 'E-Sign Contracts', icon: FileCheck },
        { id: 'payments_feedback', label: '4-Stage Payments & Feedback', icon: CreditCard, badge: '30/30/30/10' },
      ]
    },
    {
      category: 'Field Tools & Operations',
      items: [
        { id: 'business_calculators', label: 'Business Calculators', icon: Calculator },
        { id: 'employee_hub', label: 'EmployeeHub & GPS Clock', icon: Clock },
        { id: 'job_costing', label: 'Job Costing & Expenses', icon: PieChart },
        { id: 'crew_management', label: 'Crew & Project Mgmt', icon: Users, badge: 'Batshal 4-Man' },
        { id: 'inventory', label: 'Material Inventory ERP', icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} Alert` : undefined },
        { id: 'warranties', label: 'Warranty Management', icon: ShieldCheck },
        { id: 'maintenance', label: 'Recurring Maintenance', icon: CalendarClock },
      ]
    },
    {
      category: 'Enterprise & System',
      items: [
        { id: 'notifications', label: 'Live Notification Center', icon: Bell, badge: unreadNotifs > 0 ? `${unreadNotifs}` : undefined },
        { id: 'audit_logs', label: 'Audit Logs & Timeline', icon: History },
        { id: 'settings', label: 'System Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-61px)] sticky top-[61px] flex flex-col justify-between p-3.5 select-none overflow-y-auto shadow-xs">
      <div className="space-y-5">
        
        {/* Active Context Banner */}
        <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-[10px] uppercase font-extrabold tracking-wider opacity-75">Active System Context</div>
            <div className="font-extrabold text-slate-900 text-xs mt-0.5">
              Admin Control Center
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
        </div>

        {/* Navigation Groups */}
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-3 mb-1">
              {group.category}
            </div>
            {group.items.map(item => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-black'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badge.includes('Alert')
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 text-center font-medium">
        <div>ASSIST Roofing ERP v3.0</div>
        <div className="text-[9px] text-slate-400">AS 4349.1 & QuoteIQ Suite</div>
      </div>
    </aside>
  );
};
