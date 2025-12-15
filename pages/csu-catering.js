import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const CompanyMap = dynamic(() => import("../src/components/CompanyMap"), { ssr: false });

export default function CSUCatering() {
  const [expandedSpecialisme, setExpandedSpecialisme] = useState(null);

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
    categorie: "Catering",
    categorieGradient: "linear-gradient(135deg, #fbbf24, #fb923c)",
    omschrijving: "Duurzame en hoogwaardige cateringoplossingen voor onderwijs, zorg en bedrijven. Van dagelijkse lunch tot grote events, wij zorgen voor smaakvolle en gezonde maaltijden.",
    website: "https://www.csu.nl",
    locatie: "Amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    specialismen: [
      {
        titel: "Bedrijfscatering",
        beschrijving: "Complete cateringoplossingen voor bedrijven: van koffie & thee tot uitgebreide lunch arrangementen. Wij zorgen ervoor dat uw medewerkers en gasten kunnen genieten van heerlijke en gezonde maaltijden.",
        status: "Operationele dienst"
      },
      {
        titel: "Evenementen & Meetings",
        beschrijving: "Professionele catering voor al uw zakelijke evenementen en vergaderingen. Van walking dinners tot uitgebreide buffetten, wij verzorgen het allemaal met aandacht voor detail.",
        status: "Operationele dienst"
      },
      {
        titel: "Duurzame foodservices",
        beschrijving: "Onze catering is niet alleen lekker, maar ook duurzaam. Wij werken met lokale leveranciers, biologische producten en minimaliseren voedselverspilling.",
        status: "Operationele dienst"
      }
    ],
    certificeringen: ["ISO 22000", "HACCP", "Biologisch"],
    meerDiensten: [
      {
        titel: "Schoonmaak & Hygiëne",
        gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
        slug: "csu-schoonmaak-hygiene"
      },
      {
        titel: "Receptie & Hospitality",
        gradient: "linear-gradient(135deg, #f59e0b, #fb923c)",
        slug: "csu-receptie-hospitality"
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{company.naam} - {company.categorie} - Facility Finder</title>
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
            <Link href="/csu" style={{
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
              Terug naar Catering
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
          {/* Category Banner */}
          <div style={{
            background: company.categorieGradient,
            padding: '32px',
            borderRadius: '16px',
            marginBottom: '32px',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '36px', fontWeight: '700', margin: 0 }}>
              {company.categorie}
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
            {/* Left Column */}
            <div>
              {/* Company Info */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
                  <img
                    src={company.logo}
                    alt={company.naam}
                    style={{ height: '40px', objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                  {company.naam}
                </h2>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.6', marginBottom: '24px' }}>
                  {company.omschrijving}
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
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
                    Vrijblijvend profiel laden
                  </button>
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

              {/* Specialismen */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  Specialismen
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {company.specialismen.map((specialisme, index) => (
                    <div key={index} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                      <button
                        onClick={() => setExpandedSpecialisme(expandedSpecialisme === index ? null : index)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: 'white',
                          border: 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937', marginBottom: '4px' }}>
                            {specialisme.titel}
                          </div>
                          <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            {specialisme.status}
                          </div>
                        </div>
                        <svg
                          style={{
                            width: '20px',
                            height: '20px',
                            transition: 'transform 0.2s',
                            transform: expandedSpecialisme === index ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: '#9CA3AF'
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7 7-7" />
                        </svg>
                      </button>
                      {expandedSpecialisme === index && (
                        <div style={{ padding: '16px', background: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
                          <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                            {specialisme.beschrijving}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificeringen */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  Certificeringen
                </h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {company.certificeringen.map((cert, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '6px 12px',
                        background: '#D1FAE5',
                        color: '#065F46',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meer diensten */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  Meer diensten
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {company.meerDiensten.map((dienst, index) => (
                    <Link
                      key={index}
                      href={`/${dienst.slug}`}
                      style={{
                        background: dienst.gradient,
                        padding: '32px 24px',
                        borderRadius: '12px',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        minHeight: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, textAlign: 'center' }}>
                        {dienst.titel}
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
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Hero Images */}
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
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop"
                  alt={company.naam}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Map */}
              <div style={{
                width: '100%',
                height: '400px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #E5E7EB'
              }}>
                <CompanyMap
                  naam={company.naam}
                  lat={company.lat}
                  lng={company.lng}
                  logo={company.logo}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
