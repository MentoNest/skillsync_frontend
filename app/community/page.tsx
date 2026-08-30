"use client";

import type { Metadata } from "next";
import CommunityCategoriesSidebar from "@/components/community/CommunityCategoriesSidebar";

import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";
import CommunityStatisticsWidget from "@/components/community/CommunityStatisticsWidget";
import DiscussionFeedContainer from "@/components/community/DiscussionFeedContainer";
import UpcomingEventsWidget from "@/components/community/UpcomingEventsWidget";
import DiscussionForm, {
  type DiscussionFormValues,
} from "@/components/discussions/DiscussionForm";

export default function CommunityPage() {
  const handleSubmit = async (values: DiscussionFormValues) => {
    console.log("New discussion submitted:", values);
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
