import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import Header from "@/components/Header";
import "leaflet/dist/leaflet.css";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Detect rain intensity
const getRainIntensity = (weather) => {
  if (!weather?.current) return null;
  const precip = Number(weather.current.precip_mm || 0);
  if (precip > 15) return "heavy";
  if (precip > 5) return "moderate";
  if (precip > 0) return "light";
  return "norain"; // 🌞 No rain
};

// Marker component
const WeatherMarker = ({ position, setPosition, weather }) => {
  const markerRef = useRef(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    if (markerRef.current) markerRef.current.openPopup();
  }, [weather, position]);

  return (
    <Marker position={position} ref={markerRef}>
      {weather && (
        <Popup>
          <div style={{ textAlign: "center" }}>
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              width={48}
              height={48}
            />
            <h3>{weather.location.name}</h3>
            <p>🌡 {weather.current.temp_c}°C</p>
            <p>☁ {weather.current.condition.text}</p>
            <p>💨 {weather.current.wind_kph} kph</p>
            <p>💧 {weather.current.humidity}%</p>
            <p>🌧️ {weather.current.precip_mm} mm</p>
          </div>
        </Popup>
      )}
    </Marker>
  );
};

// Programmatic center change
const ChangeMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 10);
  }, [position, map]);
  return null;
};

const EmergencyMapWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState({ lat: 13.0827, lng: 80.2707 });
  const [search, setSearch] = useState("");
  const [radius, setRadius] = useState(20000);
  const [isClient, setIsClient] = useState(false);
  const [mapKey, setMapKey] = useState(null);
  const mapInstanceRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const WEATHER_API_KEY = "7bcac32a42154f37b97115321250908";

  const fetchWeather = async (lat, lng) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lng}`
      );
      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setError(data.error.message || "API error");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch weather");
      setWeather(null);
    }
  };

  const handleSearch = async () => {
    if (!search) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert("Place not found");
      }
    } catch (err) {
      alert("Failed to search location");
    }
  };

  useEffect(() => {
    fetchWeather(position.lat, position.lng);
  }, [position]);

  // Live weather polling for current map center
  useEffect(() => {
    const id = setInterval(() => {
      fetchWeather(position.lat, position.lng);
    }, 60000); // refresh every 60s
    return () => clearInterval(id);
  }, [position.lat, position.lng]);

  // Ensure MapContainer only initializes on client after first mount
  useEffect(() => {
    setIsClient(true);
    setMapKey(`leaflet-map-${Date.now()}`);
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Ensure hard cleanup of map instance on unmount to prevent double init
  useEffect(() => {
    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        // container will be unmounted by React
      } catch (e) {
        // swallow
      }
    };
  }, []);

  // Old behavior: removed disaster overlay polling

  const intensity = getRainIntensity(weather);

  const getZoneStyle = () => {
    if (intensity === "heavy") return { color: "red", fillOpacity: 0.4 };
    if (intensity === "moderate") return { color: "orange", fillOpacity: 0.3 };
    if (intensity === "light") return { color: "green", fillOpacity: 0.25 };
    if (intensity === "norain") return { color: "blue", fillOpacity: 0.2 }; // 🔵 No rain
    return null;
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <Header />

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          display: "flex",
          gap: 8,
          alignItems: "center",
          background: "rgba(255,255,255,0.95)",
          padding: "8px 10px",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search place..."
          style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          🔍
        </button>
        <button
          onClick={() => setPosition({ lat: 13.0827, lng: 80.2707 })}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "darkgreen",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          🎯 Reset
        </button>
      </div>

      {/* Floating weather card */}
      {weather && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 16,
            zIndex: 1000,
            background: "rgba(255,255,255,0.95)",
            padding: "10px 14px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            minWidth: 180,
          }}
        >
          <h4 style={{ margin: 0 }}>{weather.location.name}</h4>
          <p style={{ margin: "4px 0" }}>
            🌡 {weather.current.temp_c}°C | {weather.current.condition.text}
          </p>
          <p style={{ margin: "4px 0" }}>
            💧 {weather.current.humidity}% | 🌧 {weather.current.precip_mm} mm
          </p>
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          zIndex: 1000,
          background: "rgba(255,255,255,0.95)",
          padding: "8px 10px",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: 13,
        }}
      >
        <b>Legend</b>
        <div>🟢 Light Rain Zone</div>
        <div>🟠 Moderate Rain Zone</div>
        <div>🔴 Heavy Rain Zone</div>
        <div>🔵 No Rain Zone</div>
        <div>📍 Click to move marker</div>
      </div>

      {/* Map */}
      {isClient && mounted && mapKey && (
        <MapContainer
          key={mapKey}
          center={position}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {intensity && (
            <Circle center={position} radius={radius} pathOptions={getZoneStyle()} />
          )}
          <WeatherMarker position={position} setPosition={setPosition} weather={weather} />
          <ChangeMapCenter position={position} />
        </MapContainer>
      )}

      {/* Loading/Error */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 56,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 8,
            zIndex: 1000,
          }}
        >
          ⏳ Fetching weather...
        </div>
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            top: 56,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255,0,0,0.7)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 8,
            zIndex: 1000,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default EmergencyMapWeather;
  