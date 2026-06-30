'use client';

import React, { useState } from 'react';
import { SortOption } from '@/components/ui/discussion-sort';
import { StatisticCard } from '@/components/ui/statistic-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { UpcomingEventsWidget } from '@/components/ui/upcoming-events-widget';
import { CategoriesWidget } from '@/components/ui/categories-widget';
import { Button } from '@/components/ui/button';
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
import { useState, useEffect, useMemo } from 'react';
import React, { useState } from 'react';
import { useCommunity } from './community-context';
import type { DiscussionMetadata } from '@/lib/community-types';
import StartDiscussionModal from '@/components/community/StartDiscussionModal';

// Community statistics icons
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ActiveIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Empty state illustration icon
const EmptyChatIcon = () => (
  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

// Community statistics icons
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ActiveIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Empty state illustration icon
const EmptyChatIcon = () => (
  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default function CommunityPage() {
  const {
    filters,
    setSortBy,
    setCategoryFilter,
    addDiscussion,
    handleEventRegistration,
    statistics,
    categories,
    events,
    statistics,
    categories,
    setCategoryFilter,
    loading,
  } = useCommunity();

  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const sortedDiscussions = useMemo(() => {
    const list = [...discussions];
    switch (filters.sortBy) {
      case 'latest':
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'most-replies':
        return list.sort((a, b) => b.commentCount - a.commentCount);
      case 'most-liked':
        return list.sort((a, b) => b.likeCount - a.likeCount);
      default:
        return list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }
  }, [discussions, filters.sortBy]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortedDiscussions = getFilteredDiscussions();

  const handleStartDiscussion = () => {
    setShowNewDiscussionModal(true);
  };

  const handleStartDiscussion = () => {
    setShowNewDiscussionModal(true);
  };

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
          className="px-4 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
          aria-label="Start a new discussion"
        >
          Start Discussion
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatisticCard
          label="Total Members"
          value={statistics.totalMembers}
          icon={<UsersIcon />}
        />
        <StatisticCard
          label="Active Discussions"
          value={statistics.activeDiscussions}
          icon={<ActiveIcon />}
        />
        <StatisticCard
          label="Total Discussions"
          value={statistics.totalDiscussions}
          icon={<MessageIcon />}
        />
        <StatisticCard
          label="Events This Month"
          value={statistics.eventsThisMonth}
          icon={<CalendarIcon />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {showCreateForm && (
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleStartDiscussion}>
                Start Discussion
              </Button>
              <DiscussionSort 
                currentSort={filters.sortBy as SortOption} 
                onSortChange={(sort) => setSortBy(sort)} 
              />
            </div>
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
          {sortedDiscussions.length > 0 ? (
            <div className="space-y-4">
            <SortBar currentSort={filters.sortBy} onSortChange={setSortBy} />
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading discussions...</div>
          ) : discussions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No discussions found.</div>
        {/* Discussions */}
        <section className="lg:col-span-2 bg-white rounded-lg shadow p-6" aria-label="Discussion list">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
            <label className="text-sm text-gray-500">
              Sort by:
              <select
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof filters.sortBy)}
                className="ml-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Sort discussions"
              >
                <option value="trending">Trending</option>
                <option value="latest">Latest</option>
                <option value="most-replies">Most Replies</option>
                <option value="most-liked">Most Liked</option>
              </select>
            </label>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500" role="status" aria-live="polite">Loading discussions...</div>
          ) : (
            <div className="space-y-4" role="list">
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
                <div
                  key={discussion.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-2">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Started by {discussion.author}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {discussion.likes} likes
                    </span>
                <article
                  key={discussion.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-cyan-500"
                  role="listitem"
                >
                  <h3 className="font-medium text-gray-900 mb-2">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Started by {discussion.author}</p>
                  <div className="flex gap-4 text-sm text-gray-500" aria-label="Discussion stats">
                    <span>{discussion.replies} replies</span>
                    <span>{discussion.likes} likes</span>
                  </div>
                </article>
              ))}
              {sortedDiscussions.length === 0 && (
                <p className="text-center py-8 text-gray-500">No discussions found.</p>
              )}
            </div>
          ) : (
            <EmptyState
              icon={<EmptyChatIcon />}
              heading="No discussions yet"
              supportingText="Be the first to start a conversation! Share your questions, experiences, or topics you'd like to discuss with the community."
              ctaText="Start Discussion"
              onCtaClick={handleStartDiscussion}
            />
          )}
        </section>

        <div className="flex flex-col gap-6">
          <CategorySidebar
            categories={categories}
            selectedCategory={filters.category}
            onSelect={setCategoryFilter}
            totalDiscussions={statistics.totalDiscussions}
          />

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              <p className="text-sm">No upcoming events yet.</p>
            </div>
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
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Members</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              <p className="text-sm">Member activity coming soon.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
        {/* Sidebar */}
        <div className="flex flex-col gap-6 order-2 lg:order-2">
          {/* Categories Widget */}
          <CategoriesWidget
            categories={categories}
            selectedCategory={filters.category}
            onCategorySelect={setCategoryFilter}
            totalDiscussions={statistics.totalDiscussions}
          />

          {/* Upcoming Events Widget */}
          <UpcomingEventsWidget 
            events={events}
            onRegister={handleEventRegistration}
          />
          
          {/* Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              <p className="text-sm">No upcoming events yet.</p>
            </div>
          </div>
        <aside className="flex flex-col gap-6" aria-label="Community sidebar">
          {/* Categories */}
          <nav className="bg-white rounded-lg shadow p-6" aria-label="Discussion categories">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2" role="list">
              <button
                onClick={() => setCategoryFilter(null)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  filters.category === null ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-current={filters.category === null ? 'true' : undefined}
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
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    filters.category === category.id ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  aria-current={filters.category === category.id ? 'true' : undefined}
                >
                  <span className="flex justify-between">
                    <span>{category.name}</span>
                    <span className="text-gray-500">{category.count}</span>
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Community Statistics */}
          <section className="bg-white rounded-lg shadow p-6" aria-label="Community statistics">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Statistics</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600 mt-1">Total Members</dt>
                <dd className="text-2xl font-bold text-gray-900">{statistics.totalMembers.toLocaleString()}</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600 mt-1">Active Discussions</dt>
                <dd className="text-2xl font-bold text-gray-900">{statistics.activeDiscussions}</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600 mt-1">Total Discussions</dt>
                <dd className="text-2xl font-bold text-gray-900">{statistics.totalDiscussions}</dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <dt className="text-xs text-gray-600 mt-1">Events This Month</dt>
                <dd className="text-2xl font-bold text-gray-900">{statistics.eventsThisMonth}</dd>
              </div>
            </dl>
          </section>
        </aside>
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
      <StartDiscussionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

interface SortBarProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

function SortBar({ currentSort, onSortChange }: SortBarProps) {
  const options = [
    { value: 'trending', label: 'Trending' },
    { value: 'latest', label: 'Latest' },
    { value: 'most-replies', label: 'Most Replies' },
    { value: 'most-liked', label: 'Most Liked' },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            currentSort === option.value
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

interface CategorySidebarProps {
  categories: CategoryItem[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
  totalDiscussions: number;
}

function CategorySidebar({ categories, selectedCategory, onSelect, totalDiscussions }: CategorySidebarProps) {
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleFollow = (categoryId: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="space-y-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === null ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <span className="flex justify-between">
            <span>All Discussions</span>
              <span className="text-gray-500">{totalDiscussions}</span>
          </span>
        </button>
        {categories.map((category) => {
          const isFollowed = followed.has(category.id);
          return (
            <div
              key={category.id}
              className="group relative"
              onMouseEnter={() => setHovered(category.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <button
                onClick={() => onSelect(category.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="flex justify-between items-center gap-2">
                  <span className="truncate">{category.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">{category.count}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(category.id);
                      }}
                      className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                        isFollowed
                          ? 'bg-cyan-100 text-cyan-700'
                          : 'opacity-0 group-hover:opacity-100 bg-gray-100 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700'
                      }`}
                      aria-label={isFollowed ? 'Unfollow category' : 'Follow category'}
                    >
                      {isFollowed ? 'Following' : 'Follow'}
                    </button>
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
    </div>
  );
}
