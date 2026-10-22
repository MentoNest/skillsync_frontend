import type { Discussion, DiscussionSort } from "./community-types";
import { getEngagementScore } from "./community-trending";

/**
 * Discussion sorting (#994, #1249).
 *
 * Single source of truth for the sort options shown in the feed and the
 * comparator used by `GET /api/community/discussions`, so the selector and
 * the server can never drift apart.
 */

export interface DiscussionSortOption {
  value: DiscussionSort;
  label: string;
}

/** Options rendered by the community feed's sort selector. */
export const DISCUSSION_SORT_OPTIONS: readonly DiscussionSortOption[] = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
  { value: "most-replies", label: "Most Replies" },
  { value: "most-liked", label: "Most Liked" },
];

/** Fallback used for missing or unrecognised `?sort=` values. */
export const DEFAULT_DISCUSSION_SORT: DiscussionSort = "latest";

function isDiscussionSort(value: string): value is DiscussionSort {
  return DISCUSSION_SORT_OPTIONS.some((option) => option.value === value);
}

/**
 * Normalise an arbitrary query value into a supported sort.
 * Legacy `popular` is mapped to `most-liked` for backwards compatibility.
 */
export function normalizeDiscussionSort(
  value: string | null | undefined
): DiscussionSort {
  if (!value) return DEFAULT_DISCUSSION_SORT;
  if (value === "popular") return "most-liked";
  return isDiscussionSort(value) ? value : DEFAULT_DISCUSSION_SORT;
}

/** Timestamp in ms; invalid/missing dates sort as 0 instead of NaN. */
function toTimestamp(value: string | undefined): number {
  const timestamp = value ? Date.parse(value) : Number.NaN;
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function byId(a: Discussion, b: Discussion): number {
  return a.id.localeCompare(b.id);
}

/**
 * Deterministic comparators: primary metric first, then recency, then id.
 * The id tie-break keeps equal rankings stable across pagination requests.
 */
const COMPARATORS: Record<
  DiscussionSort,
  (a: Discussion, b: Discussion) => number
> = {
  latest: (a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt) || byId(a, b),
  "most-replies": (a, b) =>
    b.replyCount - a.replyCount ||
    toTimestamp(b.createdAt) - toTimestamp(a.createdAt) ||
    byId(a, b),
  "most-liked": (a, b) =>
    b.likeCount - a.likeCount ||
    toTimestamp(b.createdAt) - toTimestamp(a.createdAt) ||
    byId(a, b),
  trending: (a, b) =>
    getEngagementScore(b) - getEngagementScore(a) ||
    toTimestamp(b.updatedAt) - toTimestamp(a.updatedAt) ||
    byId(a, b),
};

/** Comparator for a sort mode, normalising invalid values to the default. */
export function compareDiscussions(
  sort: DiscussionSort
): (a: Discussion, b: Discussion) => number {
  return COMPARATORS[normalizeDiscussionSort(sort)];
}

/** Return a sorted copy; the input array is never mutated. */
export function sortDiscussions<T extends Discussion>(
  discussions: readonly T[],
  sort: DiscussionSort
): T[] {
  return [...discussions].sort(compareDiscussions(sort));
}
