import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWebsite } from '../WebsiteContext';

export const Login: React.FC = () => {
  const { setCurrentPage } = useWebsite();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Missing fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate login API call
    setTimeout(() => {
      try {
        setIsSubmitting(false);
        const mockUser = { id: '1', name: 'Peter', role: 'admin' };
        const mockToken = 'jwt_token_here';
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userRole', mockUser.role);
        localStorage.setItem('userName', mockUser.name);
        
        window.dispatchEvent(new Event('auth-change'));
      } catch (err: any) {
        setError(err.message);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 mt-24">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Side - Image & Brand */}
        <div className="md:w-5/12 bg-brand-900 text-white p-12 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 to-brand-900/40"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-brand-900 text-xl font-bold">roofing</span>
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight font-headline">ASSIST</div>
                <div className="text-[10px] font-bold text-accent-400 tracking-[0.2em] uppercase">Roofing</div>
              </div>
            </div>

            <div className="mt-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-black mb-4">Welcome Back.</h2>
                <p className="text-brand-100 text-sm leading-relaxed mb-8">
                  Access your customer portal to view quotes, track project progress, and manage your invoices securely.
                </p>
                <div className="flex items-center gap-3 text-sm font-bold text-accent-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Secure 256-bit Encryption</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-12 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl font-black text-slate-900 mb-2">Sign In</h1>
              <p className="text-slate-500 mb-8 font-medium">Enter your credentials to access your account.</p>

              {error && (
                <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-lg text-sm font-bold border border-rose-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-slate-700">Password</label>
                    <a href="#" className="text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg shadow-brand-900/20"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm font-medium text-slate-500">
                Don't have an account?{' '}
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="font-bold text-brand-600 hover:text-brand-800 transition-colors"
                >
                  Request Access
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
