interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  location: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventCard({ event, variant = "upcoming" }: { event: Event; variant?: "upcoming" | "past" }) {
  return (
    <div className={`note-card rounded-card p-6 ${variant === "past" ? "opacity-75" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`font-hand text-lg ${variant === "past" ? "text-olive-dark" : "text-rust"}`}>
          {event.type}
        </span>
        <span className="font-body text-xs text-ink-faint">{formatDate(event.date)}</span>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold text-ink">{event.title}</h3>
      <p className="mt-2 font-body text-sm text-ink-soft">{event.description}</p>
      <p className="mt-4 font-body text-xs text-ink-faint">📍 {event.location}</p>
    </div>
  );
}
