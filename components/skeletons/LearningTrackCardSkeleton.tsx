export default function LearningTrackCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow overflow-hidden flex flex-col">
      {/* image placeholder — same aspect-video as real card */}
      <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="p-5 flex flex-col flex-1 gap-2">
        {/* category badge */}
        <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        {/* title */}
        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        {/* description lines */}
        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        {/* meta row */}
        <div className="flex gap-4 mt-2">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        {/* button */}
        <div className="mt-4 h-9 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
}
