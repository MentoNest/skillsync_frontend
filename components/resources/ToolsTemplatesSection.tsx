import Link from "next/link";
import { ArrowRight, FileText, TrendingUp } from "lucide-react";

/**
 * ToolsTemplatesSection — Large tool cards for Resume Builder & Career Planner.
 *
 * Design intent:
 * - Large gradient cards that stand out as primary CTAs
 * - Each card has: Icon, Title, Description, CTA button
 * - Responsive grid: 1 column on mobile, 2 columns on larger screens
 * - Clean spacing and visual hierarchy
 * - Gradient backgrounds to differentiate from regular content
 * - Smooth hover effects and transitions
 *
 * Accessibility:
 * - Semantic <section> with proper heading structure
 * - Links have descriptive text and aria-labels
 * - Icon decorations are aria-hidden
 * - Focus states clearly visible
 */

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  ctaText: string;
}

function ToolCard({
  title,
  description,
  href,
  icon,
  gradientFrom,
  gradientTo,
  ctaText,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      aria-label={`Learn more about ${title}`}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}
        aria-hidden="true"
      />

      {/* Decorative gradient orb */}
      <div
        className={`absolute -top-12 -right-12 h-48 w-48 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-300`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-10">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <div className="text-white" aria-hidden="true">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          {description}
        </p>

        {/* CTA Button */}
        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:gap-3`}
        >
          <span>{ctaText}</span>
          <ArrowRight
            className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Border glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r ${gradientFrom} ${gradientTo} blur-xl`}
        style={{ padding: "2px", zIndex: -1 }}
        aria-hidden="true"
      />
    </Link>
  );
}

// Icon components
function ResumeIcon() {
  return <FileText className="h-8 w-8" aria-hidden="true" />;
}

function CareerPlannerIcon() {
  return <TrendingUp className="h-8 w-8" aria-hidden="true" />;
}

export default function ToolsTemplatesSection() {
  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto lg:py-20">
      {/* Section Header */}
      <div className="mb-12 text-center lg:text-left">
        <h2
          id="tools-templates-heading"
          className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
        >
          Tools & Templates
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl lg:max-w-none">
          Powerful tools to help you build your professional profile and plan
          your career journey
        </p>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Resume Builder Card */}
        <ToolCard
          title="Resume Builder"
          description="Create a professional, ATS-friendly resume in minutes. Choose from multiple templates, customize layouts, and export to PDF with one click."
          href="/tools/resume-builder"
          icon={<ResumeIcon />}
          gradientFrom="from-blue-500"
          gradientTo="to-indigo-600"
          ctaText="Build Your Resume"
        />

        {/* Career Planner Card */}
        <ToolCard
          title="Career Planner"
          description="Map out your career path with our interactive planning tool. Set goals, track milestones, and discover the skills you need to reach your next role."
          href="/tools/career-planner"
          icon={<CareerPlannerIcon />}
          gradientFrom="from-purple-500"
          gradientTo="to-pink-600"
          ctaText="Plan Your Career"
        />
      </div>
    </div>
  );
}
