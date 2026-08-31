import type { Metadata } from "next";
import Link from "next/link";
import ModerationDashboard from "@/components/admin/ModerationDashboard";

export const metadata: Metadata = {
  title: "Community Moderation | SkillSync Admin",
  description: "Review and manage community reports and moderation queue.",
};

export default function AdminModerationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-indigo-600"
          >
            <span aria-hidden="true">←</span> Back to community
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Community Moderation
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Review reports, manage flagged content, and keep the community safe.
          </p>
        </div>

        <ModerationDashboard />
      </main>
    </div>
  );
}
