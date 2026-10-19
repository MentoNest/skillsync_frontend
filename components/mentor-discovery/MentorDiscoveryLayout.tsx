import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface MentorDiscoveryLayoutProps {
  /** Filter controls. Shown as a sticky sidebar on desktop, hidden below `lg`
   * where the mobile filter drawer takes over. */
  sidebar: ReactNode;
  /** The mentor listing area. */
  children: ReactNode;
  /** Tailwind `top-*` class for the sticky sidebar, so it clears any fixed
   * header above it. */
  sidebarTopClass?: string;
  /** Callback fired when the scroll sentinel becomes visible. */
  onLoadMore?: () => void;
  /** Whether additional results are currently loading. */
  isLoading?: boolean;
  /** Whether there are more results to load. */
  hasMore?: boolean;
}

/**
 * Two-column mentor discovery layout: filters on the left, results on the
 * right. Collapses to a single full-width column on mobile.
 */
export default function MentorDiscoveryLayout({
  sidebar,
  children,
  sidebarTopClass = "top-24",
  onLoadMore,
  isLoading = false,
  hasMore = true,
}: MentorDiscoveryLayoutProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !onLoadMore || !hasMore || isLoading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        onLoadMore();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside aria-label="Mentor filters" className="hidden lg:block lg:col-span-1">
          <div className={`sticky ${sidebarTopClass} space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1`}>
            {sidebar}
          </div>
        </aside>

        <section aria-label="Mentor results" className="min-w-0 lg:col-span-3">
          {children}

          {onLoadMore && hasMore && (
            <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
          )}

          {onLoadMore && hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onLoadMore}
                disabled={isLoading}
                aria-busy={isLoading}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4zm0 0a8 8 0 01-8 8m0 0a8 8 0 018 8v-4a4 4 0 00-4-4z"
                      />
                    </svg>
                    <span>Loading mentors…</span>
                  </>
                ) : (
                  <span>Load more mentors</span>
                )}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
