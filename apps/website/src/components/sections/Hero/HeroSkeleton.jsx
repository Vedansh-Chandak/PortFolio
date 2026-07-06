export default function HeroSkeleton() {
	return (
		<section className="flex min-h-screen items-center">
			<div className="mx-auto w-full max-w-7xl px-6 py-24">
				<div className="space-y-6 animate-pulse">
					<div className="h-5 w-24 rounded-full bg-zinc-200" />
					<div className="h-24 w-full max-w-4xl rounded-3xl bg-zinc-200" />
					<div className="h-10 w-64 rounded-full bg-zinc-200" />
					<div className="h-8 w-full max-w-2xl rounded-full bg-zinc-200" />
					<div className="flex gap-4 pt-6">
						<div className="h-14 w-40 rounded-full bg-zinc-200" />
						<div className="h-14 w-32 rounded-full bg-zinc-200" />
					</div>
				</div>
			</div>
		</section>
	)
}
