import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="flex-1 w-full pt-32 pb-0 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-headline">Get in Touch</h1>
            <p className="text-lg text-slate-600 mb-10">
              Ready to secure your home? Fill out the form below and one of our roofing experts will get back to you within 24 hours.
            </p>
            
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm" 
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm" 
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm" 
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm" 
                    placeholder="0400 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Service Required</label>
                <select className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all appearance-none shadow-sm">
                  <option value="">Select a service...</option>
                  <option value="replacement">Roof Replacement</option>
                  <option value="restoration">Roof Restoration</option>
                  <option value="repair">Roof Repair</option>
                  <option value="inspection">Free Inspection</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Message Details</label>
                <textarea 
                  rows={5}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none shadow-sm" 
                  placeholder="Tell us about your roof..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-brand-600 text-white font-bold py-5 rounded-xl hover:bg-brand-700 transition-all text-lg shadow-lg shadow-brand-600/20"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Map / Info */}
          <div className="flex flex-col h-full">
            <div className="bg-brand-900 p-10 rounded-3xl border border-brand-800 mb-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-8 font-headline">Melbourne Head Office</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="material-symbols-outlined text-accent-500 text-2xl mr-4">location_on</span>
                  <div>
                    <div className="text-white font-bold mb-1">Visit Us</div>
                    <p className="text-brand-100">123 Industrial Blvd<br/>Melbourne, VIC 3000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="material-symbols-outlined text-accent-500 text-2xl mr-4">call</span>
                  <div>
                    <div className="text-white font-bold mb-1">Call Us</div>
                    <p className="text-brand-100">1800 ASSIST (1800 277 478)<br/><span className="text-sm text-brand-300">Mon-Fri: 7am - 5pm</span></p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="material-symbols-outlined text-accent-500 text-2xl mr-4">mail</span>
                  <div>
                    <div className="text-white font-bold mb-1">Email Us</div>
                    <p className="text-brand-100">info@assistroofing.com.au</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-h-[300px] rounded-3xl overflow-hidden border border-slate-200 relative bg-slate-200 shadow-inner">
              <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop" 
                 alt="Melbourne Map" 
                 className="w-full h-full object-cover opacity-80 mix-blend-multiply"
               />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-600/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-brand-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
