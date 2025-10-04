import React, { useState } from "react";
import Header from "@/components/Header";

const styles = {
  wrapper: {
    maxWidth: "650px",
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "1.8rem 2rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    color: "#222",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: "2rem",
    fontWeight: "700",
    color: "#0b3d91",
  },
  card: {
    backgroundColor: "#f4f9ff",
    borderRadius: 10,
    padding: "1.5rem 1.8rem",
    marginBottom: "1.6rem",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: 12,
    color: "#0a2f6e",
  },
  actionButton: {
    backgroundColor: "#0b62d8",
    color: "#fff",
    padding: "0.5rem 1.3rem",
    borderRadius: 6,
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: 12,
    transition: "background-color 0.25s ease",
  },
  actionButtonDanger: {
    backgroundColor: "#d93b3b",
  },
  actionButtonHover: {
    backgroundColor: "#084bb5",
  },
  textGreen: { color: "#2ecc71", fontWeight: "700" },
  textRed: { color: "#e74c3c", fontWeight: "700" },
  listItem: {
    marginBottom: 6,
  },
  link: {
    color: "#0b62d8",
    textDecoration: "underline",
    cursor: "pointer",
  },
  statusText: {
    marginTop: 12,
    fontWeight: "700",
  },
};

const AfterDisasterPageFresh = () => {
  const [status, setStatus] = useState(null);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>🌪️ Disaster Recovery Hub</h1>

      {/* Safety Confirmation */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>✔️ Confirm Safety</h2>
        <p>Are you and your loved ones safe? Please update your status.</p>
        <button
          style={styles.actionButton}
          onClick={() => setStatus("safe")}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#084bb5")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0b62d8")}
        >
          I'm Safe ✅
        </button>
        <button
          style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
          onClick={() => setStatus("help")}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b53333")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d93b3b")}
        >
          Need Immediate Help 🚨
        </button>
        {status === "safe" && (
          <p style={{ ...styles.statusText, ...styles.textGreen }}>
            Thank you! Your safety is recorded.
          </p>
        )}
        {status === "help" && (
          <p style={{ ...styles.statusText, ...styles.textRed }}>
            Help is on the way. Stay calm and stay safe.
          </p>
        )}
      </div>

      {/* Emergency Hotlines */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📞 Emergency Hotlines</h2>
        <ul>
          <li style={styles.listItem}>
            Police: <a href="tel:100" style={styles.link}>100</a>
          </li>
          <li style={styles.listItem}>
            Fire Dept: <a href="tel:101" style={styles.link}>101</a>
          </li>
          <li style={styles.listItem}>
            Ambulance: <a href="tel:102" style={styles.link}>102</a>
          </li>
        </ul>
      </div>

      {/* Nearest Shelters */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🏠 Nearest Shelters</h2>
        <ul>
          <li style={styles.listItem}>Community Center - 1.2 km</li>
          <li style={styles.listItem}>City Gymnasium - 2.7 km</li>
          <li style={styles.listItem}>Town Hall - 3.1 km</li>
        </ul>
        <p>
          <a
            href="http://localhost:8080/find-shelter"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            View on Google Maps
          </a>
        </p>
      </div>

      {/* Quick Safety Tips */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🛡️ Quick Safety Tips</h2>
        <ul>
          <li style={styles.listItem}>Avoid unstable structures.</li>
          <li style={styles.listItem}>Use bottled water only.</li>
          <li style={styles.listItem}>Keep flashlights handy.</li>
          <li style={styles.listItem}>Conserve phone battery.</li>
        </ul>
      </div>

      {/* Emotional Support */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>💙 Emotional Support</h2>
        <p>It's okay to ask for help:</p>
        <ul>
          <li style={styles.listItem}>
            National Helpline: <a href="tel:1800123456" style={styles.link}>1800-123-456</a>
          </li>
          <li style={styles.listItem}>
            Online Chat:{" "}
            <a
              href="https://mentalhealth.example.com"
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              mentalhealth.example.com
            </a>
          </li>
        </ul>
      </div>
      <Header />
    </div>
  );
};

export default AfterDisasterPageFresh;
