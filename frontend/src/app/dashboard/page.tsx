"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  FileCheck2,
  Code2,
  BrainCircuit,
  MessageSquareCode,
  Briefcase,
  ArrowRight,
  Bookmark,
  Calendar,
  ChevronRight,
  Award,
  AlertTriangle,
  Clock,
  MapPin,
  Building,
  GraduationCap,
  Plus,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import { getMyProfile } from "@/services/profile.service";
import { getMyEducation, type EducationItem } from "@/services/education.service";
import type { ProfileResponse } from "@/types/profile";

export default function DashboardPage() {
  const router = useRouter();

  const [data, setData] = useState<ProfileResponse | null>(null);
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProtectedData = async () => {
      try {
        setLoading(true);
        // Call Protected APIs using HTTP-only cookies
        const [profileResult, educationResult] = await Promise.all([
          getMyProfile(),
          getMyEducation(),
        ]);

        if (!profileResult?.data?.user) {
          router.push("/login");
          return;
        }

        setData(profileResult);
        setEducations(educationResult || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.warn("Unauthorized or session expired:", err);
        // If 401 Unauthorized, redirect to login
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProtectedData();
  }, [router]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
          <div className="h-10 w-10 border-3 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-400">Verifying credentials & fetching protected data...</p>
        </div>
      </AppShell>
    );
  }

  const user = data?.data?.user;
  const profile = data?.data?.profile;

  const quickActions = [
    {
      title: "ATS Resume Optimizer",
      desc: "Analyze your resume against 50+ JD keywords",
      href: "/resume",
      icon: FileCheck2,
      badge: "88/100 ATS",
      color: "from-indigo-500/20 to-indigo-600/20 text-indigo-400 border-indigo-500/30",
    },
    {
      title: "Coding Arena",
      desc: "Solve Daily DSA Challenge: 'Median of Two Arrays'",
      href: "/coding",
      icon: Code2,
      badge: "Hard",
      color: "from-cyan-500/20 to-cyan-600/20 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "AI Interview Coach",
      desc: "Practice behavioral & technical questions",
      href: "/interview",
      icon: MessageSquareCode,
      badge: "AI Live",
      color: "from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/30",
    },
    {
      title: "Skill Assessments",
      desc: "Earn verified badges in Node.js & System Design",
      href: "/assessments",
      icon: BrainCircuit,
      badge: "Top 5%",
      color: "from-emerald-500/20 to-emerald-600/20 text-emerald-400 border-emerald-500/30",
    },
  ];

  const recommendedJobs = [
    {
      id: "stripe-fe",
      title: "Senior Frontend Engineer",
      company: "Stripe",
      location: "Remote (US)",
      salary: "$140k - $170k",
      matchScore: "96% Match",
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "linear-fs",
      title: "Full Stack Engineer (AI Platforms)",
      company: "Linear",
      location: "San Francisco, CA",
      salary: "$150k - $185k",
      matchScore: "92% Match",
      tags: ["Node.js", "GraphQL", "Next.js"],
    },
    {
      id: "vercel-swe",
      title: "Software Engineer II",
      company: "Vercel",
      location: "Remote",
      salary: "$130k - $160k",
      matchScore: "89% Match",
      tags: ["Next.js", "TypeScript", "Turbopack"],
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-indigo-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-cyan-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                {user?.role === "RECRUITER" ? "Recruiter Account" : "Active Job Seeker"}
              </span>
              <span className="text-xs text-slate-400">• Authenticated via HTTP-only Cookies</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {user?.name || "Developer"} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              {profile?.headline || "Complete your profile to get personalized recommendations and higher recruiter visibility."}
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              Edit Profile
            </Link>
            <Link
              href="/jobs"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
            >
              <span>Explore Jobs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Key Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Profile Readiness</span>
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <TrendingUp className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">
                  {profile?.headline ? "85%" : "40%"}
                </span>
                <span className="text-xs text-emerald-400 font-medium">Active</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full"
                  style={{ width: profile?.headline ? "85%" : "40%" }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {profile?.headline ? "Profile ready for jobs" : "Add headline & education"}
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Resume ATS Score</span>
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <FileCheck2 className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">88/100</span>
                <span className="text-xs text-cyan-400 font-medium">Top Tier</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: "88%" }} />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Optimized for Tech roles</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Coding Challenges</span>
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Code2 className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">42 Solved</span>
                <span className="text-xs text-purple-400 font-medium">Active</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "70%" }} />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">18 Easy • 20 Med • 4 Hard</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Mock Interview AI</span>
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <MessageSquareCode className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">8.6 / 10</span>
                <span className="text-xs text-emerald-400 font-medium">Ready</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "86%" }} />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">System Design & Algorithms</p>
          </div>
        </div>

        {/* Protected API Section: Real Profile & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Details from /api/users/profile */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-indigo-400" />
                <span>Protected Profile Data</span>
              </h2>
              <Link href="/profile" className="text-xs font-semibold text-indigo-400 hover:underline">
                Manage
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Full Name</span>
                <span className="text-white font-semibold mt-0.5 block">{user?.name}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Registered Email</span>
                <span className="text-white font-semibold mt-0.5 block truncate">{user?.email}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Experience Level</span>
                <span className="text-indigo-300 font-semibold mt-0.5 block">
                  {profile?.experienceLevel || "MID_LEVEL"}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block">Location</span>
                <span className="text-slate-200 font-semibold mt-0.5 block">
                  {profile?.location?.city
                    ? `${profile.location.city}, ${profile.location.state || profile.location.country}`
                    : "Not specified"}
                </span>
              </div>
            </div>

            {user?.skills && user.skills.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Verified Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education Details from /api/users/education */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                <span>Protected Education Data</span>
              </h2>
              <Link
                href="/profile"
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Add Degree</span>
              </Link>
            </div>

            {educations.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-2">
                <GraduationCap className="h-8 w-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">No education entries added yet to your profile.</p>
                <Link
                  href="/profile"
                  className="inline-block text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-1"
                >
                  + Add your university or degree
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div
                    key={edu._id}
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span>{edu.institution}</span>
                        {edu.currentlyStudying && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Enrolled
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 font-normal text-[11px]">
                        {edu.startYear} – {edu.currentlyStudying ? "Present" : (edu.endYear || "Present")}
                      </span>
                    </div>
                    <p className="text-indigo-400 mt-0.5 font-medium">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </p>
                    {edu.grade && (
                      <p className="text-[11px] text-slate-400 mt-1">Grade / GPA: {edu.grade}</p>
                    )}
                    {edu.description && (
                      <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Career Accelerators */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Career Accelerators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-slate-700 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${action.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {action.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition">
                      {action.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{action.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition">
                    <span>Launch</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Recommended High-Match Jobs</h2>
              <p className="text-xs text-slate-400">Curated based on your verified skills</p>
            </div>
            <Link
              href="/jobs"
              className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{job.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {job.matchScore}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {job.company} • {job.location} • {job.salary}
                  </p>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold self-end sm:self-center"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}