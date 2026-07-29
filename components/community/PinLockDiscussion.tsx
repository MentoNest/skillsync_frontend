'use client';

import React, { useState } from 'react';

interface PinLockProps {
  discussionId: string;
  initialPinned?: boolean;
  initialLocked?: boolean;
}

export function PinLockDiscussion({
  discussionId,
  initialPinned = false,
  initialLocked = false,
}: PinLockProps) {
  const [isPinned, setIsPinned] = useState(initialPinned);
  const [isLocked, setIsLocked] = useState(initialLocked);

  return (
    <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-md">
      {isPinned && (
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold flex items-center gap-1">
          📌 Pinned Discussion
        </span>
      )}
      {isLocked && (
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-semibold flex items-center gap-1">
          🔒 Locked Discussion (Replies Disabled)
        </span>
      )}

      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => setIsPinned(!isPinned)}
          className="text-xs px-2 py-1 border rounded hover:bg-gray-200"
        >
          {isPinned ? 'Unpin' : 'Pin to Top'}
        </button>
        <button
          onClick={() => setIsLocked(!isLocked)}
          className="text-xs px-2 py-1 border rounded hover:bg-gray-200"
        >
          {isLocked ? 'Unlock' : 'Lock Discussion'}
        </button>
      </div>
    </div>
  );
}
