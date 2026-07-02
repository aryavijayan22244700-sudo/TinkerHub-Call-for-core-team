import Link from "next/link";

interface Role {
  id: string;
  title: string;
  tagline: string;
  summary: string;
}

export default function RoleCard({ role }: { role: Role }) {
  return (
    <Link
      href={`/apply/${role.id}`}
      className="note-card group block rounded-card p-6 transition-transform hover:-translate-y-1 relative overflow-visible"
    >
      <span className="absolute -top-3 -right-3 hang-swing">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="4" fill="var(--accent-1)" />
          <circle cx="18" cy="18" r="3" fill="var(--accent-3)" />
        </svg>
      </span>
      <p className="font-hand text-lg text-rust">{role.tagline}</p>
      <h3 className="mt-1 font-display text-xl font-semibold text-ink">{role.title}</h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{role.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-ink underline decoration-mustard decoration-2 underline-offset-4 group-hover:text-rust">
        View role &amp; apply →
      </span>
    </Link>
  );
}
