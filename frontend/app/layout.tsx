import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobCopilot — Tailor your resume with AI",
  description: "Paste a job description, upload your resume, get a tailored application in 60 seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}