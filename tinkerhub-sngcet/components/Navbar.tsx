"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply Now" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-xl font-semibold italic tracking-tight text-ink">
          TinkerHub <span className="text-rust not-italic">SNGCET</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isCta = link.href === "/apply";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-semibold transition-all duration-200 ${
                  isCta
                    ? "rounded-full border border-rust/40 bg-rust px-4 py-2 text-paper shadow-[0_8px_20px_-10px_rgba(176,74,46,0.7)] hover:-translate-y-0.5 hover:bg-rust/90"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="font-body text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
              <button
                onClick={() => logOut()}
                className="rounded-card border border-line px-4 py-2 font-body text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Log out
              </button>
            </div>
          ) : null}
        </div>

        {/* Mobile toggle */}
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((link) => {
              const isCta = link.href === "/apply";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-body text-base font-semibold ${
                    isCta
                      ? "rounded-full border border-rust/40 bg-rust px-4 py-2 text-center text-paper"
                      : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="stitch-divider" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="font-body text-base font-medium text-ink">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    setOpen(false);
                  }}
                  className="rounded-card border border-line px-4 py-2 text-left font-body text-sm font-medium text-ink"
                >
                  Log out
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
