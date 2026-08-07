import React from 'react';
import { TEAM_MEMBERS } from '../data';
import { useWebsite } from '../WebsiteContext';

export const About: React.FC = () => {
  const { setCurrentPage } = useWebsite();

  return (
    <div className="flex-1 w-full pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-headline">Built on Trust, <br/><span className="text-brand-600">Driven by Quality</span></h1>
            <div className="space-y-6 text-lg text-slate-600">
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
            <div className="mt-10">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all active:scale-95 shadow-md shadow-brand-600/20"
              >
                Work With Us
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200 border border-slate-300 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1541888081688-6625807fa56a?w=800&auto=format&fit=crop" 
                alt="Our team on a roof" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white border border-slate-100 p-8 rounded-3xl shadow-2xl max-w-xs">
              <div className="text-4xl font-black text-brand-600 mb-2">15+</div>
              <div className="text-slate-900 font-bold mb-1">Years of Excellence</div>
              <div className="text-sm text-slate-500">Serving Melbourne and surrounding suburbs since 2011.</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-headline">Meet The Team</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">The dedicated professionals ensuring your roof is built to last.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-32 h-32 rounded-full bg-slate-100 mx-auto mb-6 overflow-hidden border-4 border-slate-50 group-hover:border-brand-100 transition-colors shadow-inner">
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400 group-hover:text-brand-500 transition-colors">
                  {member.name.charAt(0)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <div className="text-brand-600 font-bold text-sm mb-4 uppercase tracking-wider">{member.role}</div>
              <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
