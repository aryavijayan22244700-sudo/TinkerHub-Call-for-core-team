"use client";

export default function DecorativeBubbles() {
  return (
    <div aria-hidden className="site-decor-container pointer-events-none">
      <div className="decor-bubble bubble-1 floaty" style={{ top: -28, left: -24, animation: 'bubble-move 7s ease-in-out infinite' }} />
      <div className="decor-bubble bubble-2" style={{ top: 20, right: -20, animation: 'bubble-move 9s ease-in-out infinite', opacity: 0.95 }} />
      <div className="decor-bubble bubble-3 floaty" style={{ bottom: -18, left: '50%', transform: 'translateX(-50%)', animation: 'bubble-move 6.5s ease-in-out infinite' }} />

      <svg className="absolute -top-6 right-6 hang-swing" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="6" r="3" fill="var(--accent-2)" />
        <path d="M12 9v6" stroke="var(--accent-4)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="18" r="2" fill="var(--accent-3)" />
      </svg>
    </div>
  );
}
