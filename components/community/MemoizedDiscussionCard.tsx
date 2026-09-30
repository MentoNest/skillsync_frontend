"use client";

import { memo } from "react";
import type { Discussion } from "@/lib/community-types";
import { DiscussionActions } from "./DiscussionActions";
import { DiscussionMetadata } from "./DiscussionMetadata";

interface MemoizedDiscussionCardProps {
  discussion: Discussion;
  /** Passed through to `DiscussionActions` for the saved page (#1013). */
  onRemoveBookmark?: (discussionId: string) => void;
  isRemovingBookmark?: boolean;
}

export const MemoizedDiscussionCard = memo(function MemoizedDiscussionCard({
  discussion,
  onRemoveBookmark,
  isRemovingBookmark,
}: MemoizedDiscussionCardProps) {
  return (
    <article
      className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 transition-shadow hover:shadow-md focus-within:shadow-md"
      aria-labelledby={`discussion-title-${discussion.id}`}
    >
      <div className="flex items-start gap-3">
        <img
          src={
            discussion.authorAvatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${discussion.authorName}`
          }
          alt=""
          className="h-10 w-10 rounded-full"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              {discussion.authorName}
            </span>
            {discussion.isPinned && (
              <span className="rounded bg-[var(--primary)]/10 px-1.5 py-0.5 text-xs font-medium text-[var(--primary)]">
                Pinned
              </span>
            )}
            {discussion.isLocked && (
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                Locked
              </span>
            )}
          </div>
          <h3
            id={`discussion-title-${discussion.id}`}
            className="mt-1 text-base font-semibold text-[var(--foreground)]"
          >
            {discussion.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
            {discussion.content}
          </p>
          <DiscussionMetadata
            createdAt={discussion.createdAt}
            category={discussion.category}
            likeCount={discussion.likeCount}
            replyCount={discussion.replyCount}
            viewCount={discussion.viewCount}
            className="mt-3"
          />

          <DiscussionActions
            discussion={discussion}
            onRemoveBookmark={onRemoveBookmark}
            isRemovingBookmark={isRemovingBookmark}
          />
        </div>
      </div>
    </article>
  );
});
