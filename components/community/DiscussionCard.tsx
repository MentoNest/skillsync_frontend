import LikeButton from "../common/LikeButton";

export interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  repliesCount: number;
  likeCount?: number;
}

interface DiscussionCardProps {
  discussion: Discussion;
}

const DiscussionCard = ({ discussion }: DiscussionCardProps) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {discussion.title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {discussion.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>Started by {discussion.author}</span>
        <div className="flex items-center gap-3">
          <LikeButton id={`discussion-${discussion.id}`} initialCount={discussion.likeCount ?? 0} />
          <span>{discussion.repliesCount} replies</span>
        </div>
      </div>
    </article>
  );
};

export default DiscussionCard;
