export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold italic text-ink">TinkerHub SNGCET</p>
            <p className="mt-1 max-w-sm font-body text-sm text-ink-soft">
              A student-run community for learning by building, at Sree Narayana Guru College of
              Engineering and Technology, Payyanur.
            </p>
          </div>
          <p className="font-hand text-xl text-rust">learning · activities · community · tinkering</p>
        </div>
        <hr className="stitch-divider my-6" />
        <p className="font-body text-xs text-ink-faint">
          &copy; {new Date().getFullYear()} TinkerHub SNGCET. Part of the TinkerHub community network.
        </p>
      </div>
    </footer>
  );
}
