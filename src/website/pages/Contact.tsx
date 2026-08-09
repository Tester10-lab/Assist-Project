import React from 'react';
import { FadeIn } from '../components/FadeIn';

export const Contact: React.FC = () => {
  return (
    <div className="flex-1 w-full bg-paper-white min-h-screen">
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn direction="up">
              <div>
                <h1 
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-athletics)',
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    fontWeight: 500,
                    lineHeight: 1.05,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#000000',
                  }}
                >
                  GET IN TOUCH
                </h1>
                <p 
                  className="mb-8 text-slate-600"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '16px',
                    lineHeight: 1.5,
                  }}
                >
                  Ready to upgrade or repair your roof? Contact our Melbourne team for a free assessment and formal quote.
                </p>
                
                <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        First Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 outline-none border border-black rounded focus:ring-1 focus:ring-black"
                        style={{
                          fontFamily: 'var(--font-manrope)',
                          fontSize: '14px',
                          color: '#000000',
                        }}
                        placeholder="John"
                      />
                    </div>
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
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 outline-none border border-black rounded focus:ring-1 focus:ring-black"
                        style={{
                          fontFamily: 'var(--font-manrope)',
                          fontSize: '14px',
                          color: '#000000',
                        }}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 outline-none border border-black rounded focus:ring-1 focus:ring-black"
                        style={{
                          fontFamily: 'var(--font-manrope)',
                          fontSize: '14px',
                          color: '#000000',
                        }}
                        placeholder="john@example.com"
                      />
                    </div>
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
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 outline-none border border-black rounded focus:ring-1 focus:ring-black"
                        style={{
                          fontFamily: 'var(--font-manrope)',
                          fontSize: '14px',
                          color: '#000000',
                        }}
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>

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
                      Service Required
                    </label>
                    <select 
                      className="w-full px-4 py-3 outline-none border border-black rounded appearance-none bg-white cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-manrope)',
                        fontSize: '14px',
                        color: '#000000',
                      }}
                    >
                      <option value="">Select a service...</option>
                      <option value="replacement">Roof Replacement</option>
                      <option value="restoration">Roof Restoration</option>
                      <option value="repair">Roof Repair</option>
                      <option value="inspection">Free Inspection</option>
                    </select>
                  </div>
                  
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
                      Message Details
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 outline-none border border-black rounded resize-none"
                      style={{
                        fontFamily: 'var(--font-manrope)',
                        fontSize: '14px',
                        color: '#000000',
                      }}
                      placeholder="Tell us about your roof..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="btn-pill w-full py-4 text-sm font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </FadeIn>
            
            {/* Info Panel & Featured Image */}
            <FadeIn delay={0.2} direction="left">
              <div className="flex flex-col gap-6">
                <div 
                  className="p-8 shadow-sm"
                  style={{ backgroundColor: '#44d991', borderRadius: '8px' }}
                >
                  <h3 
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      color: '#000000',
                    }}
                  >
                    MELBOURNE HEAD OFFICE
                  </h3>
                  <div className="space-y-5" style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', color: '#000000' }}>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-xl mt-0.5">location_on</span>
                      <div>
                        <div className="font-semibold">Visit Us</div>
                        <p className="opacity-80">123 Industrial Blvd, Melbourne VIC 3000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-xl mt-0.5">call</span>
                      <div>
                        <div className="font-semibold">Call Us</div>
                        <p>
                          <span style={{ fontFamily: 'var(--font-athletics)', fontSize: '18px', letterSpacing: '0.04em' }}>1800 277 478</span>
                          <br/>
                          <span className="opacity-70 text-xs">Mon-Fri: 7am - 5pm</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-xl mt-0.5">mail</span>
                      <div>
                        <div className="font-semibold">Email Us</div>
                        <p className="opacity-80">info@assistroofing.com.au</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Real Roof Photo Banner */}
                <div 
                  className="h-64 rounded-lg overflow-hidden border border-slate-200 relative shadow-sm"
                >
                  <img 
                    src="./images/roofs/roof3.jpg" 
                    alt="ASSIST Roofing Melbourne HQ" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-white">
                    <div className="text-xs uppercase font-bold text-cooperative-green" style={{ fontFamily: 'var(--font-athletics)' }}>
                      Local Melbourne Team
                    </div>
                    <div className="text-sm font-medium">Ready to serve all Eastern, Western & Southern Melbourne Suburbs</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};
