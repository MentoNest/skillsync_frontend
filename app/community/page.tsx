import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | SkillSync",
  description: "Discuss, ask questions, and share experiences with mentors and mentees.",
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <p className="text-lg font-medium">Community content coming soon.</p>
      </div>
    </div>
  );
}
