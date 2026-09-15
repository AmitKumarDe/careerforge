import { z } from "zod";

const updateProfileSchema = z.object({
  headline: z
    .string()
    .trim()
    .max(120, "Headline cannot exceed 120 characters")
    .optional(),

  phone: z.string().trim().max(20, "Phone number is too long").optional(),

  bio: z
    .string()
    .trim()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),

  location: z
    .object({
      city: z.string().trim().max(100).optional(),
      state: z.string().trim().max(100).optional(),
      country: z.string().trim().max(100).optional(),
    })
    .optional(),

  experienceLevel: z
    .enum(["STUDENT", "ENTRY_LEVEL", "MID_LEVEL", "SENIOR_LEVEL", "LEAD"])
    .optional(),

  preferredRoles: z.array(z.string().trim().min(1)).optional(),

  preferredLocations: z.array(z.string().trim().min(1)).optional(),

  jobPreferences: z.array(z.string().trim().min(1)).optional(),

  expectedSalary: z
    .object({
      min: z.number().min(0).optional(),
      max: z.number().min(0).optional(),
      currency: z.string().trim().min(1).max(10).optional(),
    })
    .optional(),

  portfolioUrl: z
    .string()
    .trim()
    .url("Invalid portfolio URL")
    .or(z.literal(""))
    .optional(),

  githubUrl: z
    .string()
    .trim()
    .url("Invalid GitHub URL")
    .or(z.literal(""))
    .optional(),

  linkedinUrl: z
    .string()
    .trim()
    .url("Invalid LinkedIn URL")
    .or(z.literal(""))
    .optional(),

  status: z.enum(["OPEN", "NOT_LOOKING", "OPEN_TO_OFFERS"]).optional(),
});

const updateSkillsSchema = z.object({
  skills: z
    .array(z.string().trim().min(1))
    .max(50, "Maximum 50 skills allowed"),
});

export { updateProfileSchema, updateSkillsSchema };
