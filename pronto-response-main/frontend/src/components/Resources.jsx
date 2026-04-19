// Resources.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import shelters from "./sheltersData";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = { lat: 11.1271, lng: 78.6569 }; // Center of Tamil Nadu

const Resources = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchDistrict, setSearchDistrict] = useState("");
  const mapRef = useRef(null);

  const resources = [
    {
      category: "🚨 Emergency Contacts",
      items: [
        { name: "NDRF", contact: "1078" },
        { name: "State Emergency Helpline", contact: "104" },
        { name: "Police", contact: "100" },
        { name: "Fire & Rescue", contact: "101" },
      ],
    },
    {
      category: "🏥 Medical Help",
      items: [
        { name: "Government Hospital Helpline", contact: "108" },
        { name: "Red Cross", contact: "+91-11-23359379" },
      ],
    },
    {
      category: "🍲 Food & Supplies",
      items: [
        { name: "Food Distribution Helpline", contact: "1967" },
        { name: "NGO Food Aid", contact: "+91-9876543210" },
      ],
    },
    {
      category: "🏠 Shelters",
      items: [
        {
          name: "Nearest Shelter Finder",
          contact: (
            <Link
              to="/find-shelter"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Available Shelters
            </Link>
          ),
        },
      ],
    },
  ];

  // District-level marker locations with 5 food & 5 police per district
  const districtMarkers = [
    {
      name: "Chennai",
      lat: 13.0827,
      lng: 80.2707,
      foodPlaces: [
        { name: "Chennai Food Bank 1", lat: 13.085, lng: 80.270 },
        { name: "Chennai Food Bank 2", lat: 13.081, lng: 80.275 },
        { name: "Anna Nagar Food Aid", lat: 13.067, lng: 80.231 },
        { name: "T. Nagar Food Supply", lat: 13.041, lng: 80.236 },
        { name: "Guindy Food Center", lat: 13.010, lng: 80.220 },
      ],
      policeStations: [
        { name: "Chennai Central Police", lat: 13.082, lng: 80.276 },
        { name: "T. Nagar Police Station", lat: 13.040, lng: 80.230 },
        { name: "Guindy Police Station", lat: 13.012, lng: 80.222 },
        { name: "Egmore Police Station", lat: 13.078, lng: 80.259 },
        { name: "Royapettah Police Station", lat: 13.066, lng: 80.265 },
      ],
    },
    {
      name: "Cuddalore",
      lat: 11.7449,
      lng: 79.7650,
      foodPlaces: [
        { name: "Cuddalore Food Center 1", lat: 11.748, lng: 79.770 },
        { name: "Cuddalore Food Center 2", lat: 11.742, lng: 79.768 },
        { name: "Food Aid Station 1", lat: 11.746, lng: 79.763 },
        { name: "Food Aid Station 2", lat: 11.749, lng: 79.760 },
        { name: "Food Aid Station 3", lat: 11.745, lng: 79.766 },
      ],
      policeStations: [
        { name: "Cuddalore Police Station 1", lat: 11.746, lng: 79.762 },
        { name: "Cuddalore Police Station 2", lat: 11.744, lng: 79.765 },
        { name: "Cuddalore Police Station 3", lat: 11.741, lng: 79.767 },
        { name: "Cuddalore Police Station 4", lat: 11.749, lng: 79.769 },
        { name: "Cuddalore Police Station 5", lat: 11.747, lng: 79.761 },
      ],
    },
    {
      name: "Nagapattinam",
      lat: 10.7650,
      lng: 79.8436,
      foodPlaces: [
        { name: "Nagapattinam Food Help 1", lat: 10.768, lng: 79.840 },
        { name: "Nagapattinam Food Help 2", lat: 10.766, lng: 79.842 },
        { name: "Food Aid 3", lat: 10.764, lng: 79.845 },
        { name: "Food Aid 4", lat: 10.763, lng: 79.841 },
        { name: "Food Aid 5", lat: 10.767, lng: 79.847 },
      ],
      policeStations: [
        { name: "Nagapattinam Police Station 1", lat: 10.766, lng: 79.845 },
        { name: "Nagapattinam Police Station 2", lat: 10.764, lng: 79.843 },
        { name: "Nagapattinam Police Station 3", lat: 10.765, lng: 79.848 },
        { name: "Nagapattinam Police Station 4", lat: 10.762, lng: 79.841 },
        { name: "Nagapattinam Police Station 5", lat: 10.767, lng: 79.844 },
      ],
    },
    {
      name: "Kanyakumari",
      lat: 8.0883,
      lng: 77.5385,
      foodPlaces: [
        { name: "Kanyakumari Food Aid 1", lat: 8.090, lng: 77.540 },
        { name: "Kanyakumari Food Aid 2", lat: 8.087, lng: 77.535 },
        { name: "Food Center 3", lat: 8.089, lng: 77.533 },
        { name: "Food Center 4", lat: 8.085, lng: 77.537 },
        { name: "Food Center 5", lat: 8.086, lng: 77.539 },
      ],
      policeStations: [
        { name: "Kanyakumari Police Station 1", lat: 8.088, lng: 77.536 },
        { name: "Kanyakumari Police Station 2", lat: 8.090, lng: 77.534 },
        { name: "Kanyakumari Police Station 3", lat: 8.087, lng: 77.538 },
        { name: "Kanyakumari Police Station 4", lat: 8.086, lng: 77.540 },
        { name: "Kanyakumari Police Station 5", lat: 8.089, lng: 77.537 },
      ],
    },
  ];

  // Filter districts by search
  const filteredDistricts = searchDistrict
    ? districtMarkers.filter((d) =>
        d.name.toLowerCase().includes(searchDistrict.toLowerCase())
      )
    : districtMarkers;

  // Auto-fit map to markers of the searched district
  useEffect(() => {
    if (mapRef.current && filteredDistricts.length === 1) {
      const bounds = new window.google.maps.LatLngBounds();
      const district = filteredDistricts[0];

      bounds.extend({ lat: district.lat, lng: district.lng });
      district.foodPlaces.forEach((f) => bounds.extend({ lat: f.lat, lng: f.lng }));
      district.policeStations.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));

      mapRef.current.fitBounds(bounds);
    }
  }, [filteredDistricts]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-red-700 mb-6">Rescue Resources</h1>

      {/* Resource Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-4 text-red-600">
              {section.category}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-blue-600">{item.contact}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-2 text-red-600">
        🗺️ District Resource Locations
      </h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search District (e.g., Chennai)"
        value={searchDistrict}
        onChange={(e) => setSearchDistrict(e.target.value)}
        className="mb-4 p-2 border rounded w-full md:w-1/3"
      />

      {/* Marker color note */}
     <p className="mb-4 text-gray-700">
  <span className="inline-block w-3 h-3 mr-2">📍</span>
  District Center &nbsp;&nbsp;
  <span className="inline-block w-3 h-3 mr-2">🟢</span>
  Food Supply &nbsp;&nbsp;
  <span className="inline-block w-3 h-3 mr-2">🔴</span>
  Rescue Team &nbsp;&nbsp;
  <span className="inline-block w-3 h-3 mr-2">🔵</span>
  Shelters  
</p>



      <LoadScript googleMapsApiKey="AIzaSyAL5nY5TEJ-6R4y5v3LKLeUqMtauEE7Iy8">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={7}
          onLoad={(map) => (mapRef.current = map)}
        >
          {filteredDistricts.map((district, idx) => (
            <React.Fragment key={idx}>
              {/* District Marker */}
              <Marker
                position={{ lat: district.lat, lng: district.lng }}
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/gray-dot.png" }}
                onClick={() =>
                  setSelectedMarker({ name: district.name, lat: district.lat, lng: district.lng })
                }
              />

              {/* Food Markers */}
              {district.foodPlaces.map((food, fIdx) => (
                <Marker
                  key={`food-${fIdx}`}
                  position={{ lat: food.lat, lng: food.lng }}
                  icon={{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
                  onClick={() =>
                    setSelectedMarker({ name: food.name, lat: food.lat, lng: food.lng })
                  }
                />
              ))}

              {/* Police Markers */}
              {district.policeStations.map((police, pIdx) => (
                <Marker
                  key={`police-${pIdx}`}
                  position={{ lat: police.lat, lng: police.lng }}
                  icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                  onClick={() =>
                    setSelectedMarker({ name: police.name, lat: police.lat, lng: police.lng })
                  }
                />
              ))}
            </React.Fragment>
          ))}

          {/* Shelter Markers (all shelters) */}
          {shelters.map((shelter) => (
            <Marker
              key={`shelter-${shelter.id}`}
              position={{ lat: shelter.lat, lng: shelter.lng }}
              icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
              onClick={() =>
                setSelectedMarker({ name: shelter.name, lat: shelter.lat, lng: shelter.lng })
              }
            />
          ))}

          {/* InfoWindow */}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>{selectedMarker.name}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <Header />
    </div>
  );
};

export default Resources;   
  