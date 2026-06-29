import Avatar from '@/components/Avatar';
import CategoryBadge from '@/components/CategoryBadge';
import DiscussionMetadata from './DiscussionMetadata';
import type { DiscussionCardProps } from '@/lib/community-types';

export default function DiscussionCard({ discussion, onLike, onBookmark, onClick }: DiscussionCardProps) {
  return (
    <article
      className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(discussion.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(discussion.id); }}
    >
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

      <DiscussionMetadata metadata={discussion} onLike={onLike} onBookmark={onBookmark} />
    </article>
  );
}
