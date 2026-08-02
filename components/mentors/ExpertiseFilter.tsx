"use client";

import { EXPERTISE_OPTIONS, type Expertise } from "./data";

interface ExpertiseFilterProps {
  selected?: readonly Expertise[];
  selectedExpertise?: readonly Expertise[];
  counts?: Record<Expertise, number>;
  onToggle?: (expertise: Expertise) => void;
  onToggleExpertise?: (expertise: Expertise) => void;
  onClear?: () => void;
}

function checkboxId(expertise: Expertise): string {
  return `expertise-${expertise.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default function ExpertiseFilter({
  selected,
  selectedExpertise,
  counts = {} as Record<Expertise, number>,
  onToggle,
  onToggleExpertise,
  onClear = () => {},
}: ExpertiseFilterProps) {
  const activeSelected = selectedExpertise ?? selected ?? [];
  const activeToggle = onToggleExpertise ?? onToggle ?? (() => {});
  const hasSelection = activeSelected.length > 0;

  return (
    <fieldset className="border-0 p-0 m-0">
      <div className="flex items-center justify-between mb-3">
        <legend className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
          Expertise
        </legend>
        {hasSelection && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 focus:outline-none focus:underline"
            aria-label="Clear expertise filters"
          >
            Clear
          </button>
        )}
      </div>

      <ul role="list" className="flex flex-col gap-2.5">
        {EXPERTISE_OPTIONS.map((expertise) => {
          const id = checkboxId(expertise);
          const checked = activeSelected.includes(expertise);
          const count = counts[expertise] ?? 0;
          return (
            <li key={expertise}>
              <label
                htmlFor={id}
                className={`group flex items-center justify-between gap-3 cursor-pointer rounded-lg px-2 py-1.5 transition-colors ${
                  checked
                    ? "bg-cyan-50 dark:bg-cyan-900/25"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => activeToggle(expertise)}
                    className="h-4 w-4 shrink-0 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                  />
                  <span
                    className={`text-sm truncate ${
                      checked
                        ? "font-semibold text-cyan-700 dark:text-cyan-300"
                        : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                    }`}
                  >
                    {expertise}
                  </span>
                </span>
                <span
                  className={`shrink-0 text-xs font-medium tabular-nums rounded-full px-2 py-0.5 ${
                    checked
                      ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-800/60 dark:text-cyan-200"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                  aria-hidden="true"
                >
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
