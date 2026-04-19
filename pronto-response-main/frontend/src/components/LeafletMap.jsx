import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { allDistrictsShelters } from '../data/allShelters';

// Fix for default marker icons (only once)
if (typeof window !== 'undefined' && L.Icon.Default.prototype._getIconUrl) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

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
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const allShelters = allDistrictsShelters.flatMap(d =>
    d.shelters.map(s => ({ ...s, district: d.district }))
  );

  const center = userLocation || selectedShelter?.location || { lat: 11.5, lng: 79.5 };

  useEffect(() => {
    // ✅ Remove existing map instance before creating a new one
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // ✅ Initialize map with better initial zoom
    const map = L.map(mapRef.current).setView([center.lat, center.lng], userLocation ? 12 : 8);
    mapInstanceRef.current = map;

    // ✅ Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // ✅ Add user location marker
    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .bindPopup('<div class="text-center"><strong>Your Location</strong></div>')
        .addTo(map);
      markersRef.current.user = userMarker;

      // Auto-zoom to user location with some padding
      setTimeout(() => {
        map.setView([userLocation.lat, userLocation.lng], 12);
      }, 100);
    }

    // ✅ Add danger zone circle
    const dangerZone = L.circle([11.73, 79.76], {
      radius: 5000,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.2
    }).addTo(map);

    // ✅ Add shelter markers
    allShelters.forEach(shelter => {
      const isNearest = nearestShelter?.uniqueId === shelter.uniqueId;
      const markerIcon = isNearest ? nearestIcon : shelterIcon;

      const shelterMarker = L.marker([shelter.location.lat, shelter.location.lng], { icon: markerIcon })
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${shelter.name}</h3>
            <p style="margin: 4px 0; font-size: 13px;"><strong>📍</strong> ${shelter.address}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>📞</strong> ${shelter.phone}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>📧</strong> ${shelter.email}</p>
            ${shelter.capacity ? `<p style="margin: 4px 0; font-size: 13px;"><strong>👥</strong> Capacity: ${shelter.capacity}</p>` : ''}
          </div>
        `)
        .addTo(map);

      shelterMarker.on('click', () => {
        onShelterClick && onShelterClick(shelter);
      });

      markersRef.current[`shelter-${shelter.uniqueId}`] = shelterMarker;
    });

    // ✅ Simplified approach - no auto-zoom to avoid DOM issues
    // Map will use the initial zoom level and users can zoom manually

    // ✅ Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, userLocation, nearestShelter]);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "10px",
      }}
    ></div>
  );
};

export default LeafletMap;
