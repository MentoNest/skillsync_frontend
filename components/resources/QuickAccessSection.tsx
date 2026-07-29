import { FileText, Video, BookOpen, Download } from 'lucide-react';
import { ResourceCategoryCard } from './ResourceCategoryCard';

/**
 * QuickAccessSection — Grid layout for Quick Access resource categories.
 *
 * Design intent:
 * - Card-based layout with icon, title, and description
 * - Responsive grid: 4 columns → 2 columns → 1 column
 * - Clean hover effects and visual feedback
 * - Consistent spacing and visual hierarchy
 *
 * Accessibility:
 * - Semantic <section> with proper heading structure
 * - Links have descriptive text
 * - Icon decorations are aria-hidden
 * - Focus states clearly visible
 */

export default function QuickAccessSection() {
  const quickAccessItems = [
    {
      icon: <FileText className="h-7 w-7" />,
      title: 'Resume Templates',
      description: 'Professional resume templates designed to help you stand out and get noticed by recruiters.',
      href: '/resources/templates/resume',
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBgColor: 'bg-blue-100 dark:bg-blue-950/40',
    },
    {
      icon: <Video className="h-7 w-7" />,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides covering career development, interview prep, and professional skills.',
      href: '/resources/tutorials',
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBgColor: 'bg-purple-100 dark:bg-purple-950/40',
    },
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: 'Career Guides',
      description: 'Comprehensive guides on career planning, job search strategies, and professional growth.',
      href: '/resources/guides',
      iconColor: 'text-green-600 dark:text-green-400',
      iconBgColor: 'bg-green-100 dark:bg-green-950/40',
    },
    {
      icon: <Download className="h-7 w-7" />,
      title: 'Downloadable Tools',
      description: 'Free tools, checklists, and worksheets to accelerate your career development journey.',
      href: '/resources/downloads',
      iconColor: 'text-orange-600 dark:text-orange-400',
      iconBgColor: 'bg-orange-100 dark:bg-orange-950/40',
    },
  ];

  return (
    <section
      className="max-w-screen-xl px-4 py-16 mx-auto lg:py-20"
      aria-labelledby="quick-access-heading"
    >
      {/* Section Header */}
      <div className="mb-12 text-center lg:text-left">
        <h2
          id="quick-access-heading"
          className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
        >
          Quick Access
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl lg:max-w-none">
          Jump straight to the resources you need most
        </p>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {quickAccessItems.map((item) => (
          <ResourceCategoryCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            href={item.href}
            iconColor={item.iconColor}
            iconBgColor={item.iconBgColor}
          />
        ))}
      </div>
    </section>
  );
}
