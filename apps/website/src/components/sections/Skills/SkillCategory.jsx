export default function SkillCategory({ category }) {
  return (
    <div className="border-b border-zinc-200 py-12">
      <h3 className="mb-8 text-3xl font-semibold text-zinc-950">
        {category.category}
      </h3>

      <div className="flex flex-wrap gap-4">
        {category.items?.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}