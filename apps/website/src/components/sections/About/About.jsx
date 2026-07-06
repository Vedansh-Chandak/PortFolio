import Container from "@/components/common/Container";
import AboutContent from "./AboutContent";
import AboutStats from "./AboutStats";

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-zinc-200 bg-white py-28"
    >
      <Container>
        <div className="grid gap-20 lg:grid-cols-[2fr_1fr]">
          <AboutContent />

          <AboutStats />
        </div>
      </Container>
    </section>
  );
}