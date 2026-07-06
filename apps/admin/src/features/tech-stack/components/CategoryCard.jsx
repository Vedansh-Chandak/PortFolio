import { Pencil, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CategoryCard({ category, onEdit, onDelete }) {
	return (
		<Card className="border-zinc-800 bg-zinc-900">
			<CardContent className="p-6">
				<div className="flex items-start justify-between gap-4">
					<div>
						<div className="flex items-center gap-3">
							<h3 className="text-xl font-semibold text-white">
								{category.category}
							</h3>

							<span className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400">
								#{category.sort_order ?? 0}
							</span>
						</div>

						<p className="mt-2 text-sm text-zinc-500">
							{category.items?.length ?? 0} technologies
						</p>
					</div>

					<div className="flex gap-2">
						<Button variant="outline" size="icon" onClick={() => onEdit(category)}>
							<Pencil size={16} />
						</Button>

						<Button
							variant="destructive"
							size="icon"
							onClick={() => onDelete(category)}
						>
							<Trash2 size={16} />
						</Button>
					</div>
				</div>

				<div className="mt-5 flex flex-wrap gap-2">
					{(category.items || []).map((item) => (
						<span
							key={item}
							className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
						>
							{item}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
