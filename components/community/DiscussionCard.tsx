import type { Discussion } from "@/types/discussion";

interface DiscussionCardProps {
  discussion: Discussion;
}

export default function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-200">
          {discussion.category}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {discussion.replyCount} replies
        </span>
      </div>
      <h2 className="mb-2 text-xl font-semibold">{discussion.title}</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        {discussion.content}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        By {discussion.author}
      </p>
    </article>
  );
}
