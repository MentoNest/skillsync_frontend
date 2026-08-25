import React, { memo } from 'react';
import CategoryBadge from '@/components/CategoryBadge';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Category {
  label: string;
  count: number;
  color: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
}

interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface CommunitySidebarProps {
  categories: Category[];
  events: CommunityEvent[];
  stats: Stat[];
  onEventRegister: (eventId: string, eventTitle: string) => void;
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * CommunitySidebar
 *
 * Wrapped in React.memo — the sidebar data never changes during a session,
 * so it skips all re-renders triggered by discussion feed interactions.
 *
 * Lazy-loaded at the page level via next/dynamic to defer its JS bundle
 * until after the above-the-fold discussion feed is interactive.
 */
const CommunitySidebar = memo(function CommunitySidebar({
  categories,
  events,
  stats,
  onEventRegister,
}: CommunitySidebarProps) {
  return (
    <aside
      className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4"
      aria-label="Community sidebar"
    >
      {/* ── Categories ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
          Browse Categories
        </h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.label}>
              <button className="w-full flex items-center justify-between group focus:outline-none focus-visible:underline">
                <CategoryBadge category={cat.label} color={cat.color} />
                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                  {cat.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Upcoming Events ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
          Upcoming Events
        </h2>
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="flex gap-3 group">
              {/* Date chip */}
              <div className="flex-shrink-0 w-10 text-center" aria-hidden="true">
                <div className="bg-purple-100 text-purple-700 rounded-lg px-1 py-1">
                  <span className="block text-xs font-bold leading-none">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="block text-lg font-extrabold leading-tight">
                    {event.date.split(' ')[1].replace(',', '')}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors leading-snug">
                  {event.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{event.time}</p>
                <p className="text-xs text-gray-400">
                  <span aria-hidden="true">👤 </span>
                  {event.attendees} attending
                </p>
                <button
                  onClick={() => onEventRegister(event.id, event.title)}
                  className="mt-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus-visible:underline"
                >
                  Register →
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-4 w-full text-center text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none focus-visible:underline">
          View all events →
        </button>
      </div>

      {/* ── Community Statistics ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
          Community Stats
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <li key={stat.label} className="bg-white rounded-lg p-3 shadow-sm text-center">
              <span className="text-xl" role="img" aria-label={stat.label}>
                {stat.icon}
              </span>
              <p className="text-base font-extrabold text-gray-900 mt-1 leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
});

CommunitySidebar.displayName = 'CommunitySidebar';

export default CommunitySidebar;
