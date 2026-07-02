"use client";

import { useState } from "react";
import WikiCallout from "@/components/WikiCallout";
import RoleApplicationForm from "@/components/RoleApplicationForm";

interface Role {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  responsibilities: string[];
  question: {
    id: string;
    label: string;
    placeholder: string;
  };
}

export default function RoleApplicationGate({ role }: { role: Role }) {
  const [hasReadWiki, setHasReadWiki] = useState(false);

  return (
    <>
      {!hasReadWiki && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 px-4 py-8">
          <div className="w-full max-w-lg rounded-card border border-line bg-paper-card p-6 shadow-xl">
            <p className="font-hand text-xl text-rust">before you apply —</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              Please read the TinkerHub wiki first
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
              This role application is only for students who understand how campus chapters, core teams,
              and roles work. Please read the wiki and confirm that you’ve done so before continuing.
            </p>

            <div className="mt-4">
              <WikiCallout />
            </div>

            <label className="mt-5 flex items-start gap-3 rounded-card border border-line bg-paper-dim px-4 py-3">
              <input
                id="wiki-confirmation"
                type="checkbox"
                checked={hasReadWiki}
                onChange={(e) => setHasReadWiki(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-line text-rust focus:ring-rust"
              />
              <span className="font-body text-sm text-ink-soft">
                I confirm that I have read the wiki and understand the expectations for this role.
              </span>
            </label>

            <p className="mt-4 font-body text-xs text-ink-faint">
              Checking the box above will open the application form right away.
            </p>
          </div>
        </div>
      )}

      <div className={`transition-all duration-300 ${!hasReadWiki ? "pointer-events-none opacity-60" : "opacity-100"}`}>
        <div className="max-w-xl">
          <WikiCallout />
        </div>
        <div className="mt-10">
          <RoleApplicationForm role={role} />
        </div>
      </div>
    </>
  );
}
