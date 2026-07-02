import Link from "next/link";
import rolesData from "@/lib/data/roles.json";

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long" });
}

export default function RecruitmentBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-4 md:-mt-4 relative overflow-visible">
      <Link
        href="/apply"
        className="note-card flex flex-col items-start justify-between gap-4 rounded-card border border-rust/30 bg-paper-dim p-6 transition-transform hover:-translate-y-1 sm:flex-row sm:items-center relative overflow-visible"
      >
        <span className="absolute -left-6 top-2 hang-swing">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="6" r="4" fill="var(--accent-2)" />
            <path d="M12 10v6" stroke="var(--accent-4)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <div>
          <p className="font-hand text-lg text-rust">applications open now —</p>
          <p className="font-display text-lg font-semibold text-ink">
            Core Team 2026 recruitment · 3 roles open · apply before {formatDeadline(rolesData.deadline)}
          </p>
        </div>
        <span className="shrink-0 rounded-card bg-rust px-5 py-2.5 font-body text-sm font-semibold text-paper-card shadow-[0_10px_25px_-12px_rgba(176,74,46,0.85)]">
          Start your application →
        </span>
      </Link>
    </section>
  );
}
