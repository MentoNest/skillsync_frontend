'use client';

import React, { useState } from 'react';

interface FollowUserProps {
  userId: string;
  initialFollowing?: boolean;
}

export function FollowUserButton({ userId, initialFollowing = false }: FollowUserProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <button
      onClick={toggleFollow}
      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
        isFollowing
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isFollowing ? 'Following' : '+ Follow User'}
    </button>
  );
}
