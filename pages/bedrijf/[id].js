import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CompanyMap = dynamic(() => import("../../src/components/CompanyMap"), { ssr: false });

// Demo data voor bedrijven
const mockCompanies = {
  1: {
    id: 1,
    naam: "CSU",
    type: "Schoonmaakdienst",
    locatie: "Amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    logo: "/logos/csu.png",
    omschrijving: "Duurzame cateringoplossingen voor onderwijs & zorg.",
    website: "https://www.csu.nl",
    email: "info@csu.nl",
    telefoon: "+31 20 123 4567",
    heroImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
    ],
    specialismen: [
      {
        titel: "Dagelijkse schoonmaak",
        beschrijving: "Dagelijkse schoonmaak omvat een diepgaande reiniging (zoals: technische innovatie omvattend in ons werk. Zo staan sensoren om te erop af aan ruimte wel of niet is gebruikt en hier ook, zoals we niet onnodig schoonmaken.\n\nDe toepassing van probiotica staat ons in staat om niet alleen te reinigen maar ook te beschermen. Een uniek voordeel dat de ook voorkomt dat de zichtgebruikte werkzij natuurlijk beschermende microfilm. Op die manier verbeteren we niet aan aanwezige schimmelsituatie en verminderen we welzijn van uw medewerkers."
      },
      {
        titel: "Glasbewassing & gevelreiniging",
        beschrijving: "Professionele glasbewassing voor alle soorten gebouwen."
      },
      {
        titel: "Specialistisch onderhoud & Vloeronderhoud",
        beschrijving: "Vloeronderhoud en specialistisch onderhoud voor alle vloertypen."
      }
    ],
    certificeringen: ["Keurmerk Schoon", "ISO 9001", "NEN 2075"],
    meerDiensten: [
      {
        titel: "Receptie & Hospitality",
        gradient: "linear-gradient(135deg, #f59e0b, #fb923c)"
      },
      {
        titel: "Catering & Foodservices",
        gradient: "linear-gradient(135deg, #fbbf24, #fb923c)"
      }
    ],
    inspiratie: [
      {
        titel: "Waarom wij de juiste facilitaire consultancy partner zijn",
        beschrijving: "In deze blog lees je uitgebreid waarom Atalian Consultancy de juiste partner is voor jouw organisatie en hoe je samen met ons je organisatie verbetert via onszere methodische en data driven aanpak.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
        logo: "/logos/ew.png"
      },
      {
        titel: "Van strategie tot uitvoering: hoe consultancy FM-resultaten verandert",
        beschrijving: "Facility managers krijgen vaak dagelijkse vragen van medewerkers, leveranciers en directie. Dat kan leiden tot een prioriteiten stapeling waarbij de uitvoering.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
      },
      {
        titel: "Consultancy voor hybride werken: zo ontwerp je een toekomstbestendige werkplek",
        beschrijving: "Hybride werken is voor de meeste organisaties de nieuwe realiteit. Medewerkers verwachten flexibiliteit en een werkplek die inspireert. Maar hoe ontwerp je een ruimte die zowel thuiswerkers als kantoorwerkers ondersteunt met data, strategie en slimme inzet?",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        logo: "/logos/iss.png"
      }
    ]
  },
  4: {
    id: 4,
    naam: "Atalian",
    type: "Schoonmaakdienst",
    locatie: "Nieuwegein",
    lat: 52.0293,
    lng: 5.0892,
    logo: "/logos/atalian.png",
    omschrijving: "Of het nu gaat om de dagelijkse schoonmaak van een kantoor, zorginstelling, school, winkel of sportaccommodatie, om reiniging in de (voedingsmiddelen)industrie: wij zijn er klaar voor. Niet alleen om kwaliteit te leveren, maar ook om op een prettige manier met u samen te werken.",
    website: "https://www.atalian.nl",
    email: "info@atalian.nl",
    telefoon: "+31 30 123 4567",
    heroImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
    ],
    specialismen: [
      {
        titel: "Dagelijkse schoonmaak",
        beschrijving: "Dagelijkse schoonmaak omvat een diepgaande reiniging (zoals: technische innovatie omvattend in ons werk. Zo staan sensoren om te erop af aan ruimte wel of niet is gebruikt en hier ook, zoals we niet onnodig schoonmaken.\n\nDe toepassing van probiotica staat ons in staat om niet alleen te reinigen maar ook te beschermen. Een uniek voordeel dat de ook voorkomt dat de zichtgebruikte werkzij natuurlijk beschermende microfilm. Op die manier verbeteren we niet aan aanwezige schimmelsituatie en verminderen we welzijn van uw medewerkers."
      },
      {
        titel: "Glasbewassing & gevelreiniging",
        beschrijving: "Professionele glasbewassing voor alle soorten gebouwen."
      },
      {
        titel: "Specialistisch onderhoud & Vloeronderhoud",
        beschrijving: "Vloeronderhoud en specialistisch onderhoud voor alle vloertypen."
      }
    ],
    certificeringen: ["Keurmerk Schoon", "ISO 9001", "NEN 2075"],
    meerDiensten: [
      {
        titel: "Receptie & Hospitality",
        gradient: "linear-gradient(135deg, #f59e0b, #fb923c)"
      },
      {
        titel: "Catering & Foodservices",
        gradient: "linear-gradient(135deg, #fbbf24, #fb923c)"
      }
    ],
    inspiratie: [
      {
        titel: "Waarom wij de juiste facilitaire consultancy partner zijn",
        beschrijving: "In deze blog lees je uitgebreid waarom Atalian Consultancy de juiste partner is voor jouw organisatie en hoe je samen met ons je organisatie verbetert via onszere methodische en data driven aanpak.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
        logo: "/logos/ew.png"
      },
      {
        titel: "Van strategie tot uitvoering: hoe consultancy FM-resultaten verandert",
        beschrijving: "Facility managers krijgen vaak dagelijkse vragen van medewerkers, leveranciers en directie. Dat kan leiden tot een prioriteiten stapeling waarbij de uitvoering.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
      },
      {
        titel: "Consultancy voor hybride werken: zo ontwerp je een toekomstbestendige werkplek",
        beschrijving: "Hybride werken is voor de meeste organisaties de nieuwe realiteit. Medewerkers verwachten flexibiliteit en een werkplek die inspireert. Maar hoe ontwerp je een ruimte die zowel thuiswerkers als kantoorwerkers ondersteunt met data, strategie en slimme inzet?",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        logo: "/logos/iss.png"
      }
    ]
  },
  2: {
    id: 2,
    naam: "Asito",
    type: "Schoonmaakdienst",
    locatie: "Amsterdam",
    lat: 52.3702,
    lng: 4.8952,
    logo: "/logos/asito.png",
    omschrijving: "Professionele schoonmaakdiensten voor kantoren en zorginstellingen.",
    website: "https://www.asito.nl",
    email: "info@asito.nl",
    telefoon: "+31 20 234 5678",
    heroImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
    ],
    specialismen: [
      {
        titel: "Dagelijkse schoonmaak",
        beschrijving: "Professionele dagelijkse schoonmaak voor kantoren en zorginstellingen."
      }
    ],
    certificeringen: ["ISO 9001"],
    meerDiensten: [
      {
        titel: "Receptie & Hospitality",
        gradient: "linear-gradient(135deg, #f59e0b, #fb923c)"
      }
    ],
    inspiratie: []
  },
  3: {
    id: 3,
    naam: "EW Facility Services",
    type: "Schoonmaakdienst",
    locatie: "Amsterdam",
    lat: 52.3792,
    lng: 4.9003,
    logo: "/logos/ew.png",
    omschrijving: "Facility services met focus op duurzaamheid en kwaliteit.",
    website: "https://www.ew.nl",
    email: "info@ew.nl",
    telefoon: "+31 20 345 6789",
    heroImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
    ],
    specialismen: [
      {
        titel: "Dagelijkse schoonmaak",
        beschrijving: "Professionele dagelijkse schoonmaak."
      }
    ],
    certificeringen: ["ISO 9001"],
    meerDiensten: [],
    inspiratie: []
  },
  5: {
    id: 5,
    naam: "Balans",
    type: "Schoonmaakdienst",
    locatie: "Amsterdam",
    lat: 52.3656,
    lng: 4.9012,
    logo: "/logos/balans.png",
    omschrijving: "Sociale schoonmaakdiensten met aandacht voor mensen.",
    website: "https://www.balans.nl",
    email: "info@balans.nl",
    telefoon: "+31 20 456 7890",
    heroImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
    ],
    specialismen: [
      {
        titel: "Dagelijkse schoonmaak",
        beschrijving: "Professionele dagelijkse schoonmaak."
      }
    ],
    certificeringen: ["ISO 9001"],
    meerDiensten: [],
    inspiratie: []
  },
  6: {
    id: 6,
    naam: "ISS",
    type: "Schoonmaakdienst",
    locatie: "Amsterdam",
    lat: 52.3731,
    lng: 4.8907,
    logo: "/logos/iss.png",
    omschrijving: "Facility services wereldwijd met lokale expertise.",
    website: "https://www.iss.nl",
    email: "info@iss.nl",
    telefoon: "+31 20 567 8901",
    heroImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
    ],
    specialismen: [
      {
        titel: "Dagelijkse schoonmaak",
        beschrijving: "Professionele dagelijkse schoonmaak."
      }
    ],
    certificeringen: ["ISO 9001", "ISO 14001"],
    meerDiensten: [],
    inspiratie: []
  }
};

export default function Bedrijf() {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState(null);
  const [expandedSpecialisme, setExpandedSpecialisme] = useState(null);

  useEffect(() => {
    if (id && mockCompanies[id]) {
      setCompany(mockCompanies[id]);
    }
  }, [id]);

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

  if (!company) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#6B7280' }}>Bedrijf wordt geladen...</p>
      </div>
    );
  }

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
            <Link href="/fm-marketplace" style={{
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
              Terug naar Schoonmaak & Hygiëne
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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: '#FEF3C7',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    <span style={{ fontSize: '24px' }}>💡</span>
                  </div>
                  <img
                    src={company.logo}
                    alt={company.naam}
                    style={{ height: '32px', objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                  {company.naam}
                </h1>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.6', marginBottom: '24px' }}>
                  {company.omschrijving}
                </p>

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
                  <a
                    href={`mailto:${company.email}`}
                    style={{
                      padding: '12px 24px',
                      background: '#10B981',
                      color: 'white',
                      borderRadius: '8px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#10B981'}
                  >
                    Contact opnemen
                  </a>
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
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#1F2937',
                          textAlign: 'left'
                        }}
                      >
                        {specialisme.titel}
                        <svg
                          style={{
                            width: '20px',
                            height: '20px',
                            transition: 'transform 0.2s',
                            transform: expandedSpecialisme === index ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
              {company.certificeringen && company.certificeringen.length > 0 && (
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
              )}

              {/* Meer diensten */}
              {company.meerDiensten && company.meerDiensten.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                    Meer diensten van {company.naam}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {company.meerDiensten.map((dienst, index) => (
                      <div
                        key={index}
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
                          justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, textAlign: 'center' }}>
                          {dienst.titel}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
              {/* Hero Images */}
              {company.heroImages && company.heroImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#F3F4F6'
                  }}
                >
                  <img
                    src={image}
                    alt={`${company.naam} ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Image'; }}
                  />
                </div>
              ))}

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
