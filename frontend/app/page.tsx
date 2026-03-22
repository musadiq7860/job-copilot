import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: "#06060f", color: "white", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 60px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, background: "rgba(6,6,15,0.9)",
        backdropFilter: "blur(12px)", zIndex: 100
      }}>
        <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>
          Job<span style={{ color: "#4ade80" }}>Copilot</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/auth" style={{
            color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "8px 16px",
            borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)"
          }}>
            Login
          </Link>
          <Link href="/auth" style={{
            background: "#4ade80", color: "black", fontWeight: 700,
            fontSize: 13, padding: "10px 22px", borderRadius: 10
          }}>
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "120px 60px 100px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: 999, padding: "6px 16px", fontSize: 12,
          color: "rgba(74,222,128,0.9)", marginBottom: 36
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          Powered by Groq · llama-3.3-70b · Free to use
        </div>

        <h1 style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginBottom: 28 }}>
          Stop sending<br />
          <span style={{ color: "#4ade80" }}>generic applications.</span><br />
          Start getting hired.
        </h1>

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 19, maxWidth: 540, lineHeight: 1.7, marginBottom: 44 }}>
          Paste any job description. Upload your resume. Get a fully tailored resume + cover letter in under 60 seconds — ATS optimized, ready to send.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 80 }}>
          <Link href="/auth" style={{
            background: "#4ade80", color: "black", fontWeight: 700,
            fontSize: 15, padding: "18px 40px", borderRadius: 14, display: "inline-block"
          }}>
            Tailor My Application →
          </Link>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>No credit card required</span>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 580 }}>
          {[
            { num: "60 sec", label: "avg time to get output" },
            { num: "ATS", label: "keyword optimized output" },
            { num: "100%", label: "free during beta" },
          ].map((s) => (
            <div key={s.num} style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "22px 20px",
              background: "rgba(255,255,255,0.02)"
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#4ade80" }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "100px 60px", maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: "#4ade80", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>How it works</p>
        <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1, marginBottom: 60 }}>
          Three steps to a<br />perfect application
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { step: "01", title: "Upload your resume", desc: "Upload your existing resume PDF. We extract your experience, skills, and achievements automatically." },
            { step: "02", title: "Paste the job description", desc: "Copy the full job posting. Our AI finds every keyword and requirement the employer is looking for." },
            { step: "03", title: "Download tailored output", desc: "Get rewritten resume bullets + a personalized cover letter. ATS optimized and ready to send." },
          ].map((item) => (
            <div key={item.step} style={{
              position: "relative", padding: "28px 24px",
              borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)"
            }}>
              <div style={{
                fontSize: 64, fontWeight: 800, color: "rgba(255,255,255,0.03)",
                position: "absolute", top: 12, right: 20, lineHeight: 1
              }}>{item.step}</div>
              <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>{item.step}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "100px 60px", maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: "#4ade80", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Features</p>
        <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1, marginBottom: 60 }}>
          Everything you need<br />to stand out
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "01", title: "60 second output", desc: "Groq's ultra-fast inference means you are never waiting around." },
            { icon: "02", title: "ATS keyword matching", desc: "Bullets rewritten to match exactly what the employer needs." },
            { icon: "03", title: "Tailored cover letters", desc: "3-paragraph cover letter written for each specific role." },
            { icon: "04", title: "Resume PDF output", desc: "Download a professionally formatted resume PDF instantly." },
            { icon: "05", title: "Application history", desc: "Track every application you have tailored in your dashboard." },
            { icon: "06", title: "Secure and private", desc: "Your resume data is never stored without your permission." },
          ].map((f) => (
            <div key={f.title} style={{
              padding: "22px 20px", borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)"
            }}>
              <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: 3, fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "100px 60px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)",
          borderRadius: 24, padding: "48px 56px", textAlign: "center"
        }}>
          <div style={{ fontSize: 48, marginBottom: 24, color: "#4ade80", fontWeight: 800 }}>"</div>
          <p style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.6, maxWidth: 600, margin: "0 auto 24px", color: "rgba(255,255,255,0.85)" }}>
            I went from zero callbacks to 3 interview calls in one week. The tailored cover letters are insanely good.
          </p>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>— Ahmed K., Software Engineer, Lahore</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "120px 60px", textAlign: "center" }}>
        <h2 style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, marginBottom: 18 }}>Ready to get hired?</h2>
        <p style={{ color: "rgba(255,255,255,0.35)", marginBottom: 44, fontSize: 18 }}>
          Join hundreds of job seekers already using JobCopilot.
        </p>
        <Link href="/auth" style={{
          background: "#4ade80", color: "black", fontWeight: 700,
          fontSize: 15, padding: "20px 56px", borderRadius: 16, display: "inline-block"
        }}>
          Start for Free →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "28px 60px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>Job<span style={{ color: "#4ade80" }}>Copilot</span></div>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Built with Groq · FastAPI · Next.js</div>
      </footer>

    </main>
  );
}