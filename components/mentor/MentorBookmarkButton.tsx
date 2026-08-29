// Bookmark toggle button for saving a mentor (#859).
"use client";

import React from "react";

interface MentorBookmarkButtonProps {
  mentorId: string;
  isBookmarked: boolean;
  onToggle: (mentorId: string) => void;
}

const MentorBookmarkButton = ({ mentorId, isBookmarked, onToggle }: MentorBookmarkButtonProps) => {
  const label = isBookmarked ? "Remove from saved mentors" : "Save this mentor";

  return (
    <button
      type="button"
      onClick={() => onToggle(mentorId)}
      aria-pressed={isBookmarked}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
        isBookmarked
          ? "border-primary-600 bg-primary-600 text-white hover:bg-primary-700"
          : "border-gray-200 bg-white text-gray-400 hover:border-primary-300 hover:text-primary-600"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
};

export default MentorBookmarkButton;