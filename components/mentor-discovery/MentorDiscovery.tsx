"use client";

import { useMemo, useState } from "react";
import MentorFilterSidebar from "./MentorFilterSidebar";
import MentorResultCard from "./MentorResultCard";
import {
  MOCK_MENTORS,
  createEmptyFilters,
  filterMentors,
  type MentorFilters,
} from "./mentorData";

export default function MentorDiscovery() {
  const [filters, setFilters] = useState<MentorFilters>(createEmptyFilters);
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => filterMentors(MOCK_MENTORS, filters, query),
    [filters, query]
  );

  const resetAll = () => {
    setFilters(createEmptyFilters());
    setQuery("");
  };

  return (
    <section aria-label="Mentor discovery" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Browse mentors</h2>
          <p className="mt-1 text-sm text-slate-600" aria-live="polite">
            {results.length} {results.length === 1 ? "mentor" : "mentors"} found
          </p>
        </div>
        <div className="w-full md:w-80">
          <label htmlFor="mentor-search" className="sr-only">
            Search mentors
          </label>
          <input
            id="mentor-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, skill or expertise"
            className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-700 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <MentorFilterSidebar
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(createEmptyFilters())}
          resultCount={results.length}
        />

        <div className="md:col-span-3">
          {results.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((mentor) => (
                <li key={mentor.id}>
                  <MentorResultCard mentor={mentor} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="font-medium text-slate-900">No mentors match those filters</p>
              <p className="mt-1 text-sm text-slate-600">
                Try removing a filter or searching for a different skill.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-4 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
