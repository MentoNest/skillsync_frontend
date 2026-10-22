"use client";

import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

export type FeedView = "trending" | "latest" | "my-posts";

interface CommunityFeedTabsProps {
  activeView: FeedView;
  onViewChange: (view: FeedView) => void;
  myPostsCount?: number;
  className?: string;
}

interface TabConfig {
  id: FeedView;
  label: string;
  icon: ReactNode;
  ariaLabel: string;
}

const TABS: TabConfig[] = [
  {
    id: "trending",
    label: "Trending",
    ariaLabel: "View trending discussions",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    id: "latest",
    label: "Latest",
    ariaLabel: "View latest discussions",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "my-posts",
    label: "My Posts",
    ariaLabel: "View your posts",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

export default function CommunityFeedTabs({
  activeView,
  onViewChange,
  myPostsCount,
  className = "",
}: CommunityFeedTabsProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Focus the tab when keyboard navigation happens
    if (focusedIndex >= 0 && tabRefs.current[focusedIndex]) {
      tabRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : TABS.length - 1;
        break;
      case "ArrowRight":
        event.preventDefault();
        newIndex = index < TABS.length - 1 ? index + 1 : 0;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = TABS.length - 1;
        break;
      default:
        return;
    }

    setFocusedIndex(newIndex);
    onViewChange(TABS[newIndex].id);
  };

  return (
    <div className={`bg-white border-b border-slate-200 ${className}`}>
      <div
        role="tablist"
        aria-label="Community feed views"
        className="flex gap-1 px-4 sm:px-6"
      >
        {TABS.map((tab, index) => {
          const isActive = tab.id === activeView;
          const showCount = tab.id === "my-posts" && myPostsCount !== undefined;

          return (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              ref={(el) => (tabRefs.current[index] = el)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              aria-label={tab.ariaLabel}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onViewChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`
                group relative flex items-center gap-2 px-4 py-3 sm:py-4 text-sm sm:text-base font-medium
                transition-colors duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:z-10
                ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-slate-900"
                }
              `}
            >
              {/* Icon */}
              <span
                className={`
                  transition-colors duration-200
                  ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}
                `}
              >
                {tab.icon}
              </span>

              {/* Label */}
              <span>{tab.label}</span>

              {/* Count Badge (for My Posts) */}
              {showCount && myPostsCount > 0 && (
                <span
                  className={`
                    inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 
                    rounded-full text-xs font-bold tabular-nums
                    ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }
                  `}
                  aria-label={`${myPostsCount} posts`}
                >
                  {myPostsCount > 99 ? "99+" : myPostsCount}
                </span>
              )}

              {/* Active Indicator */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
