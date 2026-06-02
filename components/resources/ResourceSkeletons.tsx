export function LearningTrackCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm animate-pulse">
      <div className="aspect-[16/10] w-full bg-slate-200" />
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="space-y-3">
          <div className="h-5 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
        </div>
        <div className="flex gap-3">
          <div className="h-8 w-24 rounded-full bg-slate-200" />
          <div className="h-8 w-24 rounded-full bg-slate-200" />
        </div>
        <div className="mt-auto h-10 w-full rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export function ArticleListItemSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm animate-pulse p-6">
      <div className="h-5 w-20 rounded-full bg-slate-200 mb-4" />
      <div className="h-6 w-3/4 rounded bg-slate-200 mb-2" />
      <div className="h-4 w-1/2 rounded bg-slate-200 mt-4" />
    </div>
  );
}

export function QuickAccessCardSkeleton() {
  return (
    <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="h-12 w-12 rounded-xl bg-slate-200" />
      <div className="space-y-2 w-full">
        <div className="h-5 w-1/2 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-4/5 rounded bg-slate-200" />
      </div>
    </div>
  );
}
