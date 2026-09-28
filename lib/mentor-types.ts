export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  bio: string;
  skills: string[];
  industry: string;
  experienceLevel: "junior" | "mid-level" | "senior" | "executive";
  rating: number;
  hourlyRate: number;
  availability: "available" | "busy" | "unavailable";
  sessions: number;
  profileHref?: string;
}

export interface MentorFilters {
  search?: string;
  expertise?: string[];
  experience?: string[];
  industry?: string[];
  minRating?: number;
  minHourlyRate?: number;
  maxHourlyRate?: number;
  availability?: string[];
  sortBy?: "rating" | "sessions" | "hourlyRate" | "relevance";
  sortOrder?: "asc" | "desc";
}

export interface MentorComparison {
  mentors: Mentor[];
  criteria: ComparisonCriteria[];
}

export interface ComparisonCriteria {
  key: keyof Mentor;
  label: string;
  type: "text" | "number" | "boolean" | "array";
}

export interface BookmarkState {
  mentorId: string;
  isBookmarked: boolean;
  timestamp: number;
}

/**
 * Single source of truth for mentor profile links (#59).
 * Every "View profile" CTA resolves through here so the route
 * `/mentors/[mentorId]` and the id it receives never drift apart.
 */
export function mentorProfileHref(mentorId: string): string {
  return `/mentors/${encodeURIComponent(mentorId)}`;
}

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: number;
}