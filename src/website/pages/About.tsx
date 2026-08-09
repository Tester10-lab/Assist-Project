import React from 'react';
import { TEAM_MEMBERS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { FadeIn } from '../components/FadeIn';

export const About: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="flex-1 w-full bg-paper-white min-h-screen">
      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.1} direction="up">
              <div>
                <h1 
                  className="mb-6"
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
                  BUILT ON TRUST, DRIVEN BY QUALITY
                </h1>
                <div className="space-y-5" style={{ fontFamily: 'var(--font-manrope)', fontSize: '16px', lineHeight: 1.5, color: '#333333' }}>
                  <p>
                    Founded in 2011, ASSIST Roofing started with a simple mission: to elevate the standard of roofing in Melbourne through transparent pricing, superior materials, and uncompromising workmanship.
                  </p>
                  <p>
                    What began as a small family operation has grown into one of Victoria's most trusted roofing companies. We've replaced, restored, and repaired over 2,500 roofs across the state, protecting families and their most valuable assets.
                  </p>
                  <p>
                    We don't believe in high-pressure sales tactics or cutting corners. We believe in doing the job right the first time, which is why we proudly back our work with a 10-year workmanship warranty.
                  </p>
                </div>
                <div className="mt-8">
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="btn-pill px-8 py-3.5"
                  >
                    Work With Us
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Circular image frame in blue surface — Real user photo */}
            <FadeIn delay={0.2} direction="left">
              <div 
                className="relative flex items-center justify-center p-10 min-h-[380px]"
                style={{ backgroundColor: '#4c92e9', borderRadius: '8px' }}
              >
                <div 
                  className="overflow-hidden shadow-xl border-4 border-white"
                  style={{ 
                    width: '280px', 
                    height: '280px', 
                    borderRadius: '50%',
                  }}
                >
                  <img 
                    src="/images/roofs/roof1.jpg" 
                    alt="ASSIST Roofing Melbourne Crew" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating stat block */}
                <div 
                  className="absolute -bottom-4 -left-4 p-5 shadow-lg border border-black/10"
                  style={{ backgroundColor: '#44d991', borderRadius: '8px' }}
                >
                  <span 
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '42px',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      color: '#000000',
                      display: 'block',
                    }}
                  >
                    15+
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#000000',
                    }}
                  >
                    YEARS OF EXCELLENCE
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16" style={{ backgroundColor: '#eaf9f2' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <h2 
              style={{
                fontFamily: 'var(--font-athletics)',
                fontSize: '22px',
                fontWeight: 500,
                color: '#000000',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              MEET OUR LEADERSHIP & CREW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <FadeIn delay={i * 0.12} direction="up" key={i}>
                <div 
                  className="text-center p-6 flex flex-col items-center"
                  style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                >
                  {/* Real Photo Avatar */}
                  <div 
                    className="w-32 h-32 mb-6 overflow-hidden shadow-md border-2 border-slate-100"
                    style={{ borderRadius: '50%' }}
                  >
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 
                    className="mb-1 font-semibold"
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '18px',
                      color: '#000000',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {member.name}
                  </h3>
                  <div 
                    className="mb-3"
                    style={{
                      fontFamily: 'var(--font-athletics)',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#44d991',
                    }}
                  >
                    {member.role}
                  </div>
                  <p 
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '14px',
                      color: '#666666',
                      letterSpacing: '0.01em',
                      lineHeight: 1.4,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
