import React from 'react';
import { Settings, Shield, Key } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-600" /> ERP & System Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage API keys for Nepal Digital Engine automations, SMS/Email gateways, Google Calendar sync, and role permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" /> API Integrations & Webhooks
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Twilio SMS Gateway API Key</label>
              <input type="password" value="••••••••••••••••••••••••" readOnly className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-mono" />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Google Calendar Sync Token</label>
              <input type="password" value="••••••••••••••••••••••••" readOnly className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-mono" />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Stripe Payment Gateway Secret Key</label>
              <input type="password" value="••••••••••••••••••••••••" readOnly className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 font-mono" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" /> Company & Compliance Settings
          </h3>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span>Company Name</span>
              <span className="font-bold text-slate-900">ASSIST Roofing Pty Ltd</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span>ABN</span>
              <span className="font-bold text-slate-900">88 123 456 789</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span>Building Standard</span>
              <span className="font-bold text-emerald-700">AS 4349.1 Compliant</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
