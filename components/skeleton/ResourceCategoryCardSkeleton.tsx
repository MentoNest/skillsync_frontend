export default function ResourceCategoryCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="rounded-lg bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200" />
      <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
      <div className="mt-3 h-4 w-full rounded bg-gray-200 animate-pulse" />
      <div className="mt-2 h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
      <div className="mt-4 h-4 w-24 rounded bg-gray-200 animate-pulse" />
    </article>
  );
}
