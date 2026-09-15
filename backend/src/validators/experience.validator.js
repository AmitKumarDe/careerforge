import { z } from "zod";

const createExperienceSchema = z.object({
  company: z.string().trim().min(2, "Company name is required").max(150),

  jobTitle: z.string().trim().min(2, "Job title is required").max(100),

  employmentType: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"])
    .optional(),

  location: z.string().trim().max(100).optional(),

  startDate: z.coerce.date(),

  endDate: z.coerce.date().nullable().optional(),

  currentlyWorking: z.boolean().optional(),

  description: z.string().trim().max(1500).optional(),

  technologies: z.array(z.string().trim().min(1)).max(30).optional(),
});

const updateExperienceSchema = createExperienceSchema.partial();

export { createExperienceSchema, updateExperienceSchema };
