// Discussion metadata component: time, category, likes, replies (#873)
import React from "react";

interface DiscussionMetadataProps {
  postedAt: string;
  category: string;
  likeCount: number;
  replyCount: number;
}

const DiscussionMetadata = ({
  postedAt,
  category,
  likeCount,
  replyCount,
}: DiscussionMetadataProps) => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
    <time dateTime={postedAt}>{postedAt}</time>
    <span className="text-gray-300">·</span>
    <span className="text-indigo-600 font-medium">{category}</span>
    <span className="text-gray-300">·</span>
    <span className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {likeCount}
    </span>
    <span className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {replyCount}
    </span>
  </div>
);

export default DiscussionMetadata;
