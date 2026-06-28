import { AvailabilityStatus } from '@/components/MentorAvailabilityBadge';

export type ExperienceLevel = 'Junior' | 'Mid-Level' | 'Senior' | 'Executive';

export type SortOption = 'top-rated' | 'price-asc' | 'price-desc' | 'most-reviewed';

export type PriceRangeId = 'any' | 'budget' | 'mid' | 'premium';

export interface Mentor {
  mentorId?: string;
  id?: string;
  name: string;
  role?: string;
  title?: string;
  headline?: string;
  company?: string;
  description?: string;
  bio?: string;
  avatarUrl?: string | null;
  rating?: number;
  reviewCount?: number;
  pricePerSession?: number;
  skills?: string[];
  industries?: string[];
  expertise?: string[];
  experienceLevel?: ExperienceLevel;
  availability?: AvailabilityStatus;
  yearsExperience?: number;
  isFeatured?: boolean;
  profileHref?: string;
  onBook?: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: ()_=> void;
}