import { LearningTrackCardSkeleton, ArticleListItemSkeleton, QuickAccessCardSkeleton } from '@/components/LoadingSkeletons';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Quick Access Skeletons */}
      <div className="mb-10">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <QuickAccessCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Learning Track Skeletons */}
      <div className="mb-10">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <LearningTrackCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Article Skeletons */}
      <div>
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ArticleListItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
