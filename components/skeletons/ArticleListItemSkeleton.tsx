export default function ArticleListItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 py-4 px-2">
      <div className="flex flex-col gap-2 flex-1">
        {/* category */}
        <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        {/* title */}
        <div className="h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        {/* author · read time */}
        <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      {/* arrow icon placeholder */}
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  );
}
