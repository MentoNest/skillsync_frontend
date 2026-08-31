"use client";

import { useEffect, useState } from "react";
import { notifyCommunityUpdate } from "@/lib/useDiscussions";

interface LikeButtonProps {
  id: string;
  initialCount: number;
  className?: string;
}

const STORAGE_KEY = "skillSync:discussion_likes";

function readLikedSet(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLikedSet(map: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage full or unavailable
  }
}

const LikeButton = memo(function LikeButton({
  id,
  initialCount,
  className,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const map = readLikedSet();
    const isLiked = Boolean(map[id]);
    setLiked(isLiked);
    setCount(initialCount + (isLiked ? 1 : 0));
  }, [id, initialCount]);

  const persistLikeState = useCallback(
    (nextLiked: boolean) => {
      const map = readLikedSet();
      map[id] = nextLiked;
      writeLikedSet(map);
    },
    [id]
  );

  const toggle = useCallback(async () => {
    const nextLiked = !liked;
    const previousLiked = liked;
    const previousCount = initialCount + (previousLiked ? 1 : 0);

    setLiked(nextLiked);
    setCount(initialCount + (nextLiked ? 1 : 0));
    persistLikeState(nextLiked);

    try {
      const response = await fetch(
        `/api/community/discussions/${encodeURIComponent(id)}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ liked: nextLiked }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update like state: ${response.status}`);
      }

      const data: { liked: boolean; likeCount: number } = await response.json();
      setLiked(data.liked);
      setCount(data.likeCount);
      persistLikeState(data.liked);
      notifyCommunityUpdate();
    } catch (error) {
      console.error("Failed to sync discussion like state", error);
      setLiked(previousLiked);
      setCount(previousCount);
      persistLikeState(previousLiked);
    }
  }, [liked, initialCount, id, persistLikeState]);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "Unlike discussion" : "Like discussion"}
      onClick={toggle}
      className={className}
      title={liked ? "Unlike discussion" : "Like discussion"}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-bold transition-colors ${
          liked
            ? "bg-indigo-600 text-white"
            : "border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
        }`}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 21s-6.716-4.686-9.333-7.303C-1.33 11.06 2.01 6 6.667 6c2.59 0 3.905 1.614 5.333 3.02C13.428 7.614 14.743 6 17.333 6 22 6 25.33 11.06 21.333 13.697 18.716 16.314 12 21 12 21z"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {count}
      </span>
    </button>
  );
});

export default LikeButton;
