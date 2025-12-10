import { useEffect } from "react";

const CompanyPopup = ({ company, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!company) return null;

  return (
    <div className="facility-popup" style={{
      position: 'fixed',
      top: '80px',
      left: '20px',
      width: '360px',
      maxHeight: 'calc(100vh - 120px)',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
      zIndex: 2600,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header met terugknop - zelfde stijl als menu header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #f0f0f0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '60px'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            border: 'none',
            background: '#f8f8f8',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            transition: 'all 0.2s ease'
          }}
          aria-label="Terug"
          onMouseOver={(e) => e.target.style.background = '#e8e8e8'}
          onMouseOut={(e) => e.target.style.background = '#f8f8f8'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{
          textAlign: 'center',
          flex: 1,
          fontSize: '18px',
          fontWeight: '700',
          color: '#1a1a1a'
        }}>
          {company.naam}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ 
        flex: 1,
        overflowY: 'auto',
        padding: '20px 28px 28px'
      }}>
        {/* Logo */}
        {company.logo && (
          <div style={{
            width: '100%',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            background: '#f8f8f8',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <img
              src={company.logo}
              alt={`${company.naam} logo`}
              onError={(e) => {
                e.target.src = '/placeholder-logo.svg';
              }}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        )}

        {/* Description */}
        {company.omschrijving && (
          <p style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#555',
            margin: '0 0 28px 0'
          }}>
            {company.omschrijving}
          </p>
        )}

        {/* Info Sections */}
        <div style={{
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Locatie
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#1a1a1a',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            {company.locatie || 'Niet opgegeven'}
          </p>
        </div>

        <div style={{
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Vorm van dienstverlening
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#1a1a1a',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            {company.type || 'Niet opgegeven'}
          </p>
        </div>

        <div style={{
          marginBottom: '28px'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Service Categorieën
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#1a1a1a',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            {company.branche || 'Alles'}
          </p>
        </div>

        {/* Website Button */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              background: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#3367d6';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#4285f4';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Naar website
          </a>
        )}
      </div>
    </div>
  );
};

export default CompanyPopup;
