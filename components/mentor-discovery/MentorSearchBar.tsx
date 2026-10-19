"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { MAX_SEARCH_LENGTH, normalizeSearchTerm } from "@/lib/mentor-search";

export interface MentorSearchBarProps {
  /** Current query. The component never owns this state. */
  value: string;
  /** Called with the raw input value on every edit, including when cleared. */
  onChange: (value: string) => void;
  /** Accessible name for the input (default: "Search mentors") */
  label?: string;
  /** Visible placeholder text */
  placeholder?: string;
  /** Optional polite live-region message, e.g. a result count */
  status?: string;
  /** Custom className for the wrapping form */
  className?: string;
}

export function MentorSearchBar({
  value,
  onChange,
  label = "Search mentors",
  placeholder = "Search by name, skill, or headline...",
  status,
  className,
}: MentorSearchBarProps) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const hasQuery = normalizeSearchTerm(value).length > 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && hasQuery) {
      event.preventDefault();
      onChange("");
    }
  };

  return (
    <form
      role="search"
      aria-label="Mentor search"
      onSubmit={(event) => event.preventDefault()}
      className={cn("relative", className)}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>

      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>

      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={MAX_SEARCH_LENGTH}
        autoComplete="off"
        spellCheck={false}
        aria-describedby={hintId}
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 [&::-webkit-search-cancel-button]:hidden"
      />

      {hasQuery && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <span id={hintId} className="sr-only">
        Search matches mentor names, skills, and headlines.
      </span>

      {status && (
        <span role="status" aria-live="polite" className="sr-only">
          {status}
        </span>
      )}
    </form>
  );
}

export default MentorSearchBar;
