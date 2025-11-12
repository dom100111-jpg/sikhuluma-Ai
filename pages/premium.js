// pages/premium.js
import React, { useState } from "react";

export default function Premium() {
  const [paymentStatus, setPaymentStatus] = useState("idle");

  // simulate payment for now
  const handlePayment = async () => {
    setPaymentStatus("processing");

    // 👇 Placeholder for real payment logic
    try {
      await new Promise((res) => setTimeout(res, 2000));
      setPaymentStatus("success");
    } catch (err) {
      setPaymentStatus("failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Sikhuluma.ai Premium Access</h1>
      <p>Support the growth of Siswati AI and unlock verified certificates.</p>

      {paymentStatus === "idle" && (
        <button
          onClick={handlePayment}
          style={{
            background: "#007b5e",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Pay Now (Placeholder)
        </button>
      )}

      {paymentStatus === "processing" && <p>Processing payment …</p>}
      {paymentStatus === "success" && (
        <p style={{ color: "green" }}>✅ Payment successful! Your access is unlocked.</p>
      )}
      {paymentStatus === "failed" && (
        <p style={{ color: "red" }}>❌ Payment failed. Please try again.</p>
      )}
    </div>
  );
}
