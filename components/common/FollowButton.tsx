"use client";

import { useEffect, useState } from "react";

interface FollowButtonProps {
  userId: string;
  userName?: string;
  className?: string;
}

const STORAGE_KEY = "skillSync:user_follow_state";

function readFollowState(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Failed to read follow state from localStorage", error);
    return {};
  }
}

function writeFollowState(map: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.error("Failed to write follow state to localStorage", error);
  }
}

export default function FollowButton({ userId, userName = "user", className }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const map = readFollowState();
    setIsFollowing(Boolean(map[userId]));
  }, [userId]);

  const toggleFollow = () => {
    const map = readFollowState();
    const nextFollowing = !isFollowing;
    map[userId] = nextFollowing;
    writeFollowState(map);
    setIsFollowing(nextFollowing);
  };

  return (
    <button
      type="button"
      onClick={toggleFollow}
      aria-pressed={isFollowing}
      aria-label={isFollowing ? `Unfollow ${userName}` : `Follow ${userName}`}
      title={isFollowing ? `Unfollow ${userName}` : `Follow ${userName}`}
      className={[
        "inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1",
        isFollowing
          ? "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700"
          : "border-indigo-200 bg-white text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50",
        className,
      ].join(" ")}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
