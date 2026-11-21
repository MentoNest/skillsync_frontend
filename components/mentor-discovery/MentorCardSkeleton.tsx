function Bar({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-slate-200 motion-reduce:animate-none ${className}`}
    />
  );
}

export default function MentorCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <Bar className="h-12 w-12 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1 space-y-2">
          <Bar className="h-4 w-2/3" />
          <Bar className="h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Bar className="h-5 w-20 rounded-full" />
        <Bar className="h-5 w-16 rounded-full" />
        <Bar className="h-5 w-14 rounded-full" />
      </div>
      <div className="mt-3 flex-1 space-y-2">
        <Bar className="h-3 w-full" />
        <Bar className="h-3 w-5/6" />
      </div>
      <Bar className="mt-3 h-3 w-2/3" />
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Bar className="h-5 w-16 rounded-full" />
        <Bar className="h-5 w-20 rounded-full" />
      </div>
      <Bar className="mt-4 h-9 w-full rounded-lg" />
    </article>
  );
}
