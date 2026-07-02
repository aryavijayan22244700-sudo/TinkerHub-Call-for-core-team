const stats = [
  { value: "1st", label: "Cohort launching July 2026" },
  { value: "3", label: "Core team roles open" },
  { value: "4", label: "Mission pillars" },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-line bg-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-semibold italic text-mustard">{stat.value}</p>
            <p className="mt-1 font-body text-sm text-paper/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
