"use client";
import { useState } from "react";

export default function Home() {
  const [jdText, setJdText] = useState("");
  const [tone, setTone] = useState("professional");
  const [candidateName, setCandidateName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jdText || !resumeFile || !candidateName) {
      setError("Please fill all fields and upload your resume.");
      return;
    }
    setError("");
    setLoading(true);
    setDone(false);

    const formData = new FormData();
    formData.append("jd_text", jdText);
    formData.append("tone", tone);
    formData.append("candidate_name", candidateName);
    formData.append("resume_file", resumeFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/tailor", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Something went wrong.");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tailored_${candidateName}.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
      setDone(true);
    } catch (err) {
      setError("Failed to connect to backend. Make sure it is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080810] text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Job <span className="text-[#4ade80]">Copilot</span>
          </h1>
          <p className="text-[#8080aa] mt-2 text-sm">
            Paste a job description + upload your resume → get a tailored DOCX in seconds
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0f0f1a] border border-[#25253a] rounded-2xl p-8 flex flex-col gap-6">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#8080aa] uppercase tracking-widest font-mono">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Mussadiq Khan"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="bg-[#161625] border border-[#25253a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#44445a] focus:outline-none focus:border-[#4ade80] transition"
            />
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#8080aa] uppercase tracking-widest font-mono">
              Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="bg-[#161625] border border-[#25253a] rounded-lg px-4 py-3 text-sm text-[#8080aa] file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#4ade80] file:text-black file:text-xs file:font-medium cursor-pointer"
            />
            {resumeFile && (
              <p className="text-xs text-[#4ade80] font-mono">✓ {resumeFile.name}</p>
            )}
          </div>

          {/* JD Text */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#8080aa] uppercase tracking-widest font-mono">
              Job Description
            </label>
            <textarea
              placeholder="Paste the full job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              rows={8}
              className="bg-[#161625] border border-[#25253a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#44445a] focus:outline-none focus:border-[#4ade80] transition resize-none"
            />
          </div>

          {/* Tone */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#8080aa] uppercase tracking-widest font-mono">
              Cover Letter Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-[#161625] border border-[#25253a] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80] transition"
            >
              <option value="professional">Professional</option>
              <option value="technical">Technical</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-400 font-mono bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          {/* Success */}
          {done && (
            <p className="text-xs text-[#4ade80] font-mono bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-lg px-4 py-3">
              ✓ Your tailored DOCX has been downloaded successfully!
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#4ade80] hover:bg-[#22c55e] text-black font-semibold py-3 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Tailoring your application..." : "Tailor My Application →"}
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-[#44445a] text-xs mt-6 font-mono">
          Powered by Groq · llama-3.3-70b
        </p>

      </div>
    </main>
  );
}