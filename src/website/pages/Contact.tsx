import React, { useState } from 'react';
import { useWebsite } from '../WebsiteContext';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const { setCurrentPage } = useWebsite();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'Emergency Roof Repair',
    address: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-[#b7c1d5] max-w-2xl mx-auto mb-6 font-light">
            Need urgent leak fixes or planning a complete roof replacement? Our team responds within 2 business hours.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold">
            <button onClick={() => setCurrentPage('home')} className="text-[#b7c1d5] hover:text-white transition-colors">Home</button>
            <span className="text-[#f19e1f] font-bold">/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="py-12 bg-[#f4f8ff] border-b border-[#e6ebf6]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Phone */}
            <div className="bg-white p-6 rounded-3xl border border-[#e6ebf6] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1e2e4f] text-[#f19e1f] flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <span className="text-xs text-[#616a7e] font-bold uppercase tracking-wider block mb-1">Emergency Call</span>
                <a href="tel:1800277478" className="text-base font-bold text-[#1e2e4f] hover:text-[#f19e1f] transition-colors">
                  1800 277 478
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-3xl border border-[#e6ebf6] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1e2e4f] text-[#f19e1f] flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <span className="text-xs text-[#616a7e] font-bold uppercase tracking-wider block mb-1">Email Estimates</span>
                <a href="mailto:info@assistroofing.com.au" className="text-sm font-bold text-[#1e2e4f] hover:text-[#f19e1f] transition-colors">
                  info@assistroofing.com.au
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-3xl border border-[#e6ebf6] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1e2e4f] text-[#f19e1f] flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <span className="text-xs text-[#616a7e] font-bold uppercase tracking-wider block mb-1">Melbourne Office</span>
                <span className="text-xs font-semibold text-[#1e2e4f] block">
                  123 Industrial Blvd, Melbourne VIC
                </span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-6 rounded-3xl border border-[#e6ebf6] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1e2e4f] text-[#f19e1f] flex items-center justify-center text-xl shrink-0">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div>
                <span className="text-xs text-[#616a7e] font-bold uppercase tracking-wider block mb-1">Working Hours</span>
                <span className="text-xs font-semibold text-[#1e2e4f] block">
                  Mon - Fri: 7:00am - 6:00pm
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Main Form Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#f4f8ff] p-8 sm:p-12 rounded-3xl border border-[#e6ebf6] shadow-sm">
              <span className="text-sm font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
                Send a Message
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-[#1e2e4f] mb-6">
                Request a Free Quote & Inspection
              </h2>

              {submitted ? (
                <div className="text-center py-12 bg-white rounded-2xl p-8 border border-green-200">
                  <div className="w-16 h-16 bg-[#3bad20]/20 text-[#3bad20] rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-2xl font-bold font-['Oswald',sans-serif] uppercase text-[#1e2e4f] mb-2">Message Sent Successfully!</h3>
                  <p className="text-sm text-[#616a7e] max-w-md mx-auto">
                    Thank you for reaching out. An ASSIST senior estimator will call you shortly to confirm your inspection date.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-[#1e2e4f] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-white border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-white border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">Service Required</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                      >
                        <option>Emergency Roof Repair</option>
                        <option>Full Re-Roofing & Replacement</option>
                        <option>Roof Inspection & Diagnosis</option>
                        <option>Gutters & Chimney Flashing</option>
                        <option>Commercial Roofing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">Property Address / Suburb</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-white border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f]"
                        placeholder="e.g. 14 High St, Kew"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#616a7e] mb-1.5">Describe the Issue or Requirements</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#cfd8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f19e1f] resize-none"
                      placeholder="Tell us about leaks, tile damage, roof age, or any urgent timelines..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f19e1f] hover:bg-[#d88713] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit Free Request</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </form>
              )}
            </div>

            {/* Right Map / Visual Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#1e2e4f] text-white rounded-3xl p-8 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f19e1f] mb-2 block">
                  Rapid Response
                </span>
                <h3 className="text-2xl font-bold font-['Oswald',sans-serif] uppercase tracking-tight text-white mb-4">
                  Melbourne Emergency Service
                </h3>
                <p className="text-sm text-[#b7c1d5] mb-6 leading-relaxed font-light">
                  Active leak during heavy storms? Call our direct dispatch line for fast tarping and emergency repairs.
                </p>

                <a
                  href="tel:1800277478"
                  className="w-full bg-[#f19e1f] hover:bg-[#d88713] text-white py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow"
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>Call 1800 277 478</span>
                </a>
              </div>

              {/* Real Project Visual */}
              <div className="rounded-3xl overflow-hidden shadow-md border border-[#e6ebf6] relative h-64">
                <img 
                  src="/roofora-assets/images/portfolio-img1.jpg" 
                  alt="Melbourne Roofing Project" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2e4f]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs text-[#f19e1f] font-bold uppercase tracking-wider block">Service Guarantee</span>
                    <span className="text-sm font-semibold">10-Year Workmanship Warranty on All Replacements</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

