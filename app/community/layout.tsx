import type { ReactNode } from "react";
import { CommunityProvider } from "@/lib/communityContext";

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <CommunityProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="container mx-auto">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              SkillSync Community
            </p>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </CommunityProvider>
  );
}
