    import React, { useState } from "react";
    import { motion } from "framer-motion";
    import Header from "@/components/Header";

    const SmsSOSPage = () => {
      const [to] = useState("+917339486437");
      const [loading, setLoading] = useState(false);
      const [responseMsg, setResponseMsg] = useState("");
      const [responseError, setResponseError] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();       
        setResponseMsg("");
        setResponseError(false);

        setLoading(true);
        try {
          // 1) Get location
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userLocation = `📍 Lat: ${lat.toFixed(5)}, Lon: ${lng.toFixed(5)}`;

          // 2) Store emergency (shows on Admin page and may auto-assign)
          await fetch("http://localhost:5000/emergencies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: "User Name", userLocation, lat, lng }),
          });

          // 3) Send SMS
          const res = await fetch("http://localhost:5000/send-sms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to }),
          });
          const data = await res.json();

          if (!res.ok) {
            setResponseError(true);
            setResponseMsg(`❌ Error: ${data.error || "Failed to send message"}`);
          } else {
            setResponseError(false);
            setResponseMsg(`✅ Message sent! SID: ${data.sid}`);
          }

          // 4) Optional: email admin notification as well
          try {
            await fetch("http://localhost:5000/send-emergency-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userName: "User Name", userLocation, lat, lng }),
            });
          } catch (_) {}

          // 5) Redirect to Admin alerts view
          window.location.href = "/admin";
        } catch (error) {
          setResponseError(true);
          setResponseMsg(`❌ Error: ${error.message}`);
        }
        setLoading(false);
      };

      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            fontFamily: "'Segoe UI', sans-serif",
            backgroundColor: "#0d1b2a", // Dark blue background
          }}
        >
          {/* Left side - Card */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
              flexDirection: "column", // Stack heading and card vertically
            }}
          >
            {/* Heading above card */}
            <h1
              style={{
                color: "white",
                fontSize: "2.8rem",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              🚨 SOS Alert System
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              style={{
                padding: "40px",
                borderRadius: "18px",
                textAlign: "center",
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                maxWidth: "400px",
                width: "100%",
                background: "silver", // Silver card
                color: "#0d1b2a", // Dark text for contrast
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <motion.img
                  src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
                  alt="SOS icon"
                  style={{
                    width: "90px",
                    marginBottom: "20px",
                    filter: "drop-shadow(0 0 8px rgba(255,0,0,0.5))",
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>

              <h2 style={{ fontSize: "2.4rem", marginBottom: "8px", color: "#b71c1c" }}>
                Emergency SOS
              </h2>

              <p style={{ marginBottom: "25px", opacity: 0.85 }}>
                Send instant alerts with live GPS location 🚨
              </p>

              <form onSubmit={handleSubmit}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: loading
                      ? "#b71c1c"
                      : "linear-gradient(90deg, #b71c1c, #ff6b6b)",
                    color: "white",
                    padding: "14px",
                    border: "none",
                    borderRadius: "50px",
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(183,28,28,0.4)",
                  }}
                >
                  {loading ? "Sending..." : "📢 Send SOS Alert"}
                </motion.button>
              </form>

              {responseMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    marginTop: "15px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: responseError ? "#b71c1c" : "#388e3c",
                  }}
                >
                  {responseMsg}
                </motion.p>
              )}

              <small
                style={{
                  display: "block",
                  marginTop: "12px",
                  fontSize: "0.85rem",
                  opacity: 0.7,
                  color: "#333",
                }}
              >
                SOS will be sent to the configured emergency number.
              </small>
            </motion.div>
          </div>

          {/* Right side - Image */}
          <div
            style={{
              flex: 1,
              background: "url('hero-emergency.jpg') center/cover no-repeat",
              minHeight: "100vh",
            }}
          ></div>
          <Header />
        </div>
      );  
    };

    export default SmsSOSPage;
