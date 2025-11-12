import { useState, useEffect } from "react";

export default function Dictionary() {
  // State variables
  const [dictionary, setDictionary] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load dictionary from the /public/data/ folder
  useEffect(() => {
    fetch("/data/siswatiDictionary.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dictionary file");
        return res.json();
      })
      .then((data) => {
        setDictionary(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter Siswati + English words based on search
  const filteredWords = Object.entries(dictionary).filter(([siswati, english]) =>
    siswati.toLowerCase().includes(searchTerm.toLowerCase()) ||
    english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9fbff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#0056b3", textAlign: "center", marginBottom: "30px" }}>
        📘 Siswati Dictionary
      </h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>⚠️ {error}</p>}
      {loading && <p style={{ textAlign: "center" }}>Loading dictionary...</p>}

      <input
        type="text"
        placeholder="Search a word..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      />

      {filteredWords.length === 0 ? (
        <p style={{ textAlign: "center" }}>No words found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredWords.map(([siswati, english]) => (
            <li
              key={siswati}
              style={{
                backgroundColor: "#fff",
                marginBottom: "8px",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              <strong style={{ color: "#003366" }}>{siswati}</strong>:{" "}
              <span style={{ color: "#333" }}>{english}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
