import { useState } from "react";

export default function VerifyCertificate() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/verify?code=${code}`);
      const data = await res.json();
      if (data.error) {
        setError("❌ Certificate not found");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sikhulumaBlue text-white p-6">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-sikhulumaBlue mb-4">
          Sikhuluma.AI Certificate Verification
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Enter your certificate code below:
        </p>

        <div className="flex gap-2 justify-center mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. PEJU321"
            className="border border-gray-300 rounded-md p-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-sikhulumaGreen"
          />
          <button
            onClick={handleCheck}
            className="bg-sikhulumaGreen hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
          >
            Verify
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {result && (
          <div className="bg-emerald-50 border border-sikhulumaGreen rounded-lg p-4 mt-6 text-gray-800">
            <h2 className="text-xl font-bold text-sikhulumaGreen mb-2">
              ✅ Certificate Verified
            </h2>
            <p><b>Name:</b> {result.name}</p>
            <p><b>Issued By:</b> {result.issuedBy}</p>
            <p><b>Date:</b> {result.date}</p>
            <p><b>Status:</b> {result.status}</p>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-200">
        © 2025 Sikhuluma.AI — Empowering African Languages with AI
      </p>
    </div>
  );
}
