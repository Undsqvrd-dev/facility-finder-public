import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapUpdater = ({ selectedCompany, onSelectCompany }) => {
  const map = useMap();
  const defaultCenter = [52.1326, 5.2913];
  const defaultZoom = 9;

  React.useEffect(() => {
    if (selectedCompany && selectedCompany.lat && selectedCompany.lng) {
      map.flyTo([selectedCompany.lat, selectedCompany.lng], 17, {
        animate: true,
        duration: 1.2,
        easeLinearity: 0.25,
      });
    } else {
      map.flyTo(defaultCenter, defaultZoom, {
        animate: true,
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [selectedCompany, map]);

  React.useEffect(() => {
    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      if (currentZoom <= defaultZoom && selectedCompany) {
        onSelectCompany(null);
      }
    };
    map.on('zoomend', handleZoomEnd);
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, selectedCompany, onSelectCompany]);

  return null;
};

const FacilityMap = ({ filters, facilities = [], selectedCompany, onSelectCompany, mode = "public" }) => {
  const [mapZoom, setMapZoom] = useState(9);

  const getMarkerSize = (zoom, isSelected) => {
    let baseSize;
    if (zoom <= 7) baseSize = [30, 25];
    else if (zoom <= 9) baseSize = [45, 38];
    else baseSize = [60, 50];
    if (isSelected) return [baseSize[0] * 1.7, baseSize[1] * 1.7];
    return baseSize;
  };

  React.useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
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

  const bounds = [
    [50.75, 3.2],
    [53.7, 7.22],
  ];

  const handleZoomEnd = (e) => {
    setMapZoom(e.target.getZoom());
  };

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
      minZoom={9}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      className="h-full w-full z-0"
      scrollWheelZoom={true}
      doubleClickZoom={true}
      dragging={true}
      zoomControl={true}
      zoomDelta={1}
      wheelDebounceTime={100}
      eventHandlers={{
        zoomend: handleZoomEnd
      }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />
      {facilities.map((company) => {
        const isSelected = selectedCompany?.id === company.id;
        const [width, height] = getMarkerSize(mapZoom, isSelected);
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

export default FacilityMap; 