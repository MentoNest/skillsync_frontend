import {
  COMMUNITY_CATEGORY_IDS,
  buildDiscussionPath,
  type Comment,
  type CommunityCategoryId,
  type CommunityMember,
  type Discussion,
  type Reply,
  type Report,
  type SavedDiscussion,
} from "./community-types";

/**
 * In-memory community store.
 *
 * The community module currently runs on generated data (see the discussions
 * route). Social state added by #1013 (bookmarks), #1014 (category follows),
 * #1015 (user follows) and #1016 (shares) needs to survive a single request
 * round-trip, so it is kept in this module-level store instead of being
 * recomputed per request. Swapping this module for a database client later
 * keeps the route handlers untouched because they only use the exported
 * functions below.
 */

/** Used when no session can be resolved (signed-out / demo browsing). */
export const ANONYMOUS_VIEWER_ID = "current-user";

const AUTH_USER_COOKIE = "skillsync-user-id";

const discussionSeed: Array<Omit<Discussion, "shareCount">> = Array.from(
  { length: 25 },
  (_, i) => ({
    id: `discussion-${i + 1}`,
    title: `Discussion ${i + 1}: ${
      [
        "Getting started with React",
        "Best practices for mentoring",
        "Career growth tips",
        "Industry trends",
        "Networking strategies",
      ][i % 5]
    }`,
    content: `This is the content of discussion ${i + 1}. It contains valuable insights and information.`,
    authorId: `user-${(i % 5) + 1}`,
    authorName: ["Alice Johnson", "Bob Smith", "Carol Williams", "David Brown", "Eve Davis"][i % 5],
    authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    category: COMMUNITY_CATEGORY_IDS[i % 5],
    tags: ["react", "mentoring", "career"],
    likeCount: Math.floor(Math.random() * 50),
    replyCount: Math.floor(Math.random() * 20),
    viewCount: Math.floor(Math.random() * 200),
    isPinned: i < 2,
    isLocked: false,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
  })
);

const memberSeed: Array<Omit<CommunityMember, "isFollowing">> = [
  {
    id: "user-1",
    name: "Alice Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=0",
    headline: "Frontend engineer, React & design systems",
    followerCount: 128,
    discussionCount: 34,
  },
  {
    id: "user-2",
    name: "Bob Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    headline: "Engineering manager, career coaching",
    followerCount: 96,
    discussionCount: 21,
  },
  {
    id: "user-3",
    name: "Carol Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    headline: "Staff engineer, distributed systems",
    followerCount: 74,
    discussionCount: 18,
  },
  {
    id: "user-4",
    name: "David Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    headline: "Product designer, mentoring new designers",
    followerCount: 52,
    discussionCount: 12,
  },
  {
    id: "user-5",
    name: "Eve Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    headline: "Community announcements and events",
    followerCount: 41,
    discussionCount: 9,
  },
];

interface CommunityStore {
  discussions: Discussion[];
  members: Map<string, Omit<CommunityMember, "isFollowing">>;
  /** userId -> (discussionId -> ISO timestamp the discussion was bookmarked) */
  bookmarks: Map<string, Map<string, string>>;
  /** userId -> set of followed user ids */
  followingUsers: Map<string, Set<string>>;
  /** userId -> set of followed category ids */
  followingCategories: Map<string, Set<CommunityCategoryId>>;
  /** Reports: id -> Report */
  reports: Map<string, Report>;
  /** userId -> set of liked discussion ids (#1011) */
  likes: Map<string, Set<string>>;
  /** discussionId -> flat comments (#1008–#1010) */
  comments: Map<string, Comment[]>;
}

function createStore(): CommunityStore {
  return {
    discussions: discussionSeed.map((discussion) => ({
      ...discussion,
      shareCount: 0,
    })),
    members: new Map(memberSeed.map((member) => [member.id, member] as const)),
    bookmarks: new Map(),
    followingUsers: new Map(),
    followingCategories: new Map(),
    reports: new Map(),
    likes: new Map(),
    comments: new Map(),
  };
}

// Survive dev-mode module reloads so bookmark/follow state is not reset on
// every hot reload while developing.
const globalStore = globalThis as typeof globalThis & {
  __communityStore?: CommunityStore;
};

const store: CommunityStore = globalStore.__communityStore ?? createStore();
globalStore.__communityStore = store;

/** Minimal request shape needed to identify the viewer (NextRequest satisfies it). */
export interface ViewerRequest {
  headers: Headers;
  cookies: { get(name: string): { value: string } | undefined };
}

/**
 * Resolve the viewer behind a request. Reads the `x-user-id` header used by the
 * browser client and falls back to a cookie, then to the shared demo viewer.
 */
export function resolveViewerId(request: ViewerRequest): string {
  const headerId = request.headers.get("x-user-id");
  if (headerId) return headerId;

  const cookieId = request.cookies.get(AUTH_USER_COOKIE)?.value;
  if (cookieId) return cookieId;

  return ANONYMOUS_VIEWER_ID;
}

export function listDiscussions(): Discussion[] {
  return store.discussions;
}

export function getDiscussion(id: string): Discussion | undefined {
  return store.discussions.find((discussion) => discussion.id === id);
}

export function getMember(id: string): Omit<CommunityMember, "isFollowing"> | undefined {
  return store.members.get(id);
}

export function createDiscussion(
  input: Pick<Discussion, "title" | "content" | "category" | "tags"> & {
    authorId: string;
    authorName: string;
  }
): Discussion {
  const timestamp = new Date().toISOString();
  const discussion: Discussion = {
    id: `discussion-${Date.now()}`,
    title: input.title,
    content: input.content,
    authorId: input.authorId,
    authorName: input.authorName,
    category: input.category,
    tags: input.tags,
    likeCount: 0,
    replyCount: 0,
    viewCount: 0,
    isPinned: false,
    isLocked: false,
    shareCount: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.discussions.unshift(discussion);

  const author = store.members.get(input.authorId);
  if (author) author.discussionCount += 1;

  return discussion;
}

/* -------------------------------------------------------------------------- */
/* Bookmarks (#1013)                                                          */
/* -------------------------------------------------------------------------- */

function bookmarksFor(userId: string): Map<string, string> {
  let bookmarks = store.bookmarks.get(userId);
  if (!bookmarks) {
    bookmarks = new Map();
    store.bookmarks.set(userId, bookmarks);
  }
  return bookmarks;
}

export function isBookmarked(userId: string, discussionId: string): boolean {
  return bookmarksFor(userId).has(discussionId);
}

/** Add a bookmark. Idempotent, and keeps the original saved timestamp. */
export function addBookmark(userId: string, discussionId: string): string {
  const bookmarks = bookmarksFor(userId);
  const existing = bookmarks.get(discussionId);
  if (existing) return existing;

  const savedAt = new Date().toISOString();
  bookmarks.set(discussionId, savedAt);
  return savedAt;
}

export function removeBookmark(userId: string, discussionId: string): boolean {
  return bookmarksFor(userId).delete(discussionId);
}

/** Saved discussions for a user, most recently saved first. */
export function listSavedDiscussions(userId: string): SavedDiscussion[] {
  const saved = [...bookmarksFor(userId).entries()].sort((a, b) =>
    b[1].localeCompare(a[1])
  );

  const results: SavedDiscussion[] = [];
  for (const [discussionId, savedAt] of saved) {
    const discussion = getDiscussion(discussionId);
    if (!discussion) continue; // bookmark points at a removed discussion
    results.push({ ...discussion, isBookmarked: true, savedAt });
  }
  return results;
}

/* -------------------------------------------------------------------------- */
/* User follows (#1015)                                                       */
/* -------------------------------------------------------------------------- */

function followingUsersFor(userId: string): Set<string> {
  let following = store.followingUsers.get(userId);
  if (!following) {
    following = new Set();
    store.followingUsers.set(userId, following);
  }
  return following;
}

export function isFollowingUser(userId: string, targetId: string): boolean {
  return followingUsersFor(userId).has(targetId);
}

export function followUser(userId: string, targetId: string): boolean {
  if (userId === targetId) return false;
  followingUsersFor(userId).add(targetId);
  return true;
}

export function unfollowUser(userId: string, targetId: string): boolean {
  return followingUsersFor(userId).delete(targetId);
}

export function listFollowedUsers(userId: string): CommunityMember[] {
  return [...followingUsersFor(userId)]
    .map((targetId) => {
      const member = store.members.get(targetId);
      return member ? { ...member, isFollowing: true } : null;
    })
    .filter((member): member is CommunityMember => member !== null)
    .sort((a, b) => b.followerCount - a.followerCount);
}

/* -------------------------------------------------------------------------- */
/* Category follows (#1014)                                                   */
/* -------------------------------------------------------------------------- */

function followingCategoriesFor(userId: string): Set<CommunityCategoryId> {
  let following = store.followingCategories.get(userId);
  if (!following) {
    following = new Set();
    store.followingCategories.set(userId, following);
  }
  return following;
}

export function isFollowingCategory(
  userId: string,
  categoryId: CommunityCategoryId
): boolean {
  return followingCategoriesFor(userId).has(categoryId);
}

export function followCategory(
  userId: string,
  categoryId: CommunityCategoryId
): boolean {
  followingCategoriesFor(userId).add(categoryId);
  return true;
}

export function unfollowCategory(
  userId: string,
  categoryId: CommunityCategoryId
): boolean {
  return followingCategoriesFor(userId).delete(categoryId);
}

/** Followed category ids in canonical display order. */
export function listFollowedCategories(userId: string): CommunityCategoryId[] {
  const following = followingCategoriesFor(userId);
  return COMMUNITY_CATEGORY_IDS.filter((categoryId) => following.has(categoryId));
}

/* -------------------------------------------------------------------------- */
/* Shares (#1016)                                                             */
/* -------------------------------------------------------------------------- */

/** Record a share and return the running count for that discussion. */
export function recordShare(discussion: Discussion): number {
  discussion.shareCount = (discussion.shareCount ?? 0) + 1;
  discussion.updatedAt = new Date().toISOString();
  return discussion.shareCount;
}

/** Absolute share URL for a discussion, honouring the incoming request host. */
export function buildShareUrl(
  discussion: Discussion,
  request: { url: string }
): string {
  return new URL(buildDiscussionPath(discussion), request.url).toString();
}

/* -------------------------------------------------------------------------- */
/* Reports                                                                    */
/* -------------------------------------------------------------------------- */

const VALID_REPORT_REASONS = [
  "spam",
  "harassment",
  "offensive_content",
  "misinformation",
  "other",
] as const;

export type ReportReason = (typeof VALID_REPORT_REASONS)[number];

function isValidReportReason(reason: string): reason is ReportReason {
  return VALID_REPORT_REASONS.includes(reason as ReportReason);
}

export function createReport(
  input: {
    discussionId: string;
    reporterId: string;
    reason: string;
  }
): Report {
  if (!getDiscussion(input.discussionId)) {
    throw new Error("Discussion not found");
  }

  if (!isValidReportReason(input.reason)) {
    throw new Error("Invalid report reason");
  }

  const report: Report = {
    id: `report-${Date.now()}`,
    discussionId: input.discussionId,
    reporterId: input.reporterId,
    reason: input.reason,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  store.reports.set(report.id, report);
  return report;
}

export function listReports(): Report[] {
  return [...store.reports.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getReport(id: string): Report | undefined {
  return store.reports.get(id);
}

export function resolveReport(
  id: string,
  action: "dismiss" | "remove_content" | "warn_user",
  resolvedBy: string
): Report | undefined {
  const report = store.reports.get(id);
  if (!report) return undefined;

  report.status = "resolved";
  report.resolvedAt = new Date().toISOString();
  report.resolvedBy = resolvedBy;
  return report;
}

/* -------------------------------------------------------------------------- */
/* Likes (#1011)                                                              */
/* -------------------------------------------------------------------------- */

function likesFor(userId: string): Set<string> {
  let set = store.likes.get(userId);
  if (!set) {
    set = new Set();
    store.likes.set(userId, set);
  }
  return set;
}

export function isDiscussionLiked(userId: string, discussionId: string): boolean {
  return likesFor(userId).has(discussionId);
}

/** Toggle like. Returns the new liked state and updated likeCount. */
export function toggleDiscussionLike(
  userId: string,
  discussionId: string
): { isLiked: boolean; likeCount: number } {
  const discussion = getDiscussion(discussionId);
  if (!discussion) {
    throw new Error("Discussion not found");
  }
  const set = likesFor(userId);
  if (set.has(discussionId)) {
    set.delete(discussionId);
    discussion.likeCount = Math.max(0, discussion.likeCount - 1);
    return { isLiked: false, likeCount: discussion.likeCount };
  }
  set.add(discussionId);
  discussion.likeCount += 1;
  return { isLiked: true, likeCount: discussion.likeCount };
}

/* -------------------------------------------------------------------------- */
/* Comments (#1008–#1010)                                                     */
/* -------------------------------------------------------------------------- */

function commentsFor(discussionId: string): Comment[] {
  let list = store.comments.get(discussionId);
  if (!list) {
    list = [];
    store.comments.set(discussionId, list);
  }
  return list;
}

/** Build nested tree from flat comments. */
export function buildCommentTree(flat: Comment[]): Comment[] {
  const byId = new Map<string, Comment>();
  for (const c of flat) {
    byId.set(c.id, { ...c, replies: [] });
  }
  const roots: Comment[] = [];
  for (const c of byId.values()) {
    if (c.parentId && byId.has(c.parentId)) {
      byId.get(c.parentId)!.replies!.push(c);
    } else {
      roots.push(c);
    }
  }
  // Stable chronological order
  const sortFn = (a: Comment, b: Comment) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  const sortTree = (nodes: Comment[]) => {
    nodes.sort(sortFn);
    for (const n of nodes) {
      if (n.replies?.length) sortTree(n.replies);
    }
  };
  sortTree(roots);
  return roots;
}

export function listComments(discussionId: string): Comment[] {
  return buildCommentTree([...commentsFor(discussionId)]);
}

export function listCommentsFlat(discussionId: string): Comment[] {
  return [...commentsFor(discussionId)];
}

export function addComment(input: {
  discussionId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  parentId?: string | null;
}): Comment {
  const discussion = getDiscussion(input.discussionId);
  if (!discussion) {
    throw new Error("Discussion not found");
  }
  if (discussion.isLocked) {
    throw new Error("Discussion is locked");
  }
  const content = input.content.trim();
  if (!content) {
    throw new Error("Comment cannot be empty");
  }
  if (content.length > 5000) {
    throw new Error("Comment is too long");
  }
  if (input.parentId) {
    const parent = commentsFor(input.discussionId).find((c) => c.id === input.parentId);
    if (!parent) {
      throw new Error("Parent comment not found");
    }
  }

  const comment: Comment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    discussionId: input.discussionId,
    content,
    authorId: input.authorId,
    authorName: input.authorName,
    authorAvatar: input.authorAvatar,
    likeCount: 0,
    createdAt: new Date().toISOString(),
    parentId: input.parentId ?? null,
  };
  commentsFor(input.discussionId).push(comment);
  discussion.replyCount += 1;
  discussion.updatedAt = comment.createdAt;
  return comment;
}

// Seed demo comments for the first discussion so empty-state demos still work
(function seedComments() {
  if (store.discussions.length === 0) return;
  const firstId = store.discussions[0]!.id;
  if (commentsFor(firstId).length > 0) return;
  const seedAuthor = store.members.values().next().value;
  addComment({
    discussionId: firstId,
    content: "Great discussion — thanks for sharing!",
    authorId: seedAuthor?.id ?? "user-seed",
    authorName: seedAuthor?.name ?? "Community Member",
    authorAvatar: seedAuthor?.avatar,
  });
  const parent = commentsFor(firstId)[0]!;
  addComment({
    discussionId: firstId,
    content: "Agreed — following along.",
    authorId: "user-reply",
    authorName: "Alex Rivera",
    parentId: parent.id,
  });
})();

