"use client";

import React from "react";

export interface StartDiscussionButtonProps {
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "header";
}

/**
 * Start Discussion CTA button component.
 * Prepared for modal trigger and keyboard accessibility (#1425).
 */
export default function StartDiscussionButton({
  onClick,
  className = "",
  variant = "primary",
}: StartDiscussionButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const variantClasses = {
    primary:
      "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg px-5 py-2.5 text-sm focus-visible:outline-purple-600",
    secondary:
      "bg-white hover:bg-purple-50 text-purple-700 shadow-sm border border-purple-200 hover:border-purple-300 px-4 py-2 text-sm focus-visible:outline-purple-700",
    header:
      "bg-white text-purple-700 hover:bg-purple-50 shadow-md hover:shadow-lg font-bold px-6 py-3 text-base focus-visible:outline-white",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Start a new discussion topic"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <svg
        className="mr-2 h-5 w-5"
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
          d="M12 4v16m8-8H4"
        />
      </svg>
      Start Discussion
    </button>
  );
}
