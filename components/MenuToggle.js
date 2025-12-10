import React from "react";

export default function MenuToggle({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="facility-menu-toggle"
      aria-label={isOpen ? "Sluit menu" : "Open menu"}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </>
        )}
      </svg>
    </button>
  );
}

