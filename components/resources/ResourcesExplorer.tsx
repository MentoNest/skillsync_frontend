"use client";

import { useDeferredValue, useMemo, useState } from "react";
import LearningTrackCard, { type LearningTrackCardProps } from "@/components/resources/LearningTrackCard";
import QuickAccessGrid, { QUICK_ACCESS_CATEGORIES } from "@/components/resources/QuickAccessGrid";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";

/** ⚠️ Placeholder tracks, like the rest of the resources content. */
const LEARNING_TRACKS: LearningTrackCardProps[] = [
  {
    title: "Career Growth Foundations",
    category: "Career",
    description: "Build momentum with the habits, systems, and conversations that compound across your first few roles.",
    lessonCount: 10,
    duration: "3h 50m",
    image: { src: "/resources/learning-track.svg", alt: "Career growth track illustration" },
    href: "/resources/tracks",
  },
  {
    title: "Interview Prep Sprint",
    category: "Engineering",
    description: "Prepare for coding and behavioral interviews with a realistic weekly plan and clear progress markers.",
    lessonCount: 18,
    duration: "6h 20m",
    image: { src: "/resources/article.svg", alt: "Interview prep track illustration" },
    href: "/resources/tracks",
  },
  {
    title: "Leadership for ICs",
    category: "Leadership",
    description: "Learn the shifts in communication, planning, and stakeholder work that come with senior roles.",
    lessonCount: 14,
    duration: "5h 10m",
    image: { src: "/resources/tool.svg", alt: "Leadership track illustration" },
    href: "/resources/tracks",
  },
];

function matches(query: string, ...fields: string[]) {
  return !query || fields.some((field) => field.toLowerCase().includes(query));
}

/**
 * The interactive part of `/resources`: a search bar that filters the Quick
 * Access categories and the learning tracks. Kept as a client island so the
 * rest of the page stays server-rendered.
 */
export default function ResourcesExplorer() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalized = deferredQuery.trim().toLowerCase();

  const categories = useMemo(
    () => QUICK_ACCESS_CATEGORIES.filter((item) => matches(normalized, item.title, item.description)),
    [normalized],
  );
  const tracks = useMemo(
    () =>
      LEARNING_TRACKS.filter((track) =>
        matches(normalized, track.title, track.category, track.description),
      ),
    [normalized],
  );
  const resultCount = categories.length + tracks.length;

  return (
    <section aria-label="Find resources" className="py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourceSearchBar value={query} onChange={setQuery} />

        <p className="sr-only" aria-live="polite">
          {normalized ? `${resultCount} ${resultCount === 1 ? "result" : "results"} found` : ""}
        </p>

        {categories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quick access
            </h2>
            <div className="mt-8">
              <QuickAccessGrid items={categories} />
            </div>
          </div>
        )}

        {tracks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Learning tracks
            </h2>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {tracks.map((track) => (
                <li key={track.title} className="flex">
                  <LearningTrackCard {...track} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {resultCount === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No resources match your search</p>
            <p className="mt-2 text-slate-600">Try a different keyword, like &ldquo;guide&rdquo; or &ldquo;career&rdquo;.</p>
          </div>
        )}
      </div>
    </section>
  );
}
