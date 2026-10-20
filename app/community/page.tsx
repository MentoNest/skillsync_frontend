"use client";

import { useCallback, useState } from "react";
import { useOptionalAuth } from "@/components/auth/AuthProvider";
import CommunityFeedTabs, {
  type FeedView,
} from "@/components/community/CommunityFeedTabs";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import { CommunityProvider, useCommunity } from "@/components/community/CommunityProvider";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { CommunityToast } from "@/components/community/CommunityToast";
import StartDiscussionModal from "@/components/community/StartDiscussionModal";
import { trackDiscussionCreated } from "@/lib/community-analytics";
import {
  isCommunityCategoryId,
  type Discussion,
  type DiscussionSort,
} from "@/lib/community-types";

function CommunityPageContent() {
  const auth = useOptionalAuth();
  const {
    discussions,
    events,
    statistics,
    filters,
    isLoading,
    isLoadingMore,
    isLoadingOverview,
    hasMore,
    error,
    overviewError,
    setCategory,
    setSearchQuery,
    setSortBy,
    loadMore,
    refresh,
    refreshOverview,
    registerForEvent,
    loadMoreRef,
  } = useCommunity();

  const [activeView, setActiveView] = useState<FeedView>("trending");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const userId = auth?.user?.id;
  const myDiscussions = userId
    ? discussions.filter((discussion) => discussion.authorId === userId)
    : [];
  const visibleDiscussions =
    activeView === "my-posts" ? myDiscussions : discussions;

  const handleViewChange = useCallback(
    (view: FeedView) => {
      setActiveView(view);
      const sort: DiscussionSort = view === "trending" ? "trending" : "latest";
      setSortBy(sort);
    },
    [setSortBy]
  );

  const handleDiscussionCreated = useCallback(
    (created: Discussion) => {
      setIsComposerOpen(false);
      setToastMessage("Your discussion was published.");
      trackDiscussionCreated(created.id, created.category);
      refresh();
    },
    [refresh]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <CommunityHeroBanner
            onStartDiscussion={() => setIsComposerOpen(true)}
          />
        </div>

        <CommunityFeedTabs
          activeView={activeView}
          onViewChange={handleViewChange}
          myPostsCount={myDiscussions.length}
          className="mb-6 overflow-hidden rounded-xl border border-slate-200 shadow-sm"
        />

        <div
          role="tabpanel"
          id={`${activeView}-panel`}
          aria-labelledby={`${activeView}-tab`}
          className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8"
        >
          <main className="min-w-0">
            <CommunityFeed
              discussions={visibleDiscussions}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              selectedCategory={filters.selectedCategory}
              searchQuery={filters.searchQuery}
              sortBy={filters.sortBy}
              onCategoryChange={setCategory}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              onLoadMore={loadMore}
              error={error}
              onRetry={refresh}
              onStartDiscussion={() => setIsComposerOpen(true)}
              loadMoreRef={loadMoreRef}
            />
          </main>

          <CommunitySidebar
            selectedCategory={filters.selectedCategory}
            onCategoryChange={setCategory}
            events={events}
            statistics={statistics}
            isLoadingStatistics={isLoadingOverview}
            overviewError={overviewError}
            onRetryOverview={refreshOverview}
            isRetryingOverview={isLoadingOverview}
            onRegisterForEvent={registerForEvent}
          />
        </div>
      </div>

      <StartDiscussionModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onCreated={handleDiscussionCreated}
        defaultCategory={
          isCommunityCategoryId(filters.selectedCategory)
            ? filters.selectedCategory
            : undefined
        }
      />

      {toastMessage ? (
        <CommunityToast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
        />
      ) : null}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <CommunityProvider>
      <CommunityPageContent />
    </CommunityProvider>
  );
}
