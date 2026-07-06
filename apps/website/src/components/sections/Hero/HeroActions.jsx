import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function HeroActions({ profile }) {
  const scrollToSection = (sectionId) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.8,
      }}
      className="mt-14 flex flex-wrap gap-5"
    >
      <button
        onClick={() => scrollToSection("projects")}
        className="group flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800"
      >
        Work

        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      <button
        onClick={() => scrollToSection("experience")}
        className="group flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-7 py-4 text-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-950"
      >
        Experience

        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      {profile?.resume && (
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-7 py-4 text-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-950"
        >
          Resume

          <Download
            size={18}
            className="transition-transform group-hover:translate-y-0.5"
          />
        </a>
      )}
    </motion.div>
  );
}