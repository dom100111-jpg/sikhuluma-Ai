import { useState } from "react";

export default function LiveCollector() {
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);

  const runLiveCollector = async () => {
    setStatus("🔍 Collecting live data...");
    try {
      const res = await fetch("/api/liveCollector");
      const data = await res.json();
      if (data.success) {
        setCount(data.collected);
        setStatus(`✅ Live collection complete: ${data.collected} new siSwati texts found.`);
      } else setStatus("❌ Failed to collect data.");
    } catch {
      setStatus("❌ Network error.");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ color: "#004aad" }}>🌐 Live Source Collector</h2>
      <p>Fetch YouTube captions, Facebook posts, and public speeches automatically.</p>

      <button
        onClick={runLiveCollector}
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Run Live Collector
      </button>

      <p style={{ marginTop: "25px", fontWeight: "bold" }}>{status}</p>

      {count > 0 && (
        <a
          href="/live_collections.json"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#004aad", textDecoration: "underline" }}
        >
          📂 View Live Collected Words ({count})
        </a>
      )}
    </div>
  );
}
