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
      setError('Missing fields');
      return;
    }

    setIsSubmitting(true);

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
    <div className="min-h-screen bg-paper-white flex items-center justify-center p-6">
      <div 
        className="max-w-5xl w-full overflow-hidden flex flex-col md:flex-row shadow-xl border border-slate-200"
        style={{ borderRadius: '8px' }}
      >
        
        {/* Left Side — Solid Cooperative Green panel */}
        <div 
          className="md:w-5/12 p-10 flex flex-col justify-between relative"
          style={{ backgroundColor: '#44d991', minHeight: '480px' }}
        >
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div 
              className="w-10 h-10 bg-ink-black flex items-center justify-center rounded"
            >
              <span className="material-symbols-outlined text-paper-white text-xl font-bold">roofing</span>
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#000000',
              }}
            >
              ASSIST
            </div>
          </div>

          {/* Real Roof Image card in left panel */}
          <div className="my-6 rounded overflow-hidden border border-black/10 shadow-sm h-40">
            <img src="/images/roofs/roof4.jpg" alt="ASSIST Roof" className="w-full h-full object-cover" />
          </div>

          {/* Welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 
              className="mb-2"
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '32px',
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#000000',
              }}
            >
              WELCOME BACK.
            </h2>
            <p 
              className="mb-4 text-xs text-black/80"
              style={{
                fontFamily: 'var(--font-manrope)',
                lineHeight: 1.4,
              }}
            >
              Access your client portal to track project milestones, view quotes, and manage your roof warranty details.
            </p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-ink-black text-base">verified_user</span>
              <span 
                style={{
                  fontFamily: 'var(--font-athletics)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#000000',
                }}
              >
                Secure 256-bit Encryption
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side — Form on white */}
        <div 
          className="md:w-7/12 p-10 lg:p-14 flex items-center justify-center bg-white"
        >
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-athletics)',
                  fontSize: '22px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  color: '#000000',
                }}
              >
                PORTAL SIGN IN
              </h1>
              <p 
                className="mb-6 text-sm text-slate-500"
                style={{
                  fontFamily: 'var(--font-manrope)',
                }}
              >
                Enter your credentials to access your account.
              </p>

              {error && (
                <div 
                  className="mb-5 p-3 text-xs font-medium"
                  style={{
                    backgroundColor: '#fff5f3',
                    border: '1px solid #ff6a51',
                    borderRadius: '4px',
                    color: '#ff6a51',
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    className="block mb-1.5"
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#000000',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 outline-none border border-black rounded"
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '14px',
                      color: '#000000',
                    }}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      style={{
                        fontFamily: 'var(--font-athletics)',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#000000',
                      }}
                    >
                      Password
                    </label>
                    <a 
                      href="#" 
                      className="text-xs text-cooperative-green hover:underline font-medium"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 outline-none border border-black rounded"
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '14px',
                      color: '#000000',
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill w-full py-3.5 text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-paper-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div 
                className="mt-6 text-center text-xs text-slate-500"
                style={{
                  fontFamily: 'var(--font-manrope)',
                }}
              >
                Don't have an account?{' '}
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="text-black font-semibold underline"
                >
                  Request Portal Access
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
