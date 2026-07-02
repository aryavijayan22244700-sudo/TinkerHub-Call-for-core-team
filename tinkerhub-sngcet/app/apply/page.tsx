import type { Metadata } from "next";
import rolesData from "@/lib/data/roles.json";
import RoleCard from "@/components/RoleCard";
import WikiCallout from "@/components/WikiCallout";

export const metadata: Metadata = {
  title: "Open Roles — TinkerHub SNGCET",
};

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-hand text-2xl text-rust">call for core team —</p>
      <h1 className="mt-1 font-display text-3xl font-semibold italic text-ink md:text-4xl">Open roles</h1>
      <p className="mt-4 max-w-2xl font-body text-base text-ink-soft">
        We're building the founding core team for TinkerHub SNGCET. Three roles are open right now —
        pick the one that fits you and apply directly below.
      </p>
      <p className="mt-3 inline-block rounded-card border border-mustard/50 bg-mustard/10 px-4 py-2 font-body text-sm font-medium text-ink">
        Applications close {formatDeadline(rolesData.deadline)}
      </p>

      <div className="mt-8 max-w-xl">
        <WikiCallout />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {rolesData.roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}
