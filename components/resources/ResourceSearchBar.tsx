"use client";

import { useId } from "react";

interface ResourceSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Accessible name for the input. Visually hidden. */
  label?: string;
  className?: string;
}

/**
 * Controlled search input. The parent owns the query, so the same bar can drive
 * any list. Full width on mobile, capped on larger screens.
 */
export default function ResourceSearchBar({
  value,
  onChange,
  placeholder = "Search guides, tracks, and tools…",
  label = "Search resources",
  className = "",
}: ResourceSearchBarProps) {
  const inputId = useId();

  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className={`w-full sm:max-w-md lg:max-w-xl ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </span>
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="block w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
    </form>
  );
}
