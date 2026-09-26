export default function MentorCardSkeleton() {
  return (
    <article
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Avatar skeleton */}
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-200" />

          {/* Name & title skeleton */}
          <div className="flex-1 min-w-0 space-y-2 py-1">
            <div className="h-5 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-1/2 bg-slate-200 rounded" />

            {/* Rating skeleton */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-4 h-4 bg-slate-200 rounded" />
              <div className="h-4 w-16 bg-slate-200 rounded" />
            </div>
          </div>
        </div>

        {/* Description skeleton */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 rounded" />
          <div className="h-4 w-2/3 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Skills skeleton */}
      <div className="px-6 pb-4 flex flex-wrap gap-2">
        <div className="h-6 w-20 bg-slate-200 rounded-full" />
        <div className="h-6 w-16 bg-slate-200 rounded-full" />
        <div className="h-6 w-24 bg-slate-200 rounded-full" />
        <div className="h-6 w-14 bg-slate-200 rounded-full" />
      </div>

      {/* CTA skeleton */}
      <div className="mt-auto px-6 pb-6 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 h-10 bg-slate-200 rounded-xl" />
        </div>
        <div className="h-10 w-full bg-slate-200 rounded-xl" />
      </div>
    </article>
  );
}
