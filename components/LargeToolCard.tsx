import React from 'react';

export interface LargeToolCardProps {
  icon: React.ComponentType<{ className?: string }> | React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  gradient?: string;
  onButtonClick?: () => void;
}

export default function LargeToolCard({
  icon,
  title,
  description,
  buttonText,
  gradient = 'from-blue-500 to-indigo-600',
  onButtonClick,
}: LargeToolCardProps) {
  const IconComponent = typeof icon === 'function' ? icon : null;

  return (
    <article className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
          {IconComponent ? (
            <IconComponent className="h-8 w-8 text-white" aria-hidden="true" />
          ) : (
            <span className="text-2xl" aria-hidden="true">{icon}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm leading-6 text-white/90">{description}</p>
        </div>

        <button
          type="button"
          onClick={onButtonClick}
          className="mt-2 inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:bg-white/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label={`${buttonText}: ${title}`}
        >
          {buttonText}
        </button>
      </div>

      <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
      <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/5" aria-hidden="true" />
    </article>
  );
}
