import React, { useState, useEffect } from "react";
import CompanyPopup from "./CompanyPopup"; // Zorg dat dit component bestaat
import Image from 'next/image';

export default function Sidebar({ facilities = [], onFilterChange, onSelectCompany, selectedCompany, isOpen = true }) {
  const [selectedType, setSelectedType] = useState("Alles");
  const [selectedBranche, setSelectedBranche] = useState("Alles");

  useEffect(() => {
    console.log("✅ Sidebar geladen met bedrijven:", facilities);
  }, [facilities]);

  useEffect(() => {
    console.log("✅ Bedrijven met coördinaten:", facilities);
  }, [facilities]);
  
  // ✅ Type-filter wijzigen
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    if (onFilterChange) {
      onFilterChange({ type: e.target.value, branche: selectedBranche });
    }
  };

  // ✅ Branche-filter wijzigen
  const handleBrancheChange = (e) => {
    setSelectedBranche(e.target.value);
    if (onFilterChange) {
      onFilterChange({ type: selectedType, branche: e.target.value });
    }
  };

  // ✅ Reset alle filters
  const resetFilters = () => {
    setSelectedType("Alles");
    setSelectedBranche("Alles");
    if (onFilterChange) {
      onFilterChange({ type: "Alles", branche: "Alles" });
    }
  };

  // ✅ Handle bedrijf selectie
  const handleCompanyClick = (company) => {
    if (selectedCompany?.id === company.id) {
      // Als het bedrijf al geselecteerd is, deselecteer het
      onSelectCompany(null);
    } else {
      // Anders selecteer het nieuwe bedrijf
      onSelectCompany(company);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'is-open' : ''}`}>
      <div className="sidebar-content">
        <h2 className="text-xl font-bold mb-4">Facilitaire bedrijven</h2>
        
        {/* Filters */}
        <div className="mb-4">
          {/* Type organisatie */}
          <label className="text-sm font-medium">Type organisatie:</label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="Alles">Alles</option>
            <option value="Facilitair dienstverlener">Facilitair dienstverlener</option>
            <option value="Facilitaire afdeling">Facilitaire afdeling</option>
          </select>

          {/* Branche */}
          <label className="text-sm font-medium">Branche:</label>
          <select
            value={selectedBranche}
            onChange={handleBrancheChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="Alles">Alles</option>
            <option value="Industrie">Industrie</option>
            <option value="ICT">ICT</option>
            <option value="Vastgoed">Vastgoed</option>
            <option value="Zorg">Zorg</option>
            <option value="Workplace management">Workplace management</option>
            <option value="Onderwijs">Onderwijs</option>
            <option value="Overheid">Overheid</option>
            <option value="Retail">Retail</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Transport en logistiek">Transport en logistiek</option>
            <option value="Evenementen">Evenementen</option>
          </select>
        </div>

        {/* Nieuwe knop voor bedrijf toevoegen */}
        <button
          onClick={() => window.open('https://tally.so/r/nGb0vp', '_blank')}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-4 text-center"
        >
          Zet jouw bedrijf op de kaart!
        </button>

        {/* ✅ Lijst met bedrijven */}
        <div className="space-y-4">
          {facilities.length > 0 ? (
            facilities
              .filter((facility) => {
                if (selectedType !== "Alles" && facility.type !== selectedType) return false;
                if (selectedBranche !== "Alles" && facility.branche !== selectedBranche) return false;
                return true;
              })
              .map((facility) => (
              <div 
                key={facility.id}
                className={`cursor-pointer p-3 border rounded-lg flex items-center gap-3 transition-all ${
                  selectedCompany?.id === facility.id 
                    ? "border-blue-500 shadow-md bg-blue-50" 
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleCompanyClick(facility)}
              >
                {facility.logo && (
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={facility.logo}
                      alt={facility.naam}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = '/placeholder-logo.svg';
                      }}
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold">{facility.naam}</h4>
                  <p className="text-sm text-gray-600">{facility.type}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">Geen resultaten gevonden</div>
          )}
        </div>
      </div>
    </div>
  );
}