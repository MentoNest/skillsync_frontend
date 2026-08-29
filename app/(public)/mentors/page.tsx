import type { Metadata } from "next";
import { Suspense } from "react";
import MentorDiscoveryPage from "@/components/mentor/MentorDiscoveryPage";
import { MentorCardSkeletonList } from "@/components/mentor/MentorCardSkeleton";

export const metadata: Metadata = {
  title: "Find a Mentor | SkillSync",
  description: "Browse and filter mentors to find the right match for your goals.",
};

export default function MentorsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <Suspense fallback={<MentorCardSkeletonList count={6} />}>
        <MentorDiscoveryPage />
      </Suspense>
    </main>
  );
}