"use client";

import CommunityCategoriesSidebar from "@/components/community/CommunityCategoriesSidebar";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import CommunityStatisticsWidget from "@/components/community/CommunityStatisticsWidget";
import DiscussionFeedContainer from "@/components/community/DiscussionFeedContainer";
import UpcomingEventsWidget from "@/components/community/UpcomingEventsWidget";
import DiscussionForm, {
  type DiscussionFormValues,
} from "@/components/discussions/DiscussionForm";
import { notifyCommunityUpdate, useDiscussions } from "@/lib/useDiscussions";

export default function CommunityPage() {
  const { discussions, isLoading, error } = useDiscussions();

  const handleSubmit = async (values: DiscussionFormValues) => {
    const response = await fetch("/api/community/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        category: values.category,
        content: values.content,
        tags: values.tags,
        author: "You",
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || "Unable to publish discussion.");
    }

    notifyCommunityUpdate();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <CommunityHeroBanner />

      <div className="mt-10">
        <DiscussionForm
          onSubmit={handleSubmit}
          submitLabel="Publish discussion"
        />

        <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="order-1 min-w-0">
            <DiscussionFeedContainer
              discussions={discussions}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <aside className="order-2 space-y-5 xl:sticky xl:top-6 xl:pt-1">
            <div className="space-y-5 transition-all duration-300 ease-out">
              <CommunityStatisticsWidget />
              <CommunityCategoriesSidebar />
              <UpcomingEventsWidget />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
