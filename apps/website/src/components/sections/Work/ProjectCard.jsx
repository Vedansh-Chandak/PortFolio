export default function ProjectCard({ project }) {
  const imageUrl = project.cover_image_url;
  const shortDescription = project.short_description;
  const liveUrl = project.live_url;
  const githubUrl = project.github_url;

  return (
    <article className="grid gap-12 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="aspect-video h-full w-full object-cover"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-zinc-100 text-sm text-zinc-500">
            Project preview not available
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-4xl font-semibold text-zinc-950">
          {project.title}
        </h3>

        <p className="mt-6 text-lg leading-8 text-zinc-600">
          {shortDescription}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.tech?.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-10 flex gap-8">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium"
          >
            View Project →
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-500"
          >
            GitHub →
          </a>
        </div>
      </div>
    </article>
  );
}