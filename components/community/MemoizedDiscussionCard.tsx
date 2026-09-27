"use client";

import { memo } from "react";
import type { Discussion } from "@/lib/community-types";

interface MemoizedDiscussionCardProps {
  discussion: Discussion;
}

export const MemoizedDiscussionCard = memo(function MemoizedDiscussionCard({
  discussion,
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
            <span className="text-xs text-[var(--muted)]">
              {new Date(discussion.createdAt).toLocaleDateString()}
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
          <div className="mt-3 flex items-center gap-4 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-1" aria-label={`${discussion.likeCount} likes`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {discussion.likeCount}
            </span>
            <span className="flex items-center gap-1" aria-label={`${discussion.replyCount} replies`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {discussion.replyCount}
            </span>
            <span className="flex items-center gap-1" aria-label={`${discussion.viewCount} views`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {discussion.viewCount}
            </span>
            <span className="rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs font-medium text-[var(--muted)]">
              {discussion.category}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});
