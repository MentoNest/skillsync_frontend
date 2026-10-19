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
  },
};
