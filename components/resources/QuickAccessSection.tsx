import { FileText, Video, BookOpen, Download } from 'lucide-react';

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

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  iconColor: string;
  iconBgColor: string;
}

function QuickAccessCard({ icon, title, description, href, iconColor, iconBgColor }: QuickAccessCardProps) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      {/* Decorative gradient background on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${iconBgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className={iconColor} aria-hidden="true">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* Hover arrow indicator */}
        <div className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore</span>
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Border glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-purple-400 dark:border-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
    </a>
  );
}

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
          <QuickAccessCard
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
