import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useWebsite } from '../WebsiteContext';
import { useCmsContent } from '../useCmsContent';
import { asset } from '../utils/asset';
import { ALL_SERVICES_OFFERED } from '../data';
import { trackLeadConversion, trackCallConversion } from '../utils/tracking';
import { submitEnquiry } from '../utils/submitEnquiry';

const DEFAULT_INSPECTION_SERVICE = 'Free Roof & Drone Inspection (Full Property Assessment)';

interface AcceptedEnquiry {
  id: string;
  name: string;
  phone: string;
  service: string;
  preferredTime: string;
  createdAt: string;
}

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, initialServiceForQuote, modalMode, displayPhone, telHref } = useWebsite();
  const { services: cmsServices, settings } = useCmsContent();
  const allServices = cmsServices && cmsServices.length > 0 ? cmsServices : ALL_SERVICES_OFFERED;

  const [activeTab, setActiveTab] = useState<'callback' | 'quote'>(modalMode || 'quote');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Roof Repairs',
    suburb: '',
    address: '',
    urgency: 'Standard Enquiry Hours',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [acceptedData, setAcceptedData] = useState<AcceptedEnquiry | null>(null);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setErrorMsg(null);
    setAcceptedData(null);
    closeQuoteModal();
  }, [closeQuoteModal]);

  // Sync tab with modalMode when opened
  useEffect(() => {
    if (isQuoteModalOpen) {
      setActiveTab(modalMode || 'quote');
      setErrorMsg(null);
      setSubmitted(false);
      setAcceptedData(null);
    }
  }, [isQuoteModalOpen, modalMode]);

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
  }, [isQuoteModalOpen, handleClose]);

  // Sync service preselection
  useEffect(() => {
    if (isQuoteModalOpen) {
      if (initialServiceForQuote) {
        setForm((prev) => ({ ...prev, service: initialServiceForQuote }));
      } else {
        setForm((prev) => ({ ...prev, service: modalMode === 'callback' ? 'Roof Repairs' : DEFAULT_INSPECTION_SERVICE }));
      }
    }
  }, [initialServiceForQuote, isQuoteModalOpen, modalMode]);

  if (!isQuoteModalOpen) return null;

  // Resolve business WhatsApp and phone numbers
  const directPhone = settings?.business?.phone || '0478250790';
  const displayDirectPhone = directPhone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  const rawPhone = settings?.business?.whatsapp || '0478936120';
  const cleanDigits = rawPhone.replace(/[^0-9]/g, '');
  const waNumber = cleanDigits.startsWith('61')
    ? cleanDigits
    : (cleanDigits.startsWith('0') ? `61${cleanDigits.slice(1)}` : `61${cleanDigits}`);
  const displayWaPhone = (settings?.business?.whatsapp || '0478936120').replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');

  const buildWhatsAppMessage = () => {
    const lines = [
      `👋 *${activeTab === 'callback' ? 'Fast Callback Request' : 'Roof Inspection Booking'}*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      acceptedData?.id ? `🔖 *Reference:* #${acceptedData.id}` : null,
      `👤 *Full Name:* ${form.name.trim()}`,
      `📞 *Phone:* ${form.phone.trim()}`,
      form.email.trim() ? `✉️ *Email:* ${form.email.trim()}` : null,
      form.address.trim() ? `🏠 *Address / Suburb:* ${form.address.trim()}` : null,
      `🔨 *Service:* ${form.service}`,
      `⏰ *Preferred Timing:* ${form.urgency}`,
      form.message.trim() ? `📝 *Notes:* ${form.message.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 _Delivered via assistroofing.com.au_`
    ].filter(Boolean);

    return lines.join('\n');
  };

  const getWhatsAppUrl = () => {
    const message = buildWhatsAppMessage();
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPhoneDigits = form.phone.replace(/[^0-9]/g, '');
    if (cleanPhoneDigits.length < 8 || cleanPhoneDigits.length > 15) {
      setErrorMsg('Please enter a valid Australian mobile or landline number (e.g. 0478 250 790).');
      return;
    }

    if (activeTab === 'callback' && !form.suburb.trim()) {
      setErrorMsg('Please enter your suburb so we can confirm coverage.');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await submitEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: activeTab === 'callback' ? form.suburb.trim() : form.address.trim(),
        service: form.service || 'Roof Repairs',
        preferredTime: activeTab === 'callback' ? 'Callback Requested' : form.urgency,
        urgency: form.urgency,
        message: form.message.trim(),
        type: activeTab,
      });

      // Acceptance validation: STRICT CHECK - Only proceed if server explicitly accepted
      if (!data.accepted) {
        setErrorMsg(data.error || `Unable to store your callback request. Please call Peter directly on ${displayPhone}.`);
        setIsSubmitting(false);
        return; // HALT: No success event fired!
      }

      // SUCCESS EVENT ONLY AFTER ACCEPTANCE:
      setAcceptedData({
        id: data.id || 'ENQ-STORED',
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service || 'Roof Repairs',
        preferredTime: activeTab === 'callback' ? 'Earliest Available' : form.urgency,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
      setIsSubmitting(false);

      // 1. Dispatch custom browser DOM event for analytics/tracking (no PII in payload)
      try {
        window.dispatchEvent(
          new CustomEvent('assist:enquiry_accepted', {
            detail: {
              id: data.id,
              type: activeTab,
              service: form.service || 'Roof Repairs',
              timestamp: new Date().toISOString(),
            }
          })
        );
      } catch (evtErr) {
        console.warn('[Event Dispatch Warning]:', evtErr);
      }

      // 2. Google Ads & GA4 lead conversion tracking (fires once after backend confirms success)
      trackLeadConversion(data.id || 'ENQ-STORED', activeTab, form.service || 'Roof Repairs');

      // 3. Visual celebration confetti
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f19e1f', '#1e2e4f', '#25D366', '#ffffff']
        });
      } catch (confettiErr) {
        console.warn('[Confetti Warning]:', confettiErr);
      }

    } catch (err: any) {
      console.error('[Callback Submission Error]:', err);
      setErrorMsg(`Connection error while delivering your request. Please call Peter directly on ${displayPhone}.`);
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 99999,
        backgroundColor: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(8px)',
        padding: '16px',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div 
        className="bg-white br-30 position-relative shadow-2xl overflow-hidden w-100 animated zoomIn fast"
        style={{
          maxWidth: '640px',
          maxHeight: '94vh',
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
            <i className="fa-solid fa-location-dot me-1"></i> Melbourne Service Areas • Assist Roofing
          </span>

          <h3 id="enquiry-modal-title" className="text-white text-size-22 text-md-size-26 font-weight-700 mb-1">
            {activeTab === 'callback' ? 'Request a Roof Repair Callback' : 'Book Roof Inspection & Quote'}
          </h3>

          <p className="text-white text-size-13 mb-0 opacity-85">
            {activeTab === 'callback'
              ? 'Leave your details and tell us where you need help. Our team will contact you to discuss your roofing issue.'
              : 'Complete your property details for a comprehensive on-site roof condition inspection.'}
          </p>

          {/* Tab Selector */}
          {!submitted && (
            <div className="d-flex gap-2 mt-3 p-1 rounded-pill bg-white/10 w-fit-content">
              <button
                type="button"
                onClick={() => { setActiveTab('callback'); setErrorMsg(null); }}
                className={`btn btn-sm rounded-pill px-3 py-1 font-weight-700 border-0 text-size-12 transition-all ${
                  activeTab === 'callback'
                    ? 'bg-warning text-[#1e2e4f] shadow-sm'
                    : 'text-white bg-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <i className="fa-solid fa-phone-volume me-1.5"></i>
                Request a Callback
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('quote'); setErrorMsg(null); }}
                className={`btn btn-sm rounded-pill px-3 py-1 font-weight-700 border-0 text-size-12 transition-all ${
                  activeTab === 'quote'
                    ? 'bg-warning text-[#1e2e4f] shadow-sm'
                    : 'text-white bg-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <i className="fa-solid fa-clipboard-list me-1.5"></i>
                Detailed Quote
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 p-md-5 overflow-auto flex-grow-1">
          {submitted && acceptedData ? (
            /* ── SUCCESS EVENT CONFIRMATION SCREEN ── */
            <div className="text-center py-2">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow"
                style={{ width: '74px', height: '74px', backgroundColor: '#eaf8e6', color: '#16a34a', fontSize: '36px' }}
              >
                <i className="fa-solid fa-check"></i>
              </div>

              <div className="badge bg-success-subtle text-success px-3 py-1 rounded-pill font-weight-700 text-size-12 mb-2">
                ✓ Callback Request Sent
              </div>

              <h3 className="text-size-22 font-weight-700 text-[#1e2e4f] mb-2">
                {activeTab === 'callback' ? 'Thanks. Your callback request has been sent to Assist Roofing.' : 'Inspection Request Accepted!'}
              </h3>

              <div className="d-inline-block bg-slate-100 px-3 py-1 rounded-lg text-size-12 font-monospace font-weight-700 text-slate-700 mb-3 border border-slate-200">
                Reference ID: {acceptedData.id}
              </div>

              <p className="text-size-14 text-[#4a5568] mb-4">
                {activeTab === 'callback' ? (
                  <>For an active leak, you can also call <strong>{displayPhone}</strong> to check availability.</>
                ) : (
                  <>Thank you, <strong>{acceptedData.name}</strong>. Peter Bayamis has received your inspection request.</>
                )}
              </p>

              {/* Summary Card */}
              <div className="bg-[#f4f8ff] p-3 rounded-2xl mb-4 text-start border border-[#e6ebf6] text-size-13 text-[#1e2e4f]">
                <div className="font-weight-700 mb-1.5 text-size-11 text-[#f19e1f] text-uppercase tracking-wider">
                  Confirmed Details:
                </div>
                <div className="mb-1"><strong>Service:</strong> {acceptedData.service}</div>
                <div className="mb-1"><strong>Phone Number:</strong> {acceptedData.phone}</div>
                {(form.suburb || form.address) && <div><strong>Location:</strong> {form.suburb || form.address}</div>}
              </div>

              {/* Direct Instant Call Option */}
              <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
                <a
                  href={telHref}
                  onClick={() => trackCallConversion()}
                  className="btn flex-grow-1 py-2.5 rounded-pill font-weight-700 text-white d-flex align-items-center justify-content-center text-decoration-none shadow-sm"
                  style={{ backgroundColor: '#1e2e4f', fontSize: '14px' }}
                >
                  <i className="fa-solid fa-phone me-2 text-warning"></i>
                  Call About an Active Leak: {displayPhone}
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn flex-grow-1 py-2.5 rounded-pill font-weight-700 text-white d-flex align-items-center justify-content-center text-decoration-none shadow-sm"
                  style={{ backgroundColor: '#25D366', fontSize: '14px' }}
                >
                  <i className="fa-brands fa-whatsapp me-2" style={{ fontSize: '18px' }}></i>
                  WhatsApp Desk ({displayWaPhone})
                </a>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="secondary_btn border-0 text-decoration-none py-2 px-4 cursor-pointer mt-2"
              >
                Done <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
              </button>
            </div>
          ) : (
            /* ── ENQUIRY / CALLBACK FORM ── */
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="alert alert-danger br-15 py-2 px-3 mb-3 text-size-13 d-flex align-items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation text-danger shrink-0"></i>
                  <div>{errorMsg}</div>
                </div>
              )}

              {/* Short Callback Form Flow */}
              {activeTab === 'callback' ? (
                <>
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
                        placeholder="e.g. 0478 250 790"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="form-control br-20 py-2 px-3 text-size-14"
                        style={{ height: '48px', border: '1px solid #cfd8e8' }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                      Suburb *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dandenong, Clayton, Berwick, Glen Waverley"
                      value={form.suburb}
                      onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                      className="form-control br-20 py-2 px-3 text-size-14"
                      style={{ height: '48px', border: '1px solid #cfd8e8' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                      What is happening with your roof? (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what is happening (e.g. water entering ceiling, broken tiles, flashing damage, valley leak)..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="form-control br-20 py-2 px-3 text-size-14"
                      style={{ border: '1px solid #cfd8e8', resize: 'none' }}
                    />
                  </div>

                  <div className="text-size-11 text-[#64748b] mb-3">
                    Your details are kept confidential and used solely to respond to your roofing repair enquiry.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-100 py-3 rounded-pill text-white font-weight-700 text-size-16 border-0 shadow-md d-flex align-items-center justify-content-center cursor-pointer transition-all"
                    style={{
                      backgroundColor: '#f19e1f',
                      color: '#1e2e4f',
                      boxShadow: '0 4px 14px rgba(241, 158, 31, 0.35)',
                      opacity: isSubmitting ? 0.75 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin me-2" style={{ color: '#1e2e4f' }}></i>
                        <span style={{ color: '#1e2e4f' }}>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-phone-volume me-2" style={{ color: '#1e2e4f' }}></i>
                        <span style={{ color: '#1e2e4f' }}>Request My Callback</span>
                        <span className="ms-2">
                          <img
                            src={asset('/roofora-assets/images/arrow.png')}
                            alt="arrow"
                            className="img-fluid d-inline-block"
                            style={{ width: '12px' }}
                          />
                        </span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                /* Detailed Quote Form Flow */
                <>
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
                        Phone Number (Australian) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0478 250 790"
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
                        Service Required *
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="form-control br-20 py-2 px-3 text-size-14"
                        style={{ height: '48px', border: '1px solid #cfd8e8' }}
                      >
                        <option value="Roof Repairs">Roof Repairs & Leak Fix</option>
                        <option value="Roof Restoration">Roof Restoration</option>
                        <option value="Roof Replacement">Roof Replacement & Re-Roofing</option>
                        <option value="Colorbond Metal Roofing">Colorbond Metal Roofing</option>
                        <option value="Gutter Replacement">Gutter Replacement</option>
                        <option value="Roof Leak Detection">Roof Leak Detection</option>
                        <option value="Other / General Roofing">Other / General Roofing</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                        Preferred Inspection Window
                      </label>
                      <select
                        value={form.urgency}
                        onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                        className="form-control br-20 py-2 px-3 text-size-14"
                        style={{ height: '48px', border: '1px solid #cfd8e8' }}
                      >
                        <option value="Morning (9:00am - 12:00pm)">Morning (9:00am - 12:00pm)</option>
                        <option value="Afternoon (12:00pm - 5:00pm)">Afternoon (12:00pm - 5:00pm)</option>
                        <option value="Urgent Active Leak (Today)">Urgent Active Leak (Today)</option>
                        <option value="Weekend Appointment">Weekend Appointment</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="david@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="form-control br-20 py-2 px-3 text-size-14"
                        style={{ height: '48px', border: '1px solid #cfd8e8' }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-size-12 font-weight-700 text-uppercase text-[#616a7e] mb-1 d-block">
                      Property Suburb or Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14 High St, Kew or Balwyn VIC 3103"
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
                      placeholder="Tell us about the roof material (Tile/Colorbond), age, leak location, or access notes..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="form-control br-20 py-2 px-3 text-size-14"
                      style={{ border: '1px solid #cfd8e8', resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-100 py-3 rounded-pill text-white font-weight-700 text-size-16 border-0 shadow-md d-flex align-items-center justify-content-center cursor-pointer transition-all"
                    style={{
                      backgroundColor: '#f19e1f',
                      color: '#1e2e4f',
                      boxShadow: '0 4px 14px rgba(241, 158, 31, 0.35)',
                      opacity: isSubmitting ? 0.75 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin me-2" style={{ color: '#1e2e4f' }}></i>
                        <span style={{ color: '#1e2e4f' }}>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-clipboard-check me-2" style={{ color: '#1e2e4f' }}></i>
                        <span style={{ color: '#1e2e4f' }}>Submit Inspection Request</span>
                        <span className="ms-2">
                          <img
                            src={asset('/roofora-assets/images/arrow.png')}
                            alt="arrow"
                            className="img-fluid d-inline-block"
                            style={{ width: '12px' }}
                          />
                        </span>
                      </>
                    )}
                  </button>
                </>
              )}

              <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mt-3 text-size-12 text-[#616a7e]">
                <span><i className="fa-solid fa-certificate text-primary me-1"></i> VBA Registered</span>
                <span>•</span>
                <span><i className="fa-solid fa-shield-halved text-success me-1"></i> $10M Insured</span>
                <span>•</span>
                <span><i className="fa-solid fa-map-pin text-[#f19e1f] me-1"></i> Melbourne Service Areas</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
