import { motion } from "framer-motion";

export default function HeroContent({ profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="space-y-10"
    >
      {/* Greeting */}

      <p className="text-lg font-medium tracking-wide text-zinc-500">
        Hello.
      </p>

      {/* Main Heading */}

      <h1 className="max-w-5xl text-6xl font-semibold leading-[0.95] tracking-tight text-zinc-950 md:text-8xl">
        {profile?.tagline ||
          "Building software that solves real-world problems."}
      </h1>

      {/* Name */}

      <h2 className="text-2xl font-medium text-zinc-700 md:text-3xl">
        {profile?.name}
      </h2>

      {/* Title */}

      <p className="max-w-2xl text-xl leading-9 text-zinc-500">
        {profile?.title}
      </p>
    </motion.div>
  );
}