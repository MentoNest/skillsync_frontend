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
    <div className="bg-slate-50" aria-busy="true">
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
    </div>
  );
}

/**
 * Placeholder mirroring `app/(public)/resources/page.tsx`.
 *
 * The acceptance criterion for this is "skeletons prevent layout shifts", and a
 * skeleton only does that if it occupies roughly the space the real content will.
 * The previous version rendered a generic header plus a flat grid of cards, while
 * the real page is: a tall gradient hero, a four-tile quick-access bar, a
 * featured-tracks section, a featured-articles section, three category sections
 * each with a heading and a "View all" link, a tools section, and a centred
 * closing CTA. Nothing about the two lined up, so the page jumped on every
 * navigation to it.
 *
 * Every block below therefore has a counterpart on the real page, in the same
 * order and at comparable heights. Section heights stay fixed where the real
 * content is variable so the surrounding rhythm does not move.
 */
export default function ResourceLoadingSkeleton() {
  return (
    <div className="bg-white" aria-busy="true">
      {/* Hero — gradient band, not a white page */}
      <div className="overflow-hidden bg-gradient-to-br from-violet-800 via-purple-700 to-fuchsia-700 py-16 sm:py-20 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="h-6 w-40 rounded-full bg-white/20" />
            <div className="h-14 w-2/3 rounded-2xl bg-white/25 sm:h-16" />
            <div className="h-5 w-full rounded bg-white/15" />
            <div className="h-5 w-4/5 rounded bg-white/15" />
          </div>
        </div>
      </div>

      {/* Quick access — 4 across on desktop, 2 on tablet, 1 on mobile */}
      <div className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-4 w-24 rounded bg-slate-200 animate-pulse mb-4" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 animate-pulse"
              >
                <span className="min-w-0 space-y-2">
                  <span className="block h-4 w-2/3 rounded bg-slate-200" />
                  <span className="block h-3 w-full rounded bg-slate-100" />
                </span>
                <span className="shrink-0 h-3 w-3 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured learning tracks — heading row + 3 cards */}
      <div className="py-16 lg:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonSectionHeader />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <FeaturedTrackCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured articles — heading row + 2 cards */}
      <div className="py-16 lg:py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonSectionHeader />
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 animate-pulse sm:gap-5 sm:p-6"
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                  <div className="h-5 w-4/5 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category sections — heading + "View all" + 3 cards each */}
      {["guides", "articles", "sessions"].map((id) => (
        <div
          key={id}
          className="py-16 lg:py-20 border-b border-slate-200 last:border-b-0 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <div className="h-8 w-2/5 rounded-xl bg-slate-200 animate-pulse" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-3/4 rounded bg-slate-100" />
              </div>
              <div className="h-9 w-24 shrink-0 self-start rounded-full bg-slate-100 animate-pulse sm:self-auto" />
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {Array.from({ length: 3 }).map((_, index) => (
                <ResourceCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Tools */}
      <div className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonSectionHeader />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ToolCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Closing CTA — centred, two buttons */}
      <div className="py-16 lg:py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto h-8 w-2/3 rounded-xl bg-slate-200 animate-pulse" />
          <div className="mx-auto mt-4 h-4 w-4/5 rounded bg-slate-100" />
          <div className="mx-auto mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <div className="h-14 w-full rounded-xl bg-slate-200 animate-pulse sm:w-40" />
            <div className="h-14 w-full rounded-xl border border-slate-200 bg-white animate-pulse sm:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Heading + "View all" row, matching `ResourceSectionHeader`. */
function SkeletonSectionHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-3">
        <div className="h-3 w-28 rounded-full bg-indigo-100 animate-pulse" />
        <div className="h-8 w-2/5 rounded-xl bg-slate-200 animate-pulse" />
        <div className="h-4 w-full rounded bg-slate-100" />
      </div>
      <div className="h-9 w-24 shrink-0 self-start rounded-full border border-slate-200 bg-white animate-pulse sm:self-auto" />
    </div>
  );
}

/** Matches the featured-track card: icon block, title, three text lines. */
function FeaturedTrackCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 animate-pulse">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="h-10 w-10 rounded-xl bg-indigo-100" />
        <span className="h-6 w-20 rounded-full bg-slate-100" />
      </div>
      <h3 className="h-5 w-4/5 rounded bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-5/6 rounded bg-slate-100" />
        <div className="h-4 w-2/3 rounded bg-slate-100" />
      </div>
    </article>
  );
}

/** Matches `ToolCard`: icon, title, two lines, and a trailing link row. */
export function ToolCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 animate-pulse">
      <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <span className="h-5 w-5 rounded bg-slate-200" />
      </span>
      <h3 className="h-5 w-3/5 rounded bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-4/5 rounded bg-slate-100" />
      </div>
      <div className="mt-6 h-4 w-2/5 rounded bg-slate-200" />
    </article>
  );
}
