// Reusable event card component (#879)
import React from "react";

export interface CommunityEvent {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  registrationCount?: number;
}

interface EventCardProps {
  event: CommunityEvent;
  onRegister?: (id: string) => void;
}

const EventCard = ({ event, onRegister }: EventCardProps) => (
  <div className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
    <h4 className="text-sm font-semibold text-gray-900 mb-1">{event.title}</h4>
    <p className="text-xs text-gray-500 mb-1">Hosted by {event.host}</p>
    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
      <span>{event.date}</span>
      <span>·</span>
      <span>{event.time}</span>
    </div>
    {event.registrationCount !== undefined && (
      <p className="text-xs text-gray-400 mb-2">
        {event.registrationCount} registered
      </p>
    )}
    <button
      onClick={() => onRegister?.(event.id)}
      className="w-full text-xs py-1.5 px-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
    >
      Register
    </button>
  </div>
);

export default EventCard;
