"use client";

import { useState } from "react";
import {
  MessageSquareCode,
  Sparkles,
  Mic,
  MicOff,
  Send,
  Play,
  RotateCcw,
  CheckCircle2,
  Award,
  AlertTriangle,
  Bot,
  User,
  ArrowRight,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

interface Message {
  sender: "ai" | "user";
  text: string;
  feedback?: {
    accuracy: number;
    clarity: number;
    depth: number;
    critique: string;
  };
}

export default function AIInterviewCoachPage() {
  const [stage, setStage] = useState<"setup" | "active" | "report">("setup");

  // Setup form state
  const [role, setRole] = useState("Frontend Developer");
  const [seniority, setSeniority] = useState("Mid-Level (2-4 yrs)");
  const [type, setType] = useState("Technical Deep Dive");
  const [difficulty, setDifficulty] = useState("Medium");

  // Interview state
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Welcome to your AI Mock Interview! I'll be assessing your frontend architecture knowledge. To start: Could you explain how the Virtual DOM in React works, and how React 19's compiler changes the need for manual memoization like useMemo and useCallback?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const startInterview = () => {
    setStage("active");
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setEvaluating(true);

    setTimeout(() => {
      setEvaluating(false);

      const aiReply: Message = {
        sender: "ai",
        text: "Solid answer on compiler optimizations! Let's follow up on state management: When would you use a server state caching library like TanStack Query versus a client state manager like Redux Toolkit in high-frequency applications?",
        feedback: {
          accuracy: 90,
          clarity: 88,
          depth: 85,
          critique: "Great articulation of compiler memoization. Consider giving a concrete example of re-render profiling.",
        },
      };

      setMessages((prev) => [...prev, aiReply]);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Gemini Multi-Turn Voice & Text Coach
              </span>
              <span className="text-xs text-slate-400">• Real-Time Speech Scoring</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              AI Mock Interview Coach
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Simulate high-stakes technical & behavioral interview rounds. Receive instant critique on depth, clarity, and accuracy.
            </p>
          </div>

          {stage === "active" && (
            <button
              onClick={() => setStage("report")}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-500/25 self-start md:self-auto cursor-pointer"
            >
              End & Generate Scorecard
            </button>
          )}
        </div>

        {/* 1. SETUP STAGE */}
        {stage === "setup" && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Configure Your Interview Session</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize the AI interviewer to mirror the exact company or role you are targeting.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Job Title
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Frontend Developer">Frontend Developer (React, Next.js, Web)</option>
                  <option value="Full-Stack Engineer">Full-Stack Engineer (Node.js & React)</option>
                  <option value="Backend Engineer">Backend Engineer (Go, Python, Microservices)</option>
                  <option value="System Architect">System Architect & Distributed Systems</option>
                  <option value="Engineering Manager">Engineering Manager / Behavioral</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Junior (0-2 yrs)">Junior (0-2 yrs)</option>
                    <option value="Mid-Level (2-4 yrs)">Mid-Level (2-4 yrs)</option>
                    <option value="Senior (5+ yrs)">Senior (5+ yrs)</option>
                    <option value="Staff / Principal">Staff / Principal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Easy">Standard / Friendly</option>
                    <option value="Medium">FAANG / Competitive</option>
                    <option value="Hard">Staff Tier / Rigorous</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Interview Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Technical Deep Dive", "System Design", "Behavioral & STAR"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`p-3 rounded-2xl border text-xs font-medium text-center transition cursor-pointer ${
                        type === t
                          ? "bg-purple-600/20 border-purple-500 text-purple-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={startInterview}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Begin AI Interview Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 2. ACTIVE SESSION STAGE */}
        {stage === "active" && (
          <div className="glass-card rounded-3xl border border-slate-800 flex flex-col h-[650px] overflow-hidden">
            {/* Session Sub-header */}
            <div className="h-14 bg-slate-900/90 border-b border-slate-800 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white">Live Simulator: {role}</span>
                <span className="text-[11px] text-slate-400">({type})</span>
              </div>
              <span className="text-[11px] text-slate-400">AI Evaluating Speech & Text</span>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3.5 max-w-2xl ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                      m.sender === "ai"
                        ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md"
                        : "bg-slate-800 text-slate-200 border border-slate-700"
                    }`}
                  >
                    {m.sender === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-900 border border-slate-800 text-slate-200"
                      }`}
                    >
                      {m.text}
                    </div>

                    {/* AI Feedback Badge on user answer */}
                    {m.feedback && (
                      <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-1.5 animate-in fade-in">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-purple-300 uppercase">
                          <span>Accuracy: {m.feedback.accuracy}%</span>
                          <span>Clarity: {m.feedback.clarity}%</span>
                          <span>Depth: {m.feedback.depth}%</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{m.feedback.critique}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {evaluating && (
                <div className="flex items-center gap-2 text-xs text-purple-400 p-2">
                  <div className="h-3 w-3 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                  <span>AI Interviewer is formulating feedback & next inquiry...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`p-3 rounded-2xl border transition cursor-pointer ${
                  isRecording
                    ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                }`}
                title={isRecording ? "Stop Speech Input" : "Speak Response"}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your spoken answer or technical response here..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition cursor-pointer shadow-md shadow-purple-500/25"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. EVALUATION REPORT STAGE */}
        {stage === "report" && (
          <div className="glass-card p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
                <Award className="h-9 w-9" />
              </div>
              <h2 className="text-2xl font-bold text-white">Interview Performance Scorecard</h2>
              <p className="text-xs text-slate-400">
                Evaluation for {role} ({seniority})
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Overall Score</span>
                <span className="text-2xl font-bold text-purple-400 mt-1 block">8.8 / 10</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Technical Depth</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">92%</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Clarity & Brevity</span>
                <span className="text-2xl font-bold text-cyan-400 mt-1 block">88%</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block">Readiness</span>
                <span className="text-2xl font-bold text-white mt-1 block">Hire</span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Key Strengths Identified</span>
                </h4>
                <p>Exceptional command of React 19 compiler mechanics and server action life cycle.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Areas for Growth</span>
                </h4>
                <p>Provide more quantified metrics when describing performance improvements in live production.</p>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setStage("setup")}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Start Another Session
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-500/25"
              >
                Download Scorecard PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
