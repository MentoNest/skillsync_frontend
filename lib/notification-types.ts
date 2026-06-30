export type NotificationType = 'reply' | 'mention' | 'new_discussion' | 'event_reminder';

export interface CommunityNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  linkHref?: string;
  actorName?: string;
}
