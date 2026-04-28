export function LearningTrackCardSkeleton() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm animate-pulse">
      <div className="aspect-[4/3] bg-slate-200" />
      <div className="flex flex-col p-6 gap-3">
        <div className="flex gap-4">
          <div className="h-4 w-20 bg-slate-200 rounded" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-5/6 bg-slate-100 rounded" />
        <div className="mt-auto pt-4 h-10 w-full bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export function ArticleListItemSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-5 w-16 bg-blue-100 rounded-full" />
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="flex gap-3">
          <div className="h-4 w-20 bg-slate-100 rounded" />
          <div className="h-4 w-16 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export function QuickAccessCardSkeleton() {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full mb-3" />
      <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-32 h-3 bg-gray-100 rounded" />
    </div>
  );
}
