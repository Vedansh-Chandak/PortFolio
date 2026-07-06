import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { techStackSchema } from "../schema/techStack.schema";

const defaultValues = {
	category: "",
	items: "",
	sort_order: 0,
};

export default function TechStackForm({
	initialData,
	onSubmit,
	onCancel,
	isSubmitting = false,
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(techStackSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!initialData) {
			reset(defaultValues);

			return;
		}

		reset({
			category: initialData.category ?? "",
			items: Array.isArray(initialData.items)
				? initialData.items.join("\n")
				: "",
			sort_order: initialData.sort_order ?? 0,
		});
	}, [initialData, reset]);

	return (
		<Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
			<CardContent className="p-6">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					<div>
						<label className="mb-2 block text-sm font-medium text-zinc-200">
							Category
						</label>
						<Input placeholder="Frontend" {...register("category")} />
						{errors.category && (
							<p className="mt-1 text-sm text-red-500">
								{errors.category.message}
							</p>
						)}
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-zinc-200">
							Technologies
						</label>
						<Textarea
							rows={6}
							placeholder="React\nNext.js\nTailwind CSS"
							{...register("items")}
						/>
						<p className="mt-1 text-xs text-zinc-500">
							Add one technology per line or separate items with commas.
						</p>
						{errors.items && (
							<p className="mt-1 text-sm text-red-500">
								{errors.items.message}
							</p>
						)}
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-zinc-200">
							Sort Order
						</label>
						<Input type="number" min="0" {...register("sort_order")} />
						{errors.sort_order && (
							<p className="mt-1 text-sm text-red-500">
								{errors.sort_order.message}
							</p>
						)}
					</div>

					<div className="flex gap-3">
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : initialData ? "Update Category" : "Add Category"}
						</Button>

						{initialData && onCancel && (
							<Button type="button" variant="outline" onClick={onCancel}>
								Cancel
							</Button>
						)}
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
