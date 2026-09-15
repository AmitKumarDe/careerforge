"use client";

import { useState } from "react";
import {
  Sparkles,
  Check,
  CreditCard,
  Zap,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const tiers = [
    {
      name: "Free Starter",
      desc: "Essential tools to start practicing and applying.",
      priceMonth: "$0",
      priceYear: "$0",
      popular: false,
      buttonText: "Current Plan",
      buttonVariant: "secondary",
      features: [
        "1 ATS Resume Scan per month",
        "Access to 50+ Easy Coding Problems",
        "1 AI Mock Interview session",
        "Standard Job Board browsing",
        "Community Support",
      ],
    },
    {
      name: "Pro Candidate",
      desc: "For engineers actively interviewing at high-growth tech companies.",
      priceMonth: "$29",
      priceYear: "$24",
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "primary",
      features: [
        "Unlimited ATS Resume Optimizations",
        "Full Coding Arena (All Easy, Med, Hard)",
        "15 AI Mock Interview Sessions with detailed feedback",
        "Verified Skill Badges on Profile",
        "Direct recruiter bookmarking",
        "Priority Discord Support",
      ],
    },
    {
      name: "Premium Career",
      desc: "Complete placement acceleration suite with 1-on-1 recruiter access.",
      priceMonth: "$59",
      priceYear: "$49",
      popular: false,
      buttonText: "Get Premium",
      buttonVariant: "accent",
      features: [
        "Everything in Pro Candidate",
        "Unlimited AI Mock Interviews",
        "Custom FAANG System Design assessment suites",
        "Curated Recruiter Direct Introductions",
        "Dedicated Career Advisor Review",
        "Salary Negotiation Script Generator",
      ],
    },
    {
      name: "Recruiter Hub",
      desc: "For hiring teams sourcing verified engineering talent.",
      priceMonth: "$199",
      priceYear: "$169",
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
      features: [
        "Unlimited Job Postings",
        "Access to Verified Talent Pool",
        "Candidate ATS & Coding Scorecard preview",
        "Automated Interview Pipeline Management",
        "Custom Assessment Creation",
      ],
    },
  ];

  return (
    <AppShell>
      <div className="space-y-10 py-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Transparent Pricing For High Achievers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Invest in your engineering career
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Choose a plan to accelerate your interview preparation, beat ATS parsers, and land top offers.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs">
            <span className={`font-semibold ${!annual ? "text-white" : "text-slate-400"}`}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className="w-12 h-6 rounded-full bg-indigo-600 p-1 flex items-center transition cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  annual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`font-semibold flex items-center gap-1.5 ${annual ? "text-white" : "text-slate-400"}`}>
              <span>Annual Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-card rounded-3xl p-6 flex flex-col justify-between relative transition-all ${
                tier.popular
                  ? "border-indigo-500/50 shadow-2xl shadow-indigo-500/15 ring-1 ring-indigo-500/40"
                  : "border-slate-800"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-base font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{tier.desc}</p>

                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {annual ? tier.priceYear : tier.priceMonth}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <button
                  onClick={() => alert(`Selected plan: ${tier.name}. Razorpay checkout integration is ready!`)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    tier.buttonVariant === "primary"
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/25"
                      : tier.buttonVariant === "accent"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white shadow-lg shadow-purple-500/25"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Razorpay Badge */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold text-white block">Enterprise Grade Security & 7-Day Money Back Guarantee</span>
              <span>All payment details are encrypted and processed through Razorpay & Stripe compliance.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-slate-300 shrink-0">
            <CreditCard className="h-4 w-4 text-indigo-400" />
            <span>Cards • UPI • NetBanking</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
