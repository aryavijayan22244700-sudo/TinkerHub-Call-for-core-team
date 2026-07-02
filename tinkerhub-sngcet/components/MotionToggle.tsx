"use client";

import { useEffect, useState } from "react";

export default function MotionToggle() {
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("motionDisabled");
    const initial = stored ? stored === "true" : false;
    setDisabled(initial);
    document.documentElement.classList.toggle("motion-disabled", initial);
  }, []);

  function toggle() {
    const next = !disabled;
    setDisabled(next);
    localStorage.setItem("motionDisabled", String(next));
    document.documentElement.classList.toggle("motion-disabled", next);
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={disabled}
      title={disabled ? "Enable animations" : "Reduce animations"}
      className="fixed z-50 bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-paper-card p-3 text-sm font-medium shadow-md hover:opacity-90"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="12" cy="12" r="10" fill={disabled ? "var(--accent-3)" : "var(--accent-1)"} />
        <path d="M8 12h8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}
