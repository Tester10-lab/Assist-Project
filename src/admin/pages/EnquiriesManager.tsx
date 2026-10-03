import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';
import type { EnquiryItem } from '../types/cms';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Trash2,
  AlertCircle,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';

export const EnquiriesManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminApi.getEnquiries();
      setEnquiries(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    setActionLoadingId(id);
    try {
      await adminApi.updateEnquiry(id, { status: newStatus });
      setEnquiries(prev =>
        prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete enquiry from "${name}"? This action cannot be undone.`)) {
      return;
    }
    setActionLoadingId(id);
    try {
      await adminApi.deleteEnquiry(id);
      setEnquiries(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete enquiry');
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredEnquiries = enquiries.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = item.name?.toLowerCase().includes(q);
      const matchPhone = item.phone?.toLowerCase().includes(q);
      const matchService = item.service?.toLowerCase().includes(q);
      const matchAddress = item.address?.toLowerCase().includes(q);
      const matchId = item.id?.toLowerCase().includes(q);
      return matchName || matchPhone || matchService || matchAddress || matchId;
    }
    return true;
  });

  const newCount = enquiries.filter(e => e.status === 'new').length;
  const contactedCount = enquiries.filter(e => e.status === 'contacted').length;
  const resolvedCount = enquiries.filter(e => e.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-[#f19e1f]" />
            <span>Enquiries & Callbacks</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time enquiries delivered directly from website callback and inspection quote forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchEnquiries}
            disabled={isLoading}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#f19e1f]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ── Metrics Bar ── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Total Enquiries</span>
            <span className="text-2xl font-black text-slate-900">{enquiries.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <PhoneCall className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-0.5">Awaiting Callback</span>
            <span className="text-2xl font-black text-amber-600">{newCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">Contacted</span>
            <span className="text-2xl font-black text-blue-600">{contactedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-green-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 block mb-0.5">Resolved</span>
            <span className="text-2xl font-black text-green-600">{resolvedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, suburb, or reference ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#f19e1f] text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-[#1e2e4f] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({enquiries.length})
          </button>
          <button
            onClick={() => setFilterStatus('new')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterStatus === 'new'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            New ({newCount})
          </button>
          <button
            onClick={() => setFilterStatus('contacted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterStatus === 'contacted'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Contacted ({contactedCount})
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterStatus === 'resolved'
                ? 'bg-green-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>
      </div>

      {/* ── Content List ── */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200">
          <div className="w-8 h-8 border-4 border-[#f19e1f] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading Enquiries...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-xs font-bold mb-2">{error}</p>
          <button
            onClick={fetchEnquiries}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
          >
            Try Again
          </button>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <PhoneCall className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base mb-1">No enquiries found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm || filterStatus !== 'all'
              ? 'No records match your active search and filter criteria.'
              : 'When visitors submit the callback form or inspection request on the website, they will appear here in real time.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEnquiries.map((item) => {
            const isExpanded = expandedId === item.id;
            const isBusy = actionLoadingId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all ${
                  item.status === 'new'
                    ? 'border-amber-300 shadow-sm'
                    : 'border-slate-200'
                }`}
              >
                <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Customer identity & details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                        #{item.id}
                      </span>

                      {/* Type Badge */}
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        item.type === 'callback'
                          ? 'bg-amber-100 text-amber-800'
                          : item.type === 'quote'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {item.type === 'callback' ? '⚡ 15-Min Callback' : item.type === 'quote' ? '📋 Detailed Quote' : '✉️ Contact'}
                      </span>

                      {/* Status Badge */}
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        item.status === 'new'
                          ? 'bg-amber-500 text-white animate-pulse'
                          : item.status === 'contacted'
                          ? 'bg-blue-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto lg:ml-0">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleString('en-AU', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="font-bold text-slate-900 text-base">
                        {item.name}
                      </h3>

                      <a
                        href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center gap-1.5 font-bold text-sm text-[#1e2e4f] hover:text-[#f19e1f] transition-colors bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-green-600" />
                        <span>{item.phone}</span>
                      </a>

                      {item.email && (
                        <a
                          href={`mailto:${item.email}`}
                          className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.email}</span>
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <strong className="text-slate-800">Service:</strong> {item.service}
                      </div>
                      <div>
                        <strong className="text-slate-800">Timing:</strong> {item.preferredTime || item.urgency || 'ASAP'}
                      </div>
                      {item.address && (
                        <div className="sm:col-span-2 flex items-center gap-1 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <a
                      href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors text-decoration-none"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>

                    {item.status !== 'contacted' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'contacted')}
                        disabled={isBusy}
                        className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Mark Contacted
                      </button>
                    )}

                    {item.status !== 'resolved' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'resolved')}
                        disabled={isBusy}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Mark Resolved
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse notes' : 'Expand notes'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      disabled={isBusy}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl text-xs space-y-3">
                    {item.message && (
                      <div>
                        <span className="font-bold text-slate-700 block mb-1">Customer Message / Issue Description:</span>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800 whitespace-pre-wrap">
                          {item.message}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1">
                      {item.ip && <span><strong>IP:</strong> {item.ip}</span>}
                      {item.userAgent && <span className="truncate max-w-md"><strong>Browser:</strong> {item.userAgent}</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
