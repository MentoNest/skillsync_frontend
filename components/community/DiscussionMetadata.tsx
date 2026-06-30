import { DiscussionMetadata as Metadata } from '@/lib/community-types';

interface Props {
  metadata: Metadata;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  disableInteractions?: boolean;
}

export default function DiscussionMetadata({ metadata, onLike, onBookmark, disableInteractions = false }: Props) {
  const timeAgo = (date: string) => {
    const now = Date.now();
    const then = new Date(date).getTime();
    const diffMs = now - then;
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <button
          onClick={() => !disableInteractions && onLike?.(metadata.id)}
          className={`flex items-center gap-1 transition-colors ${
            disableInteractions
              ? 'text-gray-400 cursor-not-allowed'
              : `hover:text-cyan-600 ${metadata.isLiked ? 'text-cyan-600' : ''}`
          }`}
          aria-label={metadata.isLiked ? 'Unlike' : 'Like'}
          disabled={disableInteractions}
        >
          <svg className="w-4 h-4" fill={metadata.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {metadata.likeCount}
        </button>
      </span>

      <span className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {metadata.commentCount}
      </span>

      <span className="flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {metadata.viewCount}
      </span>

      <span className="text-xs">{timeAgo(metadata.createdAt)}</span>

      <button
        onClick={() => !disableInteractions && onBookmark?.(metadata.id)}
        className={`ml-auto transition-colors ${
          disableInteractions
            ? 'text-gray-300 cursor-not-allowed'
            : `hover:text-cyan-600 ${metadata.isBookmarked ? 'text-cyan-600' : ''}`
        }`}
        aria-label={metadata.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        disabled={disableInteractions}
      >
        <svg className="w-4 h-4" fill={metadata.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>
  );
}
