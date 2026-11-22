export interface CommunityCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  icon?: string;
}

export interface DiscussionAuthor {
  id?: string;
  name: string;
  avatar: string;
  role: string;
  isMentor?: boolean;
}

export interface DiscussionPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: DiscussionAuthor;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isPinned?: boolean;
  tags: string[];
  /** Whether the signed-in user has liked this discussion (#1458). */
  isLiked?: boolean;
  /** Whether the signed-in user has bookmarked this discussion (#1459). */
  isBookmarked?: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  speakerRole: string;
  attendeesCount: number;
}

export interface CommunityStats {
  totalMembers: number;
  activeDiscussions: number;
  mentorsOnline: number;
  solutionsProvided: number;
}

export const COMMUNITY_STATS: CommunityStats = {
  totalMembers: 18450,
  activeDiscussions: 1280,
  mentorsOnline: 142,
  solutionsProvided: 4920,
};

export const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  { id: "all", name: "All Topics", slug: "all", description: "All community conversations", postCount: 1280 },
  { id: "career", name: "Career & Growth", slug: "career", description: "Resume feedback, interview prep, career transitions", postCount: 420 },
  { id: "code-review", name: "Code Review", slug: "code-review", description: "Get peer and mentor reviews on your code", postCount: 310 },
  { id: "web3-stellar", name: "Web3 & Stellar", slug: "web3-stellar", description: "Smart contracts, Soroban, wallets, and DeFi architecture", postCount: 265 },
  { id: "system-design", name: "System Design", slug: "system-design", description: "Distributed systems, scalability, and databases", postCount: 185 },
  { id: "general", name: "General Discussion", slug: "general", description: "Open discussions, tips, and introductions", postCount: 100 },
];

export const UPCOMING_COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "evt-1",
    title: "Soroban Smart Contracts Architecture Workshop",
    date: "Nov 25, 2026",
    time: "17:00 UTC",
    speaker: "Alex Rivera",
    speakerRole: "Principal Blockchain Architect",
    attendeesCount: 240,
  },
  {
    id: "evt-2",
    title: "Senior Engineering Mock System Design Interview",
    date: "Nov 28, 2026",
    time: "15:30 UTC",
    speaker: "Sarah Chen",
    speakerRole: "Staff Software Engineer",
    attendeesCount: 185,
  },
  {
    id: "evt-3",
    title: "Open Q&A: Transitioning from Web2 to Web3",
    date: "Dec 02, 2026",
    time: "18:00 UTC",
    speaker: "David Kim",
    speakerRole: "Founding Engineer & Mentor",
    attendeesCount: 310,
  },
];

export const SAMPLE_DISCUSSIONS: DiscussionPost[] = [
  {
    id: "disc-1",
    title: "Best practices for writing deterministic unit tests for Soroban contracts?",
    excerpt: "I've been working on escrow contract state machines and looking for patterns on simulating transaction environments and testing TTL extensions safely.",
    category: "Web3 & Stellar",
    author: {
      name: "Tariq Mansour",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      role: "Smart Contract Developer",
      isMentor: false,
    },
    createdAt: "2 hours ago",
    likesCount: 34,
    commentsCount: 12,
    viewsCount: 320,
    isPinned: true,
    tags: ["stellar", "soroban", "rust", "testing"],
  },
  {
    id: "disc-2",
    title: "Navigating your first Staff Engineer promotion: Lessons learned",
    excerpt: "After 2 years as a Senior Engineer, I recently stepped into the Staff role. Sharing a breakdown of leadership shifts, influence without authority, and cross-team alignment.",
    category: "Career & Growth",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      role: "Staff Engineer @ FinTech Corp",
      isMentor: true,
    },
    createdAt: "5 hours ago",
    likesCount: 89,
    commentsCount: 27,
    viewsCount: 1140,
    tags: ["career", "leadership", "mentorship"],
  },
  {
    id: "disc-3",
    title: "Architecture breakdown: Cache invalidation strategies in high-throughput Next.js apps",
    excerpt: "Handling dynamic user data with stale-while-revalidate vs on-demand tag revalidation. Here is how we reduced our TTFB by 42% on product landing feeds.",
    category: "System Design",
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "Tech Lead",
      isMentor: true,
    },
    createdAt: "1 day ago",
    likesCount: 56,
    commentsCount: 18,
    viewsCount: 890,
    tags: ["nextjs", "react", "performance", "caching"],
  },
  {
    id: "disc-4",
    title: "Feedback wanted: Clean architecture in TypeScript server-side applications",
    excerpt: "I structured our repository with domain entities, use-cases, and interface adapters. Looking for thoughts from mentors on decoupling ORM models cleanly.",
    category: "Code Review",
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      role: "Full-Stack Engineer",
      isMentor: false,
    },
    createdAt: "2 days ago",
    likesCount: 22,
    commentsCount: 9,
    viewsCount: 410,
    tags: ["typescript", "architecture", "patterns"],
  },
];
