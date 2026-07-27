'use client';

import { useState } from 'react';
import DiscussionCard from './DiscussionCard';
import type { DiscussionMetadata } from '@/lib/community-types';

interface Props {
  discussions: DiscussionMetadata[];
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onDiscussionClick?: (id: string) => void;
}

export default function DiscussionFeed({ discussions, onLike, onBookmark, onDiscussionClick }: Props) {
  const [displayCount, setDisplayCount] = useState(10);

  if (discussions.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="mt-4 text-gray-500">No discussions yet. Start a conversation!</p>
      </div>
    );
  }

  const visible = discussions.slice(0, displayCount);
  const hasMore = discussions.length > displayCount;

  return (
    <div className="space-y-4">
      {visible.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          discussion={discussion}
          onLike={onLike}
          onBookmark={onBookmark}
          onClick={onDiscussionClick}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-2">
          <button
            onClick={() => setDisplayCount((prev) => prev + 10)}
            className="px-6 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 border border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors"
          >
            Load more discussions
          </button>
        </div>
      )}

      {discussions.length > 0 && (
        <p className="text-xs text-gray-400 text-center pt-1">
          Showing {Math.min(displayCount, discussions.length)} of {discussions.length} discussions
        </p>
      )}
    </div>
  );
}
