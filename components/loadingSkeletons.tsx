export const SectionLoadingSkeleton = () => (
  <div className="w-full py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="space-y-8">
        <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse space-y-4"
            >
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const MentorCardSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse space-y-4">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-lg bg-gray-200"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-200 rounded"></div>
    <div className="flex gap-2">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-6 bg-gray-200 rounded-full w-16"></div>
      ))}
    </div>
  </div>
);

export const ArticleCardSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);
