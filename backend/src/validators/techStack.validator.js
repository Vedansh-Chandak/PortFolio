import { z } from "zod";

export const techStackSchema = z.object({
  category: z
    .string()
    .trim()
    .min(2, "Category is required.")
    .max(50),

  items: z
    .array(z.string().trim())
    .min(1, "At least one technology is required."),

  sort_order: z
    .number()
    .int()
    .default(0),
});