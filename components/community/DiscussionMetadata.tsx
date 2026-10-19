"use client";

import { cn } from "@/lib/utils";

/**
 * Props are loose fields rather than a whole `Discussion` so the component
 * can also describe saved items, replies or any other card that carries the
 * same metadata (#983).
 */
export interface DiscussionMetadataProps {
  /** ISO 8601 timestamp the discussion was posted at. */
  createdAt: string;
  /** Category id or label, rendered as a badge. */
  category: string;
  likeCount: number;
  replyCount: number;
  /** Optional view count; the counter is hidden when omitted. */
  viewCount?: number;
  /** Optional extra classes for layout flexibility. */
  className?: string;
}

const LIKE_PATH =
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z";

const REPLY_PATH =
  "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z";

const VIEW_PATH =
  "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z";

/**
 * A single counter inside the metadata list. The visible text is only the
 * number, so the `<dt>` carries the accessible name for screen readers.
 */
function MetadataStat({
  path,
  value,
  label,
}: {
  path: string;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <dt className="sr-only">{label}</dt>
      <dd className="flex items-center gap-1">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={path}
          />
        </svg>
        <span>{value}</span>
      </dd>
    </div>
  );
}

/**
 * Reusable metadata row for a discussion: when it was posted, its category and
 * its engagement counters (#983).
 *
 * Rendered as a description list so the label/value pairs are exposed to
 * assistive technology even though the icons and numbers are the only thing
 * on screen.
 */
export function DiscussionMetadata({
  createdAt,
  category,
  likeCount,
  replyCount,
  viewCount,
  className,
}: DiscussionMetadataProps) {
  const created = new Date(createdAt);
  const hasValidDate = !Number.isNaN(created.getTime());

  return (
    <dl
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]",
        className
      )}
    >
      {hasValidDate && (
        <div className="flex items-center gap-1">
          <dt className="sr-only">Posted</dt>
          <dd>
            <time dateTime={createdAt}>{created.toLocaleDateString()}</time>
          </dd>
        </div>
      )}

      <MetadataStat path={LIKE_PATH} value={likeCount} label="Likes" />
      <MetadataStat path={REPLY_PATH} value={replyCount} label="Replies" />

      {typeof viewCount === "number" && (
        <MetadataStat path={VIEW_PATH} value={viewCount} label="Views" />
      )}

      <div className="flex items-center">
        <dt className="sr-only">Category</dt>
        <dd className="rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs font-medium text-[var(--muted)]">
          {category}
        </dd>
      </div>
    </dl>
  );
}
