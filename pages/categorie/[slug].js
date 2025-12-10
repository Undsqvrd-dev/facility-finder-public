import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { categories } from "../../data/categories";
import { demoFacilities } from "../../data/demoFacilities";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function CategoriePage() {
  const router = useRouter();
  const { slug } = router.query;
  const category = categories[slug];

  const facilities = demoFacilities;
  const [selectedLocatie, setSelectedLocatie] = useState("");
  const [selectedStraal, setSelectedStraal] = useState("25");
  const [selectedWerkgebieden, setSelectedWerkgebieden] = useState(["Landelijk"]);
  const [selectedDienstverlening, setSelectedDienstverlening] = useState(
    "Operationele diensten"
  );
  const [selectedSpecialisme, setSelectedSpecialisme] = useState("Alle specialismen");
  const [selectedCertificering, setSelectedCertificering] =
    useState("Alle certificeringen");
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  const nederlandseProvincies = [
    "Noord-Holland",
    "Zuid-Holland",
    "Utrecht",
    "Gelderland",
    "Noord-Brabant",
    "Limburg",
    "Zeeland",
    "Overijssel",
    "Flevoland",
    "Groningen",
    "Friesland",
    "Drenthe"
  ];

  const toggleWerkgebied = (gebied) => {
    if (gebied === "Landelijk") {
      setSelectedWerkgebieden(["Landelijk"]);
    } else {
      const newSelection = selectedWerkgebieden.filter(g => g !== "Landelijk");
      if (newSelection.includes(gebied)) {
        const filtered = newSelection.filter(g => g !== gebied);
        setSelectedWerkgebieden(filtered.length > 0 ? filtered : ["Landelijk"]);
      } else {
        setSelectedWerkgebieden([...newSelection, gebied]);
      }
    }
  };

  if (!category) {
    return <div>Categorie niet gevonden...</div>;
  }

  // Gradient voor hero-balk
  let gradientStyle = {};
  if (category.gradient.includes("cyan") && category.gradient.includes("blue-400")) {
    gradientStyle = {
      background: "linear-gradient(135deg, #22d3ee, #60a5fa, #3b82f6)",
    };
  } else if (
    category.gradient.includes("yellow") &&
    category.gradient.includes("orange-400")
  ) {
    gradientStyle = {
      background: "linear-gradient(135deg, #fbbf24, #fb923c, #f97316)",
    };
  } else if (category.gradient.includes("blue-600")) {
    gradientStyle = {
      background: "linear-gradient(135deg, #2563eb, #1d4ed8, #1e3a8a)",
    };
  } else if (
    category.gradient.includes("blue-400") &&
    category.gradient.includes("purple")
  ) {
    gradientStyle = {
      background: "linear-gradient(135deg, #60a5fa, #3b82f6, #a855f7)",
    };
  } else if (
    category.gradient.includes("purple") &&
    category.gradient.includes("cyan")
  ) {
    gradientStyle = {
      background: "linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4)",
    };
  } else if (
    category.gradient.includes("orange") &&
    category.gradient.includes("red")
  ) {
    gradientStyle = {
      background: "linear-gradient(135deg, #fb923c, #f97316, #ef4444)",
    };
  } else if (category.gradient.includes("orange-300")) {
    gradientStyle = {
      background: "linear-gradient(135deg, #fdba74, #fde68a, #fed7aa)",
    };
  } else if (category.gradient.includes("green")) {
    gradientStyle = {
      background: "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
    };
  } else if (
    category.gradient.includes("purple-500") &&
    category.gradient.includes("purple-700")
  ) {
    gradientStyle = {
      background: "linear-gradient(135deg, #a855f7, #9333ea, #7e22ce)",
    };
  } else if (
    category.gradient.includes("cyan-500") &&
    category.gradient.includes("teal")
  ) {
    gradientStyle = {
      background: "linear-gradient(135deg, #06b6d4, #14b8a6, #06b6d4)",
    };
  } else {
    gradientStyle = {
      background: "linear-gradient(135deg, #60a5fa, #06b6d4, #3b82f6)",
    };
  }

  return (
    <>
      <Head>
        <title>{category.title} - Facility Finder</title>
        <meta name="description" content={category.description} />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          overflowY: "auto",
          background: "#f5f5f7",
        }}
      >
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

        <main
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 24px 72px",
            paddingTop: "92px", // Extra ruimte voor fixed header
          }}
        >
          {/* Terug naar FM Marketplace */}
          <Link
            href="/fm-marketplace"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#666",
              textDecoration: "none",
              fontSize: "14px",
              marginBottom: "24px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Terug naar FM Marketplace
          </Link>

          {/* Hero-balk */}
          <div
            style={{
              ...gradientStyle,
              borderRadius: "16px",
              padding: "28px 32px",
              marginBottom: "24px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 700,
                margin: "0 0 8px 0",
              }}
            >
              {category.title}
            </h1>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "900px",
              }}
            >
              {category.description}
            </p>
          </div>

          {/* Filterbalk over volledige breedte */}
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "28px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
              }}
            >
              {/* Locatie */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Locatie
                </label>
                <input
                  type="text"
                  value={selectedLocatie}
                  onChange={(e) => setSelectedLocatie(e.target.value)}
                  placeholder="Bijvoorbeeld: Amsterdam"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
              </div>

              {/* Straal om locatie */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Straal om locatie
                </label>
                <select
                  value={selectedStraal}
                  onChange={(e) => setSelectedStraal(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                >
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                  <option value="75">75 km</option>
                </select>
              </div>

              {/* Werkgebied - Multiselect */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Werkgebied
                </label>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  background: "white",
                  minHeight: "40px"
                }}>
                  <button
                    onClick={() => toggleWerkgebied("Landelijk")}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      border: "1px solid",
                      borderColor: selectedWerkgebieden.includes("Landelijk") ? "#3b82f6" : "#e5e7eb",
                      background: selectedWerkgebieden.includes("Landelijk") ? "#eff6ff" : "white",
                      color: selectedWerkgebieden.includes("Landelijk") ? "#1e40af" : "#6b7280",
                      fontSize: "12px",
                      fontWeight: selectedWerkgebieden.includes("Landelijk") ? 600 : 500,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    Landelijk
                  </button>
                  {nederlandseProvincies.map((provincie) => (
                    <button
                      key={provincie}
                      onClick={() => toggleWerkgebied(provincie)}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "6px",
                        border: "1px solid",
                        borderColor: selectedWerkgebieden.includes(provincie) ? "#3b82f6" : "#e5e7eb",
                        background: selectedWerkgebieden.includes(provincie) ? "#eff6ff" : "white",
                        color: selectedWerkgebieden.includes(provincie) ? "#1e40af" : "#6b7280",
                        fontSize: "12px",
                        fontWeight: selectedWerkgebieden.includes(provincie) ? 600 : 500,
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      {provincie}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vorm dienstverlening */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Vorm dienstverlening
                </label>
                <select
                  value={selectedDienstverlening}
                  onChange={(e) => setSelectedDienstverlening(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                >
                  <option>Operationele diensten</option>
                  <option>Advies (consultancy)</option>
                  <option>Integrated FM</option>
                  <option>Project management</option>
                </select>
              </div>

              {/* Specialismen */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Specialismen
                </label>
                <select
                  value={selectedSpecialisme}
                  onChange={(e) => setSelectedSpecialisme(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                >
                  <option>Alle specialismen</option>
                  {category.specialismen.map((spec, index) => (
                    <option key={index}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Certificeringen */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Certificeringen
                </label>
                <select
                  value={selectedCertificering}
                  onChange={(e) => setSelectedCertificering(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                >
                  <option>Alle certificeringen</option>
                  {category.certificeringen.map((cert, index) => (
                    <option key={index}>{cert}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Onderste gedeelte: kaarten + kleine kaart rechts */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
            }}
          >
            {/* Lijst met organisaties */}
            <div style={{ flex: 1.5 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "14px",
                }}
              >
                {facilities.slice(0, 9).map((facility) => (
                  <Link
                    key={facility.id}
                    href={`/bedrijf/${facility.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      onClick={() => setSelectedCompany(facility)}
                      style={{
                        background: "white",
                        padding: "16px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {facility.logo && (
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#f3f4f6",
                          borderRadius: "10px",
                          padding: "6px",
                        }}
                      >
                        <img
                          src={facility.logo}
                          alt={facility.naam}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            e.target.src = "/placeholder-logo.svg";
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#111827",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {facility.naam}
                      </h3>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        {facility.type}
                      </p>
                      {facility.locatie && (
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            margin: "4px 0 0 0",
                          }}
                        >
                          📍 {facility.locatie}
                        </p>
                      )}
                    </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Kaart rechts - kleiner paneel */}
            <div
              style={{
                flex: 1,
                minWidth: "320px",
                maxWidth: "380px",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  height: "420px",
                }}
              >
                <div
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <Map
                    facilities={facilities}
                    selectedCompany={selectedCompany}
                    onSelectCompany={setSelectedCompany}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


