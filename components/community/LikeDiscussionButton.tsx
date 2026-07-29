'use client';

import React, { useState } from 'react';

interface LikeButtonProps {
  discussionId: string;
  initialLikes?: number;
  initialLiked?: boolean;
}

export function LikeDiscussionButton({
  discussionId,
  initialLikes = 0,
  initialLiked = false,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = () => {
    // Optimistic UI update
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition ${
        isLiked
          ? 'bg-rose-50 text-rose-600 border-rose-200'
          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
      }`}
    >
      <span>{isLiked ? '❤️' : '🤍'}</span>
      <span>{likeCount}</span>
    </button>
  );
}
