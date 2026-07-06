import { z } from "zod";

export const techStackSchema = z.object({
	category: z
		.string()
		.trim()
		.min(2, "Category is required.")
		.max(50),

	items: z
		.string()
		.trim()
		.min(1, "At least one technology is required."),

	sort_order: z.coerce
		.number()
		.int()
		.min(0, "Sort order must be 0 or greater.")
		.default(0),
});
