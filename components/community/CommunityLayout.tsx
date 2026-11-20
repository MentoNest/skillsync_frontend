"use client";

import React, { useState, useMemo } from "react";
import CommunityHero from "./CommunityHero";
import CommunityFeedTabs, { CommunityFeedTab } from "./CommunityFeedTabs";
import CommunitySidebar from "./CommunitySidebar";
import DiscussionCard from "./DiscussionCard";
import StartDiscussionButton from "./StartDiscussionButton";
import { SAMPLE_DISCUSSIONS, DiscussionPost } from "./communityData";

/**
 * Responsive Community Page Layout component (#1423).
 * Provides the two-column desktop layout with feed and sidebar,
 * with search, category filtering, and tab sorting.
 */
export default function CommunityLayout() {
  const [activeTab, setActiveTab] = useState<CommunityFeedTab>("trending");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter & sort discussions
  const filteredDiscussions = useMemo(() => {
    let result = [...SAMPLE_DISCUSSIONS];

    // Filter by Category
    if (selectedCategory !== "all") {
      const catMap: Record<string, string> = {
        career: "Career & Growth",
        "code-review": "Code Review",
        "web3-stellar": "Web3 & Stellar",
        "system-design": "System Design",
        general: "General Discussion",
      };
      const targetName = catMap[selectedCategory];
      if (targetName) {
        result = result.filter((d) => d.category === targetName);
      }
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.excerpt.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort by Tab
    if (activeTab === "trending") {
      result.sort((a, b) => b.likesCount + b.viewsCount - (a.likesCount + a.viewsCount));
    } else if (activeTab === "latest") {
      // Keep natural order or sort
    } else if (activeTab === "my-posts") {
      // Simulated empty or subset
      result = [];
    }

    return result;
  }, [activeTab, selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Banner (#1424) */}
      <CommunityHero onStartDiscussion={() => setIsModalOpen(true)} />

      {/* Main 2-Column Responsive Layout (#1423) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Feed & Discussions (lg:col-span-2) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Feed Tabs (#1426) & Search Filter */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <CommunityFeedTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              discussionsCount={filteredDiscussions.length}
            />

            {/* Search Input Bar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search discussions by keyword, topic, or #tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search discussions"
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Discussion Posts List */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="space-y-4"
          >
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion: DiscussionPost) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="mt-2 text-base font-semibold text-gray-900">
                  No discussions found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery
                    ? `No discussions match "${searchQuery}". Try clearing search filters.`
                    : activeTab === "my-posts"
                    ? "You haven't posted any discussions yet. Start your first conversation!"
                    : "No discussions in this category yet. Be the first to share your thoughts!"}
                </p>
                <div className="mt-6">
                  <StartDiscussionButton onClick={() => setIsModalOpen(true)} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar (lg:col-span-1) */}
        <div className="lg:col-span-1">
          <CommunitySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Start Discussion Mock Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 id="modal-title" className="text-lg font-bold text-gray-900">
                Start a New Discussion
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>
            <div>
              <label htmlFor="discussion-title" className="block text-xs font-semibold text-gray-700 uppercase">
                Title
              </label>
              <input
                id="discussion-title"
                type="text"
                placeholder="What would you like to discuss?"
                className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="discussion-content" className="block text-xs font-semibold text-gray-700 uppercase">
                Details & Context
              </label>
              <textarea
                id="discussion-content"
                rows={4}
                placeholder="Share your question, background context, or problem details..."
                className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Discussion posted successfully!");
                  setIsModalOpen(false);
                }}
                className="rounded-lg bg-purple-700 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-800"
              >
                Publish Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
