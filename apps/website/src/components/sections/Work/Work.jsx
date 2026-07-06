import Container from "@/components/common/Container";
import WorkHeader from "./WorkHeader";
import ProjectCard from "./ProjectCard";

import { useProjects } from "@/features/projects/hooks/useProjects";

export default function Work() {
  const { data, isLoading, isError } = useProjects();

  if (isLoading) {
    return (
      <section className="py-28">
        <Container>
          <p>Loading...</p>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-28">
        <Container>
          <p className="text-zinc-500">Failed to load projects.</p>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="border-t border-zinc-200 bg-zinc-50 py-28"
    >
      <Container>
        <WorkHeader />

        {data?.length ? (
          <div className="mt-20 space-y-32">
            {data.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-zinc-500">
            No projects are available yet.
          </div>
        )}
      </Container>
    </section>
  );
}