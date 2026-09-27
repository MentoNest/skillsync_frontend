"use client";

import { useState } from "react";
import type { Discussion } from "@/lib/community-types";

interface DiscussionModerationProps {
  discussion: Discussion;
  onPin: (id: string, isPinned: boolean) => void;
  onLock: (id: string, isLocked: boolean) => void;
  isModerator: boolean;
}

export function DiscussionModeration({
  discussion,
  onPin,
  onLock,
  isModerator,
}: DiscussionModerationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePin() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/community/discussions/${discussion.id}/pin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !discussion.isPinned }),
      });
      if (!res.ok) throw new Error("Failed to update pin status");
      onPin(discussion.id, !discussion.isPinned);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLock() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/community/discussions/${discussion.id}/lock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLocked: !discussion.isLocked }),
      });
      if (!res.ok) throw new Error("Failed to update lock status");
      onLock(discussion.id, !discussion.isLocked);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isModerator) return null;

  return (
    <div className="flex items-center gap-2">
      {error && (
        <span role="alert" className="text-xs text-red-600">
          {error}
        </span>
      )}
      <button
        onClick={handlePin}
        disabled={isLoading}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
          discussion.isPinned
            ? "bg-[var(--primary)] text-white"
            : "bg-[var(--secondary)] text-[var(--muted)] hover:bg-[var(--border)]"
        }`}
        aria-pressed={discussion.isPinned}
        aria-label={discussion.isPinned ? "Unpin discussion" : "Pin discussion"}
      >
        {discussion.isPinned ? "Unpin" : "Pin"}
      </button>
      <button
        onClick={handleLock}
        disabled={isLoading}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
          discussion.isLocked
            ? "bg-amber-500 text-white"
            : "bg-[var(--secondary)] text-[var(--muted)] hover:bg-[var(--border)]"
        }`}
        aria-pressed={discussion.isLocked}
        aria-label={discussion.isLocked ? "Unlock discussion" : "Lock discussion"}
      >
        {discussion.isLocked ? "Unlock" : "Lock"}
      </button>
    </div>
  );
}
