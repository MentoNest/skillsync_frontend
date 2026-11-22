"use client";

import { useSyncExternalStore } from "react";
import type { DiscussionPost } from "../../components/community/communityData";
import {
  readCommunityState,
  subscribeCommunityState,
} from "./communityStorage";

const EMPTY_IDS: string[] = [];
const EMPTY_POSTS: DiscussionPost[] = [];

/** IDs of discussions the current user has liked. */
export function useLikedDiscussionIds(): string[] {
  return useSyncExternalStore(
    subscribeCommunityState,
    () => readCommunityState().likedIds,
    () => EMPTY_IDS,
  );
}

/** Bookmarked discussion snapshots used by the /community/saved page. */
export function useBookmarkedDiscussions(): DiscussionPost[] {
  return useSyncExternalStore(
    subscribeCommunityState,
    () => readCommunityState().bookmarked,
    () => EMPTY_POSTS,
  );
}

/** IDs of community categories followed by the current user. */
export function useFollowedCategoryIds(): string[] {
  return useSyncExternalStore(
    subscribeCommunityState,
    () => readCommunityState().followedCategoryIds,
    () => EMPTY_IDS,
  );
}
