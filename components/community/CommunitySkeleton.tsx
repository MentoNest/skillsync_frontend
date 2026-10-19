import { cn } from "@/lib/utils";

const pulse = "animate-pulse bg-[var(--border)]/60";

/**
 * Skeleton for the community hero banner.
 * Mirrors the padding and content rhythm of `CommunityHeroBanner` so the
 * real content mounts without a visible layout jump.
 *
 * Purely decorative: the parent loading region owns the status announcement.
 */
export function CommunityHeroSkeleton({ className }: { className?: string }) {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[var(--secondary)]",
        className
      )}
    >
      <div className="relative mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 text-center">
        <div className={cn(pulse, "mx-auto h-9 w-3/5 rounded-lg sm:h-12")} />
        <div className="mx-auto mt-4 max-w-2xl space-y-2 sm:mt-6">
          <div className={cn(pulse, "h-4 w-full rounded sm:h-5")} />
          <div className={cn(pulse, "mx-auto h-4 w-4/5 rounded sm:h-5")} />
        </div>
        <div className={cn(pulse, "mx-auto mt-6 h-12 w-40 rounded-xl sm:mt-8 sm:w-48")} />
      </div>
    </section>
  );
}

/**
 * Skeleton for a single discussion card.
 * Matches the structure of `DiscussionCard`: avatar, author row, title,
 * two-line excerpt, and the engagement stats row. Decorative placeholder.
 */
export function DiscussionCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      aria-hidden="true"
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--background)] p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(pulse, "h-10 w-10 flex-shrink-0 rounded-full")} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className={cn(pulse, "h-4 w-24 rounded")} />
            <div className={cn(pulse, "h-3 w-16 rounded")} />
          </div>
          <div className={cn(pulse, "mt-2 h-5 w-3/4 rounded")} />
          <div className="mt-2 space-y-1.5">
            <div className={cn(pulse, "h-3.5 w-full rounded")} />
            <div className={cn(pulse, "h-3.5 w-5/6 rounded")} />
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className={cn(pulse, "h-4 w-10 rounded")} />
            <div className={cn(pulse, "h-4 w-10 rounded")} />
            <div className={cn(pulse, "h-4 w-10 rounded")} />
            <div className={cn(pulse, "h-5 w-20 rounded-full")} />
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Stack of discussion card skeletons matching the default feed page size.
 * Owns a single status region so screen readers announce loading once.
 */
export function DiscussionFeedSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("space-y-4", className)}
      role="status"
      aria-label="Loading discussions"
    >
      {Array.from({ length: count }).map((_, index) => (
        <DiscussionCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading discussions…</span>
    </div>
  );
}

/**
 * Skeleton for the categories nav in the community sidebar.
 * Mirrors the heading plus category list of `CommunitySidebar`.
 */
export function CategoriesSkeleton({ className }: { className?: string }) {
  return (
    <nav aria-hidden="true" className={cn(className)}>
      <div className={cn(pulse, "mb-3 h-4 w-24 rounded")} />
      <ul className="space-y-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-lg px-3 py-2"
          >
            <div className={cn(pulse, "h-4 w-24 rounded")} />
            <div className={cn(pulse, "h-3 w-6 rounded")} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Skeleton for an upcoming community events list.
 * Uses a card-per-event layout with a date block and title/meta lines.
 */
export function EventsSkeleton({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4",
        className
      )}
    >
      <div className={cn(pulse, "mb-3 h-4 w-32 rounded")} />
      <ul className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className={cn(pulse, "h-12 w-12 flex-shrink-0 rounded-lg")} />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className={cn(pulse, "h-4 w-3/4 rounded")} />
              <div className={cn(pulse, "h-3 w-1/2 rounded")} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Skeleton grid for community statistics.
 * Mirrors the icon/value/label structure of `CommunityStatisticCard`.
 */
export function StatisticsSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <section
      aria-hidden="true"
      className={cn("grid grid-cols-2 gap-4 sm:grid-cols-4", className)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-center"
        >
          <div className={cn(pulse, "h-10 w-10 rounded-lg")} />
          <div className={cn(pulse, "h-7 w-16 rounded")} />
          <div className={cn(pulse, "h-4 w-20 rounded")} />
        </div>
      ))}
    </section>
  );
}

/**
 * Full-page community loading skeleton.
 * Composes the hero, feed, and sidebar skeletons with the same layout
 * containers as `app/community/page.tsx` to prevent layout shift.
 */
export default function CommunityPageSkeleton() {
  return (
    <div
      className="min-h-screen bg-[var(--background)]"
      role="status"
      aria-label="Loading community page"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading — mirrors the header in community/page.tsx */}
        <div aria-hidden="true" className="mb-8">
          <div className={cn(pulse, "h-9 w-48 rounded")} />
          <div className={cn(pulse, "mt-2 h-5 w-80 max-w-full rounded")} />
        </div>

        <CommunityHeroSkeleton />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <main className="min-w-0 flex-1">
            {/* Filter bar — matches the DiscussionFilters chip row + search */}
            <div aria-hidden="true" className="mb-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(pulse, "h-8 w-16 rounded-full")}
                    />
                  ))}
                </div>
                <div className={cn(pulse, "h-10 w-full rounded-lg sm:w-64")} />
              </div>
            </div>

            <DiscussionFeedSkeleton count={4} />
          </main>

          <aside className="w-full flex-shrink-0 lg:w-80">
            <div className="space-y-6">
              <CategoriesSkeleton />
              {/* Community guidelines card */}
              <div
                aria-hidden="true"
                className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4"
              >
                <div className={cn(pulse, "mb-2 h-4 w-40 rounded")} />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(pulse, "h-3.5 w-full rounded")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
        <span className="sr-only">Loading community page…</span>
      </div>
    </div>
  );
}
