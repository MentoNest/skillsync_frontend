"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import FeaturedLearningTracks from "./FeaturedLearningTracks";
import { ResourceItemCard } from "./ResourceCards";
import { QuickAccessGrid, ResourceSearchBar, ResourcesHero } from "./ResourcesSections";
import { ALL_RESOURCES } from "./resourceData";

const DEBOUNCE_MS = 200;

export default function ResourcesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  const paramQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(paramQuery);
  const [appliedQuery, setAppliedQuery] = useState(paramQuery);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(paramQuery);
      setAppliedQuery(paramQuery);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [paramQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = query.trim();
      setAppliedQuery(next);
      if (next === paramQuery) return;
      const params = new URLSearchParams(paramsString);
      if (next) params.set("q", next);
      else params.delete("q");
      const search = params.toString();
      router.replace(search ? `/resources?${search}` : "/resources", { scroll: false });
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query, paramQuery, paramsString, router]);

  const results = useMemo(() => {
    const needle = appliedQuery.trim().toLowerCase();
    if (!needle) return ALL_RESOURCES;
    return ALL_RESOURCES.filter((item) =>
      [item.title, item.category, item.description].some((field) => field.toLowerCase().includes(needle))
    );
  }, [appliedQuery]);

  return (
    <>
      <ResourcesHero />
      <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <ResourceSearchBar value={query} onChange={setQuery} />
        <section aria-labelledby="resource-results" aria-live="polite" className="w-full min-w-0">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="resource-results" className="break-words text-xl font-semibold sm:text-2xl">
              {appliedQuery ? `Results for “${appliedQuery}”` : "Explore all resources"}
            </h2>
            <p className="text-sm text-gray-500">{results.length} {results.length === 1 ? "resource" : "resources"}</p>
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => <ResourceItemCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div role="status" className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="break-words text-base font-medium text-gray-700">
                No resources found for “{appliedQuery}”.
              </p>
              <p className="mt-2 text-sm text-gray-500">Try a different keyword or browse the categories below.</p>
              <button type="button" onClick={() => setQuery("")}
                className="mt-4 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300">
                Clear search
              </button>
            </div>
          )}
        </section>
        <QuickAccessGrid />
      </div>
      <FeaturedLearningTracks />
    </>
  );
}
