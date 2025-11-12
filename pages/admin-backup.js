import { useState } from "react";

export default function AdminBackup() {
  const [status, setStatus] = useState("");
  const [fileContent, setFileContent] = useState(null);

  // Export data as JSON
  const handleExport = async () => {
    try {
      const response = await fetch("/community_submissions.json");
      const data = await response.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "sikhuluma_backup.json";
      link.click();

      setStatus("✅ Data exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      setStatus("❌ Failed to export data.");
    }
  };

  // Import JSON data (restore backup)
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setFileContent(importedData);
        setStatus("✅ Backup file loaded successfully!");
      } catch (err) {
        console.error(err);
        setStatus("❌ Error reading backup file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "#004aad" }}>💾 Data Export & Backup System</h2>
      <p>Safely export or restore Sikhuluma.AI community data.</p>

      <div style={{ margin: "30px auto", maxWidth: "600px" }}>
        <button
          onClick={handleExport}
          style={{
            backgroundColor: "#43a047",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            marginRight: "20px",
            cursor: "pointer",
          }}
        >
          ⬇️ Export Data
        </button>

        <label
          style={{
            backgroundColor: "#2196f3",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⬆️ Import Backup
          <input
            type="file"
            accept="application/json"
            onChange={handleImport}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {status && (
        <p
          style={{
            color: status.startsWith("✅") ? "green" : "red",
            marginTop: "20px",
          }}
        >
          {status}
        </p>
      )}

      {fileContent && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h4>📄 Backup Preview</h4>
          <pre
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "6px",
              overflowX: "auto",
              fontSize: "14px",
            }}
          >
            {JSON.stringify(fileContent, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <a
          href="/admin"
          style={{
            color: "#004aad",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          ← Back to Admin Dashboard
        </a>
      </div>
    </div>
  );
}
