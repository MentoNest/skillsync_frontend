'use client';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const categoryStyles = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
} as const;

export type LearningTrackCategory = keyof typeof categoryStyles;

const categoryLabels: Record<LearningTrackCategory, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export interface LearningTrackCardProps {
  imageSrc: string;
  imageAlt: string;
  category: LearningTrackCategory;
  title: string;
  description: string;
  lessonCount: number;
  durationLabel: string;
  href?: string;
  onStartLearning?: () => void;
  className?: string;
}

const buttonClassName =
  'flex w-full items-center justify-center rounded-lg bg-[#9d17ff] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8a0ee6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d17ff] focus-visible:ring-offset-2';

export default function LearningTrackCard({
  imageSrc,
  imageAlt,
  category,
  title,
  description,
  lessonCount,
  durationLabel,
  href,
  onStartLearning,
  className,
}: LearningTrackCardProps) {
  return (
    <article
      className={cn(
        'flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div className="relative aspect-video w-full shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span
          className={cn(
            'inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium',
            categoryStyles[category],
          )}
        >
          {categoryLabels[category]}
        </span>

        <h3 className="mt-3 text-lg font-bold leading-snug text-[#1a1a1a] sm:text-xl">{title}</h3>

        <p className="mt-2 truncate text-sm text-[#666666]">{description}</p>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#666666] sm:text-sm">
          <span>
            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
          </span>
          <span>{durationLabel}</span>
        </div>

        <div className="mt-6">
          {href ? (
            <Link href={href} className={buttonClassName}>
              Start Learning
            </Link>
          ) : (
            <button type="button" onClick={onStartLearning} className={buttonClassName}>
              Start Learning
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
