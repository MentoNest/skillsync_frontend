"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommunityFeedTabs, { FeedView } from "@/components/community/CommunityFeedTabs";

export default function CommunityPage() {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<FeedView>("trending");
  const [myPostsCount] = useState(12); // Mock count - replace with real data

  useEffect(() => {
    if (!isReady) return;
    if (!user) {
      router.replace("/login");
    }
  }, [isReady, user, router]);

  // Show loading state while checking auth
  if (!isReady || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleViewChange = (view: FeedView) => {
    setActiveView(view);
    // Here you would typically fetch different data based on the view
    console.log(`Switching to ${view} view`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Community</h1>
          <p className="mt-2 text-slate-600">
            Connect, share, and learn with fellow mentees and mentors
          </p>
        </div>

        {/* Community Feed Tabs */}
        <CommunityFeedTabs
          activeView={activeView}
          onViewChange={handleViewChange}
          myPostsCount={myPostsCount}
          className="mb-8 rounded-xl overflow-hidden shadow-sm"
        />

        {/* Tab Panels */}
        <div
          role="tabpanel"
          id={`${activeView}-panel`}
          aria-labelledby={`${activeView}-tab`}
        >
          {/* Placeholder content */}
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-16 w-16 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {activeView === "trending" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                )}
                {activeView === "latest" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                )}
                {activeView === "my-posts" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                )}
              </svg>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                {activeView === "trending" && "Trending Discussions"}
                {activeView === "latest" && "Latest Discussions"}
                {activeView === "my-posts" && "Your Posts"}
              </h2>
              <p className="mt-2 text-slate-600">
                {activeView === "trending" &&
                  "See what's popular in the community right now."}
                {activeView === "latest" &&
                  "Stay up to date with the newest discussions."}
                {activeView === "my-posts" &&
                  "View and manage all your community contributions."}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/mentors"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Explore mentors
                </a>
                <a
                  href="/resources"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Browse resources
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
