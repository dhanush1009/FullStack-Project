import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user", age: "", shelter: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1) Create account
      const { name, email, password, role, age, shelter } = form;
      const res = await axios.post("http://localhost:5000/api/signup", { name, email, password, role });

      // 2) If volunteer, also store volunteer profile and send confirmation
      if (role === "volunteer") {
        await axios.post("http://localhost:5000/api/volunteers", {
          name,
          age: age ? Number(age) : undefined,
          shelter,
          email,
        });
        try {
          await axios.post("http://localhost:5000/api/send-confirmation", { name, email, shelter, age });
        } catch (_) {
          // non-blocking
        }
      }

      alert("✅ " + res.data.msg);
      navigate("/");
    } catch (err) {
      alert("❌ " + (err.response?.data?.msg || "Signup failed"));
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

                {/* Shelter */}
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#334155" }}>
                    🏠 Preferred Shelter / Zone
                  </label>
                  <input
                    type="text"
                    name="shelter"
                    placeholder="e.g., Zone A, Community Center"
                    value={form.shelter}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px" }}
                  />
                </div>
              </>
            )}

            {/* Role (NO Admin) */}
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
                <option value="user">👤 User</option>
                <option value="volunteer">🤝 Volunteer</option>
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0f172a")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
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
