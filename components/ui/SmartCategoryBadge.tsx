// components/ui/SmartCategoryBadge.tsx

import { CategoryBadge } from './CategoryBadge';
import type { CategoryBadgeProps } from './CategoryBadge';

interface SmartCategoryBadgeProps extends Omit<CategoryBadgeProps, 'variant' | 'children'> {
  category: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Maps category names to color variants automatically
 * Add more mappings as needed for your platform
 */
const categoryColorMap: Record<string, CategoryBadgeProps['variant']> = {
  // Technology
  'web development': 'primary',
  'engineering': 'primary',
  'programming': 'primary',
  'software': 'primary',
  'react': 'primary',
  'javascript': 'primary',
  'typescript': 'primary',
  'python': 'success',
  'data science': 'success',
  'machine learning': 'success',
  'ai': 'success',
  
  // Design & Creative
  'design': 'warning',
  'ui/ux': 'warning',
  'product design': 'warning',
  'graphic design': 'warning',
  'creative': 'warning',
  
  // Business
  'business': 'gray',
  'leadership': 'gray',
  'management': 'gray',
  'entrepreneurship': 'gray',
  'marketing': 'gray',
  
  // Product
  'product': 'default',
  'product management': 'default',
  
  // Data
  'data': 'success',
  'analytics': 'success',
  
  // Default fallback
  'default': 'default',
};

/**
 * SmartCategoryBadge - Automatically determines color based on category name
 * 
 * @example
 * <SmartCategoryBadge category="Web Development" />
 * <SmartCategoryBadge category="Design" variant="outline" />
 */
export function SmartCategoryBadge({ 
  category, 
  size = 'sm',
  className,
  ...props 
}: SmartCategoryBadgeProps) {
  const normalizedCategory = category.toLowerCase();
  
  // Find matching variant or default to 'default'
  const variant = Object.entries(categoryColorMap).find(([key]) => 
    normalizedCategory.includes(key) || key.includes(normalizedCategory)
  )?.[1] ?? 'default';

  return (
    <CategoryBadge 
      variant={variant} 
      size={size}
      className={className}
      {...props}
    >
      {category}
    </CategoryBadge>
  );
}
