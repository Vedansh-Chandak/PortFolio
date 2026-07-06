const stats = [
  {
    value: "2+",
    label: "Years Experience",
  },
  {
    value: "20+",
    label: "Projects Built",
  },
  {
    value: "500+",
    label: "Teams Competed",
  },
  {
    value: "SIH",
    label: "National Runner-Up",
  },
];

export default function AboutStats() {
  return (
    <div className="space-y-10">
      {stats.map((item) => (
        <div
          key={item.label}
          className="border-b border-zinc-200 pb-8"
        >
          <h3 className="text-5xl font-semibold text-zinc-950">
            {item.value}
          </h3>

          <p className="mt-2 text-zinc-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}