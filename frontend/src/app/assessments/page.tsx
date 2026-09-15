"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface Assessment {
  id: string;
  title: string;
  category: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: "Intermediate" | "Advanced" | "Beginner";
  completed: boolean;
  score?: string;
  percentile?: string;
}

const ASSESSMENTS: Assessment[] = [
  {
    id: "react-core",
    title: "React 19 & Frontend Architecture",
    category: "Frontend Development",
    questionsCount: 20,
    durationMinutes: 25,
    difficulty: "Advanced",
    completed: true,
    score: "92%",
    percentile: "Top 5%",
  },
  {
    id: "node-backend",
    title: "Node.js, Microservices & Event Loop",
    category: "Backend Engineering",
    questionsCount: 25,
    durationMinutes: 30,
    difficulty: "Advanced",
    completed: false,
  },
  {
    id: "system-design",
    title: "High-Scale Distributed Systems Design",
    category: "System Design",
    questionsCount: 15,
    durationMinutes: 35,
    difficulty: "Advanced",
    completed: false,
  },
  {
    id: "dsa-mcq",
    title: "Data Structures & Time Complexity",
    category: "Computer Science",
    questionsCount: 20,
    durationMinutes: 25,
    difficulty: "Intermediate",
    completed: true,
    score: "85%",
    percentile: "Top 12%",
  },
  {
    id: "sql-postgres",
    title: "PostgreSQL Query Optimization & Indexing",
    category: "Databases",
    questionsCount: 18,
    durationMinutes: 20,
    difficulty: "Intermediate",
    completed: false,
  },
];

export default function AssessmentsCatalogPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                <BrainCircuit className="h-3 w-3" />
                Skill Verification Center
              </span>
              <span className="text-xs text-slate-400">• Industry Standard Assessments</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Mock Assessments & Tests
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Validate your technical skills with timed, scenario-based assessments. Earn verified badges attached to your profile and resume.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-28">
              <span className="text-xs text-slate-400 block">Verified Badges</span>
              <span className="text-lg font-bold text-emerald-400 flex items-center justify-center gap-1">
                <Award className="h-4 w-4" /> 2 Badges
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center min-w-28">
              <span className="text-xs text-slate-400 block">Avg Percentile</span>
              <span className="text-lg font-bold text-cyan-400">91.5%</span>
            </div>
          </div>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ASSESSMENTS.map((test) => (
            <div
              key={test.id}
              className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                    {test.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    {test.durationMinutes} mins
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition">
                  {test.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
                  <span>{test.questionsCount} Questions</span>
                  <span>• Level: {test.difficulty}</span>
                </div>

                {test.completed && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                        Verified Score: {test.score}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">{test.percentile}</span>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  href={`/assessments/${test.id}`}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                    test.completed
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                  }`}
                >
                  <span>{test.completed ? "Retake Assessment" : "Start Test"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
