import type { DiscussionPost } from "../../components/community/communityData";
import { getCurrentUserId } from "./discussionsApi";

/**
 * Local persistence for Community interactions (#1458, #1459, #1461).
 * State is namespaced by the signed-in user so bookmarks, likes and followed
 * categories survive refreshes and never leak between accounts.
 */
export interface CommunityInteractionState {
  likedIds: string[];
  bookmarked: DiscussionPost[];
  followedCategoryIds: string[];
}

export const COMMUNITY_CHANGE_EVENT = "skillsync:community-change";

const GUEST_STATE: CommunityInteractionState = {
  likedIds: [],
  bookmarked: [],
  followedCategoryIds: [],
};

const cache = new Map<string, { raw: string; value: CommunityInteractionState }>();

function storageKey(): string {
  if (typeof window === "undefined") return "skillsync.community.v1.guest";
  return `skillsync.community.v1.${getCurrentUserId() ?? "guest"}`;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isDiscussionPost(value: unknown): value is DiscussionPost {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as DiscussionPost).id === "string" &&
    typeof (value as DiscussionPost).title === "string"
  );
}

function normalizeState(value: unknown): CommunityInteractionState {
  if (typeof value !== "object" || value === null) return GUEST_STATE;
  const candidate = value as Partial<CommunityInteractionState>;
  return {
    likedIds: isStringArray(candidate.likedIds) ? candidate.likedIds : [],
    bookmarked: Array.isArray(candidate.bookmarked)
      ? candidate.bookmarked.filter(isDiscussionPost)
      : [],
    followedCategoryIds: isStringArray(candidate.followedCategoryIds)
      ? candidate.followedCategoryIds
      : [],
  };
}

/** Returns a referentially stable snapshot for use with useSyncExternalStore. */
export function readCommunityState(): CommunityInteractionState {
  if (typeof window === "undefined") return GUEST_STATE;

  const key = storageKey();
  const raw = window.localStorage.getItem(key) ?? "";
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value;

  let parsed: unknown = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
  }
  const value = normalizeState(parsed);
  cache.set(key, { raw, value });
  return value;
}

/** Applies a pure update, persists it and notifies every mounted subscriber. */
export function updateCommunityState(
  update: (current: CommunityInteractionState) => CommunityInteractionState,
): CommunityInteractionState {
  if (typeof window === "undefined") return GUEST_STATE;

  const key = storageKey();
  const next = update(readCommunityState());
  const raw = JSON.stringify(next);
  window.localStorage.setItem(key, raw);
  cache.set(key, { raw, value: next });
  window.dispatchEvent(new Event(COMMUNITY_CHANGE_EVENT));
  return next;
}

/** Cross-component and cross-tab invalidation. */
export function subscribeCommunityState(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(COMMUNITY_CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(COMMUNITY_CHANGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}
