import React, { useState, useEffect, useRef } from "react";
import { allDistrictsShelters } from "../data/allShelters";
import { MapPin, Phone, Mail, Navigation, Copy, AlertTriangle, Shield, Users, Menu, X } from "lucide-react";
import LeafletMap from "./LeafletMap";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const GOOGLE_MAPS_API_KEY = "AIzaSyAL5nY5TEJ-6R4y5v3LKLeUqMtauEE7Iy8";

// District & shelter data
const districtsData = [
  {
    district: "Chennai",
    shelters: [
      {
        id: 1,
        name: "Chennai Corporation Shelter",
        address: "123 Anna Salai, Chennai",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 13.0635, lng: 80.2297 },
        capacity: "500 people",
        amenities: ["Medical Aid", "Food", "Water"]
      },
      {
        id: 2,
        name: "Red Cross Relief Center",
        address: "45 Gandhi Nagar, Chennai",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 13.0856, lng: 80.2484 },
        capacity: "300 people",
        amenities: ["Medical Aid", "Food", "Clothing"]
      },
      {
        id: 3,
        name: "Govt. School Shelter",
        address: "K.K. Nagar, Chennai",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 13.0392, lng: 80.2126 },
        capacity: "400 people",
        amenities: ["Food", "Water", "Sanitation"]
      },
      {
        id: 4,
        name: "Community Hall Shelter",
        address: "Perambur, Chennai",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 13.1131, lng: 80.2214 },
        capacity: "250 people",
        amenities: ["Food", "Water"]
      },
      {
        id: 5,
        name: "College Auditorium Shelter",
        address: "T. Nagar, Chennai",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 13.0418, lng: 80.2333 },
        capacity: "600 people",
        amenities: ["Medical Aid", "Food", "Water", "Security"]
      },
    ],
  },
  {
    district: "Cuddalore",
    shelters: [
      {
        id: 6,
        name: "Cuddalore Relief Camp 1",
        address: "Silver Beach Road, Cuddalore",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 11.7361, lng: 79.7686 },
        capacity: "350 people",
        amenities: ["Medical Aid", "Food", "Water"]
      },
      {
        id: 7,
        name: "Cuddalore Relief Camp 2",
        address: "Old Town Hall, Cuddalore",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 11.746, lng: 79.764 },
        capacity: "200 people",
        amenities: ["Food", "Water"]
      },
      {
        id: 8,
        name: "Cuddalore Govt. School Shelter",
        address: "Main Road, Cuddalore",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 11.75, lng: 79.76 },
        capacity: "450 people",
        amenities: ["Medical Aid", "Food", "Water", "Sanitation"]
      },
      {
        id: 9,
        name: "Seashore Relief Camp",
        address: "Beach Road, Cuddalore",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 11.73, lng: 79.77 },
        capacity: "180 people",
        amenities: ["Food", "Water"]
      },
      {
        id: 10,
        name: "Cyclone Relief Center",
        address: "Port Area, Cuddalore",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 11.735, lng: 79.765 },
        capacity: "320 people",
        amenities: ["Medical Aid", "Food", "Water", "Security"]
      },
    ],
  },
  {
    district: "Nagapattinam",
    shelters: [
      {
        id: 11,
        name: "Nagapattinam Relief Camp 1",
        address: "Harbor Road, Nagapattinam",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 10.763, lng: 79.843 },
        capacity: "400 people",
        amenities: ["Medical Aid", "Food", "Water"]
      },
      {
        id: 12,
        name: "Nagapattinam Relief Camp 2",
        address: "Town Hall, Nagapattinam",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 10.765, lng: 79.84 },
        capacity: "280 people",
        amenities: ["Food", "Water", "Clothing"]
      },
      {
        id: 13,
        name: "Govt. School Shelter",
        address: "Main Road, Nagapattinam",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 10.76, lng: 79.85 },
        capacity: "500 people",
        amenities: ["Medical Aid", "Food", "Water", "Sanitation"]
      },
      {
        id: 14,
        name: "Fishing Village Relief",
        address: "Coastline, Nagapattinam",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 10.77, lng: 79.84 },
        capacity: "150 people",
        amenities: ["Food", "Water"]
      },
      {
        id: 15,
        name: "Cyclone Shelter",
        address: "Seashore Road, Nagapattinam",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 10.758, lng: 79.842 },
        capacity: "380 people",
        amenities: ["Medical Aid", "Food", "Water", "Security"]
      },
    ],
  },
  {
    district: "Thoothukudi",
    shelters: [
      {
        id: 16,
        name: "Thoothukudi Relief Camp 1",
        address: "Beach Road, Thoothukudi",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.805, lng: 78.15 },
        capacity: "350 people",
        amenities: ["Medical Aid", "Food", "Water"]
      },
      {
        id: 17,
        name: "Thoothukudi Relief Camp 2",
        address: "Old Harbor Area, Thoothukudi",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.81, lng: 78.145 },
        capacity: "220 people",
        amenities: ["Food", "Water", "Clothing"]
      },
      {
        id: 18,
        name: "Govt. College Shelter",
        address: "Main Street, Thoothukudi",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.808, lng: 78.14 },
        capacity: "480 people",
        amenities: ["Medical Aid", "Food", "Water", "Sanitation"]
      },
      {
        id: 19,
        name: "Fishing Community Relief",
        address: "Seashore, Thoothukudi",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.806, lng: 78.15 },
        capacity: "160 people",
        amenities: ["Food", "Water"]
      },
      {
        id: 20,
        name: "Cyclone Safe Shelter",
        address: "Coastline Road, Thoothukudi",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.804, lng: 78.142 },
        capacity: "300 people",
        amenities: ["Medical Aid", "Food", "Water", "Security"]
      },
    ],
  },
  {
    district: "Kanyakumari",
    shelters: [
      {
        id: 21,
        name: "Kanyakumari Relief Camp 1",
        address: "Near Beach, Kanyakumari",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.0883, lng: 77.5385 },
        capacity: "400 people",
        amenities: ["Medical Aid", "Food", "Water"]
      },
      {
        id: 22,
        name: "Kanyakumari Relief Camp 2",
        address: "Town Hall, Kanyakumari",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.09, lng: 77.54 },
        capacity: "250 people",
        amenities: ["Food", "Water", "Clothing"]
      },
      {
        id: 23,
        name: "Govt. School Shelter",
        address: "Main Road, Kanyakumari",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.085, lng: 77.54 },
        capacity: "500 people",
        amenities: ["Medical Aid", "Food", "Water", "Sanitation"]
      },
      {
        id: 24,
        name: "Cyclone Shelter",
        address: "Seashore Road, Kanyakumari",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.083, lng: 77.537 },
        capacity: "350 people",
        amenities: ["Medical Aid", "Food", "Water", "Security"]
      },
      {
        id: 25,
        name: "Fishing Village Relief",
        address: "Harbor Side, Kanyakumari",
        phone: "+91 7339486437",
        email: "aravinthl266@gmail.com",
        location: { lat: 8.087, lng: 77.536 },
        capacity: "180 people",
        amenities: ["Food", "Water"]
      },
    ],
  },
];

// Compact Shelter Card Component for Sidebar
const CompactShelterCard = ({ shelter, distance, userLocation, isSelected, onClick }) => {
  const [copied, setCopied] = useState(false);

  const copyNumber = () => {
    navigator.clipboard
      .writeText(shelter.phone)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Failed to copy number."));
  };

  const startDirections = () => {
    if (!userLocation) {
      alert("User location not available yet.");
      return;
    }
    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${shelter.location.lat},${shelter.location.lng}`;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
      "_blank"
    );
  };

  return (
    <div 
      onClick={onClick}
      className={`p-4 mb-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
      }`}
    >
      <h3 className="font-semibold text-gray-900 mb-1">{shelter.name}</h3>
      <p className="text-sm text-gray-600 mb-2 flex items-center">
        <MapPin size={12} className="mr-1" />
        {shelter.address}
      </p>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Phone size={12} className="mr-1 text-orange-500" />
        <span>{shelter.phone}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <Mail size={12} className="mr-1 text-blue-500" />
        <span>{shelter.email}</span>
      </div>
      {distance !== null && (
        <div className="text-sm font-semibold text-blue-600 mb-3">
          Distance: {distance.toFixed(2)} km
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyNumber();
          }}
          className={`px-3 py-1 text-xs rounded text- font-medium ${
            copied ? "bg-green-500" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {copied ? "Copied!" : "Copy Number"}
        </button>
        <a
          href={`mailto:${shelter.email}`}
          onClick={(e) => e.stopPropagation()}
          className="px-3 py-1 text-xs bg-blue-500 text- rounded hover:bg-blue-600 font-medium"
        >
          Send Email
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            startDirections();
          }}
          className="px-3 py-1 text-xs bg-green-500 text- rounded hover:bg-green-600 font-medium"
        >
          Start Directions
        </button>
      </div>
    </div>
  );
};

// Distance function
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Map Component with Error Handling
const GoogleMapComponent = ({ 
  allShelters, 
  selectedShelter, 
  setSelectedShelter, 
  userLocation, 
  nearestShelter, 
  dangerZone 
}) => {
  const [mapError, setMapError] = useState(false);

  try {
    return (
      <div style={containerStyle} className="w-full h-full">
        {!mapError ? (
          <LeafletMap
            userLocation={userLocation}
            selectedShelter={selectedShelter}
            nearestShelter={nearestShelter}
            onShelterClick={setSelectedShelter}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Map Temporarily Unavailable</h3>
              <p className="text-gray-600 mb-4">Please use the shelter list on the left</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reload Map
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Map error:', error);
    setMapError(true);
    return null;
  }
};

// Main Component
const FindShelter = () => {
  // Use the comprehensive shelter data from allShelters.ts
  const allShelters = allDistrictsShelters.flatMap((d) =>
    d.shelters.map((shelter) => ({
      ...shelter,
      district: d.district,
      capacity: shelter.capacity ? `${shelter.capacity} people` : "N/A",
      amenities: ["Medical Aid", "Food", "Water"],
      // Create unique ID by combining district and shelter ID
      uniqueId: `${d.district}-${shelter.id}`
    }))
  );
  
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState({});
  const [nearestShelter, setNearestShelter] = useState(null);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Danger zone
  const dangerZone = {
    center: { lat: 11.73, lng: 79.76 },
    radius: 5000, // meters
  };

  useEffect(() => {
    setSelectedShelter(allShelters[0]);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);

          // Calculate distances
          let distObj = {};
          let nearest = null;
          let nearestDist = Infinity;

          allShelters.forEach((s) => {
            const dist = getDistanceFromLatLon(
              loc.lat,
              loc.lng,
              s.location.lat,
              s.location.lng
            );
            distObj[s.uniqueId] = dist;
            if (dist < nearestDist) {
              nearestDist = dist;
              nearest = s;
            }
          });

          setDistances(distObj);
          setNearestShelter(nearest);

          // Danger zone check
          const dzDist = getDistanceFromLatLon(
            loc.lat,
            loc.lng,
            dangerZone.center.lat,
            dangerZone.center.lng
          );
          if (dzDist * 1000 <= dangerZone.radius) {
            setShowDangerAlert(true);
          }
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 overflow-hidden bg-white shadow-lg z-10`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                Find Nearby Relief Shelters (Coastal TN)
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Location tracking active
              </div>
            )}
          </div>

          {/* Danger Alert */}
          {showDangerAlert && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Danger Zone Alert</h3>
                  <p className="text-xs text-red-700">You are in a high-risk area. Evacuate to nearest shelter.</p>
                </div>
                <button 
                  onClick={() => setShowDangerAlert(false)}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Shelter List */}
          <div className="flex-1 overflow-y-auto p-4">
            {allDistrictsShelters.map((district) => (
              <div key={district.district} className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-3 bg-blue-50 px-3 py-2 rounded">
                  {district.district}
                </h2>
                {district.shelters.map((shelter) => (
                  <CompactShelterCard
                    key={`${district.district}-${shelter.id}`}
                    shelter={shelter}
                    distance={distances[shelter.uniqueId] || null}
                    userLocation={userLocation}
                    isSelected={selectedShelter?.uniqueId === shelter.uniqueId}
                    onClick={() => setSelectedShelter(shelter)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Toggle Sidebar Button */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Map */}
        <GoogleMapComponent
          allShelters={allShelters}
          selectedShelter={selectedShelter}
          setSelectedShelter={setSelectedShelter}
          userLocation={userLocation}
          nearestShelter={nearestShelter}
          dangerZone={dangerZone}
        />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
          <div className="text-xs text-gray-600 mb-2">Legend:</div>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Nearest Shelter</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Other Shelters</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full opacity-30"></div>
              <span>Danger Zone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindShelter;