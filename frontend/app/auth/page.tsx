"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccess(
          "Account created. Check your email to confirm, then log in."
        );
        setMode("login");
        setPassword("");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "12px 0",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    borderRadius: 10,
    border: "none",
    background: active ? "rgba(255,255,255,0.08)" : "transparent",
    color: active ? "white" : "rgba(255,255,255,0.35)",
    transition: "all 0.2s ease",
  });

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
          width: "100%",
          maxWidth: 420,
          animation: "fadeIn 0.4s ease",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Link
            href="/"
            style={{
              fontWeight: 800,
              fontSize: 26,
              letterSpacing: -0.5,
            }}
          >
            Job<span style={{ color: "#4ade80" }}>Copilot</span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "36px 32px",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 32,
              padding: 4,
              borderRadius: 12,
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <button
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              style={tabStyle(mode === "login")}
            >
              Login
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setError("");
                setSuccess("");
              }}
              style={tabStyle(mode === "signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 8,
              letterSpacing: -0.5,
            }}
          >
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              marginBottom: 28,
              lineHeight: 1.5,
            }}
          >
            {mode === "login"
              ? "Sign in to continue tailoring your applications."
              : "Start getting more interviews in under 60 seconds."}
          </p>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
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
                marginBottom: 20,
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
            <div style={{ marginBottom: 16 }}>
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
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
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
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px 0",
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 12,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                background: loading
                  ? "rgba(74,222,128,0.5)"
                  : "#4ade80",
                color: "black",
                transition: "all 0.2s ease",
              }}
            >
              {loading
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              transition: "color 0.2s ease",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
