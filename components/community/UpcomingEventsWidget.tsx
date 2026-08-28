// Upcoming events sidebar widget (#878)
import React from "react";
import EventCard, { CommunityEvent } from "./EventCard";

interface UpcomingEventsWidgetProps {
  events?: CommunityEvent[];
  onRegister?: (id: string) => void;
}

const DEFAULT_EVENTS: CommunityEvent[] = [
  {
    id: "1",
    title: "Tech Career AMA",
    host: "Sarah Chen",
    date: "Sep 5, 2026",
    time: "3:00 PM UTC",
    registrationCount: 142,
  },
  {
    id: "2",
    title: "Salary Negotiation Workshop",
    host: "James Okafor",
    date: "Sep 10, 2026",
    time: "5:00 PM UTC",
    registrationCount: 89,
  },
  {
    id: "3",
    title: "Leadership Masterclass",
    host: "Priya Nair",
    date: "Sep 15, 2026",
    time: "2:00 PM UTC",
    registrationCount: 61,
  },
];

const UpcomingEventsWidget = ({
  events = DEFAULT_EVENTS,
  onRegister,
}: UpcomingEventsWidgetProps) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4">
    <h3 className="font-semibold text-gray-900 mb-3">Upcoming Events</h3>
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onRegister={onRegister} />
      ))}
    </div>
  </div>
);

export default UpcomingEventsWidget;
