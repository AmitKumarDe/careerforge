"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Users,
  Building2,
  DollarSign,
  Sparkles,
  Search,
  CheckCircle2,
  Ban,
  TrendingUp,
  Activity,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function AdminCenterPage() {
  const [users, setUsers] = useState([
    {
      id: "u-1",
      name: "Alex Morgan",
      email: "alex.morgan@careerforge.io",
      role: "USER",
      tier: "Pro",
      status: "ACTIVE",
      joined: "Sep 2026",
    },
    {
      id: "u-2",
      name: "TechCorp Recruiting",
      email: "talent@techcorp.io",
      role: "RECRUITER",
      tier: "Enterprise",
      status: "ACTIVE",
      joined: "Aug 2026",
    },
    {
      id: "u-3",
      name: "Suspicious User",
      email: "spammer@disposable.com",
      role: "USER",
      tier: "Free",
      status: "SUSPENDED",
      joined: "Yesterday",
    },
    {
      id: "u-4",
      name: "Elena Rostova",
      email: "elena@devlabs.io",
      role: "USER",
      tier: "Pro",
      status: "ACTIVE",
      joined: "Jul 2026",
    },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" }
          : u
      )
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" />
                Root Administrator Access
              </span>
              <span className="text-xs text-slate-400">• High Privilege Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Platform Admin Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Monitor platform telemetry, supervise candidate and recruiter accounts, review Gemini AI usage, and manage subscriptions.
            </p>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Registered Users</span>
            <span className="text-2xl font-bold text-white mt-1 block">14,820</span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">+18% this month</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Monthly Recurring (MRR)</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block">$48,250</span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">+24% MoM</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Gemini AI Invocations</span>
            <span className="text-2xl font-bold text-cyan-400 mt-1 block">1.28M</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Avg 210ms latency</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Active Job Postings</span>
            <span className="text-2xl font-bold text-purple-400 mt-1 block">348 Roles</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">82 Verified Recruiters</span>
          </div>
        </div>

        {/* User Management */}
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Platform Users & Access Logs</h2>
              <p className="text-xs text-slate-400">Suspend accounts or adjust role authorization</p>
            </div>
            <span className="text-xs text-slate-400">System Healthy</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">User</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Subscription</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Joined</th>
                  <th className="px-6 py-3.5 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-indigo-400">{u.role}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[11px] font-medium">
                        {u.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          u.status === "ACTIVE"
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                            : "bg-red-500/15 border-red-500/30 text-red-400"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{u.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          u.status === "ACTIVE"
                            ? "bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25"
                            : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
                        }`}
                      >
                        {u.status === "ACTIVE" ? "Suspend" : "Reinstate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
