import React from 'react';
import { TESTIMONIALS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { FadeIn } from '../components/FadeIn';

export const Testimonials: React.FC = () => {
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
              CLIENT TESTIMONIALS & REVIEWS
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
              Read what homeowners across Melbourne say about our high quality roof replacements and restorations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review, i) => (
              <FadeIn delay={i * 0.1} direction="up" key={i}>
                <div 
                  className="p-6 flex flex-col justify-between h-full bg-white border border-slate-200 rounded-lg shadow-sm"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <span 
                          key={j} 
                          style={{ 
                            fontSize: '18px', 
                            color: j < review.rating ? '#ff6a51' : '#eaf9f2' 
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p 
                      className="mb-6 text-slate-700 italic text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      "{review.comment}"
                    </p>
                  </div>

                  <div>
                    {/* Real roof thumbnail context */}
                    {review.imageUrl && (
                      <div className="w-full h-28 rounded overflow-hidden mb-4 border border-slate-100">
                        <img src={review.imageUrl} alt={review.project} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: '#4c92e9' }}
                      >
                        <span 
                          className="text-white text-xs font-bold"
                          style={{ fontFamily: 'var(--font-athletics)' }}
                        >
                          {review.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-black" style={{ fontFamily: 'var(--font-manrope)' }}>
                          {review.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {review.location}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-cooperative-green uppercase tracking-wider">
                      {review.project}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-16"
        style={{ backgroundColor: '#44d991' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <div 
            className="mb-3"
            style={{
              fontFamily: 'var(--font-athletics)',
              fontSize: '42px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              lineHeight: 1,
              color: '#000000',
            }}
          >
            5.0 <span style={{ color: '#ff6a51' }}>★★★★★</span>
          </div>
          <p className="mb-6 max-w-lg mx-auto text-black/80 text-sm font-medium">
            Based on over 500+ verified roof replacements and restorations across Melbourne.
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="btn-pill py-3.5 px-8"
          >
            Experience the Difference
          </button>
        </div>
      </section>
    </div>
  );
};
