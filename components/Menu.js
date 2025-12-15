import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const menuItems = [
  {
    id: "organisaties",
    label: "Organisaties ontdekken",
    icon: "🏢",
    href: "/",
    enabled: true
  },
  {
    id: "marketplace",
    label: "Facility Marketplace",
    icon: "🤝",
    href: "/fm-marketplace",
    enabled: true
  },
  {
    id: "services",
    label: "Services ontdekken",
    icon: "🔍",
    enabled: true,
    hasSubmenu: true
  },
  {
    id: "carriere",
    label: "Carrière",
    icon: "💼",
    enabled: true,
    hasSubmenu: true
  },
  {
    id: "over",
    label: "Over de Facility Finder",
    icon: "ℹ️",
    href: "/over",
    enabled: true
  }
];

export default function Menu({ isOpen = true, onToggle, vacatureCount = 0, onShowOrganisaties, onShowServices }) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('main'); // 'main', 'carriere', 'jobcoaching', 'drijfveren', 'services'

  const isActive = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  const handleOrganisatiesClick = (e) => {
    e.preventDefault();
    if (onShowOrganisaties) {
      onShowOrganisaties();
    }
  };

  const handleCarriereClick = (e) => {
    e.preventDefault();
    setCurrentView('carriere');
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (onShowServices) {
      onShowServices();
    }
  };

  const handleBack = () => {
    setCurrentView('main');
  };

  // Render hoofdmenu
  const renderMainMenu = () => (
    <>
      <div className="facility-menu-header" style={{ padding: '16px 20px' }}>
        {/* Verwijderd: Facility Finder titel en subtitle */}
      </div>

      <nav className="facility-menu-nav">
        {menuItems.map((item) => {
          const active = item.href && isActive(item.href);
          
          // Special handling voor Organisaties
          if (item.id === "organisaties") {
            return (
              <button
                key={item.id}
                className={`facility-menu-item ${active ? 'facility-menu-item-active' : ''}`}
                onClick={handleOrganisatiesClick}
              >
                <span className="facility-menu-icon">{item.icon}</span>
                <span className="facility-menu-label">{item.label}</span>
              </button>
            );
          }

          // Special handling voor Services
          if (item.id === "services") {
            return (
              <button
                key={item.id}
                className="facility-menu-item"
                onClick={handleServicesClick}
              >
                <span className="facility-menu-icon">{item.icon}</span>
                <span className="facility-menu-label">{item.label}</span>
              </button>
            );
          }

          // Special handling voor Carrière
          if (item.id === "carriere") {
            return (
              <button
                key={item.id}
                className="facility-menu-item"
                onClick={handleCarriereClick}
              >
                <span className="facility-menu-icon">{item.icon}</span>
                <span className="facility-menu-label">{item.label}</span>
              </button>
            );
          }
          
          if (!item.enabled) {
            return (
              <div 
                key={item.id}
                className="facility-menu-item facility-menu-item-disabled"
              >
                <span className="facility-menu-icon">{item.icon}</span>
                <span className="facility-menu-label">{item.label}</span>
              </div>
            );
          }
          
          return (
            <Link 
              href={item.href} 
              key={item.id}
              className={`facility-menu-item ${active ? 'facility-menu-item-active' : ''}`}
              onClick={() => {
                if (window.innerWidth <= 768 && onToggle) {
                  onToggle();
                }
              }}
            >
              <span className="facility-menu-icon">{item.icon}</span>
              <span className="facility-menu-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="facility-menu-footer">
        <button
          onClick={() => window.location.href = '/aanmelden'}
          className="facility-menu-cta"
        >
          Zet jouw bedrijf op de kaart!
        </button>
      </div>
    </>
  );

  // Render Carrière submenu
  const renderCarriereMenu = () => (
    <>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #f0f0f0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '60px'
      }}>
        <button 
          onClick={handleBack}
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
          onMouseOver={(e) => e.currentTarget.style.background = '#e8e8e8'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f8f8f8'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'flex-start',
          flex: 1,
          paddingLeft: '44px'
        }}>
          <span style={{ fontSize: '20px' }}>💼</span>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            Carrière
          </h2>
        </div>
      </div>

      <nav className="facility-menu-nav">
        <Link 
          href="/vacatures"
          className="facility-menu-item"
          onClick={() => {
            if (window.innerWidth <= 768 && onToggle) {
              onToggle();
            }
          }}
        >
          <span className="facility-menu-icon">💼</span>
          <span className="facility-menu-label">Vacatures</span>
          {vacatureCount > 0 && (
            <span className="facility-menu-badge">{vacatureCount}</span>
          )}
        </Link>

        <button
          className="facility-menu-item"
          onClick={() => setCurrentView('jobcoaching')}
        >
          <span className="facility-menu-icon">🎯</span>
          <span className="facility-menu-label">Jobcoaching</span>
        </button>

        <button
          className="facility-menu-item"
          onClick={() => setCurrentView('drijfveren')}
        >
          <span className="facility-menu-icon">⚡</span>
          <span className="facility-menu-label">Drijfverentest</span>
        </button>
      </nav>
    </>
  );

  // Render Jobcoaching info
  const renderJobcoachingInfo = () => (
    <>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #f0f0f0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '60px'
      }}>
        <button 
          onClick={() => setCurrentView('carriere')}
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
          onMouseOver={(e) => e.currentTarget.style.background = '#e8e8e8'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f8f8f8'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'flex-start',
          flex: 1,
          paddingLeft: '44px'
        }}>
          <span style={{ fontSize: '20px' }}>🎯</span>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            Jobcoaching
          </h2>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1a1a1a',
          marginBottom: '24px'
        }}>
          Jobcoaching helpt je om gerichter keuzes te maken in je loopbaan en met meer vertrouwen stappen te zetten. Samen met een coach krijg je inzicht in je kwaliteiten, ontwikkelpunten en mogelijkheden binnen de facilitaire sector. Het resultaat is meer focus, snellere groei en werk dat beter aansluit bij wie je bent en waar je naartoe wilt.
        </p>

        <button
          onClick={() => window.open('https://tally.so/r/jobcoaching', '_blank')}
          style={{
            width: '100%',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#3367d6';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#4285f4';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Ik zoek jobcoaching
        </button>
      </div>
    </>
  );

  // Render Drijfverentest info
  const renderDrijfverenInfo = () => (
    <>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #f0f0f0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '60px'
      }}>
        <button 
          onClick={() => setCurrentView('carriere')}
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
          onMouseOver={(e) => e.currentTarget.style.background = '#e8e8e8'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f8f8f8'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'flex-start',
          flex: 1,
          paddingLeft: '44px'
        }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            Drijfverentest
          </h2>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1a1a1a',
          marginBottom: '16px'
        }}>
          Je drijfveren bepalen waarom werk voor jou energie geeft of juist uitput. Door te ontdekken wat jou écht motiveert, maak je bewustere keuzes die passen bij jouw waarden en ambities. Dit zorgt voor meer werkplezier, duurzame inzetbaarheid en een loopbaan die niet alleen logisch voelt, maar ook klopt op de lange termijn.
        </p>

        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1a1a1a',
          marginBottom: '24px'
        }}>
          Via onze partner UNDSQVRD kan je de Personal Brand Test maken om laagdrempelig een zelfbeeld te schetsen.
        </p>

        <button
          onClick={() => window.open('https://undsqvrd.nl/personal-brand-test', '_blank')}
          style={{
            width: '100%',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#3367d6';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#4285f4';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Mijn drijfveren ontdekken
        </button>
      </div>
    </>
  );

  return (
    <div className={`facility-menu ${isOpen ? 'is-open' : ''}`}>
      {currentView === 'main' && renderMainMenu()}
      {currentView === 'carriere' && renderCarriereMenu()}
      {currentView === 'jobcoaching' && renderJobcoachingInfo()}
      {currentView === 'drijfveren' && renderDrijfverenInfo()}
    </div>
  );
}
