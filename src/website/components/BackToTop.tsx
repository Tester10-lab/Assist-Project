import React, { useState, useEffect } from 'react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      id="button"
      className="position-fixed shadow-lg d-flex align-items-center justify-content-center border-0 wow animated fadeIn"
      style={{
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#f19e1f',
        color: '#ffffff',
        fontSize: '18px',
        zIndex: 9999,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      aria-label="Back to top"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

