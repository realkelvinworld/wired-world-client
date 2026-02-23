"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          backgroundColor: "#fff",
          color: "#111",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "64px 16px",
          }}
        >
          <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
            {/* Icon */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "#fef2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  width={32}
                  height={32}
                  fill="#ef4444"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z" />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                marginTop: 8,
                fontSize: 16,
                color: "#6b7280",
                lineHeight: 1.5,
              }}
            >
              A critical error occurred. Please try refreshing the page.
            </p>

            {/* Error message */}
            {error.message && (
              <p
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: "#9ca3af",
                  lineHeight: 1.5,
                }}
              >
                {error.message}
              </p>
            )}

            {/* Digest */}
            {error.digest && (
              <p
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#9ca3af",
                }}
              >
                Error ID: {error.digest}
              </p>
            )}

            {/* Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginTop: 24,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={reset}
                style={{
                  height: 40,
                  padding: "0 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#fff",
                  color: "#111",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  height: 40,
                  padding: "0 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#fff",
                  color: "#111",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Go home
              </Link>
              <Link
                href="/shop"
                style={{
                  height: 40,
                  padding: "0 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Visit the store
              </Link>
            </div>

            {/* Contact */}
            <p style={{ marginTop: 32, fontSize: 12, color: "#9ca3af" }}>
              If this keeps happening, please{" "}
              <Link
                href="/contact"
                style={{
                  color: "#6b7280",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
