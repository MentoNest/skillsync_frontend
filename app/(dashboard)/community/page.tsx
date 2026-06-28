'use client';

import React, { useState, useMemo } from 'react';
import { DiscussionSort, SortOption } from '@/components/ui/discussion-sort';
import DiscussionCard from '@/components/community/DiscussionCard';
import Toast from '@/components/ui/toast';
import type { DiscussionMetadata } from '@/lib/community-types';

const mockDiscussions: DiscussionMetadata[] = [
  {
    id: '1',
    title: 'How to transition into a career in UX design?',
    author: {
      id: 'user-1',
      name: 'Sarah Johnson',
      avatarUrl: null,
      role: 'UX Designer'
    },
    category: 'Career Advice',
    createdAt: '2025-06-25T10:00:00Z',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    isLiked: false,
    isBookmarked: false,
    tags: ['career', 'ux', 'transition']
  },
  {
    id: '2',
    title: 'Best resources for learning cloud computing',
    author: {
      id: 'user-2',
      name: 'Mike Chen',
      avatarUrl: null,
      role: 'Cloud Architect'
    },
    category: 'Learning Resources',
    createdAt: '2025-06-27T14:30:00Z',
    likeCount: 18,
    commentCount: 8,
    viewCount: 89,
    isLiked: false,
    isBookmarked: false,
    tags: ['cloud', 'aws', 'learning']
  },
  {
    id: '3',
    title: 'Tips for negotiating a salary raise',
    author: {
      id: 'current-user',
      name: 'Emily Rodriguez',
      avatarUrl: null,
      role: 'Product Manager'
    },
    category: 'Career Advice',
    createdAt: '2025-06-28T09:15:00Z',
    likeCount: 31,
    commentCount: 23,
    viewCount: 234,
    isLiked: false,
    isBookmarked: false,
    tags: ['salary', 'negotiation', 'career']
  },
  {
    id: '4',
    title: 'How to build a personal brand as a developer',
    author: {
      id: 'user-4',
      name: 'James Wilson',
      avatarUrl: null,
      role: 'Senior Developer'
    },
    category: 'Personal Development',
    createdAt: '2025-06-26T16:45:00Z',
    likeCount: 42,
    commentCount: 15,
    viewCount: 312,
    isLiked: false,
    isBookmarked: false,
    tags: ['branding', 'developer', 'growth']
  }
];

export default function CommunityPage() {
  const [currentSort, setCurrentSort] = useState<SortOption>('trending');
  const [discussions, setDiscussions] = useState<DiscussionMetadata[]>(mockDiscussions);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const currentUserId = 'current-user';

  const sortedDiscussions = useMemo(() => {
    const discussionsList = [...discussions];
    
    switch (currentSort) {
      case 'trending':
        return discussionsList.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
      case 'latest':
        return discussionsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'most-replies':
        return discussionsList.sort((a, b) => b.commentCount - a.commentCount);
      case 'most-liked':
        return discussionsList.sort((a, b) => b.likeCount - a.likeCount);
      default:
        return discussionsList;
    }
  }, [currentSort, discussions]);

  const handleDelete = (id: string) => {
    setDiscussions(prev => prev.filter(d => d.id !== id));
    setToast({ message: 'Discussion deleted successfully', type: 'success' });
  };

  const handleLike = (id: string) => {
    setDiscussions(prev => prev.map(d => 
      d.id === id 
        ? { ...d, isLiked: !d.isLiked, likeCount: d.isLiked ? d.likeCount - 1 : d.likeCount + 1 }
        : d
    ));
  };

  const handleBookmark = (id: string) => {
    setDiscussions(prev => prev.map(d => 
      d.id === id 
        ? { ...d, isBookmarked: !d.isBookmarked }
        : d
    ));
  };

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
            {sortedDiscussions.length > 0 ? (
              sortedDiscussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                  onDelete={handleDelete}
                  currentUserId={currentUserId}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No discussions yet.</p>
              </div>
            )}
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

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}