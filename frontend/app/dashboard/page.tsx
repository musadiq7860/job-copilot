"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalApps, setTotalApps] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [recentApps, setRecentApps] = useState<any[]>([]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }
      setUser(user);
      await fetchApplications(user.id);
      setLoading(false);
    };
    checkSession();
  }, [router]);

  const fetchApplications = async (userId: string) => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return;

    setTotalApps(data.length);
    setRecentApps(data.slice(0, 5));

    const now = new Date();
    const thisMonthApps = data.filter((app) => {
      const appDate = new Date(app.created_at);
      return (
        appDate.getMonth() === now.getMonth() &&
        appDate.getFullYear() === now.getFullYear()
      );
    });
    setThisMonth(thisMonthApps.length);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main style={{
        background: "#06060f", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Loading...</p>
      </main>
    );
  }

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: "24px",
  };

  return (
    <main style={{ background: "#06060f", minHeight: "100vh", color: "white" }}>

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 60px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, background: "rgba(6,6,15,0.9)",
        backdropFilter: "blur(12px)", zIndex: 100
      }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>
          Job<span style={{ color: "#4ade80" }}>Copilot</span>
        </Link>
        <button onClick={handleLogout} style={{
          color: "rgba(255,255,255,0.5)", fontSize: 13,
          padding: "10px 20px", borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer", fontWeight: 600, background: "transparent"
        }}>
          Logout
        </button>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 40px" }}>

        {/* Welcome */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontSize: 13, color: "#4ade80", letterSpacing: 2,
            textTransform: "uppercase", marginBottom: 12, fontWeight: 600
          }}>
            Dashboard
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 8 }}>
            Welcome back
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>
            {user?.email}
          </p>
        </div>

        {/* CTA Card */}
        <Link href="/tool" style={{
          display: "block",
          background: "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.02) 100%)",
          border: "1px solid rgba(74,222,128,0.15)",
          borderRadius: 20, padding: "44px 40px",
          marginBottom: 32, cursor: "pointer"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>
                Start New Application
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                Upload your resume and paste a job description to get started.
              </p>
            </div>
            <div style={{
              background: "#4ade80", color: "black", fontWeight: 700,
              fontSize: 14, padding: "14px 28px", borderRadius: 12, flexShrink: 0
            }}>
              Go to Tool →
            </div>
          </div>
        </Link>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16, marginBottom: 48
        }}>
          {[
            { label: "Total Applications", value: totalApps.toString() },
            { label: "This Month", value: thisMonth.toString() },
            { label: "Success Rate", value: totalApps > 0 ? "100%" : "0%" },
          ].map((s) => (
            <div key={s.label} style={cardStyle}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#4ade80", marginBottom: 6 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Applications */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, letterSpacing: -0.3 }}>
            Recent Applications
          </h2>

          {recentApps.length === 0 ? (
            <div style={{ ...cardStyle, textAlign: "center", padding: "48px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, marginBottom: 20 }}>
                No applications yet. Tailor your first one now.
              </p>
              <Link href="/tool" style={{
                background: "#4ade80", color: "black", fontWeight: 700,
                fontSize: 13, padding: "12px 24px", borderRadius: 10
              }}>
                Start First Application →
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recentApps.map((app) => (
                <div key={app.id} style={{
                  ...cardStyle,
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                      {app.candidate_name}
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                      {app.tone} · {new Date(app.created_at).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                      })}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, padding: "6px 14px",
                    borderRadius: 8, background: "rgba(74,222,128,0.1)",
                    color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)"
                  }}>
                    Downloaded
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}