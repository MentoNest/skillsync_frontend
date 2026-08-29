// Mentor data types for strong typing throughout the UI (#856)

export interface MentorSkill {
  id: string;
  name: string;
}

export type ExperienceLevel = "junior" | "mid" | "senior" | "principal";

export type AvailabilityStatus = "available" | "busy" | "unavailable";

export type SortOption = "rating" | "price" | "experience" | "popularity";

export interface Mentor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  skills: MentorSkill[];
  industry?: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  experienceLevel: ExperienceLevel;
  availability: AvailabilityStatus;
  isFeatured: boolean;
  popularity: number;
}

export interface MentorFilters {
  search?: string;
  expertise?: string;
  industry?: string;
  industries?: string[];
  experienceLevel?: ExperienceLevel;
  minRate?: number;
  maxRate?: number;
  sortBy?: SortOption;
}

