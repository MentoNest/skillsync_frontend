import DiscussionCard, { type Discussion } from "./DiscussionCard";

const placeholderDiscussions: Discussion[] = [
  {
    id: "1",
    title: "How do you structure your first mentorship call?",
    excerpt:
      "Looking for tips on setting expectations and goals in the first session with a new mentee.",
    author: "Jane Smith",
    repliesCount: 12,
    likeCount: 5,
    isPinned: true,
  },
  {
    id: "2",
    title: "Best resources for learning system design",
    excerpt:
      "Curious what articles, courses, or books have helped others prepare for system design interviews.",
    author: "John Doe",
    repliesCount: 8,
    likeCount: 9,
  },
  {
    id: "3",
    title: "Balancing mentoring with a full-time job",
    excerpt:
      "Would love to hear how other mentors manage their time and avoid burnout.",
    author: "Sarah Wilson",
    repliesCount: 5,
    likeCount: 2,
    isLocked: true,
  },
];

interface DiscussionFeedContainerProps {
  discussions?: Discussion[];
  isLoading?: boolean;
  error?: string | null;
}

const DiscussionFeedContainer = ({
  discussions = placeholderDiscussions,
  isLoading = false,
  error = null,
}: DiscussionFeedContainerProps) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading && discussions.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          Loading live community updates…
        </div>
      ) : null}

      {!isLoading && discussions.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          No discussions yet. Start the first live thread.
        </div>
      ) : null}

      {discussions.map((discussion) => (
        <DiscussionCard key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
}
