"use client";

import { useMemo, useState } from "react";
import MentorSearchBar from "./MentorSearchBar";
import { MENTORS, type Mentor } from "./mentors";

function matchesQuery(mentor: Mentor, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [mentor.name, mentor.headline, ...mentor.skills].some((value) =>
    value.toLowerCase().includes(normalizedQuery)
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function MentorDiscovery() {
  const [query, setQuery] = useState("");

  const filteredMentors = useMemo(
    () => MENTORS.filter((mentor) => matchesQuery(mentor, query)),
    [query]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 px-4 pb-10 pt-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-100">
            Mentor discovery
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Find the right mentor for your next step
          </h1>
          <p className="mt-3 max-w-2xl text-indigo-50">
            Browse experienced professionals and search by name, skills, or what they do.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
        <aside
          aria-labelledby="mentor-filters-heading"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24"
        >
          <h2 id="mentor-filters-heading" className="text-base font-semibold text-slate-900">
            Filters
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Filter controls are coming soon. Use search to narrow mentors by name, skills, or
            professional headline.
          </p>
        </aside>

        <section aria-labelledby="mentor-results-heading" className="min-w-0">
          <h2 id="mentor-results-heading" className="sr-only">
            Mentor results
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <MentorSearchBar query={query} onQueryChange={setQuery} />
          </div>

          <p className="mt-4 text-sm text-slate-600" role="status" aria-live="polite">
            {filteredMentors.length} {filteredMentors.length === 1 ? "mentor" : "mentors"} found
          </p>

          {filteredMentors.length > 0 ? (
            <ul id="mentor-results" className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredMentors.map((mentor) => (
                <li key={mentor.id}>
                  <article
                    aria-label={`Mentor profile for ${mentor.name}`}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white"
                      >
                        {initials(mentor.name)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-900">{mentor.name}</h3>
                        <p className="mt-0.5 text-sm font-medium text-indigo-600">
                          {mentor.headline}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{mentor.bio}</p>

                    <ul aria-label={`${mentor.name} skills`} className="mt-4 flex flex-wrap gap-2">
                      {mentor.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-sm">
                      <span
                        role="img"
                        aria-label={`Rated ${mentor.rating} out of 5`}
                        className="text-amber-600"
                      >
                        ★ {mentor.rating.toFixed(1)}
                      </span>
                      <span className="text-slate-500">{mentor.sessions} sessions</span>
                      <span className="font-semibold text-slate-900">${mentor.hourlyRate}/hr</span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div
              id="mentor-results"
              role="status"
              className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
            >
              <h3 className="text-lg font-semibold text-slate-900">No mentors found</h3>
              <p className="mt-2 text-sm text-slate-600">
                Try a different name, skill, or professional headline.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
