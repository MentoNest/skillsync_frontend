"use client";

import type { FormEvent, ChangeEvent } from "react";

export function ResourceSearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onSearch?.(event.currentTarget.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch?.(String(new FormData(event.currentTarget).get("q") ?? ""));
  }

  return (
    <form role="search" aria-label="Search resources" onSubmit={handleSubmit} className="relative mx-auto w-full max-w-xl">
      <label htmlFor="resource-search" className="sr-only">Search resources</label>
      <svg aria-hidden="true" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id="resource-search"
        name="q"
        type="search"
        placeholder="Search resources..."
        onChange={handleChange}
        className="w-full rounded-full border border-gray-300 py-3 pl-10 pr-28 focus:border-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
}
