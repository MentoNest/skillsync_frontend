# Category Badge - Quick Start Guide

## Installation ✅

No installation needed! The component uses existing dependencies.

## Basic Usage

### 1. Import the Component

```tsx
// Option A: Import specific badge
import { CategoryBadge } from '@/components/ui';

// Option B: Import smart badge (recommended)
import { SmartCategoryBadge } from '@/components/ui';

// Option C: Import both
import { CategoryBadge, SmartCategoryBadge } from '@/components/ui';
```

### 2. Use in Your Components

#### Simple Badge (Manual Color)
```tsx
<CategoryBadge variant="primary" size="sm">
  Web Development
</CategoryBadge>
```

#### Smart Badge (Auto Color) ⭐ Recommended
```tsx
<SmartCategoryBadge category="Web Development" />
```

## Common Patterns

### In Cards
```tsx
<article className="relative">
  <Image src={image} alt={title} fill />
  
  {/* Badge overlay */}
  <div className="absolute top-3 left-3">
    <SmartCategoryBadge category={category} />
  </div>
</article>
```

### As Filter Chips
```tsx
<div className="flex gap-2">
  <CategoryBadge 
    variant={active === 'all' ? 'primary' : 'outline'}
    size="md"
  >
    All
  </CategoryBadge>
  <CategoryBadge 
    variant={active === 'design' ? 'primary' : 'outline'}
    size="md"
  >
    Design
  </CategoryBadge>
</div>
```

### Skill Tags
```tsx
<div className="flex flex-wrap gap-2">
  {skills.map(skill => (
    <SmartCategoryBadge 
      key={skill} 
      category={skill} 
      size="sm" 
    />
  ))}
</div>
```

### Status Indicators
```tsx
<CategoryBadge variant="success">Available</CategoryBadge>
<CategoryBadge variant="warning">Limited</CategoryBadge>
<CategoryBadge variant="danger">Full</CategoryBadge>
```

## Props Reference

### CategoryBadge
```typescript
interface CategoryBadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 
            'danger' | 'gray' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}
```

### SmartCategoryBadge
```typescript
interface SmartCategoryBadgeProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

## Color Variants

| Variant | Color | Best For |
|---------|-------|----------|
| `default` | Purple | Primary branding |
| `primary` | Blue | Tech topics |
| `success` | Green | Data, Growth |
| `warning` | Yellow | Design, Creative |
| `danger` | Red | Urgent items |
| `gray` | Gray | Business |
| `outline` | Border only | Secondary items |
| `subtle` | Light bg | Tertiary info |

## Size Guide

| Size | Dimensions | Font | Use Case |
|------|------------|------|----------|
| `sm` | 10px × 2px | 12px | Compact spaces |
| `md` | 12px × 4px | 14px | Standard badges |
| `lg` | 16px × 6px | 16px | Hero sections |

## Customization

### Add New Category Mapping

Edit `components/ui/SmartCategoryBadge.tsx`:

```typescript
const categoryColorMap = {
  // Add your custom mappings
  'your-category': 'variant-name',
  'blockchain': 'primary',
};
```

### Override Styles

```tsx
<CategoryBadge 
  variant="default" 
  className="shadow-lg border-2 border-white"
>
  Custom Style
</CategoryBadge>
```

## Examples by Use Case

### 1. Learning Track Card
```tsx
import { SmartCategoryBadge } from '@/components/ui';

function LearningTrackCard({ track }) {
  return (
    <div className="relative">
      <div className="aspect-video relative overflow-hidden">
        <Image src={track.image} alt={track.title} fill />
        <div className="absolute top-3 left-3">
          <SmartCategoryBadge category={track.category} />
        </div>
      </div>
      {/* ... rest of card */}
    </div>
  );
}
```

### 2. Mentor Card Tags
```tsx
<div className="flex flex-wrap gap-2">
  {mentor.expertise.map(area => (
    <SmartCategoryBadge 
      key={area}
      category={area}
      size="sm"
    />
  ))}
</div>
```

### 3. Course Header
```tsx
<header className="flex items-center justify-between">
  <SmartCategoryBadge category={course.category} size="md" />
  <span className="text-sm text-gray-500">{course.duration}</span>
</header>
```

### 4. Breadcrumb Navigation
```tsx
<nav className="flex items-center gap-2">
  <SmartCategoryBadge 
    category="Home" 
    size="sm" 
    variant="subtle" 
  />
  <span>/</span>
  <SmartCategoryBadge 
    category="Courses" 
    size="sm" 
  />
</nav>
```

## Testing Locally

Create a test page:

```tsx
// app/test-badges/page.tsx
import { CategoryBadge, SmartCategoryBadge } from '@/components/ui';

export default function TestBadges() {
  return (
    <div className="p-8 space-y-8">
      <h1>Badge Test Page</h1>
      
      {/* All variants */}
      <div className="flex gap-4 flex-wrap">
        <CategoryBadge variant="default">Default</CategoryBadge>
        <CategoryBadge variant="primary">Primary</CategoryBadge>
        <CategoryBadge variant="success">Success</CategoryBadge>
        <CategoryBadge variant="warning">Warning</CategoryBadge>
        <CategoryBadge variant="danger">Danger</CategoryBadge>
        <CategoryBadge variant="gray">Gray</CategoryBadge>
        <CategoryBadge variant="outline">Outline</CategoryBadge>
        <CategoryBadge variant="subtle">Subtle</CategoryBadge>
      </div>
      
      {/* All sizes */}
      <div className="flex gap-4 flex-wrap">
        <CategoryBadge size="sm">Small</CategoryBadge>
        <CategoryBadge size="md">Medium</CategoryBadge>
        <CategoryBadge size="lg">Large</CategoryBadge>
      </div>
      
      {/* Smart badges */}
      <div className="flex gap-4 flex-wrap">
        <SmartCategoryBadge category="Web Development" />
        <SmartCategoryBadge category="Design" />
        <SmartCategoryBadge category="Data Science" />
        <SmartCategoryBadge category="Business" />
      </div>
    </div>
  );
}
```

## Troubleshooting

### Issue: Badge not showing color
**Solution**: Check that you're using the correct variant name

### Issue: Badge too small/large
**Solution**: Adjust the `size` prop (`sm`, `md`, or `lg`)

### Issue: Colors not matching design
**Solution**: Override with `className` prop or edit the CVA variants

### Issue: Smart badge not auto-coloring
**Solution**: Add category to `categoryColorMap` in SmartCategoryBadge.tsx

## Next Steps

1. ✅ Try using `SmartCategoryBadge` in your components
2. ✅ Customize color mappings for your categories
3. ✅ View full documentation at `/docs/CATEGORY_BADGE.md`
4. ✅ See live demo at `/resources` page

---

**Need Help?** Check out:
- Full Documentation: [`/docs/CATEGORY_BADGE.md`](/docs/CATEGORY_BADGE.md)
- Demo Component: [`CategoryBadgeDemo.tsx`](/components/ui/CategoryBadgeDemo.tsx)
- Source Code: [`CategoryBadge.tsx`](/components/ui/CategoryBadge.tsx)
