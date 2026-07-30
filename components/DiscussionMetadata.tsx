import React from "react";

/**
 * DiscussionMetadata
 *
 * Reusable component that displays metadata for a discussion/thread:
 * posted time, category, like count, and reply count.
 *
 * Semantic markup:
 * - <time dateTime> for the posted timestamp (machine-readable + human-readable)
 * - <dl>/<dt>/<dd> to represent the label/value metadata pairs
 * - aria-labels for icon-only or ambiguous numeric content
 */

function formatRelativeTime(dateInput: Date | string | number): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(count);
}

interface DiscussionMetadataProps {
  postedAt: Date | string | number;
  category?: string;
  likeCount?: number;
  replyCount?: number;
  className?: string;
}

export default function DiscussionMetadata({
  postedAt,
  category,
  likeCount = 0,
  replyCount = 0,
  className = "",
}: DiscussionMetadataProps) {
  const date = postedAt instanceof Date ? postedAt : new Date(postedAt);
  const isoTime = isNaN(date.getTime()) ? undefined : date.toISOString();
  const displayTime = isNaN(date.getTime())
    ? String(postedAt)
    : formatRelativeTime(date);

  return (
    <dl
      className={`discussion-metadata ${className}`}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "0.875rem",
        color: "#555",
        margin: 0,
      }}
    >
      {/* Posted time */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <dt className="sr-only" style={visuallyHidden}>
          Posted
        </dt>
        <dd style={{ margin: 0 }}>
          <time dateTime={isoTime} title={isoTime}>
            {displayTime}
          </time>
        </dd>
      </div>

      {/* Category */}
      {category && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <dt className="sr-only" style={visuallyHidden}>
            Category
          </dt>
          <dd style={{ margin: 0 }}>
            <span
              className="discussion-metadata__category"
              style={{
                padding: "0.125rem 0.5rem",
                borderRadius: "9999px",
                background: "#eef1f5",
                fontWeight: 500,
              }}
            >
              {category}
            </span>
          </dd>
        </div>
      )}

      {/* Like count */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <dt className="sr-only" style={visuallyHidden}>
          Likes
        </dt>
        <dd style={{ margin: 0 }} aria-label={`${likeCount} likes`}>
          {formatCount(likeCount)} {likeCount === 1 ? "like" : "likes"}
        </dd>
      </div>

      {/* Reply count */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <dt className="sr-only" style={visuallyHidden}>
          Replies
        </dt>
        <dd style={{ margin: 0 }} aria-label={`${replyCount} replies`}>
          {formatCount(replyCount)} {replyCount === 1 ? "reply" : "replies"}
        </dd>
      </div>
    </dl>
  );
}

const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

/* Example usage:

<DiscussionMetadata
  postedAt="2026-07-28T10:00:00Z"
  category="General"
  likeCount={128}
  replyCount={34}
/>

*/
