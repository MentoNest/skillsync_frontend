export type DiscussionSort = "trending" | "latest" | "most-replies" | "most-liked";

export interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  likeCount: number;
  replyCount: number;
  viewCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  lastReply?: Reply;
}

export interface Reply {
  id: string;
  discussionId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likeCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  discussionCount: number;
  icon?: string;
}

// #993: Single source of truth for community category filtering.
// Single-select UX (selectedCategory: string | null); helpers are
// multi-compatible so "multiple category selection can be supported
// where required" without a breaking API change.
export const COMMUNITY_CATEGORIES = [
  { id: "general", name: "General" },
  { id: "career", name: "Career" },
  { id: "technical", name: "Technical" },
  { id: "mentoring", name: "Mentoring" },
  { id: "announcements", name: "Announcements" },
] as const;

export type CommunityCategoryId = (typeof COMMUNITY_CATEGORIES)[number]["id"];

/**
 * Parse `?category=` query value(s) into a clean list of category ids.
 * Supports: single value ("technical"), comma-separated ("career,technical"),
 * and repeated params (?category=a&category=b). Empty/invalid entries dropped.
 */
export function parseCategoryParam(
  value: string | string[] | null | undefined
): string[] {
  if (!value) return [];
  const rawList = Array.isArray(value) ? value : [value];
  return rawList
    .flatMap((v) => String(v).split(","))
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Serialize selected categories back to a `?category=` query value.
 * Returns null when nothing selected (meaning "All").
 */
export function serializeCategoryParam(
  categories: string | string[] | null | undefined
): string | null {
  const parsed = parseCategoryParam(categories);
  return parsed.length > 0 ? parsed.join(",") : null;
}

export interface CommunityNotification {
  id: string;
  type: "reply" | "mention" | "category_update" | "event_reminder";
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  discussionId: string;
  reporterId: string;
  reason: string;
  status: "pending" | "reviewed" | "resolved";
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}
