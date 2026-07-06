import Container from "@/components/common/Container";
import { useExperience } from "@/features/experience/hooks/useExperience";

import ExperienceHeader from "./ExperienceHeader";
import ExperienceItem from "./ExperienceItem";

export default function Experience() {
  const { data, isLoading, error } = useExperience();

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
    return null;
  }

  return (
    <section
      id="experience"
      className="border-t border-zinc-200 bg-white py-28"
    >
      <Container>
        <ExperienceHeader />

        <div>
          {data?.map((item) => (
            <ExperienceItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}