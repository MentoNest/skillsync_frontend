import { Metadata } from "next";
import Link from "next/link";
import SavedDiscussions from "../../../../components/community/SavedDiscussions";

export const metadata: Metadata = {
  title: "Saved Discussions | SkillSync",
  description: "Discussions you bookmarked for later in the SkillSync community.",
};

/** Saved discussions route: /community/saved (#1460). */
export default function SavedDiscussionsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gray-50 pt-16">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-purple-700 focus:shadow-md"
      >
        Skip to main content
      </a>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved discussions</h1>
            <p className="mt-1 text-sm text-gray-600">
              Everything you bookmarked from the community feed.
            </p>
          </div>
          <Link
            href="/community"
            className="rounded-lg border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50"
          >
            Back to community
          </Link>
        </div>
        <SavedDiscussions />
      </div>
    </main>
  );
}
