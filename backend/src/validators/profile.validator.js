import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim(),

  title: z.string().trim(),

  tagline: z.string().trim(),

  bio: z.string().trim(),

  email: z.email("Invalid email address."),

  github: z.string().url().or(z.literal("")),

  linkedin: z.string().url().or(z.literal("")),

  twitter: z.string().url().or(z.literal("")),

  avatar_url: z.string(),

  avatar_public_id: z.string(),

  resume_url: z.string(),

  resume_public_id: z.string(),
});