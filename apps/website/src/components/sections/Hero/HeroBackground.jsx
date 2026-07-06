export default function HeroBackground() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
		>
			<div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0)_58%)]" />
			<div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-zinc-900/5 blur-3xl" />
			<div className="absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-zinc-900/5 blur-3xl" />
		</div>
	)
}
