// Community discussion data types for strong typing throughout the UI (#992)

export type DiscussionCategory =
  | "Frontend"
  | "Backend"
  | "UI/UX"
  | "Career"
  | "General";

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  category: DiscussionCategory;
  replyCount: number;
  createdAt: string;
}

export interface DiscussionFilters {
  query?: string;
  category?: DiscussionCategory | "All";
}
