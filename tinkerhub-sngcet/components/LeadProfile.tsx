import leadData from "@/lib/data/lead.json";

const iconPaths: Record<string, string> = {
  linkedin: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9z",
  github:
    "M12 .5C5.73.5.98 5.24.98 11.5c0 4.99 3.24 9.22 7.73 10.72.57.1.78-.25.78-.55v-2.03c-3.15.68-3.81-1.35-3.81-1.35-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.4-1.22.72-1.5-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.11 1.16a10.8 10.8 0 015.66 0c2.16-1.46 3.11-1.16 3.11-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.2.66.79.55A11.02 11.02 0 0023 11.5C23 5.24 18.27.5 12 .5z",
  instagram:
    "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.13s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.13-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.17 1.17 0 100-2.34 1.17 1.17 0 000 2.34z",
  mail: "M2 5.5A1.5 1.5 0 013.5 4h17A1.5 1.5 0 0122 5.5v13a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-13zm2.2.5l7.8 6.1L19.8 6H4.2zM20 8.2l-7.4 5.8a1 1 0 01-1.2 0L4 8.2v10.3h16V8.2z",
};

export default function LeadProfile() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-hand text-2xl text-rust">meet the person behind this —</p>
      <div className="note-card mt-4 flex flex-col gap-8 rounded-card p-8 sm:flex-row sm:items-center">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-2 border-mustard bg-olive-light font-display text-3xl font-semibold text-olive-dark">
          {leadData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">{leadData.name}</h2>
          <p className="font-body text-sm font-medium text-rust">
            {leadData.role} · {leadData.chapter}
          </p>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">{leadData.bio}</p>
          <div className="mt-5 flex flex-wrap gap-4">
            {leadData.social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d={iconPaths[s.icon]} />
                </svg>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
