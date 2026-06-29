'use client';

import React, { useState } from 'react';
import { SortOption } from '@/components/ui/discussion-sort';
import { StatisticCard } from '@/components/ui/statistic-card';
import { EmptyState } from '@/components/ui/empty-state';
import { UpcomingEventsWidget } from '@/components/ui/upcoming-events-widget';
import { CategoriesWidget } from '@/components/ui/categories-widget';
import { Button } from '@/components/ui/button';
import { useCommunity } from './community-context';

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
    getFilteredDiscussions,
    filters,
    setSortBy,
    setCategoryFilter,
    addDiscussion,
    handleEventRegistration,
    statistics,
    categories,
    events,
    loading,
    error
  } = useCommunity();

  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  const sortedDiscussions = getFilteredDiscussions();
import React, { useState, useMemo, useEffect } from 'react';
import { DiscussionSort, SortOption } from '@/components/ui/discussion-sort';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedDiscussions = useMemo(() => {
    const discussionsList = [...discussions];
    
    switch (currentSort) {
      case 'trending':
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

  const handleStartDiscussion = () => {
    setShowNewDiscussionModal(true);
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
        <div className="mb-6">
          <CreateDiscussionForm onSuccess={() => { setShowCreateForm(false); fetchDiscussions(); }} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Discussions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 order-1 lg:order-1">
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
          
          {sortedDiscussions.length > 0 ? (
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
          ) : (
            <EmptyState
              icon={<EmptyChatIcon />}
              heading="No discussions yet"
              supportingText="Be the first to start a conversation! Share your questions, experiences, or topics you'd like to discuss with the community."
              ctaText="Start Discussion"
              onCtaClick={handleStartDiscussion}
            />
          )}
        </div>

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

      <StartDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}