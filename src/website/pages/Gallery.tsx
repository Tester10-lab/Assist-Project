import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { FadeIn } from '../components/FadeIn';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { setCurrentPage } = useWebsite();

  const categories = ['All', ...Array.from(new Set(GALLERY_PROJECTS.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? GALLERY_PROJECTS 
    : GALLERY_PROJECTS.filter(p => p.category === filter);

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
              OUR REAL WORK GALLERY ({GALLERY_PROJECTS.length} PROJECTS)
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
              Browse our full portfolio of authentic roof replacements, restorations, and repairs completed across Melbourne.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="pb-8">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={filter === cat ? 'btn-pill text-xs py-2 px-5' : 'btn-pill-ghost text-xs py-2 px-5'}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid — Featuring All 19 Real Images */}
      <section className="pb-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <FadeIn delay={(i % 6) * 0.08} direction="up" key={project.id}>
                <div 
                  className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
                >
                  {/* Real Photo Header */}
                  <div className="w-full h-56 overflow-hidden relative">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div 
                      className="absolute top-3 left-3 px-3 py-1 bg-black/80 text-white rounded text-[11px] uppercase font-bold tracking-wider"
                      style={{ fontFamily: 'var(--font-athletics)' }}
                    >
                      {project.category}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1">
                        {project.location}
                      </div>
                      <h3 
                        className="mb-2 font-semibold"
                        style={{
                          fontFamily: 'var(--font-manrope)',
                          fontSize: '17px',
                          color: '#000000',
                          lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </h3>
                      <p 
                        className="mb-4 text-slate-600 text-sm"
                        style={{
                          fontFamily: 'var(--font-manrope)',
                          lineHeight: 1.4,
                        }}
                      >
                        {project.description}
                      </p>
                    </div>

                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="btn-pill-ghost text-xs py-2 px-4 self-start"
                    >
                      Inquire About This Roof
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p 
            className="mb-6 font-medium text-xl"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Want a roof transformation like these for your home?
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="btn-pill py-3.5 px-8"
          >
            Get an Instant Quote
          </button>
        </div>
      </section>
    </div>
  );
};
