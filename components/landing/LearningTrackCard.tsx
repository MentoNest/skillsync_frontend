'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface LearningTrackCardProps {
  title: string;
  category: string;
  description: string;
  lessons: number;
  duration: string;
  imageSrc: string;
  href: string;
  alt?: string;
}

export default function LearningTrackCard({
  title,
  category,
  description,
  lessons,
  duration,
  imageSrc,
  href,
  alt,
}: LearningTrackCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-100">
        <div className="aspect-[16/10] w-full">
          <Image
            src={imageSrc}
            alt={alt ?? title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm ring-1 ring-slate-200">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            {title}
          </h3>
          <p className="text-sm leading-6 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
            <span className="whitespace-nowrap font-medium text-slate-700">{lessons} lessons</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
            <span className="whitespace-nowrap font-medium text-slate-700">{duration}</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            href={href}
            className="inline-flex w-full items-center justify-center rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Start learning
          </Link>
        </div>
      </div>
    </article>
  );
}
