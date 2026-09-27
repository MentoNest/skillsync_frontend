export function ResourceCategorySkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-4 w-20 rounded-full bg-slate-200" />
      <div className="mt-4 h-7 w-3/5 rounded-lg bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="h-10 w-28 rounded-xl bg-slate-200" />
        <div className="h-4 w-16 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export function ResourceCardSkeleton() {
  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm animate-pulse">
      <div className="h-36 w-full bg-slate-200" />
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 rounded-full bg-slate-200" />
          <div className="h-4 w-20 rounded bg-slate-200" />
        </div>
        <div className="h-6 w-4/5 rounded bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function ResourcePageSkeleton({ itemCount = 6 }: { itemCount?: number }) {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 h-4 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="h-12 w-2/3 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 h-12 w-full max-w-md animate-pulse rounded-xl border border-slate-200 bg-white" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: itemCount }).map((_, index) => (
            <ResourceCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ResourceLoadingSkeleton() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 h-4 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="h-12 w-2/3 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ResourceCategorySkeleton key={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ResourceCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
