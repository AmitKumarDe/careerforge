"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BrainCircuit,
  Clock,
  Flag,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Award,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "How does React 19 handle concurrent rendering and server actions by default?",
    options: [
      "Server actions run asynchronously and automatically integrate with transition states via useActionState.",
      "They require an external Redux middleware to buffer payload mutations.",
      "Server actions block browser thread rendering until the database roundtrip finishes.",
      "Concurrent rendering is disabled when server components are mounted.",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "What is the primary architectural purpose of React's useDeferredValue hook?",
    options: [
      "To defer rendering of non-urgent parts of the UI while keeping urgent user inputs responsive.",
      "To cache HTTP network requests in local storage automatically.",
      "To replace the useEffect cleanup phase in client components.",
      "To delay hydration until CSS styles have completely loaded.",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "When would you prefer using optimistic updates in a modern UI?",
    options: [
      "To immediately reflect state changes in UI before server confirmation, rolling back on failure.",
      "Only for static content that never interacts with backend APIs.",
      "When payment verification requires two-factor authentication.",
      "When compiling TypeScript code in the browser.",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "Which hook is designed to read and subscribe to values from external mutable stores?",
    options: [
      "useSyncExternalStore",
      "useImperativeHandle",
      "useLayoutEffect",
      "useInsertionEffect",
    ],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: "What happens if a Suspense boundary encounters an unhandled promise rejection?",
    options: [
      "It propagates the rejection to the nearest Error Boundary.",
      "It indefinitely spins without crashing the page.",
      "It automatically retries the network call 3 times.",
      "It reloads the full browser document.",
    ],
    correctAnswer: 0,
  },
];

export default function AssessmentTestRunner() {
  const router = useRouter();
  const params = useParams();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(1440); // 24 minutes
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  const formatTimer = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleSelect = (optionIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optionIdx,
    });
  };

  const toggleReviewFlag = () => {
    if (markedForReview.includes(currentIdx)) {
      setMarkedForReview(markedForReview.filter((i) => i !== currentIdx));
    } else {
      setMarkedForReview([...markedForReview, currentIdx]);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    SAMPLE_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / SAMPLE_QUESTIONS.length) * 100);
  };

  const q = SAMPLE_QUESTIONS[currentIdx];

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Runner Header */}
        <div className="glass-card p-4 sm:p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/assessments"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white">
                React 19 & Frontend Architecture
              </h1>
              <p className="text-[11px] text-slate-400">Section 1: Advanced Concurrent Mechanics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-mono font-bold text-indigo-300">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
            {!submitted && (
              <button
                onClick={() => setSubmitted(true)}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/25 transition cursor-pointer"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>

        {/* If submitted: show Score Card & Analytics */}
        {submitted ? (
          <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-6">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Award className="h-9 w-9" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Verified Skill Badge Awarded
              </span>
              <h2 className="text-3xl font-bold text-white mt-3">
                Score: {calculateScore()}%
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                You outperformed 94% of tested Frontend Engineers globally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-left text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Correct Answers</span>
                <span className="text-base font-bold text-emerald-400 mt-0.5 block">
                  {Object.keys(selectedAnswers).length} / {SAMPLE_QUESTIONS.length}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Percentile</span>
                <span className="text-base font-bold text-cyan-400 mt-0.5 block">Top 6%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Time Spent</span>
                <span className="text-base font-bold text-white mt-0.5 block">
                  {formatTimer(1440 - secondsLeft)}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/assessments"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Back to Assessment Center
              </Link>
            </div>
          </div>
        ) : (
          /* Active Question Canvas */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Question (8 Cols) */}
            <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question {currentIdx + 1} of {SAMPLE_QUESTIONS.length}
                </span>
                <button
                  onClick={toggleReviewFlag}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
                    markedForReview.includes(currentIdx)
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  <span>{markedForReview.includes(currentIdx) ? "Flagged for Review" : "Flag Question"}</span>
                </button>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {q.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs font-medium transition flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-sm shadow-indigo-500/10"
                          : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? "border-indigo-400 bg-indigo-500 text-white"
                            : "border-slate-700 text-slate-400"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Next/Prev */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
                >
                  Previous
                </button>

                {currentIdx < SAMPLE_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => Math.min(SAMPLE_QUESTIONS.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmitted(true)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Finish & Score
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Grid (4 Cols) */}
            <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Questions Palette
              </h3>

              <div className="grid grid-cols-5 gap-2">
                {SAMPLE_QUESTIONS.map((_, idx) => {
                  const isCurrent = currentIdx === idx;
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isFlagged = markedForReview.includes(idx);

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-10 rounded-xl text-xs font-bold border transition ${
                        isCurrent
                          ? "ring-2 ring-indigo-400 border-indigo-400 bg-indigo-600 text-white"
                          : isAnswered
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                          : isFlagged
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md bg-emerald-500/30 border border-emerald-500" />
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md bg-amber-500/30 border border-amber-500" />
                  <span>Flagged for Review ({markedForReview.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-md bg-slate-900 border border-slate-700" />
                  <span>Unanswered ({SAMPLE_QUESTIONS.length - Object.keys(selectedAnswers).length})</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
