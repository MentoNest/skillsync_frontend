'use client';

export type Mentor = {
  id: number;
  name: string;
  role: string;
  company: string;
  category: string;
  initials: string;
  accent: string;
  bg: string;
  image?: string;
  available: boolean;
  rating: number;
  rate: number;
  sessions: number;
  description: string;
  tags: string[];
};

export const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Kwame Asante',
    role: 'Staff Engineer',
    company: 'Stripe',
    category: 'Engineering',
    initials: 'KA',
    accent: '#3b82f6',
    bg: '#0f1f3d',
    image: '/tony-adebanjo.jpg',
    available: true,
    rating: 4.95,
    rate: 180,
    sessions: 204,
    description:
      'Helps engineers level up to Staff and beyond. Specialises in distributed systems, technical leadership, and promo packets.',
    tags: ['System Design', 'Leadership', 'Go'],
  },
  {
    id: 2,
    name: 'Priya Menon',
    role: 'Head of Product Design',
    company: 'Figma',
    category: 'Design',
    initials: 'PM',
    accent: '#a855f7',
    bg: '#1e0f3d',
    image: '/Image (Sarah Johnson).svg',
    available: true,
    rating: 4.98,
    rate: 145,
    sessions: 187,
    description:
      'Portfolio reviews, design system strategy, and breaking into senior IC or management tracks at top-tier product companies.',
    tags: ['Figma', 'Design Systems', 'Portfolio'],
  },
  {
    id: 3,
    name: 'Tomás Reyes',
    role: 'Senior PM',
    company: 'Notion',
    category: 'Product',
    initials: 'TR',
    accent: '#10b981',
    bg: '#0a2318',
    image: '/Image (Marcus Williams).svg',
    available: false,
    rating: 4.91,
    rate: 160,
    sessions: 139,
    description:
      'From APM to PM to Group PM — Tomás has made every jump and guides others through the same transitions with precision.',
    tags: ['Roadmapping', 'Stakeholders', 'APM'],
  },
  {
    id: 4,
    name: 'Aisha Nwosu',
    role: 'Data Science Lead',
    company: 'Spotify',
    category: 'Data',
    initials: 'AN',
    accent: '#f59e0b',
    bg: '#2a1800',
    image: '/Image (Cole Hathans).svg',
    available: true,
    rating: 4.93,
    rate: 155,
    sessions: 256,
    description:
      'ML pipelines, A/B testing at scale, and transitioning from academia to industry. Obsessed with making data teams actually functional.',
    tags: ['Python', 'ML', 'Analytics'],
  },
  {
    id: 5,
    name: 'Leon Fischer',
    role: 'Founding Engineer',
    company: '3× YC Startups',
    category: 'Engineering',
    initials: 'LF',
    accent: '#ef4444',
    bg: '#2a0a0a',
    image: '/tony-adebanjo.jpg',
    available: true,
    rating: 4.89,
    rate: 135,
    sessions: 98,
    description:
      'Zero to one builder. Helps early-career devs ship fast, make technical decisions under uncertainty, and navigate startup chaos.',
    tags: ['React', 'Node', 'Startup'],
  },
  {
    id: 6,
    name: 'Sara Lindqvist',
    role: 'VP of Growth',
    company: 'Duolingo',
    category: 'Business',
    initials: 'SL',
    accent: '#06b6d4',
    bg: '#011f26',
    image: '/Image (Sarah Johnson).svg',
    available: false,
    rating: 4.96,
    rate: 170,
    sessions: 321,
    description:
      'Growth loops, retention mechanics, and go-to-market for consumer apps. Former founder. Brutally practical and candid.',
    tags: ['Growth', 'GTM', 'Retention'],
  },
];
