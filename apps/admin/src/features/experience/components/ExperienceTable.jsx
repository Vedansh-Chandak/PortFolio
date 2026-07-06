import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function ExperienceSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="grid animate-pulse gap-3 rounded-lg bg-zinc-800/40 p-4 md:grid-cols-[1.2fr_1fr_1fr_1.5fr_auto]">
          <div className="h-4 rounded bg-zinc-700" />
          <div className="h-4 rounded bg-zinc-700" />
          <div className="h-4 rounded bg-zinc-700" />
          <div className="h-4 rounded bg-zinc-700" />
          <div className="h-8 w-20 rounded bg-zinc-700" />
        </div>
      ))}
    </div>
  );
}

export default function ExperienceTable({
  experiences = [],
  isLoading = false,
  onEdit,
  onDelete,
}) {
  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  if (!experiences.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center text-zinc-400">
        No experience entries yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-950/60">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Duration</th>
              <th className="px-6 py-4 font-medium">Technologies</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {experiences.map((experience) => (
              <tr key={experience.id} className="align-top text-sm text-zinc-200">
                <td className="px-6 py-5 font-medium">{experience.company}</td>
                <td className="px-6 py-5 text-zinc-300">{experience.role}</td>
                <td className="px-6 py-5 text-zinc-400">{experience.duration || "-"}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {(experience.tech || []).map((item) => (
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
                    <Button variant="outline" size="icon" onClick={() => onEdit(experience)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => onDelete(experience)}>
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