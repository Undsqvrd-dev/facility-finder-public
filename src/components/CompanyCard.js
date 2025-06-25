import React from "react";

const CompanyCard = ({ facility, selected, onClick, mode, user }) => (
  <div
    className={`cursor-pointer p-3 border rounded-lg flex items-center gap-3 transition-all ${
      selected ? "border-blue-500 shadow-md bg-blue-50" : "border-gray-200 hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    {facility.logo && (
      <div className="w-12 h-12 flex-shrink-0">
        <img
          src={facility.logo}
          alt={facility.naam}
          className="w-full h-full object-contain"
          onError={e => {
            e.target.src = '/placeholder-logo.svg';
          }}
        />
      </div>
    )}
    <div>
      <h4 className="font-semibold">{facility.naam}</h4>
      <p className="text-sm text-gray-600">{facility.type}</p>
      {mode === "platform" && user && (
        <div className="mt-1">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            Match: 85%
          </span>
        </div>
      )}
    </div>
  </div>
);

export default CompanyCard; 