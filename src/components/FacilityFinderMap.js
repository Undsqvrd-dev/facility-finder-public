import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import FilterPanel from "./FilterPanel";
import CompanyCard from "./CompanyCard";
const FacilityMap = dynamic(() => import("./FacilityMap"), { ssr: false });

const FacilityFinderMap = ({ mode = "public", user = null }) => {
  const [filters, setFilters] = useState({ type: "Alles", branche: "Alles" });
  const [facilities, setFacilities] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSelectCompany = (company) => setSelectedCompany(company);

  // Filter bedrijven
  const filteredFacilities = facilities.filter((facility) => {
    if (filters.type !== "Alles" && facility.type !== filters.type) return false;
    if (filters.branche !== "Alles" && facility.branche !== filters.branche) return false;
    return true;
  });

  // Alleen in public mode een vaste header en layout
  if (mode === "public") {
    return (
      <div className="flex flex-col h-screen w-full bg-background">
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
          <span className="text-2xl font-semibold">Facility Finder</span>
          <a href="https://www.undsqvrd.nl" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">
            Powered by UNDSQVRD
          </a>
        </header>
        <div className="flex flex-row h-full w-full pt-[60px]">
          <div className="w-full max-w-xs bg-white border-r p-4 overflow-y-auto">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} mode={mode} />
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2">Facilitaire bedrijven</h2>
              <div className="space-y-3">
                {filteredFacilities.length > 0 ? (
                  filteredFacilities.map((facility) => (
                    <CompanyCard
                      key={facility.id}
                      facility={facility}
                      selected={selectedCompany?.id === facility.id}
                      onClick={() => handleSelectCompany(facility)}
                      mode={mode}
                      user={user}
                    />
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">Geen resultaten gevonden</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <FacilityMap
              filters={filters}
              facilities={filteredFacilities}
              selectedCompany={selectedCompany}
              onSelectCompany={handleSelectCompany}
              mode={mode}
            />
          </div>
        </div>
      </div>
    );
  }

  // In platform mode: render de filterkolom sticky/fixed naast het dashboard-menu
  return (
    <>
      <div className="min-w-[260px] max-w-[400px] w-full md:w-[340px] p-6 pr-4 overflow-y-auto border-r border-gray-100 bg-transparent sticky top-0 h-screen">
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} mode={mode} />
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Facilitaire bedrijven</h2>
          <div className="space-y-3">
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility) => (
                <CompanyCard
                  key={facility.id}
                  facility={facility}
                  selected={selectedCompany?.id === facility.id}
                  onClick={() => handleSelectCompany(facility)}
                  mode={mode}
                  user={user}
                />
              ))
            ) : (
              <div className="text-gray-500 text-sm">Geen resultaten gevonden</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-[300px] max-w-full relative">
        <FacilityMap
          filters={filters}
          facilities={filteredFacilities}
          selectedCompany={selectedCompany}
          onSelectCompany={handleSelectCompany}
          mode={mode}
        />
      </div>
    </>
  );
};

export default FacilityFinderMap; 