import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Menu from "../components/Menu";
import MenuToggle from "../components/MenuToggle";
import OrganisatiesMenu from "../components/OrganisatiesMenu";
import ServicesMenu from "../components/ServicesMenu";
import CompanyPopup from "../components/CompanyPopup";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [filters, setFilters] = useState({ type: "Alles", branche: "Alles" });
  const [facilities, setFacilities] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [vacatureCount, setVacatureCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOrganisaties, setShowOrganisaties] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    fetch("/api/getFacilities")
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.map((facility) => ({
          ...facility,
          lat: parseFloat(facility.lat),
          lng: parseFloat(facility.lng),
        }));
        setFacilities(processedData);
        console.log("📌 Gegevens ingeladen:", processedData);
      })
      .catch((error) => console.error("❌ Fout bij ophalen van faciliteiten:", error));
  }, []);

  // Haal het aantal actieve vacatures op
  useEffect(() => {
    fetch("/api/vacatures")
      .then((res) => res.json())
      .then((data) => {
        // Tel alleen actieve vacatures
        const activeVacatures = data.filter(vacature => vacature.status === 'actief');
        setVacatureCount(activeVacatures.length);
        console.log("💼 Aantal actieve vacatures:", activeVacatures.length);
      })
      .catch((error) => {
        console.error("❌ Fout bij ophalen van vacatures:", error);
        // Fallback naar mock data count
        setVacatureCount(5);
      });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    if (selectedCompany && selectedCompany.lat && selectedCompany.lng) {
      console.log("🚀 Zoom in op:", selectedCompany.naam, "Coords:", selectedCompany.lat, selectedCompany.lng);
    } else {
      console.warn("❌ Geen geldige locatie om op in te zoomen.");
    }
  }, [selectedCompany]);

  const handleSelectCompany = (company) => {
    if (!company) {
      setSelectedCompany(null);
      return;
    }
    
    if (isNaN(company.lat) || isNaN(company.lng)) {
      console.warn("⚠️ Ongeldige bedrijfslocatie, zoom-in niet mogelijk!", company);
      return;
    }
    
    console.log("🏢 Nieuw geselecteerd bedrijf:", company.naam, "Coords:", company.lat, company.lng);
    setSelectedCompany({
      ...company,
      lat: parseFloat(company.lat),
      lng: parseFloat(company.lng),
    });
  };

  const handleMapClick = () => {
    // Sluit popup bij klik op kaart
    if (selectedCompany) {
      setSelectedCompany(null);
    }
  };

  const handleMapInteraction = () => {
    // Optioneel: sluit popup bij interactie met kaart
  };

  const handleServiceFilter = (serviceCategory) => {
    // Filter de kaart op basis van de geselecteerde service categorie
    setFilters({ type: "Alles", branche: serviceCategory });
    setShowServices(false);
  };

  return (
    <>
      <Head>
        <title>Facility Finder - Vind facilitaire organisaties</title>
        <meta name="description" content="Ontdek facilitaire organisaties via onze interactieve kaart. Handig voor bijbanen, stages en banen in de facilitaire branche." />
      </Head>
      <div className="flex flex-col h-screen bg-background">
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
        <span className="text-2xl font-semibold">Facility Finder</span>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="text-sm text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md transition-all"
          >
            Inloggen
          </button>
          <button 
            onClick={() => window.location.href = '/aanmelden'}
            className="text-sm bg-white text-purple-600 hover:bg-opacity-90 px-4 py-2 rounded-md font-semibold transition-all"
          >
            Aanmelden
          </button>
        </div>
      </header>

      <div className="flex flex-col h-screen bg-background pt-[60px]">
        <div className="flex-1 relative z-10">
          <Map
            filters={filters}
            facilities={facilities}
            selectedCompany={selectedCompany}
            onSelectCompany={handleSelectCompany}
            onClick={handleMapClick}
            onDrag={handleMapInteraction}
            onZoom={handleMapInteraction}
          />
          
          {/* Mobile Menu Toggle */}
          <MenuToggle 
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          
          {/* Company Popup (heeft voorrang) */}
          {selectedCompany ? (
            <CompanyPopup company={selectedCompany} onClose={() => setSelectedCompany(null)} />
          ) : showServices ? (
            /* Services View */
            <ServicesMenu 
              facilities={facilities}
              onBack={() => setShowServices(false)}
              onSelectService={handleServiceFilter}
              onSelectCompany={(company) => {
                handleSelectCompany(company);
                setShowServices(false);
              }}
            />
          ) : showOrganisaties ? (
            /* Organisaties View */
            <OrganisatiesMenu 
              facilities={facilities}
              onBack={() => setShowOrganisaties(false)}
              onSelectCompany={(company) => {
                handleSelectCompany(company);
                setShowOrganisaties(false);
              }}
            />
          ) : (
            /* Hoofd Menu */
            <Menu 
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              vacatureCount={vacatureCount}
              onShowOrganisaties={() => setShowOrganisaties(true)}
              onShowServices={() => setShowServices(true)}
            />
          )}
        </div>
      </div>
    </div>
    </>
  );
}