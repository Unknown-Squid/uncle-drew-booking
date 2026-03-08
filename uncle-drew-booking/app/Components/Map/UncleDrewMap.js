'use client'; // If using Next.js App Router

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon path (optional for default icon)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const UncleDrewMap = () => {
  return (
    <div className="w-full h-full bg-black">
      <MapContainer
        center={[14.3358132, 120.9037974]} // Example: Manila
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}           // Disable the zoom +/- buttons
        scrollWheelZoom={false}       // Disable scroll wheel zoom
        dragging={false}              // Disable dragging/panning
        doubleClickZoom={false}       // Disable zoom on double click
        touchZoom={false}             // Disable touch-based zoom
        boxZoom={false}               // Disable box zoom
        keyboard={false}              // Disable keyboard interactions
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[14.3358132, 120.9037974]}>
          <Popup>
            Uncle Drew Sports Center
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default UncleDrewMap