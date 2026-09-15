"use client";

import { useState } from "react";
import {
  Building2,
  Plus,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Calendar,
  Search,
  Filter,
  X,
  ArrowRight,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface Candidate {
  id: string;
  name: string;
  role: string;
  jobApplied: string;
  atsScore: number;
  codingSolved: number;
  mockScore: string;
  status: "Applied" | "Shortlisted" | "Interviewing" | "Rejected";
}

export default function RecruiterPortalPage() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "jobs">("pipeline");
  const [showPostJobModal, setShowPostJobModal] = useState(false);

  // Candidates list state
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "c-1",
      name: "Alex Morgan",
      role: "Senior Frontend Engineer",
      jobApplied: "Senior Frontend Engineer (Core UI)",
      atsScore: 92,
      codingSolved: 42,
      mockScore: "8.8 / 10",
      status: "Shortlisted",
    },
    {
      id: "c-2",
      name: "Sarah Chen",
      role: "Full Stack Engineer",
      jobApplied: "Full Stack Engineer (AI Integration)",
      atsScore: 89,
      codingSolved: 38,
      mockScore: "8.5 / 10",
      status: "Interviewing",
    },
    {
      id: "c-3",
      name: "David Kumar",
      role: "Backend Engineer",
      jobApplied: "Senior Frontend Engineer (Core UI)",
      atsScore: 74,
      codingSolved: 20,
      mockScore: "7.0 / 10",
      status: "Applied",
    },
    {
      id: "c-4",
      name: "Emma Wilson",
      role: "Frontend Dev",
      jobApplied: "Senior Frontend Engineer (Core UI)",
      atsScore: 86,
      codingSolved: 31,
      mockScore: "8.2 / 10",
      status: "Applied",
    },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    location: "Remote",
    salary: "$130k - $160k",
    type: "Full-Time",
  });

  const updateCandidateStatus = (id: string, status: Candidate["status"]) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                Recruiter Command Hub
              </span>
              <span className="text-xs text-slate-400">• Verified Candidate Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Recruiter & Talent Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Source top verified engineers with instant insight into their ATS resume score, coding challenges, and AI mock interview ratings.
            </p>
          </div>

          <button
            onClick={() => setShowPostJobModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Post New Role</span>
          </button>
        </div>

        {/* 4 Pipeline Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Active Openings</span>
            <span className="text-2xl font-bold text-white mt-1 block">3 Roles</span>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Applicants</span>
            <span className="text-2xl font-bold text-indigo-400 mt-1 block">{candidates.length}</span>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Shortlisted</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block">
              {candidates.filter((c) => c.status === "Shortlisted").length}
            </span>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Interview Stage</span>
            <span className="text-2xl font-bold text-purple-400 mt-1 block">
              {candidates.filter((c) => c.status === "Interviewing").length}
            </span>
          </div>
        </div>

        {/* Applicant Management Table */}
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Candidates & Applicants</h2>
              <p className="text-xs text-slate-400">Review verified scores and adjust pipeline stage</p>
            </div>
            <div className="text-xs text-slate-400">
              Showing {candidates.length} candidates
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Candidate</th>
                  <th className="px-6 py-3.5">Applied Role</th>
                  <th className="px-6 py-3.5">ATS Score</th>
                  <th className="px-6 py-3.5">Coding Arena</th>
                  <th className="px-6 py-3.5">AI Interview</th>
                  <th className="px-6 py-3.5">Stage</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-white shrink-0">
                          {cand.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{cand.name}</p>
                          <p className="text-[11px] text-slate-400">{cand.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{cand.jobApplied}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {cand.atsScore}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-purple-400">{cand.codingSolved} Solved</td>
                    <td className="px-6 py-4 font-semibold text-white">{cand.mockScore}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          cand.status === "Shortlisted"
                            ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                            : cand.status === "Interviewing"
                            ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                            : cand.status === "Rejected"
                            ? "bg-red-500/15 border-red-500/30 text-red-400"
                            : "bg-slate-800 border-slate-700 text-slate-300"
                        }`}
                      >
                        {cand.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => updateCandidateStatus(cand.id, "Shortlisted")}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 text-[11px] font-medium"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => updateCandidateStatus(cand.id, "Interviewing")}
                          className="px-2.5 py-1 rounded-lg bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600/30 text-[11px] font-medium"
                        >
                          Interview
                        </button>
                        <button
                          onClick={() => updateCandidateStatus(cand.id, "Rejected")}
                          className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 text-[11px] font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create New Job Listing</h3>
              <button onClick={() => setShowPostJobModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPostJobModal(false);
                alert("New role posted to the CareerForge live network!");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Lead Distributed Systems Engineer"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
