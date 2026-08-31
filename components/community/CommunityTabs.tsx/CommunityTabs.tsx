// Tabs for the Community page main content area (#867)
"use client";
import React from "react";

export type CommunityTabId = "discussions" | "trending" | "my-posts";

interface CommunityTab {
  id: CommunityTabId;
  label: string;
}

const TABS: CommunityTab[] = [
  { id: "discussions", label: "Discussions" },
  { id: "trending", label: "Trending" },
  { id: "my-posts", label: "My Posts" },
];

interface CommunityTabsProps {
  activeTab: CommunityTabId;
  onChange: (tab: CommunityTabId) => void;
}

const CommunityTabs = ({ activeTab, onChange }: CommunityTabsProps) => (
  <div
    role="tablist"
    aria-label="Community sections"
    className="flex gap-1 overflow-x-auto border-b border-gray-200"
  >
    {TABS.map((tab) => {
      const isActive = tab.id === activeTab;
      return (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(tab.id)}
          className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 ${
            isActive
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);

export default CommunityTabs;