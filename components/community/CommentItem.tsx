"use client";

import { useState } from "react";
import type { Comment } from "@/lib/community-types";
import { CommentForm } from "./CommentForm";

interface CommentItemProps {
  comment: Comment;
  discussionId: string;
  depth?: number;
  onReplyAdded: (parentId: string, reply: Comment) => void;
}

export function CommentItem({
  comment,
  discussionId,
  depth = 0,
  onReplyAdded,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const hasReplies = (comment.replies?.length ?? 0) > 0;
  const maxDepth = 4;
  const indent = Math.min(depth, maxDepth);

  return (
    <li
      className={`${indent > 0 ? "ml-3 border-l border-[var(--border)] pl-3 sm:ml-6 sm:pl-4" : ""}`}
    >
      <div className="flex gap-2 sm:gap-3">
        <img
          src={
            comment.authorAvatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(comment.authorName)}`
          }
          alt=""
          className="h-8 w-8 shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-[var(--foreground)]">
              {comment.authorName}
            </span>
            <time
              dateTime={comment.createdAt}
              className="text-xs text-[var(--muted)]"
            >
              {new Date(comment.createdAt).toLocaleString()}
            </time>
          </div>
          <p className="mt-1 whitespace-pre-wrap break-words text-sm text-[var(--foreground)]">
            {comment.content}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowReply((v) => !v)}
              className="text-xs font-medium text-[var(--primary)] hover:underline"
            >
              Reply
            </button>
            {hasReplies && (
              <button
                type="button"
                onClick={() => setCollapsed((v) => !v)}
                aria-expanded={!collapsed}
                className="text-xs font-medium text-[var(--muted)] hover:underline"
              >
                {collapsed
                  ? `Show ${comment.replies!.length} ${comment.replies!.length === 1 ? "reply" : "replies"}`
                  : "Hide replies"}
              </button>
            )}
          </div>
          {showReply && (
            <div className="mt-2">
              <CommentForm
                discussionId={discussionId}
                parentId={comment.id}
                placeholder="Write a reply…"
                submitLabel="Post reply"
                autoFocus
                onCancel={() => setShowReply(false)}
                onSubmitted={(reply) => {
                  setShowReply(false);
                  setCollapsed(false);
                  onReplyAdded(comment.id, reply);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {hasReplies && !collapsed && (
        <ul className="mt-3 space-y-3">
          {comment.replies!.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              discussionId={discussionId}
              depth={depth + 1}
              onReplyAdded={onReplyAdded}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
