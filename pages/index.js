import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import CompanyPopup from "@/components/CompanyPopup";
import MobileMenuButton from "@/components/MobileMenuButton";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [filters, setFilters] = useState({ type: "Alles", branche: "Alles" });
  const [facilities, setFacilities] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setSelectedCompany(null);
  };

  const handleMapInteraction = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
        <span className="text-2xl font-semibold">Facility Finder</span>
        <a href="https://www.undsqvrd.nl" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">
          Powered by UNDSQVRD
        </a>
      </header>

      <div className="flex flex-col h-screen bg-background pt-[60px]">
        <div className="flex-1 relative z-10">
          <div className="flex h-full">
            <MobileMenuButton 
              isOpen={isSidebarOpen} 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            />
            
            <Sidebar
              facilities={facilities}
              onFilterChange={handleFilterChange}
              onSelectCompany={handleSelectCompany}
              selectedCompany={selectedCompany}
              isOpen={isSidebarOpen}
            />

            <div className="flex-1">
              <Map
                filters={filters}
                facilities={facilities}
                selectedCompany={selectedCompany}
                onSelectCompany={handleSelectCompany}
                onClick={handleMapClick}
                onDrag={handleMapInteraction}
                onZoom={handleMapInteraction}
              />
            </div>
          </div>
        </div>

        {selectedCompany && (
          <CompanyPopup company={selectedCompany} onClose={() => setSelectedCompany(null)} />
        )}
      </div>
    </div>
  );
}