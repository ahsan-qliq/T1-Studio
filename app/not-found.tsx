import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f5f0eb" }}>
        <main
          aria-labelledby="not-found-heading"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            color: "#1a1a1a",
          }}
        >
          <p style={{ fontSize: "clamp(5rem,20vw,11rem)", fontWeight: 700, lineHeight: 1, margin: 0 }}>
            404
          </p>
          <h1 id="not-found-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 600, margin: "0.5rem 0 1rem" }}>
            Page Not Found
          </h1>
          <p style={{ maxWidth: "28rem", lineHeight: 1.6, opacity: 0.6, marginBottom: "2.5rem" }}>
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#1a1a1a",
              color: "#f5f0eb",
              padding: "0.875rem 2rem",
              borderRadius: "9999px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            Go to Homepage
            <ArrowRight size={16} />
          </Link>
        </main>
      </body>
    </html>
  );
}
