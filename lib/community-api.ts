import type {
  CommunityCategoryId,
  CommunityMember,
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
  ) {
    super(message);
    this.name = "CommunityApiError";
  }
}

function viewerHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return {};
    const user = JSON.parse(stored) as { id?: string };
    return user?.id ? { "x-user-id": user.id } : {};
  } catch {
    return {};
  }
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

export const communityApi = {
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
};
