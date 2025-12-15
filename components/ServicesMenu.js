import React, { useState } from "react";
import { categories } from "../data/categories";

export default function ServicesMenu({ facilities = [], onBack, onSelectService, onSelectCompany }) {
  const [selectedService, setSelectedService] = useState(null);

  // Converteer categories object naar array
  const allCategories = Object.entries(categories).map(([slug, data]) => ({
    slug,
    ...data
  }));

  const handleServiceClick = (category) => {
    setSelectedService(category);
  };

  const handleBackToList = () => {
    setSelectedService(null);
  };

  const handleGoToMarketplace = (slug) => {
    window.location.href = `/dienstverlening/${slug}`;
  };

  // Filter facilities op basis van geselecteerde service categorie
  const getFilteredFacilities = () => {
    if (!selectedService) return [];
    
    return facilities.filter(facility => {
      if (facility.branche) {
        const facilityBranches = facility.branche.split(',').map(b => b.trim());
        return facilityBranches.includes(selectedService.title);
      }
      return false;
    });
  };

  const filteredFacilities = getFilteredFacilities();

  // Render service overzicht
  if (!selectedService) {
    return (
      <div className="facility-menu is-open" style={{
        position: 'fixed',
        top: '80px',
        left: '20px',
        width: '360px',
        maxHeight: 'calc(100vh - 120px)',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
        zIndex: 2600,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #f0f0f0',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: '60px'
        }}>
          <button 
            onClick={onBack}
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
            <span style={{ fontSize: '20px' }}>🔍</span>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1a1a1a',
              margin: 0
            }}>
              Services ontdekken
            </h2>
          </div>
        </div>

        {/* Service categorieën lijst */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            margin: '0 0 16px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Service categorieën
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {allCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleServiceClick(category)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  background: 'white',
                  border: '1px solid #e8e8e8',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f8f8f8';
                  e.currentTarget.style.borderColor = '#d0d0d0';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#e8e8e8';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    {category.title}
                  </h4>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render service detail
  return (
    <div className="facility-menu is-open" style={{
      position: 'fixed',
      top: '80px',
      left: '20px',
      width: '360px',
      maxHeight: 'calc(100vh - 120px)',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
      zIndex: 2600,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #f0f0f0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '60px'
      }}>
        <button 
          onClick={handleBackToList}
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
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            {selectedService.title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1a1a1a',
          marginBottom: '20px'
        }}>
          {selectedService.description}
        </p>

        {/* Marketplace knop */}
        <button
          onClick={() => handleGoToMarketplace(selectedService.slug)}
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
            transition: 'all 0.2s ease',
            marginBottom: '24px'
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
          Naar Facility Marketplace
        </button>

        {/* Organisaties lijst */}
        <div>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Organisaties in {selectedService.title}
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => {
                    if (onSelectCompany) {
                      onSelectCompany(facility);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    background: 'white',
                    border: '1px solid #e8e8e8',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f8f8f8';
                    e.currentTarget.style.borderColor = '#d0d0d0';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e8e8e8';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {facility.logo && (
                    <div style={{
                      width: '44px',
                      height: '44px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f8f8f8',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={facility.logo}
                        alt={facility.naam}
                        onError={(e) => {
                          e.target.src = '/placeholder-logo.svg';
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '4px'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      margin: '0 0 2px 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {facility.naam}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#999',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {facility.type}
                    </p>
                  </div>
                  {facility.verified && (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M6.26701 9.40002L8.93368 12.0667L14.267 6.73335" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="10" cy="10" r="9" stroke="#4285F4" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '32px 16px',
                color: '#999',
                fontSize: '14px'
              }}>
                <p>Geen organisaties gevonden in deze categorie</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
