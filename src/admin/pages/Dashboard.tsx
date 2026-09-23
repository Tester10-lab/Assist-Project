import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';
import type { DashboardMetrics, ActivityItem } from '../types/cms';
import {
  FileText,
  Wrench,
  MapPin,
  Newspaper,
  Image as ImageIcon,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  UploadCloud,
  Search,
  ExternalLink
} from 'lucide-react';
import type { AdminSection } from '../components/AdminLayout';

export const Dashboard: React.FC<{ onNavigate: (section: AdminSection) => void }> = ({ onNavigate }) => {
  const [data, setData] = useState<{ metrics: DashboardMetrics; recentActivity: ActivityItem[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await adminApi.getDashboard();
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard metrics.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#f19e1f] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading CMS Data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700">
        <div className="flex items-center gap-2 mb-2 font-bold">
          <AlertCircle className="w-5 h-5" />
          <span>Error loading dashboard</span>
        </div>
        <p className="text-xs mb-4">{error}</p>
        <button
          onClick={loadDashboard}
          className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { metrics, recentActivity } = data;

  const statCards = [
    {
      title: 'Public Services',
      count: metrics.services.total,
      sub: `${metrics.services.published} published`,
      icon: Wrench,
      section: 'services' as AdminSection,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Website Pages',
      count: metrics.pages.total,
      sub: `${metrics.pages.published} published • ${metrics.pages.draft} draft`,
      icon: FileText,
      section: 'pages' as AdminSection,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Service Locations',
      count: metrics.locations.total,
      sub: `${metrics.locations.published} suburbs live`,
      icon: MapPin,
      section: 'locations' as AdminSection,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Blog Articles',
      count: metrics.blog.total,
      sub: metrics.blog.total === 0 ? 'No posts yet' : `${metrics.blog.published} published`,
      icon: Newspaper,
      section: 'blog' as AdminSection,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'Media Assets',
      count: metrics.media.total,
      sub: 'Persistent storage items',
      icon: ImageIcon,
      section: 'media' as AdminSection,
      color: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      title: 'Staff Users',
      count: metrics.users.total,
      sub: 'Authorized CMS accounts',
      icon: Users,
      section: 'users' as AdminSection,
      color: 'bg-slate-100 text-slate-700 border-slate-300'
    }
  ];

  return (
    <div className="space-y-8">
      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-r from-[#1e2e4f] to-[#273a61] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Production System Operational</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Assist Roofing & Home Solution CMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Manage live website services, page content, Melbourne service areas, media, and SEO configurations. All published changes synchronize immediately with the public site.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => onNavigate('services')}
            className="px-4 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Services</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/20 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Website</span>
          </a>
        </div>
      </div>

      {/* ── Metric Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(card.section)}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#f19e1f] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#f19e1f] transition-colors" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {card.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {card.count}
                  </h3>
                  <span className="text-xs font-medium text-slate-500">
                    {card.sub}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Operational Grid: Quick Actions & Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Operations Shortcuts */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('services')}
                className="w-full text-left px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-[#f4f8ff] border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Update Roofing Services</span>
                </div>
                <span className="text-[10px] text-slate-400">24 active</span>
              </button>

              <button
                onClick={() => onNavigate('pages')}
                className="w-full text-left px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-[#f4f8ff] border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-800 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Edit Public Page Content</span>
                </div>
                <span className="text-[10px] text-slate-400">6 pages</span>
              </button>

              <button
                onClick={() => onNavigate('media')}
                className="w-full text-left px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-[#f4f8ff] border border-slate-200 hover:border-amber-300 text-xs font-bold text-slate-800 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-4 h-4 text-amber-600" />
                  <span>Upload Media & Photos</span>
                </div>
                <span className="text-[10px] text-slate-400">Persistent</span>
              </button>

              <button
                onClick={() => onNavigate('seo')}
                className="w-full text-left px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-[#f4f8ff] border border-slate-200 hover:border-purple-300 text-xs font-bold text-slate-800 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-purple-600" />
                  <span>Review SEO & Schema</span>
                </div>
                <span className="text-[10px] text-slate-400">Active</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Authoritative Store:</span>
            <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              server/data/db.json
            </span>
          </div>
        </div>

        {/* Real Activity Stream */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f19e1f]" />
              <span>Audit Trail & Recent Activity</span>
            </h3>
            <button
              onClick={() => onNavigate('activity')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              View Full History →
            </button>
          </div>

          {recentActivity.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No recent activity recorded.</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.slice(0, 6).map((log, idx) => (
                <div
                  key={log.id || idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{log.action}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                          {log.resource}
                        </span>
                      </div>
                      {log.details && (
                        <p className="text-slate-500 text-[11px] mt-0.5">{log.details}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-semibold text-slate-700 block text-[11px]">{log.user}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
