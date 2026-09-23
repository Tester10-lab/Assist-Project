import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { SeoSettings } from '../types/cms';
import {
  Search,
  Save,
  CheckCircle,
  AlertCircle,
  ShieldAlert,
  Globe,
  Code
} from 'lucide-react';

export const SeoManager: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const [seo, setSeo] = useState<SeoSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSeo = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getSeo();
      setSeo(data);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to load SEO settings.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSeo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seo) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      await adminApi.updateSeo(seo);
      setStatusMessage({ type: 'success', text: 'Global SEO and Schema settings updated successfully.' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save SEO settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-xs text-slate-500">Loading SEO settings...</div>;
  }

  if (!seo) {
    return <div className="p-12 text-center text-xs text-red-500">Failed to load SEO configuration.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6 text-[#f19e1f]" />
            <span>SEO & Schema Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Centralized search engine optimization, Google verification, and JSON-LD LocalBusiness structured data.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-xs text-amber-800 font-semibold">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Editor Mode: You have read-only access to global SEO settings. Administrator privileges are required to edit.</span>
        </div>
      )}

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Global Metadata */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Default Site Metadata</h3>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
              Default Site Title
            </label>
            <input
              type="text"
              disabled={!isAdmin}
              value={seo.siteTitle}
              onChange={e => setSeo({ ...seo, siteTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              disabled={!isAdmin}
              value={seo.defaultMetaDescription}
              onChange={e => setSeo({ ...seo, defaultMetaDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Default Open Graph Share Image
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={seo.defaultOgImage}
                onChange={e => setSeo({ ...seo, defaultOgImage: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Google Search Console Verification Tag
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                placeholder="google-site-verification token"
                value={seo.gscVerification}
                onChange={e => setSeo({ ...seo, gscVerification: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Structured Data (Schema.org) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Code className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">RoofingContractor Schema (JSON-LD)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Business Legal Name
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={seo.businessSchema?.name || ''}
                onChange={e => setSeo({
                  ...seo,
                  businessSchema: { ...seo.businessSchema, name: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Telephone
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={seo.businessSchema?.phone || ''}
                onChange={e => setSeo({
                  ...seo,
                  businessSchema: { ...seo.businessSchema, phone: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Street Address
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={seo.businessSchema?.streetAddress || ''}
                onChange={e => setSeo({
                  ...seo,
                  businessSchema: { ...seo.businessSchema, streetAddress: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Locality / Suburb
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={seo.businessSchema?.locality || ''}
                onChange={e => setSeo({
                  ...seo,
                  businessSchema: { ...seo.businessSchema, locality: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={seo.businessSchema?.postalCode || ''}
                onChange={e => setSeo({
                  ...seo,
                  businessSchema: { ...seo.businessSchema, postalCode: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-[#f19e1f] hover:bg-[#d88713] text-slate-950 font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save SEO Configuration'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
