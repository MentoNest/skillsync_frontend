import type { Discussion, DiscussionSort } from "./community-types";

/**
 * Browser client for the community discussion feed.
 *
 * Mirrors the `mentorApi` pattern in `lib/api.ts`: the API base comes from
 * `NEXT_PUBLIC_API_URL` so the feed can talk to the real backend
 * (`GET /community/discussions`). When the variable is unset we fall back to
 * the same-origin `/api` prefix used by the app's route handlers, which keeps
 * local development working out of the box.
 */
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/+$/, "");
import type {
  Comment,
  CommunityCategoryId,
  CommunityMember,
  Discussion,
  Report,
  SavedDiscussion,
} from "./community-types";
import type { ShareMethod } from "./share";

/**
 * Browser client for the community social endpoints (#1013, #1014, #1015,
 * #1016). Mirrors the `mentorApi` pattern in `lib/api.ts` and forwards the
 * signed-in user id so the API can scope saved/followed state.
 */

const COMMUNITY_API_BASE = "/api/community";

/** Storage key written by `AuthProvider`; kept in sync with that component. */
const AUTH_STORAGE_KEY = "skillsync-user";

export class CommunityApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "CommunityApiError";
  }
}

export interface DiscussionQuery {
  page?: number;
  limit?: number;
  sort?: DiscussionSort;
  category?: string | null;
  search?: string;
}

export interface DiscussionsResult {
  discussions: Discussion[];
  hasMore: boolean;
  total?: number;
  page: number;
}

interface RawDiscussionsResponse {
  discussions?: unknown;
  hasMore?: unknown;
  total?: unknown;
  page?: unknown;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new CommunityApiError(
      errorData.error ||
        errorData.message ||
        `Failed to load discussions (HTTP ${response.status})`,
      response.status,
      errorData.code
    );
  }
  return response.json() as Promise<T>;
}

function buildDiscussionsUrl({
  page = 1,
  limit = 10,
  sort,
  category,
  search,
}: DiscussionQuery): string {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (sort) params.set("sort", sort);
  if (category) params.set("category", category);
  if (search) params.set("q", search);

  return `${API_BASE}/community/discussions?${params.toString()}`;
}

/**
 * Normalize the backend payload so a partial/misshaped response cannot crash
 * the feed. `hasMore` is derived from `total` when the backend omits it.
 */
function normalizeDiscussions(
  data: RawDiscussionsResponse,
  query: DiscussionQuery
): DiscussionsResult {
  const discussions = Array.isArray(data.discussions)
    ? (data.discussions as Discussion[])
    : [];
  const page =
    typeof data.page === "number" ? data.page : query.page ?? 1;
  const limit = query.limit ?? 10;
  const total = typeof data.total === "number" ? data.total : undefined;
  const hasMore =
    typeof data.hasMore === "boolean"
      ? data.hasMore
      : total !== undefined
        ? page * limit < total
        : false;

  return { discussions, hasMore, total, page };
}

export const communityApi = {
  /**
   * Fetch a page of discussions for the active filters/sorting.
   * Pass an `AbortSignal` to cancel superseded requests.
   */
  async getDiscussions(
    query: DiscussionQuery = {},
    signal?: AbortSignal
  ): Promise<DiscussionsResult> {
    const response = await fetch(buildDiscussionsUrl(query), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Feed data changes often; never serve a stale page from the cache.
      cache: "no-store",
      signal,
    });

    const data = await handleResponse<RawDiscussionsResponse>(response);
    return normalizeDiscussions(data, query);
/** The signed-in user persisted by `AuthProvider`, or null when unavailable. */
function storedAuthUser(): { id?: string; name?: string } | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as { id?: string; name?: string };
  } catch {
    return null;
  }
}

function viewerHeaders(): Record<string, string> {
  const user = storedAuthUser();
  return user?.id ? { "x-user-id": user.id } : {};
}

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${COMMUNITY_API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...viewerHeaders(),
      ...(init.headers as Record<string, string> | undefined),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new CommunityApiError(
      errorData.error || `HTTP error! status: ${response.status}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export interface CreateDiscussionInput {
  title: string;
  content: string;
  category: string;
  tags?: string[];
  authorName?: string;
}

export const communityApi = {
  /* Discussion feed (#995) */
  async getDiscussions(query: DiscussionQuery = {}): Promise<DiscussionPage> {
    const params = new URLSearchParams();
    params.set("page", String(query.page ?? 1));
    params.set("limit", String(query.limit ?? 10));
    if (query.sort) params.set("sort", query.sort);
    if (query.category) params.set("category", query.category);
    if (query.search) params.set("q", query.search);

    return request<DiscussionPage>(`/discussions?${params.toString()}`);
  },

  /* Sidebar overview: statistics + events (#990, #996) */
  async getCommunityOverview(): Promise<CommunityOverview> {
    return request<CommunityOverview>("/overview");
  /* Discussion creation (#1004) */
  async createDiscussion(input: CreateDiscussionInput): Promise<Discussion> {
    return request("/discussions", {
      method: "POST",
      body: JSON.stringify({
        title: input.title,
        content: input.content,
        category: input.category,
        tags: input.tags ?? [],
        // Fall back to the signed-in user so callers don't need auth wiring.
        authorName: input.authorName?.trim() || storedAuthUser()?.name?.trim(),
      }),
    });
  },

  /* Bookmarks (#1013) */
  async getSavedDiscussions(): Promise<{
    discussions: SavedDiscussion[];
    total: number;
  }> {
    return request("/discussions/saved");
  },

  async getBookmarkState(
    discussionId: string
  ): Promise<{ discussionId: string; isBookmarked: boolean }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/bookmark`);
  },

  async bookmarkDiscussion(discussionId: string): Promise<{
    discussionId: string;
    isBookmarked: boolean;
    savedAt: string;
  }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/bookmark`, {
      method: "POST",
    });
  },

  async removeDiscussionBookmark(
    discussionId: string
  ): Promise<{ discussionId: string; isBookmarked: boolean }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/bookmark`, {
      method: "DELETE",
    });
  },

  /* Shares (#1016) */
  async shareDiscussion(
    discussionId: string,
    method: Exclude<ShareMethod, "manual" | "cancelled"> = "clipboard"
  ): Promise<{
    discussionId: string;
    title: string;
    url: string;
    shareCount: number;
  }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/share`, {
      method: "POST",
      body: JSON.stringify({ method }),
    });
  },

  /* User follows (#1015) */
  async getUserFollowState(userId: string): Promise<{
    userId: string;
    isFollowing: boolean;
    followerCount: number;
  }> {
    return request(`/users/${encodeURIComponent(userId)}/follow`);
  },

  async followUser(userId: string): Promise<{ userId: string; isFollowing: boolean }> {
    return request(`/users/${encodeURIComponent(userId)}/follow`, {
      method: "POST",
    });
  },

  async unfollowUser(
    userId: string
  ): Promise<{ userId: string; isFollowing: boolean }> {
    return request(`/users/${encodeURIComponent(userId)}/follow`, {
      method: "DELETE",
    });
  },

  async getFollowedUsers(): Promise<{ users: CommunityMember[]; total: number }> {
    return request("/users/following");
  },

  /* Category follows (#1014) */
  async getFollowedCategories(): Promise<{
    categories: Array<{ id: CommunityCategoryId; name: string }>;
    categoryIds: CommunityCategoryId[];
    total: number;
  }> {
    return request("/categories/following");
  },

  async getCategoryFollowState(categoryId: string): Promise<{
    categoryId: string;
    isFollowing: boolean;
  }> {
    return request(`/categories/${encodeURIComponent(categoryId)}/follow`);
  },

  async followCategory(
    categoryId: string
  ): Promise<{ categoryId: string; isFollowing: boolean }> {
    return request(`/categories/${encodeURIComponent(categoryId)}/follow`, {
      method: "POST",
    });
  },

  async unfollowCategory(
    categoryId: string
  ): Promise<{ categoryId: string; isFollowing: boolean }> {
    return request(`/categories/${encodeURIComponent(categoryId)}/follow`, {
      method: "DELETE",
    });
  },

  /* Reports */
  async reportDiscussion(
    discussionId: string,
    reason: string
  ): Promise<Report> {
    return request("/reports", {
      method: "POST",
      body: JSON.stringify({ discussionId, reason }),
    });
  },

  /* Likes (#1011) */
  async getLikeState(
    discussionId: string
  ): Promise<{ discussionId: string; isLiked: boolean; likeCount: number }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/like`);
  },

  async toggleDiscussionLike(
    discussionId: string
  ): Promise<{ discussionId: string; isLiked: boolean; likeCount: number }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/like`, {
      method: "POST",
    });
  },

  /* Comments (#1008–#1010) */
  async getComments(
    discussionId: string
  ): Promise<{ discussionId: string; comments: Comment[]; total: number }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/comments`);
  },

  async addComment(
    discussionId: string,
    content: string,
    options?: { parentId?: string | null; authorName?: string }
  ): Promise<{ comment: Comment }> {
    return request(`/discussions/${encodeURIComponent(discussionId)}/comments`, {
      method: "POST",
      body: JSON.stringify({
        content,
        parentId: options?.parentId ?? null,
        authorName: options?.authorName,
      }),
    });
  },
};
