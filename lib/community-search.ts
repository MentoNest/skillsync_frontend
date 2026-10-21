import { COMMUNITY_CATEGORIES, type Discussion } from "./community-types";

/**
 * Fields a community discussion can be searched by (#1247).
 * `tags` is optional so callers can pass either a full `Discussion` or the
 * subset of fields the search actually needs.
 */
export type SearchableDiscussion = Pick<
  Discussion,
  "title" | "content" | "authorName" | "category"
> & {
  tags?: string[];
};

/** Keep user input bounded so a pathological query cannot bloat the matcher. */
export const MAX_SEARCH_QUERY_LENGTH = 200;

/**
 * Normalize a raw search query for matching: collapse whitespace, trim and
 * cap the length. Returns an empty string for blank input, which means
 * "no filtering" to the helpers below.
 */
export function normalizeSearchQuery(
  query: string | null | undefined
): string {
  if (!query) return "";

  return String(query)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SEARCH_QUERY_LENGTH);
}

/**
 * Human-readable label for a category id. Category ids and names are equal
 * today, but resolving through `COMMUNITY_CATEGORIES` keeps search working if
 * an id and its display name ever diverge.
 */
export function getCategoryDisplayName(categoryId: string): string {
  const category = COMMUNITY_CATEGORIES.find(
    (entry) => entry.id === categoryId
  );
  return category?.name ?? categoryId;
}

/**
 * Case-insensitive match across title, content, author and category (#1247).
 *
 * Multi-word queries are treated as an AND: every term must appear somewhere
 * in the discussion's searchable text. This lets "react hooks" match a title
 * about React and content mentioning hooks, without requiring the exact
 * phrase to be contiguous.
 */
export function matchesDiscussionSearch(
  discussion: SearchableDiscussion,
  query: string
): boolean {
  const normalized = normalizeSearchQuery(query).toLowerCase();
  if (!normalized) return true;

  const haystack = [
    discussion.title,
    discussion.content,
    discussion.authorName,
    discussion.category,
    getCategoryDisplayName(discussion.category),
    ...(discussion.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return normalized.split(" ").every((term) => haystack.includes(term));
}

/**
 * Filter a list of discussions with {@link matchesDiscussionSearch}.
 * Blank queries return the original list unchanged.
 */
export function filterDiscussionsBySearch<T extends SearchableDiscussion>(
  discussions: readonly T[],
  query: string
): T[] {
  const normalized = normalizeSearchQuery(query);
  if (!normalized) return [...discussions];

  return discussions.filter((discussion) =>
    matchesDiscussionSearch(discussion, normalized)
  );
}
