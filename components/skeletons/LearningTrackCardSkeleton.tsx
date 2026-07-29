export default function LearningTrackCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      <div className="w-full aspect-video bg-slate-200 dark:bg-gray-700 animate-pulse" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
        <div className="mt-auto flex gap-4 pt-3">
          <div className="h-3 w-20 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-3 w-16 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="mt-2 h-10 w-full rounded-lg bg-slate-200 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
}
