import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { serviceTypes } from "../../data/serviceTypes";

export default function DienstverlenigPage() {
  const router = useRouter();
  const { serviceType } = router.query;
  const serviceData = serviceTypes[serviceType];
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  if (!serviceData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Laden...</p>
      </div>
    );
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{serviceData.title} - Facility Finder</title>
        <meta name="description" content={serviceData.intro} />
      </Head>

      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Header */}
        <header style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          background: 'linear-gradient(to right, #9333ea, #3b82f6)',
          color: 'white',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 50,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
            Facility Finder
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/over" style={{ fontSize: '14px', color: 'white', textDecoration: 'none', opacity: 0.95 }}>
              Over Facility Finder
            </Link>
            <a href="https://www.undsqvrd.nl/facility-finder" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'white', textDecoration: 'none', opacity: 0.95 }}>
              Powered by UNDSQVRD
            </a>
          </div>
        </header>

        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 32px' }}>
          {/* Terug navigatie */}
          <Link
            href="/fm-marketplace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '32px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#111827'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Terug naar overzicht
          </Link>

          {/* Header Block met groot icoon, titel en intro */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px 48px',
            marginBottom: '48px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid #f3f4f6',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px',
              lineHeight: 1
            }}>
              {serviceData.icon}
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#111827',
              margin: '0 0 16px 0',
              lineHeight: 1.2
            }}>
              {serviceData.title}
            </h1>
            <p style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: '#6b7280',
              maxWidth: '860px',
              margin: '0 auto'
            }}>
              {serviceData.intro}
            </p>
          </div>

          {/* Leveranciers sectie */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>
                Top aanbieders binnen deze categorie
              </h2>
              <span style={{
                fontSize: '13px',
                color: '#9ca3af',
                fontWeight: '500'
              }}>
                {serviceData.companies.length} leveranciers beschikbaar
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '20px'
            }}>
              {serviceData.companies.map((company) => (
                <Link
                  key={company.id}
                  href={company.naam === "CSU" ? "/csu" : `/bedrijf/${company.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '16px',
                      padding: '24px',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                      height: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    {/* Logo */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      padding: '12px'
                    }}>
                      <img
                        src={company.logo}
                        alt={company.naam}
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

                    {/* Company info */}
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 8px 0'
                    }}>
                      {company.naam}
                    </h3>

                    <p style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#6b7280',
                      margin: '0 0 16px 0'
                    }}>
                      {company.omschrijving}
                    </p>

                    {/* Locatie tag */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      color: '#9ca3af',
                      marginBottom: '16px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {company.locatie}
                    </div>

                    {/* Badges */}
                    {company.badges.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {company.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              background: badge === 'Verified' ? '#eff6ff' : '#fef3c7',
                              color: badge === 'Verified' ? '#1e40af' : '#92400e',
                              fontSize: '11px',
                              fontWeight: '600',
                              borderRadius: '6px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {badge === 'Verified' && '✓ '}{badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categorieën binnen deze vorm van dienstverlening */}
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 24px 0'
            }}>
              Categorieën binnen {serviceData.title}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              {serviceData.categories.map((category, idx) => (
                <Link
                  key={idx}
                  href={`/categorie/${category.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: category.gradient,
                      borderRadius: '16px',
                      padding: '32px 24px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      minHeight: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      margin: 0,
                      lineHeight: 1.3
                    }}>
                      {category.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Inspiratie sectie */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>
                Inspiratie over {serviceData.title}
              </h2>
              <Link
                href="#"
                style={{
                  fontSize: '14px',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Alles bekijken →
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {serviceData.inspiration.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Image placeholder */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {idx === 0 && '📊'}
                    {idx === 1 && '🚀'}
                    {idx === 2 && '💡'}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 12px 0',
                      lineHeight: 1.4
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Sectie */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 24px 0'
            }}>
              Veelgestelde vragen
            </h2>

            <div style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              {serviceData.faq.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    borderBottom: idx < serviceData.faq.length - 1 ? '1px solid #e5e7eb' : 'none'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '24px 28px',
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (openFaqIndex !== idx) {
                        e.currentTarget.style.background = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openFaqIndex !== idx) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111827',
                      flex: 1,
                      paddingRight: '16px'
                    }}>
                      {item.question}
                    </span>
                    <span style={{
                      fontSize: '24px',
                      color: '#9ca3af',
                      transition: 'transform 0.3s',
                      transform: openFaqIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                      flexShrink: 0
                    }}>
                      +
                    </span>
                  </button>
                  
                  {openFaqIndex === idx && (
                    <div
                      style={{
                        padding: '0 28px 24px 28px',
                        fontSize: '15px',
                        lineHeight: 1.7,
                        color: '#6b7280',
                        animation: 'fadeIn 0.3s ease'
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

