"use client";

import { useEffect, useState } from "react";
import type { DiscussionSort } from "@/lib/community-types";

interface DiscussionFiltersProps {
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: DiscussionSort;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: DiscussionSort) => void;
}

const categories = [
  { id: null, name: "All" },
  { id: "general", name: "General" },
  { id: "career", name: "Career" },
  { id: "technical", name: "Technical" },
  { id: "mentoring", name: "Mentoring" },
  { id: "announcements", name: "Announcements" },
];

export function DiscussionFilters({
  selectedCategory,
  searchQuery,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}: DiscussionFiltersProps) {
  // Debounced search input (#992): local state updates instantly for
  // dynamic filtering feel, parent query updates after 300ms idle.
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchInput === searchQuery) return;
    const timeout = window.setTimeout(() => {
      onSearchChange(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Discussion categories">
          {categories.map((cat) => (
            <button
              key={cat.id || "all"}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                selectedCategory === cat.id
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--muted)] hover:bg-[var(--border)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as DiscussionSort)}
          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          aria-label="Sort discussions"
        >
          <option value="trending">Trending</option>
          <option value="latest">Latest</option>
          <option value="most-replies">Most Replies</option>
          <option value="most-liked">Most Liked</option>
        </select>
      </div>

      <div>
        <label htmlFor="discussion-search" className="sr-only">
          Search discussions
        </label>
        <input
          id="discussion-search"
          type="search"
          placeholder="Search by title, content, author, or category..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        />
      </div>
    </div>
  );
}
