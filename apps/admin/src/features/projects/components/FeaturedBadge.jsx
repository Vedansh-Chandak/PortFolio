export default function FeaturedBadge({ featured }) {
	if (!featured) {
		return (
			<span className="inline-flex rounded-full border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-400">
				Not Featured
			</span>
		);
	}

	return (
		<span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
			Featured
		</span>
	);
}
