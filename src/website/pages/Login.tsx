import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      setError('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        setIsSubmitting(false);
        const mockUser = { id: '1', name: 'Admin User', role: 'admin' };
        const mockToken = 'jwt_token_here';
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userRole', mockUser.role);
        localStorage.setItem('userName', mockUser.name);
        
        window.dispatchEvent(new Event('auth-change'));
      } catch (err: any) {
        setError(err.message);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] font-['Sora',sans-serif] flex items-center justify-center p-4 sm:p-6 py-16">
      <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#e6ebf6] flex flex-col md:flex-row">
        
        {/* Left Side: Brand Panel */}
        <div className="md:w-5/12 bg-[#1e2e4f] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
            style={{ backgroundImage: `url('/roofora-assets/images/banner-bg-img.jpg')` }}
          />

          <div className="relative z-10">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer mb-8"
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-10 h-10 bg-[#f19e1f] rounded-xl flex items-center justify-center text-white shadow">
                <i className="fa-solid fa-house-chimney text-lg"></i>
              </div>
              <div className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white">
                ASSIST <span className="text-[#f19e1f]">ROOFING</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-3">
              Staff & Client ERP Portal
            </h2>
            <p className="text-xs sm:text-sm text-[#b7c1d5] leading-relaxed font-light mb-6">
              Access real-time project schedules, material deliveries, itemized job estimates, and warranty documentation.
            </p>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-[#b7c1d5] flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-[#f19e1f] text-sm"></i>
            <span>256-Bit Encrypted Secure Session</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 sm:p-12 flex items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] block mb-1">
                Portal Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-2">
                Sign In to Account
              </h1>
              <p className="text-xs text-[#616a7e] mb-6">
                Enter your credentials to manage roofing projects.
              </p>

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f4f8ff] border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                    placeholder="admin@assistroofing.com.au"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e]">
                      Password
                    </label>
                    <a href="#" className="text-xs text-[#f19e1f] hover:underline font-semibold">
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f4f8ff] border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1e2e4f] hover:bg-[#293a5b] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Sign In to ERP</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-xs text-[#616a7e]">
                Need staff credentials?{' '}
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="text-[#1e2e4f] font-bold underline"
                >
                  Contact Management
                </button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

