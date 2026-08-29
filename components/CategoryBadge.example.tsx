/**
 * CategoryBadge Component Examples
 * 
 * This file demonstrates various use cases of the CategoryBadge component.
 * Copy these examples into your components as needed.
 */

import CategoryBadge from './CategoryBadge';

export function CategoryBadgeExamples() {
  return (
    <div className="p-8 space-y-8">
      {/* Basic Usage - Auto color assignment */}
      <section>
        <h2 className="text-xl font-bold mb-4">Auto Color Assignment</h2>
        <div className="flex flex-wrap gap-3">
          <CategoryBadge category="Web Development" />
          <CategoryBadge category="Data Science" />
          <CategoryBadge category="UI/UX Design" />
          <CategoryBadge category="Mobile Development" />
          <CategoryBadge category="Career Growth" />
          <CategoryBadge category="DevOps" />
          <CategoryBadge category="Machine Learning" />
          <CategoryBadge category="Business" />
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h2 className="text-xl font-bold mb-4">Size Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge category="Small" size="sm" />
          <CategoryBadge category="Medium" size="md" />
          <CategoryBadge category="Large" size="lg" />
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h2 className="text-xl font-bold mb-4">Color Variants</h2>
        <div className="flex flex-wrap gap-3">
          <CategoryBadge category="Primary" variant="primary" />
          <CategoryBadge category="Success" variant="success" />
          <CategoryBadge category="Warning" variant="warning" />
          <CategoryBadge category="Danger" variant="danger" />
          <CategoryBadge category="Info" variant="info" />
          <CategoryBadge category="Purple" variant="purple" />
          <CategoryBadge category="Pink" variant="pink" />
          <CategoryBadge category="Cyan" variant="cyan" />
        </div>
      </section>

      {/* Practical Use Cases */}
      <section>
        <h2 className="text-xl font-bold mb-4">In Learning Cards</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-w-sm">
          <div className="mb-3">
            <CategoryBadge category="Frontend Development" size="md" />
          </div>
          <h3 className="text-lg font-bold mb-2">Complete React Course</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Master React from basics to advanced concepts
          </p>
        </div>
      </section>

      {/* Multiple Badges */}
      <section>
        <h2 className="text-xl font-bold mb-4">Multiple Categories</h2>
        <div className="flex flex-wrap gap-2">
          <CategoryBadge category="JavaScript" variant="warning" size="sm" />
          <CategoryBadge category="TypeScript" variant="info" size="sm" />
          <CategoryBadge category="React" variant="cyan" size="sm" />
          <CategoryBadge category="Next.js" variant="purple" size="sm" />
        </div>
      </section>
    </div>
  );
}
