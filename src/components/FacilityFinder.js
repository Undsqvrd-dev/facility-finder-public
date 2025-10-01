"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./Sidebar";
import CompanyPopup from "./CompanyPopup";
import SidebarToggle from "./SidebarToggle";
import { event } from "../lib/gtm";

const Map = dynamic(() => import("./Map"), { ssr: false });

const FacilityFinder = ({ mode = "public", user = null }) => {
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
      })
      .catch((error) => console.error("❌ Fout bij ophalen van faciliteiten:", error));
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Track filter changes
    event({
      action: 'filter_change',
      category: 'facility_finder',
      label: `${newFilters.type} - ${newFilters.branche}`,
    });
  };

  const handleSelectCompany = (company) => {
    if (!company) {
      setSelectedCompany(null);
      return;
    }
    
    if (isNaN(company.lat) || isNaN(company.lng)) {
      console.warn("⚠️ Ongeldige bedrijfslocatie, zoom-in niet mogelijk!", company);
      return;
    }
    
    setSelectedCompany({
      ...company,
      lat: parseFloat(company.lat),
      lng: parseFloat(company.lng),
    });

    // Track company selection
    event({
      action: 'company_select',
      category: 'facility_finder',
      label: company.name,
    });

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
    <div className="flex flex-col h-screen bg-background">
      {mode === "public" && (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
          <span className="text-2xl font-semibold">Facility Finder</span>
          <a href="https://www.undsqvrd.nl" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">
            Powered by UNDSQVRD
          </a>
        </header>
      )}

      <div className={`flex flex-col h-screen bg-background ${mode === "public" ? "pt-[60px]" : ""}`}>
        <div className="flex-1 relative z-10">
          <div className="flex h-full">
            <SidebarToggle 
              isOpen={isSidebarOpen} 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            />
            
            <Sidebar
              facilities={facilities}
              onFilterChange={handleFilterChange}
              onSelectCompany={handleSelectCompany}
              selectedCompany={selectedCompany}
              isOpen={isSidebarOpen}
              mode={mode}
              user={user}
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
                mode={mode}
              />
              {selectedCompany && (
                <CompanyPopup 
                  company={selectedCompany} 
                  onClose={() => setSelectedCompany(null)}
                  mode={mode}
                  user={user}
                  inMapContainer
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityFinder; 