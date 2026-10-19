"use client";

import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import { CommunityProvider, useCommunityState } from "@/lib/community-store";

function CommunityContent() {
  const { isConnected, error } = useCommunityState();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Community
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Connect, share, and learn with fellow mentees and mentors
          </p>
          {isConnected && (
            <span className="mt-2 inline-flex items-center gap-1 text-sm text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live updates enabled
            </span>
          )}
        </div>

        <CommunityHeroBanner />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <main className="flex-1 min-w-0">
            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
              >
                {error}
              </div>
            )}

            <CommunityFeed />
          </main>

          <aside className="w-full lg:w-80 flex-shrink-0">
            <CommunitySidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <CommunityProvider>
      <CommunityContent />
    </CommunityProvider>
  );
}
