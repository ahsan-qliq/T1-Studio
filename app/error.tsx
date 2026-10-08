"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: ErrorProps) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f5f0eb" }}>
        <main
          aria-labelledby="error-heading"
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
            500
          </p>
          <h1 id="error-heading" style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 600, margin: "0.5rem 0 1rem" }}>
            Something went wrong
          </h1>
          <p style={{ maxWidth: "28rem", lineHeight: 1.6, opacity: 0.6, marginBottom: "2.5rem" }}>
            An unexpected error occurred. Please try again, or return to the homepage.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#1a1a1a",
                color: "#f5f0eb",
                padding: "0.875rem 2rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              <RefreshCw size={16} />
              Try again
            </button>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                color: "#1a1a1a",
                padding: "0.875rem 2rem",
                borderRadius: "9999px",
                border: "1.5px solid #1a1a1a",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Go to Homepage
              <ArrowRight size={16} />
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
