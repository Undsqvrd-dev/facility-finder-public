import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Mobiel detectie (max-width: 768px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Klik buiten popup sluit (alleen op mobiel)
  useEffect(() => {
    if (!isMobile) return;
    function handleClickOutside(event) {
      // Debug: log wat er wordt geklikt
      // console.log('🔍 Click detected on:', event.target);
      // console.log('🔍 Target classes:', event.target.className);
      // console.log('🔍 Target tag:', event.target.tagName);
      const target = event.target;
      const isMapClick = target.closest('.leaflet-container') || target.closest('.leaflet-map-pane');
      const isSidebarClick = target.closest('.sidebar') || target.closest('.mobile-menu-button');
      const isHeaderClick = target.closest('header');
      if (isMapClick || isSidebarClick || isHeaderClick) {
        return; // Sluit de popup niet bij deze clicks
      }
      if (popupRef.current && !popupRef.current.contains(target)) {
        handleClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    onClose();
  };

  if (!company) return null;

  if (mode === "public" && isMobile) {
    return <MobileCompanyPopup company={company} onClose={onClose} />;
  }

  if (mode === "public") {
    // Desktop: GEEN overlay, alleen de popup zelf
    return (
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

// Mobiele pop-up component
const MobileCompanyPopup = ({ company, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    function handleClickOutside(event) {
      // Voorkom sluiten bij klikken op kaart, sidebar, of andere belangrijke elementen
      const target = event.target;
      const isMapClick = target.closest('.leaflet-container') || target.closest('.leaflet-map-pane');
      const isSidebarClick = target.closest('.sidebar') || target.closest('.mobile-menu-button');
      const isHeaderClick = target.closest('header');
      
      if (isMapClick || isSidebarClick || isHeaderClick) {
        return; // Sluit de popup niet bij deze clicks
      }
      
      if (popupRef.current && !popupRef.current.contains(target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="mobile-popup"
        initial={{ y: '100%' }}
        animate={{ y: expanded ? 0 : '60%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.y > 120 && !expanded) onClose();
          else if (info.offset.y < -40) setExpanded(true);
          else if (info.offset.y > 40 && expanded) setExpanded(false);
        }}
        className="fixed bottom-0 left-0 w-full z-50 bg-white rounded-t-2xl shadow-2xl p-0 flex flex-col touch-pan-y md:hidden"
        style={{
          height: expanded ? '80vh' : '30vh',
          maxHeight: '90vh',
          boxSizing: 'border-box',
        }}
        ref={popupRef}
      >
        {/* Sleepbar/drag handle */}
        <div
          className="mx-auto mt-2 mb-3 w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer"
          onClick={() => setExpanded((v) => !v)}
        />
        {/* Sluitknop */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Sluiten"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Inhoud */}
        <div className="flex flex-col items-start gap-2 px-4 pb-4 overflow-y-auto w-full" style={{ maxHeight: '100%' }}>
          <img
            src={company.logo}
            alt={`${company.naam} logo`}
            className="w-32 h-12 object-contain mb-2 mt-1"
            style={{ maxWidth: '140px', maxHeight: '48px' }}
            onError={e => { e.target.src = '/placeholder-logo.svg'; }}
          />
          <h2 className="text-lg font-bold mb-1">{company.naam}</h2>
          <p className="text-gray-600 text-sm mb-2">
            {expanded ? company.omschrijving : (company.omschrijving?.slice(0, 120) + (company.omschrijving?.length > 120 ? '...' : ''))}
          </p>
          {expanded && (
            <>
              {/* Verbeterde info-box */}
              <div className="w-full bg-gray-100 rounded-xl p-4 mb-3">
                <div className="mb-2">
                  <div className="text-xs text-gray-400">Type facilitaire organisatie</div>
                  <div className="text-sm font-semibold">{company.type}</div>
                </div>
                <div className="mb-2">
                  <div className="text-xs text-gray-400">Locatie</div>
                  <div className="text-sm font-semibold">{company.locatie}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Type branche</div>
                  <div className="text-sm font-semibold">{company.branche || 'Alles'}</div>
                </div>
              </div>
              {/* Opvallende knop */}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 text-white font-semibold rounded-lg py-2 transition-colors hover:bg-blue-700 mb-2"
                >
                  Naar website
                </a>
              )}
              {/* Eventueel vacatures */}
              {company.vacatures && company.vacatures.length > 0 && (
                <div className="mt-2">
                  <div className="font-semibold mb-1">Vacatures</div>
                  <ul className="list-disc ml-4 text-sm">
                    {company.vacatures.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompanyPopup;