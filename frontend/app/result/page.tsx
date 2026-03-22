"use client";

import Link from "next/link";

export default function ResultPage() {
  return (
    <main
      style={{
        background: "#06060f",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          textAlign: "center",
          animation: "fadeIn 0.4s ease",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(74,222,128,0.1)",
            border: "1px solid rgba(74,222,128,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 24,
            color: "#4ade80",
            fontWeight: 800,
          }}
        >
          ✓
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: -0.5,
            marginBottom: 12,
          }}
        >
          Application Ready
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 15,
            marginBottom: 40,
            lineHeight: 1.6,
            maxWidth: 400,
          }}
        >
          Your tailored resume and cover letter have been downloaded.
          Good luck with your application.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/tool"
            style={{
              background: "#4ade80",
              color: "black",
              fontWeight: 700,
              fontSize: 14,
              padding: "14px 32px",
              borderRadius: 12,
              display: "inline-block",
            }}
          >
            Tailor Another →
          </Link>
          <Link
            href="/dashboard"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              padding: "14px 24px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "inline-block",
              fontWeight: 600,
            }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
