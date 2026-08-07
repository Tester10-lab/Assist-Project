import React from 'react';
import { TESTIMONIALS } from '../data';
import { useWebsite } from '../WebsiteContext';

export const Testimonials: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="flex-1 w-full pt-32 pb-24 bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/50 via-slate-50 to-slate-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-headline">Client Testimonials</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it. Read what our satisfied customers across Melbourne have to say about their experience with ASSIST Roofing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 relative group hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-5 -right-2 text-8xl text-brand-500/10 font-serif group-hover:text-brand-500/20 transition-colors leading-none">"</div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className={`text-xl ${j < review.rating ? 'text-accent-500' : 'text-slate-200'}`}>
                    ★
                  </span>
                ))}
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed italic relative z-10">
                "{review.comment}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold border border-brand-100">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-slate-900 font-bold">{review.name}</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">{review.location}</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-brand-600">
                Project: {review.project}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-white p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-4xl font-black text-slate-900 mb-4 font-headline">5.0 <span className="text-accent-500 text-3xl">★★★★★</span></div>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">Based on over 150 verified reviews from Melbourne homeowners.</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all active:scale-95 shadow-md shadow-brand-600/20"
          >
            Experience the Difference
          </button>
        </div>
      </div>
    </div>
  );
};
