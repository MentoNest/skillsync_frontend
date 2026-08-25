"use client";

interface UpcomingEvent {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
}

interface UpcomingEventsSidebarWidgetProps {
  events: UpcomingEvent[];
  onEventClick?: (eventId: string) => void;
}

export default function UpcomingEventsSidebarWidget({
  events,
  onEventClick,
}: UpcomingEventsSidebarWidgetProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Events
      </h3>
      {events.length === 0 ? (
        <p className="text-sm text-gray-500">No upcoming events.</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => onEventClick?.(event.id)}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-colors"
            >
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {event.title}
              </h4>
              <p className="text-xs text-gray-500 mb-1">by {event.host}</p>
              <div className="flex gap-2 text-xs text-gray-400">
                <span>{event.date}</span>
                <span>·</span>
                <span>{event.time}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
