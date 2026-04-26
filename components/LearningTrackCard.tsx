import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock3 } from 'lucide-react';

export interface LearningTrackCardProps {
  category: string;
  title: string;
  description: string;
  lessonCount: number;
  duration: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function LearningTrackCard({
  category,
  title,
  description,
  lessonCount,
  duration,
  href,
  imageSrc,
  imageAlt,
}: LearningTrackCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
            {category}
          </span>
        </div>
      </div>

      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {lessonCount} lessons
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" />
            {duration}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-auto pt-6">
          <Link
            href={href}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </article>
  );
}
