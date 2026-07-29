'use client';

import React, { useState } from 'react';

interface BookmarkButtonProps {
  discussionId: string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({ discussionId, initialBookmarked = false }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition ${
        isBookmarked
          ? 'bg-amber-50 text-amber-700 border-amber-300'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      }`}
      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Discussion'}
    >
      <span>{isBookmarked ? '🔖 Saved' : '🔖 Bookmark'}</span>
    </button>
  );
}
