import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet default markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Example shelters
const shelters = [
  { id: 1, name: "Chennai Corporation Shelter", district: "Chennai", location: { lat: 13.0635, lng: 80.2297 } },
  { id: 2, name: "Red Cross Relief Center", district: "Chennai", location: { lat: 13.0856, lng: 80.2484 } },
  { id: 3, name: "Govt. School Shelter", district: "Chennai", location: { lat: 13.0392, lng: 80.2126 } },
  { id: 4, name: "Community Hall Shelter", district: "Chennai", location: { lat: 13.1131, lng: 80.2214 } },
  { id: 5, name: "College Auditorium Shelter", district: "Chennai", location: { lat: 13.0418, lng: 80.2333 } },

  { id: 6, name: "Cuddalore Relief Camp 1", district: "Cuddalore", location: { lat: 11.7361, lng: 79.7686 } },
  { id: 7, name: "Cuddalore Relief Camp 2", district: "Cuddalore", location: { lat: 11.746, lng: 79.764 } },
  { id: 8, name: "Cuddalore Govt. School Shelter", district: "Cuddalore", location: { lat: 11.75, lng: 79.76 } },
  { id: 9, name: "Seashore Relief Camp", district: "Cuddalore", location: { lat: 11.73, lng: 79.77 } },
  { id: 10, name: "Cyclone Relief Center", district: "Cuddalore", location: { lat: 11.735, lng: 79.765 } },

  { id: 11, name: "Nagapattinam Relief Camp 1", district: "Nagapattinam", location: { lat: 10.763, lng: 79.843 } },
  { id: 12, name: "Nagapattinam Relief Camp 2", district: "Nagapattinam", location: { lat: 10.765, lng: 79.84 } },
  { id: 13, name: "Govt. School Shelter", district: "Nagapattinam", location: { lat: 10.76, lng: 79.85 } },
  { id: 14, name: "Fishing Village Relief", district: "Nagapattinam", location: { lat: 10.77, lng: 79.84 } },
  { id: 15, name: "Cyclone Shelter", district: "Nagapattinam", location: { lat: 10.758, lng: 79.842 } },

  { id: 16, name: "Thoothukudi Relief Camp 1", district: "Thoothukudi", location: { lat: 8.805, lng: 78.15 } },
  { id: 17, name: "Thoothukudi Relief Camp 2", district: "Thoothukudi", location: { lat: 8.81, lng: 78.145 } },
  { id: 18, name: "Govt. College Shelter", district: "Thoothukudi", location: { lat: 8.808, lng: 78.14 } },
  { id: 19, name: "Fishing Community Relief", district: "Thoothukudi", location: { lat: 8.806, lng: 78.15 } },
  { id: 20, name: "Cyclone Safe Shelter", district: "Thoothukudi", location: { lat: 8.804, lng: 78.142 } },

  { id: 21, name: "Kanyakumari Relief Camp 1", district: "Kanyakumari", location: { lat: 8.0883, lng: 77.5385 } },
  { id: 22, name: "Kanyakumari Relief Camp 2", district: "Kanyakumari", location: { lat: 8.09, lng: 77.54 } },
  { id: 23, name: "Govt. School Shelter", district: "Kanyakumari", location: { lat: 8.085, lng: 77.54 } },
  { id: 24, name: "Cyclone Shelter", district: "Kanyakumari", location: { lat: 8.083, lng: 77.537 } },
  { id: 25, name: "Fishing Village Relief", district: "Kanyakumari", location: { lat: 8.087, lng: 77.536 } },
];

function VolunteerMap() {
  // --- Auto-fill from localStorage (logged-in user) ---
  const savedUser = JSON.parse(localStorage.getItem("volunteerUser") || "{}");

  const [form, setForm] = useState({
    name: savedUser.name || "",
    age: "",
    email: savedUser.email || "",
    shelter: "",
  });
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch all volunteers
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/volunteers");
        const data = await res.json();
        setVolunteers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVolunteers();
  }, []);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save volunteer
      const res1 = await fetch("http://localhost:5001/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });
      const data = await res1.json();
      if (!res1.ok) throw new Error(data.msg || "Failed to save volunteer");

      // Send confirmation email
      const res2 = await fetch("http://localhost:5001/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });
      const emailData = await res2.json();
      if (!res2.ok) throw new Error(emailData.msg || "Failed to send email");

      setVolunteers([data.volunteer, ...volunteers]);
      setSuccess(`✅ Registered successfully! Confirmation sent to ${form.email}`);
      setError("");
      setForm({ ...form, age: "", shelter: "" });
      setTimeout(() => setSuccess(""), 7000);
    } catch (err: any) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      <div className="lg:w-1/3 bg-white rounded p-6 shadow">
        <h1 className="text-2xl font-bold mb-4 text-red-700">Volunteer Registration</h1>
        {success && <div className="p-2 bg-green-100 text-green-700 mb-2">{success}</div>}
        {error && <div className="p-2 bg-red-100 text-red-700 mb-2">{error}</div>}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            required
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            required
            value={form.shelter}
            onChange={(e) => setForm({ ...form, shelter: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Shelter</option>
            {shelters.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name} ({s.district})
              </option>
            ))}
          </select>
          <button type="submit" className="bg-red-700 text-white p-2 rounded mt-2">
            Join as Volunteer
          </button>
        </form>
        <p className="mt-4 font-semibold">Total Volunteers: {volunteers.length}</p>
      </div>

      <div className="lg:w-2/3 h-[600px] rounded shadow overflow-hidden">
        <MapContainer center={[10.8, 79.1]} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {shelters.map((s) => (
            <Marker key={s.id} position={[s.location.lat, s.location.lng]}>
              <Popup>
                <strong>{s.name}</strong>
                <br />
                {s.district}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default VolunteerMap;
