const pillars = [
  {
    label: "Learning",
    copy: "Peer-led sessions on the tools and languages students actually want to pick up next.",
  },
  {
    label: "Activities",
    copy: "Workshops, build nights, and hackathons that turn ideas into working prototypes.",
  },
  {
    label: "Community",
    copy: "A place to find teammates, mentors, and people who'll debug with you at 11pm.",
  },
  {
    label: "Tinkering",
    copy: "Room to try things that might not work — that's the point of a workbench.",
  },
];

export default function MissionPillars() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="font-display text-2xl font-medium italic text-ink md:text-3xl">
        What we're building here
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <div key={pillar.label} className="border-t-2 border-rust pt-4">
            <p className="font-display text-lg font-semibold text-ink">{pillar.label}</p>
            <p className="mt-2 font-body text-sm text-ink-soft">{pillar.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
