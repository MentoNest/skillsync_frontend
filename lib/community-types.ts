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
  /** Number of times the discussion has been shared (#1016). */
  shareCount?: number;
  /** Whether the signed-in user has bookmarked the discussion (#1013). */
  isBookmarked?: boolean;
  /** Whether the signed-in user follows the author (#1015). */
  isAuthorFollowed?: boolean;
  /** Whether the signed-in user has liked the discussion (#1011). */
  isLiked?: boolean;
  /** When the signed-in user bookmarked the discussion (#1013). */
  savedAt?: string;
}

/** A discussion enriched with viewer-specific state (bookmark/follow). */
export interface SavedDiscussion extends Discussion {
  savedAt: string;
}

/** A community member that can be followed (#1015). */
export interface CommunityMember {
  id: string;
  name: string;
  avatar?: string;
  headline?: string;
  followerCount: number;
  discussionCount: number;
  isFollowing: boolean;
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
  /** Parent comment id when this is a threaded reply (#1010). */
  parentId?: string | null;
}

/** Comment on a discussion; supports nested replies (#1008–#1010). */
export interface Comment {
  id: string;
  discussionId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likeCount: number;
  createdAt: string;
  /** Null for top-level comments. */
  parentId: string | null;
  /** Nested replies (populated by API when building the tree). */
  replies?: Comment[];
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

/** Canonical list of category ids (single source of truth for #993/#1014). */
export const COMMUNITY_CATEGORY_IDS = COMMUNITY_CATEGORIES.map(
  (category) => category.id
) as unknown as readonly CommunityCategoryId[];

/**
 * Narrowing helper for category ids used by the follow endpoints (#1014).
 * Unknown ids are rejected so the API can answer with 404 instead of
 * creating follow state for a category that does not exist.
 */
export function isCommunityCategoryId(
  value: unknown
): value is CommunityCategoryId {
  return (
    typeof value === "string" &&
    (COMMUNITY_CATEGORY_IDS as readonly string[]).includes(value)
  );
}

/**
 * Canonical in-app path of a discussion, used to build share links (#1016)
 * and notification deep links. Falls back to the id-only path when the
 * discussion has no category.
 */
export function buildDiscussionPath(
  discussion: Pick<Discussion, "id" | "category">
): string {
  // Canonical detail route (#1007)
  return `/community/discussions/${discussion.id}`;
}

/** An event shown in the community sidebar's upcoming events widget (#988). */
export interface CommunityEvent {
  id: string;
  title: string;
  /** Member or team hosting the event. */
  host: string;
  /** ISO 8601 timestamp the event starts at. */
  startsAt: string;
  /** ISO 8601 timestamp the event ends at; the end time is hidden without it. */
  endsAt?: string;
  /** Members who have already registered. */
  registrationCount: number;
  /** Whether the viewer already has a spot (#988). */
  isRegistered?: boolean;
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
