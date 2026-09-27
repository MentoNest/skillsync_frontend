import QuickAccessCard, { type QuickAccessCardProps } from "@/components/resources/QuickAccessCard";

const iconProps = {
  className: "h-5 w-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
} as const;

export const QUICK_ACCESS_CATEGORIES: QuickAccessCardProps[] = [
  {
    title: "Resume Templates",
    description: "Professionally crafted templates to help you stand out for tech roles.",
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Video Tutorials",
    description: "Recorded mentor sessions covering career skills and technical topics.",
    href: "#sessions",
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Career Guides",
    description: "In-depth guides for navigating career transitions and growth stages.",
    href: "#guides",
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Downloadable Tools",
    description: "Worksheets, checklists, and planners to support every stage of your learning.",
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

interface QuickAccessGridProps {
  items?: QuickAccessCardProps[];
}

/** Responsive Quick Access grid: 1 column on mobile, 2 on tablet, 4 on desktop. */
export default function QuickAccessGrid({ items = QUICK_ACCESS_CATEGORIES }: QuickAccessGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
      {items.map((item) => (
        <li key={item.title} className="flex">
          <QuickAccessCard {...item} />
        </li>
      ))}
    </ul>
  );
}
