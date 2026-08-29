import type { Metadata } from "next";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import DiscussionFeedContainer from "@/components/community/DiscussionFeedContainer";
import DiscussionForm, {
  type DiscussionFormValues,
} from "@/components/discussions/DiscussionForm";

export const metadata: Metadata = {
  title: "Community | SkillSync",
  description: "Discuss, ask questions, and share experiences with mentors and mentees.",
};

export default function CommunityPage() {
  const handleSubmit = async (values: DiscussionFormValues) => {
    console.log("New discussion submitted:", values);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <CommunityHeroBanner />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <DiscussionForm
          onSubmit={handleSubmit}
          submitLabel="Publish discussion"
        />

        <div className="lg:pt-2">
          <DiscussionFeedContainer />
        </div>
      </div>
    </div>
  );
}
