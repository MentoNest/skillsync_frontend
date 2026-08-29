import React from 'react';

interface LargeToolCardVariantProps {
  /** Icon element rendered at the top of the card */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Short description of the tool */
  description: string;
  /** Label text for the action button */
  buttonText: string;
  /** Tailwind gradient classes, e.g. "from-purple-500 to-pink-600" */
  gradient?: string;
  /** Optional accent color for the button, e.g. "bg-purple-600" */
  buttonAccent?: string;
  /** Card style variant */
  variant?: 'elevated' | 'bordered' | 'minimal';
  /** Called when the button is clicked */
  onButtonClick?: () => void;
}

/**
 * LargeToolCardVariant — an alternative design for featured tool cards.
 *
 * Differences from LargeToolCard:
 * - Three style variants: elevated (default), bordered, minimal
 * - Solid button with customizable accent color
 * - Different icon container styling
 * - Alternative hover animations
 *
 * Usage:
 *   <LargeToolCardVariant
 *     icon={<SparklesIcon />}
 *     title="AI Interview Coach"
 *     description="Practice interviews with AI-powered feedback."
 *     buttonText="Start Practicing"
 *     gradient="from-purple-500 to-pink-600"
 *     buttonAccent="bg-purple-600"
 *     variant="elevated"
 *     onButtonClick={() => router.push('/tools/interview')}
 *   />
 */
export default function LargeToolCardVariant({
  icon,
  title,
  description,
  buttonText,
  gradient = 'from-purple-500 to-pink-600',
  buttonAccent = 'bg-purple-600',
  variant = 'elevated',
  onButtonClick,
}: LargeToolCardVariantProps) {
  const variantStyles = {
    elevated:
      'shadow-2xl hover:shadow-purple-500/25 border border-white/10',
    bordered:
      'border-2 border-white/30 shadow-lg hover:border-white/50',
    minimal:
      'shadow-md hover:shadow-lg',
  };

  return (
    <article
      className={`
        bg-gradient-to-br ${gradient} 
        rounded-3xl p-8 md:p-10 
        text-white 
        flex flex-col justify-between 
        min-h-72
        transition-all duration-500 ease-out
        hover:scale-[1.02]
        ${variantStyles[variant]}
        group
        relative overflow-hidden
      `}
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Icon container with animated background */}
        <div
          className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300"
          aria-hidden="true"
        >
          <span className="w-8 h-8 flex items-center justify-center text-white">
            {icon}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>

        <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-prose">
          {description}
        </p>
      </div>

      {/* Solid action button */}
      <div className="relative z-10">
        <button
          type="button"
          onClick={onButtonClick}
          className={`
            mt-8 self-start 
            inline-flex items-center gap-2 
            px-7 py-3.5 
            text-sm font-bold 
            rounded-2xl 
            ${buttonAccent} 
            hover:brightness-110 
            active:scale-95 
            transition-all duration-200
            focus:outline-none 
            focus:ring-4 
            focus:ring-white/40
            shadow-lg hover:shadow-xl
          `}
        >
          {buttonText}
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </article>
  );
}
