import React from 'react';

export const MentorCardSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 animate-pulse">
      {/* Header Section: Avatar & Core Identity Lines */}
      <div className="flex items-center space-x-4">
        {/* Mocking Avatar Circle */}
        <div className="h-14 w-14 rounded-full bg-slate-200 dark:bg-slate-800" />
        
        <div className="flex-1 space-y-2.5">
          {/* Mocking Name Line */}
          <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
          {/* Mocking Title/Role Tag */}
          <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Profile Bio Context Block */}
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Tech Skill Badges Grid */}
      <div className="mt-5 flex flex-wrap gap-2">
        <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-6 w-14 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>

      <hr className="my-5 border-slate-100 dark:border-slate-800" />

      {/* Footer Metrics & Actions */}
      <div className="flex items-center justify-between">
        {/* Mocking Hourly Rate Block */}
        <div className="space-y-1">
          <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Mocking CTA Action Button */}
        <div className="h-9 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default MentorCardSkeleton;