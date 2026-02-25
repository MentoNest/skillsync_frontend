export default function LearningTrackCardSkeleton() {
  return (
    <div className="track-card">
      {/* Image Skeleton */}
      <div className="track-image-wrapper relative">
        <div className="track-image bg-gray-300 animate-pulse" style={{ height: "200px" }} />
        <div className="track-category absolute top-3 left-3 h-6 w-16 bg-gray-400 rounded animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="track-content">
        {/* Title Skeleton */}
        <div className="h-6 w-4/5 bg-gray-300 rounded animate-pulse mb-3" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Meta Skeleton */}
        <div className="track-meta mb-4">
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
}
