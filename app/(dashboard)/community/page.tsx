'use client';

import React, { useState } from 'react';
import { useCommunity } from './community-context';

export default function CommunityPage() {
  const {
    getFilteredDiscussions,
    filters,
    setSortBy,
    statistics,
    categories,
    setCategoryFilter,
    loading,
  } = useCommunity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortedDiscussions = getFilteredDiscussions();

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
          aria-label="Start a new discussion"
        >
          Start Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          )}
        </section>

        {/* Sidebar */}
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
    </div>
  );
}
