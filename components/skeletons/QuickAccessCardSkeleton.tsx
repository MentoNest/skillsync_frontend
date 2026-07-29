export default function QuickAccessCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-2 shadow">
      <div className="h-9 w-9 rounded bg-slate-200 animate-pulse"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-3 bg-slate-200 rounded w-full animate-pulse"></div>
      <div className="h-3 bg-slate-200 rounded w-4/5 animate-pulse"></div>
    </div>
  );
}
