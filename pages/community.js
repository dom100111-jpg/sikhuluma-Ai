import { useState } from "react";

export default function CommunityPanel() {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/autoCollector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, translation, feedback }),
      });

      if (res.ok) {
        setStatus("✅ Thank you! Your suggestion was saved.");
        setWord("");
        setTranslation("");
        setFeedback("");
      } else {
        setStatus("❌ Failed to submit. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Error connecting to server.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "#004aad" }}>🧠 Community Reflective Panel</h1>
      <p>Help Sikhuluma.AI learn by submitting new words or corrections.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Siswati or English word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Suggested translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        />
        <br />
        <textarea
          placeholder="Optional feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={{
            width: "300px",
            height: "100px",
            padding: "10px",
            borderRadius: "6px",
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "15px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>{status}</p>
    </div>
  );
}
