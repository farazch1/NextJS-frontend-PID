"use client";
import React, { useEffect } from 'react';
import Layout from "@/app/components/layout"; // Ensure the path to Layout is correct
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marker icons setup to avoid issues with default icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Define data for rivers and barrages
const riverLocations = [
  { name: "River Indus", position: [30.3753, 69.3451] },
  { name: "Chenab River", position: [32.293, 73.736] },
  { name: "Jhelum River", position: [33.7667, 73.0833] },
];

const barrageLocations = [
  { name: "Guddu Barrage", position: [28.4277, 69.7046] },
  { name: "Sukkur Barrage", position: [27.6904, 68.8697] },
  { name: "Taunsa Barrage", position: [30.5209, 70.8674] },
];

export default function Map() {
  return (
    <Layout>
      <h2>Water Bodies Overview</h2><br />
      <MapContainer center={[30.3753, 69.3451]} zoom={6} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Rivers Markers */}
        {riverLocations.map((river, index) => (
          <Marker key={index} position={river.position}>
            <Popup>{river.name}</Popup>
          </Marker>
        ))}

        {/* Barrages Markers */}
        {barrageLocations.map((barrage, index) => (
          <Marker key={index} position={barrage.position}>
            <Popup>{barrage.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <h2>Insights and Recommendations</h2>
      <ul>
        <li><strong>Key Rivers:</strong> Important rivers like the Indus, Chenab, and Jhelum are displayed for easy identification.</li>
        <li><strong>Notable Barrages:</strong> Key barrages like Guddu, Sukkur, and Taunsa are marked, providing quick access to information and locations.</li>
        <li><strong>Actionable Insights:</strong> Use this map to analyze water distribution across rivers and assess the impact of various barrages on water flow.</li>
      </ul>
    </Layout>
  );
}