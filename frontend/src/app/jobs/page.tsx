"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Building,
  DollarSign,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Remote" | "Contract" | "Internship";
  experience: "Entry" | "Mid" | "Senior";
  salary: string;
  posted: string;
  match: number;
  tags: string[];
  description: string;
}

const JOBS_DATA: Job[] = [
  {
    id: "stripe-fe",
    title: "Senior Frontend Engineer (Core UI)",
    company: "Stripe",
    location: "Remote (US/EU)",
    type: "Full-Time",
    experience: "Senior",
    salary: "$150,000 - $185,000",
    posted: "2 days ago",
    match: 96,
    tags: ["React", "TypeScript", "Tailwind CSS", "Design Systems"],
    description: "Join the Core UI group to build delightful financial checkout interfaces used by millions globally.",
  },
  {
    id: "linear-fs",
    title: "Full Stack Engineer (AI Integration)",
    company: "Linear",
    location: "San Francisco, CA",
    type: "Full-Time",
    experience: "Mid",
    salary: "$140,000 - $170,000",
    posted: "1 day ago",
    match: 92,
    tags: ["Node.js", "Next.js", "GraphQL", "PostgreSQL"],
    description: "Build next-generation product management workflows powered by modern real-time sync engines.",
  },
  {
    id: "vercel-swe",
    title: "Software Engineer II - Turborepo",
    company: "Vercel",
    location: "Remote",
    type: "Full-Time",
    experience: "Mid",
    salary: "$130,000 - $160,000",
    posted: "3 days ago",
    match: 89,
    tags: ["Next.js", "Rust", "TypeScript", "Monorepo"],
    description: "Work on fast build infrastructure and edge orchestration tooling for modern frontend teams.",
  },
  {
    id: "supabase-be",
    title: "Backend Engineer - Realtime & Auth",
    company: "Supabase",
    location: "Remote (Global)",
    type: "Remote",
    experience: "Senior",
    salary: "$145,000 - $175,000",
    posted: "4 days ago",
    match: 86,
    tags: ["Node.js", "PostgreSQL", "WebSockets", "Docker"],
    description: "Scale high-throughput real-time database connectors and distributed auth tokens.",
  },
  {
    id: "figma-design-eng",
    title: "Design Technologist / Frontend Dev",
    company: "Figma",
    location: "New York, NY",
    type: "Full-Time",
    experience: "Senior",
    salary: "$160,000 - $190,000",
    posted: "5 days ago",
    match: 84,
    tags: ["React", "Canvas", "WebGL", "TypeScript"],
    description: "Bridge the gap between design engineering and modern web rendering capabilities.",
  },
  {
    id: "postman-intern",
    title: "API Platform Intern",
    company: "Postman",
    location: "San Francisco, CA",
    type: "Internship",
    experience: "Entry",
    salary: "$45/hr",
    posted: "1 week ago",
    match: 78,
    tags: ["JavaScript", "Node.js", "REST APIs"],
    description: "Kickstart your career working with API collections, test automation, and developer tools.",
  },
];

export default function JobPortalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"all" | "saved" | "applied">("all");
  const [savedJobs, setSavedJobs] = useState<string[]>(["stripe-fe"]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(["linear-fs"]);

  // Apply Modal state
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [coverNote, setCoverNote] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  const toggleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleApply = (job: Job) => {
    setApplyingJob(job);
    setCoverNote("");
    setApplySuccess(false);
  };

  const submitApplication = () => {
    if (applyingJob) {
      if (!appliedJobs.includes(applyingJob.id)) {
        setAppliedJobs([...appliedJobs, applyingJob.id]);
      }
      setApplySuccess(true);
      setTimeout(() => {
        setApplyingJob(null);
        setApplySuccess(false);
      }, 1200);
    }
  };

  const filteredJobs = JOBS_DATA.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === "All" || job.type === selectedType;

    if (activeTab === "saved") {
      return matchesSearch && matchesType && savedJobs.includes(job.id);
    }
    if (activeTab === "applied") {
      return matchesSearch && matchesType && appliedJobs.includes(job.id);
    }

    return matchesSearch && matchesType;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  AI Job Matcher Active
                </span>
                <span className="text-xs text-slate-400">• 450+ Verified Companies</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Tech Careers & Open Roles
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Discover roles curated with your ATS profile score, tech stack, and salary targets.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === "all"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                All Roles ({JOBS_DATA.length})
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === "saved"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Saved ({savedJobs.length})
              </button>
              <button
                onClick={() => setActiveTab("applied")}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === "applied"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Applied ({appliedJobs.length})
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job title, skills, or company..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {["All", "Full-Time", "Remote", "Contract", "Internship"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition shrink-0 ${
                    selectedType === t
                      ? "bg-indigo-600/30 border border-indigo-500 text-indigo-300"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-white">No jobs matched your criteria</h3>
              <p className="text-xs text-slate-400">Try clearing filters or search terms.</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isSaved = savedJobs.includes(job.id);
              const isApplied = appliedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600/20 via-slate-800 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center text-lg font-bold text-white shrink-0 group-hover:scale-105 transition">
                      {job.company.substring(0, 2)}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="text-base font-bold text-white group-hover:text-indigo-400 transition"
                        >
                          {job.title}
                        </Link>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <Sparkles className="h-2.5 w-2.5" />
                          {job.match}% ATS Match
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300 font-medium">
                          <Building className="h-3.5 w-3.5 text-slate-500" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-500" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-indigo-400 font-semibold">
                          <DollarSign className="h-3.5 w-3.5" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="h-3 w-3" />
                          {job.posted}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 pt-1">{job.description}</p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`p-2.5 rounded-xl border transition ${
                        isSaved
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                      title={isSaved ? "Remove from saved" : "Save role"}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>

                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                    >
                      Details
                    </Link>

                    {isApplied ? (
                      <span className="px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(job)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply Fast</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Apply to {applyingJob.company}</h3>
                <p className="text-xs text-slate-400">{applyingJob.title}</p>
              </div>
              <button
                onClick={() => setApplyingJob(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {applySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-base font-bold text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-400">
                  Your profile and ATS resume were forwarded to {applyingJob.company}&apos;s recruiter.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-indigo-400" />
                  <span>
                    Your profile matches <strong>{applyingJob.match}%</strong> of role requirements.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Attached Resume
                  </label>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs text-white">
                    <span>Alex_Morgan_Resume_2026.pdf (ATS Score: 88)</span>
                    <span className="text-emerald-400 font-semibold">Verified</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Brief Note to Hiring Manager (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Highlight relevant experience and why you're excited about this role..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitApplication}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/25"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
