"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Globe,
  Link2,
  MapPin,
  Phone,
  DollarSign,
  AlertCircle,
  X,
  Target,
  Mail,
  Check,
  ExternalLink,
  Pencil,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import { getMyProfile, updateMyProfile, updateMySkills } from "@/services/profile.service";
import {
  getMyExperiences,
  addExperience,
  deleteExperience,
  type ExperienceItem,
  type ExperiencePayload,
} from "@/services/experience.service";
import {
  getMyEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  type EducationItem,
  type EducationPayload,
} from "@/services/education.service";
import type { Profile, User, ExperienceLevel, ProfileStatus } from "@/types/profile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "preferences" | "experience" | "education" | "skills" | "links"
  >("general");

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [educations, setEducations] = useState<EducationItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Preference input helpers
  const [newRole, setNewRole] = useState("");
  const [newLocation, setNewLocation] = useState("");

  // Experience modal state
  const [showExpModal, setShowExpModal] = useState(false);
  const [newExp, setNewExp] = useState<ExperiencePayload>({
    company: "",
    jobTitle: "",
    employmentType: "FULL_TIME",
    location: "",
    startDate: "",
    currentlyWorking: true,
    description: "",
  });

  // Education modal state
  const [showEduModal, setShowEduModal] = useState(false);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [newEdu, setNewEdu] = useState<EducationPayload>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startYear: 2022,
    endYear: 2022,
    currentlyStudying: false,
    grade: "",
    description: "",
  });

  // Skills input state
  const [newSkill, setNewSkill] = useState("");
  const [skillsList, setSkillsList] = useState<string[]>([
    "React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "GraphQL", "MongoDB", "Docker"
  ]);

  const router = useRouter();

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [profileRes, expRes, eduRes] = await Promise.allSettled([
          getMyProfile(),
          getMyExperiences(),
          getMyEducation(),
        ]);

        if (profileRes.status === "fulfilled" && profileRes.value?.data?.profile) {
          const rawProfile = profileRes.value.data.profile;
          setProfile({
            ...rawProfile,
            location: {
              city: rawProfile.location?.city || "",
              state: rawProfile.location?.state || "",
              country: rawProfile.location?.country || "",
            },
            expectedSalary: {
              min: rawProfile.expectedSalary?.min ?? 0,
              max: rawProfile.expectedSalary?.max ?? 0,
              currency: rawProfile.expectedSalary?.currency || "INR",
            },
            preferredRoles: rawProfile.preferredRoles || [],
            preferredLocations: rawProfile.preferredLocations || [],
            jobPreferences: rawProfile.jobPreferences || [],
          });

          if (profileRes.value.data.user) {
            setUser(profileRes.value.data.user);
            if (profileRes.value.data.user.skills && profileRes.value.data.user.skills.length > 0) {
              setSkillsList(profileRes.value.data.user.skills);
            }
          }
        } else {
          router.push("/login");
          return;
        }

        if (expRes.status === "fulfilled" && Array.isArray(expRes.value)) {
          setExperiences(expRes.value);
        } else {
          setExperiences([]);
        }

        if (eduRes.status === "fulfilled" && Array.isArray(eduRes.value)) {
          setEducations(eduRes.value);
        } else {
          setEducations([]);
        }
      } catch (err) {
        console.warn("Unauthorized profile access, redirecting to login:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [router]);

  const handleApplyPreset = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      headline: "Frontend Developer | React.js | JavaScript (ES6+) | 3+ Years",
      phone: "7001325434",
      bio: "Frontend Developer with 3+ years of experience building modern, responsive web applications using React.js, JavaScript (ES6+), Next.js, Redux Toolkit, Tailwind CSS, and REST APIs. Experienced in API integration, authentication, protected routes, reusable UI components, and responsive web development. Currently working on healthcare and startup products and actively looking for opportunities to contribute, learn, and grow.",
      location: {
        city: "Asansol",
        state: "West Bengal",
        country: "India",
      },
      experienceLevel: "MID_LEVEL",
      preferredRoles: [
        "Frontend Developer",
        "React.js Developer",
        "Next.js Developer",
      ],
      preferredLocations: [
        "Kolkata",
        "Bangalore",
        "Hyderabad",
        "Pune",
        "Remote",
      ],
      jobPreferences: ["Full Time", "Remote", "Hybrid"],
      expectedSalary: {
        min: 600000,
        max: 1000000,
        currency: "INR",
      },
      portfolioUrl: "https://amitkumar-dey.vercel.app",
      githubUrl: "https://github.com/AmitKumarDe",
      linkedinUrl: "https://www.linkedin.com/in/amit-kumar-dey-asn",
      status: "OPEN",
    });
    setMessage({
      type: "success",
      text: "Candidate data filled! Click 'Save Profile' to commit your changes.",
    });
  };

  const handleAddRole = (roleToAdd?: string) => {
    const r = (roleToAdd || newRole).trim();
    if (!profile || !r) return;
    if (!profile.preferredRoles?.includes(r)) {
      setProfile({
        ...profile,
        preferredRoles: [...(profile.preferredRoles || []), r],
      });
    }
    setNewRole("");
  };

  const handleRemoveRole = (roleToRemove: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      preferredRoles: (profile.preferredRoles || []).filter((r) => r !== roleToRemove),
    });
  };

  const handleAddLocation = (locToAdd?: string) => {
    const l = (locToAdd || newLocation).trim();
    if (!profile || !l) return;
    if (!profile.preferredLocations?.includes(l)) {
      setProfile({
        ...profile,
        preferredLocations: [...(profile.preferredLocations || []), l],
      });
    }
    setNewLocation("");
  };

  const handleRemoveLocation = (locToRemove: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      preferredLocations: (profile.preferredLocations || []).filter((l) => l !== locToRemove),
    });
  };

  const handleToggleJobPreference = (pref: string) => {
    if (!profile) return;
    const current = profile.jobPreferences || [];
    const updated = current.includes(pref)
      ? current.filter((p) => p !== pref)
      : [...current, pref];
    setProfile({ ...profile, jobPreferences: updated });
  };

  const handleGeneralSave = async () => {
    if (!profile) return;
    try {
      setSaving(true);
      setMessage(null);
      await updateMyProfile({
        headline: profile.headline,
        phone: profile.phone,
        bio: profile.bio,
        location: profile.location,
        experienceLevel: profile.experienceLevel,
        preferredRoles: profile.preferredRoles,
        preferredLocations: profile.preferredLocations,
        jobPreferences: profile.jobPreferences,
        expectedSalary: {
          min: Number(profile.expectedSalary?.min) || 0,
          max: Number(profile.expectedSalary?.max) || 0,
          currency: profile.expectedSalary?.currency || "INR",
        },
        portfolioUrl: profile.portfolioUrl,
        githubUrl: profile.githubUrl,
        linkedinUrl: profile.linkedinUrl,
        status: profile.status,
      });

      try {
        await updateMySkills(skillsList);
      } catch {
        // skill save fallback
      }

      setMessage({ type: "success", text: "Profile details updated successfully!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const added = await addExperience(newExp);
      setExperiences([added, ...experiences]);
    } catch {
      const mockItem: ExperienceItem = {
        _id: `exp-${Date.now()}`,
        user: "demo-user",
        ...newExp,
      };
      setExperiences([mockItem, ...experiences]);
    }
    setShowExpModal(false);
    setNewExp({
      company: "",
      jobTitle: "",
      employmentType: "FULL_TIME",
      location: "",
      startDate: "",
      currentlyWorking: true,
      description: "",
    });
  };

  const handleDeleteExp = async (id: string) => {
    try {
      await deleteExperience(id);
    } catch {
      // ignore
    }
    setExperiences(experiences.filter((item) => item._id !== id));
  };

  const handleOpenAddEdu = () => {
    setEditingEduId(null);
    setNewEdu({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: 2022,
      endYear: 2022,
      currentlyStudying: false,
      grade: "",
      description: "",
    });
    setShowEduModal(true);
  };

  const handleOpenEditEdu = (edu: EducationItem) => {
    setEditingEduId(edu._id);
    setNewEdu({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || "",
      startYear: edu.startYear,
      endYear: edu.endYear ?? null,
      currentlyStudying: Boolean(edu.currentlyStudying),
      grade: edu.grade || "",
      description: edu.description || "",
    });
  };

  const handleSubmitEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: EducationPayload = {
        institution: newEdu.institution.trim(),
        degree: newEdu.degree.trim(),
        fieldOfStudy: newEdu.fieldOfStudy?.trim() || "",
        startYear: Number(newEdu.startYear),
        endYear: newEdu.currentlyStudying ? null : Number(newEdu.endYear) || null,
        currentlyStudying: Boolean(newEdu.currentlyStudying),
        grade: newEdu.grade?.trim() || "",
        description: newEdu.description?.trim() || "",
      };

      if (editingEduId) {
        const updated = await updateEducation(editingEduId, payload);
        setEducations(educations.map((item) => (item._id === editingEduId ? updated : item)));
        setMessage({ type: "success", text: "Education record updated successfully!" });
      } else {
        const added = await addEducation(payload);
        setEducations([added, ...educations]);
        setMessage({ type: "success", text: "Education record added successfully!" });
      }
    } catch {
      if (editingEduId) {
        setEducations(
          educations.map((item) =>
            item._id === editingEduId ? { ...item, ...newEdu } : item
          )
        );
      } else {
        const mockEdu: EducationItem = {
          _id: `edu-${Date.now()}`,
          user: user?._id || "demo-user",
          ...newEdu,
        };
        setEducations([mockEdu, ...educations]);
      }
      setMessage({ type: "success", text: "Education updated locally." });
    }
    setShowEduModal(false);
    setEditingEduId(null);
  };

  const handleDeleteEdu = async (id: string) => {
    try {
      await deleteEducation(id);
    } catch {
      // ignore
    }
    setEducations(educations.filter((item) => item._id !== id));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  if (loading && !profile) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-10 w-10 border-3 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Banner */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-xl shrink-0">
              <div className="h-full w-full rounded-3xl bg-slate-950 flex items-center justify-center font-bold text-2xl text-white overflow-hidden">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-full w-full object-cover rounded-3xl"
                  />
                ) : user?.name ? (
                  user.name
                    .split(" ")
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                ) : (
                  "CF"
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {user?.name || "Candidate Profile"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  {profile?.status || "OPEN"}
                </span>
                {user?.role && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                    {user.role}
                  </span>
                )}
                {profile?.experienceLevel && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {profile.experienceLevel.replace("_", " ")}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl font-medium">
                {profile?.headline || "Complete your profile to unlock tailored job recommendations and mock interviews."}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 flex-wrap">
                {user?.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-500" />
                    <span>{user.email}</span>
                  </span>
                )}
                {profile?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-500" />
                    <span>{profile.phone}</span>
                  </span>
                )}
                {profile?.location?.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-500" />
                    <span>
                      {profile.location.city}
                      {profile.location.state ? `, ${profile.location.state}` : ""}
                      {profile.location.country ? `, ${profile.location.country}` : ""}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-center">
            <button
              type="button"
              onClick={handleApplyPreset}
              title="Pre-fill fields with user JSON data"
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Fill My Data</span>
            </button>
            <button
              onClick={handleGeneralSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving Changes..." : "Save Profile"}</span>
            </button>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-2 text-xs font-medium ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: "general", label: "General Info", icon: UserCircle },
            { id: "preferences", label: "Preferences & Salary", icon: Target },
            { id: "experience", label: `Experience (${experiences.length})`, icon: Briefcase },
            { id: "education", label: `Education (${educations.length})`, icon: GraduationCap },
            { id: "skills", label: `Skills (${skillsList.length})`, icon: Sparkles },
            { id: "links", label: "Social & Links", icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        {/* 1. General Info Tab */}
        {activeTab === "general" && profile && (
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">General Information</h2>
                <p className="text-xs text-slate-400">Core personal bio, contact number, and regional details</p>
              </div>
              <button
                onClick={handleGeneralSave}
                disabled={saving}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save General"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={profile.headline || ""}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  placeholder="e.g. Frontend Developer | React.js | JavaScript (ES6+) | 3+ Years"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="7001325434"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Bio / Summary
                </label>
                <span className="text-[11px] text-slate-500">
                  {profile.bio?.length || 0}/500 chars
                </span>
              </div>
              <textarea
                rows={4}
                value={profile.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Frontend Developer with 3+ years of experience building modern, responsive web applications..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* Location fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={profile.location?.city || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, location: { ...profile.location, city: e.target.value } })
                  }
                  placeholder="Asansol"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  State / Region
                </label>
                <input
                  type="text"
                  value={profile.location?.state || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, location: { ...profile.location, state: e.target.value } })
                  }
                  placeholder="West Bengal"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={profile.location?.country || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, location: { ...profile.location, country: e.target.value } })
                  }
                  placeholder="India"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Experience Level & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <select
                  value={profile.experienceLevel}
                  onChange={(e) =>
                    setProfile({ ...profile, experienceLevel: e.target.value as ExperienceLevel })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="STUDENT">Student</option>
                  <option value="ENTRY_LEVEL">Entry Level (0 - 2 yrs)</option>
                  <option value="MID_LEVEL">Mid Level (2 - 5 yrs)</option>
                  <option value="SENIOR_LEVEL">Senior Level (5+ yrs)</option>
                  <option value="LEAD">Lead / Staff / Principal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Availability Status
                </label>
                <select
                  value={profile.status}
                  onChange={(e) => setProfile({ ...profile, status: e.target.value as ProfileStatus })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="OPEN">Actively Looking (OPEN)</option>
                  <option value="OPEN_TO_OFFERS">Open to Offers</option>
                  <option value="NOT_LOOKING">Not Looking</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 2. Preferences & Salary Tab */}
        {activeTab === "preferences" && profile && (
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Career Preferences & Expected Compensation</h2>
                <p className="text-xs text-slate-400">
                  Specify your target roles, locations, work preferences, and annual salary
                </p>
              </div>
              <button
                onClick={handleGeneralSave}
                disabled={saving}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save Preferences"}</span>
              </button>
            </div>

            {/* Target Job Roles */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Preferred Job Roles
              </label>
              <div className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRole();
                    }
                  }}
                  placeholder="e.g. Frontend Developer, React.js Developer"
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddRole()}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Add Role
                </button>
              </div>

              {/* Tag cloud */}
              <div className="flex flex-wrap gap-2 pt-1">
                {(profile.preferredRoles || []).map((role) => (
                  <div
                    key={role}
                    className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-2"
                  >
                    <span>{role}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="text-indigo-400 hover:text-red-400 transition"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {(profile.preferredRoles || []).length === 0 && (
                  <span className="text-xs text-slate-500 italic">No preferred roles selected yet.</span>
                )}
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-slate-500">
                <span>Quick add:</span>
                {[
                  "Frontend Developer",
                  "React.js Developer",
                  "Next.js Developer",
                  "Full Stack Developer",
                  "JavaScript Developer",
                  "UI/UX Engineer",
                  "Node.js Developer",
                ].map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleAddRole(sug)}
                    className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-300 transition text-[11px] text-slate-400"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Locations */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Preferred Locations
              </label>
              <div className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddLocation();
                    }
                  }}
                  placeholder="e.g. Kolkata, Bangalore, Remote"
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddLocation()}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Add Location
                </button>
              </div>

              {/* Tag cloud */}
              <div className="flex flex-wrap gap-2 pt-1">
                {(profile.preferredLocations || []).map((loc) => (
                  <div
                    key={loc}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-2"
                  >
                    <span>{loc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(loc)}
                      className="text-cyan-400 hover:text-red-400 transition"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {(profile.preferredLocations || []).length === 0 && (
                  <span className="text-xs text-slate-500 italic">No preferred locations added yet.</span>
                )}
              </div>

              {/* Quick Location Pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-slate-500">
                <span>Quick add:</span>
                {["Remote", "Kolkata", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi NCR"].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleAddLocation(city)}
                    className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition text-[11px] text-slate-400"
                  >
                    + {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Preferences / Work Modes */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Job Type & Work Modes
                </label>
                <p className="text-[11px] text-slate-500">Select all employment and work arrangement types that suit you</p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {[
                  "Full Time",
                  "Remote",
                  "Hybrid",
                  "Contract",
                  "Part Time",
                  "Internship",
                ].map((pref) => {
                  const selected = (profile.jobPreferences || []).includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => handleToggleJobPreference(pref)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                        selected
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 border border-indigo-500"
                          : "bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 ${selected ? "opacity-100" : "opacity-0"}`} />
                      <span>{pref}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expected Annual Compensation */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Expected Annual Salary
                </label>
                <p className="text-[11px] text-slate-500">Provide your minimum and maximum salary expectations</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Currency</label>
                  <select
                    value={profile.expectedSalary?.currency || "INR"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        expectedSalary: {
                          min: profile.expectedSalary?.min ?? 0,
                          max: profile.expectedSalary?.max ?? 0,
                          currency: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Minimum Expected</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="number"
                      min={0}
                      step={10000}
                      value={profile.expectedSalary?.min ?? 0}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          expectedSalary: {
                            max: profile.expectedSalary?.max ?? 0,
                            currency: profile.expectedSalary?.currency || "INR",
                            min: Number(e.target.value) || 0,
                          },
                        })
                      }
                      placeholder="600000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Maximum Expected</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="number"
                      min={0}
                      step={10000}
                      value={profile.expectedSalary?.max ?? 0}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          expectedSalary: {
                            min: profile.expectedSalary?.min ?? 0,
                            currency: profile.expectedSalary?.currency || "INR",
                            max: Number(e.target.value) || 0,
                          },
                        })
                      }
                      placeholder="1000000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Formatted Compensation Summary Preview */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-4 text-xs">
                <span className="text-slate-400">Target Range Preview:</span>
                <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                  {profile.expectedSalary?.currency === "INR" ? "₹" : profile.expectedSalary?.currency || "$"}{" "}
                  {(profile.expectedSalary?.min || 0).toLocaleString()} –{" "}
                  {profile.expectedSalary?.currency === "INR" ? "₹" : profile.expectedSalary?.currency || "$"}{" "}
                  {(profile.expectedSalary?.max || 0).toLocaleString()} {profile.expectedSalary?.currency || "INR"} / yr
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Experience Tab */}
        {activeTab === "experience" && (
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Work Experience</h2>
                <p className="text-xs text-slate-400">Manage your past and present employment roles</p>
              </div>
              <button
                onClick={() => setShowExpModal(true)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-3">
              {experiences.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  No work experience listed yet. Click &quot;Add Experience&quot; to begin.
                </div>
              ) : (
                experiences.map((exp) => (
                  <div
                    key={exp._id}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-white">{exp.jobTitle}</h3>
                      <p className="text-xs text-indigo-400 mt-0.5">
                        {exp.company} • <span className="text-slate-400">{exp.location || "Remote"}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate || "Ended"}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-slate-300 mt-2">{exp.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteExp(exp._id)}
                      className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                      title="Delete entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. Education Tab */}
        {activeTab === "education" && (
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-base font-bold text-white">Education & Degrees</h2>
                <p className="text-xs text-slate-400">List your academic degrees, certifications, and institutions</p>
              </div>
              <button
                onClick={handleOpenAddEdu}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-indigo-500/20"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Education</span>
              </button>
            </div>

            <div className="space-y-3">
              {educations.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  No education history added yet. Click &quot;Add Education&quot; to begin.
                </div>
              ) : (
                educations.map((edu) => (
                  <div
                    key={edu._id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-white">{edu.institution}</h3>
                        {edu.currentlyStudying && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Currently Studying
                          </span>
                        )}
                        {edu.grade && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                            {edu.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-indigo-400 font-medium">
                        {edu.degree}
                      </p>
                      {edu.fieldOfStudy && (
                        <p className="text-xs text-slate-300">
                          <span className="text-slate-500 font-normal">Field of Study: </span>
                          <span className="text-slate-300 font-medium">{edu.fieldOfStudy}</span>
                        </p>
                      )}
                      <p className="text-[11px] text-slate-500">
                        {edu.startYear} – {edu.currentlyStudying ? "Present" : (edu.endYear || "Present")}
                      </p>
                      {edu.description && (
                        <p className="text-xs text-slate-300 pt-1 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                          {edu.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditEdu(edu)}
                        className="p-2 text-slate-500 hover:text-indigo-400 rounded-lg hover:bg-slate-800 transition"
                        title="Edit education"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEdu(edu._id)}
                        className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                        title="Delete education"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 4. Skills Tab */}
        {activeTab === "skills" && (
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Skills & Competencies</h2>
                <p className="text-xs text-slate-400">Add technical skills to empower AI job matching & ATS analysis</p>
              </div>
              <button
                onClick={handleGeneralSave}
                disabled={saving}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save Skills"}</span>
              </button>
            </div>

            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Type a skill (e.g. React, Next.js, Redux)..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skillsList.map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 text-xs font-medium flex items-center gap-2 group"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Links Tab */}
        {activeTab === "links" && profile && (
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Portfolio & Social Profiles</h2>
                <p className="text-xs text-slate-400">Connect your public developer presence and personal portfolio</p>
              </div>
              <button
                onClick={handleGeneralSave}
                disabled={saving}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save Links"}</span>
              </button>
            </div>

            <div className="space-y-4 max-w-xl">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    GitHub Profile
                  </label>
                  {profile.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Visit</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="url"
                    value={profile.githubUrl || ""}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    placeholder="https://github.com/AmitKumarDe"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    LinkedIn Profile
                  </label>
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Visit</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="url"
                    value={profile.linkedinUrl || ""}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    placeholder="https://www.linkedin.com/in/amit-kumar-dey-asn"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Personal Portfolio Website
                  </label>
                  {profile.portfolioUrl && (
                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Visit</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="url"
                    value={profile.portfolioUrl || ""}
                    onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })}
                    placeholder="https://amitkumar-dey.vercel.app"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Experience Add Modal */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add Work Experience</h3>
              <button onClick={() => setShowExpModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddExperience} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newExp.company}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="e.g. Netflix, Stripe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={newExp.jobTitle}
                  onChange={(e) => setNewExp({ ...newExp, jobTitle: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newExp.startDate}
                    onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={newExp.location}
                    onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    placeholder="Remote or City"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  placeholder="Key contributions and achievements..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Education Add/Edit Modal */}
      {showEduModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {editingEduId ? "Edit Education" : "Add Education"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowEduModal(false);
                  setEditingEduId(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEducation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Institution <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newEdu.institution}
                  onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Newton School"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Degree / Program <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newEdu.degree}
                  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Full Stack Web Development Coding Bootcamp"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Field of Study / Specialization
                </label>
                <input
                  type="text"
                  value={newEdu.fieldOfStudy || ""}
                  onChange={(e) => setNewEdu({ ...newEdu, fieldOfStudy: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Data Structures, Algorithms, JavaScript, React.js, System Design"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Start Year <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="number"
                    min={1950}
                    max={new Date().getFullYear()}
                    required
                    value={newEdu.startYear || ""}
                    onChange={(e) => setNewEdu({ ...newEdu, startYear: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    placeholder="2022"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    End Year {newEdu.currentlyStudying && <span className="text-emerald-400 font-medium">(Present)</span>}
                  </label>
                  <input
                    type="number"
                    min={1950}
                    max={new Date().getFullYear() + 10}
                    disabled={Boolean(newEdu.currentlyStudying)}
                    value={newEdu.currentlyStudying ? "" : newEdu.endYear || ""}
                    onChange={(e) =>
                      setNewEdu({
                        ...newEdu,
                        endYear: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                    placeholder="2022"
                  />
                </div>
              </div>

              {/* Currently Studying toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="currentlyStudyingCheckbox"
                  checked={Boolean(newEdu.currentlyStudying)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setNewEdu({
                      ...newEdu,
                      currentlyStudying: checked,
                      endYear: checked ? null : newEdu.endYear || new Date().getFullYear(),
                    });
                  }}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                />
                <label
                  htmlFor="currentlyStudyingCheckbox"
                  className="text-xs text-slate-300 font-medium cursor-pointer select-none"
                >
                  I am currently enrolled / studying here
                </label>
              </div>

              {/* Grade / GPA */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Grade / GPA / Percentage <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={newEdu.grade || ""}
                  onChange={(e) => setNewEdu({ ...newEdu, grade: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 3.8 GPA, Grade A, 85%"
                />
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-400">
                    Description / Key Coursework <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {(newEdu.description || "").length}/500
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={newEdu.description || ""}
                  onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  placeholder="Focused on Data Structures, Algorithms, JavaScript, React.js, and System Design."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEduModal(false);
                    setEditingEduId(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 cursor-pointer"
                >
                  {editingEduId ? "Update Education" : "Save Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}