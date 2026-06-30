import Avatar from '@/components/Avatar';
import type { Comment } from '@/lib/community-types';

interface CommentProps {
  comment: Comment;
  isReply?: boolean;
  onLike?: (id: string) => void;
  onReply?: (id: string) => void;
  showReplyButton?: boolean;
}

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

export default function Comment({ 
  comment, 
  isReply = false, 
  onLike, 
  onReply,
  showReplyButton = true 
}: CommentProps) {
  return (
    <div className={`${isReply ? 'ml-12 mt-3' : 'mb-4'} bg-gray-50 rounded-lg p-4`}>
      <div className="flex items-start gap-3 mb-2">
        <Avatar
          src={comment.author.avatarUrl}
          alt={comment.author.name}
          name={comment.author.name}
          size="sm"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 text-sm">{comment.author.name}</span>
            {comment.author.role && (
              <span className="text-xs text-gray-500">{comment.author.role}</span>
            )}
            <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-11">
        <button
          onClick={() => onLike?.(comment.id)}
          className={`flex items-center gap-1 text-sm hover:text-cyan-600 transition-colors ${comment.isLiked ? 'text-cyan-600' : 'text-gray-500'}`}
        >
          <svg className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {comment.likeCount}
        </button>
        {showReplyButton && !isReply && (
          <button
            onClick={() => onReply?.(comment.id)}
            className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
