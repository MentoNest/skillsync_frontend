"use client";

import { useEffect, useMemo, useState } from "react";
import { DISCUSSION_CATEGORIES, discussions } from "@/lib/discussions";
import type { DiscussionCategory } from "@/types/discussion";
import DiscussionCard from "@/components/community/DiscussionCard";
import DiscussionEmptyState from "@/components/community/DiscussionEmptyState";

type CategoryFilter = DiscussionCategory | "All";

const CommunityDiscussionSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const filteredDiscussions = useMemo(() => {
    return discussions.filter((discussion) => {
      const matchesCategory =
        selectedCategory === "All" ||
        discussion.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!debouncedSearch) return true;

      const searchableText =
        `${discussion.title} ${discussion.content} ${discussion.author} ${discussion.category}`.toLowerCase();
      return searchableText.includes(debouncedSearch);
    });
  }, [debouncedSearch, selectedCategory]);

  const clearFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    setSelectedCategory("All");
  };

  const hasActiveFilters =
    searchInput.trim() !== "" || selectedCategory !== "All";

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <label className="mx-auto mb-6 block max-w-xl">
          <span className="sr-only">Search community discussions</span>
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by title, content, author, or category"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </label>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {(["All", ...DISCUSSION_CATEGORIES] as CategoryFilter[]).map(
            (category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 ${
                    isActive
                      ? "bg-primary-700 text-white hover:bg-primary-800"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              );
            },
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-500 underline hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredDiscussions.length === 0 ? (
          <DiscussionEmptyState onReset={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredDiscussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityDiscussionSearch;
