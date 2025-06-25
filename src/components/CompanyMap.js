import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function CompanyMap({ naam, lat, lng, logo }) {
  useEffect(() => {
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

  return (
    <MapContainer
      center={[lat || 52.1326, lng || 5.2913]}
      zoom={15}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      className="h-96 w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />
      <Marker
        position={[lat || 52.1326, lng || 5.2913]}
        icon={L.divIcon({
          className: 'custom-marker',
          iconSize: [50, 42],
          iconAnchor: [25, 42],
          html: `<div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.12); width: 50px; height: 42px; display: flex; align-items: center; justify-content: center;"><img src='${logo}' alt='${naam}' style="width: 90%; height: 90%; object-fit: contain; display: block;" onerror="this.src='/placeholder-logo.svg'" /></div>`
        })}
      />
    </MapContainer>
  );
} 