"use client";

import { useState } from "react";
import Link from "next/link";
import type { Discussion } from "@/lib/community-types";
import { DiscussionActions } from "./DiscussionActions";
import { DiscussionComments } from "./DiscussionComments";
import { DiscussionMetadata } from "./DiscussionMetadata";
import { TrendingBadgeForDiscussion } from "./TrendingBadge";

// ─── Shared prop types ────────────────────────────────────────────────────────

export interface DiscussionCardProps {
  discussion: Discussion;
  /**
   * Renders a "Remove bookmark" control instead of the Save toggle.
   * Used by the saved-discussions page.
   */
  onRemoveBookmark?: (discussionId: string) => void;
  isRemovingBookmark?: boolean;
  /**
   * When true the avatar is loaded lazily (off-screen cards in long feeds).
   * Defaults to false so above-the-fold cards load eagerly.
   */
  lazyAvatar?: boolean;
}

// ─── Author avatar ────────────────────────────────────────────────────────────

interface AuthorAvatarProps {
  src?: string;
  name: string;
  lazy?: boolean;
}

function AuthorAvatar({ src, name, lazy = false }: AuthorAvatarProps) {
  const fallback = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  return (
    <img
      src={src || fallback}
      alt=""
      aria-hidden="true"
      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
      loading={lazy ? "lazy" : "eager"}
    />
  );
}

// ─── Author / status row ──────────────────────────────────────────────────────

interface AuthorRowProps {
  discussion: Pick<
    Discussion,
    | "authorName"
    | "isPinned"
    | "isLocked"
    | "likeCount"
    | "replyCount"
    | "viewCount"
    | "isTrending"
  >;
}

function AuthorRow({ discussion }: AuthorRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
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
      {discussion.isTrending && (
        <span role="status" aria-label="Trending discussion indicator">
          <TrendingBadgeForDiscussion discussion={discussion} />
        </span>
      )}
    </div>
  );
}

// ─── Shared card body ─────────────────────────────────────────────────────────

/**
 * Inner body shared by `DiscussionCard` and `MemoizedDiscussionCard`.
 * Renders: avatar · author row · linked title · content excerpt ·
 * metadata (timestamp, category, likes, replies) · action bar.
 *
 * The title is a `<Link>` by default; pass `linkTitle={false}` to render
 * plain text (useful in contexts where the whole card is already a link).
 */
export interface DiscussionCardBodyProps extends DiscussionCardProps {
  /** Wrap the title in a Next.js `<Link>`. Defaults to true. */
  linkTitle?: boolean;
}

export function DiscussionCardBody({
  discussion,
  onRemoveBookmark,
  isRemovingBookmark,
  lazyAvatar = false,
  linkTitle = true,
}: DiscussionCardBodyProps) {
  return (
    <div className="flex items-start gap-3">
      <AuthorAvatar
        src={discussion.authorAvatar}
        name={discussion.authorName}
        lazy={lazyAvatar}
      />

      <div className="min-w-0 flex-1">
        <AuthorRow discussion={discussion} />

        <h3
          id={`discussion-title-${discussion.id}`}
          className="mt-1 text-base font-semibold text-[var(--foreground)]"
        >
          {linkTitle ? (
            <Link
              href={`/community/discussions/${discussion.id}`}
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              {discussion.title}
            </Link>
          ) : (
            discussion.title
          )}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
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
  );
}

// ─── Full card (with inline comment toggle) ───────────────────────────────────

/**
 * Discussion card used in the main community feed.
 *
 * Wraps `DiscussionCardBody` in a semantic `<article>` and adds an inline
 * comment toggle so users can read and post comments without leaving the feed.
 *
 * For a lighter, memoized variant (virtualized lists) use `MemoizedDiscussionCard`.
 */
export function DiscussionCard({
  discussion,
  onRemoveBookmark,
  isRemovingBookmark,
  lazyAvatar = false,
}: DiscussionCardProps) {
  const [showComments, setShowComments] = useState(false);

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

      <div className="mt-3 flex items-center gap-3 border-t border-[var(--border)] pt-3">
        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          aria-expanded={showComments}
          aria-controls={`comments-${discussion.id}`}
          className="text-xs font-medium text-[var(--primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          {showComments
            ? "Hide comments"
            : `Comments${discussion.replyCount ? ` (${discussion.replyCount})` : ""}`}
        </button>
      </div>

      {showComments && (
        <div id={`comments-${discussion.id}`}>
          <DiscussionComments
            discussionId={discussion.id}
            locked={discussion.isLocked}
          />
        </div>
      )}
    </article>
  );
}
