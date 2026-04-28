'use client';

import React from 'react';

export interface CategoryBadgeProps {
  category: string;
  className?: string;
}

// Color mapping for different categories
const categoryColors: Record<string, string> = {
  // Tech & Development
  development: 'bg-blue-100 text-blue-700',
  programming: 'bg-blue-100 text-blue-700',
  web: 'bg-indigo-100 text-indigo-700',
  mobile: 'bg-violet-100 text-violet-700',
  devops: 'bg-cyan-100 text-cyan-700',
  security: 'bg-red-100 text-red-700',
  
  // Data & AI
  'data-science': 'bg-emerald-100 text-emerald-700',
  'data science': 'bg-emerald-100 text-emerald-700',
  ai: 'bg-purple-100 text-purple-700',
  machine: 'bg-purple-100 text-purple-700',
  ml: 'bg-purple-100 text-purple-700',
  
  // Design
  design: 'bg-pink-100 text-pink-700',
  ux: 'bg-rose-100 text-rose-700',
  ui: 'bg-fuchsia-100 text-fuchsia-700',
  
  // Business
  business: 'bg-amber-100 text-amber-700',
  marketing: 'bg-orange-100 text-orange-700',
  finance: 'bg-green-100 text-green-700',
  
  // Other
  default: 'bg-slate-100 text-slate-700',
};

function getCategoryColor(category: string): string {
  const normalized = category.toLowerCase().trim();
  
  // Check for exact match first
  if (categoryColors[normalized]) {
    return categoryColors[normalized];
  }
  
  // Check if any key is contained in the category
  for (const [key, value] of Object.entries(categoryColors)) {
    if (normalized.includes(key)) {
      return value;
    }
  }
  
  return categoryColors.default;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const colorClass = getCategoryColor(category);
  
  return (
    <span 
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colorClass} ${className}`}
      aria-label={`Category: ${category}`}
    >
      {category}
    </span>
  );
}