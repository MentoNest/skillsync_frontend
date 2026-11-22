"use client";

import React from "react";
import StartDiscussionButton from "./StartDiscussionButton";

export interface CommunityEmptyStateProps {
  searchQuery?: string;
  activeTab?: "trending" | "latest" | "my-posts";
  onStartDiscussion: () => void;
}

/**
 * Accessible empty state shown when the community discussion list has no results.
 */
export default function CommunityEmptyState({
  searchQuery,
  activeTab,
  onStartDiscussion,
}: CommunityEmptyStateProps) {
  const message = searchQuery
    ? `No discussions match "${searchQuery}". Try clearing the search or choosing a different topic.`
    : activeTab === "my-posts"
      ? "You haven't posted any discussions yet. Start one and share it with the community."
      : "No discussions in this category yet. Be the first to share a question or idea.";

  return (
    <section
      aria-labelledby="community-empty-title"
      className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center sm:px-10 sm:py-12"
    >
      <div
        aria-hidden="true"
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-50"
      >
        <svg
          className="h-12 w-12 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 17h28a8 8 0 018 8v10a8 8 0 01-8 8H32l-10 8v-8h-4a8 8 0 01-8-8V25a8 8 0 018-8z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22 30h.01M32 30h.01M42 30h.01"
          />
        </svg>
      </div>

      <h3
        id="community-empty-title"
        className="mt-5 text-lg font-bold text-gray-900 sm:text-xl"
      >
        {searchQuery ? "No matching discussions" : "No discussions yet"}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
        {message}
      </p>
      <div className="mt-6">
        <StartDiscussionButton
          onClick={onStartDiscussion}
          className="w-full sm:w-auto"
        />
      </div>
    </section>
  );
}
