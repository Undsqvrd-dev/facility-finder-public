import React, { useState } from "react";

export default function OrganisatiesMenu({ facilities = [], onBack, onSelectCompany }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isBrancheOpen, setIsBrancheOpen] = useState(false);

  // Haal alle unieke branches op uit de data
  const getAllBranches = () => {
    const branches = new Set();
    facilities.forEach(facility => {
      if (facility.branche) {
        const facilityBranches = facility.branche.split(',').map(b => b.trim());
        facilityBranches.forEach(branch => {
          if (branch && branch !== "Onbekend" && branch !== "Alles") {
            branches.add(branch);
          }
        });
      }
    });
    return Array.from(branches).sort();
  };

  // Haal alle unieke types op uit de data
  const getAllTypes = () => {
    const types = new Set();
    facilities.forEach(facility => {
      if (facility.type && facility.type !== "Onbekend") {
        types.add(facility.type);
      }
    });
    return Array.from(types).sort();
  };

  const allBranches = getAllBranches();
  const allTypes = getAllTypes();

  // Toggle type checkbox
  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Toggle branche checkbox
  const toggleBranche = (branche) => {
    setSelectedBranches(prev => 
      prev.includes(branche) 
        ? prev.filter(b => b !== branche)
        : [...prev, branche]
    );
  };

  // Filter facilities
  const filteredFacilities = facilities.filter((facility) => {
    // Filter op type
    if (selectedTypes.length > 0 && !selectedTypes.includes(facility.type)) {
      return false;
    }
    
    // Filter op branche
    if (selectedBranches.length > 0) {
      const facilityBranches = facility.branche.split(',').map(b => b.trim());
      const hasMatchingBranche = facilityBranches.some(fb => selectedBranches.includes(fb));
      if (!hasMatchingBranche) return false;
    }
    
    return true;
  });

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
      {/* Header met terugknop - zelfde stijl als CompanyPopup */}
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
          <span style={{ fontSize: '20px' }}>🏢</span>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            Organisaties
          </h2>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        {/* Filters - Uitklapbare checkbox lijsten */}
        
        {/* Type filter */}
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setIsTypeOpen(!isTypeOpen)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #e8e8e8',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              color: '#666',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            <span>Vorm van dienstverlening</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              style={{
                transform: isTypeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isTypeOpen && (
            <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {allTypes.map(type => (
                <label 
                  key={type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '6px 0',
                    fontSize: '14px',
                    color: '#1a1a1a'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#4285f4'
                    }}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Branche filter */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => setIsBrancheOpen(!isBrancheOpen)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #e8e8e8',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              color: '#666',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            <span>Service categorieën</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              style={{
                transform: isBrancheOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isBrancheOpen && (
            <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {allBranches.map(branche => (
                <label 
                  key={branche}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '6px 0',
                    fontSize: '14px',
                    color: '#1a1a1a'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedBranches.includes(branche)}
                    onChange={() => toggleBranche(branche)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#4285f4'
                    }}
                  />
                  <span>{branche}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => window.location.href = '/aanmelden'}
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
            Zet jouw bedrijf op de kaart!
          </button>
        </div>

        {/* Organisaties Lijst */}
        <div>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Organisaties
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
                    // Check if this is CSU, then redirect to dedicated page
                    if (facility.naam === "CSU") {
                      window.location.href = '/csu';
                    } else {
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
                <p>Geen organisaties gevonden</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

