import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),

  title: z.string().min(1, "Title is required"),

  tagline: z.string().min(1, "Tagline is required"),

  bio: z.string().min(10, "Bio is too short"),

  email: z.string().email("Invalid email"),

  github: z.string().url().or(z.literal("")),

  linkedin: z.string().url().or(z.literal("")),

  twitter: z.string().url().or(z.literal("")),

  avatar_url: z.string().url("Invalid avatar URL").or(z.literal("")),

  avatar_public_id: z.string().optional().default(""),

  resume_url: z.string().url("Invalid resume URL").or(z.literal("")),

  resume_public_id: z.string().optional().default(""),
});