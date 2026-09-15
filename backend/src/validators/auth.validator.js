import { z } from "zod";

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    role: z
        .enum(["USER", "RECRUITER"])
        .default("USER"),

    skills: z
        .array(z.string().trim().min(1))
        .max(50, "Maximum 50 skills allowed")
        .default([]),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),

  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email"),
});


const resetPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),
});


const resendVerificationSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please provide a valid email"),
});

const verifyUserSchema = z.object({
    
});

export { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, resendVerificationSchema };

