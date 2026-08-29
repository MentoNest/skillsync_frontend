// Loading skeletons for Community page sections (#887)
import React from "react";

export const CommunityHeroSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-2xl h-48 w-full" />
);

export const DiscussionCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse flex flex-col gap-3">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-full" />
    <div className="h-3 bg-gray-200 rounded w-5/6" />
    <div className="flex gap-2 pt-1">
      <div className="h-5 bg-gray-200 rounded-full w-20" />
      <div className="h-5 bg-gray-200 rounded-full w-16" />
      <div className="h-5 bg-gray-200 rounded-full w-12" />
    </div>
  </div>
);

export const DiscussionCardSkeletonList = ({ count = 4 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <DiscussionCardSkeleton key={i} />
    ))}
  </>
);

export const CategoriesSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
    <div className="space-y-2">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="h-7 bg-gray-200 rounded-lg" />
      ))}
    </div>
  </div>
);

export const EventsSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
    <div className="space-y-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-7 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export const StatisticsSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-3 space-y-1">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  </div>
);
