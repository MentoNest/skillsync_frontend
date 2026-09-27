import type { Discussion, DiscussionCategory } from "@/types/discussion";

export const DISCUSSION_CATEGORIES: DiscussionCategory[] = [
  "Frontend",
  "Backend",
  "UI/UX",
  "Career",
  "General",
];

export const discussions: Discussion[] = [
  {
    id: "1",
    title: "How do I structure a large React app?",
    content:
      "Looking for best practices on folder structure, state management, and code splitting in a growing frontend codebase.",
    author: "John Doe",
    category: "Frontend",
    replyCount: 12,
    createdAt: "2026-09-10",
  },
  {
    id: "2",
    title: "REST vs GraphQL for a new API",
    content:
      "Starting a new backend service and debating between REST and GraphQL for flexibility and caching.",
    author: "Michael Chen",
    category: "Backend",
    replyCount: 8,
    createdAt: "2026-09-12",
  },
  {
    id: "3",
    title: "Portfolio tips for UX designers",
    content:
      "What do mentors look for in a UI/UX portfolio? Case studies, process, or polished visuals?",
    author: "Jane Smith",
    category: "UI/UX",
    replyCount: 5,
    createdAt: "2026-09-14",
  },
  {
    id: "4",
    title: "Breaking into tech without a CS degree",
    content:
      "Sharing my journey from support to software engineering and what helped me land interviews.",
    author: "Sarah Wilson",
    category: "Career",
    replyCount: 21,
    createdAt: "2026-09-15",
  },
  {
    id: "5",
    title: "Welcome: introduce yourself here",
    content:
      "New to the community? Tell us who you are, what you are learning, and how we can help.",
    author: "SkillSync Team",
    category: "General",
    replyCount: 47,
    createdAt: "2026-09-01",
  },
  {
    id: "6",
    title: "Tailwind CSS performance in production",
    content:
      "Noticing large CSS bundles — how are you configuring content paths and purging unused styles?",
    author: "David Kim",
    category: "Frontend",
    replyCount: 4,
    createdAt: "2026-09-18",
  },
  {
    id: "7",
    title: "How to ask a good debugging question",
    content:
      "A short guide on sharing reproductions, logs, and expected vs actual behavior to get faster help.",
    author: "Emily Davis",
    category: "General",
    replyCount: 9,
    createdAt: "2026-09-20",
  },
  {
    id: "8",
    title: "Database indexing for beginners",
    content:
      "When should I add an index, and how do I avoid slowing down writes on my backend?",
    author: "Michael Chen",
    category: "Backend",
    replyCount: 6,
    createdAt: "2026-09-22",
  },
];
