"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Search,
  CheckCircle2,
  Clock,
  Play,
  Flame,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  acceptance: string;
  solved: boolean;
}

const PROBLEMS: Problem[] = [
  {
    id: "two-sum",
    title: "1. Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hash Table",
    acceptance: "52.4%",
    solved: true,
  },
  {
    id: "longest-substring",
    title: "3. Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptance: "34.8%",
    solved: true,
  },
  {
    id: "median-two-sorted-arrays",
    title: "4. Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    acceptance: "38.1%",
    solved: false,
  },
  {
    id: "valid-parentheses",
    title: "20. Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "41.2%",
    solved: true,
  },
  {
    id: "merge-k-sorted-lists",
    title: "23. Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Heap / Priority Queue",
    acceptance: "50.9%",
    solved: false,
  },
  {
    id: "lru-cache",
    title: "146. LRU Cache",
    difficulty: "Medium",
    category: "Hash Table & Doubly Linked List",
    acceptance: "42.0%",
    solved: false,
  },
  {
    id: "trapping-rain-water",
    title: "42. Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers & Dynamic Programming",
    acceptance: "61.3%",
    solved: false,
  },
  {
    id: "coin-change",
    title: "322. Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "43.5%",
    solved: true,
  },
];

export default function CodingArenaPage() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredProblems = PROBLEMS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesDiff =
      selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Banner */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                <Code2 className="h-3 w-3" />
                Live Compiler Engine
              </span>
              <span className="text-xs text-slate-400">• Multi-language Sandboxed Runner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Coding Arena
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Sharpen your algorithmic problem solving. Practice curated interview problems asked at Google, Meta, Stripe, and Microsoft.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-24">
              <span className="text-xs text-slate-400 block">Streak</span>
              <span className="text-lg font-bold text-amber-400 flex items-center justify-center gap-1">
                <Flame className="h-4 w-4" /> 7 Days
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-24">
              <span className="text-xs text-slate-400 block">Solved</span>
              <span className="text-lg font-bold text-emerald-400">4 / 8</span>
            </div>
          </div>
        </div>

        {/* Filters and search */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problem title or category (e.g. Dynamic Programming, Two Sum)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  selectedDifficulty === d
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Problems List Table */}
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Difficulty</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Acceptance</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProblems.map((p) => {
                  const diffColor =
                    p.difficulty === "Easy"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : p.difficulty === "Medium"
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-red-400 bg-red-500/10 border-red-500/20";

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-800/40 transition group cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        {p.solved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <span className="h-4 w-4 block rounded-full border border-slate-700" />
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white group-hover:text-indigo-400 transition">
                        <Link href={`/coding/${p.id}`}>{p.title}</Link>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${diffColor}`}
                        >
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{p.category}</td>
                      <td className="px-6 py-4 text-slate-400">{p.acceptance}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/coding/${p.id}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold transition inline-flex items-center gap-1"
                        >
                          <span>Solve</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
