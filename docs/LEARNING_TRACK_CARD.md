# Learning Track Card Component

A reusable card component for displaying learning track information with a modern, responsive design.

## Features

✅ **Image** - Full-width cover image with proper 16:9 aspect ratio  
✅ **Category Tag** - Overlay badge showing track category  
✅ **Title** - Track title with text truncation  
✅ **Description** - Multi-line description with line clamping  
✅ **Lesson Count** - Display total number of lessons with icon  
✅ **Duration** - Show estimated completion time with icon  
✅ **Start Learning Button** - Styled call-to-action button  

## Component Structure

```
components/learning/
├── LearningTrackCard.tsx    # Main card component
├── LearningTrackGrid.tsx    # Grid layout demo component
└── index.ts                 # Barrel exports
```

## Usage

### Basic Usage

```tsx
import { LearningTrackCard } from '@/components/learning';

const track = {
  id: '1',
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  category: 'Web Development',
  title: 'Full-Stack Web Development',
  description: 'Master modern web development with React, Node.js, and TypeScript.',
  lessonCount: 42,
  duration: '12 weeks',
};

<LearningTrackCard track={track} />
```

### With Click Handler

```tsx
<LearningTrackCard 
  track={track} 
  onStartLearning={(trackId) => {
    console.log('Starting track:', trackId);
    // Navigate to track detail or start learning flow
  }} 
/>
```

### Grid Layout

```tsx
import { LearningTrackGrid } from '@/components/learning';

<LearningTrackGrid 
  tracks={customTracks}
  onTrackStart={(trackId) => handleTrackStart(trackId)}
/>
```

## Props

### LearningTrackCard

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `track` | `LearningTrack` | ✅ Yes | - | Track data object |
| `onStartLearning` | `(trackId: string) => void` | ❌ No | - | Callback when button is clicked |

### LearningTrack Interface

```typescript
interface LearningTrack {
  id: string;          // Unique identifier
  image: string;       // Image URL (supports Unsplash)
  category: string;    // Category/tag for the track
  title: string;       // Track title
  description: string; // Track description
  lessonCount: number; // Number of lessons
  duration: string;    // Duration (e.g., "12 weeks")
}
```

## Design Specifications

### Responsive Breakpoints

- **Mobile**: 1 column (< 640px)
- **Tablet**: 2 columns (640px - 1024px)
- **Desktop**: 3 columns (1024px - 1280px)
- **Large Desktop**: 4 columns (> 1280px)

### Image Specifications

- **Aspect Ratio**: 16:9 (video format)
- **Optimization**: Uses Next.js Image component with:
  - Automatic format detection (WebP, AVIF)
  - Responsive sizing
  - Blur placeholder
  - Hover scale effect

### Color Scheme

- **Primary**: Purple (#9333ea / `purple-600`)
- **Background**: White with gradient hover effects
- **Text**: Gray scale for hierarchy
- **Border**: Subtle gray borders

### Typography

- **Title**: `text-lg font-semibold`
- **Description**: `text-sm leading-relaxed`
- **Metadata**: `text-sm text-gray-500`
- **Button**: `text-sm font-medium`

### Spacing

- **Padding**: `p-5` (20px)
- **Gap**: `gap-6` (24px) between cards
- **Border Radius**: `rounded-2xl` for cards, `rounded-lg` for buttons

## Accessibility

- Semantic HTML (`<article>` element)
- ARIA labels for interactive elements
- Focus visible states for keyboard navigation
- Proper heading hierarchy
- Alt text for images

## Performance Optimizations

✅ Next.js Image optimization  
✅ Responsive image sizes  
✅ Blur placeholder for LCP  
✅ CSS transitions for smooth interactions  
✅ Line clamping for text overflow  

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Example Screenshots

The component includes:
- Hover effects on the entire card (shadow + image scale)
- Category badge overlay on the image
- Icon-based metadata display
- Full-width action button

## Future Enhancements

- [ ] Add rating/review display
- [ ] Progress bar for in-progress tracks
- [ ] Bookmark/favorite functionality
- [ ] Share functionality
- [ ] Difficulty level indicator
- [ ] Certificate availability badge

## Related Components

- [`BenefitCard`](../landing/BenefitCard.tsx) - Similar card pattern
- [`HeroSection`](../landing/HeroSection.tsx) - Uses similar image handling
- [`MentorDiscoverySection`](../MentorDiscoverySection.tsx) - Card grid layout

---

**Created**: March 29, 2026  
**Last Updated**: March 29, 2026
