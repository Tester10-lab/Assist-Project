import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { SiteSettings as SiteSettingsType } from '../types/cms';
import {
  Settings,
  Building,
  Palette,
  Share2,
  BarChart,
  Save,
  CheckCircle,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';

export const SiteSettings: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const [settings, setSettings] = useState<SiteSettingsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getSettings();
      setSettings(data);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to load site settings.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      await adminApi.updateSettings(settings);
      setStatusMessage({ type: 'success', text: 'Site settings updated successfully.' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-xs text-slate-500">Loading site settings...</div>;
  }

  if (!settings) {
    return <div className="p-12 text-center text-xs text-red-500">Failed to load site settings.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#f19e1f]" />
            <span>Site & Business Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Global roofing company details, contact channels, branding assets, and analytics integration.
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
          <span>Editor Mode: You have read-only access to system settings. Administrator privileges are required to make changes.</span>
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
        {/* Business Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Roofing Business Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Trading Business Name
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.business.name}
                onChange={e => setSettings({
                  ...settings,
                  business: { ...settings.business, name: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Legal Entity Name
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.business.legalName}
                onChange={e => setSettings({
                  ...settings,
                  business: { ...settings.business, legalName: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Phone Number (Public Dial)
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.business.phone}
                onChange={e => setSettings({
                  ...settings,
                  business: { ...settings.business, phone: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Official Email
              </label>
              <input
                type="email"
                disabled={!isAdmin}
                value={settings.business.email}
                onChange={e => setSettings({
                  ...settings,
                  business: { ...settings.business, email: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
              Physical Depot / Office Address
            </label>
            <input
              type="text"
              disabled={!isAdmin}
              value={settings.business.address}
              onChange={e => setSettings({
                ...settings,
                business: { ...settings.business, address: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Weekday Hours
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.business.hoursWeekday}
                onChange={e => setSettings({
                  ...settings,
                  business: { ...settings.business, hoursWeekday: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Weekend / Emergency Hours
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.business.hoursWeekend}
                onChange={e => setSettings({
                  ...settings,
                  business: { ...settings.business, hoursWeekend: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Branding Assets */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Palette className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Branding Assets</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Header Logo URL
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.branding.logoUrl}
                onChange={e => setSettings({
                  ...settings,
                  branding: { ...settings.branding, logoUrl: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Footer Logo URL
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.branding.footerLogoUrl}
                onChange={e => setSettings({
                  ...settings,
                  branding: { ...settings.branding, footerLogoUrl: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Favicon URL
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.branding.faviconUrl}
                onChange={e => setSettings({
                  ...settings,
                  branding: { ...settings.branding, faviconUrl: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Share2 className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900">Social Profiles</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Facebook Profile
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.social.facebook}
                onChange={e => setSettings({
                  ...settings,
                  social: { ...settings.social, facebook: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                Instagram Profile
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.social.instagram}
                onChange={e => setSettings({
                  ...settings,
                  social: { ...settings.social, instagram: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Tracking */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <BarChart className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-900">Analytics & Tracking</h3>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              disabled={!isAdmin}
              value={settings.tracking.ga4Id}
              onChange={e => setSettings({
                ...settings,
                tracking: { ...settings.tracking, ga4Id: e.target.value }
              })}
              placeholder="G-XXXXXXXXXX"
              className="w-full max-w-sm px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#f19e1f] disabled:bg-slate-50"
            />
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
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
