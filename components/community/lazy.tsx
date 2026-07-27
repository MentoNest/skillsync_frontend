'use client';

import dynamic from 'next/dynamic';
import React, { memo } from 'react';

/**
 * Lazy-loaded community components with code splitting.
 *
 * Heavy components are loaded only when needed, improving
 * initial page load and Lighthouse performance scores.
 */

function SectionLoader() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg bg-gray-50 p-6" aria-busy="true" aria-label="Loading section">
      <div className="h-5 w-1/3 rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-100" />
      <div className="h-4 w-1/2 rounded bg-gray-100" />
    </div>
  );
}

/** Lazily loaded DiscussionFeed — only imported when community page renders */
export const LazyDiscussionFeed = dynamic(
  () => import('@/components/community/DiscussionFeed'),
  { loading: () => <SectionLoader />, ssr: false }
);

/** Lazily loaded StartDiscussionModal — only imported on interaction */
export const LazyStartDiscussionModal = dynamic(
  () => import('@/components/community/StartDiscussionModal'),
  { loading: () => null, ssr: false }
);

/** Lazily loaded CreateDiscussionForm */
export const LazyCreateDiscussionForm = dynamic(
  () => import('@/components/community/CreateDiscussionForm'),
  { loading: () => <SectionLoader />, ssr: false }
);

/** Lazily loaded FilterBar */
export const LazyFilterBar = dynamic(
  () => import('@/components/community/FilterBar'),
  { loading: () => <SectionLoader />, ssr: false }
);

/**
 * MemoizedDiscussionCard
 *
 * Prevents unnecessary re-renders of discussion cards when parent state changes
 * but individual card props remain the same.
 */
export const MemoizedDiscussionCard = memo(
  dynamic(() => import('@/components/community/DiscussionCard'), { ssr: false })
);
MemoizedDiscussionCard.displayName = 'MemoizedDiscussionCard';

/**
 * Utility: preload a community route for faster navigation.
 * Call on hover/focus of links to prefetch the module.
 */
export function prefetchCommunityRoute(path: string) {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
  }
}
