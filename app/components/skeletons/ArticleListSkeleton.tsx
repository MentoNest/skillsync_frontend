export default function ArticleListSkeleton() {
  return (
    <li>
      <div className="group block rounded-lg border p-4 bg-white">
        <article className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Category Skeleton */}
            <div className="inline-block">
              <div className="h-6 w-24 rounded-full bg-gray-200 animate-pulse" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Meta Skeleton */}
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mt-2" />
          </div>

          {/* Icon Skeleton */}
          <div className="w-4 h-4 bg-gray-200 rounded shrink-0 animate-pulse" />
        </article>
      </div>
    </li>
  );
}
