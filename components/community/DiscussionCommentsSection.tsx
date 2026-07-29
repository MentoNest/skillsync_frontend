'use client';

import React from 'react';

export interface CommentData {
  id: string;
  authorName: string;
  avatarUrl?: string;
  timestamp: string;
  content: string;
}

interface CommentsSectionProps {
  comments?: CommentData[];
}

export function DiscussionCommentsSection({ comments = [] }: CommentsSectionProps) {
  const defaultComments: CommentData[] = [
    {
      id: 'c1',
      authorName: 'Alex Johnson',
      timestamp: '2 hours ago',
      content: 'Great discussion! The insights on state management here are super helpful.',
    },
    {
      id: 'c2',
      authorName: 'Maria Garcia',
      timestamp: '1 hour ago',
      content: 'Would love to see a follow-up post on performance profiling in Next.js!',
    },
  ];

  const list = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-4 bg-white p-4 border rounded-lg shadow-sm">
      <h3 className="text-base font-bold text-gray-900">Comments ({list.length})</h3>
      <div className="space-y-3">
        {list.map((c) => (
          <div key={c.id} className="p-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {c.authorName.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-800">{c.authorName}</span>
                <span className="text-xs text-gray-400 ml-2">{c.timestamp}</span>
              </div>
            </div>
            <p className="text-xs text-gray-700 mt-1 pl-9">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
