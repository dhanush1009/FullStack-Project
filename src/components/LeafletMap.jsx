import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { allDistrictsShelters } from '../data/allShelters';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const shelterIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const nearestIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LeafletMap = ({ userLocation, selectedShelter, nearestShelter, onShelterClick }) => {
  const allShelters = allDistrictsShelters.flatMap(d => 
    d.shelters.map(s => ({ ...s, district: d.district }))
  );

  const center = userLocation || selectedShelter?.location || { lat: 11.5, lng: 79.5 };

  return (
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={userLocation ? 10 : 7} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Location */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <strong>Your Location</strong>
          </Popup>
        </Marker>
      )}

      {/* Danger Zone */}
      <Circle
        center={[11.73, 79.76]}
        radius={5000}
        pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
      />

      {/* Shelter Markers */}
      {allShelters.map(shelter => {
        const isNearest = nearestShelter?.id === shelter.id;
        return (
          <Marker
            key={shelter.id}
            position={[shelter.location.lat, shelter.location.lng]}
            icon={isNearest ? nearestIcon : shelterIcon}
            eventHandlers={{
              click: () => onShelterClick && onShelterClick(shelter)
            }}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                  {shelter.name}
                </h3>
                <p style={{ margin: '4px 0', fontSize: '13px' }}>
                  <strong>📍</strong> {shelter.address}
                </p>
                <p style={{ margin: '4px 0', fontSize: '13px' }}>
                  <strong>📞</strong> {shelter.phone}
                </p>
                <p style={{ margin: '4px 0', fontSize: '13px' }}>
                  <strong>📧</strong> {shelter.email}
                </p>
                {shelter.capacity && (
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>👥</strong> Capacity: {shelter.capacity}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default LeafletMap;
