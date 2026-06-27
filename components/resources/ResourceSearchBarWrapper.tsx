'use client';

import dynamic from 'next/dynamic';

const ResourceSearchBar = dynamic(() => import('@/components/ResourceSearchBar'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="relative">
        <div className="h-14 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
      </div>
    </div>
  ),
});

export default function ResourceSearchBarWrapper() {
  return <ResourceSearchBar />;
}
