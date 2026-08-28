export const EXPERTISE_CATEGORIES = [
  "Frontend",
  "Backend",
  "UI/UX",
  "Product Management",
  "DevOps",
] as const;

export type Expertise = (typeof EXPERTISE_CATEGORIES)[number];

export interface Mentor {
  name: string;
  role: string;
  description: string;
  image: string;
  expertise: string[];
}

export const mentors: Mentor[] = [
  {
    name: "John Doe",
    role: "Software Engineer",
    description: "Specializes in frontend development and React.",
    image: "/avatars/john.svg",
    expertise: ["Frontend"],
  },
  {
    name: "Jane Smith",
    role: "UX/UI Designer",
    description:
      "Passionate about creating beautiful and intuitive user experiences.",
    image: "/avatars/jane.svg",
    expertise: ["UI/UX"],
  },
  {
    name: "Sarah Wilson",
    role: "Data Scientist",
    description: "Expert in machine learning and data visualization.",
    image: "/avatars/sarah.svg",
    expertise: ["Backend"],
  },
  {
    name: "Michael Chen",
    role: "Backend Engineer",
    description: "Builds scalable APIs and resilient microservices.",
    image: "/avatars/michael.svg",
    expertise: ["Backend", "DevOps"],
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    description:
      "Drives product strategy and cross-functional team alignment.",
    image: "/avatars/emily.svg",
    expertise: ["Product Management"],
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    description:
      "Automates cloud infrastructure and streamlines CI/CD pipelines.",
    image: "/avatars/david.svg",
    expertise: ["DevOps", "Backend"],
  },
];
