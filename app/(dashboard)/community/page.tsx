'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiscussionSort, SortOption } from '@/components/ui/discussion-sort';
import CreateDiscussionForm from '@/components/community/CreateDiscussionForm';
import StartDiscussionModal from '@/components/community/StartDiscussionModal';
import type { DiscussionMetadata } from '@/lib/community-types';

const initialDiscussions: DiscussionMetadata[] = [
  {
    id: '1',
    title: 'How to transition into a career in UX design?',
    author: { id: '1', name: 'Sarah Johnson', avatarUrl: '/avatars/sarah.svg', role: 'Mentor' },
    category: 'Career Advice',
    createdAt: '2025-06-25T10:30:00Z',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    isLiked: false,
    isBookmarked: false,
    isTrending: true,
    isFollowing: false,
    isReported: false,
    tags: ['ux-design', 'career-change']
  },
  {
    id: '2',
    title: 'Best resources for learning cloud computing',
    author: { id: '2', name: 'Mike Chen', avatarUrl: '/avatars/john.svg', role: 'Mentee' },
    category: 'Learning Resources',
    createdAt: '2025-06-27T09:15:00Z',
    likeCount: 18,
    commentCount: 8,
    viewCount: 89,
    isLiked: false,
    isBookmarked: false,
    isTrending: false,
    isFollowing: false,
    isReported: false,
    tags: ['cloud', 'aws']
  }
];

export default function CommunityPage() {
  const [currentSort, setCurrentSort] = useState<SortOption>('trending');
  const [discussions, setDiscussions] = useState<DiscussionMetadata[]>(initialDiscussions);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/discussions');
        if (response.ok) {
          const data = await response.json();
          setDiscussions(Array.isArray(data) ? data : initialDiscussions);
        }
      } catch (error) {
        console.error('Failed to fetch discussions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const sortedDiscussions = useMemo(() => {
    const discussionList = [...discussions];

    switch (currentSort) {
      case 'trending':
        return discussionList.sort((a, b) => Number(b.isTrending) - Number(a.isTrending));
      case 'latest':
        return discussionList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'most-replies':
        return discussionList.sort((a, b) => b.commentCount - a.commentCount);
      case 'most-liked':
        return discussionList.sort((a, b) => b.likeCount - a.likeCount);
      default:
        return discussionList;
    }
  }, [currentSort, discussions]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="mt-2 text-gray-600">
            Connect with mentors and mentees — ask questions, share experiences, and join community events.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-cyan-600 px-4 py-2.5 text-white transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Start Discussion
        </button>
      </div>

      {showCreateForm ? (
        <div className="mb-6">
          <CreateDiscussionForm onSuccess={() => { setShowCreateForm(false); setDiscussions((prev) => prev); }} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
            <DiscussionSort currentSort={currentSort} onSortChange={setCurrentSort} />
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-gray-500">Loading discussions...</div>
          ) : (
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <div key={discussion.id} className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                  <button
                    onClick={() => router.push(`/community/${discussion.id}`)}
                    className="w-full text-left"
                  >
                    <h3 className="mb-2 font-medium text-gray-900">{discussion.title}</h3>
                    <p className="mb-3 text-sm text-gray-600">Started by {discussion.author.name}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {discussion.commentCount} replies
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {discussion.likeCount} likes
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Categories</h2>
            <div className="space-y-2">
              <div className="rounded-lg bg-cyan-50 px-3 py-2 text-sm text-cyan-700">All Discussions</div>
              <div className="rounded-lg px-3 py-2 text-sm text-gray-600">Career Advice</div>
              <div className="rounded-lg px-3 py-2 text-sm text-gray-600">Learning Resources</div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              No upcoming events yet.
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Community Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">1.2k</p>
                <p className="mt-1 text-xs text-gray-600">Total Members</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="mt-1 text-xs text-gray-600">Active Discussions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StartDiscussionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}