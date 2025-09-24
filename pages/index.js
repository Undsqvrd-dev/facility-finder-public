import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import CompanyPopup from "@/components/CompanyPopup";
import SidebarToggle from "../components/SidebarToggle";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [filters, setFilters] = useState({ type: "Alles", branche: "Alles" });
  const [facilities, setFacilities] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [vacatureCount, setVacatureCount] = useState(0);

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

    // Sluit de sidebar op mobiel wanneer een bedrijf wordt geselecteerd
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleMapClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleMapInteraction = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
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
        <div className="flex items-center space-x-4">
          <a href="https://www.undsqvrd.nl/facility-finder" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">
            Powered by UNDSQVRD
          </a>
        </div>
      </header>

      <div className="flex flex-col h-screen bg-background pt-[60px]">
        <div className="flex-1 relative z-10">
          <div className="flex h-full">
            <SidebarToggle 
              isOpen={isSidebarOpen} 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            />
            <div className="flex-1 relative">
              <Map
                filters={filters}
                facilities={facilities}
                selectedCompany={selectedCompany}
                onSelectCompany={handleSelectCompany}
                onClick={handleMapClick}
                onDrag={handleMapInteraction}
                onZoom={handleMapInteraction}
              />
              
              {/* Floating vacature counter knop */}
              <div className="absolute top-4 right-4 z-50">
                <a 
                  href="/vacatures"
                  className="block bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-3 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-2 relative">
                    {/* Rood bolletje indicator */}
                    <div className="absolute -top-2 -left-2 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xl font-bold text-purple-600">{vacatureCount}</span>
                    <span className="text-sm font-medium text-gray-700">🔔 Vacatures</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {selectedCompany && (
          <CompanyPopup company={selectedCompany} onClose={() => setSelectedCompany(null)} />
        )}
        <Sidebar
          facilities={facilities}
          onFilterChange={handleFilterChange}
          onSelectCompany={handleSelectCompany}
          selectedCompany={selectedCompany}
          isOpen={isSidebarOpen}
          className="fixed top-0 left-0 h-screen w-[85vw] max-w-[300px] z-[1100] md:static md:z-10"
        />
      </div>
    </div>
    </>
  );
}