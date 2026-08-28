import type { Metadata } from "next";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import DiscussionFeedContainer from "@/components/community/DiscussionFeedContainer";

export const metadata: Metadata = {
  title: "Community | SkillSync",
  description: "Discuss, ask questions, and share experiences with mentors and mentees.",
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <CommunityHeroBanner />

      <div className="mt-10">
        <DiscussionFeedContainer />
      </div>
    </div>
  );
}
