/**
 * Shared mentor types and vocabulary.
 *
 * This module is the single source of truth for mentor data (#1220). UI
 * components, API routes and helpers import from here instead of declaring
 * their own mentor interfaces, so the mentor model is described in exactly one
 * place and a change to it reaches every card, filter and profile view at once.
 */

/**
 * Experience levels a mentor can have.
 *
 * These are the values stored in `Mentor.experienceLevel`, persisted to the URL
 * by `useUrlFilters`, and matched by the mentor API. They are deliberately
 * *not* the Junior / Mid-Level / Senior / Executive set used by
 * `ExperienceLevelFilter`'s own default options — changing them would
 * invalidate every bookmarked filter URL and silently stop matching mentors.
 */
export const MENTOR_EXPERIENCE_LEVELS = [
  "junior",
  "mid",
  "senior",
  "lead",
  "principal",
] as const;

/** The experience levels a mentor can have. */
export type MentorExperienceLevel = (typeof MENTOR_EXPERIENCE_LEVELS)[number];

/** Availability states a mentor can be in. */
export const MENTOR_AVAILABILITIES = [
  "available",
  "busy",
  "unavailable",
] as const;

/** The availability states a mentor can be in. */
export type MentorAvailability = (typeof MENTOR_AVAILABILITIES)[number];

/** Sort keys the mentor list supports. */
export const MENTOR_SORT_KEYS = [
  "rating",
  "sessions",
  "hourlyRate",
  "relevance",
] as const;

/** The sort keys the mentor list supports. */
export type MentorSortBy = (typeof MENTOR_SORT_KEYS)[number];

/** Sort direction. */
export type MentorSortOrder = "asc" | "desc";

/** Display text for each experience level. */
export const MENTOR_EXPERIENCE_LABELS: Record<MentorExperienceLevel, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
  principal: "Principal",
};

/** Expertise categories mentors can be filtered by. */
export const MENTOR_EXPERTISE_OPTIONS = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Product Management",
  "UX Design",
  "QA Engineering",
] as const;

/**
 * Narrow an arbitrary string to an experience level.
 *
 * Used by controls that offer the app-wide levels but still receive plain
 * strings, so the value can be handed to `MentorFilters` without a cast.
 */
export function isMentorExperienceLevel(
  value: string
): value is MentorExperienceLevel {
  return (MENTOR_EXPERIENCE_LEVELS as readonly string[]).includes(value);
}

/** A mentor profile. */
export interface Mentor {
  /** Stable identifier, also used to build the mentor's profile link. */
  id: string;
  /** The mentor's display name. */
  name: string;
  /** Avatar image URL. Empty when the mentor has no photo. */
  avatar: string;
  /** Short professional summary shown under the name. */
  headline: string;
  /** Longer biography shown on the mentor profile. */
  bio: string;
  /** Specific tools and topics the mentor covers. */
  skills: string[];
  /**
   * Broad expertise categories this mentor covers (e.g. "Frontend", "DevOps")
   * — distinct from `skills`, which lists specific tools/topics. Used by the
   * expertise filter.
   */
  expertise?: string[];
  /** The industry the mentor works in. */
  industry: string;
  /** How senior the mentor is. */
  experienceLevel: MentorExperienceLevel;
  /** Average rating, out of 5. */
  rating: number;
  /** Session price, in dollars per hour. */
  hourlyRate: number;
  /** Whether the mentor is taking sessions right now. */
  availability: MentorAvailability;
  /** Number of sessions the mentor has completed. */
  sessions: number;
  /** Explicit profile link, when it differs from the one built from `id`. */
  profileHref?: string;
  /** Platform-curated spotlight. When true, cards/profile show a Featured badge. */
  featured?: boolean;
}

/** The filter state shared by the mentor list, the sidebar and the URL. */
export interface MentorFilters {
  /** Free-text search across name, headline and skills. */
  search?: string;
  /** Expertise categories to match. */
  expertise?: string[];
  /** Experience levels to match. */
  experience?: MentorExperienceLevel[];
  /** Industries to match. */
  industry?: string[];
  /** Lowest acceptable rating. */
  minRating?: number;
  /** Lowest acceptable hourly rate. */
  minHourlyRate?: number;
  /** Highest acceptable hourly rate. */
  maxHourlyRate?: number;
  /** Availability states to match. */
  availability?: MentorAvailability[];
  /** Which mentor field to sort by. */
  sortBy?: MentorSortBy;
  /** Sort direction. */
  sortOrder?: MentorSortOrder;
}

/** A mentor alongside the criteria it is compared on. */
export interface MentorComparison {
  mentors: Mentor[];
  criteria: ComparisonCriteria[];
}

/** One row of the mentor comparison table. */
export interface ComparisonCriteria {
  key: keyof Mentor;
  label: string;
  type: "text" | "number" | "boolean" | "array";
}

/** Whether a mentor is bookmarked, and since when. */
export interface BookmarkState {
  mentorId: string;
  isBookmarked: boolean;
  timestamp: number;
}

/** A page of mentors. */
export interface MentorPageResult {
  mentors: Mentor[];
  hasMore: boolean;
  nextOffset: number;
}
