export interface Author {
  id: string;
  name: string;
  avatarUrl?: string | null;
  role?: string;
}

export interface DiscussionMetadata {
  id: string;
  title: string;
  author: Author;
  category: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isTrending?: boolean;
  tags?: string[];
}

export interface DiscussionCardProps {
  discussion: DiscussionMetadata;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  currentUserId?: string;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface Discussion extends DiscussionMetadata {
  content: string;
  comments: Comment[];
}
