import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data';
import { useWebsite } from '../WebsiteContext';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { setCurrentPage } = useWebsite();

  const categories = ['All', ...Array.from(new Set(GALLERY_PROJECTS.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? GALLERY_PROJECTS 
    : GALLERY_PROJECTS.filter(p => p.category === filter);

  return (
    <div className="flex-1 w-full pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-headline">Our Recent Work</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our portfolio of completed roofing projects across Melbourne. Seeing is believing when it comes to quality craftsmanship.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                filter === cat 
                  ? 'bg-brand-600 text-white border border-brand-600' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-700 text-xs font-bold px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  {project.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-3 tracking-wider uppercase">
                  <span className="material-symbols-outlined text-sm">location_on</span> {project.location}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-brand-50 p-12 rounded-3xl border border-brand-100">
          <p className="text-brand-900 mb-6 font-bold text-xl font-headline">Like what you see? Let's discuss your roofing project.</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all active:scale-95 shadow-md shadow-brand-600/20"
          >
            Request a Quote
          </button>
        </div>
      </div>
    </div>
  );
};
