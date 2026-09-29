import React, { useState, useEffect } from 'react';
import { useWebsite } from '../WebsiteContext';
import { useCmsContent } from '../useCmsContent';
import { asset } from '../utils/asset';
import { ALL_SERVICES_OFFERED } from '../data';

const DEFAULT_INSPECTION_SERVICE = 'Free Roof & Drone Inspection (Full Property Assessment)';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, initialServiceForQuote } = useWebsite();
  const { services: cmsServices, settings } = useCmsContent();
  const allServices = cmsServices && cmsServices.length > 0 ? cmsServices : ALL_SERVICES_OFFERED;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: DEFAULT_INSPECTION_SERVICE,
    address: '',
    urgency: 'Standard (1-2 Business Days)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState('');

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!isQuoteModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isQuoteModalOpen]);

  // Sync service preselection
  useEffect(() => {
    if (isQuoteModalOpen) {
      if (initialServiceForQuote) {
        setForm((prev) => ({ ...prev, service: initialServiceForQuote }));
      } else {
        setForm((prev) => ({ ...prev, service: prev.service || DEFAULT_INSPECTION_SERVICE }));
      }
    }
  }, [initialServiceForQuote, isQuoteModalOpen]);

  if (!isQuoteModalOpen) return null;

  // Resolve business WhatsApp phone number
  const rawPhone = settings?.business?.internationalPhone || settings?.business?.phone || '0478250790';
  const cleanDigits = rawPhone.replace(/[^0-9]/g, '');
  const waNumber = cleanDigits.startsWith('61')
    ? cleanDigits
    : (cleanDigits.startsWith('0') ? `61${cleanDigits.slice(1)}` : `61${cleanDigits}`);
  const displayPhone = settings?.business?.phone || '0478 250 790';

  const buildWhatsAppMessage = () => {
    const lines = [
      `👋 *New Roof Inspection Booking Request*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Full Name:* ${form.name.trim()}`,
      `📞 *Phone:* ${form.phone.trim()}`,
      form.email.trim() ? `✉️ *Email:* ${form.email.trim()}` : null,
      `🏠 *Property Address / Suburb:* ${form.address.trim()}`,
      `🔨 *Service / Inspection:* ${form.service}`,
      `⏰ *Preferred Timing:* ${form.urgency}`,
      form.message.trim() ? `📝 *Notes / Roof Issues:* ${form.message.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 _Booked via assistroofing.com.au_`
    ].filter(Boolean);

    return lines.join('\n');
  };

  const getWhatsAppUrl = () => {
    const message = buildWhatsAppMessage();
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = getWhatsAppUrl();
    setLastWaUrl(waUrl);
    setSubmitted(true);

    // Launch WhatsApp
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Could not auto-open WhatsApp link:', err);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    closeQuoteModal();
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 99999,
        backgroundColor: 'rgba(15, 23, 42, 0.78)',
        backdropFilter: 'blur(8px)',
        padding: '16px',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspection-modal-title"
    >
      <div 
        className="bg-white br-30 position-relative shadow-2xl overflow-hidden w-100 animated zoomIn fast"
        style={{
          maxWidth: '640px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-blue p-4 p-md-4 text-white position-relative shrink-0">
          <button
            onClick={handleClose}
            className="position-absolute border-0 bg-transparent text-white p-2 d-flex align-items-center justify-content-center"
            style={{
              top: '16px',
              right: '18px',
              fontSize: '22px',
              cursor: 'pointer',
              lineHeight: 1,
              opacity: 0.85
            }}
            aria-label="Close"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <span className="special-text text-accent d-block mb-1 text-size-12 font-weight-700 uppercase tracking-wider">
            <i className="fa-solid fa-clipboard-check me-1"></i> Instant Online Booking • Melbourne Wide
          </span>
          <h3 id="inspection-modal-title" className="text-white text-size-24 text-md-size-26 font-weight-700 mb-1">
            Book Roof Inspection
          </h3>
          <p className="text-white text-size-13 mb-0 opacity-80">
            Fill out your details below to send directly to our team via <strong>WhatsApp</strong> for instant response.
          </p>
          <div className="mt-2 text-size-12 text-warning font-weight-600 d-inline-flex align-items-center gap-1 bg-white/10 px-2.5 py-1 rounded-pill">
            <i className="fa-solid fa-tag"></i> Special Campaign: 10% Off for Elderly & Pensioner Citizens
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 p-md-5 overflow-auto flex-grow-1">
          {submitted ? (
            <div className="text-center py-4">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow"
                style={{ width: '74px', height: '74px', backgroundColor: '#eaf8e6', color: '#25D366', fontSize: '38px' }}
              >
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <h3 className="text-size-24 font-weight-700 text-[#1e2e4f] mb-2">
                Inspection Request Ready!
              </h3>
              <p className="text-size-14 text-[#616a7e] mb-4">
                Thank you, <strong>{form.name}</strong>! Your inspection booking has been redirected to our WhatsApp desk (<strong>{displayPhone}</strong>).
              </p>

              {/* Summary Box */}
              <div className="bg-[#f4f8ff] p-3 rounded-2xl mb-4 text-start border border-[#e6ebf6] text-size-13 text-[#1e2e4f]">
                <div className="font-weight-700 mb-1.5 text-size-11 text-[#f19e1f] text-uppercase tracking-wider">
                  Request Summary:
                </div>
                <div className="mb-1"><strong>Service:</strong> {form.service}</div>
                <div className="mb-1"><strong>Property:</strong> {form.address}</div>
                <div className="mb-1"><strong>Preferred Timing:</strong> {form.urgency}</div>
                <div><strong>Contact Phone:</strong> {form.phone}</div>
              </div>

              {/* Direct Open WhatsApp Button */}
              <a
                href={lastWaUrl || getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-100 py-3 rounded-pill font-weight-700 text-white mb-2 d-flex align-items-center justify-content-center text-decoration-none shadow"
                style={{ backgroundColor: '#25D366', fontSize: '15px' }}
              >
                <i className="fa-brands fa-whatsapp me-2" style={{ fontSize: '22px' }}></i>
                Open WhatsApp to Send Details
              </a>

              <p className="text-size-12 text-[#8c97ac] mb-4">
                If WhatsApp didn't open in a new tab, click the button above to complete sending.
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="secondary_btn border-0 text-decoration-none py-2 px-4 cursor-pointer"
              >
                Done <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-control br-20 py-2 px-3 text-size-14"
                    style={{ height: '48px', border: '1px solid #cfd8e8' }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0400 000 000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="form-control br-20 py-2 px-3 text-size-14"
                    style={{ height: '48px', border: '1px solid #cfd8e8' }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="david@example.com (optional)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-control br-20 py-2 px-3 text-size-14"
                    style={{ height: '48px', border: '1px solid #cfd8e8' }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                    Preferred Timing / Urgency
                  </label>
                  <select
                    value={form.urgency}
                    onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                    className="form-control br-20 py-2 px-3 text-size-14"
                    style={{ height: '48px', border: '1px solid #cfd8e8' }}
                  >
                    <option value="Urgent (Active Leak / Storm Damage - Next 24h)">Urgent (Active Leak - Within 24 Hours)</option>
                    <option value="Standard (1-2 Business Days)">Standard (Within 1-2 Business Days)</option>
                    <option value="Flexible (This Coming Week)">Flexible (This Coming Week)</option>
                    <option value="Weekend Inspection Slot">Weekend Inspection Slot</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                  Service / Inspection Type *
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="form-control br-20 py-2 px-3 text-size-14"
                  style={{ height: '48px', border: '1px solid #cfd8e8' }}
                >
                  <optgroup label="⭐ Inspection & Leak Detection">
                    <option value="Free Roof & Drone Inspection (Full Property Assessment)">Free Roof & Drone Inspection (Full Property Assessment)</option>
                    <option value="Roof Leak Detection & Diagnostic Survey">Roof Leak Detection & Diagnostic Survey</option>
                    <option value="Storm & Wind Damage Assessment">Storm & Wind Damage Assessment</option>
                  </optgroup>
                  <optgroup label="Repairs & Leak Remediation">
                    {allServices.filter(s => s.category === 'repairs').map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Installation & Replacement">
                    {allServices.filter(s => s.category === 'replacement').map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Restoration, Flashing & Capping">
                    {allServices.filter(s => s.category === 'restoration').map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Gutters, Drainage & Additions">
                    {allServices.filter(s => s.category === 'gutters').map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </optgroup>
                  <option value="Other / Bespoke Roofing Request">Other / Bespoke Roofing Request</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                  Property Suburb / Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14 High St, Kew VIC 3101"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="form-control br-20 py-2 px-3 text-size-14"
                  style={{ height: '48px', border: '1px solid #cfd8e8' }}
                />
              </div>

              <div className="mb-4">
                <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                  Notes / Problem Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your roof material (Tile/Colorbond), age, ceiling water marks, or access notes..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-control br-20 py-2 px-3 text-size-14"
                  style={{ border: '1px solid #cfd8e8', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="btn w-100 py-3 rounded-pill text-white font-weight-700 text-size-16 border-0 shadow-md d-flex align-items-center justify-content-center cursor-pointer transition-all"
                style={{
                  backgroundColor: '#25D366',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#20ba5a')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
              >
                <i className="fa-brands fa-whatsapp me-2" style={{ fontSize: '22px' }}></i>
                Send Inspection Request to WhatsApp
                <span className="ms-2">
                  <img
                    src={asset('/roofora-assets/images/arrow.png')}
                    alt="arrow"
                    className="img-fluid d-inline-block"
                    style={{ filter: 'brightness(0) invert(1)', width: '12px' }}
                  />
                </span>
              </button>

              <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mt-3 text-size-12 text-[#616a7e]">
                <span><i className="fa-solid fa-award text-[#f19e1f] me-1"></i> 10-Yr Warranty</span>
                <span>•</span>
                <span><i className="fa-solid fa-certificate text-primary me-1"></i> VBA Registered</span>
                <span>•</span>
                <span><i className="fa-solid fa-shield-halved text-success me-1"></i> $10M Insured</span>
                <span>•</span>
                <span><i className="fa-solid fa-bolt text-warning me-1"></i> Fast WhatsApp Dispatch</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
