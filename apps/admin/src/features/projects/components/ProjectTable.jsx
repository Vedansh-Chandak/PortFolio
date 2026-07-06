import { Pencil, Trash2, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import FeaturedBadge from "./FeaturedBadge";

function ProjectSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="grid animate-pulse gap-3 border-b border-zinc-800 p-5 md:grid-cols-[1.3fr_0.7fr_0.7fr_1fr_auto]"
        >
          <div className="h-10 rounded bg-zinc-800" />
          <div className="h-6 rounded bg-zinc-800" />
          <div className="h-6 rounded bg-zinc-800" />
          <div className="h-6 rounded bg-zinc-800" />
          <div className="h-8 w-24 rounded bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}

export default function ProjectTable({
  projects = [],
  isLoading = false,
  onEdit,
  onDelete,
}) {
  if (isLoading) {
    return <ProjectSkeleton />;
  }

  if (!projects.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center text-zinc-400">
        No projects yet. Create the first one to get started.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-950/60">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Featured</th>
              <th className="px-6 py-4 font-medium">Tech</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {projects.map((project) => (
              <tr key={project.id} className="align-top text-sm text-zinc-200">
                <td className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                      {project.coverImageUrl ? (
                        <img
                          src={project.coverImageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-zinc-600">
                          No image
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{project.title}</h3>
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-500 transition-colors hover:text-white"
                            aria-label="Open live project"
                          >
                            <ExternalLink size={14} />
                          </a>
                        ) : null}
                      </div>

                      <p className="mt-1 text-xs text-zinc-500">/{project.slug}</p>
                      <p className="mt-2 max-w-xl text-sm text-zinc-400">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-zinc-300">{project.status}</td>

                <td className="px-6 py-5">
                  <FeaturedBadge featured={project.featured} />
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {(project.tech || []).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(project)}>
                      <Pencil size={16} />
                    </Button>

                    <Button variant="destructive" size="icon" onClick={() => onDelete(project)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}