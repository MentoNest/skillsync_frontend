export interface Mentor {
  id: string;
  name: string;
  headline: string;
  skills: string[];
  bio: string;
  rating: number;
  sessions: number;
  hourlyRate: number;
}

export const MENTORS: Mentor[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    headline: "Senior Product Designer",
    skills: ["Product Design", "Design Systems", "UX Research"],
    bio: "I help designers move into senior roles and build design systems that scale.",
    rating: 4.9,
    sessions: 156,
    hourlyRate: 180,
  },
  {
    id: "marcus-rivera",
    name: "Marcus Rivera",
    headline: "Staff Software Engineer",
    skills: ["React", "TypeScript", "System Design"],
    bio: "I mentor engineers on frontend architecture and growing into staff-level influence.",
    rating: 4.8,
    sessions: 214,
    hourlyRate: 165,
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    headline: "Data Science Lead",
    skills: ["Python", "Machine Learning", "SQL"],
    bio: "I guide learners from analytics foundations to shipping production ML projects.",
    rating: 4.9,
    sessions: 98,
    hourlyRate: 190,
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    headline: "Engineering Manager & Career Coach",
    skills: ["Leadership", "Career Strategy", "Interview Prep"],
    bio: "I help engineers prepare for leadership transitions and difficult career decisions.",
    rating: 4.7,
    sessions: 132,
    hourlyRate: 150,
  },
  {
    id: "lina-garcia",
    name: "Lina Garcia",
    headline: "Frontend Architect",
    skills: ["Next.js", "Accessibility", "Design Systems"],
    bio: "I teach accessible, maintainable frontend patterns for growing product teams.",
    rating: 4.8,
    sessions: 87,
    hourlyRate: 175,
  },
  {
    id: "daniel-kim",
    name: "Daniel Kim",
    headline: "Growth Marketing Mentor",
    skills: ["SEO", "Analytics", "Product Marketing"],
    bio: "I work with founders and marketers on measurable, sustainable growth strategies.",
    rating: 4.6,
    sessions: 74,
    hourlyRate: 140,
  },
];
