export default function WikiCallout() {
  return (
    <a
      href="https://wiki.tinkerhub.org/campus-community/campus-communities/campus-structure"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 rounded-card border border-line bg-paper-dim px-5 py-4 transition-colors hover:border-rust"
    >
      <div>
        <p className="font-body text-sm font-semibold text-ink">New to TinkerHub's Campus Community?</p>
        <p className="mt-0.5 font-body text-xs text-ink-soft">
          Read how campus chapters, core teams, and roles work on the official TinkerHub wiki.
        </p>
      </div>
      <span className="shrink-0 font-hand text-xl text-rust">wiki →</span>
    </a>
  );
}
