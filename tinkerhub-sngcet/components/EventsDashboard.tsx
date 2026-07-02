import eventsData from "@/lib/data/events.json";
import EventCard from "@/components/EventCard";

export default function EventsDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div>
        <p className="font-hand text-2xl text-rust">on the workbench next —</p>
        <h2 className="mt-1 font-display text-2xl font-semibold italic text-ink md:text-3xl">Upcoming</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {eventsData.upcoming.map((event) => (
            <EventCard key={event.id} event={event} variant="upcoming" />
          ))}
        </div>
      </div>

      <hr className="stitch-divider my-14" />

      <div>
        <p className="font-hand text-2xl text-olive-dark">already happened —</p>
        <h2 className="mt-1 font-display text-2xl font-semibold italic text-ink md:text-3xl">Past</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {eventsData.past.map((event) => (
            <EventCard key={event.id} event={event} variant="past" />
          ))}
        </div>
      </div>
    </div>
  );
}
