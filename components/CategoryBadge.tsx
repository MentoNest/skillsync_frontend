import React from 'react';

interface CategoryBadgeProps {
  /** The category name to display */
  category: string;
  /** Optional size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional custom color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink' | 'cyan';
}

/**
 * CategoryBadge — a small, colored tag component for displaying categories
 * on learning track cards and other content.
 *
 * Features:
 * - Dynamic background colors based on variant
 * - Multiple size options (sm, md, lg)
 * - Rounded badge design
 * - Automatic color assignment based on category name if no variant is specified
 * - Accessible with proper color contrast
 *
 * Usage:
 *   <CategoryBadge category="Web Development" />
 *   <CategoryBadge category="Career" variant="success" size="lg" />
 */
export default function CategoryBadge({
  category,
  size = 'md',
  variant,
}: CategoryBadgeProps) {
  // Auto-assign variant based on category name if not provided
  const getVariantFromCategory = (cat: string): string => {
    const lowerCat = cat.toLowerCase();
    
    if (lowerCat.includes('web') || lowerCat.includes('frontend') || lowerCat.includes('backend')) {
      return 'primary';
    }
    if (lowerCat.includes('data') || lowerCat.includes('analytics') || lowerCat.includes('science')) {
      return 'cyan';
    }
    if (lowerCat.includes('design') || lowerCat.includes('ui') || lowerCat.includes('ux')) {
      return 'purple';
    }
    if (lowerCat.includes('mobile') || lowerCat.includes('ios') || lowerCat.includes('android')) {
      return 'info';
    }
    if (lowerCat.includes('career') || lowerCat.includes('soft skill')) {
      return 'success';
    }
    if (lowerCat.includes('security') || lowerCat.includes('devops')) {
      return 'danger';
    }
    if (lowerCat.includes('ai') || lowerCat.includes('machine learning') || lowerCat.includes('ml')) {
      return 'pink';
    }
    if (lowerCat.includes('business') || lowerCat.includes('marketing')) {
      return 'warning';
    }
    
    // Default fallback
    return 'primary';
  };

  const colorVariant = variant || getVariantFromCategory(category);

  // Color classes mapping
  const colorClasses = {
    primary: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  };

  // Size classes mapping
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center font-semibold uppercase tracking-wide rounded-full
        ${colorClasses[colorVariant as keyof typeof colorClasses]}
        ${sizeClasses[size]}
        transition-colors duration-200
      `}
    >
      {category}
    </span>
  );
}
