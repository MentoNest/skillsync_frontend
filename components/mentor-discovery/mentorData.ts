export type ExperienceLevel = "Junior" | "Mid-Level" | "Senior" | "Executive";

export interface Mentor {
  id: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  industry: string[];
  experience: ExperienceLevel;
  rating: number;
  sessions: number;
  hourlyRate: number;
  skills: string[];
  avatarInitials: string;
  avatarColor: string;
}

export interface MentorFilters {
  expertise: string[];
  industry: string[];
  experience: ExperienceLevel | "";
}

export const EXPERTISE_OPTIONS: readonly string[] = [
  "Frontend",
  "Backend",
  "UI/UX",
  "Product Management",
  "DevOps",
];

export const INDUSTRY_OPTIONS: readonly string[] = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Media",
];

export const EXPERIENCE_OPTIONS: readonly ExperienceLevel[] = [
  "Junior",
  "Mid-Level",
  "Senior",
  "Executive",
];

export function createEmptyFilters(): MentorFilters {
  return { expertise: [], industry: [], experience: "" };
}

export function filterMentors(
  mentors: readonly Mentor[],
  filters: MentorFilters,
  query = ""
): Mentor[] {
  const search = query.trim().toLowerCase();

  return mentors.filter((mentor) => {
    if (
      filters.expertise.length > 0 &&
      !filters.expertise.some((value) => mentor.expertise.includes(value))
    ) {
      return false;
    }

    if (
      filters.industry.length > 0 &&
      !filters.industry.some((value) => mentor.industry.includes(value))
    ) {
      return false;
    }

    if (filters.experience && mentor.experience !== filters.experience) {
      return false;
    }

    if (search) {
      const haystack = [
        mentor.name,
        mentor.title,
        mentor.bio,
        ...mentor.skills,
        ...mentor.expertise,
        ...mentor.industry,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(search)) {
        return false;
      }
    }

    return true;
  });
}

export const MOCK_MENTORS: Mentor[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "Senior Product Designer",
    bio: "I help designers grow into leadership roles and build inclusive, scalable design practices.",
    expertise: ["UI/UX", "Product Management"],
    industry: ["Technology", "Media"],
    experience: "Senior",
    rating: 4.9,
    sessions: 156,
    hourlyRate: 180,
    skills: ["Design Systems", "User Research", "Accessibility"],
    avatarInitials: "SC",
    avatarColor: "bg-gradient-to-br from-rose-500 to-pink-500",
  },
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    title: "Full Stack Engineer",
    bio: "From first component to production rollout, I mentor engineers on shipping maintainable web apps.",
    expertise: ["Frontend", "Backend"],
    industry: ["Technology", "E-commerce"],
    experience: "Mid-Level",
    rating: 4.8,
    sessions: 94,
    hourlyRate: 120,
    skills: ["React", "TypeScript", "Node.js"],
    avatarInitials: "MJ",
    avatarColor: "bg-gradient-to-br from-indigo-500 to-cyan-500",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    title: "Platform Engineering Lead",
    bio: "I coach engineers on distributed systems, cloud infrastructure and reliable delivery pipelines.",
    expertise: ["Backend", "DevOps"],
    industry: ["Technology", "Finance"],
    experience: "Senior",
    rating: 4.9,
    sessions: 132,
    hourlyRate: 195,
    skills: ["AWS", "Kubernetes", "System Design"],
    avatarInitials: "PS",
    avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
  {
    id: "daniel-okafor",
    name: "Daniel Okafor",
    title: "VP of Engineering",
    bio: "Scaling engineering teams and mentoring technical leaders through high-growth transitions.",
    expertise: ["DevOps", "Backend"],
    industry: ["Technology", "Healthcare"],
    experience: "Executive",
    rating: 5,
    sessions: 78,
    hourlyRate: 260,
    skills: ["Leadership", "Cloud Strategy", "Mentoring"],
    avatarInitials: "DO",
    avatarColor: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    id: "emily-wong",
    name: "Emily Wong",
    title: "Product Designer",
    bio: "Building portfolios and design fundamentals for designers early in their careers.",
    expertise: ["UI/UX", "Frontend"],
    industry: ["Media", "E-commerce"],
    experience: "Junior",
    rating: 4.7,
    sessions: 41,
    hourlyRate: 75,
    skills: ["Figma", "Prototyping", "CSS"],
    avatarInitials: "EW",
    avatarColor: "bg-gradient-to-br from-sky-500 to-blue-500",
  },
  {
    id: "olivia-brooks",
    name: "Olivia Brooks",
    title: "Chief Product Officer",
    bio: "Product strategy, discovery and roadmap mentoring for leaders shaping new markets.",
    expertise: ["Product Management", "UI/UX"],
    industry: ["Education", "Technology"],
    experience: "Executive",
    rating: 4.9,
    sessions: 112,
    hourlyRate: 280,
    skills: ["Product Strategy", "Roadmapping", "Research"],
    avatarInitials: "OB",
    avatarColor: "bg-gradient-to-br from-violet-500 to-purple-500",
  },
  {
    id: "rahul-mehta",
    name: "Rahul Mehta",
    title: "Senior Frontend Engineer",
    bio: "Accessibility, performance and practical frontend architecture for growing products.",
    expertise: ["Frontend", "DevOps"],
    industry: ["Finance", "Technology"],
    experience: "Mid-Level",
    rating: 4.8,
    sessions: 87,
    hourlyRate: 135,
    skills: ["React", "Performance", "CI/CD"],
    avatarInitials: "RM",
    avatarColor: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
  {
    id: "lena-fischer",
    name: "Lena Fischer",
    title: "Group Product Manager",
    bio: "Turning customer insight into focused delivery across product and engineering teams.",
    expertise: ["Product Management", "Backend"],
    industry: ["Healthcare", "Education"],
    experience: "Senior",
    rating: 4.8,
    sessions: 103,
    hourlyRate: 200,
    skills: ["Discovery", "Analytics", "Stakeholder Management"],
    avatarInitials: "LF",
    avatarColor: "bg-gradient-to-br from-fuchsia-500 to-rose-500",
  },
  {
    id: "tomas-silva",
    name: "Tomas Silva",
    title: "Junior Backend Developer",
    bio: "Helping career changers build strong API fundamentals and their first production services.",
    expertise: ["Backend", "DevOps"],
    industry: ["Education", "Finance"],
    experience: "Junior",
    rating: 4.6,
    sessions: 29,
    hourlyRate: 65,
    skills: ["Python", "APIs", "Docker"],
    avatarInitials: "TS",
    avatarColor: "bg-gradient-to-br from-lime-500 to-emerald-600",
  },
];
