import type { Metadata } from "next";
import EventsDashboard from "@/components/EventsDashboard";

export const metadata: Metadata = {
  title: "Events — TinkerHub SNGCET",
};

export default function EventsPage() {
  return <EventsDashboard />;
}
