import type { DiscussionPost } from "../../components/community/communityData";
import { COMMUNITY_CATEGORIES } from "../../components/community/communityData";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export type DiscussionSort = "trending" | "latest" | "my-posts";

export interface DiscussionQuery {
  page: number;
  pageSize: number;
  sort: DiscussionSort;
  category: string;
  search: string;
}

export interface DiscussionPage {
  discussions: DiscussionPost[];
  total: number;
  hasMore: boolean;
}

type JsonObject = Record<string, unknown>;

function normalizeCategory(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function matchesCategory(
  discussionCategory: string,
  selectedCategoryId: string
): boolean {
  if (selectedCategoryId === "all") return true;

  const selectedCategory = COMMUNITY_CATEGORIES.find(
    (category) =>
      category.id === selectedCategoryId || category.slug === selectedCategoryId
  );
  if (!selectedCategory) return true;

  const target = normalizeCategory(selectedCategory.name);
  const targetSlug = normalizeCategory(selectedCategory.slug);
  const discussion = normalizeCategory(discussionCategory);

  return (
    discussion === target ||
    discussion === targetSlug ||
    discussion.includes(target) ||
    target.includes(discussion)
  );
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function getNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getId(value: unknown): string | undefined {
  if (typeof value === "string" || typeof value === "number") return String(value);
  return undefined;
}

function getDiscussion(value: unknown): DiscussionPost {
  if (!isObject(value)) {
    throw new Error("The discussions response contains an invalid discussion.");
  }

  const authorValue = isObject(value.author) ? value.author : {};
  const categoryValue = isObject(value.category) ? value.category : {};
  const id = value.id ?? value._id;
  const title = getString(value.title);
  const content = getString(value.excerpt ?? value.content ?? value.body);
  if ((typeof id !== "string" && typeof id !== "number") || !title) {
    throw new Error("A discussion is missing its required id or title.");
  }

  const rawTags = value.tags;
  const tags = Array.isArray(rawTags)
    ? rawTags.filter((tag): tag is string => typeof tag === "string")
    : typeof rawTags === "string"
      ? rawTags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];
  const category = getString(
    categoryValue.name ??
      categoryValue.title ??
      categoryValue.label ??
      categoryValue.slug ??
      categoryValue.id,
    getString(value.category, "General Discussion")
  );
  const authorName = getString(
    authorValue.name,
    getString(
      authorValue.fullName,
      getString(
        authorValue.username,
        getString(value.authorName, getString(value.author, "Community member"))
      )
    )
  );
  const createdAt = getString(value.createdAt ?? value.created_at, "Recently");
  const authorId = getId(
    authorValue.id ??
      authorValue._id ??
      value.authorId ??
      value.author_id ??
      value.userId ??
      value.user_id
  );

  return {
    id: String(id),
    title,
    excerpt: content,
    category,
    author: {
      id: authorId,
      name: authorName,
      avatar: getString(
        authorValue.avatar,
        getString(
          authorValue.avatarUrl,
          getString(authorValue.avatar_url, getString(authorValue.profilePicture, ""))
        )
      ),
      role: getString(authorValue.role, "Community member"),
      isMentor: Boolean(authorValue.isMentor ?? authorValue.is_mentor),
    },
    createdAt,
    likesCount: getNumber(value.likesCount ?? value.likes_count ?? value.likes),
    commentsCount: getNumber(value.commentsCount ?? value.comments_count),
    viewsCount: getNumber(value.viewsCount ?? value.views_count),
    isPinned: Boolean(value.isPinned ?? value.is_pinned),
    tags,
  };
}

function getPayload(value: unknown): { items: unknown[]; metadata: JsonObject } {
  if (Array.isArray(value)) return { items: value, metadata: {} };
  if (!isObject(value)) {
    throw new Error("The discussions response has an unexpected format.");
  }

  const nested = isObject(value.data) ? value.data : value;
  const items = Array.isArray(value.discussions)
    ? value.discussions
    : Array.isArray(value.items)
      ? value.items
      : Array.isArray(value.results)
        ? value.results
        : Array.isArray(value.data)
          ? value.data
          : Array.isArray(nested.discussions)
            ? nested.discussions
            : Array.isArray(nested.items)
              ? nested.items
              : Array.isArray(nested.results)
                ? nested.results
                : null;

  if (!items) throw new Error("The discussions response did not include a discussion list.");

  const meta = isObject(value.meta) ? value.meta : {};
  const pagination = isObject(value.pagination)
    ? value.pagination
    : isObject(nested.pagination)
      ? nested.pagination
      : isObject(meta.pagination)
        ? meta.pagination
        : Object.keys(meta).length > 0
          ? meta
          : value;
  return { items, metadata: pagination };
}

function getAccessToken(): string | undefined {
  const storedSession = window.localStorage.getItem("skillsync.session");
  if (!storedSession) return undefined;

  let session: unknown;
  try {
    session = JSON.parse(storedSession);
  } catch {
    throw new Error("Your saved session is invalid. Please sign in again.");
  }
  if (!isObject(session) || typeof session.token !== "string") {
    throw new Error("Your saved session is invalid. Please sign in again.");
  }
  return session.token;
}

export function getCurrentUserId(): string | undefined {
  const storedSession = window.localStorage.getItem("skillsync.session");
  if (!storedSession) return undefined;

  let session: unknown;
  try {
    session = JSON.parse(storedSession);
  } catch {
    return undefined;
  }
  if (!isObject(session) || !isObject(session.user)) return undefined;

  return getId(session.user.id ?? session.user._id);
}

export async function deleteDiscussion(id: string): Promise<void> {
  const token = getAccessToken();
  if (!token) throw new Error("Please sign in to delete a discussion.");

  const baseUrl = API_URL.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/community/discussions/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = isObject(body) ? getString(body.message) : "";
    throw new Error(message || `Unable to delete discussion (${response.status}).`);
  }
}

export async function getDiscussions(
  query: DiscussionQuery,
  signal?: AbortSignal
): Promise<DiscussionPage> {
  const params = new URLSearchParams({
    page: String(query.page),
    limit: String(query.pageSize),
    sort: query.sort === "my-posts" ? "latest" : query.sort,
  });
  if (query.category !== "all") {
    const category = COMMUNITY_CATEGORIES.find(
      (item) => item.id === query.category || item.slug === query.category
    );
    params.set("category", category?.slug ?? query.category);
  }
  if (query.search.trim()) params.set("search", query.search.trim());

  const headers = new Headers();
  if (query.sort === "my-posts") {
    params.set("mine", "true");
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const baseUrl = API_URL.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/community/discussions?${params}`, {
    headers,
    signal,
  });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = isObject(body) ? getString(body.message) : "";
    throw new Error(message || `Unable to load discussions (${response.status}).`);
  }
  if (body === null) throw new Error("The discussions response was not valid JSON.");

  const { items, metadata } = getPayload(body);
  const mappedDiscussions = items.map(getDiscussion);
  const discussions =
    query.category === "all"
      ? mappedDiscussions
      : mappedDiscussions.filter((discussion) =>
          matchesCategory(discussion.category, query.category)
        );
  const totalValue = metadata.total ?? metadata.totalItems ?? metadata.count;
  const total = totalValue === undefined ? discussions.length : getNumber(totalValue);
  const totalPages = getNumber(metadata.totalPages);
  const hasMore =
    typeof metadata.hasMore === "boolean"
      ? metadata.hasMore
      : totalPages > 0
        ? query.page < totalPages
        : total > 0
          ? query.page * query.pageSize < total
          : discussions.length === query.pageSize;

  return { discussions, total, hasMore };
}
