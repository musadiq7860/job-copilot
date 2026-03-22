"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ToolPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("professional");

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setResumeFile(file);
        setError("");
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!resumeFile) {
      setError("Please upload your resume PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("candidate_name", name.trim());
      formData.append("resume_file", resumeFile);
      formData.append("jd_text", jobDescription.trim());
      formData.append("tone", tone);

      const response = await fetch("http://127.0.0.1:8000/tailor", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Server error: ${response.status}`);
      }

      // Download the DOCX
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.trim().replace(/\s+/g, "_")}_tailored_application.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setSuccess(
        "Your tailored application has been downloaded successfully."
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to process your application. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 18px",
    fontSize: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    transition: "border-color 0.2s ease",
  };

  const toneOptions = ["professional", "technical", "casual"];

  if (loading) {
    return (
      <main
        style={{
          background: "#06060f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            border: "2px solid rgba(255,255,255,0.1)",
            borderTopColor: "#4ade80",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
          }}
        />
      </main>
    );
  }

  return (
    <main style={{ background: "#06060f", minHeight: "100vh" }}>
      {/* Nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 60px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          background: "rgba(6,6,15,0.9)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        <Link
          href="/dashboard"
          style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}
        >
          Job<span style={{ color: "#4ade80" }}>Copilot</span>
        </Link>
        <button
          onClick={handleLogout}
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            padding: "10px 20px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "60px 40px",
          animation: "fadeIn 0.4s ease",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p
            style={{
              fontSize: 13,
              color: "#4ade80",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Application Tool
          </p>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: -1,
              marginBottom: 8,
            }}
          >
            Tailor your application
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>
            Upload your resume and paste the job description. We will do the
            rest.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 24,
              fontSize: 13,
              color: "#ef4444",
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 24,
              fontSize: 13,
              color: "#4ade80",
              lineHeight: 1.5,
            }}
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 8,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              style={inputStyle}
            />
          </div>

          {/* File Upload */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 8,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Resume PDF
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              style={{
                border: `2px dashed ${
                  dragOver
                    ? "#4ade80"
                    : resumeFile
                    ? "rgba(74,222,128,0.3)"
                    : "rgba(255,255,255,0.1)"
                }`,
                borderRadius: 16,
                padding: "40px 24px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: dragOver
                  ? "rgba(74,222,128,0.04)"
                  : resumeFile
                  ? "rgba(74,222,128,0.02)"
                  : "transparent",
              }}
            >
              {resumeFile ? (
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#4ade80",
                      marginBottom: 4,
                    }}
                  >
                    {resumeFile.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {(resumeFile.size / 1024).toFixed(1)} KB — Click to change
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: 4,
                    }}
                  >
                    Drop your PDF here or click to browse
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    PDF files only, max 10MB
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Job Description */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 8,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              required
              rows={10}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: 200,
                lineHeight: 1.7,
              }}
            />
          </div>

          {/* Tone */}
          <div style={{ marginBottom: 36 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 12,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Tone
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {toneOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  style={{
                    padding: "12px 24px",
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 10,
                    border:
                      tone === t
                        ? "1px solid rgba(74,222,128,0.3)"
                        : "1px solid rgba(255,255,255,0.08)",
                    background:
                      tone === t
                        ? "rgba(74,222,128,0.1)"
                        : "rgba(255,255,255,0.03)",
                    color: tone === t ? "#4ade80" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "18px 0",
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 14,
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              background: submitting ? "rgba(74,222,128,0.5)" : "#4ade80",
              color: "black",
              transition: "all 0.2s ease",
              letterSpacing: -0.3,
            }}
          >
            {submitting
              ? "Tailoring your application..."
              : "Tailor My Application →"}
          </button>
        </form>

        {/* Back */}
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link
            href="/dashboard"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
            }}
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
