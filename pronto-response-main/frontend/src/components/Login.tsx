import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const animations = `
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    50% { transform: translateX(8px); }
    75% { transform: translateX(-8px); }
    100% { transform: translateX(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes blink {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.2; }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "user" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // === Admin login check ===
      if (form.email === "aravinthl266@gmail.com" && form.password === "Arvind@l123") {
        if (form.role !== "admin") {
          toast.error("⚠️ You must select Admin role!");
          return;
        }

        toast.success("✅ Admin login successful!");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", "Admin");
        localStorage.setItem("role", "admin");
        localStorage.setItem("adminEmail", form.email);

        setTimeout(() => navigate("/admin"), 1500);
        return;
      }

      // === Normal user/volunteer login ===
      // Auto-detect backend URL
      const getBackendUrl = async () => {
        const commonPorts = ['5003', '5002', '5001', '5000', '3000', '8000'];
        for (const port of commonPorts) {
          try {
            const testUrl = `http://localhost:${port}`;
            const response = await fetch(`${testUrl}/api/health`, { 
              method: 'GET',
              signal: AbortSignal.timeout(2000)
            });
            if (response.ok) return testUrl;
          } catch (e) {
            // Continue to next port
          }
        }
        return 'http://localhost:5000'; // Default fallback
      };

      const backendUrl = await getBackendUrl();
      const res = await axios.post(`${backendUrl}/api/login`, form);

      toast.success("✅ " + res.data.msg);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("role", res.data.role);

      // Volunteer: store email for tasks
      if (res.data.role === "volunteer") {
        localStorage.setItem("userEmail", form.email);
        setTimeout(() => navigate("/volunteer-login"), 1500);
      } else {
        setTimeout(() => navigate("/index"), 1500);
      }
    } catch (err) {
      toast.error("⚠️ " + (err.response?.data?.msg || "Login failed"), {
        className: "shake-toast",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(to right, #ffecd2, #fcb69f)",
      }}
    >
      <style>{animations}</style>
      <style>{`.shake-toast { animation: shake 0.6s; }`}</style>

      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
          color: "#7f1d1d",
          textAlign: "center",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/619/619054.png"
          alt="Disaster Alert"
          style={{ width: "200px", marginBottom: "2rem" }}
        />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>🚨 Stay Alert, Stay Safe</h1>
        <p style={{ fontSize: "1.1rem", marginTop: "1rem", maxWidth: "500px" }}>
          Join our disaster management system to receive real-time alerts,
          coordinate rescue efforts, and ensure community safety during emergencies.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "3rem 2rem",
            borderRadius: "20px",
            boxShadow: "0 12px 40px rgba(255, 56, 43, 0.25)",
            width: "100%",
            maxWidth: "420px",
            animation: "fadeIn 1s ease",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              animation: "blink 1s infinite",
              marginBottom: "0.5rem",
            }}
          >
            🚨
          </div>

          <h2
            style={{
              marginBottom: "2rem",
              color: "#b91c1c",
              fontWeight: "bold",
              fontSize: "1.8rem",
            }}
          >
            🛑 Disaster Management Login
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}
          >
            <div>
              <label>Email Address:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1.5px solid #fca5a5",
                }}
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1.5px solid #fca5a5",
                }}
              />
            </div>

            <div>
              <label>Role:</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{ width: "100%", padding: "12px", borderRadius: "10px" }}
              >
                <option value="user">👤 User</option>
                <option value="volunteer">🤝 Volunteer</option>
                <option value="admin">🛡 Admin</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                background: "linear-gradient(to right, #ef4444, #dc2626)",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚨 Login
            </button>
          </form>

          <p style={{ marginTop: "1.8rem", textAlign: "center" }}>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{
                cursor: "pointer",
                color: "#b91c1c",
                backgroundColor: "#fee2e2",
                padding: "6px 12px",
                borderRadius: "8px",
                fontWeight: "600",
              }}
            >
              Sign up here ➡️
            </span>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={1500} transition={Slide} />
    </div>
  );
};

export default Login;
