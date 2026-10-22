"use client";

import { useEffect, useState } from "react";
import { DISCUSSION_SORT_OPTIONS } from "@/lib/community-sort";
import type { DiscussionSort } from "@/lib/community-types";
import { COMMUNITY_CATEGORIES } from "@/lib/community-types";

interface DiscussionFiltersProps {
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: DiscussionSort;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: DiscussionSort) => void;
  showCategories?: boolean;
  /**
   * Enable multi-category selection (#1248).
   * When true, Ctrl/Cmd+click (or a second click on an already-selected pill)
   * toggles additional categories. The parent receives a comma-separated string
   * or null for "All", keeping the existing `string | null` API compatible.
   * Defaults to false (single-select).
   */
  multiSelect?: boolean;
}

const CATEGORY_OPTIONS: { id: string | null; name: string }[] = [
  { id: null, name: "All" },
  ...COMMUNITY_CATEGORIES.map((c) => ({ id: c.id as string, name: c.name })),
];

/**
 * Parse the selected category value into an array of active ids.
 * Supports the existing `string | null` contract and comma-separated
 * multi-values so the rest of the app needs no API changes (#1248).
 */
function parseSelected(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * Category filter pills + sort selector + debounced search for the community
 * feed (#992, #1248).
 *
 * Single-select by default; pass `multiSelect` to allow Ctrl/Cmd+click to
 * accumulate categories. The parent always receives `string | null` so no
 * upstream type changes are needed.
 */
export function DiscussionFilters({
  selectedCategory,
  searchQuery,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  showCategories = true,
  multiSelect = false,
}: DiscussionFiltersProps) {
  // Debounced search (#992): local state updates instantly, parent updates after 300 ms.
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (normalizeSearchQuery(searchInput) === searchQuery) return;
    const timeout = window.setTimeout(() => {
      onSearchChange(normalizeSearchQuery(searchInput));
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [onSearchChange, searchInput, searchQuery]);

  // Clearing is immediate rather than debounced, so the full feed is restored
  // without the 300 ms delay.
  function handleClearSearch() {
    setSearchInput("");
    onSearchChange("");
  }

  const activeIds = parseSelected(selectedCategory);

  function handleCategoryClick(
    id: string | null,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (!multiSelect || id === null) {
      // Single-select: clicking "All" or any pill in single mode resets.
      onCategoryChange(id);
      return;
    }

    // Multi-select: Ctrl/Cmd+click toggles the clicked category into/out of
    // the active set; plain click replaces the selection (#1248).
    if (event.ctrlKey || event.metaKey) {
      const next = activeIds.includes(id)
        ? activeIds.filter((a) => a !== id)
        : [...activeIds, id];
      onCategoryChange(next.length > 0 ? next.join(",") : null);
    } else {
      // Plain click: select only this category (or deselect if already sole).
      onCategoryChange(activeIds.length === 1 && activeIds[0] === id ? null : id);
    }
  }

  function isActive(id: string | null): boolean {
    if (id === null) return activeIds.length === 0;
    return activeIds.includes(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {showCategories ? (
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Discussion categories"
            aria-multiselectable={multiSelect}
          >
            {CATEGORY_OPTIONS.map((cat) => {
              const active = isActive(cat.id);
              return (
                <button
                  key={cat.id ?? "all"}
                  role="tab"
                  aria-selected={active}
                  onClick={(e) => handleCategoryClick(cat.id, e)}
                  title={
                    multiSelect && cat.id !== null
                      ? "Ctrl/Cmd+click to add to selection"
                      : undefined
                  }
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                    active
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--secondary)] text-[var(--muted)] hover:bg-[var(--border)]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        ) : null}

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as DiscussionSort)}
          className="max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          aria-label="Sort discussions"
        >
          {DISCUSSION_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <label htmlFor="discussion-search" className="sr-only">
          Search discussions
        </label>
        <input
          id="discussion-search"
          type="search"
          placeholder="Search by title, content, author, or category..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 pr-10 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        />
        {searchInput ? (
          <button
            type="button"
            onClick={handleClearSearch}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" d="m6 6 8 8M14 6l-8 8" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
