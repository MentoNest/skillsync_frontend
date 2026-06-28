'use client';

import React, { useState, useMemo } from 'react';
import { DiscussionSort, SortOption } from '@/components/ui/discussion-sort';

interface Discussion {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  replies: number;
  likes: number;
  trending: number;
}

const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'How to transition into a career in UX design?',
    author: 'Sarah Johnson',
    createdAt: new Date('2025-06-25'),
    replies: 12,
    likes: 24,
    trending: 85
  },
  {
    id: '2',
    title: 'Best resources for learning cloud computing',
    author: 'Mike Chen',
    createdAt: new Date('2025-06-27'),
    replies: 8,
    likes: 18,
    trending: 72
  },
  {
    id: '3',
    title: 'Tips for negotiating a salary raise',
    author: 'Emily Rodriguez',
    createdAt: new Date('2025-06-28'),
    replies: 23,
    likes: 31,
    trending: 95
  },
  {
    id: '4',
    title: 'How to build a personal brand as a developer',
    author: 'James Wilson',
    createdAt: new Date('2025-06-26'),
    replies: 15,
    likes: 42,
    trending: 78
  }
];

export default function CommunityPage() {
  const [currentSort, setCurrentSort] = useState<SortOption>('trending');

  const sortedDiscussions = useMemo(() => {
    const discussions = [...mockDiscussions];
    
    switch (currentSort) {
      case 'trending':
        return discussions.sort((a, b) => b.trending - a.trending);
      case 'latest':
        return discussions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'most-replies':
        return discussions.sort((a, b) => b.replies - a.replies);
      case 'most-liked':
        return discussions.sort((a, b) => b.likes - a.likes);
      default:
        return discussions;
    }
  }, [currentSort]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <p className="mt-2 text-gray-600">
          Connect with mentors and mentees — ask questions, share experiences, and join community events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Discussions */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
            <DiscussionSort currentSort={currentSort} onSortChange={setCurrentSort} />
          </div>
          
          <div className="space-y-4">
            {sortedDiscussions.map((discussion) => (
              <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-2">{discussion.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Started by {discussion.author}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {discussion.replies} replies
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {discussion.likes} likes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar placeholders */}
        <div className="flex flex-col gap-6">
          {/* Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              <p className="text-sm">No upcoming events yet.</p>
            </div>
          </div>

          {/* Active members */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Members</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              <p className="text-sm">Member activity coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}