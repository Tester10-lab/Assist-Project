import React from 'react';
import { SERVICES } from '../data';
import { useWebsite } from '../WebsiteContext';
import { FadeIn } from '../components/FadeIn';

const SERVICE_COLORS = ['#44d991', '#eaf9f2', '#4c92e9', '#ffffff', '#ff6a51'];

export const Services: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="flex-1 w-full bg-paper-white min-h-screen">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <FadeIn direction="up">
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
              PREMIUM ROOFING SERVICES
            </h1>
            <p 
              className="max-w-2xl text-slate-600"
              style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '16px',
                lineHeight: 1.5,
                letterSpacing: '0.01em',
              }}
            >
              From emergency leak repairs to complete colorbond roof replacements, we provide comprehensive solutions backed by Melbourne's top-rated roofing team.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Cards — Real roof photos */}
      <section className="pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => (
              <FadeIn delay={i * 0.1} direction="up" key={i}>
                <div 
                  className="flex flex-col sm:flex-row gap-6 items-start p-6 h-full"
                  style={{ 
                    backgroundColor: SERVICE_COLORS[i % SERVICE_COLORS.length],
                    borderRadius: '8px',
                    border: SERVICE_COLORS[i % SERVICE_COLORS.length] === '#ffffff' ? '1px solid #000000' : 'none',
                  }}
                >
                  {/* Real Photo Thumbnail */}
                  <div 
                    className="w-full sm:w-44 h-40 overflow-hidden shrink-0 border border-black/10"
                    style={{ borderRadius: '6px' }}
                  >
                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-ink-black text-xl">{service.icon}</span>
                        <h3 
                          style={{
                            fontFamily: 'var(--font-athletics)',
                            fontSize: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: '#000000',
                          }}
                        >
                          {service.title}
                        </h3>
                      </div>

                      <p 
                        className="mb-4"
                        style={{
                          fontFamily: 'var(--font-manrope)',
                          fontSize: '14px',
                          color: '#000000',
                          letterSpacing: '0.01em',
                          lineHeight: 1.4,
                        }}
                      >
                        {service.description}
                      </p>

                      <ul className="space-y-1.5 mb-6">
                        {service.features.map((feature, j) => (
                          <li 
                            key={j}
                            className="flex items-center gap-2"
                            style={{
                              fontFamily: 'var(--font-manrope)',
                              fontSize: '13px',
                              color: '#000000',
                              letterSpacing: '0.01em',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-ink-black shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="btn-pill self-start text-xs py-2.5 px-5"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section 
        className="py-16"
        style={{ backgroundColor: '#44d991' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-athletics)',
              fontSize: 'clamp(24px, 3vw, 42px)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#000000',
            }}
          >
            NEED A FREE INSPECTION & ESTIMATE?
          </h2>
          <p 
            className="max-w-2xl mx-auto mb-8"
            style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '16px',
              color: '#000000',
              letterSpacing: '0.01em',
              lineHeight: 1.4,
              opacity: 0.9,
            }}
          >
            Book a free, no-obligation roof inspection. Our licensed Melbourne experts will inspect your roof and provide honest recommendations.
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="btn-pill py-3.5 px-8"
          >
            Book Free Inspection
          </button>
        </div>
      </section>
    </div>
  );
};
