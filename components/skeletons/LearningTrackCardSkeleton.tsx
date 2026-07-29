export default function LearningTrackCardSkeleton() {
  return (
    <div className="group block h-full">
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-44 w-full overflow-hidden bg-slate-200 animate-pulse"></div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
          <div className="mt-auto flex items-center gap-4 pt-3">
            <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
