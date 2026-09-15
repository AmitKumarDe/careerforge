"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Code2,
  Play,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Terminal,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function CodingProblemWorkspace() {
  const router = useRouter();
  const params = useParams();
  const problemId = (params?.id as string) || "two-sum";

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(
`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
  );

  const [isRunning, setIsRunning] = useState(false);
  const [outputTab, setOutputTab] = useState<"testcase" | "result">("testcase");
  const [verdict, setVerdict] = useState<{
    status: "Accepted" | "Wrong Answer";
    runtime: string;
    memory: string;
    passed: string;
  } | null>(null);

  const handleRun = () => {
    setIsRunning(true);
    setVerdict(null);
    setOutputTab("result");

    setTimeout(() => {
      setIsRunning(false);
      setVerdict({
        status: "Accepted",
        runtime: "52 ms (Beats 87.4% of users)",
        memory: "44.2 MB (Beats 79.1% of users)",
        passed: "3 / 3 test cases passed",
      });
    }, 900);
  };

  const handleReset = () => {
    setCode(
`function twoSum(nums, target) {
  // Write your code here
}`
    );
    setVerdict(null);
  };

  return (
    <AppShell>
      <div className="space-y-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/coding"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Problems</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
              title="Reset Code"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
              <span>{isRunning ? "Running..." : "Run Code"}</span>
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/25 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>Submit Solution</span>
            </button>
          </div>
        </div>

        {/* Workspace Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[640px]">
          {/* Problem Statement (Left 5 Cols) */}
          <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-slate-800 space-y-5 overflow-y-auto max-h-[720px]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Easy
                </span>
                <span className="text-xs text-slate-400">Arrays & Hash Table</span>
              </div>
              <h1 className="text-xl font-bold text-white">1. Two Sum</h1>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-3">
              <p>
                Given an array of integers <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-300">nums</code> and an integer <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-300">target</code>, return indices of the two numbers such that they add up to <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-300">target</code>.
              </p>
              <p>
                You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
              </p>
            </div>

            {/* Example 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <p className="font-semibold text-white">Example 1:</p>
              <p className="text-slate-400">
                <strong className="text-slate-300">Input:</strong> nums = [2,7,11,15], target = 9
              </p>
              <p className="text-slate-400">
                <strong className="text-slate-300">Output:</strong> [0,1]
              </p>
              <p className="text-slate-400">
                <strong className="text-slate-300">Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
              </p>
            </div>

            {/* Example 2 */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <p className="font-semibold text-white">Example 2:</p>
              <p className="text-slate-400">
                <strong className="text-slate-300">Input:</strong> nums = [3,2,4], target = 6
              </p>
              <p className="text-slate-400">
                <strong className="text-slate-300">Output:</strong> [1,2]
              </p>
            </div>

            {/* Constraints */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Constraints:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li><code className="bg-slate-800 px-1 rounded text-slate-300">2 &lt;= nums.length &lt;= 10^4</code></li>
                <li><code className="bg-slate-800 px-1 rounded text-slate-300">-10^9 &lt;= nums[i] &lt;= 10^9</code></li>
                <li>Only one valid answer exists.</li>
              </ul>
            </div>
          </div>

          {/* IDE & Output Terminal (Right 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Code Editor Container */}
            <div className="glass-card rounded-3xl border border-slate-800 flex-1 flex flex-col overflow-hidden">
              {/* Editor Header */}
              <div className="h-12 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
                  >
                    <option value="javascript">JavaScript (Node.js 20)</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python 3.11</option>
                    <option value="cpp">C++ 20</option>
                    <option value="java">Java 17</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Sandboxed Env</span>
                </div>
              </div>

              {/* Textarea Editor */}
              <div className="flex-1 p-4 font-mono text-xs text-emerald-300 bg-[#070b12] min-h-[360px] relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-xs text-slate-100 leading-relaxed"
                />
              </div>
            </div>

            {/* Test Case / Verdict Panel */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-2 mb-3">
                <button
                  onClick={() => setOutputTab("testcase")}
                  className={`text-xs font-semibold transition ${
                    outputTab === "testcase" ? "text-indigo-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Test Cases (Sample 1)
                </button>
                <button
                  onClick={() => setOutputTab("result")}
                  className={`text-xs font-semibold transition ${
                    outputTab === "result" ? "text-indigo-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Execution Output
                </button>
              </div>

              {outputTab === "testcase" && (
                <div className="text-xs font-mono text-slate-300 space-y-1.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">nums =</span>
                    <span className="text-white">[2, 7, 11, 15]</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">target =</span>
                    <span className="text-white">9</span>
                  </div>
                </div>
              )}

              {outputTab === "result" && (
                <div>
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-xs text-slate-400 py-4">
                      <div className="h-4 w-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                      <span>Compiling and running against test cases...</span>
                    </div>
                  ) : verdict ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-400">{verdict.status}</span>
                        <span className="text-xs text-slate-400">• {verdict.passed}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Runtime</span>
                          <span className="text-slate-200 font-semibold">{verdict.runtime}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Memory</span>
                          <span className="text-slate-200 font-semibold">{verdict.memory}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 py-3">
                      Click &apos;Run Code&apos; or &apos;Submit Solution&apos; to view compiler output.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
