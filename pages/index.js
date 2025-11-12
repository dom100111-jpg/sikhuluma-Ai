import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sikhuluma AI</title>
        <meta name="description" content="Sikhuluma AI official platform" />
        {/* ✅ Paste your Facebook meta-tag here */}
        <meta
          name="facebook-domain-verification"
          content="9vgmedbn3zp2qnc5mgrgew5vbmnsi5a"
        />
      </Head>

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
          Founded by <strong>Sandile Domenic</strong>
          <br />
          Sikhuluma Global Council
        </p>

        {/* Action Buttons */}
        <div>
          <Link href="/learn">
            <button
              style={{
                margin: "10px",
                padding: "12px 25px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Learn Siswati
            </button>
          </Link>

          <Link href="/verify">
            <button
              style={{
                margin: "10px",
                padding: "12px 25px",
                backgroundColor: "#00b894",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Verify Certificate
            </button>
          </Link>
        </div>

        <footer style={{ marginTop: "60px", color: "#777" }}>
          © {new Date().getFullYear()} Sikhuluma AI. All Rights Reserved.
        </footer>
      </div>
    </>
  );
}
