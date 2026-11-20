export type ResourceItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  readTime?: string;
  author?: string;
};

export const FEATURED_TRACKS: ResourceItem[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    category: "Learning Track",
    description: "Build accessible, responsive interfaces with modern React and CSS.",
    href: "/resources/tracks",
  },
  {
    id: "backend",
    title: "Backend Development",
    category: "Learning Track",
    description: "Design reliable APIs, data models, and services for production apps.",
    href: "/resources/tracks",
  },
  {
    id: "web3",
    title: "Web3 Foundations",
    category: "Learning Track",
    description: "Learn wallets, smart contracts, and decentralized application patterns.",
    href: "/resources/tracks",
  },
];

export const FEATURED_ARTICLES: ResourceItem[] = [
  {
    id: "database-design",
    title: "Database Design Principles",
    category: "Article",
    description: "Model data with clarity, integrity, and performance in mind.",
    href: "/resources/articles",
    readTime: "6 min read",
    author: "Priya Nair",
  },
  {
    id: "personal-brand",
    title: "Building Your Personal Brand",
    category: "Article",
    description: "Showcase your work and grow a reputation that opens doors.",
    href: "/resources/articles",
    readTime: "5 min read",
    author: "Marcus Lee",
  },
  {
    id: "actionable-feedback",
    title: "Giving Actionable Feedback",
    category: "Article",
    description: "Help teammates improve with specific, kind, and useful feedback.",
    href: "/resources/articles",
    readTime: "4 min read",
    author: "Aisha Rahman",
  },
];

export const TOOLS_AND_TEMPLATES: ResourceItem[] = [
  {
    id: "resume-builder",
    title: "Resume Builder",
    category: "Tool",
    description: "Create a clean, role-ready resume from structured experience.",
    href: "/resources/tools",
  },
  {
    id: "career-planner",
    title: "Career Planner",
    category: "Tool",
    description: "Map your next steps with milestones and measurable outcomes.",
    href: "/resources/tools",
  },
  {
    id: "portfolio-template",
    title: "Portfolio Template",
    category: "Template",
    description: "Start a polished portfolio with accessible sections and layouts.",
    href: "/resources/templates",
  },
];

export const ALL_RESOURCES: ResourceItem[] = [
  ...FEATURED_TRACKS,
  ...FEATURED_ARTICLES,
  ...TOOLS_AND_TEMPLATES,
];
