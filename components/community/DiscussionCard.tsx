"use client";

import { useState } from "react";
import Link from "next/link";
import type { Discussion } from "@/lib/community-types";
import { DiscussionActions } from "./DiscussionActions";
import { DiscussionComments } from "./DiscussionComments";
import { DiscussionMetadata } from "./DiscussionMetadata";

interface DiscussionCardProps {
  discussion: Discussion;
  /** Passed through to `DiscussionActions` for the saved page (#1013). */
  onRemoveBookmark?: (discussionId: string) => void;
  isRemovingBookmark?: boolean;
}

export function DiscussionCard({
  discussion,
  onRemoveBookmark,
  isRemovingBookmark,
}: DiscussionCardProps) {
  const [showComments, setShowComments] = useState(false);
  return (
    <article
      className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 transition-shadow hover:shadow-md focus-within:shadow-md"
      aria-labelledby={`discussion-title-${discussion.id}`}
    >
      <div className="flex items-start gap-3">
        <img
          src={discussion.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${discussion.authorName}`}
          alt=""
          className="h-10 w-10 rounded-full"
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
            <Link
              href={`/community/discussions/${discussion.id}`}
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              {discussion.title}
            </Link>
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
          <div className="mt-3 flex items-center gap-3 border-t border-[var(--border)] pt-3">
        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          aria-expanded={showComments}
          className="text-xs font-medium text-[var(--primary)] hover:underline"
        >
          {showComments
            ? "Hide comments"
            : `Comments${discussion.replyCount ? ` (${discussion.replyCount})` : ""}`}
        </button>
      </div>
      {showComments && (
        <DiscussionComments
          discussionId={discussion.id}
          locked={discussion.isLocked}
        />
      )}
    </article>
  );
}
