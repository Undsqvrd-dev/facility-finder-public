import React, { useEffect, useRef } from 'react';

const CompanyPopup = ({ company, onClose, mode = "public", user = null, inMapContainer = false }) => {
  const popupRef = useRef(null);

  // Scroll lock bij openen
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ESC sluit popup
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  });

  // Klik buiten popup sluit
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    onClose();
  };

  if (!company) return null;

  if (mode === "public") {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        <div ref={popupRef} className="detail-popup active">
          {/* Linker kolom met logo en omschrijving */}
          <div>
            <div className="company-logo">
              <img
                src={company.logo}
                alt={`${company.naam} logo`}
                style={{
                  width: '180px',
                  height: '60px',
                  objectFit: 'contain',
                  marginBottom: '1rem',
                }}
                onError={(e) => {
                  e.target.src = '/placeholder-logo.svg';
                }}
              />
            </div>
            <h2>{company.naam}</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#4B5563' }}>{company.omschrijving}</p>
          </div>

          {/* Rechter kolom met info box */}
          <div className="info-box">
            <div className="info-item">
              <span className="info-label">Type facilitaire organisatie</span>
              <span className="info-value">{company.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Locatie</span>
              <span className="info-value">{company.locatie}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Type branche</span>
              <span className="info-value">{company.branche || 'Alles'}</span>
            </div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="website-button"
              >
                Naar website
              </a>
            )}
          </div>

          {/* Sluit knop */}
          <button
            onClick={handleClose}
            className="close-button"
            aria-label="Sluiten"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Platform mode (ongewijzigd)
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg p-6 z-50 max-h-[80vh] overflow-y-auto">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={company.logo}
            alt={company.naam}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = '/placeholder-logo.svg';
            }}
          />
        </div>

        {/* Bedrijfsinformatie */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{company.naam}</h3>
          <div className="info-box">
            <div className="info-item">
              <span className="info-label">Type facilitaire organisatie</span>
              <span className="info-value">{company.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Locatie</span>
              <span className="info-value">{company.locatie}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Type branche</span>
              <span className="info-value">{company.branche || 'Alles'}</span>
            </div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="website-button"
              >
                Naar website
              </a>
            )}
            {/* Platform-specifieke content */}
            {mode === "platform" && user && (
              <>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Vacatures</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">Facilitair Manager</h5>
                          <p className="text-sm text-gray-600">Amsterdam</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Match: 92%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Meer informatie
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                    Neem contact op
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Sluit knop */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        aria-label="Sluiten"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CompanyPopup;