"use client";

import React, { useState } from "react";

interface FollowCategoryProps {
  categoryId: string;
  categoryName: string;
  initialFollowing?: boolean;
}

export function FollowCategoryButton({
  categoryId,
  categoryName,
  initialFollowing = false,
}: FollowCategoryProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const toggleFollowCategory = () => {
    // Optimistic update
    setIsFollowing((prev) => !prev);
  };

  return (
    <button
      onClick={toggleFollowCategory}
      className={`px-3 py-1 text-xs font-medium rounded-full border transition ${
        isFollowing
          ? "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      {isFollowing ? `✓ Following ${categoryName}` : `+ Follow ${categoryName}`}
    </button>
  );
}
