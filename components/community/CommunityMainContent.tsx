// Main content column for the Community page: tabs + discussion list (#867)
"use client";
import { useState } from "react";
import CommunityTabs, { type CommunityTabId } from "./CommunityTabs";
import DiscussionFeedContainer from "./DiscussionFeedContainer";
import CommunityEmptyState from "./CommunityEmptyState";
import DiscussionForm, {
  type DiscussionFormValues,
} from "@/components/discussions/DiscussionForm";

const CommunityMainContent = () => {
  const [activeTab, setActiveTab] = useState<CommunityTabId>("discussions");

  const handleSubmit = async (values: DiscussionFormValues) => {
    // TODO: wire up to the discussions API once it exists.
    console.log("New discussion submitted:", values);
  };

  return (
    <div className="flex flex-col gap-6">
      <CommunityTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "discussions" && (
        <div className="flex flex-col gap-6">
          <DiscussionForm onSubmit={handleSubmit} submitLabel="Publish discussion" />
          <DiscussionFeedContainer />
        </div>
      )}

      {activeTab === "trending" && <DiscussionFeedContainer />}

      {activeTab === "my-posts" && <CommunityEmptyState />}
    </div>
  );
};

export default CommunityMainContent;