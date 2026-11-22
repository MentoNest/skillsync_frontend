import type { DiscussionPost } from "../../components/community/communityData";
import { readCommunityState, updateCommunityState } from "./communityStorage";
import {
  setCategoryFollow,
  setDiscussionBookmark,
  setDiscussionLike,
} from "./discussionsApi";

function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

/** Flip local like state immediately; returns the new liked value. */
export function toggleDiscussionLike(id: string): boolean {
  const wasLiked = readCommunityState().likedIds.includes(id);
  updateCommunityState((state) => ({
    ...state,
    likedIds: toggleId(state.likedIds, id),
  }));
  return !wasLiked;
}

/** Optimistic like toggle with API persistence and rollback on failure. */
export async function likeDiscussionWithPersistence(id: string): Promise<void> {
  const liked = toggleDiscussionLike(id);
  try {
    await setDiscussionLike(id, liked);
  } catch (error) {
    toggleDiscussionLike(id);
    throw error;
  }
}

/** Flip local bookmark state and keep a snapshot for the saved page. */
export function toggleDiscussionBookmark(post: DiscussionPost): boolean {
  const wasBookmarked = readCommunityState().bookmarked.some(
    (item) => item.id === post.id
  );
  updateCommunityState((state) => ({
    ...state,
    bookmarked: wasBookmarked
      ? state.bookmarked.filter((item) => item.id !== post.id)
      : [...state.bookmarked, { ...post }],
  }));
  return !wasBookmarked;
}

export async function bookmarkDiscussionWithPersistence(
  post: DiscussionPost
): Promise<void> {
  const bookmarked = toggleDiscussionBookmark(post);
  try {
    await setDiscussionBookmark(post.id, bookmarked);
  } catch (error) {
    toggleDiscussionBookmark(post);
    throw error;
  }
}

/** Merge API-provided saved discussions into the local snapshots by id. */
export function mergeBookmarkedDiscussions(posts: DiscussionPost[]): void {
  if (posts.length === 0) return;
  updateCommunityState((state) => {
    const existing = new Set(state.bookmarked.map((post) => post.id));
    const additions = posts.filter((post) => !existing.has(post.id));
    if (additions.length === 0) return state;
    return { ...state, bookmarked: [...state.bookmarked, ...additions] };
  });
}

export function removeBookmarkedDiscussion(id: string): void {
  updateCommunityState((state) => ({
    ...state,
    bookmarked: state.bookmarked.filter((item) => item.id !== id),
  }));
}

export async function removeBookmarkedDiscussionWithPersistence(
  id: string
): Promise<void> {
  const removed = readCommunityState().bookmarked.find((item) => item.id === id);
  removeBookmarkedDiscussion(id);
  try {
    await setDiscussionBookmark(id, false);
  } catch (error) {
    if (removed) {
      updateCommunityState((state) => ({
        ...state,
        bookmarked: [...state.bookmarked, removed],
      }));
    }
    throw error;
  }
}

/** Flip followed state for a category; returns the new value. */
export function toggleCategoryFollow(categoryId: string): boolean {
  const wasFollowed = readCommunityState().followedCategoryIds.includes(categoryId);
  updateCommunityState((state) => ({
    ...state,
    followedCategoryIds: toggleId(state.followedCategoryIds, categoryId),
  }));
  return !wasFollowed;
}

export async function followCategoryWithPersistence(
  categoryId: string
): Promise<void> {
  const followed = toggleCategoryFollow(categoryId);
  try {
    await setCategoryFollow(categoryId, followed);
  } catch (error) {
    toggleCategoryFollow(categoryId);
    throw error;
  }
}
