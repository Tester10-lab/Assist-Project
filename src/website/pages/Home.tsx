import React from 'react';
import { HeroImage3D } from '../components/HeroImage3D';
import { SERVICES } from '../data';
import { useWebsite } from '../WebsiteContext';
import { FadeIn } from '../components/FadeIn';

export const Home: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="flex-1 w-full bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <FadeIn delay={0.1} direction="up" className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 font-semibold text-sm mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                Melbourne's Premium Roofing Contractor
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] font-headline">
                Protect Your Most <br/>
                <span className="text-brand-600">Valuable Asset.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Expert roof replacements, restorations, and repairs across Melbourne. Backed by a 10-year workmanship guarantee and unmatched customer service.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="bg-accent-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/20 active:scale-95"
                >
                  Get a Free Quote
                </button>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
                >
                  Our Services
                </button>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-accent-500 text-lg">★★★★★</div>
                  <div className="text-sm font-semibold text-slate-600">Over 500+ happy clients</div>
                </div>
              </div>
            </FadeIn>

            {/* Realistic 3D Interactive Hero Image */}
            <FadeIn delay={0.3} direction="left" className="h-[600px] w-full relative perspective-1000">
              <HeroImage3D className="w-full h-full" />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-900 py-16 text-white border-y border-brand-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-brand-700/50">
            <FadeIn delay={0.1} direction="up" className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">15+</div>
              <div className="text-brand-200 font-semibold uppercase tracking-wider text-sm">Years Experience</div>
            </FadeIn>
            <FadeIn delay={0.2} direction="up" className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">2.5k</div>
              <div className="text-brand-200 font-semibold uppercase tracking-wider text-sm">Roofs Completed</div>
            </FadeIn>
            <FadeIn delay={0.3} direction="up" className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">100%</div>
              <div className="text-brand-200 font-semibold uppercase tracking-wider text-sm">Satisfaction Rate</div>
            </FadeIn>
            <FadeIn delay={0.4} direction="up" className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">10yr</div>
              <div className="text-brand-200 font-semibold uppercase tracking-wider text-sm">Guarantee</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-headline">Comprehensive Roofing Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From minor repairs to complete roof replacements, our team of certified professionals delivers exceptional results built to last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, i) => (
              <FadeIn delay={i * 0.15} direction="up" key={i}>
                <div className="h-full bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => setCurrentPage('services')}>
                  <div className="w-16 h-16 rounded-xl bg-brand-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-600 transition-all duration-300">
                    <span className="material-symbols-outlined text-brand-600 text-3xl group-hover:text-white transition-colors">{service.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="text-brand-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                    Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={() => setCurrentPage('services')}
              className="bg-brand-50 text-brand-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-100 transition-all border border-brand-200 shadow-sm"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
