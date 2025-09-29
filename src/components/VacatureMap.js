import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from 'next/image';

const MapUpdater = ({ selectedVacature, onSelectVacature }) => {
  const map = useMap();
  const defaultCenter = [52.1326, 5.2913]; // Nederland centrum
  const overviewZoom = 8;
  const vacatureZoom = 16; // Hogere zoom voor betere detail weergave
  const prevVacatureRef = React.useRef(null);
  
  // Valideer default center
  const isValidCenter = Array.isArray(defaultCenter) && 
                       defaultCenter.length === 2 && 
                       isFinite(defaultCenter[0]) && 
                       isFinite(defaultCenter[1]);

  useEffect(() => {
    try {
      // Alleen als er een vacature geselecteerd wordt: zoom in
      if (selectedVacature && selectedVacature.lat && selectedVacature.lng) {
        const lat = parseFloat(selectedVacature.lat);
        const lng = parseFloat(selectedVacature.lng);
        
        // Alleen zoomen als coördinaten geldig zijn
        if (isFinite(lat) && isFinite(lng) && lat !== 0 && lng !== 0) {
          map.setView([lat, lng], vacatureZoom);
        }
      }
      
      // Alleen als een vacature wordt weggeklikt: zoom uit
      if (!selectedVacature && prevVacatureRef.current) {
        map.setView(defaultCenter, overviewZoom);
      }
      
      prevVacatureRef.current = selectedVacature;
    } catch (error) {
      console.error('MapUpdater error:', error);
      // Doe niets bij errors om crashes te voorkomen
    }
  }, [selectedVacature, map]);

  return null;
};

const VacatureMap = ({ 
  filters, 
  vacatures = [], 
  selectedVacature, 
  onSelectVacature, 
  onClick, 
  onDrag, 
  onZoom,
  hoveredVacature,
  onHoverVacature,
  onMapBoundsChange
}) => {
  const [mapZoom, setMapZoom] = useState(9);
  const [mapBounds, setMapBounds] = useState(null);
  const hoverTimeoutRef = React.useRef(null);

  // Verbeterde hover handlers met timeout om flicker te voorkomen
  const handleMarkerMouseOver = (vacature) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    onHoverVacature?.(vacature);
  };

  const handleMarkerMouseOut = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set timeout to clear hover after a short delay
    hoverTimeoutRef.current = setTimeout(() => {
      onHoverVacature?.(null);
    }, 100); // 100ms delay om flicker te voorkomen
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const getMarkerSize = (zoom, isSelected, isHovered) => {
    let baseSize;
    if (zoom <= 6) {
      baseSize = [25, 20]; // Kleinste markers op zeer lage zoom levels
    } else if (zoom <= 7) {
      baseSize = [30, 25]; // Kleine markers op lage zoom levels
    } else if (zoom <= 9) {
      baseSize = [45, 38]; // Middelgroot op medium zoom levels
    } else {
      baseSize = [60, 50]; // Normale grootte op hoge zoom levels
    }

    if (isSelected) {
      return [baseSize[0] * 1.7, baseSize[1] * 1.7];
    }
    if (isHovered) {
      return [baseSize[0] * 1.3, baseSize[1] * 1.3];
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

  // Definieer de grenzen voor Nederland en omgeving
  const bounds = [
    [49.0, -2.0], // Zuidwestelijke grens
    [56.0, 12.0], // Noordoostelijke grens
  ];

  const handleZoomEnd = (e) => {
    setMapZoom(e.target.getZoom());
    updateMapBounds(e.target);
    onZoom?.();
  };

  const handleMoveEnd = (e) => {
    updateMapBounds(e.target);
  };

  const updateMapBounds = (map) => {
    const bounds = map.getBounds();
    const newBounds = {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest()
    };
    setMapBounds(newBounds);
    onMapBoundsChange?.(newBounds);
  };

  const filteredVacatures = vacatures.filter((vacature) => {
    // Filter op basis van form filters
    if (filters.locatie && vacature.locatie !== filters.locatie) return false;
    if (filters.niveau && vacature.niveau !== filters.niveau) return false;
    if (filters.contract && vacature.contract !== filters.contract) return false;
    if (filters.type && vacature.type !== filters.type) return false;
    
    // Filter op basis van kaart bounds (als beschikbaar)
    if (mapBounds && vacature.lat && vacature.lng) {
      const lat = parseFloat(vacature.lat);
      const lng = parseFloat(vacature.lng);
      
      if (isNaN(lat) || isNaN(lng) || 
          lat < mapBounds.south || lat > mapBounds.north || 
          lng < mapBounds.west || lng > mapBounds.east) {
        return false;
      }
    }
    
    return true;
  });

  const handleMarkerClick = (vacature) => {
    if (selectedVacature?.id === vacature.id) {
      onSelectVacature(null);
    } else {
      onSelectVacature(vacature);
    }
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg relative">
      <MapContainer
        center={[52.1326, 5.2913]}
        zoom={8}
        minZoom={6}
        maxBounds={bounds}
        maxBoundsViscosity={0.8}
        className="h-full w-full z-0"
        onClick={() => {
          onClick?.();
          onSelectVacature(null);
        }}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        zoomControl={true}
        zoomDelta={1}
        wheelDebounceTime={100}
              eventHandlers={{
        zoomend: handleZoomEnd,
        moveend: handleMoveEnd,
        dragstart: onDrag,
        dragend: onDrag
      }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />

        {filteredVacatures.map((vacature) => {
          // Alleen vacatures met geldige coördinaten tonen
          const lat = parseFloat(vacature.lat);
          const lng = parseFloat(vacature.lng);
          if (!vacature.lat || !vacature.lng || isNaN(lat) || isNaN(lng)) {
            return null;
          }

          const isSelected = selectedVacature?.id === vacature.id;
          const isHovered = hoveredVacature?.id === vacature.id;
          const [width, height] = getMarkerSize(mapZoom, isSelected, isHovered);
          
          const markerHtml = `
            <div style="
              background: white;
              border-radius: 8px;
              box-shadow: ${isHovered ? '0 4px 12px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.15)'};
              width: ${width}px;
              height: ${height}px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px;
              border: 2px solid ${isSelected ? '#8B5CF6' : isHovered ? '#A855F7' : '#E5E7EB'};
              transition: all 0.2s ease;
            ">
              <div style="
                background: #F8FAFC;
                border-radius: 6px;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                position: relative;
              ">
                ${vacature.logo ? `
                  <img 
                    src="${vacature.logo}" 
                    alt="${vacature.bedrijfsnaam || 'Bedrijf'} logo"
                    style="
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                    "
                    onerror="
                      this.style.display='none';
                      this.nextElementSibling.style.display='flex';
                    "
                  />
                  <div style="
                    display: none;
                    background: linear-gradient(135deg, #8B5CF6, #3B82F6);
                    color: white;
                    font-weight: bold;
                    font-size: ${width > 40 ? '12px' : '10px'};
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: center;
                  ">
                    ${(vacature.bedrijfsnaam || 'B').charAt(0).toUpperCase()}
                  </div>
                ` : `
                  <div style="
                    background: linear-gradient(135deg, #8B5CF6, #3B82F6);
                    color: white;
                    font-weight: bold;
                    font-size: ${width > 40 ? '12px' : '10px'};
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    ${(vacature.bedrijfsnaam || 'B').charAt(0).toUpperCase()}
                  </div>
                `}
              </div>
            </div>
          `;

          return (
            <Marker
              key={vacature.id}
              position={[lat, lng]}
              eventHandlers={{
                click: () => handleMarkerClick(vacature),
                mouseover: () => handleMarkerMouseOver(vacature),
                mouseout: () => handleMarkerMouseOut()
              }}
              icon={L.divIcon({
                className: 'custom-vacature-marker',
                iconSize: [width, height],
                iconAnchor: [width / 2, height],
                html: markerHtml
              })}
            />
          );
        })}

        <MapUpdater selectedVacature={selectedVacature} onSelectVacature={onSelectVacature} />
      </MapContainer>
      
      {/* Disclaimer rechtsboven */}
      <div className="absolute top-4 right-4 z-10 max-w-xs sm:max-w-sm">
        <div className="bg-white bg-opacity-80 text-gray-700 text-xs px-2 py-2 rounded-md shadow-sm border border-gray-200 leading-relaxed sm:text-sm sm:px-3">
          ⚙️ <span className="font-medium">Kleine disclaimer:</span> de pin op de kaart is een benadering. De plaats klopt, maar de precieze locatie nog niet helemaal.
        </div>
      </div>
    </div>
  );
};

export default VacatureMap;
