export default function ExperienceItem({ item }) {
  return (
    <div className="grid gap-10 border-b border-zinc-200 py-12 md:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-medium text-zinc-500">
          {item.duration}
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-semibold text-zinc-950">
          {item.role}
        </h3>

        <p className="mt-2 text-lg text-zinc-600">
          {item.company}
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
          {item.description}
        </p>

        {item.tech?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}