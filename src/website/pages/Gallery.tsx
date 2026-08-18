import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data';
import { useWebsite } from '../WebsiteContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { setCurrentPage } = useWebsite();

  const categories = ['All', ...Array.from(new Set(GALLERY_PROJECTS.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? GALLERY_PROJECTS 
    : GALLERY_PROJECTS.filter(p => p.category === filter);

  return (
    <div className="w-full bg-white text-[#1e2e4f] font-['Sora',sans-serif]">
      {/* ── Sub Banner ── */}
      <section className="relative bg-[#1e2e4f] text-white py-16 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/roofora-assets/images/sub-banner-bg-img.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2e4f] via-[#1e2e4f]/90 to-[#1e2e4f]/70 pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-4">
            Our Projects
          </h1>
          <p className="text-base sm:text-lg text-[#b7c1d5] max-w-2xl mx-auto mb-6 font-light">
            Explore authentic completed roof replacements, architectural standing seam metal installations, and restorations across Melbourne.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
            <button onClick={() => setCurrentPage('home')} className="text-[#b7c1d5] hover:text-white transition-colors">Home</button>
            <span className="text-[#f19e1f] font-bold">/</span>
            <span className="text-white">Projects</span>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs & Projects Grid ── */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs uppercase font-bold tracking-wider px-6 py-3 rounded-full transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#f19e1f] text-white shadow-md'
                      : 'bg-white text-[#1e2e4f] hover:bg-gray-100 border border-[#e6ebf6]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#e6ebf6] flex flex-col group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-[#1e2e4f] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#f19e1f] font-semibold mb-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{project.location}</span>
                      </div>
                      <h3 className="text-xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-3 group-hover:text-[#f19e1f] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#616a7e] leading-relaxed mb-6 font-light">
                        {project.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="w-full bg-[#f4f8ff] group-hover:bg-[#1e2e4f] text-[#1e2e4f] group-hover:text-white font-bold text-xs uppercase tracking-wider py-3 rounded-full transition-all flex items-center justify-center gap-2"
                    >
                      <span>Inquire About This Roof</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Call To Action ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-4">
            Have a Specific Architectural Design in Mind?
          </h2>
          <p className="text-base text-[#616a7e] max-w-xl mx-auto mb-8">
            Our master sheet metal fabricators specialize in custom standing seam, box gutters, and intricate tile roof restorations.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all"
          >
            Schedule On-Site Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

