    import React, { useState } from "react";
    import { motion } from "framer-motion";
    import Header from "@/components/Header";

    const SmsSOSPage = () => {
      const [to] = useState("+917339486437");
      const [loading, setLoading] = useState(false);
      const [responseMsg, setResponseMsg] = useState("");
      const [responseError, setResponseError] = useState(false);

      // Get backend URL from server config or use default
      const getBackendUrl = async () => {
        // Try to get from server config first
        try {
          const response = await fetch('/server-config.json');
          const config = await response.json();
          return config.url;
        } catch (error) {
          console.log('Server config not found, trying common ports...');
        }

        // Try common backend ports
        const commonPorts = ['5000', '5001', '3000', '8000'];
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
        setResponseMsg("");
        setResponseError(false);


        setLoading(true);
        try {
          // Get backend URL
          const backendUrl = await getBackendUrl();
          
          // 1) Check if geolocation is available
          if (!navigator.geolocation) {
            throw new Error("Geolocation is not supported by this browser");
          }

          // 2) Get location with improved options
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false, // Use network location for faster response
              timeout: 15000, // Increased timeout
              maximumAge: 300000 // 5 minutes cache
            });
          });
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const addressString = `Emergency Location: Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}`;

          // 3) Send simple SOS alert
          const sosData = {
            userLocation: addressString,
            lat: lat,
            lng: lng,
            userName: "SOS User",
            timestamp: new Date().toISOString()
          };

          const sosResponse = await fetch(`${backendUrl}/api/sos-alert`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sosData),
          });

          let sosResult;
          try {
            const responseText = await sosResponse.text();
            if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
              sosResult = JSON.parse(responseText);
            } else {
              throw new Error(`Server returned HTML instead of JSON. Server may be down or misconfigured.`);
            }
          } catch (jsonError) {
            setResponseError(true);
            if (jsonError.message.includes('HTML')) {
              setResponseMsg(`❌ Server Error: Cannot connect to backend server. Please check if the server is running.`);
            } else {
              setResponseMsg(`❌ Server Error: Invalid response from server. ${jsonError.message}`);
            }
            return;
          }

          if (!sosResponse.ok) {
            setResponseError(true);
            setResponseMsg(`❌ Error: ${sosResult.message || "Failed to send SOS alert"}`);
            return;
          }

          // 4) Send SMS notification (optional - don't fail if SMS fails)
          try {
            const smsResponse = await fetch(`${backendUrl}/send-sms`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                to,
                userName: "SOS User",
                userLocation: addressString,
                lat: lat,
                lng: lng
              }),
            });
            
            if (smsResponse.ok) {
              try {
                const smsData = await smsResponse.json();
                console.log(`✅ SMS sent successfully: ${smsData.sid}`);
              } catch (e) {
                console.log(`✅ SMS sent successfully (response parsing failed)`);
              }
            } else {
              console.log(`⚠️ SMS failed: ${smsResponse.status}`);
            }
          } catch (smsError) {
            console.log(`⚠️ SMS service unavailable: ${smsError.message}`);
          }

          // 5) Success message
          setResponseError(false);
          setResponseMsg(`✅ SOS Alert sent successfully! Emergency services have been notified of your location. Alert ID: ${sosResult.alertId}`);
          
          console.log("✅ SOS sent successfully - staying on current page");
        } catch (error) {
          setResponseError(true);
          console.error("❌ SOS error:", error);
          
          // Handle different types of errors
          if (error.code === 1) { // PERMISSION_DENIED
            setResponseMsg(`❌ Location access denied. Please allow location access in your browser and try again.`);
          } else if (error.code === 2) { // POSITION_UNAVAILABLE
            setResponseMsg(`❌ Location unavailable. Please check your GPS/internet connection.`);
          } else if (error.code === 3) { // TIMEOUT
            setResponseMsg(`❌ Location timeout. Please try again.`);
          } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
            setResponseMsg(`❌ Network Error: Cannot connect to server. Please check if the backend server is running and try again.`);
          } else if (error.message && error.message.includes('Server returned HTML')) {
            setResponseMsg(`❌ Server Error: Backend server is not responding correctly. Please check server status.`);
          } else if (error.message && error.message.includes('not supported')) {
            setResponseMsg(`❌ Browser Error: ${error.message}`);
          } else {
            setResponseMsg(`❌ Error: ${error.message || 'Unknown error occurred. Please try again.'}`);
          }
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    marginTop: "15px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: responseError ? "#ffebee" : "#e8f5e8",
                    border: `1px solid ${responseError ? "#ffcdd2" : "#c8e6c9"}`,
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px 0",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: responseError ? "#b71c1c" : "#388e3c",
                    }}
                  >
                    {responseMsg}
                  </p>
                  {responseError && (
                    <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                      <button
                        onClick={() => {
                          setResponseMsg("");
                          setResponseError(false);
                        }}
                        style={{
                          padding: "6px 12px",
                          fontSize: "0.8rem",
                          border: "1px solid #b71c1c",
                          backgroundColor: "white",
                          color: "#b71c1c",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => {
                          setResponseMsg("");
                          setResponseError(false);
                          // Retry the SOS request
                          handleSubmit({ preventDefault: () => {} });
                        }}
                        style={{
                          padding: "6px 12px",
                          fontSize: "0.8rem",
                          border: "none",
                          backgroundColor: "#b71c1c",
                          color: "white",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              <small
                style={{
                  display: "block",
                  marginTop: "12px",
                  fontSize: "0.85rem",
                  opacity: 0.7,
                  color: "#333",
                  lineHeight: "1.4",
                }}
              >
                Emergency alert will be sent with your GPS location.
                <br />
                <strong>Note:</strong> Please allow location access when prompted by your browser.
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
