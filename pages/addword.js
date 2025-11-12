import React, { useState } from "react";

export default function AddWord() {
  const [siswatiWord, setSiswatiWord] = useState("");
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Saving...");

    try {
      const res = await fetch("/api/addWord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siswatiWord, englishMeaning }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Word added successfully!");
        setSiswatiWord("");
        setEnglishMeaning("");
      } else {
        setStatus("⚠️ Something went wrong: " + data.message);
      }
    } catch (err) {
      setStatus("❌ Error connecting to server: " + err.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        🌍 Add New SiSwati Word
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-100 p-6 rounded-2xl shadow"
      >
        <label className="block mb-3">
          <span className="text-gray-700">SiSwati Word</span>
          <input
            type="text"
            value={siswatiWord}
            onChange={(e) => setSiswatiWord(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. siyakhuluma"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">English Meaning</span>
          <input
            type="text"
            value={englishMeaning}
            onChange={(e) => setEnglishMeaning(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. we speak"
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Word
        </button>
      </form>

      <p className="mt-4 text-gray-600">{status}</p>
    </main>
  );
}
