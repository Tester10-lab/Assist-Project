import React from 'react';
import { SERVICES } from '../data';
import { useWebsite } from '../WebsiteContext';

export const Services: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="flex-1 w-full pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-headline">Premium Roofing Services</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From minor leak repairs to complete roof replacements, we provide comprehensive roofing solutions for residential and commercial properties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <div key={i} className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-start group">
              <div className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-brand-600 group-hover:text-white transition-colors">{service.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {[1, 2, 3].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span className="material-symbols-outlined text-accent-500 text-sm">check_circle</span>
                      Premium quality materials
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="text-brand-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:text-brand-800 transition-colors"
                >
                  Request Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-24 bg-brand-900 rounded-3xl p-12 text-center border border-brand-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h2 className="text-3xl font-black text-white mb-4 relative z-10 font-headline">Not sure what you need?</h2>
          <p className="text-brand-100 max-w-2xl mx-auto mb-8 relative z-10">
            Book a free, no-obligation roof inspection. Our experts will assess your roof's condition and provide honest recommendations.
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-600 transition-all active:scale-95 shadow-lg shadow-accent-500/25 relative z-10"
          >
            Book Free Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
