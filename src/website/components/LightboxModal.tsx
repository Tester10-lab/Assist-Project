import React from 'react';
import { useWebsite } from '../WebsiteContext';

export const LightboxModal: React.FC = () => {
  const { lightboxData, closeLightbox } = useWebsite();

  if (!lightboxData) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 99999,
        backgroundColor: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(8px)',
        padding: '24px',
      }}
      onClick={closeLightbox}
    >
      <div 
        className="position-relative bg-white br-30 overflow-hidden shadow-2xl animated zoomIn fast"
        style={{ maxWidth: '850px', width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeLightbox}
          className="position-absolute border-0 rounded-circle text-white d-flex align-items-center justify-content-center shadow"
          style={{
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Close image popup"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ maxHeight: '65vh', overflow: 'hidden' }}>
          <img 
            src={lightboxData.src} 
            alt={lightboxData.title} 
            className="w-100 h-100 object-cover"
            style={{ maxHeight: '65vh' }}
          />
        </div>

        <div className="p-4 bg-white d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <h4 className="text-blue text-size-22 font-weight-700 mb-1">
              {lightboxData.title}
            </h4>
            {lightboxData.subtitle && (
              <p className="text-muted text-size-14 mb-0">
                {lightboxData.subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={closeLightbox} 
            className="secondary_btn border-0 py-2 px-4"
            style={{ minWidth: 'auto', height: '46px', lineHeight: '46px' }}
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

