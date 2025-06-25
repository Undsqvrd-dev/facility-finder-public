import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const facilities = [
  { name: "Flexim", lat: 52.3702, lng: 4.8952 },
  { name: "BAM", lat: 51.9225, lng: 4.47917 },
  { name: "Facilicom", lat: 52.0705, lng: 4.3007 },
  { name: "Heyday", lat: 51.4416, lng: 5.4697 },
  { name: "Bijzaak", lat: 51.5719, lng: 4.7683 },
];

const MapClient = () => {
  return (
    <MapContainer center={[52.3676, 4.9041]} zoom={7} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {facilities.map((facility, index) => (
        <Marker key={index} position={[facility.lat, facility.lng]}>
          <Popup>{facility.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapClient;