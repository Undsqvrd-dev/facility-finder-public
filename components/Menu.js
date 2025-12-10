import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const menuItems = [
  {
    id: "organisaties",
    label: "Organisaties",
    icon: "🏢",
    href: "/",
    enabled: true
  },
  {
    id: "marketplace",
    label: "Facility Marketplace",
    icon: "🤝",
    href: "/fm-marketplace",
    enabled: true
  },
  {
    id: "vacatures",
    label: "Vacatures",
    icon: "💼",
    href: "/vacatures",
    badge: true,
    enabled: true
  },
  {
    id: "jobcoaching",
    label: "Jobcoaching",
    icon: "🎯",
    href: "/jobcoaching",
    enabled: false
  },
  {
    id: "matching",
    label: "Wat past bij mij?",
    icon: "🤔",
    href: "/matching",
    enabled: false
  }
];

export default function Menu({ isOpen = true, onToggle, vacatureCount = 0, onShowOrganisaties }) {
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  const handleOrganisatiesClick = (e) => {
    e.preventDefault();
    if (onShowOrganisaties) {
      onShowOrganisaties();
    }
  };

  return (
    <div className={`facility-menu ${isOpen ? 'is-open' : ''}`}>
      <div className="facility-menu-header" style={{ padding: '16px 20px' }}>
        {/* Verwijderd: Facility Finder titel en subtitle */}
      </div>

      <nav className="facility-menu-nav">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          
          // Special handling voor Organisaties
          if (item.id === "organisaties") {
            return (
              <button
                key={item.id}
                className={`facility-menu-item ${active ? 'facility-menu-item-active' : ''}`}
                onClick={handleOrganisatiesClick}
              >
                <span className="facility-menu-icon">{item.icon}</span>
                <span className="facility-menu-label">{item.label}</span>
              </button>
            );
          }
          
          if (!item.enabled) {
            return (
              <div 
                key={item.id}
                className="facility-menu-item facility-menu-item-disabled"
              >
                <span className="facility-menu-icon">{item.icon}</span>
                <span className="facility-menu-label">{item.label}</span>
                {item.badge && vacatureCount > 0 && (
                  <span className="facility-menu-badge">{vacatureCount}</span>
                )}
              </div>
            );
          }
          
          return (
            <Link 
              href={item.href} 
              key={item.id}
              className={`facility-menu-item ${active ? 'facility-menu-item-active' : ''}`}
              onClick={() => {
                if (window.innerWidth <= 768 && onToggle) {
                  onToggle();
                }
              }}
            >
              <span className="facility-menu-icon">{item.icon}</span>
              <span className="facility-menu-label">{item.label}</span>
              {item.badge && vacatureCount > 0 && (
                <span className="facility-menu-badge">{vacatureCount}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="facility-menu-footer">
        <button
          onClick={() => window.open('https://tally.so/r/nGb0vp', '_blank')}
          className="facility-menu-cta"
        >
          Zet jouw bedrijf op de kaart!
        </button>
        
        <div className="facility-menu-links">
          <span className="facility-menu-link facility-menu-link-disabled">
            Over de Facility Finder
          </span>
        </div>
      </div>
    </div>
  );
}
