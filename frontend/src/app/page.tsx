"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Code2,
  MessageSquareCode,
  BrainCircuit,
  Building2,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-cyan-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 h-16 backdrop-blur-md bg-[#090d16]/70 border-b border-slate-800/80 px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              CareerForge
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <Link href="/jobs" className="hover:text-white transition">Jobs</Link>
          <Link href="/resume" className="hover:text-white transition">ATS Resume</Link>
          <Link href="/coding" className="hover:text-white transition">Coding Arena</Link>
          <Link href="/interview" className="hover:text-white transition">Interview Coach</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
          >
            <span>Launch App</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-20 text-center relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold animate-in fade-in">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>The Next-Generation Engineering Career Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Forge your career with <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            AI-powered precision.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          From algorithmic challenges to Gemini-powered mock interviews and ATS resume audits—CareerForge equips high-performing developers to land their dream tech offers.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href="/register"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-bold shadow-xl shadow-indigo-500/25 transition flex items-center justify-center gap-2"
          >
            <span>Start Free Journey</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-800 transition flex items-center justify-center gap-2"
          >
            <span>Explore Dashboard Demo</span>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-16 text-left">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">AI ATS Resume Scanner</h3>
            <p className="text-xs text-slate-400">
              Score resumes against top tech job descriptions. Eliminate formatting traps and missing keywords.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Coding Arena</h3>
            <p className="text-xs text-slate-400">
              Interactive multi-language compiler for algorithms, data structures, and FAANG interview problems.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <MessageSquareCode className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">AI Interview Coach</h3>
            <p className="text-xs text-slate-400">
              Real-time conversational mock interviews with comprehensive scorecards on depth, clarity, and confidence.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Verified Skill Badges</h3>
            <p className="text-xs text-slate-400">
              Timed scenario assessments that certify proficiency to top recruiting partners.
            </p>
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="w-full pt-12 pb-6 border-t border-slate-800/80 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <span className="text-2xl font-bold text-white block">14,800+</span>
            <span className="text-xs text-slate-500">Engineers Preparing</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-indigo-400 block">450+</span>
            <span className="text-xs text-slate-500">Tech Companies</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-400 block">94.2%</span>
            <span className="text-xs text-slate-500">ATS Pass Rate</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-purple-400 block">$145k</span>
            <span className="text-xs text-slate-500">Avg Starting Package</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} CareerForge Inc. All rights reserved. Built as a comprehensive full-stack career platform.</p>
      </footer>
    </div>
  );
}
