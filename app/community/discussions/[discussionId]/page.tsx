import { notFound } from "next/navigation";
import { DiscussionDetailView } from "@/components/community/DiscussionDetailView";
import {
  getDiscussion,
  incrementViewCount,
  listRelatedDiscussions,
  listReplies,
  ANONYMOUS_VIEWER_ID,
} from "@/lib/community-store";

interface PageProps {
  params: Promise<{ discussionId: string }>;
}

export default async function DiscussionDetailsPage({ params }: PageProps) {
  const { discussionId } = await params;
  const discussion = getDiscussion(discussionId);
  if (!discussion) {
    notFound();
  }

  incrementViewCount(discussionId);
  const replies = listReplies(discussionId);
  const related = listRelatedDiscussions(discussionId, 5);

  // Demo: treat the discussion author as the viewer when matching cookie is absent
  // so authors can exercise edit/delete in the UI.
  const viewerId = discussion.authorId || ANONYMOUS_VIEWER_ID;

  return (
    <DiscussionDetailView
      discussion={discussion}
      replies={replies}
      related={related}
      viewerId={viewerId}
    />
  );
}
