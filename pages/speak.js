import { useState, useEffect } from "react";

export default function SpeakPage() {
  const [dictionary, setDictionary] = useState({});
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceLang, setVoiceLang] = useState("Siswati");

  // ✅ Load Siswati dictionary from /public/siswatiDictionary.json
  useEffect(() => {
    fetch("/siswatiDictionary.json")
      .then((res) => res.json())
      .then((data) => {
        setDictionary(data);
        setStatus("Dictionary loaded successfully ✅");
      })
      .catch((err) => {
        console.error("Error loading dictionary:", err);
        setStatus("❌ Error loading dictionary");
      });
  }, []);

  // 🧠 Translate word
  const handleTranslate = () => {
    const lowerWord = word.toLowerCase();
    if (dictionary[lowerWord]) {
      setMeaning(dictionary[lowerWord]);
    } else {
      setMeaning("Word not found in dictionary ❌");
    }
  };

  // 🗣️ Speak using OpenAI voice API
  const handleSpeak = async (text, lang) => {
    try {
      setLoading(true);
      const res = await fetch("/api/generateVoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: text, language: lang }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      } else {
        alert("Voice not available for this word.");
      }
    } catch (error) {
      console.error("Error generating voice:", error);
      alert("Error generating voice.");
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "#004aad", marginBottom: "20px" }}>
        🗣️ Speak Siswati or English
      </h1>
      <p>Type a Siswati word, view its English meaning, and hear it spoken aloud.</p>

      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Type word here..."
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <br />

      <button
        onClick={handleTranslate}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Translate"}
      </button>

      <div style={{ marginTop: "25px", fontSize: "18px" }}>
        {word && (
          <p>
            <b>{word}</b> → {meaning}
          </p>
        )}
      </div>

      {meaning && meaning !== "Word not found in dictionary ❌" && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => handleSpeak(word, "Siswati")}
            style={{
              backgroundColor: "#198754",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            🎙️ Speak Siswati
          </button>

          <button
            onClick={() => handleSpeak(meaning, "English")}
            style={{
              backgroundColor: "#6f42c1",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            🎧 Speak English
          </button>
        </div>
      )}

      <p style={{ marginTop: "40px", color: "#555" }}>{status}</p>
    </div>
  );
}
