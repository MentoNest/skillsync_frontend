export default function QuickAccessCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-2 shadow">
      {/* emoji icon */}
      <div className="h-9 w-9 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      {/* title */}
      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      {/* description */}
      <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  );
}
