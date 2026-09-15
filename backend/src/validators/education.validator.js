import { z } from "zod";

const createEducationSchema = z.object({
  institution: z
    .string()
    .trim()
    .min(2, "Institution name is required")
    .max(150),

  degree: z.string().trim().min(2, "Degree is required").max(100),

  fieldOfStudy: z.string().trim().max(100).optional(),

  startYear: z.number().int().min(1950).max(new Date().getFullYear()),

  endYear: z
    .number()
    .int()
    .min(1950)
    .max(new Date().getFullYear() + 10)
    .nullable()
    .optional(),

  currentlyStudying: z.boolean().optional(),

  grade: z.string().trim().max(30).optional(),

  description: z.string().trim().max(500).optional(),
});

const updateEducationSchema = createEducationSchema.partial();

export { createEducationSchema, updateEducationSchema };
