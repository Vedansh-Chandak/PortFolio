import { z } from "zod";

export const experienceSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, "Company name is required."),

  role: z
    .string()
    .trim()
    .min(2, "Role is required."),

  duration: z
    .string()
    .trim()
    .optional()
    .default(""),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),

  tech: z.array(z.string()).default([]),

  sort_order: z.number().int().default(0),
});