# Category Badge Component

A flexible, reusable badge component for displaying category labels with dynamic colors and multiple variants.

## Features

✅ **Dynamic Background Colors** - 8 color variants  
✅ **Rounded Badge Design** - Fully rounded (pill-shaped)  
✅ **Category Prop Support** - Accepts any category text  
✅ **Reusable Across Platform** - Used in cards, filters, tags, and more  
✅ **Smart Color Mapping** - Automatic color selection based on category name  
✅ **Multiple Sizes** - Small, Medium, Large  
✅ **Accessible** - ARIA compliant with focus states  

## Component Structure

```
components/ui/
├── CategoryBadge.tsx        # Base badge component with variants
├── SmartCategoryBadge.tsx   # Auto-color mapping badge
├── CategoryBadgeDemo.tsx    # Demo/showcase component
└── index.ts                 # Barrel exports
```

## Installation

No additional dependencies required! Uses existing packages:
- `class-variance-authority` (already installed)
- `tailwind-merge` (already installed)
- `clsx` (already installed)

## Usage

### Basic CategoryBadge

```tsx
import { CategoryBadge } from '@/components/ui';

// Default variant (purple)
<CategoryBadge>Web Development</CategoryBadge>

// With specific variant
<CategoryBadge variant="primary">Engineering</CategoryBadge>
<CategoryBadge variant="success">Data Science</CategoryBadge>
<CategoryBadge variant="warning">Design</CategoryBadge>
<CategoryBadge variant="danger">Security</CategoryBadge>
<CategoryBadge variant="gray">Business</CategoryBadge>
<CategoryBadge variant="outline">Product</CategoryBadge>
<CategoryBadge variant="subtle">Marketing</CategoryBadge>

// Different sizes
<CategoryBadge size="sm">Small</CategoryBadge>
<CategoryBadge size="md">Medium</CategoryBadge>
<CategoryBadge size="lg">Large</CategoryBadge>
```

### SmartCategoryBadge (Recommended)

Automatically determines color based on category name:

```tsx
import { SmartCategoryBadge } from '@/components/ui';

// These will auto-color based on predefined mappings
<SmartCategoryBadge category="Web Development" />  // Blue
<SmartCategoryBadge category="Data Science" />     // Green
<SmartCategoryBadge category="Design" />           // Yellow
<SmartCategoryBadge category="Leadership" />       // Gray
<SmartCategoryBadge category="Machine Learning" /> // Green
```

### In Learning Track Cards

```tsx
import { SmartCategoryBadge } from '@/components/ui';

function LearningTrackCard({ track }) {
  return (
    <div className="relative">
      <Image src={track.image} alt={track.title} fill />
      
      {/* Badge overlay */}
      <div className="absolute top-3 left-3">
        <SmartCategoryBadge category={track.category} />
      </div>
    </div>
  );
}
```

## Props

### CategoryBadge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'gray' \| 'outline' \| 'subtle'` | `'default'` | Color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Badge size |
| `children` | `React.ReactNode` | **Required** | Badge text/content |
| `className` | `string` | - | Additional Tailwind classes |
| `asChild` | `boolean` | `false` | Render as different element |

### SmartCategoryBadge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `category` | `string` | **Required** | Category name (auto-mapped to color) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Badge size |
| `className` | `string` | - | Additional Tailwind classes |

## Color Mappings

### Manual Variants (CategoryBadge)

| Variant | Color | Use Case |
|---------|-------|----------|
| `default` | Purple (#9333ea) | Primary platform branding |
| `primary` | Blue (#2563eb) | Tech/Engineering topics |
| `success` | Green (#16a34a) | Data, Growth, Analytics |
| `warning` | Yellow (#eab308) | Design, Creative fields |
| `danger` | Red (#dc2626) | Urgent, Security, Critical |
| `gray` | Gray (#4b5563) | Business, General topics |
| `outline` | Purple border | Secondary emphasis |
| `subtle` | Light purple | Tertiary information |

### Auto-Mapping (SmartCategoryBadge)

The SmartCategoryBadge automatically maps these keywords:

**Technology (Blue)**
- Web Development, Engineering, Programming, Software
- React, JavaScript, TypeScript

**Data & AI (Green)**
- Data Science, Machine Learning, AI, Python
- Analytics

**Design (Yellow)**
- Design, UI/UX, Product Design, Graphic Design
- Creative

**Business (Gray)**
- Business, Leadership, Management
- Entrepreneurship, Marketing

**Product (Purple)**
- Product, Product Management

## Size Specifications

### Small (sm) - Default
```tsx
<CategoryBadge size="sm">Text</CategoryBadge>
```
- Padding: `px-2.5 py-0.5` (10px × 2px)
- Font: `text-xs` (12px)
- Use: Compact spaces, card overlays, inline text

### Medium (md)
```tsx
<CategoryBadge size="md">Text</CategoryBadge>
```
- Padding: `px-3 py-1` (12px × 4px)
- Font: `text-sm` (14px)
- Use: Standard badges, headers, filters

### Large (lg)
```tsx
<CategoryBadge size="lg">Text</CategoryBadge>
```
- Padding: `px-4 py-1.5` (16px × 6px)
- Font: `text-base` (16px)
- Use: Hero sections, prominent displays

## Customization

### Add New Category Mappings

Edit `SmartCategoryBadge.tsx`:

```typescript
const categoryColorMap: Record<string, CategoryBadgeProps['variant']> = {
  // Add your custom mappings
  'your category': 'variant-name',
  'blockchain': 'primary',
  'devops': 'success',
};
```

### Custom Colors

Extend the CVA variants in `CategoryBadge.tsx`:

```typescript
const badgeVariants = cva('...', {
  variants: {
    variant: {
      // Add custom variants
      custom: 'bg-custom-600 text-white hover:bg-custom-700',
    },
  },
});
```

### Override Styles

Use the `className` prop for Tailwind overrides:

```tsx
<CategoryBadge 
  variant="default" 
  className="shadow-lg border-2 border-white"
>
  Custom Style
</CategoryBadge>
```

## Accessibility

- ✅ Semantic `<span>` element
- ✅ High contrast color combinations
- ✅ Focus visible states for keyboard navigation
- ✅ Screen reader friendly
- ✅ ARIA labels when needed

## Performance

- ✅ Zero runtime overhead (compile-time variants)
- ✅ Tree-shakeable imports
- ✅ Minimal CSS output
- ✅ No JavaScript for color calculation (CSS-only)

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Graceful degradation for older browsers

## Examples

### Filter Chips
```tsx
<div className="flex gap-2">
  <CategoryBadge variant="primary" size="md">All</CategoryBadge>
  <CategoryBadge variant="outline" size="md">Engineering</CategoryBadge>
  <CategoryBadge variant="outline" size="md">Design</CategoryBadge>
</div>
```

### Status Indicators
```tsx
<CategoryBadge variant="success">Available</CategoryBadge>
<CategoryBadge variant="warning">Limited</CategoryBadge>
<CategoryBadge variant="danger">Full</CategoryBadge>
```

### Skill Tags
```tsx
<div className="flex flex-wrap gap-2">
  <SmartCategoryBadge category="React" size="sm" />
  <SmartCategoryBadge category="TypeScript" size="sm" />
  <SmartCategoryBadge category="Node.js" size="sm" />
</div>
```

### Breadcrumb Separator
```tsx
<nav>
  <SmartCategoryBadge category="Courses" size="sm" variant="subtle" />
  <span className="mx-2">/</span>
  <SmartCategoryBadge category="Web Development" size="sm" />
</nav>
```

## Testing

View all variants and examples at `/resources` page or create a demo page:

```tsx
import CategoryBadgeDemo from '@/components/ui/CategoryBadgeDemo';

export default function DemoPage() {
  return <CategoryBadgeDemo />;
}
```

## Related Components

- [`LearningTrackCard`](../learning/LearningTrackCard.tsx) - Uses SmartCategoryBadge
- [`BenefitCard`](../landing/BenefitCard.tsx) - Similar card pattern
- [`MentorDiscoverySection`](../MentorDiscoverySection.tsx) - Tag system

## Future Enhancements

- [ ] Add icon support (left/right icons)
- [ ] Clickable badges with href prop
- [ ] Loading skeleton state
- [ ] Tooltip support for long categories
- [ ] Custom color picker/selector
- [ ] Animation variants (pulse, bounce)
- [ ] Gradient backgrounds

---

**Created**: March 29, 2026  
**Last Updated**: March 29, 2026  
**Status**: ✅ Production Ready
