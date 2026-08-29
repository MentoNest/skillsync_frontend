"use client";

import React from "react";

interface StartDiscussionButtonProps {
  onClick?: () => void;
}

const StartDiscussionButton = ({ onClick }: StartDiscussionButtonProps) => {
  const handleClick = () => {
    // TODO: open Create Discussion modal (future integration)
    if (onClick) {
      onClick();
    } else {
      console.log("Start a Discussion clicked");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 sm:text-base"
    >
      Start a Discussion
    </button>
  );
};

export default StartDiscussionButton;