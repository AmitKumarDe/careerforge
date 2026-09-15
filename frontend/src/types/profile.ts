export interface Location {
  city: string;
  state: string;
  country: string;
}

export interface ExpectedSalary {
  min: number;
  max: number;
  currency: string;
}

export type ExperienceLevel =
  | "STUDENT"
  | "ENTRY_LEVEL"
  | "MID_LEVEL"
  | "SENIOR_LEVEL"
  | "LEAD";

export type ProfileStatus = "OPEN" | "NOT_LOOKING" | "OPEN_TO_OFFERS";

export interface Profile {
  _id: string;
  user: string;

  headline: string;
  phone: string;
  bio: string;

  location: Location;

  experienceLevel: ExperienceLevel;

  preferredRoles: string[];
  preferredLocations: string[];
  jobPreferences: string[];

  expectedSalary: ExpectedSalary;

  resumeUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;

  status: ProfileStatus;

  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "RECRUITER" | "ADMIN";
  skills: string[];
  profileImage?: string;
  isEmailVerified: boolean;
}

export interface ProfileResponse {
  success: boolean;
  data: {
    user: User;
    profile: Profile;
  };
  message: string;
}
