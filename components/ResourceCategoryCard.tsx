'use client';

import Link from 'next/link';
import React from 'react';

export interface ResourceCategoryCardProps {
  icon: React.ComponentType<{ className?: string }> | React.ReactNode;
  title: string;
  description: string;
  link: string;
}

export default function ResourceCategoryCard({
  icon,
  title,
  description,
  link,
}: ResourceCategoryCardProps) {
  // Handle both lucide-react icon components and emoji strings
  const IconComponent = typeof icon === 'function' ? icon : null;

  return (
    <Link
      href={link}
      className="flex flex-col items-center text-center bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      <div className="mb-3">
        {IconComponent ? (
          <IconComponent className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
        ) : (
          <span className="text-3xl">{icon}</span>
        )}
      </div>
      <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
        {title}
      </span>
      <span className="text-xs text-gray-400 mt-1">{description}</span>
    </Link>
  );
}
