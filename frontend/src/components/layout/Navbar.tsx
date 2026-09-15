"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { logoutUser } from "@/services/auth.service";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: "Interview Request Received",
      desc: "TechCorp shortlisted your profile for Senior Frontend Engineer.",
      time: "10m ago",
      icon: Calendar,
      color: "text-indigo-400 bg-indigo-500/10",
    },
    {
      id: 2,
      title: "ATS Resume Score: 88/100",
      desc: "Your updated resume passed high-relevance ATS criteria.",
      time: "2h ago",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      id: 3,
      title: "New Challenge in Coding Arena",
      desc: "Practice Dynamic Programming with 'Min Cost Path'.",
      time: "1d ago",
      icon: AlertCircle,
      color: "text-amber-400 bg-amber-500/10",
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore
    } finally {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#090d16]/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-72 md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search jobs, skills, problems... (Ctrl + K)"
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <Link
          href="/pricing"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 transition"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Pro Tier</span>
        </Link>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnreadCount(0);
            }}
            className="relative p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800/60 transition"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#090d16] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 transition cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${n.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-slate-200 truncate">{n.title}</p>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User avatar menu */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <Link
            href="/profile"
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/50 transition group"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] group-hover:scale-105 transition">
              <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-xs text-indigo-300">
                CF
              </div>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-slate-400 hover:text-red-400 hidden md:block px-2 py-1 rounded-lg hover:bg-slate-800/60 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
