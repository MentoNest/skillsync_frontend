"use client";

import { memo, useCallback } from "react";
import { DiscussionCard } from "./DiscussionCard";
import type { Discussion } from "@/lib/community-types";

interface LazyDiscussionListProps {
  discussions: Discussion[];
  onDiscussionClick: (id: string) => void;
}

export const LazyDiscussionList = memo(function LazyDiscussionList({
  discussions,
  onDiscussionClick,
}: LazyDiscussionListProps) {
  const handleClick = useCallback(
    (id: string) => {
      onDiscussionClick(id);
    },
    [onDiscussionClick]
  );

  return (
    <div className="space-y-4" role="feed" aria-label="Discussion feed">
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          onClick={() => handleClick(discussion.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(discussion.id);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View discussion: ${discussion.title}`}
          className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <DiscussionCard discussion={discussion} />
        </div>
      ))}
    </div>
  );
});
