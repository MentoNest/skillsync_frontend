"use client";

interface MentorSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function MentorSearchBar({ query, onQueryChange }: MentorSearchBarProps) {
  return (
    <form role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="mentor-search" className="block text-sm font-semibold text-slate-900">
        Search mentors
      </label>
      <p id="mentor-search-help" className="mt-1 text-sm text-slate-500">
        Search by name, skills, or professional headline.
      </p>
      <div className="relative mt-3">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="mentor-search"
          name="mentor-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try React, design, or a mentor name"
          aria-describedby="mentor-search-help"
          aria-controls="mentor-results"
          autoComplete="off"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>
    </form>
  );
}
