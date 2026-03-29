// components/ui/CategoryBadgeDemo.tsx

'use client';

import { CategoryBadge, SmartCategoryBadge } from '.';

export default function CategoryBadgeDemo() {
  return (
    <section className="py-12 bg-white" aria-labelledby="badge-demo-heading">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          id="badge-demo-heading"
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Category Badge Component Demo
        </h2>

        {/* Variant Showcase */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Available Variants
          </h3>
          <div className="flex flex-wrap gap-4 p-6 bg-gray-50 rounded-xl">
            <CategoryBadge variant="default">Default</CategoryBadge>
            <CategoryBadge variant="primary">Primary</CategoryBadge>
            <CategoryBadge variant="success">Success</CategoryBadge>
            <CategoryBadge variant="warning">Warning</CategoryBadge>
            <CategoryBadge variant="danger">Danger</CategoryBadge>
            <CategoryBadge variant="gray">Gray</CategoryBadge>
            <CategoryBadge variant="outline">Outline</CategoryBadge>
            <CategoryBadge variant="subtle">Subtle</CategoryBadge>
          </div>
        </div>

        {/* Size Showcase */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Available Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-gray-50 rounded-xl">
            <CategoryBadge size="sm">Small (SM)</CategoryBadge>
            <CategoryBadge size="md">Medium (MD)</CategoryBadge>
            <CategoryBadge size="lg">Large (LG)</CategoryBadge>
          </div>
        </div>

        {/* Smart Badge Showcase */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Smart Category Badges (Auto-color)
          </h3>
          <div className="flex flex-wrap gap-3 p-6 bg-gray-50 rounded-xl">
            <SmartCategoryBadge category="Web Development" />
            <SmartCategoryBadge category="Data Science" />
            <SmartCategoryBadge category="Design" />
            <SmartCategoryBadge category="Leadership" />
            <SmartCategoryBadge category="Product Management" />
            <SmartCategoryBadge category="Machine Learning" />
            <SmartCategoryBadge category="Business Strategy" />
            <SmartCategoryBadge category="Random Category" />
          </div>
          <p className="mt-4 text-sm text-gray-600 px-6">
            💡 Smart badges automatically determine colors based on category names
          </p>
        </div>

        {/* Usage Examples */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Real-world Usage Examples
          </h3>
          <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
            {/* Example 1: Card Header */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <SmartCategoryBadge category="Engineering" size="sm" />
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <h4 className="font-semibold text-gray-900">System Design Principles</h4>
              <p className="text-sm text-gray-600 mt-1">Learn scalable architecture patterns</p>
            </div>

            {/* Example 2: Inline with Text */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                New course available in{' '}
                <SmartCategoryBadge category="Python" size="sm" className="ml-1" />
                {' '}for beginners
              </p>
            </div>

            {/* Example 3: Multiple Badges */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex flex-wrap gap-2">
                <SmartCategoryBadge category="React" size="sm" />
                <SmartCategoryBadge category="TypeScript" size="sm" />
                <SmartCategoryBadge category="Web Development" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
