import { useState } from "react";

export default function AdminDashboard() {
  const [message, setMessage] = useState("");

  const handleGlobalCollector = async () => {
    setMessage("🌍 Collecting global dictionary data...");
    try {
      const res = await fetch("/api/globalCollector");
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Global collection complete: ${data.collected} words gathered.`);
      } else {
        setMessage("❌ Failed to collect global data.");
      }
    } catch (error) {
      setMessage("⚠️ Network error while collecting data.");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#004aad" }}>🛠️ Sikhuluma.ai Admin Dashboard</h1>
      <p style={{ fontSize: "18px", color: "#333" }}>
        Manage your global and live collections, translation data, and system
        connections.
      </p>

      {/* ---- Global Collector Section ---- */}
      <div
        style={{
          backgroundColor: "#f0f8ff",
          padding: "25px",
          borderRadius: "10px",
          marginTop: "30px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#004aad" }}>🌐 Global Data Collector</h2>
        <p>Gather YouTube, Facebook, and Ministry data globally.</p>

        <button
          onClick={handleGlobalCollector}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Run Global Collector
        </button>

        <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>

        <a
          href="/global_collections.json"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#004aad",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          📂 View Global Collected Words
        </a>
      </div>

      {/* ---- Divider ---- */}
      <hr
        style={{
          margin: "50px auto",
          width: "80%",
          border: "1px solid #ccc",
        }}
      />

      {/* ---- Live Source Collector Link (Phase 10 Step 3) ---- */}
      <div
        style={{
          backgroundColor: "#fff8f8",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#b30000" }}>🔴 Live Source Collector</h2>
        <p>
          Fetch YouTube captions, public Facebook posts, and Eswatini ministry
          speeches with automatic siSwati detection and translation.
        </p>

        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          <a
            href="/live"
            style={{
              color: "#b30000",
              fontWeight: "bold",
              textDecoration: "underline",
              fontSize: "16px",
            }}
          >
            👉 Open Live Source Collector
          </a>
        </p>
      </div>

      {/* ---- Footer ---- */}
      <footer style={{ marginTop: "60px", color: "#666" }}>
        <p>
          Sikhuluma.ai Admin Panel © {new Date().getFullYear()} — Powered by
          Dominic Dlamini
        </p>
      </footer>
    </div>
  );
}
