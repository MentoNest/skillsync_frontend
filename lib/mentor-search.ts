import { Mentor } from "@/lib/mentor-types";

export const MAX_SEARCH_LENGTH = 100;

export function normalizeSearchTerm(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace(/\s+/g, " ").trim().slice(0, MAX_SEARCH_LENGTH);
}

export function hasSearchTerm(filters: { search?: string }): boolean {
  return normalizeSearchTerm(filters.search).length > 0;
}

export function getSearchTerms(value: string | null | undefined): string[] {
  const normalized = normalizeSearchTerm(value).toLowerCase();
  return normalized.length === 0 ? [] : normalized.split(" ");
}

export function mentorMatchesSearch(
  mentor: Pick<Mentor, "name" | "headline" | "skills">,
  search: string | null | undefined
): boolean {
  const terms = getSearchTerms(search);
  if (terms.length === 0) return true;

  const haystack = [mentor.name, mentor.headline, ...mentor.skills]
    .join(" ")
    .toLowerCase();

  return terms.every((term) => haystack.includes(term));
}
