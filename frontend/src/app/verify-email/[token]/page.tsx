"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from "lucide-react";
import { verifyEmail, resendVerification } from "@/services/auth.service";

export default function VerifyEmailPage() {
  const params = useParams();
  const token = (params?.token as string) || "";

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const runVerification = async () => {
      try {
        setVerifying(true);
        setError("");
        await verifyEmail(token);
        setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
            "Email verification link is invalid or has expired."
        );
      } finally {
        setVerifying(false);
      }
    };

    runVerification();
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setResending(true);
      setResendMessage("");
      await resendVerification(resendEmail);
      setResendMessage("Verification email has been resent successfully!");
    } catch {
      setResendMessage("Failed to resend. Please check the email address.");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              CareerForge
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Email Verification</h1>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl text-center">
          {verifying && (
            <div className="py-8 space-y-4">
              <div className="h-12 w-12 border-3 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
              <p className="text-sm text-slate-300">Verifying your email token...</p>
            </div>
          )}

          {!verifying && success && (
            <div className="py-6 space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 className="text-xl font-bold text-white">Email Verified!</h2>
              <p className="text-xs text-slate-400">
                Your email address has been confirmed. You can now access all CareerForge features.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 py-3 text-sm font-semibold text-white transition mt-2 shadow-lg shadow-indigo-500/25"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {!verifying && error && (
            <div className="py-4 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-semibold text-white">Verification Failed</h2>
              <p className="text-xs text-red-400">{error}</p>

              {/* Resend Verification Form */}
              <div className="pt-4 border-t border-slate-800 text-left">
                <p className="text-xs font-semibold text-slate-300 mb-2">Need a new link?</p>
                <form onSubmit={handleResend} className="space-y-2">
                  <input
                    type="email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="submit"
                    disabled={resending}
                    className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${resending ? "animate-spin" : ""}`} />
                    <span>Resend Verification Email</span>
                  </button>
                  {resendMessage && (
                    <p className="text-[11px] text-indigo-400 text-center">{resendMessage}</p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
