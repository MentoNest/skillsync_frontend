import type { ReactNode } from "react";
import NotificationBell from "@/components/common/NotificationBell";

/**
 * Layout for the authenticated Community module (#866).
 *
 * TODO: There is no shared authenticated dashboard layout or auth/session
 * system in the app yet (no middleware, no session cookie, no role check).
 * This layout is a placeholder shell that mimics where that dashboard chrome
 * will live. Once the real authenticated dashboard layout and route
 * protection land, replace this with that shared layout and add the actual
 * auth guard (e.g. a middleware redirect for unauthenticated users) here.
 */
export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            SkillSync dashboard
          </p>
          <NotificationBell />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
