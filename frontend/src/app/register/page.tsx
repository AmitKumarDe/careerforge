"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Code2,
  MessageSquareCode,
  Star,
  RefreshCw,
} from "lucide-react";
import { registerUser, resendVerification } from "@/services/auth.service";

const QUICK_SKILLS = ["React", "Node.js", "TypeScript", "Python", "Next.js", "MongoDB"];

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "RECRUITER">("USER");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "Node.js"]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Resend state inside success view
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await registerUser({
        name,
        email,
        password,
        role,
        skills: selectedSkills,
      });

      setSuccess(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      setResendMessage("");
      await resendVerification(email);
      setResendMessage("Verification email resent! Please check your inbox & spam folder.");
    } catch {
      setResendMessage("Failed to resend verification. Please try again later.");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#090d16] text-slate-100 flex flex-col lg:flex-row relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* LEFT COLUMN: Visual Brand Showcase (Desktop only) */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-10 xl:p-12 border-r border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-[#0a0f1d]/80 to-[#070a12] relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                CareerForge
              </span>
              <span className="block text-[10px] uppercase font-semibold tracking-wider text-indigo-400 -mt-0.5">
                AI Career Suite
              </span>
            </div>
          </Link>
        </div>

        {/* Center Content: Value Proposition & Feature Badges */}
        <div className="relative z-10 space-y-6 my-auto py-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>Smart Placement Engine</span>
            </span>
            <h2 className="text-2xl xl:text-3xl font-bold text-white tracking-tight leading-snug">
              Prepare smarter. <br />
              Land top engineering offers.
            </h2>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Join 14,800+ developers accelerating their interview preparation, scoring high on ATS algorithms, and practicing real-time mock interviews.
            </p>
          </div>

          {/* 3 Compact Feature Cards */}
          <div className="space-y-3 max-w-md">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
                <FileCheck2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">AI ATS Resume Optimizer</p>
                <p className="text-[11px] text-slate-400 truncate">Score 90+ against real tech job descriptions</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
                <Code2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">Live Sandboxed Coding Arena</p>
                <p className="text-[11px] text-slate-400 truncate">FAANG algorithms with real-time compiler runner</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3.5 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shrink-0">
                <MessageSquareCode className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">Gemini Mock Interview Coach</p>
                <p className="text-[11px] text-slate-400 truncate">Voice & text critique with depth & clarity scoring</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="text-slate-300 ml-1">4.9/5 Rating</span>
          </div>
          <span className="text-[11px] text-slate-500">Trusted by top talent</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form / Email Verification Stage */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-6 lg:py-8 overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-md my-auto">
          {/* STEP 1: If user registered, show dedicated Verification Email Sent screen */}
          {success ? (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="h-16 w-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
                <Mail className="h-8 w-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Account Created
                </span>
                <h2 className="text-2xl font-bold text-white mt-2 tracking-tight">
                  Verify your email
                </h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  We&apos;ve sent a verification link to:
                </p>
                <p className="text-sm font-semibold text-indigo-300 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 mt-2">
                  {email}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-left text-xs text-slate-300 space-y-1.5">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Next Steps:</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  1. Open the email from <strong>CareerForge</strong>.
                </p>
                <p className="text-[11px] text-slate-400">
                  2. Click the <strong>&quot;Verify Email&quot;</strong> button to activate your account.
                </p>
                <p className="text-[11px] text-slate-400">
                  3. Log in with your credentials to access your dashboard.
                </p>
              </div>

              {resendMessage && (
                <p className="text-xs text-indigo-400 font-medium">{resendMessage}</p>
              )}

              <div className="space-y-2.5 pt-1">
                <Link
                  href="/login"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2"
                >
                  <span>Proceed to Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${resending ? "animate-spin" : ""}`} />
                  <span>{resending ? "Resending..." : "Didn't receive? Resend email"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: The Registration Form */
            <div className="space-y-4">
              {/* Mobile Brand Header */}
              <div className="text-center lg:text-left mb-2">
                <div className="lg:hidden inline-flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-md">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">CareerForge</span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Start practicing and accelerating your tech career today.
                </p>
              </div>

              {/* Compact Role Segmented Switcher */}
              <div className="bg-slate-900/80 border border-slate-800 p-1 rounded-xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setRole("USER")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    role === "USER"
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("RECRUITER")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    role === "RECRUITER"
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>Recruiter</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      required
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      required
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      minLength={6}
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                    />
                  </div>
                </div>

                {/* Skills selection (Compact inline pills, only for Candidate) */}
                {role === "USER" && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                        Primary Tech Skills
                      </label>
                      <span className="text-[10px] text-slate-500">Pick 2 or more</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_SKILLS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                              isSelected
                                ? "bg-indigo-600/30 border-indigo-500 text-indigo-300 font-semibold"
                                : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"
                            }`}
                          >
                            {skill} {isSelected ? "✓" : "+"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Error banner */}
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-indigo-400 transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer pt-2"
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account & Send Verification</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer link */}
              <div className="pt-2 text-center text-xs text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
