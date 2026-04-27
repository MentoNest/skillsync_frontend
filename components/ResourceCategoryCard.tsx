'use client';

import Link from 'next/link';
import React from 'react';

export interface ResourceCategoryCardProps {
  icon: React.ReactNode;
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
  return (
    <Link
      href={link}
      className="flex flex-col items-center text-center bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label={`Explore ${title} resources: ${description}`}
    >
      <span className="text-3xl mb-3" aria-hidden="true">{icon}</span>
      <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
        {title}
      </span>
      <span className="text-xs text-gray-400 mt-1" id={`desc-${title.replace(/\s+/g, '-').toLowerCase()}`}>
        {description}
      </span>
    </Link>
  );
}
