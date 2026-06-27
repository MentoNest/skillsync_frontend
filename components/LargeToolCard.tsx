import React from 'react';

interface LargeToolCardProps {
  /** Icon element rendered at the top of the card */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Short description of the tool */
  description: string;
  /** Label text for the action button */
  buttonText: string;
  /** Tailwind gradient classes, e.g. "from-cyan-500 to-blue-600" */
  gradient?: string;
  /** Called when the button is clicked */
  onButtonClick?: () => void;
}

/**
 * LargeToolCard — a prominent, gradient-backed card for featured tools.
 *
 * Usage:
 *   <LargeToolCard
 *     icon={<SomeIcon />}
 *     title="Resume Builder"
 *     description="Create a professional resume in minutes."
 *     buttonText="Get Started"
 *     gradient="from-cyan-500 to-blue-600"
 *     onButtonClick={() => router.push('/tools/resume')}
 *   />
 */
export default function LargeToolCard({
  icon,
  title,
  description,
  buttonText,
  gradient = 'from-cyan-500 to-blue-600',
  onButtonClick,
}: LargeToolCardProps) {
  return (
    <article
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 md:p-10 text-white flex flex-col justify-between min-h-64 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}
    >
      {/* Icon + content */}
      <div>
        {/* Icon container */}
        <div
          className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors"
          aria-hidden="true"
        >
          <span className="w-7 h-7 flex items-center justify-center text-white">
            {icon}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
          {title}
        </h3>

        <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-prose">
          {description}
        </p>
      </div>

      {/* Action button */}
      <button
        type="button"
        onClick={onButtonClick}
        className="mt-8 self-start inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
      >
        {buttonText}
        <svg
          className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </article>
  );
}
