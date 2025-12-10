import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

// Mockup data voor schoonmaakbedrijven
const mockCompanies = [
  {
    id: 1,
    naam: "CSU",
    type: "Schoonmaakbedrijf",
    locatie: "Amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    logo: "/logos/csu.png",
    omschrijving: "Duurzame schoonmaakoplossingen voor onderwijs & zorg.",
    branche: "Schoonmaak",
    website: "https://www.csu.nl",
    certificeringen: ["BREEAM", "ISO 14001"]
  },
  {
    id: 2,
    naam: "Asito",
    type: "Schoonmaakbedrijf",
    locatie: "Amsterdam",
    lat: 52.3702,
    lng: 4.8952,
    logo: "/logos/asito.png",
    omschrijving: "Professionele schoonmaakdiensten voor kantoren en zorginstellingen.",
    branche: "Schoonmaak",
    website: "https://www.asito.nl",
    certificeringen: ["BREEAM", "ISO 9001"]
  },
  {
    id: 3,
    naam: "EW Facility Services",
    type: "Schoonmaakbedrijf",
    locatie: "Amsterdam",
    lat: 52.3792,
    lng: 4.9003,
    logo: "/logos/ew.png",
    omschrijving: "Facility services met focus op duurzaamheid en kwaliteit.",
    branche: "Schoonmaak",
    website: "https://www.ew.nl",
    certificeringen: ["BREEAM"]
  },
  {
    id: 4,
    naam: "Atalian",
    type: "Schoonmaakbedrijf",
    locatie: "Amsterdam",
    lat: 52.3584,
    lng: 4.9111,
    logo: "/logos/atalian.png",
    omschrijving: "Internationale schoonmaakdiensten voor diverse sectoren.",
    branche: "Schoonmaak",
    website: "https://www.atalian.nl",
    certificeringen: ["BREEAM", "ISO 14001"]
  },
  {
    id: 5,
    naam: "Balans",
    type: "Schoonmaakbedrijf",
    locatie: "Amsterdam",
    lat: 52.3656,
    lng: 4.9012,
    logo: "/logos/balans.png",
    omschrijving: "Sociale schoonmaakdiensten met aandacht voor mensen.",
    branche: "Schoonmaak",
    website: "https://www.balans.nl",
    certificeringen: ["BREEAM"]
  },
  {
    id: 6,
    naam: "ISS",
    type: "Schoonmaakbedrijf",
    locatie: "Amsterdam",
    lat: 52.3731,
    lng: 4.8907,
    logo: "/logos/iss.png",
    omschrijving: "Facility services wereldwijd met lokale expertise.",
    branche: "Schoonmaak",
    website: "https://www.iss.nl",
    certificeringen: ["BREEAM", "ISO 9001", "ISO 14001"]
  }
];

export default function SchoonmaakHygiene() {
  const [filters, setFilters] = useState({
    locatie: "",
    straal: "25",
    werkgebieden: ["Landelijk"],
    certificering: "Alles"
  });
  const [companies, setCompanies] = useState(mockCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  const [showFilters, setShowFilters] = useState(true);

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
      setFilters(prev => ({ ...prev, werkgebieden: ["Landelijk"] }));
    } else {
      const newSelection = filters.werkgebieden.filter(g => g !== "Landelijk");
      if (newSelection.includes(gebied)) {
        const filtered = newSelection.filter(g => g !== gebied);
        setFilters(prev => ({ ...prev, werkgebieden: filtered.length > 0 ? filtered : ["Landelijk"] }));
      } else {
        setFilters(prev => ({ ...prev, werkgebieden: [...newSelection, gebied] }));
      }
    }
  };

  useEffect(() => {
    // Ensure body can scroll
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Cleanup on unmount
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Filter bedrijven op basis van filters
  useEffect(() => {
    let filtered = [...mockCompanies];

    // Filter op certificering
    if (filters.certificering && filters.certificering !== "Alles") {
      filtered = filtered.filter(company => 
        company.certificeringen && company.certificeringen.includes(filters.certificering)
      );
    }

    // Filter op werkgebied (in dit geval alle bedrijven zijn landelijk)
    if (filters.werkgebieden && !filters.werkgebieden.includes("Landelijk")) {
      // Hier zou je kunnen filteren op regio, maar voor nu houden we alle bedrijven
    }

    setFilteredCompanies(filtered);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSelectCompany = (company) => {
    if (selectedCompany?.id === company.id) {
      setSelectedCompany(null);
    } else {
      setSelectedCompany(company);
    }
  };

  return (
    <>
      <Head>
        <title>Schoonmaak & Hygiëne - Facility Finder</title>
        <meta name="description" content="Vind schoonmaakbedrijven, specialistische reiniging en sanitaire dienstverlening op de Facility Finder." />
      </Head>

      <div className="flex flex-col min-h-screen bg-white" style={{ overflow: 'auto' }}>
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 shadow-md">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold hover:opacity-80 transition-opacity">
              Facility Finder
            </Link>
            <div className="flex items-center space-x-4">
              <a href="https://www.undsqvrd.nl/facility-finder" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">
                Powered by UNDSQVRD
              </a>
            </div>
          </div>
        </header>

        {/* Navigation Link */}
        <div className="px-6 py-4 bg-white border-b">
          <Link href="/fm-marketplace" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar FM Marketplace
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Filters and Company Cards */}
          <div className="w-full md:w-1/2 bg-white border-r overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
            <div className="p-6">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Schoonmaak & Hygiëne
              </h1>
              <p className="text-gray-600 mb-4">
                Schoonmaakbedrijven, specialistische reiniging en sanitaire dienstverlening
              </p>

              {/* Filters Toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <svg className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {showFilters ? 'Filters verbergen' : 'Filters tonen'}
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Locatie Filter */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Locatie
                  </label>
                  <input
                    type="text"
                    value={filters.locatie}
                    onChange={(e) => handleFilterChange("locatie", e.target.value)}
                    placeholder="Bijvoorbeeld: Amsterdam"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Straal Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Straal om locatie
                  </label>
                  <select
                    value={filters.straal}
                    onChange={(e) => handleFilterChange("straal", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="10">10 km</option>
                    <option value="25">25 km</option>
                    <option value="50">50 km</option>
                    <option value="75">75 km</option>
                  </select>
                </div>

                {/* Werkgebied Filter - Multiselect */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Werkgebied
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-white min-h-[48px]">
                    <button
                      onClick={() => toggleWerkgebied("Landelijk")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        filters.werkgebieden.includes("Landelijk")
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                    >
                      Landelijk
                    </button>
                    {nederlandseProvincies.map((provincie) => (
                      <button
                        key={provincie}
                        onClick={() => toggleWerkgebied(provincie)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          filters.werkgebieden.includes(provincie)
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-gray-100 text-gray-700 border border-gray-300"
                        }`}
                      >
                        {provincie}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Certificeringen Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificeringen
                  </label>
                  <select
                    value={filters.certificering}
                    onChange={(e) => handleFilterChange("certificering", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="Alles">Alles</option>
                    <option value="BREEAM">BREEAM</option>
                    <option value="ISO 9001">ISO 9001</option>
                    <option value="ISO 14001">ISO 14001</option>
                  </select>
                </div>
              </div>
              )}

              {/* Company Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCompanies.map((company) => (
                  <Link
                    key={company.id}
                    href={`/bedrijf/${company.id}`}
                    className={`p-4 border rounded-xl cursor-pointer transition-all block ${
                      selectedCompany?.id === company.id
                        ? "border-purple-500 shadow-lg bg-purple-50"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Logo */}
                      <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg p-2 border border-gray-200">
                        <img
                          src={company.logo}
                          alt={company.naam}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = '/placeholder-logo.svg';
                          }}
                        />
                      </div>

                      {/* Company Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {company.naam}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {company.type}
                        </p>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                          {company.omschrijving}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {company.locatie}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Map (Smaller with rounded corners) */}
          <div className="w-full md:w-1/2 relative p-6">
            <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <Map
                filters={{ type: "Alles", branche: "Schoonmaak" }}
                facilities={filteredCompanies.map(company => ({
                  ...company,
                  type: company.type,
                  branche: company.branche
                }))}
                selectedCompany={selectedCompany}
                onSelectCompany={handleSelectCompany}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

