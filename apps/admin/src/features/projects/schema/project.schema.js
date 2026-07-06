import { z } from "zod";

export const projectSchema = z.object({
	title: z
		.string()
		.trim()
		.min(3, "Title must be at least 3 characters.")
		.max(100),

	slug: z.string().optional().default(""),

	shortDescription: z
		.string()
		.trim()
		.min(10, "Short description must be at least 10 characters.")
		.max(200),

	description: z.string().trim().min(20, "Description must be at least 20 characters."),

	status: z.enum(["Live", "In Progress", "Archived"]),

	coverImageUrl: z.string().optional().default(""),

	coverImagePublicId: z.string().optional().default(""),

	features: z.string().optional().default(""),

	tech: z.string().optional().default(""),

	githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")),

	liveUrl: z.string().url("Invalid live URL").or(z.literal("")),

	featured: z.boolean().default(false),

	sortOrder: z.coerce.number().int().min(0, "Sort order must be 0 or greater.").default(0),
});
