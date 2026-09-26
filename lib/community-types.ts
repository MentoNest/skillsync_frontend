export interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  likeCount: number;
  replyCount: number;
  viewCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  lastReply?: Reply;
}

export interface Reply {
  id: string;
  discussionId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likeCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  discussionCount: number;
  icon?: string;
}

export interface CommunityNotification {
  id: string;
  type: "reply" | "mention" | "category_update" | "event_reminder";
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  discussionId: string;
  reporterId: string;
  reason: string;
  status: "pending" | "reviewed" | "resolved";
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}
