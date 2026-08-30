"use client";

import { useCallback } from "react";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import CommunityStatisticsWidget from "@/components/community/CommunityStatisticsWidget";
import DiscussionFeedContainer from "@/components/community/DiscussionFeedContainer";
import UpcomingEventsWidget from "@/components/community/UpcomingEventsWidget";
import CommunityCategoriesSidebar from "@/components/community/CommunityCategoriesSidebar";
import DiscussionForm, {
  type DiscussionFormValues,
} from "@/components/discussions/DiscussionForm";
import { useCommunityAnalytics } from "@/lib/useCommunityAnalytics";

export default function CommunityPage() {
  const { trackPost } = useCommunityAnalytics();

  const handleSubmit = useCallback(
    async (values: DiscussionFormValues) => {
      trackPost(values.category);
      // In a real app, this would POST to the API
      console.log("New discussion submitted:", values);
    },
    [trackPost]
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <CommunityHeroBanner />

      <div className="mt-10">
        <DiscussionForm onSubmit={handleSubmit} submitLabel="Publish discussion" />

        <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="order-1 min-w-0">
            <DiscussionFeedContainer />
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
