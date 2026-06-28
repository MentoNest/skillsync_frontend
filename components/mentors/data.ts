import type { AvailabilityStatus } from '@/components/MentorAvailabilityBadge';

/**
 * High-level expertise areas used to group mentors on the discovery page.
 * Exported as a string-literal union so the type checker can validate
 * lookup tables (filter counts, mock data, etc.).
 */
export type Expertise =
  | 'Frontend Development'
  | 'Backend Engineering'
  | 'Full-Stack Engineering'
  | 'Mobile Development'
  | 'DevOps & Cloud'
  | 'Data Science & ML'
  | 'UI/UX Design'
  | 'Product Management'
  | 'System Architecture'
  | 'Engineering Leadership';

/**
 * Stable order in which filters are rendered.
 * Using `as const` keeps literal types so the `Expertise` union is preserved.
 */
export const EXPERTISE_OPTIONS = [
  'Frontend Development',
  'Backend Engineering',
  'Full-Stack Engineering',
  'Mobile Development',
  'DevOps & Cloud',
  'Data Science & ML',
  'UI/UX Design',
  'Product Management',
  'System Architecture',
  'Engineering Leadership',
] as const satisfies readonly Expertise[];

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  /** Price in USD per one mentoring session. */
  pricePerSession: number;
  skills: string[];
  expertise: Expertise[];
  experienceYears: number;
  availability: AvailabilityStatus;
  isFeatured?: boolean;
}

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'sarah-doe',
    name: 'Sarah Doe',
    title: 'Staff Frontend Engineer',
    company: 'Google',
    bio: 'Helps engineers level up on React, TypeScript, and Next.js with practical code review and architecture guidance.',
    rating: 4.9,
    reviewCount: 238,
    pricePerSession: 120,
    skills: ['React', 'TypeScript', 'Next.js'],
    expertise: ['Frontend Development', 'Full-Stack Engineering'],
    experienceYears: 6,
    availability: 'available',
    isFeatured: true,
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    title: 'Senior Product Manager',
    company: 'Microsoft',
    bio: 'Specializes in product strategy, roadmap planning, and aligning cross-functional teams around measurable customer outcomes.',
    rating: 4.7,
    reviewCount: 152,
    pricePerSession: 95,
    skills: ['Strategy', 'Roadmapping', 'OKRs'],
    expertise: ['Product Management', 'Engineering Leadership'],
    experienceYears: 8,
    availability: 'available',
  },
  {
    id: 'jane-roe',
    name: 'Jane Roe',
    title: 'Lead UX Designer',
    company: 'Apple',
    bio: 'Passionate about design systems, prototyping, and shipping accessible, intuitive interfaces at scale.',
    rating: 4.8,
    reviewCount: 89,
    pricePerSession: 110,
    skills: ['Figma', 'Design Systems', 'Prototyping'],
    expertise: ['UI/UX Design', 'Frontend Development'],
    experienceYears: 7,
    availability: 'busy',
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    title: 'Principal Engineer',
    company: 'Meta',
    bio: 'Designs distributed systems and mentors engineers on backend architecture, database modeling, and reliability.',
    rating: 4.9,
    reviewCount: 312,
    pricePerSession: 150,
    skills: ['Distributed Systems', 'PostgreSQL', 'Go'],
    expertise: ['Backend Engineering', 'System Architecture'],
    experienceYears: 12,
    availability: 'available',
  },
  {
    id: 'emily-davis',
    name: 'Emily Davis',
    title: 'Senior Data Scientist',
    company: 'Netflix',
    bio: 'Guides mentees through statistical modeling, experimentation, and production machine learning workflows.',
    rating: 4.6,
    reviewCount: 76,
    pricePerSession: 115,
    skills: ['Python', 'TensorFlow', 'Statistics'],
    expertise: ['Data Science & ML'],
    experienceYears: 5,
    availability: 'available',
  },
  {
    id: 'alex-kumar',
    name: 'Alex Kumar',
    title: 'Engineering Manager',
    company: 'Stripe',
    bio: 'Coaches engineers transitioning into leadership roles, with hands-on system design and career strategy support.',
    rating: 4.9,
    reviewCount: 201,
    pricePerSession: 140,
    skills: ['Leadership', 'System Design', 'Career Coaching'],
    expertise: ['Engineering Leadership', 'Backend Engineering'],
    experienceYears: 11,
    availability: 'available',
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'Mobile Lead',
    company: 'Uber',
    bio: 'Builds and scales cross-platform mobile apps. Mentors on native iOS/Android and React Native architecture.',
    rating: 4.7,
    reviewCount: 124,
    pricePerSession: 125,
    skills: ['React Native', 'Swift', 'Kotlin'],
    expertise: ['Mobile Development', 'Engineering Leadership'],
    experienceYears: 9,
    availability: 'busy',
  },
  {
    id: 'david-park',
    name: 'David Park',
    title: 'Senior DevOps Engineer',
    company: 'AWS',
    bio: 'Helps teams adopt infrastructure-as-code, observability, and reliable deployment practices on AWS.',
    rating: 4.8,
    reviewCount: 167,
    pricePerSession: 130,
    skills: ['Kubernetes', 'Terraform', 'AWS'],
    expertise: ['DevOps & Cloud', 'Backend Engineering'],
    experienceYears: 8,
    availability: 'available',
  },
  {
    id: 'maria-garcia',
    name: 'Maria Garcia',
    title: 'Senior Product Designer',
    company: 'Figma',
    bio: 'Designs end-to-end product experiences and mentors designers on interaction craft, accessibility, and storytelling.',
    rating: 4.8,
    reviewCount: 143,
    pricePerSession: 105,
    skills: ['Figma', 'Interaction Design', 'Accessibility'],
    expertise: ['UI/UX Design', 'Frontend Development'],
    experienceYears: 6,
    availability: 'available',
  },
  {
    id: 'tom-wilson',
    name: 'Tom Wilson',
    title: 'Staff Engineer',
    company: 'Twitter',
    bio: 'Specialist in large-scale event-driven systems. Helps engineers reason about consistency, throughput, and cost.',
    rating: 5.0,
    reviewCount: 421,
    pricePerSession: 175,
    skills: ['Kafka', 'Scala', 'Distributed Systems'],
    expertise: ['System Architecture', 'Backend Engineering', 'Full-Stack Engineering'],
    experienceYears: 14,
    availability: 'fully-booked',
  },
  {
    id: 'lisa-brown',
    name: 'Lisa Brown',
    title: 'Machine Learning Engineer',
    company: 'OpenAI',
    bio: 'Works on production LLM systems. Mentors on evaluation, fine-tuning, and shipping ML features responsibly.',
    rating: 4.9,
    reviewCount: 198,
    pricePerSession: 160,
    skills: ['PyTorch', 'LLMs', 'Python'],
    expertise: ['Data Science & ML', 'Backend Engineering'],
    experienceYears: 7,
    availability: 'available',
  },
  {
    id: 'carlos-mendez',
    name: 'Carlos Mendez',
    title: 'CTO & Co-founder',
    company: 'Helio Labs',
    bio: 'Advises early-stage technical leaders on hiring, architecture decisions, and aligning engineering with the business.',
    rating: 4.7,
    reviewCount: 82,
    pricePerSession: 135,
    skills: ['Leadership', 'Hiring', 'Architecture'],
    expertise: ['Engineering Leadership', 'Product Management'],
    experienceYears: 13,
    availability: 'available',
  },
];