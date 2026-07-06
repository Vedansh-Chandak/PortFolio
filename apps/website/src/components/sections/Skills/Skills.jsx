import Container from "@/components/common/Container";
import { useTechStack } from "@/features/tech-stack/hooks/useTechStack";

import SkillsHeader from "./SkillsHeader";
import SkillCategory from "./SkillCategory";

export default function Skills() {
  const { data, isLoading, error } = useTechStack();

  if (isLoading) {
    return (
      <section className="py-28">
        <Container>
          <p>Loading...</p>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-28">
        <Container>
          <p className="text-zinc-500">Failed to load skills.</p>
        </Container>
      </section>
    );
  }

  const categories = data ?? [];

  return (
    <section
      id="skills"
      className="border-t border-zinc-200 bg-zinc-50 py-28"
    >
      <Container>
        <SkillsHeader />

        {categories.length ? categories.map((category) => (
          <SkillCategory
            key={category.id}
            category={category}
          />
        )) : (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-zinc-500">
            No skills are available yet.
          </div>
        )}
      </Container>
    </section>
  );
}