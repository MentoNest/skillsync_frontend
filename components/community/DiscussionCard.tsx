import Avatar from '@/components/Avatar';
import CategoryBadge from '@/components/CategoryBadge';
import DiscussionMetadata from './DiscussionMetadata';
import type { DiscussionCardProps } from '@/lib/community-types';

export default function DiscussionCard({ discussion, onLike, onBookmark, onClick }: DiscussionCardProps) {
  const isPinned = discussion.isPinned ?? false;
  const isLocked = discussion.isLocked ?? false;

  return (
    <article
      className={`bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow cursor-pointer relative ${
        isPinned ? 'border-l-4 border-cyan-500 bg-cyan-50/30' : ''
      } ${isLocked ? 'opacity-90' : ''}`}
      onClick={() => onClick?.(discussion.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(discussion.id); }}
      aria-label={`Discussion: ${discussion.title}${isPinned ? ', pinned' : ''}${isLocked ? ', locked' : ''}`}
    >
      {/* Pin and Lock status badges */}
      {(isPinned || isLocked) && (
        <div className="flex items-center gap-2 mb-3">
          {isPinned && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium"
              aria-label="Pinned discussion"
              data-testid="pin-badge"
            >
              {/* Pin icon */}
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
              </svg>
              Pinned
            </span>
          )}
          {isLocked && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium"
              aria-label="Locked discussion"
              data-testid="lock-badge"
            >
              {/* Lock icon */}
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              Locked
            </span>
          )}
        </div>
      )}

      <div className="flex items-start gap-3 mb-3">
        <Avatar
          src={discussion.author.avatarUrl}
          alt={discussion.author.name}
          name={discussion.author.name}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-900 truncate">
              {discussion.author.name}
            </span>
            {discussion.author.role && (
              <span className="text-xs text-gray-500">{discussion.author.role}</span>
            )}
            <CategoryBadge category={discussion.category} />
          </div>
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {discussion.title}
          </h3>
        </div>
      </div>

      {discussion.tags && discussion.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {discussion.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {isLocked && (
        <p className="text-xs text-amber-600 mb-3 flex items-center gap-1" data-testid="locked-notice">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          This discussion is locked — no new replies.
        </p>
      )}

      <DiscussionMetadata
        metadata={discussion}
        onLike={onLike}
        onBookmark={onBookmark}
        disableInteractions={isLocked}
      />
    </article>
  );
}
