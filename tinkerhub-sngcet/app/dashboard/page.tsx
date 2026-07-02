"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import eventsData from "@/lib/data/events.json";
import EventCard from "@/components/EventCard";

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-hand text-2xl text-rust">good to see you —</p>
      <h1 className="mt-1 font-display text-3xl font-semibold text-ink">
        {user?.email?.split("@")[0]}
      </h1>

      {user && !user.emailVerified && (
        <p className="mt-4 rounded-card border border-mustard/40 bg-mustard/10 px-4 py-3 font-body text-sm text-ink">
          Your email isn't verified yet. Check your inbox for a verification link — some community
          features stay locked until then.
        </p>
      )}

      <h2 className="mt-10 font-display text-xl font-semibold italic text-ink">Next up for you</h2>
      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {eventsData.upcoming.map((event) => (
          <EventCard key={event.id} event={event} variant="upcoming" />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
