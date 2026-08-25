import React, { memo } from 'react';
import CategoryBadge from '@/components/CategoryBadge';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Discussion {
  id: string;
  author: string;
  avatar: null | string;
  role: string;
  time: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  likes: number;
  replies: number;
}

export interface DiscussionCardProps {
  post: Discussion;
  onView: () => void;
  onLike: () => void;
  onReply: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

// ── Helpers (module-level — computed once, never recreated) ───────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_GRADIENTS = [
  'from-purple-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
] as const;

function avatarGradient(name: string): string {
  return AVATAR_GRADIENTS[name.length % AVATAR_GRADIENTS.length];
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * DiscussionCard
 *
 * Wrapped in React.memo — only re-renders when its own props change.
 * All action callbacks must be stable references (useCallback at the call site)
 * to keep the memo effective.
 */
const DiscussionCard = memo(function DiscussionCard({
  post,
  onView,
  onLike,
  onReply,
  onShare,
  onBookmark,
}: DiscussionCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Avatar — initials-based, no image request */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient(post.author)} flex items-center justify-center text-white text-sm font-bold`}
          aria-hidden="true"
        >
          {getInitials(post.author)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Author + meta */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900">{post.author}</span>
            <span className="text-xs text-gray-400" aria-hidden="true">·</span>
            <span className="text-xs text-gray-500">{post.role}</span>
            <span className="text-xs text-gray-400" aria-hidden="true">·</span>
            <time className="text-xs text-gray-400">{post.time}</time>
            <CategoryBadge category={post.category} color={post.categoryColor} />
          </div>

          {/* Title — fires discussion_viewed on click */}
          <h3
            className="text-base font-semibold text-gray-900 leading-snug mb-1 hover:text-purple-700 transition-colors cursor-pointer"
            onClick={onView}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{post.excerpt}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            {/* Like */}
            <button
              onClick={onLike}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.likes} likes`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes}
            </button>

            {/* Reply */}
            <button
              onClick={onReply}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.replies} replies`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.replies} replies
            </button>

            {/* Share */}
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label="Share discussion"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>

            {/* Bookmark */}
            <button
              onClick={onBookmark}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label="Bookmark discussion"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

DiscussionCard.displayName = 'DiscussionCard';

export default DiscussionCard;
"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import CategoryBadge from "@/components/CategoryBadge";
import DiscussionMetadata from "./DiscussionMetadata";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import type { DiscussionCardProps } from "@/lib/community-types";

export default function DiscussionCard({
  discussion,
  onLike,
  onBookmark,
  onClick,
  onDelete,
  currentUserId,
}: DiscussionCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isAuthor = currentUserId === discussion.author.id;
  const isPinned = discussion.isPinned ?? false;
  const isLocked = discussion.isLocked ?? false;

  return (
    <>
      <article
        className={`bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow cursor-pointer relative ${
          isPinned ? "border-l-4 border-cyan-500 bg-cyan-50/30" : ""
        } ${isLocked ? "opacity-90" : ""}`}
        onClick={() => onClick?.(discussion.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") onClick?.(discussion.id);
        }}
        aria-label={`Discussion: ${discussion.title}${isPinned ? ", pinned" : ""}${isLocked ? ", locked" : ""}`}
      >
        {(isPinned || isLocked) && (
          <div className="flex items-center gap-2 mb-3">
            {isPinned && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium"
                data-testid="pin-badge"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                </svg>
                Pinned
              </span>
            )}
            {isLocked && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium"
                data-testid="lock-badge"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
                </svg>
                Locked
              </span>
            )}
          </div>
        )}

        <div className="flex items-start gap-3 mb-3">
          <Avatar
            src={discussion.author.avatarUrl}
            alt={discussion.author.name}
            name={discussion.author.name}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900 truncate">
                {discussion.author.name}
              </span>
              {discussion.author.role && (
                <span className="text-xs text-gray-500">
                  {discussion.author.role}
                </span>
              )}
              <CategoryBadge category={discussion.category} />
            </div>
            <h3 className="text-base font-semibold text-gray-900 leading-snug">
              {discussion.title}
            </h3>
          </div>

          {isAuthor && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              className="text-gray-400 hover:text-red-600 transition-colors p-1"
              aria-label="Delete discussion"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>

        {discussion.tags && discussion.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {discussion.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {isLocked && (
          <p
            className="text-xs text-amber-600 mb-3 flex items-center gap-1"
            data-testid="locked-notice"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
            </svg>
            This discussion is locked — no new replies.
          </p>
        )}

        <DiscussionMetadata
          metadata={discussion}
          onLike={onLike}
          onBookmark={onBookmark}
          disableInteractions={isLocked}
        />
      </article>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Discussion"
        message="Are you sure you want to delete this discussion? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          onDelete?.(discussion.id);
          setShowDeleteDialog(false);
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
