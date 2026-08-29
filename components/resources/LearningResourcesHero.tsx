import React from "react";

export interface LearningResourcesHeroProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
}

export default function LearningResourcesHero({
  title = "Learning Resources",
  subtitle = "Explore structured learning tracks, insightful articles, and practical resources designed to help you build in-demand skills and accelerate your career.",
  badgeText = "SkillSync Resources",
  className = "",
}: LearningResourcesHeroProps) {
  return (
    <section
      aria-labelledby="learning-resources-hero-heading"
      className={`relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-950 px-4 py-16 text-white sm:px-6 sm:py-20 md:py-24 lg:px-8 ${className}`}
    >
      {/* Decorative ambient background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 transform-gpu blur-3xl"
      >
        <div className="aspect-[1155/678] w-[68rem] bg-gradient-to-tr from-purple-400 to-indigo-400 opacity-20" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-0 transform-gpu blur-2xl"
      >
        <div className="h-64 w-64 rounded-full bg-purple-500/20" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {badgeText && (
          <div className="mb-4 inline-flex items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/30 bg-purple-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-200 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-pulse" aria-hidden="true" />
              {badgeText}
            </span>
          </div>
        )}

        <h1
          id="learning-resources-hero-heading"
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-purple-100/90 sm:text-lg md:text-xl font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
