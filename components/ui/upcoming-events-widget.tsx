'use client';

import React from 'react';
import { Button } from './button';

// Type definitions
interface Event {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  registrationCount?: number;
}

interface UpcomingEventsWidgetProps {
  events: Event[];
  onRegister?: (eventId: string) => void;
}

export function UpcomingEventsWidget({ events, onRegister }: UpcomingEventsWidgetProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
      
      {events.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming events scheduled.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-3">Hosted by {event.host}</p>
              
              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </span>
              </div>
              
              {event.registrationCount !== undefined && (
                <p className="text-xs text-gray-500 mb-3">
                  {event.registrationCount} {event.registrationCount === 1 ? 'person' : 'people'} registered
                </p>
              )}
              
              <Button 
                variant="secondary"
                onClick={() => onRegister?.(event.id)}
                className="w-full justify-center"
              >
                Register
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}