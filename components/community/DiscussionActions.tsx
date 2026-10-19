"use client";

import { useDiscussionBookmark } from "@/hooks/useDiscussionBookmark";
import { useUserFollow } from "@/hooks/useUserFollow";
import { FollowButton } from "./FollowButton";
import { LikeDiscussionButton } from "./LikeDiscussionButton";
import { ShareDiscussionButton } from "./ShareDiscussionButton";
import { ReportDiscussionButton } from "./ReportDiscussionButton";
import type { Discussion } from "@/lib/community-types";

interface DiscussionActionsProps {
  discussion: Discussion;
  /** Renders a "Remove bookmark" control, used by the saved page (#1013). */
  onRemoveBookmark?: (discussionId: string) => void;
  isRemovingBookmark?: boolean;
  /** Forwarded to the share button when the count changes. */
  onShareCountChange?: (shareCount: number) => void;
  showFollowAuthor?: boolean;
  showShare?: boolean;
}

/**
 * Social actions rendered under a discussion: bookmark it for `/community/saved`
 * (#1013), follow the author (#1015) and share the discussion (#1016).
 */
export function DiscussionActions({
  discussion,
  onRemoveBookmark,
  isRemovingBookmark,
  onShareCountChange,
  showFollowAuthor = true,
  showShare = true,
}: DiscussionActionsProps) {
  const {
    isFollowing,
    isPending: isFollowPending,
    error: followError,
    toggle: toggleFollow,
  } = useUserFollow(discussion.authorId, {
    initialIsFollowing: discussion.isAuthorFollowed,
  });

  const {
    isBookmarked,
    isPending: isBookmarkPending,
    error: bookmarkError,
    toggle: toggleBookmark,
  } = useDiscussionBookmark(discussion.id, {
    initialIsBookmarked: discussion.isBookmarked,
  });

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3">
      {showFollowAuthor && (
        <FollowButton
          targetName={discussion.authorName}
          isFollowing={isFollowing}
          isPending={isFollowPending}
          onToggle={toggleFollow}
        />
      )}

      {!onRemoveBookmark && (
        <button
          type="button"
          onClick={toggleBookmark}
          disabled={isBookmarkPending}
          aria-pressed={isBookmarked}
          aria-label={
            isBookmarked
              ? `Remove bookmark: ${discussion.title}`
              : `Bookmark discussion: ${discussion.title}`
          }
          className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60 ${
            isBookmarked
              ? "text-[var(--primary)] hover:bg-[var(--primary)]/10"
              : "text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
          }`}
        >
          <svg
            className="h-4 w-4"
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span>{isBookmarked ? "Saved" : "Save"}</span>
        </button>
      )}

      {onRemoveBookmark && (
        <button
          type="button"
          onClick={() => onRemoveBookmark(discussion.id)}
          disabled={isRemovingBookmark}
          aria-label={`Remove bookmark: ${discussion.title}`}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>{isRemovingBookmark ? "Removing…" : "Remove bookmark"}</span>
        </button>
      )}

      <LikeDiscussionButton
        discussionId={discussion.id}
        initialLiked={discussion.isLiked ?? false}
        initialCount={discussion.likeCount}
      />

      {showShare && (
        <ShareDiscussionButton
          discussion={discussion}
          shareCount={discussion.shareCount ?? 0}
          onShareCountChange={onShareCountChange}
          className="ml-auto"
        />
      )}

      <ReportDiscussionButton
        discussionId={discussion.id}
        discussionTitle={discussion.title}
      />

      {(followError || bookmarkError) && (
        <span role="alert" className="text-xs text-red-600">
          {followError || bookmarkError}
        </span>
      )}
    </div>
  );
}
