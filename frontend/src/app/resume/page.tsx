"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  Wand2,
  Building,
  GraduationCap,
  Briefcase,
  Layers,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<"editor" | "ats" | "jd-match">("editor");

  // Resume State
  const [personal, setPersonal] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@careerforge.io",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    role: "Senior Frontend Engineer",
    summary:
      "Results-driven Senior Frontend Engineer with 4+ years of expertise in architecting high-scale React, TypeScript, and Next.js platforms. Proven track record reducing load times by 42% and driving 15M+ active user sessions.",
  });

  const [experiences, setExperiences] = useState([
    {
      company: "Stripe",
      role: "Frontend Engineer II",
      duration: "2023 - Present",
      bullets: [
        "Architected modular checkout UI components using Next.js & TypeScript, increasing transaction conversion by 14%.",
        "Engineered real-time telemetry pipelines reducing frontend latency bottlenecks by 35%.",
      ],
    },
    {
      company: "Acme Tech Labs",
      role: "Software Developer",
      duration: "2021 - 2023",
      bullets: [
        "Built responsive client portals with React and Tailwind CSS serving 200k+ monthly active users.",
        "Integrated robust REST and GraphQL API microservices with 99.9% uptime.",
      ],
    },
  ]);

  const [skills, setSkills] = useState([
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "GraphQL", "Node.js", "Docker", "Jest", "CI/CD"
  ]);

  // AI ATS Scanner State
  const [atsScore, setAtsScore] = useState(88);
  const [analyzing, setAnalyzing] = useState(false);
  const [targetJD, setTargetJD] = useState("");
  const [jdMatchScore, setJdMatchScore] = useState<number | null>(null);

  const runAtsAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAtsScore(92);
      setAnalyzing(false);
    }, 1000);
  };

  const handleJdScan = () => {
    if (!targetJD.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setJdMatchScore(86);
      setAnalyzing(false);
    }, 1200);
  };

  const aiRewriteSummary = () => {
    setPersonal((prev) => ({
      ...prev,
      summary:
        "High-impact Senior Frontend Engineer with 4+ years spearheading scalable web architectures across React, Next.js, and TypeScript ecosystems. Spearheaded performance optimizations reducing LCP by 42% and deployed mission-critical microfrontends at enterprise scale.",
    }));
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Gemini ATS Engine Powered
              </span>
              <span className="text-xs text-slate-400">• Standard ATS Format</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Resume Builder & AI ATS Scanner
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live preview, AI bullet point optimizer, and job description keyword matcher.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={runAtsAnalysis}
              disabled={analyzing}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${analyzing ? "animate-spin" : ""}`} />
              <span>{analyzing ? "Analyzing ATS..." : "Analyze with AI"}</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "editor"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Resume Editor
          </button>
          <button
            onClick={() => setActiveTab("ats")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === "ats"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>ATS Score Breakdown ({atsScore}/100)</span>
          </button>
          <button
            onClick={() => setActiveTab("jd-match")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "jd-match"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Target Job Matcher
          </button>
        </div>

        {/* Main Grid: Left editor/analysis, Right live preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Editor Tab */}
            {activeTab === "editor" && (
              <div className="space-y-5">
                {/* Personal Information */}
                <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-400" />
                    <span>Personal Details</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={personal.name}
                      onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                      placeholder="Full Name"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={personal.role}
                      onChange={(e) => setPersonal({ ...personal, role: e.target.value })}
                      placeholder="Target Title"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="email"
                      value={personal.email}
                      onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                      placeholder="Email"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={personal.phone}
                      onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                      placeholder="Phone"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Summary with AI rewrite button */}
                <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Professional Summary</h3>
                    <button
                      type="button"
                      onClick={aiRewriteSummary}
                      className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 flex items-center gap-1.5 transition"
                    >
                      <Wand2 className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Rewrite with AI</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={personal.summary}
                    onChange={(e) => setPersonal({ ...personal, summary: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Experience section */}
                <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-indigo-400" />
                    <span>Work Experience</span>
                  </h3>
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{exp.company}</span>
                        <span className="text-[11px] text-slate-400">{exp.duration}</span>
                      </div>
                      <p className="text-xs text-indigo-400">{exp.role}</p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                        {exp.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Skills section */}
                <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-white">Core Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ATS Score Tab */}
            {activeTab === "ats" && (
              <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="h-24 w-24 rounded-full border-4 border-indigo-500 flex flex-col items-center justify-center bg-indigo-950/30 shrink-0">
                    <span className="text-3xl font-bold text-white">{atsScore}</span>
                    <span className="text-[10px] text-indigo-300 uppercase font-semibold">ATS Score</span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Excellent • Top 5% Match
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">High Recruiter Visibility</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Your resume conforms to 18 standard ATS parsing rules and avoids problematic formatting.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Strengths
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                      <span>Quantified achievements present across work history (e.g. &apos;42% faster&apos;, &apos;15M+ users&apos;).</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                      <span>Standard reverse chronological layout parsing successfully.</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">
                    Recommended Improvements
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                      <span>Include AWS or Cloudflare experience in summary for Cloud-focused positions.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Target Job Description Matcher Tab */}
            {activeTab === "jd-match" && (
              <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span>Match Against Specific Job Description</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Paste any job description to discover missing keywords and optimize your resume before submitting.
                </p>

                <textarea
                  rows={6}
                  value={targetJD}
                  onChange={(e) => setTargetJD(e.target.value)}
                  placeholder="Paste the Job Description requirements here..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />

                <button
                  onClick={handleJdScan}
                  disabled={analyzing || !targetJD.trim()}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-50 transition cursor-pointer"
                >
                  {analyzing ? "Evaluating Match..." : "Compare Resume vs Job Description"}
                </button>

                {jdMatchScore !== null && (
                  <div className="mt-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Target Match Rate</span>
                      <span className="text-xl font-bold text-emerald-400">{jdMatchScore}%</span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <p><strong>Matched Keywords:</strong> React, TypeScript, Next.js, Architecture</p>
                      <p className="text-amber-300"><strong>Missing Keywords:</strong> WebSockets, Kubernetes, Kafka</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live ATS-Friendly Resume Preview (6 cols) */}
          <div className="lg:col-span-6">
            <div className="glass-card p-4 rounded-3xl border border-slate-800 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 px-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-indigo-400" />
                  <span>Real-Time PDF Template Preview</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">ATS Clean Layout</span>
              </div>

              {/* Printable White Sheet Preview */}
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl font-sans text-xs space-y-5 min-h-[580px]">
                {/* Header */}
                <div className="border-b border-slate-300 pb-4 text-center">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">{personal.name}</h2>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5">{personal.role}</p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {personal.email} • {personal.phone} • {personal.location}
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                    Professional Summary
                  </h3>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{personal.summary}</p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                    Work Experience
                  </h3>
                  <div className="space-y-3">
                    {experiences.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between font-bold text-[11px]">
                          <span className="text-slate-900">{exp.company} — {exp.role}</span>
                          <span className="text-slate-500 font-normal">{exp.duration}</span>
                        </div>
                        <ul className="list-disc list-inside mt-1 space-y-0.5 text-[10px] text-slate-700">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                    Technical Skills
                  </h3>
                  <p className="text-[10px] text-slate-700">
                    <strong>Core Technologies:</strong> {skills.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
