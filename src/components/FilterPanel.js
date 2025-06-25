import React from "react";

const FilterPanel = ({ filters, onFilterChange, mode }) => {
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
        <option value="Facilitair dienstverlener">Facilitair dienstverlener</option>
        <option value="Facilitaire afdeling">Facilitaire afdeling</option>
      </select>
      {/* Branche */}
      <label className="text-sm font-medium">Branche:</label>
      <select
        value={filters.branche}
        onChange={e => onFilterChange({ ...filters, branche: e.target.value })}
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