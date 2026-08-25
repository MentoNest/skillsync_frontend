import React from "react";

export const MentorCardSkeleton: React.FC = () => {
  return (
    <li className="h-full flex flex-col">
      <article className="relative h-full flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700/80 group overflow-hidden animate-pulse">
        <div className="p-6 flex flex-col gap-4 grow">
          {/* Avatar + availability badge section - matches real card layout */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-4">
              {/* Avatar placeholder matching real card's w-14 h-14 rounded-2xl */}
              <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700" />
              {/* Bookmark button placeholder */}
              <div className="p-1.5 w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Availability badge placeholder */}
            <div className="w-24 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Identity section */}
          <div className="min-w-0 space-y-2">
            {/* Name placeholder */}
            <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Title placeholder */}
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Company + experience placeholder */}
            <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Rating section */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
            <div className="w-8 h-4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="w-20 h-3 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Bio placeholder */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Expertise chips placeholder */}
          <div className="flex flex-wrap gap-1.5">
            <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Footer: price + CTA section - matches real card's footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/60 flex items-center justify-between gap-3">
          <div className="flex flex-col leading-tight space-y-1">
            <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="h-10 w-28 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </article>
      {/* Compare button placeholder - matches the button that appears under each real mentor card */}
      <div className="mt-2 w-full h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </li>
  );
};

export default MentorCardSkeleton;
