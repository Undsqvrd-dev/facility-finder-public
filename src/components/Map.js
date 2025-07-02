import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from 'next/image';

const MapUpdater = ({ selectedCompany, onSelectCompany }) => {
  const map = useMap();
  const defaultCenter = [52.1326, 5.2913];
  const overviewZoom = 9;
  const companyZoom = 14;
  const prevCompanyRef = React.useRef(null);

  useEffect(() => {
    // Alleen als er een bedrijf geselecteerd wordt: zoom in
    if (selectedCompany && selectedCompany.lat && selectedCompany.lng) {
      map.flyTo([selectedCompany.lat, selectedCompany.lng], companyZoom, {
        animate: true,
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
    // Alleen als een bedrijf wordt weggeklikt (van geselecteerd naar null): zoom uit
    if (!selectedCompany && prevCompanyRef.current) {
      map.flyTo(defaultCenter, overviewZoom, {
        animate: true,
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
    prevCompanyRef.current = selectedCompany;
  }, [selectedCompany, map]);

  // Reset selectie wanneer er wordt uitgezoomd (optioneel, kan je ook verwijderen)
  useEffect(() => {
    const handleZoomEnd = () => {
      // Geen automatische reset meer
    };
    map.on('zoomend', handleZoomEnd);
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map]);

  return null;
};

const Map = ({ 
  filters, 
  facilities = [], 
  selectedCompany, 
  onSelectCompany, 
  onClick, 
  onDrag, 
  onZoom,
  mode = "public"
}) => {
  const [mapZoom, setMapZoom] = useState(9);

  const getMarkerSize = (zoom, isSelected) => {
    let baseSize;
    if (zoom <= 7) {
      baseSize = [30, 25]; // Veel kleiner op lage zoom levels
    } else if (zoom <= 9) {
      baseSize = [45, 38]; // Middelgroot op medium zoom levels
    } else {
      baseSize = [60, 50]; // Kleiner dan voorheen op hoge zoom levels
    }

    // Maak de marker 70% groter als deze geselecteerd is
    if (isSelected) {
      return [baseSize[0] * 1.7, baseSize[1] * 1.7];
    }
    return baseSize;
  };

  useEffect(() => {
    // Verwijder de oude icon URL
    delete L.Icon.Default.prototype._getIconUrl;
    
    // Configureer de nieuwe icon URLs
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }, []);

  // Definieer de grenzen van Nederland met extra marge
  const bounds = [
    [45.0, -5.0], // Veel zuidelijker en westelijker (inclusief groot deel van West-Europa)
    [58.0, 15.0], // Veel noordelijker en oostelijker
  ];

  const handleZoomEnd = (e) => {
    setMapZoom(e.target.getZoom());
    console.log("Current zoom:", e.target.getZoom());
    onZoom?.();
  };

  const filteredFacilities = facilities.filter((facility) => {
    if (filters.type !== "Alles" && facility.type !== filters.type) return false;
    if (filters.branche !== "Alles" && facility.branche !== filters.branche) return false;
    return true;
  });

  const handleMarkerClick = (company) => {
    if (selectedCompany?.id === company.id) {
      onSelectCompany(null);
    } else {
      onSelectCompany(company);
    }
  };

  return (
    <MapContainer
      center={[52.1326, 5.2913]}
      zoom={9}
      minZoom={3}
      className="h-full w-full z-0"
      onClick={() => {
        onClick?.();
      }}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      dragging={true}
      zoomControl={true}
      zoomDelta={1}
      wheelDebounceTime={100}
      eventHandlers={{
        zoomend: handleZoomEnd,
        dragstart: onDrag,
        dragend: onDrag
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        maxZoom={19}
      />

      {filteredFacilities.map((company) => {
        const isSelected = selectedCompany?.id === company.id;
        const [width, height] = getMarkerSize(mapZoom, isSelected);
        const totalHeight = height + 0; // geen extra padding
        const markerHtml = `
          <div style="
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.12);
            width: ${width}px;
            height: ${height}px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          ">
            <img src='${company.logo}' alt='${company.naam}' style="width: 90%; height: 90%; object-fit: contain; display: block;" onerror="this.src='/placeholder-logo.svg'" />
          </div>
        `;
        return (
          <Marker
            key={company.id}
            position={[company.lat || 52.3702, company.lng || 4.8952]}
            eventHandlers={{
              click: () => handleMarkerClick(company)
            }}
            icon={L.divIcon({
              className: 'custom-marker',
              iconSize: [width, height],
              iconAnchor: [width / 2, height],
              html: markerHtml
            })}
          >
            {mode === "platform" && (
              <Tooltip permanent={isSelected}>
                <div className="text-sm font-medium">
                  {company.naam}
                  {isSelected && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Match: 85%
                    </span>
                  )}
                </div>
              </Tooltip>
            )}
          </Marker>
        );
      })}

      <MapUpdater selectedCompany={selectedCompany} onSelectCompany={onSelectCompany} />
    </MapContainer>
  );
};

export default Map;
