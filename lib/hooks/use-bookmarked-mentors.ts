// Persisted bookmark state for saving mentors to localStorage (#859).
"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "skillsync:bookmarked-mentors";

function readBookmarkedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is string => typeof entry === "string");
  } catch {
    return [];
  }
}

function writeBookmarkedIds(ids: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage failures (private mode / quota).
  }
}

export interface UseBookmarkedMentorsResult {
  bookmarkedIds: string[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;
}

export function useBookmarkedMentors(): UseBookmarkedMentorsResult {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Re-read persisted bookmarks after hydration to avoid SSR mismatches.
  useEffect(() => {
    setBookmarkedIds(readBookmarkedIds());
  }, []);

  // Keep state in sync when bookmarks change in another tab.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setBookmarkedIds(readBookmarkedIds());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarkedIds.includes(id), [bookmarkedIds]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((previous) => {
      const next = previous.includes(id)
        ? previous.filter((entry) => entry !== id)
        : [...previous, id];
      writeBookmarkedIds(next);
      return next;
    });
  }, []);

  return { bookmarkedIds, isBookmarked, toggleBookmark };
}