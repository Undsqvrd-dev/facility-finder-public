import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { demoFacilities } from "../data/demoFacilities";

export default function FMMarketplace() {
  const facilities = demoFacilities;

  // Zorg dat de pagina scrollbaar is
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, []);

  const dienstverleningVormen = [
    { title: "Advies (consultancy)", icon: "🤝", slug: "advies-consultancy" },
    { title: "Operationele diensten", icon: "💪", slug: "operationele-diensten" },
    { title: "Detachering / Interim", icon: "👔", slug: "detachering-interim" },
    { title: "Project management", icon: "🎯", slug: "project-management" },
    { title: "Integrated FM", icon: "🏢", slug: "integrated-fm" },
    { title: "Software Tools", icon: "💻", slug: "software-tools" },
    { title: "Product leverancier", icon: "📦", slug: "product-leverancier" }
  ];

  const categories = [
    { title: "Schoonmaak & Hygiëne", gradient: "from-cyan-400 via-blue-400 to-blue-500", slug: "schoonmaak-hygiene" },
    { title: "Receptie & Hospitality", gradient: "from-yellow-400 via-orange-400 to-orange-500", slug: "receptie-hospitality" },
    { title: "Beveiliging & Veiligheid", gradient: "from-blue-600 via-blue-700 to-blue-800", slug: "beveiliging-veiligheid" },
    { title: "Technisch onderhoud & installaties", gradient: "from-blue-400 via-blue-500 to-purple-500", slug: "technisch-onderhoud" },
    { title: "Huisvesting & vastgoed", gradient: "from-purple-500 via-blue-500 to-cyan-500", slug: "huisvesting-vastgoed" },
    { title: "Huismeesterschap", gradient: "from-orange-400 via-orange-500 to-red-500", slug: "huismeesterschap" },
    { title: "Werkplekconcepten & interieur", gradient: "from-orange-300 via-yellow-200 to-orange-100", slug: "werkplekconcepten-interieur" },
    { title: "Catering & Foodservices", gradient: "from-yellow-400 via-orange-400 to-orange-500", slug: "catering-foodservices" },
    { title: "Duurzaamheid & Circulariteit", gradient: "from-green-400 via-green-500 to-green-600", slug: "duurzaamheid-circulariteit" },
    { title: "Inkoop & Contractmanagement", gradient: "from-purple-500 via-purple-600 to-purple-700", slug: "inkoop-contract" },
    { title: "Metingen & Monitoring", gradient: "from-cyan-500 via-teal-500 to-cyan-600", slug: "metingen-monitoring" },
    { title: "Verhuis & Logistieke Services", gradient: "from-blue-400 via-cyan-400 to-blue-500", slug: "verhuis-logistiek" }
  ];

  const collecties = [
    { title: "Duurzame Koplopers", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop" },
    { title: "FM Innovators", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop" },
    { title: "Workplace Experience Heroes", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop" },
    { title: "24/7 omgevingen", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop" },
    { title: "ESG & CSRD Ready", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=200&fit=crop" },
    { title: "Beleving & Hospitality Boosters", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=200&fit=crop" }
  ];

  return (
    <>
      <Head>
        <title>FM Marketplace - Facility Finder</title>
        <meta name="description" content="Ontdek alle facilitaire dienstverleners in Nederland op de FM Marketplace." />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        background: '#fafafa',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          background: 'linear-gradient(to right, #a855f7, #3b82f6)',
          color: 'white',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 50,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
            Facility Finder
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/over" style={{ fontSize: '14px', color: 'white', textDecoration: 'none' }}>
              Over Facility Finder
            </Link>
            <a href="https://www.undsqvrd.nl/facility-finder" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'white', textDecoration: 'none' }}>
              Powered by UNDSQVRD
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '28px 24px 72px',
          paddingTop: '84px' // Extra ruimte voor fixed header
        }}>
          {/* Terug knop */}
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            textDecoration: 'none',
            fontSize: '13px',
            marginBottom: '20px',
            transition: 'color 0.2s'
          }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Terug naar de kaart
          </Link>

          {/* Hero Section */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '32px' }}>🤝</span>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: 0
              }}>
                Dienstverleners op de Facility Marketplace
              </h1>
            </div>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#666',
              margin: 0
            }}>
              Welkom op de Facility Marketplace – de plek waar je alle facilitaire dienstverleners in Nederland vindt. Ontdek bedrijven in schoonmaak, beveiliging, werkplekconcepten, duurzaamheid, hospitality en meer. Bekijk hun profielen, specialismen en contactmogelijkheden, en vind snel de juiste partner voor jouw organisatie.
            </p>
          </div>

          {/* Search Section */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '40px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e8e8e8'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>⚡</span>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                Vind snel de juiste facilitaire leverancier
              </h2>
            </div>
            
              <input
                type="text"
              placeholder="Type wat je zoekt..."
              style={{
                width: '100%',
                padding: '11px 14px',
                fontSize: '14px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4285f4'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

          {/* Vorm van dienstverlening */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
              Vorm van dienstverlening
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '10px'
            }}>
              {dienstverleningVormen.map((vorm, index) => {
                const content = (
                  <div
                    style={{
                      background: 'white',
                      padding: '14px',
                      borderRadius: '12px',
                      cursor: vorm.slug ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                      border: '1px solid #e8e8e8',
                      textAlign: 'center',
                      opacity: vorm.slug ? 1 : 0.5,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '100px',
                      height: '100%'
                    }}
                    onMouseOver={(e) => {
                      if (vorm.slug) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (vorm.slug) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <div style={{ fontSize: '26px', marginBottom: '8px' }}>{vorm.icon}</div>
                    <h3 style={{
                      color: '#1a1a1a',
                      fontSize: '12px',
                      fontWeight: 500,
                      margin: 0,
                      lineHeight: 1.3
                    }}>
                      {vorm.title}
                    </h3>
                  </div>
                );

                return vorm.slug ? (
                  <Link key={index} href={`/dienstverlening/${vorm.slug}`} style={{ textDecoration: 'none' }}>
                    {content}
                  </Link>
                ) : (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Categorieën Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
              Categorieën
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {categories.map((cat, index) => (
                <Link 
                  href={`/categorie/${cat.slug}`}
                  key={index}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className={`bg-gradient-to-br ${cat.gradient}`}
                    style={{
                      padding: '28px 18px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${
                        cat.gradient.includes('cyan') ? '#22d3ee, #3b82f6' :
                        cat.gradient.includes('yellow') && cat.gradient.includes('orange') ? '#fbbf24, #f97316' :
                        cat.gradient.includes('blue-600') ? '#2563eb, #1e3a8a' :
                        cat.gradient.includes('blue-400') && cat.gradient.includes('purple') ? '#60a5fa, #a855f7' :
                        cat.gradient.includes('purple') && cat.gradient.includes('cyan') ? '#a855f7, #06b6d4' :
                        cat.gradient.includes('orange') && cat.gradient.includes('red') ? '#fb923c, #ef4444' :
                        cat.gradient.includes('orange-300') ? '#fdba74, #fed7aa' :
                        cat.gradient.includes('green') ? '#4ade80, #16a34a' :
                        cat.gradient.includes('purple-500') && cat.gradient.includes('purple-700') ? '#a855f7, #7e22ce' :
                        cat.gradient.includes('cyan-500') && cat.gradient.includes('teal') ? '#06b6d4, #14b8a6' :
                        '#60a5fa, #06b6d4'
                      })`
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <h3 style={{
                      color: 'white',
                      fontSize: '15px',
                      fontWeight: 600,
                      margin: 0,
                      textAlign: 'center',
                      lineHeight: 1.3
                    }}>
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Collecties Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
              Collecties
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '12px'
            }}>
              {collecties.map((collectie, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    height: '160px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img 
                    src={collectie.image} 
                    alt={collectie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px'
                  }}>
                    <h3 style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      margin: 0
                    }}>
                      {collectie.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alle bedrijven Section */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
              Alle bedrijven
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '12px'
            }}>
              {facilities.map((facility) => (
                <Link 
                  href={`/bedrijf/${facility.id}`}
                  key={facility.id}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: 'white',
                      padding: '16px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: '1px solid #e8e8e8',
                      height: '100%'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {facility.logo && (
                      <div style={{
                        width: '52px',
                        height: '52px',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={facility.logo}
                          alt={facility.naam}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.target.src = '/placeholder-logo.svg';
                          }}
                        />
                      </div>
                    )}
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      margin: '0 0 4px 0'
                    }}>
                      {facility.naam}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: '0 0 6px 0'
                    }}>
                      {facility.type}
                    </p>
                    <p style={{
                      fontSize: '11px',
                      color: '#999',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {facility.omschrijving || 'Duurzame cateringoplossingen voor onderwijs & zorg.'}
                    </p>
                    {facility.locatie && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '12px'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#999" strokeWidth="1.5" fill="none"/>
                          <circle cx="10" cy="9" r="2.5" fill="#999"/>
                        </svg>
                        <span style={{ fontSize: '11px', color: '#999' }}>{facility.locatie}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
