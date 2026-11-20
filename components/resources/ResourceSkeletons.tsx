function Bar({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded bg-gray-200 motion-reduce:animate-none ${className}`} />;
}

function LoadingStatus({ label }: { label: string }) {
  return <p role="status" className="sr-only">{label}</p>;
}

export function CategoryGridSkeleton() {
  return (
    <section className="space-y-4">
      <div aria-hidden="true" className="space-y-4">
        <Bar className="h-7 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex h-full flex-col rounded-xl border p-6">
              <Bar className="mb-3 h-8 w-8" />
              <Bar className="h-6 w-3/4" />
              <Bar className="mt-1 h-5 w-full" />
              <Bar className="mt-1 h-5 w-2/3" />
            </div>
          ))}
        </div>
      </div>
      <LoadingStatus label="Loading resource categories" />
    </section>
  );
}

export function LearningTracksSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div aria-hidden="true">
        <div className="mb-6 flex items-center justify-between">
          <Bar className="h-8 w-72 max-w-full" />
          <Bar className="h-5 w-20" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col overflow-hidden rounded-xl border">
              <Bar className="aspect-video w-full rounded-none" />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <Bar className="h-6 w-20 rounded-full" />
                <Bar className="h-7 w-3/4" />
                <Bar className="h-5 w-full" />
                <Bar className="h-5 w-2/3" />
                <Bar className="h-4 w-1/2" />
                <Bar className="mt-auto h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <LoadingStatus label="Loading featured learning tracks" />
    </section>
  );
}

export function ArticlesSkeleton() {
  return (
    <section className="space-y-6">
      <div aria-hidden="true" className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Bar className="h-8 w-44" />
          <Bar className="h-5 w-20" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex h-full flex-col rounded-xl border p-5">
              <Bar className="h-6 w-3/4" />
              <Bar className="mt-2 h-5 w-full" />
              <Bar className="mt-1 h-5 w-2/3" />
              <div className="mt-auto pt-4"><Bar className="h-4 w-1/2" /></div>
            </div>
          ))}
        </div>
      </div>
      <LoadingStatus label="Loading articles" />
    </section>
  );
}

export function ToolsSkeleton() {
  return (
    <section className="space-y-6">
      <div aria-hidden="true" className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Bar className="h-8 w-40" />
          <Bar className="h-5 w-20" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex h-full flex-col rounded-xl border p-5">
              <Bar className="h-6 w-6" />
              <Bar className="mt-3 h-6 w-3/4" />
              <Bar className="mt-2 h-5 w-full" />
              <Bar className="mt-1 h-5 w-2/3" />
            </div>
          ))}
        </div>
      </div>
      <LoadingStatus label="Loading downloadable tools" />
    </section>
  );
}

export function ResourcesPageSkeleton() {
  return (
    <div className="pt-16">
      <section aria-hidden="true" className="bg-gradient-to-r from-purple-700 to-indigo-600 px-4 py-16 text-center">
        <Bar className="mx-auto h-8 w-2/3 max-w-md sm:h-10 md:h-12" />
        <Bar className="mx-auto mt-4 h-5 w-1/2 max-w-xl sm:h-7" />
      </section>
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10">
        <Bar className="mx-auto h-12 w-full max-w-xl rounded-full" />
        <CategoryGridSkeleton />
      </div>
      <LearningTracksSkeleton />
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16">
        <ArticlesSkeleton />
        <ToolsSkeleton />
      </div>
    </div>
  );
}
