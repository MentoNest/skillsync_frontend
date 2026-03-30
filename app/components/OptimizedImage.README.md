# OptimizedImage Component

A wrapper around Next.js Image component with optimized defaults for better performance and user experience.

## Features

- **Automatic lazy loading**: Images load lazily by default, with option to prioritize above-the-fold images
- **CLS prevention**: Proper styling to prevent Cumulative Layout Shift
- **Responsive sizing**: Configurable sizes for different screen widths
- **Quality optimization**: Default quality of 75 for good balance of size and quality
- **Blur placeholder**: Optional blur placeholder for better perceived performance

## Usage

```tsx
import OptimizedImage from '@/app/components/OptimizedImage';

// For fill mode (recommended for responsive images)
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  fill={true}
  className="rounded-lg"
/>

// For fixed dimensions
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
/>

// For priority loading (above the fold)
<OptimizedImage
  src="/hero-image.jpg"
  alt="Hero"
  fill={true}
  priority={true}
/>
```

## Props

- `src`: Image source URL
- `alt`: Alt text for accessibility
- `width`/`height`: Dimensions (required unless `fill={true}`)
- `fill`: Whether to fill the parent container
- `className`: Additional CSS classes
- `priority`: Load immediately (for above-the-fold images)
- `sizes`: Responsive size hints for the browser
- `quality`: Image quality (1-100, default: 75)
- `placeholder`: Placeholder type ("blur" or "empty")
- `blurDataURL`: Custom blur data URL