import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login, error, clearError, isLoading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    if (!email.trim() || !password) {
      setFormError('Please enter both your email address and password.');
      return;
    }

    try {
      await login(email.trim(), password);
    } catch {
      // Error is caught and set in AdminAuthContext
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col justify-between items-center p-4 sm:p-6 font-['Sora',sans-serif] relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Spacer */}
      <div className="w-full max-w-md pt-4 sm:pt-8 flex justify-between items-center z-10">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <span className="text-zinc-400">←</span> assistroofing.com.au
        </a>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-zinc-600 bg-zinc-100 border border-zinc-200/80 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          CMS Gateway
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full bg-white border border-zinc-200/90 rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative z-10 my-auto">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <a href="/" className="mb-5 block transition-transform hover:scale-[1.02]">
            <img
              src="/logo.png"
              alt="Assist Roofing & Home Solution"
              className="h-16 w-auto object-contain"
            />
          </a>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 font-['Oswald',sans-serif] uppercase">
            Staff Portal Sign In
          </h1>
          <p className="text-xs text-zinc-500 mt-1.5 max-w-xs leading-relaxed">
            Enter your authorized administrator credentials to manage quotes, content, and system settings.
          </p>
        </div>

        {/* Error Notification */}
        {(error || formError) && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs font-medium animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error || formError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="peter@assistroofing.com.au"
                className="w-full bg-[#fdfdfd] border border-zinc-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-zinc-800">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#fdfdfd] border border-zinc-300 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1 rounded-md transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 py-3 px-4 bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security / Compliance Badge */}
        <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
            <span>256-Bit Encrypted Session</span>
          </div>
          <span className="text-zinc-400">VBA Master Trades</span>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="w-full max-w-md py-4 text-center text-xs text-zinc-400 z-10">
        <p>© {new Date().getFullYear()} Assist Roofing & Home Solution. All rights reserved.</p>
      </div>
    </div>
  );
};
