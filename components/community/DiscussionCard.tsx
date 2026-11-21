"use client";

import React, { useState } from "react";
import { DiscussionPost } from "./communityData";

export interface DiscussionCardProps {
  discussion: DiscussionPost;
  onLike?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

/**
 * Reusable discussion post card component with responsive layout,
 * author details, tag badges, and interaction stats.
 */
export default function DiscussionCard({
  discussion,
  onLike,
  onDelete,
  isDeleting = false,
}: DiscussionCardProps) {
  const [likes, setLikes] = useState(discussion.likesCount);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      onLike?.(discussion.id);
    }
  };

  return (
    <article
      aria-labelledby={`disc-title-${discussion.id}`}
      className="group relative rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-purple-300 hover:shadow-md"
    >
      {/* Header: Author & Badges */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-gray-100 bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={discussion.author.avatar || "/images/mentors/sarah-chen.svg"}
              alt={discussion.author.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                {discussion.author.name}
              </span>
              {discussion.author.isMentor && (
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                  Mentor
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{discussion.author.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {discussion.isPinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-medium text-amber-800">
              📌 Pinned
            </span>
          )}
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {discussion.category}
          </span>
        </div>
      </div>

      {/* Title & Excerpt */}
      <div className="mt-3">
        <h3
          id={`disc-title-${discussion.id}`}
          className="text-base font-bold text-gray-900 group-hover:text-purple-700 sm:text-lg transition-colors"
        >
          {discussion.title}
        </h3>
        <p className="mt-1.5 text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {discussion.excerpt}
        </p>
      </div>

      {/* Tags */}
      {discussion.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {discussion.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: Stats & Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
        <span>Posted {discussion.createdAt}</span>

        <div className="flex items-center gap-4">
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(discussion.id)}
              disabled={isDeleting}
              className="rounded px-2 py-1 font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          )}
          <button
            type="button"
            onClick={handleLike}
            aria-label={`${hasLiked ? "Unlike" : "Like"} discussion. Currently ${likes} likes.`}
            className={`inline-flex items-center gap-1 rounded px-2 py-1 transition-colors ${
              hasLiked
                ? "text-rose-600 font-semibold"
                : "text-gray-500 hover:text-rose-600"
            }`}
          >
            <svg
              className={`h-4 w-4 ${hasLiked ? "fill-current" : ""}`}
              fill={hasLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likes}</span>
          </button>

          <span
            aria-label={`${discussion.commentsCount} comments`}
            className="inline-flex items-center gap-1"
          >
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{discussion.commentsCount}</span>
          </span>

          <span
            aria-label={`${discussion.viewsCount} views`}
            className="hidden sm:inline-flex items-center gap-1 text-gray-400"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{discussion.viewsCount}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
