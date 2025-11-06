import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";

export default function Verify() {
  const [code, setCode] = useState("");
  const [details, setDetails] = useState(null);

  // Function to verify certificate
  async function verifyCertificate(code) {
    try {
      const res = await fetch(`/api/verify?code=${code}`);
      const data = await res.json();

      if (res.ok) {
        setDetails(data);
      } else {
        setDetails({
          name: "Invalid",
          issuedBy: "",
          date: "",
          status: "Invalid",
        });
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      setDetails({
        name: "Error",
        issuedBy: "",
        date: "",
        status: "Error",
      });
    }
  }

  // Start QR scanning
  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        setCode(decodedText);
        verifyCertificate(decodedText);
        html5QrCode.stop();
      },
      (error) => {
        console.warn("QR scanning error:", error);
      }
    );

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "2rem" }}>
      <div
        id="reader"
        style={{
          width: "300px",
          margin: "auto",
          border: "2px dashed #ccc",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <p style={{ textAlign: "center" }}>
          Align the QR code within this box to verify.
        </p>
      </div>

      {details && (
        <motion.div
          animate={{ boxShadow: "0 0 20px #22c55e" }}
          transition={{ duration: 1 }}
          className="rounded-lg p-4 bg-white text-center mt-6 border-2 border-green-500"
        >
          <p>
            <strong>Holder Name:</strong> {details.name}
          </p>
          <p>
            <strong>Issued By:</strong> {details.issuedBy}
          </p>
          <p>
            <strong>Date of Issue:</strong> {details.date}
          </p>
          <p>
            <strong>Status:</strong> {details.status}
          </p>
        </motion.div>
      )}
    </main>
  );
}
