import React, { useState } from 'react';
import { useWebsite } from '../WebsiteContext';
import { asset } from '../utils/asset';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal } = useWebsite();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Emergency Roof Repair',
    address: '',
    urgency: 'Standard (1-2 Days)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <div 
        className="bg-white br-30 position-relative shadow-2xl overflow-hidden w-100 animate__animated animate__zoomIn animate__faster"
        style={{
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-blue p-4 text-white position-relative">
          <button 
            onClick={handleClose}
            className="position-absolute border-0 bg-transparent text-white"
            style={{ top: '20px', right: '20px', fontSize: '20px', cursor: 'pointer' }}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <span className="special-text text-accent d-block mb-1 text-size-12">Instant Online Booking</span>
          <h3 className="text-white text-size-26 font-weight-700 mb-1">
            Book Free Drone Inspection
          </h3>
          <p className="text-white text-size-14 mb-0 opacity-75">
            Same-day confirmation. Direct master roofer contact.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-4 p-md-5">
          {submitted ? (
            <div className="text-center py-4">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: '70px', height: '70px', backgroundColor: '#eaf8e6', color: '#3bad20', fontSize: '32px' }}
              >
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="text-size-26 font-weight-700 text-blue mb-2">
                Booking Request Received!
              </h3>
              <p className="text-size-14 text-muted mb-4">
                Thank you, <strong>{form.name}</strong>. A senior ASSIST estimator will call you at <strong>{form.phone}</strong> within 2 hours to confirm your drone survey slot.
              </p>
              <button
                onClick={handleClose}
                className="secondary_btn border-0 text-decoration-none"
              >
                Done <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-size-12 font-weight-700 text-uppercase text-muted mb-1 d-block">
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
                  <label className="text-size-12 font-weight-700 text-uppercase text-muted mb-1 d-block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0400 000 000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="form-control br-20 py-2 px-3 text-size-14"
                    style={{ height: '48px', border: '1px solid #cfd8e8' }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-size-12 font-weight-700 text-uppercase text-muted mb-1 d-block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-control br-20 py-2 px-3 text-size-14"
                    style={{ height: '48px', border: '1px solid #cfd8e8' }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="text-size-12 font-weight-700 text-uppercase text-muted mb-1 d-block">
                    Service Required
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="form-control br-20 py-2 px-3 text-size-14"
                    style={{ height: '48px', border: '1px solid #cfd8e8' }}
                  >
                    <option>Emergency Roof Repair</option>
                    <option>Full Re-Roofing & Colorbond</option>
                    <option>Roof Leak & Tile Inspection</option>
                    <option>Chimney Flashing & Valleys</option>
                    <option>Commercial Roofing</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="text-size-12 font-weight-700 text-uppercase text-muted mb-1 d-block">
                  Property Suburb / Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14 High St, Kew VIC"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="form-control br-20 py-2 px-3 text-size-14"
                  style={{ height: '48px', border: '1px solid #cfd8e8' }}
                />
              </div>

              <div className="mb-4">
                <label className="text-size-12 font-weight-700 text-uppercase text-muted mb-1 d-block">
                  Notes / Urgent Leak Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your roof issue, ceiling water marks, roof age, etc."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-control br-20 py-2 px-3 text-size-14"
                  style={{ border: '1px solid #cfd8e8', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="secondary_btn w-100 border-0 text-decoration-none font-weight-700"
              >
                Submit Inspection Booking <span><img src={asset('/roofora-assets/images/arrow.png')} alt="arrow" className="img-fluid d-inline-block" /></span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
