export default function handler(req, res) {
  try {
    const { code } = req.query;

    // Example certificate data
    const certificates = {
      PEJU321: {
        name: "Nomsa Dlamini",
        issuedBy: "Sikhuluma.AI",
        date: "November 5, 2025",
        status: "Verified",
      },
      SIK2025: {
        name: "Bongani Maseko",
        issuedBy: "Sikhuluma.AI",
        date: "November 6, 2025",
        status: "Verified",
      },
    };

    const details = certificates[code];

    if (!details) {
      res.status(404).json({ error: "Certificate not found" });
    } else {
      res.status(200).json(details);
    }
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
