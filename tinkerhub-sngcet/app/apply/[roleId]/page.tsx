import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import rolesData from "@/lib/data/roles.json";
import RoleApplicationGate from "@/components/RoleApplicationGate";

interface Props {
  params: Promise<{ roleId: string }>;
}

export function generateStaticParams() {
  return rolesData.roles.map((role) => ({ roleId: role.id }));
}

function getRole(roleId: string) {
  return rolesData.roles.find((r) => r.id === roleId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roleId } = await params;
  const role = getRole(roleId);
  return { title: role ? `${role.title} — TinkerHub SNGCET` : "Role not found" };
}

export default async function RoleDetailPage({ params }: Props) {
  const { roleId } = await params;
  const role = getRole(roleId);
  if (!role) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Link href="/apply" className="font-body text-sm font-medium text-ink-soft hover:text-ink">
        ← All open roles
      </Link>

      <p className="mt-6 font-hand text-2xl text-rust">{role.tagline}</p>
      <h1 className="mt-1 font-display text-3xl font-semibold text-ink md:text-4xl">{role.title}</h1>
      <p className="mt-4 max-w-2xl font-body text-base text-ink-soft">{role.summary}</p>

      <div className="mt-8 note-card rounded-card p-6">
        <h2 className="font-display text-lg font-semibold text-ink">What you'll actually be doing</h2>
        <ul className="mt-3 space-y-2">
          {role.responsibilities.map((item) => (
            <li key={item} className="flex gap-3 font-body text-sm text-ink-soft">
              <span className="mt-1 text-rust">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <RoleApplicationGate role={role} />
      </div>
    </div>
  );
}
