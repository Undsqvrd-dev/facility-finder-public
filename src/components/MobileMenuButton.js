import React from 'react';

const MobileMenuButton = ({ isOpen, onClick }) => {
  // Dynamische left-waarde: 12px naast de sidebar (sidebar is 85vw of max 300px)
  const sidebarWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.85, 300) : 300;
  const left = isOpen
    ? `calc(min(85vw, 300px) + 12px)`
    : '12px';

  return (
    <button
      className={`fixed top-[80px] z-50 bg-white p-3 rounded-full shadow-lg lg:hidden transition-all duration-300 mobile-menu-button`}
      style={{
        left,
        transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
      onClick={onClick}
      aria-label={isOpen ? 'Sluit menu' : 'Open menu'}
    >
      <svg
        className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};

export default MobileMenuButton; 