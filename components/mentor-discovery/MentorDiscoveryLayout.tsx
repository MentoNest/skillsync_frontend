import type { ReactNode } from "react";

interface MentorDiscoveryLayoutProps {
  /** Filter controls. Shown as a sticky sidebar on desktop, hidden below `lg`
   * where the mobile filter drawer takes over. */
  sidebar: ReactNode;
  /** The mentor listing area. */
  children: ReactNode;
  /** Tailwind `top-*` class for the sticky sidebar, so it clears any fixed
   * header above it. */
  sidebarTopClass?: string;
}

/**
 * Two-column mentor discovery layout: filters on the left, results on the
 * right. Collapses to a single full-width column on mobile.
 */
export default function MentorDiscoveryLayout({
  sidebar,
  children,
  sidebarTopClass = "top-24",
}: MentorDiscoveryLayoutProps) {
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
        </section>
      </div>
    </div>
  );
}
