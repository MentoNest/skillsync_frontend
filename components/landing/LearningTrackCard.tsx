import Link from 'next/link';
import Image from 'next/image';

interface LearningTrackCardProps {
  title: string;
  category: string;
  description: string;
  lessons: number;
  duration: string;
  imageSrc: string;
  href: string;
  /** Pass priority=true for the first card in a visible row to avoid LCP penalty */
  priority?: boolean;
}

/**
 * LearningTrackCard
 *
 * Performance notes:
 * - The image container has an explicit aspect ratio (16/9 ≈ h-44 at card width)
 *   declared via `aspect-video` so the browser reserves the exact space before
 *   the image loads, eliminating Cumulative Layout Shift (CLS).
 * - `sizes` is tuned to the grid breakpoints so the browser downloads the
 *   smallest sufficient source rather than a full-width image on mobile.
 * - The `priority` prop should be set on the first visible card (index 0) to
 *   hint the browser to prefetch it as a likely LCP candidate.  All other cards
 *   default to lazy loading since they are below the fold.
 * - `decoding="async"` lets the browser decode images off the main thread,
 *   keeping the UI responsive during image paint.
 */
export default function LearningTrackCard({
  title,
  category,
  description,
  lessons,
  duration,
  imageSrc,
  href,
  priority = false,
}: LearningTrackCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg group-hover:border-cyan-300 overflow-hidden">

        {/* Image header
            - `aspect-video` (16/9) reserves space before the image arrives → no CLS
            - `relative` + `overflow-hidden` are required for next/image fill mode */}
        <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
          <Image
            src={imageSrc}
            alt={`Cover image for the ${title} learning track`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            decoding="async"
          />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-600">
            {title}
          </h3>
          <p className="text-sm leading-6 text-slate-600 line-clamp-3">
            {description}
          </p>

          {/* Meta row */}
          <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span aria-label={`Duration: ${duration}`}>{duration}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span aria-label={`${lessons} lessons`}>{lessons} lessons</span>
            </span>
          </div>
        </div>

      </article>
    </Link>
  );
}
