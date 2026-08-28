import type { Metadata } from "next";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";

export const metadata: Metadata = {
  title: "Community | SkillSync",
  description: "Discuss, ask questions, and share experiences with mentors and mentees.",
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <CommunityHeroBanner />

      <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <p className="text-lg font-medium">More community content coming soon.</p>
      </div>
    </div>
  );
}
