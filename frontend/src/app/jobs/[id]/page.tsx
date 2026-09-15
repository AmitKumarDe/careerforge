"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Clock,
  ArrowLeft,
  Bookmark,
  Share2,
  Sparkles,
  CheckCircle2,
  Check,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = (params?.id as string) || "stripe-fe";

  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back navigation */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Job Listings</span>
        </Link>

        {/* Job Header Hero */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-slate-800 border border-indigo-500/20 flex items-center justify-center text-2xl font-bold text-white shrink-0">
                ST
              </div>
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  96% ATS Compatibility
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                  Senior Frontend Engineer (Core UI)
                </h1>
                <p className="text-xs text-indigo-400 font-medium mt-0.5">
                  Stripe • Payments & Dashboard Infrastructure
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-center">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-2.5 rounded-xl border transition ${
                  saved
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
                title="Bookmark job"
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Job link copied to clipboard!");
                }}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setApplied(true)}
                disabled={applied}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
              >
                {applied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Applied</span>
                  </>
                ) : (
                  <span>Apply with CareerForge Profile</span>
                )}
              </button>
            </div>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Compensation</span>
              <span className="text-white font-semibold mt-0.5 block">$150,000 - $185,000</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Location</span>
              <span className="text-white font-semibold mt-0.5 block">Remote (US / EU)</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Employment Type</span>
              <span className="text-white font-semibold mt-0.5 block">Full-Time</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 block">Experience Level</span>
              <span className="text-white font-semibold mt-0.5 block">Senior (4+ years)</span>
            </div>
          </div>
        </div>

        {/* Job Content details */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-white mb-2">About the Role</h2>
            <p>
              Stripe is looking for a talented Senior Frontend Engineer to join our Core UI Engineering group. You will architect and maintain mission-critical dashboard workflows, improve web performance, and maintain our global design system.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-white mb-2">Key Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li>Design, build, and deploy high-performance frontend interfaces with React, Next.js, and TypeScript.</li>
              <li>Collaborate closely with product designers to ship accessible, responsive, and aesthetically pleasing features.</li>
              <li>Optimize page load times, runtime performance, and core web vitals across global markets.</li>
              <li>Mentor junior and mid-level engineers and conduct rigorous architectural code reviews.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-white mb-2">Required Qualifications</h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li>4+ years of professional experience building modern web applications at scale.</li>
              <li>Deep proficiency in React, TypeScript, state management, and modern CSS architecture.</li>
              <li>Demonstrated experience with automated testing (Jest, Playwright) and CI/CD pipelines.</li>
              <li>Strong eye for visual design and pixel-perfect implementation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-white mb-2">Benefits & Perks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Comprehensive Medical, Dental & Vision</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Unlimited Paid Time Off</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>$2,500 Home Office & Tech Stipend</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Annual Learning & Conference Budget</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
