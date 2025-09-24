import React, { useState } from 'react';

const SidebarToggle = ({ isOpen, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className={`fixed z-50 bg-white border border-gray-300 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-gray-50 group ${
          isOpen 
            ? 'left-[300px] rounded-l-md border-r-0' // Aan de rechterkant van de sidebar
            : 'left-0 rounded-r-md border-l-0' // Aan de linkerkant van het scherm
        } w-6 h-16 sm:w-8 sm:h-20 md:w-8 md:h-24 flex items-center justify-center`}
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isOpen ? 'Sluit lijst' : 'Open lijst'}
      >
        {/* Chevron Icon */}
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform duration-300 ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>

      </button>

      {/* Tooltip - alleen op desktop */}
      {showTooltip && (
        <div
          className={`hidden lg:block absolute top-1/2 -translate-y-1/2 z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap transition-opacity duration-200 ${
            isOpen 
              ? 'right-full mr-2' // Links van de knop als sidebar open is
              : 'left-full ml-2' // Rechts van de knop als sidebar gesloten is
          }`}
        >
          {isOpen ? 'Sluit lijst' : 'Open lijst'}
          {/* Tooltip pijl */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 ${
              isOpen
                ? 'right-0 translate-x-full border-l-4 border-l-gray-800 border-y-4 border-y-transparent'
                : 'left-0 -translate-x-full border-r-4 border-r-gray-800 border-y-4 border-y-transparent'
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SidebarToggle;
