import type { Metadata } from "next";
import MentorDiscoveryPage from "@/components/mentor/MentorDiscoveryPage";

export const metadata: Metadata = {
  title: "Find a Mentor | SkillSync",
  description: "Browse, filter and compare mentors to find the right match for your goals.",
};

export default function MentorsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <MentorDiscoveryPage />
    </main>
  );
}
