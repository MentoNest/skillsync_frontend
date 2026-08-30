import DiscussionCard, { type Discussion } from "./DiscussionCard";

// Placeholder data until the real discussion feed and API integration land.
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

const DiscussionFeedContainer = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {placeholderDiscussions.map((discussion) => (
        <DiscussionCard key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
};

export default DiscussionFeedContainer;
