import LikeButton from "../common/LikeButton";
import ShareButton from "../common/ShareButton";

export interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  repliesCount: number;
  likeCount?: number;
  isPinned?: boolean;
  isLocked?: boolean;
}

interface DiscussionCardProps {
  discussion: Discussion;
}

const DiscussionCard = ({ discussion }: DiscussionCardProps) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {discussion.isPinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                </svg>
                Pinned
              </span>
            )}
            {discussion.isLocked && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700 ring-1 ring-red-200">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
                Locked
              </span>
            )}
          </div>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            {discussion.title}
          </h3>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {discussion.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>Started by {discussion.author}</span>
        <div className="flex items-center gap-2">
          <ShareButton
            url={`/discussions/${discussion.id}`}
            title={discussion.title}
            text={`Check out this discussion: ${discussion.title}`}
          />
          <LikeButton id={`discussion-${discussion.id}`} initialCount={discussion.likeCount ?? 0} />
          <span>{discussion.repliesCount} replies</span>
        </div>
      </div>
    </article>
  );
};

export default DiscussionCard;
