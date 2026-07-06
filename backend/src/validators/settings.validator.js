import { z } from "zod";

export const settingsSchema = z.object({
  username: z.string().trim().min(2, "Username is required."),
  email: z.string().trim().email("Invalid email address."),
});