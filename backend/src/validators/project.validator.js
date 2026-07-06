import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100),

  short_description: z
    .string()
    .trim()
    .min(10)
    .max(200),

  description: z
    .string()
    .trim()
    .min(20),

  status: z.enum([
    "Live",
    "In Progress",
    "Archived",
  ]),

  cover_image_url: z.string().default(""),

  cover_image_public_id: z.string().default(""),

  features: z.array(z.string()).default([]),

  tech: z.array(z.string()).default([]),

  live_url: z
    .string()
    .url()
    .or(z.literal(""))
    .default(""),

  github_url: z
    .string()
    .url()
    .or(z.literal(""))
    .default(""),

  is_featured: z.boolean().default(false),

  sort_order: z.number().int().default(0),
});