import { ReactNode } from 'react';
import { CodeIcon, GearIcon, PaletteIcon, ChartIcon, RocketIcon, BriefcaseIcon } from './icons';

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
  count: string;
}

export const categories: Category[] = [
  {
    slug: 'frontend',
    title: 'Frontend Development',
    description: 'Master the basics of HTML, CSS, and JavaScript, and build with modern frameworks like React and Next.js.',
    icon: <CodeIcon className="w-6 h-6" />,
    count: '12 guides',
  },
  {
    slug: 'backend',
    title: 'Backend Engineering',
    description: 'Learn how to build scalable APIs, design databases, and handle authentication and server logic.',
    icon: <GearIcon className="w-6 h-6" />,
    count: '8 guides',
  },
  {
    slug: 'design',
    title: 'UI/UX Design',
    description: 'Discover principles of modern design, prototyping, wireframing, and user research methodologies.',
    icon: <PaletteIcon className="w-6 h-6" />,
    count: '6 guides',
  },
  {
    slug: 'data-science',
    title: 'Data Science & AI',
    description: 'Explore data analysis, statistics, machine learning algorithms, and prompt engineering.',
    icon: <ChartIcon className="w-6 h-6" />,
    count: '10 guides',
  },
  {
    slug: 'product',
    title: 'Product Management',
    description: 'Define product vision, run agile sprint planning, map features, and coordinate cross-functional releases.',
    icon: <RocketIcon className="w-6 h-6" />,
    count: '7 guides',
  },
  {
    slug: 'career',
    title: 'Career Growth',
    description: 'Prepare for technical interviews, polish resumes, learn negotiation tactics, and plan promotions.',
    icon: <BriefcaseIcon className="w-6 h-6" />,
    count: '15 guides',
  },
];

export async function getCategories(): Promise<Category[]> {
  return categories;
}
