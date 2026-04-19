import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getShelterOptions } from "../data/allShelters";

const animations = `
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes blink {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.2; }
  }
  @keyframes sirenGlow {
    0% { text-shadow: 0 0 5px red, 0 0 10px red; }
    50% { text-shadow: 0 0 15px red, 0 0 30px red; }
    100% { text-shadow: 0 0 5px red, 0 0 10px red; }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user", age: "", shelter: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Get backend URL (same logic as other components)
  const getBackendUrl = async () => {
    // Try common backend ports (including 5003 which is current server port)
    const commonPorts = ['5003', '5002', '5001', '5000', '3000', '8000'];
    for (const port of commonPorts) {
      try {
        const testUrl = `http://localhost:${port}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch(`${testUrl}/api/health`, { 
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log(`✅ Found backend server at ${testUrl}`);
          return testUrl;
        }
      } catch (e) {
        // Continue to next port
      }
    }
    
    // Default fallback
    console.log('Using default backend URL');
    return 'http://localhost:5000';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before sending
    if (!form.name || !form.email || !form.password || !form.role) {
      alert("❌ Please fill in all required fields");
      return;
    }

    // Additional validation for volunteers
    if (form.role === "volunteer" && (!form.age || !form.shelter || !form.phone)) {
      alert("❌ Please fill in all volunteer fields (age, phone, shelter)");
      return;
    }

    try {
      const backendUrl = await getBackendUrl();
      console.log(`📡 Using backend URL: ${backendUrl}`);

      // 1) Create account
      const { name, email, password, role, age, shelter, phone } = form;
      console.log("📝 Creating account:", { name, email, role });
      
      const res = await axios.post(`${backendUrl}/api/signup`, { 
        name: name.trim(), 
        email: email.toLowerCase().trim(), 
        password, 
        role 
      });

      console.log("✅ Account created:", res.data);

      // 2) If volunteer, also store volunteer profile and send confirmation
      if (role === "volunteer") {
        console.log("📝 Creating volunteer profile:", { name, age, shelter, email, phone });
        try {
          await axios.post(`${backendUrl}/api/volunteers`, {
            name: name.trim(),
            age: age ? Number(age) : undefined,
            shelter,
            email: email.toLowerCase().trim(),
            phone,
          });
          console.log("✅ Volunteer profile created");
        } catch (volErr) {
          console.error("⚠️ Volunteer profile creation failed:", volErr);
          // Don't fail the whole signup if volunteer profile fails
        }

        // Try to send confirmation email (non-blocking)
        try {
          await axios.post(`${backendUrl}/api/send-confirmation`, { 
            name: name.trim(), 
            email: email.toLowerCase().trim(), 
            shelter, 
            age, 
            phone 
          });
          console.log("✅ Confirmation email sent");
        } catch (emailErr) {
          console.log("⚠️ Confirmation email failed (non-blocking):", emailErr);
          // non-blocking - don't show error to user
        }
      }

      alert("✅ " + res.data.msg + "\n\nYou can now log in with your credentials.");
      navigate("/login"); // Redirect to login page instead of home
    } catch (err) {
      console.error("❌ Signup error:", err);
      
      if (err.response?.data?.msg === "User already exists" || err.response?.data?.msg === "User exists") {
        alert("❌ User already exists.\n\nAn account with this email already exists. Please use a different email or try logging in instead.");
      } else if (err.response?.data?.msg) {
        alert("❌ " + err.response.data.msg);
      } else if (err.message.includes('Network Error')) {
        alert("❌ Network Error: Cannot connect to server.\n\nPlease make sure the backend server is running and try again.");
      } else {
        alert("❌ Signup failed. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffecd2, #fcb69f)",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <style>{animations}</style>

      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
          textAlign: "center",
          color: "#7f1d1d",
          animation: "fadeInLeft 1s ease",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581091870627-3d5a04f03a4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135764.png"
          alt="Disaster Safety"
          style={{
            width: "180px",
            marginBottom: "1.5rem",
            animation: "sirenGlow 1.5s infinite alternate",
          }}
        />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>🆘 Be Prepared, Be Safe</h1>
        <p
          style={{
            maxWidth: "500px",
            fontSize: "1.1rem",
            marginTop: "1rem",
            background: "rgba(255,255,255,0.85)",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          Join our emergency alert network to get real-time updates, safety tips,
          and coordinate with rescue teams when disaster strikes.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          animation: "fadeInRight 1s ease",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              animation: "blink 1s infinite, sirenGlow 1.5s infinite alternate",
            }}
          >
            🚨
          </div>

          <h2 style={{ marginBottom: "2rem", color: "#1e3a8a" }}>
            🆘 Disaster Management - Create Account
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            {/* Name */}
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                🧑‍🚒 Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                📡 Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                🔑 Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a secure password"
                value={form.password}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }}
              />
            </div>

            {form.role === "volunteer" && (
              <>
                {/* Age */}
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                    🎂 Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={form.age}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                    📞 Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }}
                  />
                </div>

                {/* Shelter Dropdown */}
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                    🏠 Preferred Shelter
                  </label>
                  <select
                    name="shelter"
                    value={form.shelter}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      cursor: "pointer"
                    }}
                  >
                    <option value="">Select a shelter...</option>
                    {getShelterOptions().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Role */}
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                🎭 Select Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              >
                <option value="user">👤 User (General Public)</option>
                <option value="volunteer">🤝 Volunteer (Emergency Responder)</option>
                <option value="admin">🛡️ Admin (System Administrator)</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                padding: "12px",
                backgroundColor: "#1e3a8a",
                color: "white",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#0f172a")}
              onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#1e3a8a")}
            >
              🚨 Register Now
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#475569" }}>
            🔄 Already registered?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "#2563eb", cursor: "pointer", fontWeight: "600" }}
            >
              Login here ➡️
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
