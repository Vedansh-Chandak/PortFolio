import { z } from "zod";

export const messageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required."),

  email: z
    .string()
    .email("Invalid email address."),

  subject: z
    .string()
    .trim()
    .max(150)
    .default(""),

  message: z
    .string()
    .trim()
    .min(10, "Message is too short.")
});