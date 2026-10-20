"use client";

import { memo } from "react";
import type { Discussion } from "@/lib/community-types";
import { DiscussionCardBody, type DiscussionCardProps } from "./DiscussionCard";

/**
 * Memoized discussion card for virtualized or performance-sensitive lists.
 *
 * Identical visual output to `DiscussionCard` but wrapped in `React.memo` and
 * without the inline comment toggle, keeping the render cost low when many
 * cards are on screen at once. Uses `lazyAvatar` by default so off-screen
 * images don't block the initial paint.
 */
export const MemoizedDiscussionCard = memo(function MemoizedDiscussionCard({
  discussion,
  onRemoveBookmark,
  isRemovingBookmark,
  lazyAvatar = true,
}: DiscussionCardProps) {
  return (
    <article
      className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 transition-shadow hover:shadow-md focus-within:shadow-md"
      aria-labelledby={`discussion-title-${discussion.id}`}
    >
      <DiscussionCardBody
        discussion={discussion}
        onRemoveBookmark={onRemoveBookmark}
        isRemovingBookmark={isRemovingBookmark}
        lazyAvatar={lazyAvatar}
      />
    </article>
  );
});
