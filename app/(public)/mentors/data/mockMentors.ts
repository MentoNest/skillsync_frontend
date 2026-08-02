import type { Mentor } from "@/lib/types";

export const mockMentors: Mentor[] = [
  {
    id: "1",
    name: "John Doe",
    title: "Software Engineer",
    skills: ["React", "Node.js", "TypeScript"],
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    title: "Product Manager",
    skills: ["Product Strategy", "Agile", "User Research"],
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

/** Alias used by pages that import MENTORS */
export const MENTORS: Mentor[] = mockMentors;

/** Returns a URL-friendly slug for a mentor (falls back to id). */
export function mentorSlug(mentor: Mentor): string {
  const base = mentor.id || mentor.mentorId || mentor.name || "";
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
