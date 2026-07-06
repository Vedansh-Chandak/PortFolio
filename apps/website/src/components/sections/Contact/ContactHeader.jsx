export default function ContactHeader() {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        Contact
      </p>

      <h2 className="mt-4 text-5xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
        Let's build something meaningful.
      </h2>

      <p className="mt-6 text-lg leading-8 text-zinc-600">
        Whether you're building AI-powered products,
        scalable backend systems, or modern web
        applications, I'd love to hear about it.
      </p>

      <div className="mt-10 space-y-3">
        <a
          href="mailto:jecvedansh@gmail.com"
          className="block text-lg text-zinc-800 hover:text-black"
        >
          jecvedansh@gmail.com
        </a>

        <a
          href="https://github.com/Vedansh-Chandak"
          target="_blank"
          rel="noreferrer"
          className="block text-lg text-zinc-800 hover:text-black"
        >
          GitHub
        </a>

        <a
          href="https://linkedin.com/in/vedansh-chandak-842943290"
          target="_blank"
          rel="noreferrer"
          className="block text-lg text-zinc-800 hover:text-black"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}