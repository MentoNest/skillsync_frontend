import React, { memo } from 'react';
import CategoryBadge from '@/components/CategoryBadge';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Discussion {
  id: string;
  author: string;
  avatar: null | string;
  role: string;
  time: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  likes: number;
  replies: number;
}

export interface DiscussionCardProps {
  post: Discussion;
  onView: () => void;
  onLike: () => void;
  onReply: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

// ── Helpers (module-level — computed once, never recreated) ───────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_GRADIENTS = [
  'from-purple-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
] as const;

function avatarGradient(name: string): string {
  return AVATAR_GRADIENTS[name.length % AVATAR_GRADIENTS.length];
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * DiscussionCard
 *
 * Wrapped in React.memo — only re-renders when its own props change.
 * All action callbacks must be stable references (useCallback at the call site)
 * to keep the memo effective.
 */
const DiscussionCard = memo(function DiscussionCard({
  post,
  onView,
  onLike,
  onReply,
  onShare,
  onBookmark,
}: DiscussionCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Avatar — initials-based, no image request */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient(post.author)} flex items-center justify-center text-white text-sm font-bold`}
          aria-hidden="true"
        >
          {getInitials(post.author)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Author + meta */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900">{post.author}</span>
            <span className="text-xs text-gray-400" aria-hidden="true">·</span>
            <span className="text-xs text-gray-500">{post.role}</span>
            <span className="text-xs text-gray-400" aria-hidden="true">·</span>
            <time className="text-xs text-gray-400">{post.time}</time>
            <CategoryBadge category={post.category} color={post.categoryColor} />
          </div>

          {/* Title — fires discussion_viewed on click */}
          <h3
            className="text-base font-semibold text-gray-900 leading-snug mb-1 hover:text-purple-700 transition-colors cursor-pointer"
            onClick={onView}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{post.excerpt}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            {/* Like */}
            <button
              onClick={onLike}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.likes} likes`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes}
            </button>

            {/* Reply */}
            <button
              onClick={onReply}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label={`${post.replies} replies`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.replies} replies
            </button>

            {/* Share */}
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label="Share discussion"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>

            {/* Bookmark */}
            <button
              onClick={onBookmark}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 transition-colors focus:outline-none focus-visible:underline"
              aria-label="Bookmark discussion"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

DiscussionCard.displayName = 'DiscussionCard';

export default DiscussionCard;
