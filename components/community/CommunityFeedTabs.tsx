"use client";

import React from "react";

export type CommunityFeedTab = "trending" | "latest" | "my-posts";

export interface CommunityFeedTabsProps {
  activeTab: CommunityFeedTab;
  onTabChange: (tab: CommunityFeedTab) => void;
  discussionsCount?: number;
}

interface TabConfig {
  id: CommunityFeedTab;
  label: string;
  icon?: string;
}

const TABS: TabConfig[] = [
  { id: "trending", label: "🔥 Trending" },
  { id: "latest", label: "⚡ Latest" },
  { id: "my-posts", label: "📌 My Posts" },
];

/**
 * Community feed navigation tabs component (#1426).
 * Handles switching between Trending, Latest, and My Posts feed views with
 * complete keyboard accessibility and active styling.
 */
export default function CommunityFeedTabs({
  activeTab,
  onTabChange,
  discussionsCount,
}: CommunityFeedTabsProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-2 pt-2 sm:px-4 rounded-t-xl">
      <div className="flex items-center justify-between">
        <nav
          role="tablist"
          aria-label="Community Feed Views"
          className="-mb-px flex space-x-2 sm:space-x-6 overflow-x-auto"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`whitespace-nowrap border-b-2 py-3 px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 rounded-t-md ${
                  isActive
                    ? "border-purple-600 text-purple-700 font-semibold"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {typeof discussionsCount === "number" && (
          <span className="hidden text-xs text-gray-500 sm:inline-block">
            {discussionsCount} discussions
          </span>
        )}
      </div>
    </div>
  );
}
