import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Main Title */}
      <h1
        style={{
          color: "#004aad",
          fontSize: "2.8rem",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        SIKHULUMA AI
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          color: "#333",
          marginBottom: "30px",
        }}
      >
        Founded by <strong>Dominic Dlamini</strong> <br />
        Sikhuluma Global Council
      </p>

      {/* Action Buttons */}
      <div style={{ marginTop: "30px" }}>
        <Link href="/learn">
          <button
            style={{
              backgroundColor: "#004aad",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "12px 22px",
              margin: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Learn siSwati
          </button>
        </Link>

        <Link href="/translate">
          <button
            style={{
              backgroundColor: "#f9a825",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "12px 22px",
              margin: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Translate
          </button>
        </Link>

        <Link href="/verify">
          <button
            style={{
              backgroundColor: "#43a047",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "12px 22px",
              margin: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Verify Certificate (PEJU)
          </button>
        </Link>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "50px",
          color: "#777",
          fontSize: "14px",
        }}
      >
        © 2025 Sikhuluma AI — Empowering African Languages
      </p>

      {/* Founder Shortcut (Hidden Admin Access) */}
      <div style={{ marginTop: "40px" }}>
        <a
          href="/admin"
          style={{
            backgroundColor: "#222",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          👑 Admin Panel
        </a>
      </div>
    </div>
  );
}
