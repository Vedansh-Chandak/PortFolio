import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About/About";
import Work from "@/components/sections/Work/Work";
import Experience from "@/components/sections/Experience/Experience";
import Skills from "@/components/sections/Skills/Skills";
import Contact from "@/components/sections/Contact/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Contact />
      <section id="skills" />
    </main>
  );
}