'use client';

import React from 'react';
import { SortOption } from '@/components/ui/discussion-sort';
import { useCommunity } from './community-context';

export default function CommunityPage() {
  const {
    getFilteredDiscussions,
    filters,
    setSortBy,
    statistics,
    categories,
    loading,
    error
  } = useCommunity();

  const sortedDiscussions = getFilteredDiscussions();
import React, { useState, useMemo, useEffect } from 'react';
import { DiscussionSort, SortOption } from '@/components/ui/discussion-sort';
import DiscussionCard from '@/components/community/DiscussionCard';
import Toast from '@/components/ui/toast';
import type { DiscussionMetadata } from '@/lib/community-types';
import CreateDiscussionForm from '@/components/community/CreateDiscussionForm';
import type { DiscussionMetadata } from '@/lib/community-types';

export default function CommunityPage() {
  const [currentSort, setCurrentSort] = useState<SortOption>('trending');
  const [discussions, setDiscussions] = useState<DiscussionMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch('/api/discussions');
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
      }
    } catch (error) {
      console.error('Failed to fetch discussions:', error);
    } finally {
      setIsLoading(false);
    }
  };
import StartDiscussionModal from '@/components/community/StartDiscussionModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedDiscussions = useMemo(() => {
    const discussionsList = [...discussions];
    
    switch (currentSort) {
      case 'trending':
        return discussionsList.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        return discussionsList.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="mt-2 text-gray-600">
            Connect with mentors and mentees — ask questions, share experiences, and join community events.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
        >
          {showCreateForm ? 'Cancel' : 'New Discussion'}
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
        >
          Start Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {showCreateForm && (
        <div className="mb-6">
          <CreateDiscussionForm onSuccess={() => { setShowCreateForm(false); fetchDiscussions(); }} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Discussions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 order-1 lg:order-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
            <DiscussionSort 
              currentSort={filters.sortBy as SortOption} 
              onSortChange={(sort) => setSortBy(sort)} 
            />
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
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading discussions...</div>
          ) : (
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-2">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Started by {discussion.author.name}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {discussion.commentCount} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {discussion.likeCount} likes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 order-2 lg:order-2">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setCategoryFilter(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  filters.category === null 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="flex justify-between">
                  <span>All Discussions</span>
                  <span className="text-gray-500">{statistics.totalDiscussions}</span>
                </span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    filters.category === category.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="flex justify-between">
                    <span>{category.name}</span>
                    <span className="text-gray-500">{category.count}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          
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

          {/* Community Statistics Widget */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Statistics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.totalMembers.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1">Total Members</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.activeDiscussions}</p>
                <p className="text-xs text-gray-600 mt-1">Active Discussions</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.totalDiscussions}</p>
                <p className="text-xs text-gray-600 mt-1">Total Discussions</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{statistics.eventsThisMonth}</p>
                <p className="text-xs text-gray-600 mt-1">Events This Month</p>
              </div>
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
      <StartDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}