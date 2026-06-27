import React from 'react';

export type AvailabilityStatus = 'available' | 'busy' | 'fully-booked';

interface MentorAvailabilityBadgeProps {
  status: AvailabilityStatus;
  className?: string;
}

const statusConfig: Record<
  AvailabilityStatus,
  { label: string; dot: string; badge: string }
> = {
  available: {
    label: 'Available',
    dot: 'bg-emerald-500',
    badge:
      'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-700/50',
  },
  busy: {
    label: 'Busy',
    dot: 'bg-amber-500',
    badge:
      'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-700/50',
  },
  'fully-booked': {
    label: 'Fully Booked',
    dot: 'bg-red-500',
    badge:
      'bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-700/50',
  },
};

export default function MentorAvailabilityBadge({
  status,
  className = '',
}: MentorAvailabilityBadgeProps) {
  const { label, dot, badge } = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge} ${className}`}
      role="status"
      aria-label={`Availability: ${label}`}
    >
      {/* Animated dot for "available", static for others */}
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        {status === 'available' && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-75`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} />
      </span>
      {label}
    </span>
  );
}
