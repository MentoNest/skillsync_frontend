// Keeps mentor discovery filters in sync with URL query parameters so that
// filters persist on refresh (e.g. /mentors?expertise=frontend) (#858).
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { ExperienceLevel, SortOption } from "@/types/mentor";

export interface MentorQueryFilters {
  expertise: string;
  industry: string;
  experience: ExperienceLevel | "";
  minRate: number | "";
  maxRate: number | "";
  sortBy: SortOption;
  search: string;
}

export const DEFAULT_MENTOR_FILTERS: MentorQueryFilters = {
  expertise: "",
  industry: "",
  experience: "",
  minRate: "",
  maxRate: "",
  sortBy: "popularity",
  search: "",
};

type FilterKey = keyof MentorQueryFilters;

export interface UseMentorQueryFiltersResult {
  filters: MentorQueryFilters;
  setFilter: (key: FilterKey, value: string | number | ExperienceLevel | SortOption) => void;
  clearFilters: () => void;
  activeFilterCount: number;
}

export function useMentorQueryFilters(): UseMentorQueryFiltersResult {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<MentorQueryFilters>(() => {
    const sortBy = searchParams.get("sortBy") as SortOption | null;
    const experience = searchParams.get("experience") as ExperienceLevel | null;
    const minRate = Number(searchParams.get("minRate"));
    const maxRate = Number(searchParams.get("maxRate"));

    return {
      expertise: searchParams.get("expertise") ?? "",
      industry: searchParams.get("industry") ?? "",
      experience:
        experience === "junior" || experience === "mid" || experience === "senior" || experience === "principal"
          ? experience
          : "",
      minRate: Number.isFinite(minRate) && searchParams.has("minRate") ? minRate : "",
      maxRate: Number.isFinite(maxRate) && searchParams.has("maxRate") ? maxRate : "",
      sortBy:
        sortBy === "rating" || sortBy === "price" || sortBy === "experience" || sortBy === "popularity"
          ? sortBy
          : DEFAULT_MENTOR_FILTERS.sortBy,
      search: searchParams.get("search") ?? "",
    };
  }, [searchParams]);

  const commit = useCallback(
    (next: MentorQueryFilters) => {
      const params = new URLSearchParams();

      if (next.expertise) params.set("expertise", next.expertise);
      if (next.industry) params.set("industry", next.industry);
      if (next.experience) params.set("experience", next.experience);
      if (typeof next.minRate === "number") params.set("minRate", String(next.minRate));
      if (typeof next.maxRate === "number") params.set("maxRate", String(next.maxRate));
      if (next.sortBy && next.sortBy !== DEFAULT_MENTOR_FILTERS.sortBy) {
        params.set("sortBy", next.sortBy);
      }
      if (next.search) params.set("search", next.search);

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const setFilter = useCallback(
    (key: FilterKey, value: string | number | ExperienceLevel | SortOption) => {
      commit({ ...filters, [key]: value });
    },
    [commit, filters],
  );

  const clearFilters = useCallback(() => {
    commit(DEFAULT_MENTOR_FILTERS);
  }, [commit]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.expertise) count += 1;
    if (filters.industry) count += 1;
    if (filters.experience) count += 1;
    if (typeof filters.minRate === "number") count += 1;
    if (typeof filters.maxRate === "number") count += 1;
    if (filters.search) count += 1;
    return count;
  }, [filters]);

  return { filters, setFilter, clearFilters, activeFilterCount };
}