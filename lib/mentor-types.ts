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
  expertise?: string[];
  experience?: string[];
  industry?: string[];
  minRating?: number;
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

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: number;
}