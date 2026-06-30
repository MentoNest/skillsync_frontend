'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCommunity } from './community-context';
import type { DiscussionMetadata } from '@/lib/community-types';
import StartDiscussionModal from '@/components/community/StartDiscussionModal';

export default function CommunityPage() {
  const {
    filters,
    setSortBy,
    setCategoryFilter,
    statistics,
    categories,
    loading,
  } = useCommunity();

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
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
        >
          Start Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Discussions</h2>
            <SortBar currentSort={filters.sortBy} onSortChange={setSortBy} />
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading discussions...</div>
          ) : discussions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No discussions found.</div>
          ) : (
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-2">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Started by {discussion.author.name}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {discussion.commentCount} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Members</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
              <p className="text-sm">Member activity coming soon.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
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
