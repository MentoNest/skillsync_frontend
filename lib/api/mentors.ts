// Client-side wrapper around the mentors API with error handling (#857).
import type { ExperienceLevel, Mentor, SortOption } from "@/types/mentor";

export interface MentorListingsResponse {
  mentors: Mentor[];
  total: number;
  page: number;
  limit: number;
}

export interface MentorListingFilters {
  expertise?: string;
  industry?: string;
  industries?: string[];
  experience?: ExperienceLevel | "";
  minRate?: number | "";
  maxRate?: number | "";
  search?: string;
  sortBy?: SortOption | "";
  page?: number;
}

export interface FetchOptions {
  signal?: AbortSignal;
}

function toQueryString(filters: MentorListingFilters): string {
  const params = new URLSearchParams();

  if (filters.expertise) params.set("expertise", filters.expertise);
  if (filters.industry) {
    params.set("industry", filters.industry);
  } else if (filters.industries && filters.industries.length > 0) {
    params.set("industry", filters.industries.join(","));
  }
  if (filters.experience) params.set("experience", filters.experience);
  if (typeof filters.minRate === "number" && !Number.isNaN(filters.minRate)) {
    params.set("minRate", String(filters.minRate));
  }
  if (typeof filters.maxRate === "number" && !Number.isNaN(filters.maxRate)) {
    params.set("maxRate", String(filters.maxRate));
  }
  if (filters.search) params.set("search", filters.search);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));

  return params.toString();
}

export async function getMentorListings(
  filters: MentorListingFilters = {},
  options: FetchOptions = {},
): Promise<MentorListingsResponse> {
  const query = toQueryString(filters);
  const response = await fetch(`/api/mentors${query ? `?${query}` : ""}`, {
    cache: "no-store",
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load mentors (${response.status})`);
  }

  return response.json() as Promise<MentorListingsResponse>;
}