'use client';

import { INDUSTRIES, type Mentor } from '../data/mockMentors';

interface IndustryFilterProps {
  /** All mentors available for filtering — used to compute counts. */
  mentors: Mentor[];
  /** Currently selected industry slugs (case-sensitive to INDUSTRIES). */
  selected: string[];
  /** Toggle an industry in or out of the selection. */
  onToggle: (industry: string) => void;
}

/**
 * Multi-select Industry filter (Issue #460).
 *
 * Renders a stack of labelled checkboxes — one per industry — with a count
 * chip next to each label so users can see selection pressure before they
 * commit. Multiple industries can be selected at once and matching uses
 * logical OR (a mentor with any selected industry matches).
 */
export default function IndustryFilter({
  mentors,
  selected,
  onToggle,
}: IndustryFilterProps) {
  // Counts are recomputed when the mentor list changes (i.e. when other
  // filters narrow the candidate pool and we want to surface that
  // "0 mentors in this industry" signal).
  const counts = new Map<string, number>();
  for (const mentor of mentors) {
    for (const industry of mentor.industries) {
      counts.set(industry, (counts.get(industry) ?? 0) + 1);
    }
  }

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="flex w-full items-center justify-between text-sm font-semibold text-gray-900 dark:text-white">
        <span>Industry</span>
        {selected.length > 0 ? (
          <span
            className="inline-flex items-center rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300"
            aria-label={`${selected.length} industries selected`}
          >
            {selected.length} selected
          </span>
        ) : null}
      </legend>

      <ul role="list" className="mt-3 space-y-1">
        {INDUSTRIES.map((industry) => {
          const count = counts.get(industry) ?? 0;
          const isSelected = selected.includes(industry);
          return (
            <li key={industry}>
              <label
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60 ${
                  isSelected
                    ? 'border-cyan-200 bg-cyan-50/60 dark:border-cyan-800/60 dark:bg-cyan-900/20'
                    : ''
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isSelected}
                    onChange={() => onToggle(industry)}
                    aria-label={`Filter by ${industry}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500 peer-focus-visible:ring-offset-1 ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500 text-white'
                        : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
                    }`}
                  >
                    {isSelected ? (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2 6.5l3 3 5-7"
                        />
                      </svg>
                    ) : null}
                  </span>
                  <span className="font-medium">{industry}</span>
                </span>
                <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500">
                  {count}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
