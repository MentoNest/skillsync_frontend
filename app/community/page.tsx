import type { Metadata } from "next";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import CommunityMainContent from "@/components/community/CommunityMainContent";
import CommunitySidebar from "@/components/community/CommunitySidebar";

export const metadata: Metadata = {
  title: "Community | SkillSync",
  description: "Discuss, ask questions, and share experiences with mentors and mentees.",
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <CommunityHeroBanner />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <CommunityMainContent />
        <CommunitySidebar />
      </div>
    </div>
  );
}