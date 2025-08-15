import React from "react";

const FilterPanel = ({ filters, onFilterChange, mode, facilities = [] }) => {
  // Haal alle unieke branches op uit de data
  const getAllBranches = () => {
    const branches = new Set();
    facilities.forEach(facility => {
      if (facility.branche) {
        // Split branches op komma's en voeg elke individuele branche toe
        const facilityBranches = facility.branche.split(',').map(b => b.trim());
        facilityBranches.forEach(branch => {
          if (branch && branch !== "Onbekend" && branch !== "Alles") {
            branches.add(branch);
          }
        });
      }
    });
    return Array.from(branches).sort();
  };

  // Haal alle unieke types op uit de data
  const getAllTypes = () => {
    const types = new Set();
    facilities.forEach(facility => {
      if (facility.type && facility.type !== "Onbekend") {
        types.add(facility.type);
      }
    });
    return Array.from(types).sort();
  };

  const allBranches = getAllBranches();
  const allTypes = getAllTypes();

  return (
    <div className="mb-4">
      {/* Type organisatie */}
      <label className="text-sm font-medium">Type organisatie:</label>
      <select
        value={filters.type}
        onChange={e => onFilterChange({ ...filters, type: e.target.value })}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="Alles">Alles</option>
        {allTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      {/* Branche */}
      <label className="text-sm font-medium">Branche:</label>
      <select
        value={filters.branche}
        onChange={e => onFilterChange({ ...filters, branche: e.target.value })}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="Alles">Alles</option>
        {allBranches.map(branche => (
          <option key={branche} value={branche}>{branche}</option>
        ))}
      </select>
      {/* Extra filters (zoals vacatures) kunnen hier worden toegevoegd indien nodig */}
      {mode === "platform" && (
        <>
          {/* Voorbeeld: Vacature filter */}
          <label className="text-sm font-medium">Vacatures:</label>
          <select className="w-full p-2 border rounded-md mb-4">
            <option value="Alles">Alles</option>
            <option value="Full-time baan">Full-time baan</option>
            <option value="Stage">Stage</option>
          </select>
        </>
      )}
    </div>
  );
};

export default FilterPanel; 