import { useState } from "react";

export default function GlobalCollector() {
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);

  const runCollector = async () => {
    setStatus("Collecting data...");
    try {
      const res = await fetch("/api/globalCollector");
      const data = await res.json();
      if (data.success) {
        setCount(data.collectedCount);
        setStatus(`✅ Collection complete: ${data.collectedCount} words found.`);
      } else {
        setStatus("❌ Failed to collect data.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error running collector.");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ color: "#004aad" }}>🌍 Global Data Collector</h2>
      <p>Fetch and detect siSwati words from public global content.</p>

      <button
        onClick={runCollector}
        style={{
          backgroundColor: "#43a047",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Run Global Collector
      </button>

      <p style={{ marginTop: "25px", fontWeight: "bold" }}>{status}</p>

      {count > 0 && (
        <a
          href="/global_collections.json"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "10px",
            color: "#004aad",
            textDecoration: "underline",
          }}
        >
          📂 View Collected Words ({count})
        </a>
      )}
    </div>
  );
}
