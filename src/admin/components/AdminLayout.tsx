import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard,
  FileText,
  Wrench,
  MapPin,
  Newspaper,
  Image as ImageIcon,
  Search,
  Settings,
  Users,
  History,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  UserCheck,
  Lock,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

export type AdminSection =
  | 'dashboard'
  | 'pages'
  | 'services'
  | 'locations'
  | 'blog'
  | 'media'
  | 'seo'
  | 'settings'
  | 'users'
  | 'activity';

interface AdminLayoutProps {
  currentSection: AdminSection;
  onNavigate: (section: AdminSection) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentSection,
  onNavigate,
  children
}) => {
  const { user, logout, isAdmin, changePassword } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(user?.mustChangePassword || false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);
  const [isSubmittingPass, setIsSubmittingPass] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (newPass.length < 8) {
      setPassError('New password must be at least 8 characters long.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New passwords do not match.');
      return;
    }

    setIsSubmittingPass(true);
    try {
      await changePassword(currentPass, newPass);
      setPassSuccess('Password updated successfully!');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
        setPassSuccess(null);
      }, 1200);
    } catch (err: any) {
      setPassError(err.message || 'Failed to update password.');
    } finally {
      setIsSubmittingPass(false);
    }
  };

  const navGroups = [
    {
      label: 'Overview',
      items: [
        { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Content',
      items: [
        { id: 'pages' as AdminSection, label: 'Pages', icon: FileText },
        { id: 'services' as AdminSection, label: 'Services', icon: Wrench },
        { id: 'locations' as AdminSection, label: 'Locations', icon: MapPin },
        { id: 'blog' as AdminSection, label: 'Blog', icon: Newspaper },
        { id: 'media' as AdminSection, label: 'Media', icon: ImageIcon }
      ]
    },
    {
      label: 'SEO',
      items: [
        { id: 'seo' as AdminSection, label: 'SEO Settings', icon: Search }
      ]
    },
    {
      label: 'System',
      items: [
        ...(isAdmin
          ? [{ id: 'users' as AdminSection, label: 'Users', icon: Users, badge: 'Admin' }]
          : []),
        { id: 'activity' as AdminSection, label: 'Activity Log', icon: History },
        ...(isAdmin
          ? [{ id: 'settings' as AdminSection, label: 'Site Settings', icon: Settings }]
          : [])
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col lg:flex-row font-sans selection:bg-[#f19e1f]/30">
      
      {/* ── Mobile Header ── */}
      <div className="lg:hidden bg-[#1e2e4f] text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="bg-[#f19e1f] p-1.5 rounded-lg text-slate-950 font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">ASSIST ROOFING</h1>
            <p className="text-[10px] text-slate-300 font-medium">ADMIN CMS</p>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Sidebar Navigation ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1e2e4f] text-white flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f19e1f] flex items-center justify-center text-slate-950 shadow-md font-extrabold">
              <Wrench className="w-5 h-5 text-[#1e2e4f]" />
            </div>
            <div>
              <h2 className="font-black text-sm tracking-wide text-white uppercase">Assist Roofing</h2>
              <span className="text-[10px] tracking-widest text-[#f19e1f] font-bold uppercase bg-white/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
                Production CMS
              </span>
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navGroups.map((group, idx) => (
              <div key={idx}>
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {group.label}
                </span>
                <ul className="space-y-1">
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const isActive = currentSection === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            onNavigate(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-[#f19e1f] text-slate-950 font-bold shadow-md'
                              : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer / User Profile in Sidebar */}
        <div className="p-4 border-t border-white/10 bg-slate-950/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  {user?.role === 'admin' ? (
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <UserCheck className="w-3 h-3 text-blue-400" />
                  )}
                  <span className="capitalize">{user?.role}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              title="Change Password"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-[11px] font-semibold rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition-colors flex items-center justify-center"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden"
        />
      )}

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900 capitalize">{currentSection}</span>
          </div>

          <div className="flex items-center gap-3">
            {user?.mustChangePassword && (
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-amber-200 animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Change Default Password</span>
              </button>
            )}

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1e2e4f] bg-slate-100 hover:bg-slate-200 rounded-full transition-colors border border-slate-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[11px] font-bold text-slate-600">Online API</span>
            </div>
          </div>
        </header>

        {/* Dynamic Section Content */}
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>

      {/* ── Change Password Modal ── */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-900">
                <Lock className="w-5 h-5 text-[#f19e1f]" />
                <h3 className="font-bold text-base">Update Account Password</h3>
              </div>
              {!user?.mustChangePassword && (
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {user?.mustChangePassword && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
                You are currently using a temporary setup password. For security, please set a new custom password before continuing.
              </div>
            )}

            {passError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
                {passError}
              </div>
            )}

            {passSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                {passSuccess}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {!user?.mustChangePassword && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPass}
                    onChange={e => setCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#f19e1f]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  New Password (Min 8 Characters)
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#f19e1f]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                {!user?.mustChangePassword && (
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingPass}
                  className="px-5 py-2.5 bg-[#1e2e4f] hover:bg-[#283d66] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
                >
                  {isSubmittingPass ? 'Saving...' : 'Set Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
