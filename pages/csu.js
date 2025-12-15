import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const CompanyMap = dynamic(() => import("../src/components/CompanyMap"), { ssr: false });

export default function CSU() {
  const [expandedCategory, setExpandedCategory] = useState(null);

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

  const company = {
    naam: "CSU",
    logo: "/logos/csu.png",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop",
    omschrijving: "Of het nu gaat om de dagelijkse schoonmaak van een kantoor, zorginstelling, school, winkel of sportaccommodatie, om reiniging in de (voedingsmiddelen)industrie: wij zijn er klaar voor. Niet alleen om kwaliteit te leveren, maar ook om op een prettige manier met u samen te werken.",
    website: "https://www.csu.nl",
    locatie: "Amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    dienstverlening: {
      operationeel: true,
      consultancy: true
    },
    serviceCategorieen: [
      {
        titel: "Schoonmaak & Hygiëne",
        gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
        slug: "csu-schoonmaak-hygiene",
        icon: "🧹"
      },
      {
        titel: "Receptie & Hospitality",
        gradient: "linear-gradient(135deg, #f59e0b, #fb923c)",
        slug: "csu-receptie-hospitality",
        icon: "👋"
      },
      {
        titel: "Catering",
        gradient: "linear-gradient(135deg, #fbbf24, #fb923c)",
        slug: "csu-catering",
        icon: "🍽️"
      }
    ],
    locaties: [
      { stad: "Amsterdam", adres: "Hoofdkantoor" },
      { stad: "Rotterdam", adres: "Vestiging Zuid" },
      { stad: "Utrecht", adres: "Vestiging Midden" }
    ],
    inspiratie: [
      {
        titel: "Waarom wij de juiste facilitaire consultancy partner zijn",
        beschrijving: "In deze blog lees je uitgebreid waarom CSU Consultancy de juiste partner is voor jouw organisatie en hoe je samen met ons je organisatie verbetert via onszere methodische en data driven aanpak.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
        logo: "/logos/csu.png"
      },
      {
        titel: "Van strategie tot uitvoering: hoe consultancy FM-resultaten verandert",
        beschrijving: "Facility managers krijgen vaak dagelijkse vragen van medewerkers, leveranciers en directie. Dat kan leiden tot een prioriteiten stapeling waarbij de uitvoering.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
      },
      {
        titel: "Consultancy voor hybride werken: zo ontwerp je een toekomstbestendige werkplek",
        beschrijving: "Hybride werken is voor de meeste organisaties de nieuwe realiteit. Medewerkers verwachten flexibiliteit en een werkplek die inspireert. Maar hoe ontwerp je een ruimte die zowel thuiswerkers als kantoorwerkers ondersteunt met data, strategie en slimme inzet?",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{company.naam} - Facility Finder</title>
        <meta name="description" content={company.omschrijving} />
      </Head>

      <div style={{ background: 'white', minHeight: '100vh', overflow: 'auto' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(to right, #a855f7, #3b82f6)',
          color: 'white',
          padding: '16px 24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '24px', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
              Facility Finder
            </Link>
            <a href="https://www.undsqvrd.nl/facility-finder" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'white', textDecoration: 'none' }}>
              Powered by UNDSQVRD
            </a>
          </div>
        </header>

        {/* Terug link */}
        <div style={{ padding: '16px 24px', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#6B7280',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.2s'
            }}>
              <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar Organisaties & Hygiëne
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
            {/* Left Column */}
            <div>
              {/* Company Header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
                  <img
                    src={company.logo}
                    alt={company.naam}
                    style={{ height: '48px', objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                  {company.naam}
                </h1>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.6', marginBottom: '24px' }}>
                  {company.omschrijving}
                </p>

                {/* Vormen van dienstverlening */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>
                    Vormen van dienstverlening
                  </h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {company.dienstverlening.operationeel && (
                      <span style={{
                        padding: '8px 16px',
                        background: '#EEF2FF',
                        color: '#4F46E5',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Operationele dienst
                      </span>
                    )}
                    {company.dienstverlening.consultancy && (
                      <span style={{
                        padding: '8px 16px',
                        background: '#FEF3C7',
                        color: '#D97706',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Advies (consultancy)
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '12px 24px',
                      background: '#3B82F6',
                      color: 'white',
                      borderRadius: '8px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#2563EB'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#3B82F6'}
                  >
                    Naar de website
                  </a>
                  <button
                    style={{
                      padding: '12px 24px',
                      background: 'white',
                      color: '#3B82F6',
                      border: '1px solid #3B82F6',
                      borderRadius: '8px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#3B82F6';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#3B82F6';
                    }}
                  >
                    Contact opnemen
                  </button>
                </div>
              </div>

              {/* Service Categorieën */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  Service categorieën
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {company.serviceCategorieen.map((categorie, index) => (
                    <Link
                      key={index}
                      href={`/${categorie.slug}`}
                      style={{
                        background: categorie.gradient,
                        padding: '32px 24px',
                        borderRadius: '12px',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        minHeight: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{categorie.icon}</div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, textAlign: 'center' }}>
                        {categorie.titel}
                      </h3>
                      <svg 
                        style={{ 
                          position: 'absolute', 
                          top: '12px', 
                          right: '12px', 
                          width: '20px', 
                          height: '20px',
                          opacity: 0.8
                        }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Locaties */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  Locaties
                </h2>
                <div style={{
                  background: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                      Alle locaties
                    </label>
                    <select style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#1F2937',
                      background: 'white'
                    }}>
                      <option>Alle locaties</option>
                      {company.locaties.map((loc, idx) => (
                        <option key={idx}>{loc.stad}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#F3F4F6'
                  }}>
                    <CompanyMap
                      naam={company.naam}
                      lat={company.lat}
                      lng={company.lng}
                      logo={company.logo}
                    />
                  </div>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '12px', marginBottom: 0 }}>
                    <strong>Algemeen werkgebied:</strong> Nederland
                  </p>
                </div>
              </div>

              {/* Inspiratie */}
              {company.inspiratie && company.inspiratie.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                    Inspiratie van {company.naam}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {company.inspiratie.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          background: 'white',
                          border: '1px solid #E5E7EB'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                          <img
                            src={item.image}
                            alt={item.titel}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {item.logo && (
                            <div style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              background: 'white',
                              padding: '8px',
                              borderRadius: '8px',
                              width: '48px',
                              height: '48px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img src={item.logo} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            </div>
                          )}
                        </div>
                        <div style={{ padding: '16px' }}>
                          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '8px', lineHeight: '1.4' }}>
                            {item.titel}
                          </h3>
                          <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5', margin: 0 }}>
                            {item.beschrijving}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Hero Image */}
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#F3F4F6'
                }}
              >
                <img
                  src={company.heroImage}
                  alt={company.naam}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Image'; }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
