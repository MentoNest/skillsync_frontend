"use client";

import { useCallback, useEffect, useState } from "react";
import type { Comment } from "@/lib/community-types";
import { communityApi } from "@/lib/community-api";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";

interface DiscussionCommentsProps {
  discussionId: string;
  /** When true, hides the add-comment form (e.g. locked threads). */
  locked?: boolean;
}

function insertReply(
  nodes: Comment[],
  parentId: string,
  reply: Comment,
): Comment[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      const replies = [...(node.replies ?? []), { ...reply, replies: [] }];
      return { ...node, replies };
    }
    if (node.replies?.length) {
      return {
        ...node,
        replies: insertReply(node.replies, parentId, reply),
      };
    }
    return node;
  });
}

/**
 * Comments section under a discussion (#1008–#1010).
 */
export function DiscussionComments({
  discussionId,
  locked = false,
}: DiscussionCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    communityApi
      .getComments(discussionId)
      .then((res) => {
        if (!cancelled) setComments(res.comments);
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(
            err instanceof Error ? err.message : "Failed to load comments",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [discussionId]);

  const handleRootSubmitted = useCallback((comment: Comment) => {
    setComments((prev) => [...prev, { ...comment, replies: [] }]);
  }, []);

  const handleReplyAdded = useCallback((parentId: string, reply: Comment) => {
    setComments((prev) => insertReply(prev, parentId, reply));
  }, []);

  return (
    <section
      className="mt-4 border-t border-[var(--border)] pt-4"
      aria-label="Comments"
    >
      <h4 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
        Comments
      </h4>

      {!locked && (
        <div className="mb-4">
          <CommentForm
            discussionId={discussionId}
            onSubmitted={handleRootSubmitted}
          />
        </div>
      )}

      {loading && (
        <p className="text-sm text-[var(--muted)]">Loading comments…</p>
      )}
      {loadError && (
        <p role="alert" className="text-sm text-red-600">
          {loadError}
        </p>
      )}
      {!loading && !loadError && comments.length === 0 && (
        <p className="rounded-lg border border-dashed border-[var(--border)] px-3 py-6 text-center text-sm text-[var(--muted)]">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}
      {!loading && comments.length > 0 && (
        <ul className="space-y-4">
          {comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              discussionId={discussionId}
              onReplyAdded={handleReplyAdded}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
