'use client';

import Link from 'next/link';

interface ResourceCategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  count: number;
}

export default function ResourceCategoryCard({
  id,
  title,
  description,
  icon,
  count,
}: ResourceCategoryCardProps) {
  return (
    <Link
      href={`/learning-resources/${id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{description}</p>
      <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
        {count} resources
      </span>
    </Link>
  );
}
