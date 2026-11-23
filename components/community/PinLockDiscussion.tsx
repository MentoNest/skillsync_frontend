"use client";

import React from "react";

export interface PinLockDiscussionProps {
  discussionId: string;
  initialPinned?: boolean;
  initialLocked?: boolean;
  isPinned?: boolean;
  isLocked?: boolean;
  onPinChange?: (discussionId: string, pinned: boolean) => void;
  onLockChange?: (discussionId: string, locked: boolean) => void;
  onTogglePin?: (discussionId: string) => void;
  onToggleLock?: (discussionId: string) => void;
  disabled?: boolean;
}

export default function PinLockDiscussion({
  discussionId,
  initialPinned = false,
  initialLocked = false,
  isPinned,
  isLocked,
  onPinChange,
  onLockChange,
  onTogglePin,
  onToggleLock,
  disabled = false,
}: PinLockDiscussionProps) {
  const pinned = isPinned ?? initialPinned;
  const locked = isLocked ?? initialLocked;

  const togglePin = () => {
    if (onTogglePin) onTogglePin(discussionId);
    else onPinChange?.(discussionId, !pinned);
  };

  const toggleLock = () => {
    if (onToggleLock) onToggleLock(discussionId);
    else onLockChange?.(discussionId, !locked);
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-gray-50 p-2">
      {pinned && (
        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
          Pinned
        </span>
      )}
      {locked && (
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
          Locked: replies disabled
        </span>
      )}
      <div className="ml-auto flex gap-2">
        <button type="button" onClick={togglePin} disabled={disabled} aria-pressed={pinned} className="rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60">
          {pinned ? "Unpin" : "Pin to top"}
        </button>
        <button type="button" onClick={toggleLock} disabled={disabled} aria-pressed={locked} className="rounded border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60">
          {locked ? "Unlock" : "Lock discussion"}
        </button>
      </div>
    </div>
  );
}

export { PinLockDiscussion };
