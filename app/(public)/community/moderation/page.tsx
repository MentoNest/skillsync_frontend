import type { Metadata } from "next";
import CommunityModerationDashboard from "../../../../components/community/CommunityModerationDashboard";

export const metadata: Metadata = {
  title: "Community Moderation | SkillSync",
};

export default function CommunityModerationPage() {
  return <CommunityModerationDashboard />;
}
