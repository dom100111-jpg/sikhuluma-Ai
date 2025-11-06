import { useState } from "react";

export default function Translate() {
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState("");

  // Small English ↔ siSwati dictionary
  const dictionary = {
    hello: "sawubona",
    thankyou: "ngiyabonga",
    yes: "yebo",
    no: "cha",
    sawubona: "hello",
    ngiyabonga: "thank you",
    yebo: "yes",
    cha: "no",
  };

  const handleTranslate = () => {
    const word = input.trim().toLowerCase().replace(/\s+/g, "");
    const result = dictionary[word];
    setTranslation(result ? result : "No translation found 🫤");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-yellow-600 mb-6">Translate Mode</h1>
      <p className="text-lg text-gray-600 mb-8">
        Type a word or phrase to translate between siSwati and English.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text here..."
          className="border px-4 py-3 rounded-xl shadow w-80 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleTranslate}
          className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-600 transition"
        >
          Translate
        </button>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">Translation Result:</h2>
        <p className="text-gray-800 text-lg font-medium">{translation}</p>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Sikhuluma AI — Empowering African Languages
      </footer>
    </main>
  );
}
