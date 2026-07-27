'use client';

import { useCallback } from 'react';
import type { Mentor } from './data';
import StarRating from '@/components/ui/StarRating';

interface MentorComparisonDrawerProps {
  mentors: Mentor[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const FIELDS: ReadonlyArray<{
  label: string;
  render: (m: Mentor) => string | number;
}> = [
  { label: 'Rating', render: (m) => `${m.rating.toFixed(1)} (${m.reviewCount.toLocaleString()} reviews)` },
  { label: 'Price / session', render: (m) => `$${m.pricePerSession}` },
  { label: 'Experience', render: (m) => `${m.experienceYears}+ yrs` },
  { label: 'Company', render: (m) => m.company },
  { label: 'Title', render: (m) => m.title },
  { label: 'Expertise', render: (m) => m.expertise.join(', ') },
  { label: 'Skills', render: (m) => m.skills.join(', ') },
  { label: 'Availability', render: (m) => m.availability },
];

export default function MentorComparisonDrawer({
  mentors,
  onRemove,
  onClose,
}: MentorComparisonDrawerProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  if (mentors.length === 0) return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label="Mentor comparison panel"
      aria-live="polite"
      onKeyDown={handleKeyDown}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl"
    >
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">
          Comparing {mentors.length} mentor{mentors.length > 1 ? 's' : ''}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:underline"
          aria-label="Close comparison panel"
        >
          Close ✕
        </button>
      </div>

      {/* Comparison table */}
      <div className="max-w-screen-xl mx-auto px-4 pb-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse" aria-label="Side-by-side mentor comparison">
          <thead>
            <tr>
              <th scope="col" className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2 pr-4 w-32">
                Field
              </th>
              {mentors.map((m) => (
                <th key={m.id} scope="col" className="text-left py-2 px-3 min-w-[160px]">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white leading-tight">{m.name}</p>
                      <p className="text-xs text-cyan-600 dark:text-cyan-400">{m.title}</p>
                      <StarRating rating={m.rating} size="sm" />
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(m.id)}
                      className="shrink-0 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                      aria-label={`Remove ${m.name} from comparison`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((field, i) => (
              <tr
                key={field.label}
                className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/40' : ''}
              >
                <td className="py-2 pr-4 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">
                  {field.label}
                </td>
                {mentors.map((m) => (
                  <td key={m.id} className="py-2 px-3 text-gray-900 dark:text-white">
                    {field.render(m)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
