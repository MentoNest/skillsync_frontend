import { cn } from "@/lib/utils";

/**
 * Loading skeletons for the Community module (#997).
 *
 * Each skeleton mirrors the dimensions of the component it replaces so the
 * feed does not jump when real content arrives. Every piece is
 * `aria-hidden` — a `role="status"` wrapper announces "Loading…" once instead
 * of letting assistive tech read dozens of empty boxes. The pulse animation is
 * disabled automatically for users who prefer reduced motion (see
 * `app/globals.css`).
 */

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded bg-[var(--secondary)]", className)}
      aria-hidden="true"
    />
  );
}

/** Mirrors `CommunityHeroBanner`'s rounded 2xl gradient block. */
export function CommunityHeroSkeleton() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl bg-[var(--secondary)]"
      aria-hidden="true"
    >
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto h-10 w-3/4 max-w-md animate-pulse rounded bg-[var(--border)]" />
        <div className="mx-auto mt-6 h-4 w-full max-w-2xl animate-pulse rounded bg-[var(--border)]" />
        <div className="mx-auto mt-2 h-4 w-2/3 max-w-xl animate-pulse rounded bg-[var(--border)]" />
        <div className="mx-auto mt-8 h-12 w-44 animate-pulse rounded-xl bg-[var(--border)]" />
      </div>
    </section>
  );
}

/** Mirrors a single `DiscussionCard` so the feed height stays stable. */
export function DiscussionCardSkeleton() {
  return (
    <article
      className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
      aria-hidden="true"
    >
      <div className="flex items-start gap-3">
        <Shimmer className="h-10 w-10 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Shimmer className="h-4 w-28" />
            <Shimmer className="h-3 w-16" />
          </div>
          <Shimmer className="h-5 w-3/4" />
          <div className="space-y-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
          </div>
          <div className="flex items-center gap-4 pt-1">
            <Shimmer className="h-4 w-10" />
            <Shimmer className="h-4 w-10" />
            <Shimmer className="h-4 w-10" />
            <Shimmer className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

/** A stack of discussion card skeletons. */
export function DiscussionListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading discussions"
    >
      <span className="sr-only">Loading discussions…</span>
      {Array.from({ length: count }, (_, i) => (
        <DiscussionCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Mirrors the `CommunitySidebar` category list. */
export function CommunityCategoriesSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div
      className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
      role="status"
      aria-label="Loading categories"
    >
      <span className="sr-only">Loading categories…</span>
      <Shimmer className="mb-3 h-4 w-24" />
      <ul className="space-y-2" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="flex items-center justify-between gap-2">
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-4 w-6" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Placeholder for the upcoming events sidebar widget. */
export function CommunityEventsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
      role="status"
      aria-label="Loading events"
    >
      <span className="sr-only">Loading events…</span>
      <Shimmer className="mb-3 h-4 w-32" />
      <ul className="space-y-3" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="flex items-start gap-3">
            <Shimmer className="h-10 w-10 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-4 w-3/4" />
              <Shimmer className="h-3 w-1/2" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mirrors a row of `CommunityStatisticCard`s. */
export function CommunityStatisticsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      role="status"
      aria-label="Loading statistics"
    >
      <span className="sr-only">Loading statistics…</span>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
          aria-hidden="true"
        >
          <Shimmer className="h-10 w-10 rounded-lg" />
          <Shimmer className="h-7 w-16" />
          <Shimmer className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

/**
 * Full-page skeleton: hero, statistics, discussion feed and sidebar.
 * Use while the community page's first data request is in flight.
 */
export function CommunityPageSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true">
      <span className="sr-only" role="status">
        Loading community…
      </span>
      <CommunityHeroSkeleton />
      <CommunityStatisticsSkeleton />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <DiscussionListSkeleton />
        </div>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <CommunityCategoriesSkeleton />
        </aside>
      </div>
    </div>
  );
}

export default CommunityPageSkeleton;
